import React from 'react';
import './index.scss';
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { HiOutlineChevronDoubleUp } from "react-icons/hi2";

const Footer = ({ scrollToSection }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <h2 className="footer-logo" onClick={() => scrollToSection("hero")}>Yashwanth</h2>
          <p className="footer-tagline">
            Building clean, fast, and accessible digital products.
          </p>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          <button onClick={() => scrollToSection("hero")}>Home</button>
          <button onClick={() => scrollToSection("about")}>About</button>
          <button onClick={() => scrollToSection("skills")}>Skills</button>
          <button onClick={() => scrollToSection("education")}>Education</button>
          <button onClick={() => scrollToSection("projects")}>Projects</button>
          <button onClick={() => scrollToSection("certifications")}>Certificates</button>
          <button onClick={() => scrollToSection("contact")}>Connect</button>
        </nav>

        <div className="footer-socials">
          <a
            href="https://www.linkedin.com/in/yasvanth-kosuri-007722195"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://github.com/Yashwanth1943"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <button 
          className="scroll-to-top" 
          onClick={() => scrollToSection("hero")}
          aria-label="Scroll to top"
        >
          <HiOutlineChevronDoubleUp />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
