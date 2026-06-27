import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import Header from "./components/Header";
import AsideBar from "./components/AsideBar";
import First5Seconds from "./components/First5Seconds";
import ScrollProgress from "./components/ScrollProgress";
import SideRays from "./components/SideRays/SideRays";
import useFadeUpOnScroll from "./hooks/useFadeUpOnScroll";
import "./App.scss";

// Lazy load section components for performance and code splitting
const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const Skills = lazy(() => import("./components/Skills"));
const Education = lazy(() => import("./components/Education"));
const Projects = lazy(() => import("./components/Projects"));
const Certificates = lazy(() => import("./components/Certificates"));
const Achievements = lazy(() => import("./components/Achievements"));
const Contact = lazy(() => import("./components/Contact"));
const Footer = lazy(() => import("./components/Footer"));

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
  // Uses MutationObserver too so lazy-mounted sections are caught
  useEffect(() => {
    if (showSplash) return;

    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -60% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const observed = new Set();

    const observeAll = () => {
      document.querySelectorAll("section[id]").forEach((section) => {
        if (!observed.has(section)) {
          observer.observe(section);
          observed.add(section);
        }
      });
    };

    observeAll();

    // Re-observe when lazy sections mount
    const mutObserver = new MutationObserver(observeAll);
    mutObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutObserver.disconnect();
    };
  }, [showSplash]);

  const scrollToSection = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  if (showSplash) {
    return <First5Seconds />;
  }

  return (
    <div className="app-container">
      {/* Global SideRays — fixed, full-viewport, behind everything */}
      <div className="app-side-rays" aria-hidden="true">
        <SideRays
          speed={1.6}
          rayColor1="#a78bfa"
          rayColor2="#38bdf8"
          intensity={2.0}
          spread={2.4}
          origin="top-right"
          tilt={-8}
          saturation={1.5}
          blend={0.6}
          falloff={1.6}
          opacity={0.75}
        />
      </div>

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
        <Suspense fallback={<div style={{ minHeight: "100px" }} />}>
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
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer scrollToSection={scrollToSection} />
      </Suspense>
    </div>
  );
};

export default App;