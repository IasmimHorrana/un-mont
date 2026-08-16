/**
 * A "Próxima Parada" não é conteúdo diário — é um único local vigente, trocado manualmente
 * pela planilha (normalmente na linha do dia 14 de cada mês). `list` já vem ordenada por data
 * ascendente, então basta pegar a última entrada desbloqueada que tenha os campos preenchidos.
 */
export function getProximaParadaAtual(list, hojeISO) {
  let atual = null;
  for (const entry of list) {
    if (entry.date > hojeISO) break;
    if (entry.hasProximaParada) atual = entry;
  }
  return atual;
}
