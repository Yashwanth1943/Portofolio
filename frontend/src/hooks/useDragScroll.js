import { useEffect } from "react";

export default function useDragScroll(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let isDown = false;
    let startX;
    let scrollLeft;
    let totalMoved = 0;

    const handleMouseDown = (e) => {
      // Only drag on left click
      if (e.button !== 0) return;
      isDown = true;
      el.classList.add("dragging");
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      totalMoved = 0;
    };

    const handleMouseLeave = () => {
      if (!isDown) return;
      isDown = false;
      el.classList.remove("dragging");
    };

    const handleMouseUp = (e) => {
      if (!isDown) return;
      isDown = false;
      el.classList.remove("dragging");

      // If moved more than 6px, intercept click capture
      if (totalMoved > 6) {
        const preventClick = (clickEvent) => {
          clickEvent.preventDefault();
          clickEvent.stopPropagation();
        };
        el.addEventListener("click", preventClick, { capture: true, once: true });
      }
    };

    const handleMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 1.5; // multiplier adjusts dragging responsiveness
      el.scrollLeft = scrollLeft - walk;
      totalMoved = Math.abs(x - startX);
    };

    el.addEventListener("mousedown", handleMouseDown);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("mouseup", handleMouseUp);
    el.addEventListener("mousemove", handleMouseMove);

    return () => {
      el.removeEventListener("mousedown", handleMouseDown);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("mouseup", handleMouseUp);
      el.removeEventListener("mousemove", handleMouseMove);
    };
  }, [ref]);
}
