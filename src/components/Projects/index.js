import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./index.scss";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const projectsRef = useRef(null);

  const projects = [
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
      id: "todo-app",
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

  // ---------- NEW ANIMATION (IDENTICAL TO SKILLS) ----------
  useEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: projectsRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    timeline
      .from(".projects-heading", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      })
      .from(
        ".project-card-wrapper",
        {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "-=0.2"
      );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf([
        projectsRef.current,
        ".project-card-wrapper",
        ".projects-heading",
      ]);
    };
  }, []);

  return (
    <div className="projects-container" ref={projectsRef}>
      <h1 className="projects-heading">My Work</h1>

      <div className="projects-list">
        {projects.map((p) => (
          <div key={p.id} className="project-card-wrapper">
            <div className="project-card">
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
  );
}
