const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  type: { type: String, required: true },
  label: { type: String, required: true },
  selectOptions: [String],
});

const jobSchema = new mongoose.Schema({
  _id: mongoose.ObjectId,
  creator: { type: String, required: true },
  jd: { type: String, required: true },
  beginDate: { type: String, required: true },
  endDate: { type: String, required: true },
  questions: { type: [questionSchema], required: true },
});

module.exports = mongoose.model("Job", jobSchema);
