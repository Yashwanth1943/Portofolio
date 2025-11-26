import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Visitor", visitorSchema);
