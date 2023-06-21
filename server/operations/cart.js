const Product = require('../models/Product');

const addToCart = async (req, res) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const cart = req.session.cart || [];

  // Check if the product already exists in the cart
  const existingProductIndex = cart.findIndex(
    (item) => item.product && item.product._id.toString() === productId
  );

  if (existingProductIndex !== -1) {
    // Product already exists in the cart, update the quantity and price
    cart[existingProductIndex].quantity++;
    cart[existingProductIndex].total = cart[existingProductIndex].quantity * product.price;
  } else {
    // Product does not exist in the cart, add a new entry
    cart.push({
      product: product,
      quantity: 1,
      total: product.price,
    });
  }

  let total = 0;
  for (const item of cart) {
    total += item.total;
  }

  req.session.cart = cart;

  res.json(cart);
};

const newQuantity = async (req, res) => {
  let quantity = req.body.quantity;
  quantity = parseInt(quantity)
  const cart = req.session.cart;
  const id = req.params.id;

  const itemToUpdate = cart.find((item) => item.product && item.product._id.toString() === id);

  if (itemToUpdate) {
    itemToUpdate.quantity = quantity;
    res.json(cart);
  } else {
    res.status(404).json({ error: 'Product not found in the cart' });
  }
};

const deleteProductCart = async (req, res) => {
  const cart = req.session.cart;
  const id = req.params.id;

  const itemIndex = cart.findIndex((item) => item.product && item.product._id.toString() === id);

  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
    res.json(cart);
  } else {
    res.status(404).json({ error: 'Product not found in the cart' });
  }
};
const viewCart = (req, res) => {
  const cart = req.session.cart || [];
  let total = 0;
  for (const item of cart) {
    total += item.total;
  }

  req.session.cart = cart;

  res.json(cart);
};

const deleteSession = async (req, res) => {
  req.session.cart =  [];
  res.json(req.session.cart);
}
module.exports = { addToCart, viewCart, newQuantity, deleteProductCart, deleteSession};
