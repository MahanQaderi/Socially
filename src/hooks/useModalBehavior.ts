import { useEffect, useRef } from "react";

// closes a modal with the escape key and keeps the page behind it from scrolling
export const useModalBehavior = (onClose: () => void, isEnabled = true) => {
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isEnabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
    };

    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;

    // keep the page from jumping when the scrollbar goes away
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) document.body.style.paddingRight = `${scrollbarWidth}px`;

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isEnabled]);
};
