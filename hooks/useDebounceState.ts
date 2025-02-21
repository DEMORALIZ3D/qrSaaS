import { useCallback, useEffect, useRef } from "react";

/**
 * Debounced callback hook.
 * @param callback - The callback function to be debounced.
 * @param delay - The debounce delay in milliseconds.
 * @returns A debounced callback function.
 */
function useDebouncedCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): (...args: Parameters<T>) => void {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const latestCallback = useRef<T>(callback);
  const latestArgs = useRef<Parameters<T> | null>(null); // Store the latest arguments

  useEffect(() => {
    latestCallback.current = callback;
  }, [callback]);

  const debouncedCallback = useCallback(
    (...args: Parameters<T>) => {
      latestArgs.current = args; // Store the latest arguments

      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = setTimeout(() => {
        if (latestArgs.current) {
          //Check args still exist
          latestCallback.current(...latestArgs.current);
        }
        timerRef.current = null;
        latestArgs.current = null; //Clear args
      }, delay);
    },
    [delay]
  );

  // Clean up the timer if the component unmounts or the delay changes
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [delay]);

  return debouncedCallback;
}

export default useDebouncedCallback;
