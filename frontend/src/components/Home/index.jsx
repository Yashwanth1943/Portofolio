import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NavLink } from 'react-router-dom';
import './index.scss';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const techRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set([heroRef.current, aboutRef.current, techRef.current], { opacity: 1 });
      return;
    }

    // --- GSAP CONTEXT (Strict Mode Safe) ---
    const ctx = gsap.context(() => {

      // Hero Section Animation
      gsap.from(heroRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
      });

      // About Section Animation
      gsap.from(aboutRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: aboutRef.current,
          start: "top 85%",
        }
      });

      // Tech Section Animation
      const techSection = techRef.current;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: techSection,
          start: "top 85%",
        }
      });

      tl.from(techSection.querySelector(".section-heading"), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out"
      });

      tl.from(
        techSection.querySelectorAll(".chip"),
        {
          opacity: 0,
          y: 20,
          stagger: 0.08,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.2"
      );
    });

    return () => ctx.revert(); // Clean, safe cleanup
  }, []);

  return (
    <div className="home-container">
      <div className="home-sections">
        
        {/* Hero Section */}
        <section ref={heroRef} className="hero-section">
          <h1 className="hero-heading">Hai, I'm Yashwanth.</h1>
          <p className="hero-subtitle">
            I'm a full-stack developer passionate about building
            clean, functional, and user-friendly web applications.
          </p>
          <div className="hero-buttons">
            <NavLink className="btn" to="/about">Get in Touch</NavLink>
            <NavLink className="btn" to="/projects">View My Work</NavLink>
          </div>
        </section>

        {/* About Section */}
        <section ref={aboutRef} className="about-section">
          <h2 className="section-heading">About Me</h2>
          <p className="about-text">
            I specialize in both front-end and back-end development,
            creating seamless and efficient digital experiences. My focus
            is on writing clean, reusable code and tackling complex
            challenges to deliver high-quality solutions.
          </p>
        </section>

        {/* Tech Section */}
        <section ref={techRef} className="tech-section">
          <h2 className="section-heading">Tech Stack</h2>
          <ul className="tech-stack">
            <li className="chip">Python</li>
            <li className="chip">JavaScript</li>
            <li className="chip">React</li>
            <li className="chip">Node.js</li>
            <li className="chip">Express.js</li>
            <li className="chip">MongoDB</li>
            <li className="chip">SQLite</li>
            <li className="chip">HTML5</li>
            <li className="chip">CSS3</li>
            <li className="chip">SCSS</li>
            <li className="chip">Bootstrap</li>
            <li className="chip">Flexbox</li>
            <li className="chip">Git</li>
          </ul>
        </section>

      </div>
    </div>
  );
};

export default HomePage;
