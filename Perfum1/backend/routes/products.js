const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const {
  getProducts,
  addProduct
} = require('../controllers/productsController');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|jfif|avif/;
  const isValidExt = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const isValidMime = allowedTypes.test(file.mimetype);

  if (isValidExt && isValidMime) {
    cb(null, true);
  } else {
    cb(new Error('Only jpg, jpeg, png, and webp files are allowed'));
  }
};

const upload = multer({
  storage,
  fileFilter
});

router.get('/', getProducts);
router.post('/', upload.single('image'), addProduct);

module.exports = router;