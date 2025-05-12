const Blog = require('../models/Blog');
const path = require('path');


exports.createBlog = async (req, res) => {
  const { title, content, tags } = req.body;
  const coverImage = req.file ? req.file.path : ''; 
  const blog = await Blog.create({
    title,
    content,
    tags,
    coverImage,
    author: req.user.id,
  });

  res.status(201).json(blog);
};


exports.getUserBlogs = async (req, res) => {
  const blogs = await Blog.find({ author: req.user.id });
  res.json(blogs);
};


exports.updateBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog || blog.author.toString() !== req.user.id) {
    return res.status(403).json({ error: 'Unauthorized' });
  }

  blog.title = req.body.title || blog.title;
  blog.content = req.body.content || blog.content;
  blog.tags = req.body.tags || blog.tags;

  if (req.file) {
    blog.coverImage = req.file.path; 
  }

  await blog.save();
  res.json(blog);
};


exports.deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog || blog.author.toString() !== req.user.id) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  await blog.deleteOne();
  res.json({ message: 'Blog deleted' });
};
