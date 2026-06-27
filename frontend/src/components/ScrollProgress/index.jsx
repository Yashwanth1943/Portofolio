import React, { useEffect, useRef } from "react";
import "./index.scss";

const ScrollProgress = () => {
  const barRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
          if (totalScroll > 0 && barRef.current) {
            const progress = (window.scrollY / totalScroll) * 100;
            barRef.current.style.width = `${progress}%`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      ref={barRef}
      className="scroll-progress-bar" 
      style={{ width: "0%" }}
      aria-hidden="true"
    />
  );
};

export default ScrollProgress;
