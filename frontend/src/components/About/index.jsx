import React from "react";
import { NavLink } from "react-router-dom";
import { HiMiniHome } from "react-icons/hi2";
import "./index.scss";

const education = [
  "BSc in Computer Science, Ravulapalem (2021-2024)",
  "MPC, Siddartha Junior College (2019-2021)",
  "ZP High School (2019)",
];

const certifications = [
  "Skyscanner Software Engineering Job Simulation Certificate",
  "Deloitte Data Analytics Certification",
  "Industry-Ready Certification (Nxtwave)",
  "Web Development and React.js Certification",
  "Python and SQL Certification",
];

const interests = [
  "Skilled in React, Node.js, Express.js, MongoDB, and SQLite",
  "Always learning and exploring new technologies",
  "Interested in building practical real-world applications",
];

const About = () => {
  return (
    <section className="about-page fade-up">
      <div className="about-shell">
        <header className="about-intro">
          <h1 className="about-heading">About Me</h1>
          <p className="about-text">
            I&apos;m <strong>Yashwanth</strong>, a passionate <strong>Full Stack Developer</strong>
            who loves building scalable, modern, and visually appealing web
            applications. I work with technologies like <strong>React, Node.js, MongoDB,</strong>
            <strong> SQLite,</strong> and <strong>Python</strong> to create clean,
            functional, and efficient solutions.
          </p>
        </header>

        <section className="about-block">
          <h2 className="section-title">Education</h2>
          <ul className="about-list" aria-label="Education">
            {education.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="about-block">
          <h2 className="section-title">Achievements and Certifications</h2>
          <ul className="about-list" aria-label="Certifications">
            {certifications.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="about-block">
          <h2 className="section-title">Skills and Interests</h2>
          <ul className="about-list" aria-label="Skills and interests">
            {interests.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
      <div className="signature-wrapper">
        <p className="signature">Yashwanth K..</p>
      </div>

      <NavLink to="/" className="back-home-link" aria-label="Back to home">
        <HiMiniHome />
      </NavLink>
    </section>
  );
};

export default About;
