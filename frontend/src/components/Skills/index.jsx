import React, { useEffect, useRef, useState } from 'react';
import { motion, motionValue } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './index.scss';

gsap.registerPlugin(ScrollTrigger);

const skillsList = [
  { name: "React", category: "Frontend", desc: "A JavaScript library for building component-based user interfaces." },
  { name: "JavaScript", category: "Languages", desc: "Lightweight, interpreted programming language for dynamic web interactivity." },
  { name: "Node.js", category: "Backend", desc: "JavaScript runtime environment built on Chrome's V8 engine." },
  { name: "Express", category: "Backend", desc: "Minimalist and flexible web application framework for Node.js backends." },
  { name: "MongoDB", category: "Database", desc: "NoSQL document database storing application data in JSON-like format." },
  { name: "SQLite", category: "Database", desc: "Self-contained, serverless, zero-configuration SQL database engine." },
  { name: "Python", category: "Languages", desc: "Versatile, high-level programming language known for readability and clean syntax." },
  { name: "HTML5", category: "Frontend", desc: "The core structure and markup language of the World Wide Web." },
  { name: "CSS3", category: "Frontend", desc: "Cascading stylesheets used to create modern visual design and presentation." },
  { name: "Bootstrap", category: "Frontend", desc: "Popular responsive CSS framework for mobile-first web designs." },
  { name: "Tailwind CSS", category: "Frontend", desc: "Utility-first CSS framework for rapid and responsive UI layouts." },
  { name: "Git", category: "Tools", desc: "Distributed version control system to track changes in source code." },
];

