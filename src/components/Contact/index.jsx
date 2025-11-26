import { useState } from "react";
import "./index.scss";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // clear fields
      } else {
        setStatus(data.error || "Something went wrong.");
      }
    } catch (err) {
      setStatus("Failed to connect to server.");
    }

    setLoading(false);
  };
  console.log(formData);

  return (
    <section className="contact-section">
      <h2 className="contact-title">Get in Touch</h2>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Write your message..."
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>

        {status && <p className="status-message">{status}</p>}
      </form>
    </section>
  );
};

export default Contact;
