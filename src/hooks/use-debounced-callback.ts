import { useRef, useEffect, useCallback } from "react";

export function useDebouncedCallback(
  callback: (...args: unknown[]) => void,
  wait: number,
  dependencies: unknown[],
) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const callbackRef = useRef(callback);
  const dependenciesRef = useRef(dependencies);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    dependenciesRef.current = dependencies;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return useCallback((...args: unknown[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callbackRef.current(...args);
    }, wait);
  }, [wait]);
}
