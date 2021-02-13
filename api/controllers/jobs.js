const mongoose = require("mongoose");
const Job = require("../models/job");

const job_get_all = async (req, res, next) => {
  try {
    const result = await Job.find();

    res.status(200).json({
      count: result.length,
      data: result,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const job_create = async (req, res, next) => {
  const { creator, beginDate, endDate, questions, jd } = req.body;

  const job = new Job({
    _id: new mongoose.Types.ObjectId(),
    creator,
    jd,
    beginDate,
    endDate,
    questions,
  });

  try {
    const result = await job.save();
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = { job_create, job_get_all };
