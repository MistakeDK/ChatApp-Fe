import { debounce } from "lodash";
import { useEffect, useMemo, RefObject } from "react";

interface IProps {
  divElement: RefObject<HTMLDivElement | null>;
  delay?: number;
  event: (direction: "top" | "bottom") => void;
}

export const useScrollEvent = ({ divElement, event, delay = 300 }: IProps) => {
  const debouncedEvent = useMemo(
    () =>
      debounce((direction: "top" | "bottom") => {
        event(direction);
      }, delay),
    [event, delay]
  );

  useEffect(() => {
    const handleScroll = () => {
      const el = divElement.current;
      if (!el) return;

      const { scrollTop, clientHeight, scrollHeight } = el;

      if (scrollTop <= 20) {
        debouncedEvent("top");
      }

      if (scrollTop + clientHeight >= scrollHeight - 20) {
        debouncedEvent("bottom");
      }
    };

    const el = divElement.current;
    if (el) {
      el.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (el) {
        el.removeEventListener("scroll", handleScroll);
      }
      debouncedEvent.cancel();
    };
  }, [divElement, debouncedEvent]);

  return null;
};
