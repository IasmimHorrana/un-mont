import { toDirectImageUrl } from '../utils/driveImage';

const API_URL = import.meta.env.VITE_SHEETDB_API_URL;

/** Cabeçalhos da planilha viram chaves do JSON tal como estão — um espaço a mais na célula do cabeçalho quebraria a leitura silenciosamente, então normaliza antes de ler. */
function trimKeys(row) {
  const out = {};
  for (const [key, value] of Object.entries(row)) {
    out[key.trim()] = value;
  }
  return out;
}

function normalizeRow(rawRow) {
  const row = trimKeys(rawRow);
  const date = (row.data ?? '').trim();
  const nomeFlor = (row.nome_flor ?? '').trim();
  const bilhete = (row.bilhete ?? '').trim();
  const fotoPolaroid = toDirectImageUrl((row.foto_polaroid ?? '').trim());
  const fotoProximaParada = toDirectImageUrl((row.proxima_parada_foto ?? '').trim());
  const nomeLocalProximaParada = (row.proxima_parada_local ?? '').trim();
  return {
    date,
    diasRestantes: row.dias_restantes !== undefined && row.dias_restantes !== ''
      ? Number(row.dias_restantes)
      : null,
    florId: (row.flor_id ?? '').trim(),
    nomeFlor,
    significado: (row.significado ?? '').trim(),
    bilhete,
    fotoPolaroid,
    legendaPolaroid: (row.legenda_polaroid ?? '').trim(),
    hasPolaroid: Boolean(fotoPolaroid),
    fotoProximaParada,
    nomeLocalProximaParada,
    hasProximaParada: Boolean(fotoProximaParada && nomeLocalProximaParada),
    respostaDela: (row.resposta_dela ?? '').trim(),
    hasContent: Boolean(nomeFlor && bilhete),
  };
}

async function fetchDiarioRows() {
  if (!API_URL) {
    throw new Error('VITE_SHEETDB_API_URL não configurada.');
  }
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`Falha ao buscar dados da planilha (HTTP ${response.status}).`);
  }
  const rows = await response.json();
  if (!Array.isArray(rows)) {
    throw new Error('Formato inesperado retornado pela API da planilha.');
  }
  return rows;
}

export async function fetchDiario() {
  const rawRows = await fetchDiarioRows();
  const byDate = {};
  const list = [];
  for (const rawRow of rawRows) {
    const entry = normalizeRow(rawRow);
    if (!entry.date) continue;
    byDate[entry.date] = entry;
    list.push(entry);
  }
  list.sort((a, b) => a.date.localeCompare(b.date));
  return { byDate, list, fetchedAt: Date.now() };
}

/**
 * Grava a resposta dela na coluna `resposta_dela` da linha do dia. Tenta atualizar a linha
 * existente (PATCH por coluna `data`, convenção do SheetDB); se ainda não existir linha pra
 * essa data (dia sem flor/bilhete cadastrado ainda), cria uma nova só com data + resposta.
 */
export async function enviarRecadinho(date, texto) {
  if (!API_URL) {
    throw new Error('VITE_SHEETDB_API_URL não configurada.');
  }

  const patchResponse = await fetch(`${API_URL}/data/${date}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: { resposta_dela: texto } }),
  });
  if (!patchResponse.ok) {
    throw new Error(`Falha ao enviar recadinho (HTTP ${patchResponse.status}).`);
  }
  const patchResult = await patchResponse.json();
  if (patchResult.updated > 0) return patchResult;

  const createResponse = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: { data: date, resposta_dela: texto } }),
  });
  if (!createResponse.ok) {
    throw new Error(`Falha ao enviar recadinho (HTTP ${createResponse.status}).`);
  }
  return createResponse.json();
}
