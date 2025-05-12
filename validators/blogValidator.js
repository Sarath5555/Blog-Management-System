const { body } = require('express-validator');

exports.validateBlogCreate = [
  body('title').notEmpty(),
  body('content').notEmpty(),
];

exports.validateBlogUpdate = [
  body('title').optional().notEmpty(),
  body('content').optional().notEmpty(),
];