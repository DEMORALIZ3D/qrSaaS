import { useRef, useEffect, useCallback } from "react";

// Generic debounce hook
function useDebounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // useCallback is crucial here for performance and correctness.
  const debouncedFunc = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        console.log("Debounced function called");
        func(...args);
        timeoutRef.current = null; // Clear the timeout ID after execution
      }, delay);
    },
    [func, delay] // Dependencies of the callback
  );

  // Clean up the timeout on unmount or if the function/delay changes.
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [debouncedFunc]); // Dependency on debouncedFunc ensures cleanup on changes

  return debouncedFunc;
}

export default useDebounce;
