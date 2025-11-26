import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home"; // This component should contain the hero and about sections
import Certificates from "./components/Certificates";
import Header from "./components/Header";
import AsideBar from "./components/AsideBar";
import First5Seconds from "./components/First5Seconds";
import Projects from "./components/Projects"; // This component should contain ONLY the projects
import Skills from "./components/Skills";
import About from "./components/About";
<<<<<<< HEAD
import Contact from "./components/Contact";
=======
>>>>>>> 87b939ce974c43e162e3ba6ce4f3abe14ae7c355
import "./App.scss";

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <First5Seconds />;
  }

  return (
    <div className="app-container">
      <Header className="app-header" />
      <AsideBar className="app-aside" />
      <div className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/about" element={<About />} />
<<<<<<< HEAD
          <Route path="/contact" element={<Contact />} />
=======
>>>>>>> 87b939ce974c43e162e3ba6ce4f3abe14ae7c355
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;