import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { NavLink } from 'react-router-dom';
import './index.scss';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const [photoLoaded, setPhotoLoaded] = useState(true);
  const heroRef = useRef(null);
  const heroPhotoRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set(heroRef.current, { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, {
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from(heroPhotoRef.current, {
        opacity: 0,
        scale: 0.92,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="home-container">
      <div className="home-sections">
        <section ref={heroRef} className="hero-section">
          <div className="hero-layout">
            <div className="hero-copy">
              <p className="hero-kicker">FULL-STACK DEVELOPER</p>

              <h1 className="hero-heading" aria-label="Hi, I'm Yashwanth">
                <span className="hero-heading-prefix">Hi, I&apos;m</span>
                <span className="hero-heading-name">Yashwanth</span>
              </h1>

              <p className="hero-subtitle">
                I build clean, fast, and user-friendly web applications with a
                strong focus on performance, responsiveness, and maintainable architecture.
              </p>

              <ul className="hero-highlights" aria-label="Core strengths">
                <li>Modern responsive UI</li>
                <li>Scalable backend APIs</li>
                <li>Performance-focused builds</li>
              </ul>

              <div className="hero-buttons">
                <NavLink className="btn btn-primary" to="/contact" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}>Get in Touch</NavLink>
                <NavLink className="btn btn-secondary" to="/projects" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}>View My Work</NavLink>
              </div>
            </div>

            <figure
              ref={heroPhotoRef}
              className="hero-photo-frame"
              aria-label="Yashwanth profile photo"
            >
              {photoLoaded ? (
                <img
                  className="hero-photo"
                  src={process.env.PUBLIC_URL + "/profile.jpg"}
                  alt="Yashwanth portrait"
                  width="800"
                  height="800"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  sizes="(min-width: 1024px) 300px, (min-width: 768px) 32vw, 54vw"
                  onError={() => setPhotoLoaded(false)}
                />
              ) : (
                <div className="hero-photo-fallback" aria-hidden="true">YS</div>
              )}
            </figure>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;