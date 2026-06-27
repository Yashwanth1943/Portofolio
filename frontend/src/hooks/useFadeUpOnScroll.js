import { useEffect } from "react";

/**
 * Watches for .fade-up elements and animates them visible when they
 * enter the viewport. Uses a MutationObserver so it catches sections
 * that mount *after* Suspense resolves (lazy-loaded chunks).
 */
const useFadeUpOnScroll = (routeKey) => {
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    // Observe any .fade-up element that isn't already visible
    const observeNew = (el) => {
      if (!el.classList.contains("visible")) {
        intersectionObserver.observe(el);
      }
    };

    // Observe all currently mounted .fade-up elements
    document.querySelectorAll(".fade-up").forEach(observeNew);

    // Also observe any that mount later (lazy-loaded Suspense children)
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          // Check the node itself
          if (node.classList.contains("fade-up")) {
            observeNew(node);
          }
          // Check descendants
          node.querySelectorAll(".fade-up").forEach(observeNew);
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      intersectionObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [routeKey]);
};

export default useFadeUpOnScroll;