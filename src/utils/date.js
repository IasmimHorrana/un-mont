import { DEBUG_TODAY_SESSION_KEY } from './constants';

const ISO_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

function parseISOParts(dataISO) {
  const match = ISO_RE.exec(dataISO);
  if (!match) {
    throw new Error(`Data inválida, esperado YYYY-MM-DD: "${dataISO}"`);
  }
  const [, year, month, day] = match;
  return { year: Number(year), month: Number(month), day: Number(day) };
}

/** Constrói um Date à meia-noite local a partir das partes da string ISO — nunca usar `new Date(iso)` direto (é interpretado como UTC). */
function toLocalMidnight(dataISO) {
  const { year, month, day } = parseISOParts(dataISO);
  return new Date(year, month - 1, day);
}

function pad2(n) {
  return String(n).padStart(2, '0');
}

function fromLocalMidnight(date) {
  return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

function readDebugTodayOverride() {
  if (!import.meta.env.DEV) return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const fromQuery = params.get('debugToday');
    if (fromQuery && ISO_RE.test(fromQuery)) {
      sessionStorage.setItem(DEBUG_TODAY_SESSION_KEY, fromQuery);
      return fromQuery;
    }
    const stored = sessionStorage.getItem(DEBUG_TODAY_SESSION_KEY);
    if (stored && ISO_RE.test(stored)) return stored;
  } catch {
    return null;
  }
  return null;
}

/** Hoje no fuso local do dispositivo, como string YYYY-MM-DD. Em dev, aceita override via ?debugToday=YYYY-MM-DD. */
export function getTodayLocalISO() {
  const override = readDebugTodayOverride();
  if (override) return override;
  const now = new Date();
  return fromLocalMidnight(now);
}

/** Um dia está desbloqueado quando sua data já chegou. Comparação de string ISO — sem risco de timezone. */
export function isUnlocked(dataISO, hojeISO) {
  return dataISO <= hojeISO;
}

/** Diferença em dias (toISO - fromISO), positiva se `to` for depois de `from`. */
export function diffInDaysISO(fromISO, toISO) {
  const from = toLocalMidnight(fromISO);
  const to = toLocalMidnight(toISO);
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.round((to.getTime() - from.getTime()) / msPerDay);
}

export function addDaysISO(dataISO, n) {
  const date = toLocalMidnight(dataISO);
  date.setDate(date.getDate() + n);
  return fromLocalMidnight(date);
}

const MESES_PT = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
];

export function formatDatePtBR(dataISO) {
  const { day, month } = parseISOParts(dataISO);
  return `${day} ${MESES_PT[month - 1]}`;
}

const MESES_PT_EXTENSO = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

export function formatDateExtensoPtBR(dataISO) {
  const { day, month } = parseISOParts(dataISO);
  return `${day} de ${MESES_PT_EXTENSO[month - 1]}`;
}

export function formatDateNumericPtBR(dataISO) {
  const { day, month, year } = parseISOParts(dataISO);
  return `${pad2(day)}/${pad2(month)}/${year}`;
}

export function formatMonthLabelPtBR(yearMonth) {
  const [year, month] = yearMonth.split('-').map(Number);
  return `${MESES_PT[month - 1]} de ${year}`;
}
