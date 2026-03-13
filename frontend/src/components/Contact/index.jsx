import React, { useEffect, useState } from "react";
import "./index.scss";
import { NavLink } from "react-router-dom";
import { HiMiniHome } from "react-icons/hi2";

const REQUEST_TIMEOUT_MS = 25000;
const HEALTH_TIMEOUT_MS = 15000;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverState, setServerState] = useState("checking");

  const API_BASE = (
    process.env.REACT_APP_API_BASE ||
    process.env.REACT_APP_API_URL ||
    (window.location.hostname === "localhost"
      ? "http://localhost:5000"
      : "https://portofolio-1-1kys.onrender.com")
  ).replace(/\/+$/, "");

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), HEALTH_TIMEOUT_MS);

    const checkHealth = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/health`, {
          method: "GET",
          signal: controller.signal,
        });

        if (res.ok || res.status === 404) {
          setServerState("ready");
        } else if (res.status === 503 || res.status === 502) {
          setServerState("waking");
        } else {
          setServerState("down");
        }
      } catch (err) {
        setServerState("down");
      } finally {
        clearTimeout(timeoutId);
      }
    };

    checkHealth();

    return () => {
      clearTimeout(timeoutId);
      controller.abort();
    };
  }, [API_BASE]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (serverState === "waking" || serverState === "down") {
      setStatus("Trying to send message...");
    }

    setIsSubmitting(true);
    setStatus("Sending...");

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      let payload = null;
      const contentType = response.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        payload = await response.json();
      }

      if (response.ok) {
        setServerState("ready");
        setStatus(payload?.message || "Message sent successfully.");
        setFormData({ name: "", email: "", message: "" });
      } else if (response.status === 400) {
        setStatus(payload?.error || "Please fill in the required fields.");
      } else if (response.status === 503) {
        setServerState("waking");
        setStatus(
          payload?.error ||
            "Server is waking up. Please try again in a few seconds."
        );
      } else if (response.status >= 500) {
        setStatus(payload?.error || "Server error. Please try again later.");
      } else {
        setStatus(payload?.error || "Request failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setServerState("down");
      if (err.name === "AbortError") {
        setStatus("Server is taking longer than expected. Please try again shortly.");
      } else if (err instanceof TypeError) {
        setStatus("Unable to reach server. Check your connection and try again.");
      } else {
        setStatus("Server error. Please try again.");
      }
    } finally {
      clearTimeout(timeoutId);
      setIsSubmitting(false);
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

        <button className="submit-btn" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>

        {serverState === "checking" && (
          <p className="status-message">Checking server status...</p>
        )}

        {serverState === "waking" && (
          <p className="status-message">Server is waking up. Please wait a moment.</p>
        )}

        {status && <p className="status-message">{status}</p>}
      </form>

      <NavLink to="/" className="back-home-link" aria-label="Back to home">
        <HiMiniHome />
      </NavLink>
    </div>
  );
};

export default Contact;




