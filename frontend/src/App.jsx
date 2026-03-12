import { useState, useEffect, useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Certificates from "./components/Certificates";
import Header from "./components/Header";
import AsideBar from "./components/AsideBar";
import First5Seconds from "./components/First5Seconds";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import About from "./components/About";
import Contact from "./components/Contact";
import CustomCursor from "./components/CustomCursor";
import useFadeUpOnScroll from "./hooks/useFadeUpOnScroll";
import "./App.scss";

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const location = useLocation();

  useFadeUpOnScroll(location.pathname);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  useLayoutEffect(() => {
    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      const appMain = document.querySelector(".app-main");
      if (appMain) {
        appMain.scrollTop = 0;
      }
    };

    resetScroll();
    requestAnimationFrame(resetScroll);
  }, [location.pathname]);

  if (showSplash) {
    return <First5Seconds />;
  }

  return (
    <div className="app-container">
      <CustomCursor />
      <Header className="app-header" />
      <AsideBar className="app-aside" />
      <div className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;