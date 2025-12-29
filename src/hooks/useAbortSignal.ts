import { useCallback, useRef } from "react";
import { AbortClass } from "../api/classes/AbortClass";

export default function useAbortSignal() {
  const abortRef = useRef<AbortClass | null>(null);

  const getAbortSignal = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
    }

    abortRef.current = new AbortClass();

    return abortRef.current;
  }, []);

  return getAbortSignal;
}
