const API_URL = import.meta.env.VITE_SHEETDB_API_URL;

function normalizeRow(row) {
  const date = (row.data ?? '').trim();
  const nomeFlor = (row.nome_flor ?? '').trim();
  const bilhete = (row.bilhete ?? '').trim();
  return {
    date,
    diasRestantes: row.dias_restantes !== undefined && row.dias_restantes !== ''
      ? Number(row.dias_restantes)
      : null,
    florId: (row.flor_id ?? '').trim(),
    nomeFlor,
    significado: (row.significado ?? '').trim(),
    bilhete,
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
