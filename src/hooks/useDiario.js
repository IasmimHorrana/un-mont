import { useContext } from 'react';
import { DiarioContext } from '../context/diarioContextObject';

export function useDiario() {
  const ctx = useContext(DiarioContext);
  if (!ctx) {
    throw new Error('useDiario deve ser usado dentro de <DiarioProvider>.');
  }
  return ctx;
}
