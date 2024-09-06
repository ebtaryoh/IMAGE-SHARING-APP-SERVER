const Image = require('../models/imageModel');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload Image
exports.uploadImage = async (req, res) => {
  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create a new image document
    const newImage = new Image({
      title: req.body.title,
      caption: req.body.caption,
      imageUrl: result.secure_url,
      cloudinaryId: result.public_id,
    });
    await newImage.save();

    // Remove uploaded file from server
    fs.unlinkSync(req.file.path);

    res.status(201).json(newImage);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Image upload failed', details: err.message });
  }
};

// Get All Images
exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.find().sort({ uploadedAt: -1 });
    res.status(200).json(images);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve images' });
  }
};

// Download Image
exports.downloadImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ msg: 'Image not found' });
    }

    res.redirect(image.imageUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to download image', details: err.message });
  }
};
