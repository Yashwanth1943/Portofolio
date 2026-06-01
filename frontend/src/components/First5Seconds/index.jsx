import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import TextLine from "./TextLine";
import "./index.scss";

const lineAnimation = {
  opacity: 0,
  y: 20,
  rotationX: -90,
  duration: 0.6,
  stagger: 0.05,
  ease: "back.out(1.7)",
};

const getCharacters = (lineRef) => lineRef.current?.querySelectorAll(".char") || [];

const First5Seconds = () => {
  const containerRef = useRef(null);
  const firstLineRef = useRef(null);
  const secondLineRef = useRef(null);
  const thirdLineRef = useRef(null);

  useEffect(() => {
    const root = containerRef.current;

    if (!root) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set(".char", { opacity: 1, y: 0, rotationX: 0 });
        return;
      }

      const tl = gsap.timeline();

      tl.from(getCharacters(firstLineRef), lineAnimation)
        .from(getCharacters(secondLineRef), lineAnimation, "-=0.2")
        .from(getCharacters(thirdLineRef), lineAnimation, "<0.1")
        .fromTo(".loader-bar", { width: "0%" }, { width: "100%", duration: 1.8, ease: "power2.inOut" }, "-=0.2")
        .to(root, { opacity: 0, duration: 0.4, ease: "power2.out" });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div className="container" ref={containerRef}>
      <TextLine ref={firstLineRef} className="first" text="Hai" />
      <TextLine ref={secondLineRef} className="second" text="I'm Yashwanth," />
      <TextLine
        ref={thirdLineRef}
        className="third"
        text="A Full Stack Developer."
      />
      <div className="loader-container">
        <div className="loader-bar" />
      </div>
    </div>
  );
};

export default First5Seconds;
