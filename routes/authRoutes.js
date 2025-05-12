const express = require('express');
const { register, login } = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../validators/authValidator');
const validate = require('../middlewares/validateRequest');
const router = express.Router();

router.post('/register', validateRegister, validate, register);
router.post('/login', validateLogin, validate, login);

module.exports = router;