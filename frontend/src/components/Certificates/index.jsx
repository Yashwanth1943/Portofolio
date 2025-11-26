import { useState, useEffect, useRef } from "react";
import "./index.scss";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const certificatesData = [
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

const Certificates = () => {
  const [loadedImages, setLoadedImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const sectionRef = useRef(null);

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => [...prev, index]);
  };

  const handleImageClick = (src) => {
    setSelectedImage(src);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage("");
  };

  // GSAP Animation
  useEffect(() => {
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      gsap.from(section.querySelector(".section-heading"), {
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
      <h2 className="section-heading">Certificates</h2>

      <div className="certificate-list">
        {certificatesData.map((cert, index) => (
          <div className="certificate-banner" key={index}>
            {!loadedImages.includes(index) && (
              <div className="skeleton-loader"></div>
            )}

            <img
              src={cert.src}
              alt={cert.title}
              className={`certificate-img ${
                loadedImages.includes(index) ? "visible" : "hidden"
              }`}
              onLoad={() => handleImageLoad(index)}
              onClick={() => handleImageClick(cert.src)}
            />
            <div className="certificate-info">
              <h3>{cert.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={handleCloseModal}>
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Full-size Certificate"
              className="modal-image"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificates;
