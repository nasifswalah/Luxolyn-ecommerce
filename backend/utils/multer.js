// backend/middleware/multer.js
import multer from 'multer';
import path from 'path';

// Set storage for multer
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save files with unique names
  }
});

// File type validation
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};

const upload = multer({ storage, fileFilter });

export default upload
