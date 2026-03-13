import { useEffect, useRef, useState } from "react";
import "./index.scss";

const setCursorPosition = (element, x, y) => {
  if (!element) {
    return;
  }

  element.style.setProperty("--cursor-x", `${x}px`);
  element.style.setProperty("--cursor-y", `${y}px`);
};

const CustomCursor = ({ variant = "default" }) => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const rafRef = useRef(null);
  const ringPosRef = useRef({ x: 0, y: 0 });
  const mousePosRef = useRef({ x: 0, y: 0 });
  const hoveredRef = useRef(false);
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const canUseMatchMedia =
      typeof window !== "undefined" && typeof window.matchMedia === "function";

    if (!canUseMatchMedia) {
      return;
    }

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const noReducedMotion =
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!finePointer || !noReducedMotion) {
      return;
    }

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-enabled");

    const interactiveSelector =
      variant === "splash"
        ? [
            "a",
            "button",
            "[role='button']",
            "input",
            "textarea",
            "select",
            "summary",
            "[data-cursor='interactive']",
            ".splash-panel",
            ".splash-pill",
            ".splash-stat",
          ].join(", ")
        : [
            "a",
            "button",
            "[role='button']",
            "input",
            "textarea",
            "select",
            "summary",
            "[data-cursor='interactive']",
          ].join(", ");

    const updateHovered = (target) => {
      const nextHovered =
        target instanceof Element &&
        Boolean(target.closest(interactiveSelector));

      if (hoveredRef.current !== nextHovered) {
        hoveredRef.current = nextHovered;
        setHovered(nextHovered);
      }
    };

    const animate = () => {
      ringPosRef.current.x += (mousePosRef.current.x - ringPosRef.current.x) * 0.2;
      ringPosRef.current.y += (mousePosRef.current.y - ringPosRef.current.y) * 0.2;

      setCursorPosition(dotRef.current, mousePosRef.current.x, mousePosRef.current.y);
      setCursorPosition(ringRef.current, ringPosRef.current.x, ringPosRef.current.y);

      rafRef.current = requestAnimationFrame(animate);
    };

    const onMove = (event) => {
      mousePosRef.current = { x: event.clientX, y: event.clientY };
      updateHovered(event.target);

      if (!ringPosRef.current.x && !ringPosRef.current.y) {
        ringPosRef.current = { x: event.clientX, y: event.clientY };
      }
    };

    const onDown = () => setActive(true);
    const onUp = () => setActive(false);
    const onLeave = () => {
      setActive(false);
      hoveredRef.current = false;
      setHovered(false);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseleave", onLeave);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("custom-cursor-enabled");
    };
  }, [variant]);

  if (!enabled) {
    return null;
  }

  const ringClassName = [
    "cursor-ring",
    active && "is-active",
    hovered && "is-hovered",
    variant === "splash" && "is-splash",
  ]
    .filter(Boolean)
    .join(" ");

  const dotClassName = [
    "cursor-dot",
    active && "is-active",
    hovered && "is-hovered",
    variant === "splash" && "is-splash",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <span
        ref={ringRef}
        className={ringClassName}
        aria-hidden="true"
      />
      <span
        ref={dotRef}
        className={dotClassName}
        aria-hidden="true"
      />
    </>
  );
};

export default CustomCursor;
