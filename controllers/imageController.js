const Image = require("../models/imageModel");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
require("dotenv").config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload Multiple Images
exports.uploadMultipleImages = async (req, res) => {
  try {
    const imageFiles = req.files; // Access multiple files from multer
    const uploadResults = [];

    // Loop through each file and upload to Cloudinary
    for (let file of imageFiles) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "MFM-CAASO-YOUTH-PHOTO-DUMP", // Specify the folder
      });

      // Create a new image document for each file
      const newImage = new Image({
        title: req.body.title || "No Title", // You can make this dynamic
        caption: req.body.caption || "No Caption",
        imageUrl: result.secure_url,
        cloudinaryId: result.public_id,
      });

      await newImage.save();
      uploadResults.push(newImage);

      // Remove the file from the server after upload
      fs.unlinkSync(file.path);
    }

    // Success response with all uploaded images
    res.status(200).json({
      message: "Images uploaded successfully",
      data: uploadResults,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Image upload failed", details: err.message });
  }
};

// Get All Images
exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ uploadedAt: -1 });
    res.status(200).json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve images" });
  }
};

// Download Image
exports.downloadImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ msg: "Image not found" });
    }

    // Redirect to the image URL
    res.redirect(image.imageUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to download image", details: err.message });
  }
};
