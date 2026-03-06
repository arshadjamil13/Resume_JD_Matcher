const express = require("express");
const multer = require("multer");

const resumeMatchController = require("../controller/resumeMatch");

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage
});

router.post(
  "/match",
  upload.single("Resume"),
  resumeMatchController
);

module.exports = router;