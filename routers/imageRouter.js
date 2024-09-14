const express = require("express");
const router = express.Router();
// const auth = require("../middlewares/auth");
const upload = require("../middlewares/multer");
const {
  uploadImage,
  getAllImages,
  downloadImage,
} = require("../controllers/imageController");

// Upload Image 
router.post("/upload",  upload.single("image"), uploadImage);

// Get All Images
router.get("/", getAllImages);

// Download Image
router.get("/download/:id", downloadImage);

module.exports = router;
