const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  title: String,
  caption: String,
  imageUrl: String,
  cloudinaryId: String,
  // tags: [String],
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Image', imageSchema);
