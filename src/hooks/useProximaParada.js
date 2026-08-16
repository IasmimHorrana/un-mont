import { useMemo } from 'react';
import { useDiario } from './useDiario';
import { useCountdown } from './useCountdown';
import { getProximaParadaAtual } from '../utils/proximaParada';

export function useProximaParada() {
  const { list } = useDiario();
  const { hojeISO } = useCountdown();
  return useMemo(() => getProximaParadaAtual(list, hojeISO), [list, hojeISO]);
}
