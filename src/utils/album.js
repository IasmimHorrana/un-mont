import { START_DATE, END_DATE, TOTAL_DIAS } from './constants';
import { addDaysISO, isUnlocked } from './date';

/**
 * Gera os 183 slots virtuais do Álbum, independente de quantas linhas existem
 * na planilha ainda. `isSpecial` é decidido por data (== END_DATE), não por
 * índice, para casar com a âncora canônica do produto (aniversário de 1 ano).
 */
export function generateAlbumSlots(byDate, hojeISO) {
  const slots = [];
  for (let i = 0; i < TOTAL_DIAS; i += 1) {
    const date = addDaysISO(START_DATE, i);
    const entry = byDate?.[date] ?? null;
    slots.push({
      date,
      index: i,
      isSpecial: date === END_DATE,
      unlocked: isUnlocked(date, hojeISO),
      entry,
      hasContent: Boolean(entry?.hasContent),
    });
  }
  return slots;
}

export function groupSlotsByMonth(slots) {
  const groups = new Map();
  for (const slot of slots) {
    const key = slot.date.slice(0, 7);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(slot);
  }
  return [...groups.entries()].map(([month, items]) => ({ month, items }));
}
