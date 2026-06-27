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

  // Use refs instead of state to avoid React re-renders on every mouse event
  const isActiveRef = useRef(false);
  const isHoveredRef = useRef(false);
  const isMovingRef = useRef(false);
  const stopTimerRef = useRef(null);

  const [enabled, setEnabled] = useState(false);

  // Apply classes directly to DOM instead of using setState
  const applyClasses = (el, baseClass, active, hovered, isSplash) => {
    if (!el) return;
    const cls = [
      baseClass,
      active && "is-active",
      hovered && "is-hovered",
      isSplash && "is-splash",
    ]
      .filter(Boolean)
      .join(" ");
    el.className = cls;
  };

  useEffect(() => {
    const canUseMatchMedia =
      typeof window !== "undefined" && typeof window.matchMedia === "function";

    if (!canUseMatchMedia) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const noReducedMotion =
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!finePointer || !noReducedMotion) return;

    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-enabled");

    const isSplash = variant === "splash";

    const interactiveSelector = isSplash
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
        target instanceof Element && Boolean(target.closest(interactiveSelector));
      if (isHoveredRef.current !== nextHovered) {
        isHoveredRef.current = nextHovered;
        // Directly mutate DOM class — no setState, no re-render
        applyClasses(ringRef.current, "cursor-ring", isActiveRef.current, nextHovered, isSplash);
        applyClasses(dotRef.current, "cursor-dot", isActiveRef.current, nextHovered, isSplash);
      }
    };

    const animate = () => {
      const dx = mousePosRef.current.x - ringPosRef.current.x;
      const dy = mousePosRef.current.y - ringPosRef.current.y;

      // Only update if there's meaningful movement (skip idle frames)
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        ringPosRef.current.x += dx * 0.2;
        ringPosRef.current.y += dy * 0.2;
        setCursorPosition(ringRef.current, ringPosRef.current.x, ringPosRef.current.y);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const onMove = (event) => {
      mousePosRef.current = { x: event.clientX, y: event.clientY };

      if (!ringPosRef.current.x && !ringPosRef.current.y) {
        ringPosRef.current = { x: event.clientX, y: event.clientY };
      }

      // Update dot position immediately via DOM (no React re-render)
      setCursorPosition(dotRef.current, event.clientX, event.clientY);

      updateHovered(event.target);

      if (!isMovingRef.current) {
        isMovingRef.current = true;
      }
      if (stopTimerRef.current) {
        clearTimeout(stopTimerRef.current);
      }
      stopTimerRef.current = setTimeout(() => {
        isMovingRef.current = false;
      }, 150);
    };

    const onDown = () => {
      isActiveRef.current = true;
      applyClasses(ringRef.current, "cursor-ring", true, isHoveredRef.current, isSplash);
      applyClasses(dotRef.current, "cursor-dot", true, isHoveredRef.current, isSplash);
    };

    const onUp = () => {
      isActiveRef.current = false;
      applyClasses(ringRef.current, "cursor-ring", false, isHoveredRef.current, isSplash);
      applyClasses(dotRef.current, "cursor-dot", false, isHoveredRef.current, isSplash);
    };

    const onLeave = () => {
      isActiveRef.current = false;
      isHoveredRef.current = false;
      applyClasses(ringRef.current, "cursor-ring", false, false, isSplash);
      applyClasses(dotRef.current, "cursor-dot", false, false, isSplash);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("mouseleave", onLeave);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (stopTimerRef.current) clearTimeout(stopTimerRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("mouseleave", onLeave);
      document.documentElement.classList.remove("custom-cursor-enabled");
    };
  }, [variant]);

  if (!enabled) return null;

  const isSplash = variant === "splash";

  return (
    <>
      <span
        ref={ringRef}
        className={`cursor-ring${isSplash ? " is-splash" : ""}`}
        aria-hidden="true"
      />
      <span
        ref={dotRef}
        className={`cursor-dot${isSplash ? " is-splash" : ""}`}
        aria-hidden="true"
      />
    </>
  );
};

export default CustomCursor;
