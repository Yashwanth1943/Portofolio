import React from 'react';
import "./index.scss";
import { NavLink } from 'react-router-dom';
import { HiMiniHome } from "react-icons/hi2";

const About = () => {
  return (
    <div className="about-page">
      <h1 className="about-heading">About Me</h1>

      <p className="yashwanth-about-text">
        I’m <strong>Yashwanth</strong>, a dedicated and enthusiastic{" "}
        <strong>Full Stack Developer</strong> with a strong interest in building
        modern, scalable, and user-friendly web applications.  
        My expertise lies in working with technologies like{" "}
        <strong>React, Node.js, Python, MongoDB, and SQLite</strong> to deliver
        clean, efficient, and impactful solutions.
      </p>

      <h2 className="section-title">Education</h2>
      <div className="education-section">
        <p>
          🎓 <strong>Bachelor’s in Computer Science</strong> – Government Degree
          College, Ravulapalem (2021–2024)
        </p>
        <p>
          🏫 <strong>Intermediate (MPC)</strong> – Siddartha Junior College
          (2019–2021)
        </p>
        <p>
          📘 <strong>Schooling</strong> – ZP High School (2019)
        </p>
      </div>

      <h2 className="section-title">Achievements & Certifications</h2>
      <div className="certifications-section">
        <p>✅ Industry-Ready Certification from Nxtwave</p>
        <p>✅ Web Development & React.js Certification</p>
        <p>✅ Python & SQL Certification</p>
      </div>

      <h2 className="section-title">Skills & Interests</h2>
      <div className="skills-section">
        <p>
          💡 Skilled in developing full-stack applications with a strong
          foundation in <strong>JavaScript, React, Node.js, Express.js,</strong>{" "}
          and databases like <strong>MongoDB & SQLite</strong>.
        </p>
        <p>
          🌱 Constantly learning and exploring new technologies to improve my
          problem-solving and development skills.
        </p>
        <p>
          🚀 Interested in creating real-world applications that bring value and
          make a difference.
        </p>
      </div>
      <NavLink to="/" className="back-home-link">
         <HiMiniHome />
      </NavLink>
    </div>
  );
};

export default About;