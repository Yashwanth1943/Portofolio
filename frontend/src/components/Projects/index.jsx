import React, { useRef, useEffect, useState, useCallback, memo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./index.scss";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "portfolio-website",
    title: "Personal Portfolio Website",
    desc: "A responsive portfolio website built with React, showcasing projects, skills, and contact information with smooth animations and modern design.",
    tech: ["React", "GSAP", "SCSS"],
    demo: "https://portofolio-neon-six.vercel.app",
    code: "https://github.com/Yashwanth1943/Portofolio.git",
    gradient: "linear-gradient(135deg, #6d28d9 0%, #a78bfa 40%, #38bdf8 100%)",
    icon: "⚡",
  },
  {
    id: "expense-tracker",
    title: "Expense Tracker App",
    desc: "A user-friendly expense tracker with features to add, edit, and delete expenses, along with real-time data visualization.",
    tech: ["React", "LocalStorage", "CSS"],
    demo: "https://bellcorp-expense-tracker-frontend.vercel.app/",
    code: "https://github.com/Yashwanth1943/bellcorp-expense-tracker-frontend.git",
    gradient: "linear-gradient(135deg, #0891b2 0%, #06b6d4 45%, #67e8f9 100%)",
    icon: "💰",
  },
  {
    id: "todo-app-codex",
    title: "Todo Application",
    desc: "Built with Codex – full CRUD operations, localStorage persistence, and a faster AI-assisted development workflow.",
    tech: ["Codex", "React", "LocalStorage", "CSS"],
    demo: "https://todo-three-cyan-30.vercel.app/",
    code: "https://github.com/Yashwanth1943/todo.git",
    gradient: "linear-gradient(135deg, #059669 0%, #10b981 45%, #6ee7b7 100%)",
    icon: "✅",
  },
  {
    id: "nirog-gyan",
    title: "Nirog Gyan – Health Platform",
    desc: "React-based health information platform providing health resources and awareness content with clean UI and responsive design.",
    tech: ["React", "REST API"],
    demo: "https://nirog-gyan-alpha.vercel.app/",
    code: "https://github.com/Yashwanth1943/nirogGyan.git",
    gradient: "linear-gradient(135deg, #db2777 0%, #ec4899 45%, #f9a8d4 100%)",
    icon: "🏥",
  },
  {
    id: "jobby-app",
    title: "Jobby App",
    desc: "A full-featured job search application with JWT authentication, job listings, search filters, and detailed job descriptions.",
    tech: ["React", "React Router", "REST API", "CSS"],
    demo: "https://jobbyapp1234.ccbp.tech/",
    code: "https://github.com/Yashwanth1943/jobby-app.git",
    gradient: "linear-gradient(135deg, #d97706 0%, #f59e0b 45%, #fcd34d 100%)",
    icon: "💼",
  },
  {
    id: "nxt-trendz",
    title: "Nxt Trendz – E-commerce",
    desc: "An e-commerce website clone with login authentication, product listings, cart management, and a fully responsive UI.",
    tech: ["React", "React Router", "JWT Auth", "CSS"],
    demo: "https://yashnexttrendz.ccbp.tech/login",
    code: "https://github.com/Yashwanth1943/Nxt-Trendz.git",
    gradient: "linear-gradient(135deg, #7c3aed 0%, #8b5cf6 45%, #c4b5fd 100%)",
    icon: "🛒",
  },
  {
    id: "covid-dashboard",
    title: "COVID-19 Dashboard",
    desc: "Interactive dashboard to track COVID-19 statistics with dynamic charts, state-wise data breakdown, and live API integration.",
    tech: ["React", "REST API", "CSS"],
    demo: "https://dashbordcovid.ccbp.tech/",
    code: "https://github.com/Yashwanth1943/covid-dashboard.git",
    gradient: "linear-gradient(135deg, #0369a1 0%, #0ea5e9 45%, #7dd3fc 100%)",
    icon: "📊",
  },
  {
    id: "uno-restaurant",
    title: "UNO Restaurant Website",
    desc: "A responsive restaurant website featuring a stylish menu layout, daily specials, and contact details with an attractive design.",
    tech: ["HTML", "CSS", "JavaScript"],
    demo: "https://yashrestaurant.ccbp.tech/",
    code: "https://github.com/Yashwanth1943/Restaurant-App.git",
    gradient: "linear-gradient(135deg, #b45309 0%, #f59e0b 45%, #fbbf24 100%)",
    icon: "🍽️",
  },
];

const ProjectCard = memo(({ project, isActive, onClick, index }) => (
  <button
    className={`proj-card ${isActive ? "proj-card--active" : ""}`}
    onClick={() => onClick(index)}
    aria-label={`View ${project.title}`}
    style={{ "--card-gradient": project.gradient }}
  >
    {/* Gradient face */}
    <div className="proj-card__face">
      <span className="proj-card__icon">{project.icon}</span>
    </div>

    <div className="proj-card__body">
      <h3 className="proj-card__title">{project.title}</h3>
      <div className="proj-card__pills">
        {project.tech.slice(0, 3).map((t) => (
          <span key={t} className="proj-card__pill">{t}</span>
        ))}
        {project.tech.length > 3 && (
          <span className="proj-card__pill proj-card__pill--more">+{project.tech.length - 3}</span>
        )}
      </div>
    </div>

    <div className="proj-card__active-bar" />
  </button>
));

export default function Projects() {
  const sectionRef = useRef(null);
  const detailRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = useCallback((index) => {
    if (index === activeIndex) return;
    setActiveIndex(index);
  }, [activeIndex]);

  // Animate detail panel on change
  useEffect(() => {
    if (!detailRef.current) return;
    gsap.fromTo(
      detailRef.current,
      { opacity: 0, y: 14 },
      { opacity: 1, y: 0, duration: 0.38, ease: "power2.out" }
    );
  }, [activeIndex]);

  // Section entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".projects-heading", {
        opacity: 0, y: 30, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 82%" },
      });
      gsap.from(".proj-card", {
        opacity: 0, y: 24, stagger: 0.07, duration: 0.5, ease: "power2.out",
        scrollTrigger: { trigger: ".proj-grid", start: "top 88%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const active = projects[activeIndex];

  return (
    <div className="projects-container" ref={sectionRef}>
      <h1 className="projects-heading">My Work</h1>

      {/* Featured panel */}
      <div
        className="proj-featured"
        ref={detailRef}
        style={{ "--card-gradient": active.gradient }}
      >
        {/* Gradient hero block */}
        <div className="proj-featured__hero">
          <span className="proj-featured__icon">{active.icon}</span>
          <div className="proj-featured__hero-glow" />
        </div>

        {/* Info */}
        <div className="proj-featured__info">
          <h2 className="proj-featured__title">{active.title}</h2>
          <div className="proj-featured__pills">
            {active.tech.map((t) => (
              <span key={t} className="tech-pill">{t}</span>
            ))}
          </div>
          <p className="proj-featured__desc">{active.desc}</p>
          <div className="proj-featured__links">
            <a href={active.demo} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Live Demo
            </a>
            <a href={active.code} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              Source Code
            </a>
          </div>
        </div>
      </div>

      {/* Card grid */}
      <div className="proj-grid">
        {projects.map((p, i) => (
          <ProjectCard
            key={p.id}
            project={p}
            index={i}
            isActive={i === activeIndex}
            onClick={handleSelect}
          />
        ))}
      </div>
    </div>
  );
}
