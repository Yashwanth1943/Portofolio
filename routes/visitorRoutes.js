import express from "express";
import Visitor from "../models/Visitor.js";

const router = express.Router();

// POST - Save visitor details
router.post("/", async (req, res) => {
  try {
    const newVisitor = new Visitor(req.body);
    await newVisitor.save();
    res.status(201).json({ message: "Visitor added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving visitor", error });
  }
});

// GET - Retrieve all visitors
router.get("/", async (req, res) => {
  try {
    const visitors = await Visitor.find();
    res.json(visitors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching visitors", error });
  }
});

export default router;
