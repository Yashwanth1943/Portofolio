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

<<<<<<< HEAD
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
=======
  useEffect(() => {
    // Select all the card wrappers using a class selector
    const cardWrappers = gsap.utils.toArray(".project-card-wrapper");

    // Loop through each card to apply a unique animation with its own trigger
    cardWrappers.forEach((card) => {
      gsap.fromTo(
        card,
        {
          // FROM state: start hidden and below
          opacity: 0,
          y: 100,
          rotation: 8,
        },
        {
          // TO state: end visible at normal position
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card, // The individual card is the trigger
            start: "top 80%", // The animation starts when the card is 80% down the viewport
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <div className="projects-container">
      <h1 className="projects-heading">My Work</h1>
      <div className="projects-list" ref={projectsRef}>
>>>>>>> 87b939ce974c43e162e3ba6ce4f3abe14ae7c355
        {projects.map((p) => (
          <div key={p.id} className="project-card-wrapper">
            <div className="project-card">
              <div className="project-content">
                <h2 className="project-title">{p.title}</h2>
                <p className="project-description">{p.desc}</p>
<<<<<<< HEAD

                <div className="project-tech">
                  {p.tech.map((t, idx) => (
                    <span key={idx} className="project-tech-item">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

=======
                <div className="project-tech">
                  {p.tech.map((t, idx) => (
                    <span key={idx} className="project-tech-item">{t}</span>
                  ))}
                </div>
              </div>
>>>>>>> 87b939ce974c43e162e3ba6ce4f3abe14ae7c355
              <div className="project-links">
                <a
                  href={p.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
<<<<<<< HEAD
                  Live Demo
                </a>

=======
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z"></path>
                    <path d="M5 5h5V3H3v7h2V5z"></path>
                    <path d="M5 19h14V9h2v12H3V9h2v10z"></path>
                  </svg>
                  Live Demo
                </a>
>>>>>>> 87b939ce974c43e162e3ba6ce4f3abe14ae7c355
                <a
                  href={p.code}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link secondary"
                >
<<<<<<< HEAD
=======
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 .5C5.73.5.98 5.24.98 11.5c0 4.84 3.14 8.95 7.49 10.4.55.1.75-.24.75-.53v-1.86c-3.05.66-3.7-1.29-3.7-1.29-.5-1.26-1.22-1.6-1.22-1.6-1-.68.08-.67.08-.67 1.1.08 1.68 1.13 1.68 1.13.98 1.68 2.58 1.2 3.2.92.1-.72.38-1.2.7-1.48-2.43-.28-4.98-1.22-4.98-5.43 0-1.2.43-2.18 1.13-2.95-.1-.28-.5-1.43.1-2.97 0 0 .93-.3 3.05 1.13a10.5 10.5 0 0 1 5.56 0c2.12-1.43 3.04-1.13 3.04-1.13.6 1.54.2 2.69.1 2.97.7.77 1.12 1.75 1.12 2.95 0 4.22-2.56 5.15-5 5.43.4.34.76 1 .76 2.02v2.99c0 .29.2.64.76.53a10.52 10.52 0 0 0 7.48-10.4C23.03 5.24 18.28.5 12 .5z"></path>
                  </svg>
>>>>>>> 87b939ce974c43e162e3ba6ce4f3abe14ae7c355
                  Code
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 87b939ce974c43e162e3ba6ce4f3abe14ae7c355
