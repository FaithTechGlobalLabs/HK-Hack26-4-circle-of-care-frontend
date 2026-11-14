"use client";

import { useCallback, useEffect, useState } from "react";
import { ApiError } from "./api";

interface ResourceState<T> {
  data: T | null;
  error: ApiError | null;
}

/**
 * Runs `load` on mount, whenever `load` changes (memoise it with useCallback),
 * on `reload()`, and optionally every `refreshMs`. Keeps the last good data
 * while a refresh is in flight or fails.
 */
export function useResource<T>(load: () => Promise<T>, refreshMs?: number) {
  const [state, setState] = useState<ResourceState<T>>({ data: null, error: null });
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let active = true;
    const run = () =>
      load().then(
        (data) => active && setState({ data, error: null }),
        (err: unknown) => {
          if (!active) return;
          const error = err instanceof ApiError ? err : new ApiError("other", 0);
          setState((prev) => ({ data: prev.data, error }));
        },
      );

    run();
    const timer = refreshMs ? window.setInterval(run, refreshMs) : undefined;
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [load, refreshMs, nonce]);

  const reload = useCallback(() => setNonce((n) => n + 1), []);

  return { ...state, loading: !state.data && !state.error, reload };
}
