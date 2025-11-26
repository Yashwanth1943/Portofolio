import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// --- MongoDB Connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Connection error:", err));


// --- Correct Schema (with timestamp in IST) ---
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


// --- POST Route ---
app.post("/contact", async (req, res) => {
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
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
