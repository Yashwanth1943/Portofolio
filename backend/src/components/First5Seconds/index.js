import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./index.scss";

// Utility function to split text and handle spacing correctly
const splitText = (selector) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    element.innerHTML = element.textContent
      .split("")
      .map((letter) => {
        return letter === " " ? "<span>&nbsp;</span>" : `<span>${letter}</span>`;
      })
      .join("");
  });
};

const AnimatedWelcome = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Split the text of each item before starting the animation
      splitText(".item");

      const tl = gsap.timeline();

      // Animate the first phrase
      tl.from(".first span", {
        opacity: 0,
        y: 20,
        rotationX: -90,
        duration: 0.6,
        stagger: 0.05,
        ease: "back.out(1.7)",
      });

      // Animate the second phrase, starting 0.2 seconds before the previous one ends
      tl.from(".second span", {
        opacity: 0,
        y: 20,
        rotationX: -90,
        duration: 0.6,
        stagger: 0.05,
        ease: "back.out(1.7)",
      }, "-=0.2");

      // Animate the third phrase, starting 0.1 seconds after the previous one starts
      tl.from(".third span", {
        opacity: 0,
        y: 20,
        rotationX: -90,
        duration: 0.6,
        stagger: 0.05,
        ease: "back.out(1.7)",
      }, "<0.1");
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="container" ref={containerRef}>
      <div className="item first">Hai</div>
      <div className="item second"> I'm Yashwanth,</div>
      <div className="item third">A Full Stack Developer.</div>
    </div>
  );
};

export default AnimatedWelcome;