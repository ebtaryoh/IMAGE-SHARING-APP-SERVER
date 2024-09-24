const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer");
const {
  uploadMultipleImages,
  getAllImages,
  downloadImage,
} = require("../controllers/imageController");

// Upload Multiple Images
router.post("/upload-multiple", upload.array("images", 20), uploadMultipleImages); // 10 is the limit for number of images

// Get All Images
router.get("/", getAllImages);

// Download Image
router.get("/download/:id", downloadImage);

module.exports = router;
