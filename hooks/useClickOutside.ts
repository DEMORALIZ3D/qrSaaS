import { useEffect, RefObject } from "react";

const useClickOutside = (
  ref: RefObject<HTMLDivElement | null>,
  handler: (event: MouseEvent | TouchEvent) => void // Corrected handler type
) => {
  useEffect(() => {
    let startedInside = false;
    let startedWhenMounted = false;

    const listener = (event: MouseEvent | TouchEvent) => {
      // Do nothing if `mousedown` or `touchstart` started inside ref element
      if (startedInside || !startedWhenMounted) return;
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as Node)) return; // Type assertion

      handler(event);
    };

    const validateEventStart = (event: MouseEvent | TouchEvent) => {
      startedWhenMounted = !!ref.current; // Use !! to convert to boolean
      startedInside = ref.current
        ? ref.current.contains(event.target as Node)
        : false; // Type assertion and check for null
    };

    document.addEventListener("mousedown", validateEventStart);
    document.addEventListener("touchstart", validateEventStart);
    document.addEventListener("click", listener); // Use "click" is better

    return () => {
      document.removeEventListener("mousedown", validateEventStart);
      document.removeEventListener("touchstart", validateEventStart);
      document.removeEventListener("click", listener); // Use "click" is better
    };
  }, [ref, handler]);
};

export default useClickOutside;
