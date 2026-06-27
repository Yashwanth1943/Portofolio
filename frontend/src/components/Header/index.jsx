import "./index.scss";
import { useState, useEffect, useCallback, memo } from "react";

const Header = ({ activeSection, scrollToSection }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const handleNavClick = useCallback((sectionId) => {
    scrollToSection(sectionId);
    closeMobileMenu();
  }, [scrollToSection, closeMobileMenu]);

  const handleBrandClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    closeMobileMenu();
  }, [closeMobileMenu]);

  // Scroll listener to toggle glassmorphic header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeMobileMenu();
      }
    };

    if (isMobileMenuOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header className={`header-container ${scrolled ? 'scrolled' : ''}`}>
        {/* Brand Personal Logo */}
        <div className="brand-wrapper">
          <button onClick={handleBrandClick} className="brand-btn" aria-label="Brand Logo">
            Yashwanth
          </button>
        </div>

        {/* Hamburger Menu - Visible on mobile only */}
        <button 
          className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMobileMenuOpen}
          type="button"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </header>

      {/* Backdrop overlay for closing menu */}
      <div 
        className={`mobile-nav-overlay ${isMobileMenuOpen ? 'active' : ''}`} 
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Mobile Navigation Drawer */}
      <nav className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`} aria-label="Mobile navigation">
        <button onClick={() => handleNavClick("hero")} className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`}>Home</button>
        <button onClick={() => handleNavClick("about")} className={`nav-link ${activeSection === 'about' ? 'active' : ''}`}>About</button>
        <button onClick={() => handleNavClick("skills")} className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`}>Skills</button>
        <button onClick={() => handleNavClick("education")} className={`nav-link ${activeSection === 'education' ? 'active' : ''}`}>Education</button>
        <button onClick={() => handleNavClick("projects")} className={`nav-link ${activeSection === 'projects' ? 'active' : ''}`}>Projects</button>
        <button onClick={() => handleNavClick("certifications")} className={`nav-link ${activeSection === 'certifications' ? 'active' : ''}`}>Certificates</button>
        <button onClick={() => handleNavClick("achievements")} className={`nav-link ${activeSection === 'achievements' ? 'active' : ''}`}>Achievements</button>
        <button onClick={() => handleNavClick("contact")} className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}>Let's Connect</button>
      </nav>
    </>
  );
};

export default memo(Header);