const express = require("express");
const router = express.Router();
const JobController = require("../controllers/jobs");

router.get("/", JobController.job_get_all);
router.post("/", JobController.job_create);

module.exports = router;
