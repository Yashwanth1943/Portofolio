import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useDragScroll from "../../hooks/useDragScroll";
import './index.scss';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "Python", desc: "A versatile programming language used in web, AI, and automation.", link: "https://www.python.org/", category: "Languages" },
  { name: "JavaScript", desc: "Programming language for web interactivity.", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", category: "Languages" },
  { name: "React", desc: "A JavaScript library for building user interfaces.", link: "https://react.dev/", category: "Frontend" },
  { name: "Node.js", desc: "JavaScript runtime for backend development.", link: "https://nodejs.org/", category: "Backend" },
  { name: "Express.js", desc: "A minimalist web framework for Node.js.", link: "https://expressjs.com/", category: "Backend" },
  { name: "MongoDB", desc: "A NoSQL database storing flexible JSON-like documents.", link: "https://www.mongodb.com/", category: "Database" },
  { name: "SQLite", desc: "A lightweight, serverless database engine.", link: "https://www.sqlite.org/", category: "Database" },
  { name: "Tailwind CSS", desc: "Utility-first CSS framework for rapid UI development.", link: "https://tailwindcss.com/", category: "Frontend" },
  { name: "HTML", desc: "The standard markup language for web pages.", link: "https://developer.mozilla.org/en-US/docs/Web/HTML", category: "Frontend" },
  { name: "CSS", desc: "Used for styling and designing web pages.", link: "https://developer.mozilla.org/en-US/docs/Web/CSS", category: "Frontend" },
  { name: "SCSS", desc: "CSS preprocessor for cleaner styling.", link: "https://sass-lang.com/", category: "Frontend" },
  { name: "Bootstrap", desc: "Popular CSS framework for responsive UI.", link: "https://getbootstrap.com/", category: "Frontend" },
  { name: "Flexbox", desc: "CSS layout module for flexible layouts.", link: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/", category: "Frontend" },
  { name: "Git", desc: "Version control system for tracking source code changes.", link: "https://git-scm.com/", category: "Tools" },
];

const categories = ["All", "Frontend", "Backend", "Database", "Tools", "Languages"];

const rotations = [-2.5, 1.8, -1.2, 2.2, -1.8, 1.5];
const yOffsets = [4, -2, 2, -4, 0, -3];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const skillsRef = useRef(null);
  const viewportRef = useRef(null);
  const isFirstRender = useRef(true);

  useDragScroll(viewportRef);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredSkills = activeCategory === "All"
    ? skills
    : skills.filter(skill => skill.category === activeCategory);

  let visibleCount = 3;
  if (windowWidth < 640) {
    visibleCount = 1;
  } else if (windowWidth < 1024) {
    visibleCount = 2;
  }

  const maxIndex = Math.max(0, filteredSkills.length - visibleCount);

  // Reset scroll on category tab change
  useEffect(() => {
    setCurrentIndex(0);
    const el = viewportRef.current;
    if (el) {
      el.scrollLeft = 0;
    }
  }, [activeCategory]);

  const handleScroll = () => {
    const el = viewportRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / filteredSkills.length;
    const index = Math.round(el.scrollLeft / cardWidth);
    setCurrentIndex(Math.min(maxIndex, index));
  };

  const handlePrev = () => {
    const el = viewportRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / filteredSkills.length;
    el.scrollTo({
      left: el.scrollLeft - cardWidth,
      behavior: "smooth",
    });
  };

  const handleNext = () => {
    const el = viewportRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / filteredSkills.length;
    el.scrollTo({
      left: el.scrollLeft + cardWidth,
      behavior: "smooth",
    });
  };

  const handleDotClick = (idx) => {
    const el = viewportRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / filteredSkills.length;
    el.scrollTo({
      left: idx * cardWidth,
      behavior: "smooth",
    });
    setCurrentIndex(idx);
  };

  useEffect(() => {
    const section = skillsRef.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
        }
      });

      tl.from(section.querySelector(".skills-title"), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out"
      });

      tl.from(section.querySelectorAll(".skill-card"), {
        opacity: 0,
        y: 20,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out"
      });
    }, skillsRef);

    return () => ctx.revert();  
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    gsap.fromTo(
      skillsRef.current.querySelectorAll(".skill-card"),
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, stagger: 0.05, duration: 0.4, ease: "power2.out" }
    );
  }, [activeCategory]);

  return (
    <div className="skills-container" ref={skillsRef}>
      <h1 className="skills-title">My Skills</h1>

      <div className="skills-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`skills-tab ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="skills-carousel-wrapper">
        {maxIndex > 0 && (
          <button
            className="carousel-btn prev"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous Skill"
          >
            &#8249;
          </button>
        )}

        <div
          className="skills-carousel-viewport"
          ref={viewportRef}
          onScroll={handleScroll}
        >
          <div className="skills-carousel-track">
            {filteredSkills.map((skill, index) => (
              <div
                key={index}
                className="skill-card-wrapper"
                style={{
                  flex: `0 0 ${100 / visibleCount}%`,
                  padding: "0 12px",
                  zIndex: filteredSkills.length - index,
                }}
              >
                <div 
                  className="skill-card"
                  style={{
                    transform: `rotate(${rotations[index % rotations.length]}deg) translateY(${yOffsets[index % yOffsets.length]}px)`,
                    transformOrigin: "center center",
                  }}
                >
                  <h3>{skill.name}</h3>
                  <p>{skill.desc}</p>
                  <a
                    href={skill.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="skill-btn"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {maxIndex > 0 && (
          <button
            className="carousel-btn next"
            onClick={handleNext}
            disabled={currentIndex >= maxIndex}
            aria-label="Next Skill"
          >
            &#8250;
          </button>
        )}
      </div>

      {maxIndex > 0 && (
        <div className="carousel-dots">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              className={`carousel-dot ${currentIndex === idx ? "active" : ""}`}
              onClick={() => handleDotClick(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default Skills;
