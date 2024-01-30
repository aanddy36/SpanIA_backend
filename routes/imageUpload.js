const express = require("express");
const router = express.Router();
const multer = require("multer");

const { uploadImage } = require("../controllers/imageUpload");
const supabaseUpload = require("../middleware/supabaseUpload");
const authAnyone = require("../middleware/authAnyone");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024,
  },
});

router
  .route("/")
  .post(authAnyone, upload.single("avatar"), supabaseUpload, uploadImage);

module.exports = router;
