const { body } = require('express-validator');

exports.validateRegister = [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
];

exports.validateLogin = [
  body('email').isEmail(),
  body('password').exists(),
];