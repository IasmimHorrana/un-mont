import { useMemo } from 'react';
import { useDiario } from './useDiario';
import { getTodayLocalISO } from '../utils/date';
import { generateAlbumSlots, groupSlotsByMonth } from '../utils/album';

export function useAlbumSlots() {
  const { byDate } = useDiario();

  return useMemo(() => {
    const hojeISO = getTodayLocalISO();
    const slots = generateAlbumSlots(byDate, hojeISO);
    return { slots, groups: groupSlotsByMonth(slots) };
  }, [byDate]);
}
