import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useDragScroll from "../../hooks/useDragScroll";
import "./index.scss";

gsap.registerPlugin(ScrollTrigger);

const rotations = [-2.5, 1.8, -1.2, 2.2, -1.8, 1.5];
const yOffsets = [4, -2, 2, -4, 0, -3];

export default function Projects() {
  const projectsRef = useRef(null);
  const viewportRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useDragScroll(viewportRef);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const projects = [
    {
      id: "portfolio-website",
      title: "Personal Portfolio Website",
      desc: "A responsive portfolio website built with React, showcasing projects, skills, and contact information with smooth animations.",
      tech: ["React", "GSAP", "CSS"],
      demo: "https://portofolio-neon-six.vercel.app",
      code: "https://github.com/Yashwanth1943/Portofolio.git",
    },
    {
      id: "expense-tracker",
      title: "Expense Tracker App",
      desc: "A user-friendly expense tracker with features to add, edit, and delete expenses, along with data visualization.",
      tech: ["React", "LocalStorage", "CSS"],
      demo: "https://bellcorp-expense-tracker-frontend.vercel.app/",
      code: "https://github.com/Yashwanth1943/bellcorp-expense-tracker-frontend.git"
    },
    {
      id: "todo-app-codex",
      title: "Todo Application",
      desc: "Built a simple Todo Manager using Codex with full CRUD functionality to add, update, and delete tasks. Used localStorage for persistent storage and explored how Codex can assist in faster and more efficient development.",
      tech: ["Codex","React", "LocalStorage", "CSS"],
      demo: "https://todo-three-cyan-30.vercel.app/",
      code: "https://github.com/Yashwanth1943/todo.git"
    },
    {
      id: "nirog-gyan",
      title: "Nirog Gyan - Health Information Platform",
      desc: "A React-based platform providing health-related resources and awareness information, built with clean UI and responsive design.",
      tech: ["React", "REST API"],
      demo: "https://nirog-gyan-alpha.vercel.app/",
      code: "https://github.com/Yashwanth1943/nirogGyan.git",
    },
    {
      id: "jobby-app",
      title: "Jobby App",
      desc: "A job search application with authentication, job listings, filters, and detailed job descriptions.",
      tech: ["React", "React Router", "REST API", "CSS"],
      demo: "https://jobbyapp1234.ccbp.tech/",
      code: "https://github.com/Yashwanth1943/jobby-app.git",
    },
    {
      id: "nxt-trendz",
      title: "Nxt Trendz - E-commerce App",
      desc: "An e-commerce website clone with login authentication, product listings, cart management, and responsive UI.",
      tech: ["React", "React Router", "JWT Auth", "CSS"],
      demo: "https://yashnexttrendz.ccbp.tech/login",
      code: "https://github.com/Yashwanth1943/Nxt-Trendz.git",
    },
    {
      id: "todo-app-enhanced",
      title: "Todo Application",
      desc: "A simple and efficient todo manager with CRUD operations and persistent storage.",
      tech: ["React", "LocalStorage", "CSS"],
      demo: "https://yashtodos.ccbp.tech/",
      code: "https://github.com/Yashwanth1943/enhanced-simple-todos.git",
    },
    {
      id: "covid-dashboard",
      title: "COVID-19 Dashboard",
      desc: "Interactive dashboard to track COVID-19 statistics with charts and state-wise details.",
      tech: ["React", "REST API", "CSS"],
      demo: "https://dashbordcovid.ccbp.tech/",
      code: "https://github.com/Yashwanth1943/covid-dashboard.git",
    },
    {
      id: "ccbp-journey",
      title: "CCBP Journey",
      desc: "A personal journey project showcasing learning progress and milestones during the CCBP program.",
      tech: ["HTML", "CSS", "JavaScript"],
      demo: "https://yashccbp.ccbp.tech/",
      code: "https://github.com/Yashwanth1943/ccbp-timeline.git",
    },
    {
      id: "uno-restaurant",
      title: "UNO Restaurant Website",
      desc: "A responsive restaurant website featuring menu, specials, and contact details with attractive design.",
      tech: ["HTML", "CSS", "JavaScript"],
      demo: "https://yashrestaurant.ccbp.tech/",
      code: "https://github.com/Yashwanth1943/Restaurant-App.git",
    },
  ];

  let visibleCount = 3;
  if (windowWidth < 640) {
    visibleCount = 1;
  } else if (windowWidth < 1024) {
    visibleCount = 2;
  }

  const maxIndex = Math.max(0, projects.length - visibleCount);

  const handleScroll = () => {
    const el = viewportRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / projects.length;
    const index = Math.round(el.scrollLeft / cardWidth);
    setCurrentIndex(Math.min(maxIndex, index));
  };

  const handlePrev = () => {
    const el = viewportRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / projects.length;
    el.scrollTo({
      left: el.scrollLeft - cardWidth,
      behavior: "smooth",
    });
  };

  const handleNext = () => {
    const el = viewportRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / projects.length;
    el.scrollTo({
      left: el.scrollLeft + cardWidth,
      behavior: "smooth",
    });
  };

  const handleDotClick = (idx) => {
    const el = viewportRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / projects.length;
    el.scrollTo({
      left: idx * cardWidth,
      behavior: "smooth",
    });
    setCurrentIndex(idx);
  };

  useEffect(() => {
    const section = projectsRef.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
        },
      });

      tl.from(section.querySelector(".projects-heading"), {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      });

      tl.from(
        section.querySelectorAll(".project-card"),
        {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.2"
      );
    }, projectsRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="projects-container" ref={projectsRef}>
      <h1 className="projects-heading">My Work</h1>

      <div className="projects-carousel-wrapper">
        <button
          className="carousel-btn prev"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="Previous Project"
        >
          &#8249;
        </button>

        <div
          className="projects-carousel-viewport"
          ref={viewportRef}
          onScroll={handleScroll}
        >
          <div className="projects-carousel-track">
            {projects.map((p, index) => (
              <div
                key={p.id}
                className="project-card-wrapper"
                style={{
                  flex: `0 0 ${100 / visibleCount}%`,
                  padding: '0 12px',
                  zIndex: projects.length - index,
                }}
              >
                <div 
                  className="project-card"
                  style={{
                    transform: `rotate(${rotations[index % rotations.length]}deg) translateY(${yOffsets[index % yOffsets.length]}px)`,
                    transformOrigin: "center center",
                  }}
                >
                  <div className={`project-banner banner-${p.id}`} />
                  
                  <div className="project-content">
                    <h2 className="project-title">{p.title}</h2>
                    <p className="project-description">{p.desc}</p>

                    <div className="project-tech">
                      {p.tech.map((t, idx) => (
                        <span key={idx} className="project-tech-item">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="project-links">
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      Live Demo
                    </a>

                    <a
                      href={p.code}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link secondary"
                    >
                      Code
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="carousel-btn next"
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
          aria-label="Next Project"
        >
          &#8250;
        </button>
      </div>

      <div className="carousel-dots">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            className={`carousel-dot ${currentIndex === idx ? 'active' : ''}`}
            onClick={() => handleDotClick(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
