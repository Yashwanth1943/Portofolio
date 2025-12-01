import React, { useState } from "react";
import "./index.scss";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ 
      ...formData,
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    // This logic checks: Are we on localhost? Use port 5000. 
    // Otherwise (if deployed), use the Render URL.
    const API_BASE = window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : "https://portofolio-1-1kys.onrender.com";

    try {
      // Updated Fetch URL
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("Message sent successfully ✔️");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Something went wrong ❌");
      }
    } catch (err) {
      console.error(err); // Log the actual error to console so you can see it
      setStatus("Server error ❌");
    }
  };

  return (
    <div className="contact-section">
      <h1 className="contact-title">Get in Touch</h1>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Your Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name..."
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Your Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email..."
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Your Message</label>
          <textarea
            name="message"
            rows="4"
            placeholder="Tell me how I can help..."
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>

        <button className="submit-btn" type="submit">
          Send Message
        </button>

        {status && <p className="status-message">{status}</p>}
      </form>
    </div>
  );
};

export default Contact;
