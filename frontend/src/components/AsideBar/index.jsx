import "./index.scss";
import { 
  FaHome, 
  FaUser, 
  FaCode, 
  FaGraduationCap, 
  FaLaptopCode, 
  FaCertificate, 
  FaTrophy, 
  FaEnvelope, 
  FaLinkedin, 
  FaGithub 
} from "react-icons/fa";

const AsideBar = ({ activeSection, scrollToSection }) => {
  const navItems = [
    { id: "hero", label: "Home", icon: <FaHome /> },
    { id: "about", label: "About", icon: <FaUser /> },
    { id: "skills", label: "Skills", icon: <FaCode /> },
    { id: "education", label: "Education", icon: <FaGraduationCap /> },
    { id: "projects", label: "Projects", icon: <FaLaptopCode /> },
    { id: "certifications", label: "Certificates", icon: <FaCertificate /> },
    { id: "achievements", label: "Achievements", icon: <FaTrophy /> },
    { id: "contact", label: "Contact", icon: <FaEnvelope /> },
  ];

  return (
    <aside className="aside-bar" aria-label="Section shortcuts">
      <nav className="aside-nav" aria-label="Sidebar shortcuts">
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={`aside-nav-btn ${activeSection === item.id ? "active" : ""}`}
                aria-label={`Scroll to ${item.label}`}
              >
                <span className="tooltip">{item.label}</span>
                {item.icon}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="aside-divider" aria-hidden="true" />

      <ul className="aside-socials">
        <li>
          <a
            href="https://www.linkedin.com/in/yasvanth-kosuri-007722195"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="icon linkedin-icon" />
          </a>
        </li>
        <li>
          <a
            href="https://github.com/Yashwanth1943"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <FaGithub className="icon github-icon" />
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default AsideBar;