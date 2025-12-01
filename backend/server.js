import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://portofolio-neon-six.vercel.app",   // your frontend
    "https://portofolio-1-1kys.onrender.com"    // your backend
  ],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

// --- MongoDB Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Connection error:", err));

// --- Schema ---
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  Timestamp: {
    type: String,
    default: () =>
      new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "medium"
      })
  }
});

const Contact = mongoose.model("Contact", contactSchema);

// --- POST Route (IMPORTANT!) ---
app.post("/api/contact", async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();

    res.status(201).json({
      message: "Form submitted successfully!",
      saved: contact
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to submit form" });
  }
});

// --- Test Route ---
app.get("/", (req, res) => {
  res.send("API is running...");
});

// --- Server Listen ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
