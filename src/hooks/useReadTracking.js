import { useCallback, useEffect, useState } from 'react';
import { READ_TRACKING_KEY } from '../utils/constants';

function loadReadSet() {
  try {
    const raw = localStorage.getItem(READ_TRACKING_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function persistReadSet(set) {
  try {
    localStorage.setItem(READ_TRACKING_KEY, JSON.stringify([...set]));
  } catch {
    // Sem quota/indisponível — indicador "já visto" fica só nesta sessão.
  }
}

/** Marca uma data como lida direto no localStorage — usado pelas telas de detalhe, sem precisar de estado reativo. */
export function markDateAsRead(date) {
  const set = loadReadSet();
  if (set.has(date)) return;
  set.add(date);
  persistReadSet(set);
}

/** Indicador puramente cosmético de "já visto" no Álbum — nunca gate de desbloqueio. */
export function useReadTracking() {
  const [readDates, setReadDates] = useState(loadReadSet);

  const markAsRead = useCallback((date) => {
    setReadDates((prev) => {
      if (prev.has(date)) return prev;
      const next = new Set(prev);
      next.add(date);
      persistReadSet(next);
      return next;
    });
  }, []);

  return { readDates, markAsRead };
}

export function useMarkAsReadOnMount(date) {
  useEffect(() => {
    if (date) markDateAsRead(date);
  }, [date]);
}
