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
  const aboutRef = useRef(null);
  const techRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set([heroRef.current, aboutRef.current, techRef.current], { opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.from(heroPhotoRef.current, {
        opacity: 0,
        scale: 0.92,
        y: 20,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out',
      });

      gsap.from(aboutRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 85%',
        },
      });

      const techSection = techRef.current;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: techSection,
          start: 'top 85%',
        },
      });

      tl.from(techSection.querySelector('.section-heading'), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out',
      });

      tl.from(
        techSection.querySelectorAll('.chip'),
        {
          opacity: 0,
          y: 20,
          stagger: 0.08,
          duration: 0.5,
          ease: 'power2.out',
        },
        '-=0.2'
      );
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
              <h1 className="hero-heading">Hai, I&apos;m Yashwanth.</h1>
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
                <NavLink className="btn" to="/contact">Get in Touch</NavLink>
                <NavLink className="btn" to="/projects">View My Work</NavLink>
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
                  src="/profile.jpg"
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

        <section ref={aboutRef} className="about-section">
          <div className="content-card">
            <h2 className="section-heading">About Me</h2>
            <p className="about-text">
              I specialize in both front-end and back-end development,
              creating seamless and efficient digital experiences. My focus
              is on writing clean, reusable code and solving complex problems
              with practical, high-quality solutions.
            </p>
          </div>
        </section>

        <section ref={techRef} className="tech-section">
          <div className="content-card">
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
              <li className="chip">Git</li>
              <li className="chip">Tailwind CSS</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;


