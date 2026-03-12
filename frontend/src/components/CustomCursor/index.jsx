import { useEffect, useRef, useState } from "react";
import "./index.scss";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const rafRef = useRef(null);
  const ringPosRef = useRef({ x: 0, y: 0 });
  const mousePosRef = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const noReducedMotion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!finePointer || !noReducedMotion) {
      return;
    }

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-enabled");

    const animate = () => {
      ringPosRef.current.x += (mousePosRef.current.x - ringPosRef.current.x) * 0.2;
      ringPosRef.current.y += (mousePosRef.current.y - ringPosRef.current.y) * 0.2;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePosRef.current.x}px, ${mousePosRef.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const onMove = (event) => {
      mousePosRef.current = { x: event.clientX, y: event.clientY };

      if (!ringPosRef.current.x && !ringPosRef.current.y) {
        ringPosRef.current = { x: event.clientX, y: event.clientY };
      }
    };

    const onDown = () => setActive(true);
    const onUp = () => setActive(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.classList.remove("custom-cursor-enabled");
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <span
        ref={ringRef}
        className={`cursor-ring ${active ? "is-active" : ""}`}
        aria-hidden="true"
      />
      <span
        ref={dotRef}
        className={`cursor-dot ${active ? "is-active" : ""}`}
        aria-hidden="true"
      />
    </>
  );
};

export default CustomCursor;