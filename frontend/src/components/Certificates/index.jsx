import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useDragScroll from "../../hooks/useDragScroll";
import "./index.scss";

gsap.registerPlugin(ScrollTrigger);

const withPublicUrl = (src) => {
  if (!src || /^https?:\/\//i.test(src)) {
    return src;
  }

  return `${process.env.PUBLIC_URL || ""}${src}`;
};

const certificatesData = [
  {
    src: "https://res.cloudinary.com/dn27v5rhi/image/upload/v1773319718/Skyscanner_Certificate_page-0001_xufd2r.jpg",
    title: "Skyscanner Software Engineering Job Simulation Certificate",
  },
  {
    src: "https://res.cloudinary.com/dn27v5rhi/image/upload/v1773246485/Deloitte_Data_Analytics_Certification_hirxt8.jpg",
    title: "Deloitte Data Analytics Certification",
  },
  {
    src: "https://res.cloudinary.com/dn27v5rhi/image/upload/v1755440615/IMFKDOAF37_page-0001_xrrfqt.jpg",
    title: "Industry Ready Certificate",
  },
  {
    src: "https://res.cloudinary.com/dn27v5rhi/image/upload/v1752753757/Python_Cirtificate_hmxhfy.png",
    title: "Python",
  },
  {
    src: "https://res.cloudinary.com/dn27v5rhi/image/upload/v1752753975/SQL_Cirtificate_tjaxgp.png",
    title: "SQLITE",
  },
  {
    src: "https://res.cloudinary.com/dn27v5rhi/image/upload/v1752754104/React_Js_Cirtificate_is6fel.png",
    title: "React JS",
  },
  {
    src: "https://res.cloudinary.com/dn27v5rhi/image/upload/v1752754049/Node_Js_Cirtificate_iondqz.png",
    title: "Node JS",
  },
  {
    src: "https://res.cloudinary.com/dn27v5rhi/image/upload/v1752753055/Build_your_own_static_website_Cirtificate_mazv9e.png",
    title: "Build Your Own Static Website - Html, Css, Bootstrap",
  },
  {
    src: "https://res.cloudinary.com/dn27v5rhi/image/upload/v1752753737/Build_your_responsive_website_t3n5qd.png",
    title: "Build Your Own Responsive Website",
  },
  {
    src: "https://res.cloudinary.com/dn27v5rhi/image/upload/v1752754016/JavaScript_Cirtificate_j4hhqu.png",
    title: "JavaScript Essentials",
  },
  {
    src: "https://res.cloudinary.com/dn27v5rhi/image/upload/v1752754034/Flexbox_Cirtificate_gafzx1.png",
    title: "Responsive Web Design Using Flexbox",
  },
];

const CertificateCard = ({ cert, handleCertificateClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const resolvedSrc = withPublicUrl(cert.src);

  return (
    <div className="certificate-banner">
      {!isLoaded && cert.type !== "pdf" && (
        <div className="skeleton-loader"></div>
      )}

      {cert.type === "pdf" ? (
        <button
          type="button"
          className="certificate-pdf"
          onClick={() => handleCertificateClick(cert, resolvedSrc)}
        >
          Open PDF Certificate
        </button>
      ) : (
        <img
          src={resolvedSrc}
          alt={cert.title}
          className={`certificate-img ${isLoaded ? "visible" : "hidden"}`}
          onLoad={() => setIsLoaded(true)}
          onClick={() => handleCertificateClick(cert, resolvedSrc)}
          loading="lazy"
        />
      )}
      <div className="certificate-info">
        <h3>{cert.title}</h3>
      </div>
    </div>
  );
};

const rotations = [-2.5, 1.8, -1.2, 2.2, -1.8, 1.5];
const yOffsets = [4, -2, 2, -4, 0, -3];

const Certificates = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);

  useDragScroll(viewportRef);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleCertificateClick = (cert, resolvedSrc) => {
    setSelectedCertificate({ ...cert, resolvedSrc });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
  };

  let visibleCount = 3;
  if (windowWidth < 640) {
    visibleCount = 1;
  } else if (windowWidth < 1024) {
    visibleCount = 2;
  }

  const maxIndex = Math.max(0, certificatesData.length - visibleCount);

  const handleScroll = () => {
    const el = viewportRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / certificatesData.length;
    const index = Math.round(el.scrollLeft / cardWidth);
    setCurrentIndex(Math.min(maxIndex, index));
  };

  const handlePrev = () => {
    const el = viewportRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / certificatesData.length;
    el.scrollTo({
      left: el.scrollLeft - cardWidth,
      behavior: "smooth",
    });
  };

  const handleNext = () => {
    const el = viewportRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / certificatesData.length;
    el.scrollTo({
      left: el.scrollLeft + cardWidth,
      behavior: "smooth",
    });
  };

  const handleDotClick = (idx) => {
    const el = viewportRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / certificatesData.length;
    el.scrollTo({
      left: idx * cardWidth,
      behavior: "smooth",
    });
    setCurrentIndex(idx);
  };

  useEffect(() => {
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      gsap.from(section.querySelector(".certificate-heading"), {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
        },
      });

      gsap.from(section.querySelectorAll(".certificate-banner"), {
        opacity: 0,
        y: 20,
        stagger: 0.12,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="certificate-section" ref={sectionRef}>
      <h1 className="certificate-heading">Certificates</h1>

      <div className="certificate-carousel-wrapper">
        <button
          className="carousel-btn prev"
          onClick={handlePrev}
          disabled={currentIndex === 0}
          aria-label="Previous Certificate"
        >
          &#8249;
        </button>

        <div
          className="certificate-carousel-viewport"
          ref={viewportRef}
          onScroll={handleScroll}
        >
          <div className="certificate-carousel-track">
            {certificatesData.map((cert, index) => (
              <div
                key={index}
                className="certificate-card-wrapper"
                style={{
                  flex: `0 0 ${100 / visibleCount}%`,
                  padding: "0 12px",
                  zIndex: certificatesData.length - index,
                }}
              >
                <div
                  style={{
                    transform: `rotate(${rotations[index % rotations.length]}deg) translateY(${yOffsets[index % yOffsets.length]}px)`,
                    transformOrigin: "center center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <CertificateCard
                    cert={cert}
                    handleCertificateClick={handleCertificateClick}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="carousel-btn next"
          onClick={handleNext}
          disabled={currentIndex >= maxIndex}
          aria-label="Next Certificate"
        >
          &#8250;
        </button>
      </div>

      <div className="carousel-dots">
        {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
          <button
            key={idx}
            className={`carousel-dot ${currentIndex === idx ? "active" : ""}`}
            onClick={() => handleDotClick(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseModal}>
              &times;
            </button>
            {selectedCertificate?.type === "pdf" ? (
              <div className="pdf-modal-body">
                <p>{selectedCertificate.title}</p>
                <a
                  href={selectedCertificate.resolvedSrc}
                  target="_blank"
                  rel="noreferrer"
                  className="pdf-open-link"
                >
                  Open certificate in new tab
                </a>
              </div>
            ) : (
              <img
                src={selectedCertificate?.resolvedSrc}
                alt="Full-size Certificate"
                className="modal-image"
              />
            )}
          </div>
        </div>
      )}

    </section>
  );
};

export default Certificates;