const categories = ["All", "Languages", "Frontend", "Backend", "Database", "Tools"];

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState(null);
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const skillsRef = useRef(null);
  const containerRef = useRef(null);
  const cardsStateRef = useRef([]);
  const dimensionsRef = useRef({ width: 1000, height: 500 });
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const hoveredIdRef = useRef(null);

  // Sync hoveredId to a ref so physics loop can access it synchronously
  useEffect(() => {
    hoveredIdRef.current = hoveredId;
  }, [hoveredId]);

  // Set up motion values once for all cards (bypasses React renders on physics ticks)
  const motionValuesRef = useRef([]);
  if (motionValuesRef.current.length !== skillsList.length) {
    motionValuesRef.current = skillsList.map(() => ({
      x: motionValue(0),
      y: motionValue(0),
      rotate: motionValue(0),
    }));
  }

  // Monitor container sizing dynamically
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      dimensionsRef.current = {
        width: rect.width || 1000,
        height: rect.height || 500,
      };
    };

    updateDimensions();
    const ro = new ResizeObserver(updateDimensions);
    ro.observe(container);

    return () => ro.disconnect();
  }, []);

  // Initialize card positions avoiding immediate overlaps
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const { width, height } = dimensionsRef.current;
    const isMobileLocal = window.innerWidth < 768;
    const cardW = isMobileLocal ? 110 : 150;
    const cardH = isMobileLocal ? 40 : 52;

    const numCards = skillsList.length;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Spread cards out in a ring relative to container dimensions
    const radiusX = Math.max(50, centerX - cardW - 30);
    const radiusY = Math.max(50, centerY - cardH - 30);

    const initialCards = skillsList.map((skill, index) => {
      const angle = (index / numCards) * Math.PI * 2;
      const rX = radiusX * (0.45 + Math.random() * 0.4);
      const rY = radiusY * (0.45 + Math.random() * 0.4);

      const startX = centerX + Math.cos(angle) * rX - cardW / 2;
      const startY = centerY + Math.sin(angle) * rY - cardH / 2;

      return {
        ...skill,
        id: index,
        x: startX,
        y: startY,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        rotation: (Math.random() - 0.5) * 5,
        heightOffset: 0,
        expandUp: false,
      };
    });

    cardsStateRef.current = initialCards;

    // Apply values to Framer motion values initially
    initialCards.forEach((c) => {
      const mValues = motionValuesRef.current[c.id];
      if (mValues) {
        mValues.x.set(c.x);
        mValues.y.set(c.y);
        mValues.rotate.set(c.rotation);
      }
    });
  }, []);

  // Continuous physics drift loop
  useEffect(() => {
    let rafId;
    let lastTime = performance.now();

    const loop = (time) => {
      // Normalize velocity dt based on standard 60fps tick (16.67ms)
      const dt = Math.min((time - lastTime) / 16.666, 2.0);
      lastTime = time;

      const cards = cardsStateRef.current;
      if (!cards || cards.length === 0) {
        rafId = requestAnimationFrame(loop);
        return;
      }

      const { width, height } = dimensionsRef.current;
      const isMobileLocal = window.innerWidth < 768;
      const mouse = mouseRef.current;

      const getCardSize = (id) => {
        const isHovered = hoveredIdRef.current === id;
        const scale = isHovered ? 1.18 : (hoveredIdRef.current !== null ? 0.96 : 1.0);
        
        // Base dimensions (unscaled)
        const baseW = isMobileLocal ? 110 : 150;
        const baseH = isHovered 
          ? (isMobileLocal ? 135 : 165) 
          : (isMobileLocal ? 40 : 52);
          
        return {
          w: baseW * scale,
          h: baseH * scale
        };
      };

      // 1. Calculate accelerations & forces
      const padding = 15;
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];

        // Track and lock hover direction & heightOffset target
        const isHovered = hoveredIdRef.current === card.id;
        if (isHovered) {
          if (card.expandUp === undefined || card.expandUp === null) {
            // Only expand upwards if there is not enough space at the bottom of the container
            const hoveredHeight = (isMobileLocal ? 135 : 165) * 1.18;
            card.expandUp = card.y + hoveredHeight > height - padding;
          }
        } else {
          card.expandUp = null;
        }

        const targetOffset = (isHovered && card.expandUp) 
          ? (isMobileLocal ? 119.3 : 142.7) 
          : 0;
          
        card.heightOffset = card.heightOffset || 0;
        card.heightOffset += (targetOffset - card.heightOffset) * 0.15 * dt;

        // Soft wave-like baseline drift (anti-gravity sway)
        const swayX = Math.sin(time * 0.0007 + i * 1.7) * 0.012;
        const swayY = Math.cos(time * 0.0009 + i * 2.1) * 0.012;
        card.vx += swayX;
        card.vy += swayY;

        // Mouse magnetic effect (skip for active hovered card to avoid feedback/jitter loops)
        if (mouse.active && !isHovered) {
          const size = getCardSize(card.id);
          const cx = card.x + size.w / 2;
          const cy = card.y - (card.heightOffset || 0) + size.h / 2;
          const dx = mouse.x - cx;
          const dy = mouse.y - cy;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;

          const magnetRadius = isMobileLocal ? 160 : 260;
          if (dist < magnetRadius) {
            // Soft pull toward the mouse
            const pull = (1 - dist / magnetRadius) * (isMobileLocal ? 0.02 : 0.035);
            card.vx += (dx / dist) * pull;
            card.vy += (dy / dist) * pull;
          }
        }

        // Mutual repulsion between cards to prevent collisions (using elliptical distance with visual centers)
        for (let j = i + 1; j < cards.length; j++) {
          const other = cards[j];
          const size1 = getCardSize(card.id);
          const size2 = getCardSize(other.id);
          
          const cx1 = card.x + size1.w / 2;
          const cy1 = card.y - (card.heightOffset || 0) + size1.h / 2;
          const cx2 = other.x + size2.w / 2;
          const cy2 = other.y - (other.heightOffset || 0) + size2.h / 2;

          const dx = cx2 - cx1;
          const dy = cy2 - cy1;

          // Combine sizes + add extra safety gap
          const rx = (size1.w + size2.w) / 2 + (isMobileLocal ? 8 : 15);
          const ry = (size1.h + size2.h) / 2 + (isMobileLocal ? 8 : 15);

          const nx = dx / rx;
          const ny = dy / ry;
          const distRatio = Math.sqrt(nx * nx + ny * ny) || 0.001;

          if (distRatio < 1.0) {
            const overlap = 1.0 - distRatio;
            const dirX = nx / distRatio;
            const dirY = ny / distRatio;

            // Push apart along normal in ellipse space, scaled back by pixel overlap size
            const pixelOverlap = overlap * Math.max(rx, ry);
            const force = pixelOverlap * (isMobileLocal ? 0.018 : 0.032);

            const isCardHovered = hoveredIdRef.current === card.id;
            const isOtherHovered = hoveredIdRef.current === other.id;

            if (isCardHovered) {
              // Only push the other card away (keep hovered card stable)
              other.vx += dirX * force * 2.0;
              other.vy += dirY * force * 2.0;
            } else if (isOtherHovered) {
              // Only push card away (keep hovered card stable)
              card.vx -= dirX * force * 2.0;
              card.vy -= dirY * force * 2.0;
            } else {
              // Both are unhovered, push both
              card.vx -= dirX * force;
              card.vy -= dirY * force;
              other.vx += dirX * force;
              other.vy += dirY * force;
            }
          }
        }
      }

      // 2. Apply velocities & keep elements in bounds
      for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        const isHovered = hoveredIdRef.current === card.id;

        // Friction/damping (slow down active hovered cards to make reading easier)
        const damping = isHovered ? 0.88 : 0.94;
        card.vx *= damping;
        card.vy *= damping;

        // Cap maximum velocity for elegance
        const speed = Math.sqrt(card.vx * card.vx + card.vy * card.vy) || 0.1;
        const maxSpeed = isHovered ? 0.3 : (isMobileLocal ? 0.8 : 1.3);
        if (speed > maxSpeed) {
          card.vx = (card.vx / speed) * maxSpeed;
          card.vy = (card.vy / speed) * maxSpeed;
        }

        // Position integration
        card.x += card.vx * dt;
        card.y += card.vy * dt;

        // Boundary collision handling (using visual bounding box)
        const size = getCardSize(card.id);
        const heightOffset = card.heightOffset || 0;
        
        const visualLeft = card.x;
        const visualRight = card.x + size.w;
        const visualTop = card.y - heightOffset;
        const visualBottom = card.y - heightOffset + size.h;

        const leftLimit = padding;
        const rightLimit = width - padding;
        const topLimit = padding;
        const bottomLimit = height - padding;

        if (visualLeft < leftLimit) {
          card.x = leftLimit;
          card.vx = Math.abs(card.vx) * 0.4;
        } else if (visualRight > rightLimit) {
          card.x = rightLimit - size.w;
          card.vx = -Math.abs(card.vx) * 0.4;
        }

        if (visualTop < topLimit) {
          card.y = topLimit + heightOffset;
          card.vy = Math.abs(card.vy) * 0.4;
        } else if (visualBottom > bottomLimit) {
          card.y = bottomLimit - size.h + heightOffset;
          card.vy = -Math.abs(card.vy) * 0.4;
        }

        // Slight rotation sway
        const rotWiggle = Math.sin(time * 0.001 + i) * 1.5;
        const targetRotate = card.vx * 3.5 + rotWiggle;
        card.rotation += (targetRotate - card.rotation) * 0.08;

        // Write directly to motion values (DOM-only styling bypasses React repaint lag)
        const mValues = motionValuesRef.current[card.id];
        if (mValues) {
          mValues.x.set(card.x);
          mValues.y.set(card.y - heightOffset);
          mValues.rotate.set(card.rotation);
        }
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  // Mouse trackers
  const handleMouseMove = (e) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
  };

  const handleMouseEnter = () => {
    mouseRef.current.active = true;
  };

  const handleMouseLeave = () => {
    mouseRef.current.active = false;
  };

  // Scroll introduction animations via GSAP
  useEffect(() => {
    const section = skillsRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
        }
      });

      tl.from(section.querySelector(".skills-title"), {
        opacity: 0,
        y: 35,
        duration: 0.8,
        ease: "power3.out"
      });

      tl.from(section.querySelector(".skills-tabs"), {
        opacity: 0,
        y: 15,
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4");

      tl.from(section.querySelector(".skills-showcase-container"), {
        opacity: 0,
        scale: 0.96,
        duration: 0.9,
        ease: "power3.out"
      }, "-=0.4");
    }, skillsRef);

    return () => ctx.revert();
  }, []);

  // Helper to determine status classes for Framer Motion variant application
  const getCardStatus = (cardId, category) => {
    const matchesFilter = activeCategory === "All" || category === activeCategory;
    if (!matchesFilter) return "filtered";
    if (hoveredId === cardId) return "hovered";
    if (hoveredId !== null) return "dimmed";
    return "active";
  };

  // Framer Motion spring and scale profiles
  const cardVariants = {
    active: {
      scale: 1,
      opacity: 1,
      zIndex: 1,
      y: 0,
    },
    hovered: (expandUp) => ({
      scale: 1.18,
      opacity: 1,
      zIndex: 10,
      y: expandUp ? (window.innerWidth < 768 ? -119.3 : -142.7) : 0,
    }),
    dimmed: {
      scale: 0.96,
      opacity: 0.5,
      zIndex: 0,
      y: 0,
    },
    filtered: {
      scale: 0.85,
      opacity: 0.12,
      zIndex: 0,
      y: 0,
    }
  };

  const cardTransition = {
    type: "spring",
    stiffness: 150,
    damping: 15,
    mass: 0.8,
  };

  return (
    <div className="skills-container" ref={skillsRef}>
      <h1 className="skills-title">My Skills</h1>

      <div className="skills-tabs">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`skills-tab ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div
        className="skills-showcase-container"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {skillsList.map((skill, index) => {
          const cardStatus = getCardStatus(index, skill.category);
          const mValues = motionValuesRef.current[index];
          const cardState = cardsStateRef.current[index];
          const expandUp = cardState && cardState.expandUp;

          return (
            <motion.div
              key={skill.name}
              className="card-physics-wrapper"
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                x: mValues.x,
                y: mValues.y,
                width: isMobile ? 110 : 150,
                height: isMobile ? 40 : 52,
                pointerEvents: "none",
                zIndex: cardStatus === "hovered" ? 10 : (cardStatus === "dimmed" ? 0 : 1),
              }}
            >
              <motion.div
                className={`floating-card ${cardStatus}`}
                style={{
                  rotate: mValues.rotate,
                  pointerEvents: "auto",
                }}
                variants={cardVariants}
                animate={cardStatus}
                custom={expandUp}
                transition={cardTransition}
                onMouseEnter={() => {
                  if (cardStatus !== "filtered") setHoveredId(index);
                }}
                onMouseLeave={() => {
                  if (cardStatus !== "filtered") setHoveredId(null);
                }}
              >
                {/* Backglow element (blurred behind card) */}
                <div className="card-ambient-glow" />

                {/* Masked gradient border */}
                <div className="card-glow" />

                <div className="card-content">
                  {expandUp && (
                    <motion.div
                      className="card-details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: hoveredId === index ? "auto" : 0,
                        opacity: hoveredId === index ? 1 : 0
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 160,
                        damping: 18
                      }}
                    >
                      <p className="card-desc">{skill.desc}</p>
                      <div className="card-divider" />
                    </motion.div>
                  )}

                  <h3 className="card-title">{skill.name}</h3>

                  {!expandUp && (
                    <motion.div
                      className="card-details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: hoveredId === index ? "auto" : 0,
                        opacity: hoveredId === index ? 1 : 0
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 160,
                        damping: 18
                      }}
                    >
                      <div className="card-divider" />
                      <p className="card-desc">{skill.desc}</p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Skills;
