const express = require('express');
const {
  createBlog,
  getUserBlogs,
  updateBlog,
  deleteBlog,
} = require('../controllers/blogController');

const auth = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

const {
  validateBlogCreate,
  validateBlogUpdate,
} = require('../validators/blogValidator');

const validate = require('../middlewares/validateRequest');

const router = express.Router();

router.use(auth);
router.post('/', upload.single('coverImage'), validateBlogCreate, validate, createBlog);
router.get('/', getUserBlogs);
router.put('/:id', upload.single('coverImage'), validateBlogUpdate, validate, updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;