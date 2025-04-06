import { debounce } from "lodash";
import { RefObject, useEffect, useMemo } from "react";

interface IProps {
  divElement: RefObject<HTMLDivElement | null>;
  delay: number;
  event: () => void;
}
export const useScrollEvent = ({ divElement, event, delay = 300 }: IProps) => {
  const debouncedEvent = useMemo(() => debounce(event, delay), [event, delay]);
  useEffect(() => {
    const handleScroll = () => {
      const el = divElement.current;
      if (!el) return;

      const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 20;

      if (isAtBottom) {
        debouncedEvent();
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
  }, [divElement, event]);
  return null;
};
