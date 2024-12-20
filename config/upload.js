// upload.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

// Set up Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'profile_image', // Store images in this Cloudinary folder
        allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed image formats
    },
});

const upload = multer({ storage });

module.exports = upload;
