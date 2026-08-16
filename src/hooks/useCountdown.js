import { useMemo } from 'react';
import { START_DATE, END_DATE } from '../utils/constants';
import { getTodayLocalISO, diffInDaysISO } from '../utils/date';

export function useCountdown() {
  return useMemo(() => {
    const hojeISO = getTodayLocalISO();
    const diasRestantes = Math.max(0, diffInDaysISO(hojeISO, END_DATE));
    const fase = hojeISO < START_DATE
      ? 'pre-lancamento'
      : hojeISO >= END_DATE
        ? 'concluido'
        : 'em-andamento';

    return { hojeISO, diasRestantes, fase };
  }, []);
}
