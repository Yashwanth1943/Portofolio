import "./index.scss";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="header-container">
        <div>
          <NavLink to="/" className="brand-text">Yashwanth</NavLink>
        </div>
        {/* Desktop Navigation Links */}
        <nav className="right-side-container"> 
          <NavLink to="/" className="nav-link">Home</NavLink>
          <NavLink to="/projects" className="nav-link">Projects</NavLink>
          <NavLink to="/skills" className="nav-link">Skills</NavLink>
          <NavLink to="/certificates" className="nav-link">Certificates</NavLink>
          <NavLink to="/about" className="nav-link">About</NavLink>
          <NavLink to="/contact" className="nav-link">Let's Connect</NavLink>
        </nav>

        {/* Hamburger Menu - Visible on mobile only */}
        <div 
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
        <NavLink to="/" className="nav-link" onClick={closeMobileMenu}>Home</NavLink>
        <NavLink to="/projects" className="nav-link" onClick={closeMobileMenu}>Projects</NavLink>
        <NavLink to="/skills" className="nav-link" onClick={closeMobileMenu}>Skills</NavLink>
        <NavLink to="/certificates" className="nav-link" onClick={closeMobileMenu}>Certificates</NavLink>
        <NavLink to="/about" className="nav-link" onClick={closeMobileMenu}>About</NavLink>
        <NavLink to="/contact" className="nav-link" onClick={closeMobileMenu}>Let's Connect</NavLink>
      </div>
    </>
  );
};

export default Header;