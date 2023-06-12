
const { check } = require('express-validator');
// Validate email input
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate password input
const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}$/;
  return passwordRegex.test(password);
}

const ProductValidation = [
  check('name').notEmpty().withMessage('Name of the product is required'),
  check('brand').notEmpty().withMessage('Brand of the product is required'),
  check('price').notEmpty().withMessage('Price is required').isNumeric().withMessage('Price must be a number'),
  // check('description').notEmpty().withMessage('Description is required'),
  check('stock').notEmpty().withMessage('Stock is required').isInt({ min: 1 }).withMessage('Stock must be a positive integer and min 1'),
]

const editProductValidation = [
  check('name').notEmpty().withMessage('Name is required'),
  check('brand').notEmpty().withMessage('Brand is required'),
  check('price').notEmpty().withMessage('Price is required').isNumeric().withMessage('Price must be a number'),
  check('stock').notEmpty().withMessage('Stock is required').isInt({ min: 1 }).withMessage('Stock must be a positive integer and min 1'),

]

module.exports = { validateEmail, validatePassword, ProductValidation, editProductValidation };