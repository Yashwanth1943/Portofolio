import { useState, useEffect } from "react";
import Home from "./components/Home";
import Certificates from "./components/Certificates";
import Header from "./components/Header";
import AsideBar from "./components/AsideBar";
import First5Seconds from "./components/First5Seconds";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import About from "./components/About";
import Education from "./components/Education";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import useFadeUpOnScroll from "./hooks/useFadeUpOnScroll";
import "./App.scss";

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");

  // Run scroll fade-up animations on the single-page layout once splash is dismissed
  useFadeUpOnScroll(showSplash ? "splash" : "main");

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Highlight active section using Intersection Observer
  useEffect(() => {
    if (showSplash) return;

    const sections = document.querySelectorAll("section[id]");
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // triggers when section dominates the viewport center
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [showSplash]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (showSplash) {
    return <First5Seconds />;
  }

  return (
    <div className="app-container">
      {/* Background Energy Glows */}
      <div className="energy-glow blob-1" aria-hidden="true" />
      <div className="energy-glow blob-2" aria-hidden="true" />
      <div className="energy-glow blob-3" aria-hidden="true" />

      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      
      <Header 
        activeSection={activeSection} 
        scrollToSection={scrollToSection} 
      />
      
      <AsideBar 
        activeSection={activeSection} 
        scrollToSection={scrollToSection} 
      />

      <main className="app-main">
        <section id="hero">
          <Home />
        </section>

        <section id="about" className="fade-up">
          <About />
        </section>

        <section id="skills" className="fade-up">
          <Skills />
        </section>

        <section id="education" className="fade-up">
          <Education />
        </section>

        <section id="projects" className="fade-up">
          <Projects />
        </section>

        <section id="certifications" className="fade-up">
          <Certificates />
        </section>

        <section id="achievements" className="fade-up">
          <Achievements />
        </section>

        <section id="contact" className="fade-up">
          <Contact />
        </section>
      </main>

      <Footer scrollToSection={scrollToSection} />
    </div>
  );
};

export default App;