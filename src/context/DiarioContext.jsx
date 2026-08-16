import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchDiario } from '../services/sheetdb';
import { readCache, writeCache, isFresh } from '../services/cache';
import { CACHE_KEY, CACHE_TTL_MS } from '../utils/constants';
import { DiarioContext } from './diarioContextObject';

export function DiarioProvider({ children }) {
  const [state, setState] = useState({
    status: 'loading',
    byDate: {},
    list: [],
    error: null,
  });
  const initRef = useRef(false);

  const load = useCallback(async () => {
    try {
      const { byDate, list, fetchedAt } = await fetchDiario();
      writeCache(CACHE_KEY, { byDate, list, fetchedAt });
      setState({ status: 'success', byDate, list, error: null });
    } catch (error) {
      setState((prev) => {
        if (prev.status === 'success') {
          // Já havia dado em tela (do cache) — erro de rede fica silencioso.
          return prev;
        }
        return { status: 'error', byDate: {}, list: [], error };
      });
    }
  }, []);

  useEffect(() => {
    if (initRef.current) return;
    initRef.current = true;

    const cached = readCache(CACHE_KEY);
    if (cached?.value) {
      setState({
        status: 'success',
        byDate: cached.value.byDate,
        list: cached.value.list,
        error: null,
      });
      if (!isFresh(cached.fetchedAt, CACHE_TTL_MS)) {
        load();
      }
    } else {
      load();
    }
  }, [load]);

  return (
    <DiarioContext.Provider value={{ ...state, refetch: load }}>
      {children}
    </DiarioContext.Provider>
  );
}
