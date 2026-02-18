import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.scss';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "Python", desc: "A versatile programming language used in web, AI, and automation.", link: "https://www.python.org/" },
  { name: "JavaScript", desc: "Programming language for web interactivity.", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript" },
  { name: "React", desc: "A JavaScript library for building user interfaces.", link: "https://react.dev/" },
  { name: "Node.js", desc: "JavaScript runtime for backend development.", link: "https://nodejs.org/" },
  { name: "Express.js", desc: "A minimalist web framework for Node.js.", link: "https://expressjs.com/" },
  { name: "MongoDB", desc: "A NoSQL database storing flexible JSON-like documents.", link: "https://www.mongodb.com/" },
  { name: "SQLite", desc: "A lightweight, serverless database engine.", link: "https://www.sqlite.org/" },
  { name: "HTML", desc: "The standard markup language for web pages.", link: "https://developer.mozilla.org/en-US/docs/Web/HTML" },
  { name: "CSS", desc: "Used for styling and designing web pages.", link: "https://developer.mozilla.org/en-US/docs/Web/CSS" },
  { name: "SCSS", desc: "CSS preprocessor for cleaner styling.", link: "https://sass-lang.com/" },
  { name: "Bootstrap", desc: "Popular CSS framework for responsive UI.", link: "https://getbootstrap.com/" },
  { name: "Flexbox", desc: "CSS layout module for flexible layouts.", link: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/" },
];

const Skills = () => {
  const skillsRef = useRef(null);

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

  return (
    <div className="skills-container" ref={skillsRef}>
      <h2 className="skills-title">My Skills</h2>

      <div className="skills-grid-wrapper">
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-card">
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
