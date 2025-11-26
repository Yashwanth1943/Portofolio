import React, { useEffect, useRef } from 'react';
import "./index.scss";
import { NavLink } from 'react-router-dom';
import { HiMiniHome } from "react-icons/hi2";
import { gsap } from "gsap";

const About = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    gsap.from(aboutRef.current.querySelectorAll(".fade-section"), {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
    });
  }, []);

  return (
    <div className="about-page" ref={aboutRef}>
      
      <h1 className="about-heading fade-section">About Me</h1>

      <p className="yashwanth-about-text fade-section">
        I’m <strong>Yashwanth</strong>, a passionate{" "}
        <strong>Full Stack Developer</strong> who loves building scalable, modern,
        and visually appealing web applications.  
        I work with technologies like <strong>React, Node.js, MongoDB, SQLite,</strong>  
        and <strong>Python</strong> to create clean, functional, and efficient solutions.
      </p>

      <h2 className="section-title fade-section">Education</h2>
      <div className="info-section fade-section">
        <p>🎓 <strong>BSc in Computer Science</strong>, Ravulapalem (2021–2024)</p>
        <p>🏫 <strong>MPC</strong>, Siddartha Junior College (2019–2021)</p>
        <p>📘 <strong>ZP High School</strong> (2019)</p>
      </div>

      <h2 className="section-title fade-section">Achievements & Certifications</h2>
      <div className="info-section fade-section">
        <p>✅ Industry-Ready Certification (Nxtwave)</p>
        <p>✅ Web Development & React.js Certification</p>
        <p>✅ Python & SQL Certification</p>
      </div>

      <h2 className="section-title fade-section">Skills & Interests</h2>
      <div className="info-section fade-section">
        <p>💡 Skilled in <strong>React, Node.js, Express.js, MongoDB, SQLite</strong></p>
        <p>🌱 Always learning & exploring new technologies</p>
        <p>🚀 Interested in creating impactful real-world apps</p>
      </div>

      <NavLink to="/" className="back-home-link">
        <HiMiniHome />
      </NavLink>
    </div>
  );
};

export default About;
