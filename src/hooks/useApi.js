import { useCallback, useEffect, useState } from 'react';
import { timedFetch } from '../lib/request.js';

/** Busca um endpoint ao montar o componente e expõe `reload`. */
export function useApi(url) {
  const [state, setState] = useState({ loading: true, ok: false, status: null, ms: null, data: null, error: null });

  const load = useCallback(async () => {
    setState((s) => ({ ...s, loading: true }));
    const result = await timedFetch(url);
    setState({ loading: false, ...result });
  }, [url]);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, reload: load };
}
