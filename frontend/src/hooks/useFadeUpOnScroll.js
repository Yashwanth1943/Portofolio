import { useEffect } from "react";

const useFadeUpOnScroll = (routeKey) => {
  useEffect(() => {
    const elements = document.querySelectorAll(".fade-up");

    if (!elements.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    elements.forEach((el) => {
      if (el.classList.contains("visible")) {
        return;
      }
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [routeKey]);
};

export default useFadeUpOnScroll;