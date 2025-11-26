import "./index.scss"; // Assuming a separate SCSS file
import { FaLinkedin, FaGithub } from "react-icons/fa";

const AsideBar = () => {
  return (
    <aside className="aside-bar">
      <ul>
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