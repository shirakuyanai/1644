const Product = require('../models/Product')

const addToCart = async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const cart = req.session.cart || [];

    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex((item) => item.product && item.product._id.toString() === productId);

    if (existingProductIndex !== -1) {
      // Product already exists in the cart, update the quantity
      cart[existingProductIndex].quantity++;
    } else {
      // Product does not exist in the cart, add a new entry
      cart.push({
        product: product,
        quantity: 1,
      });
    }

    req.session.cart = cart;

    res.json(req.session.cart);
}

const viewCart = (req, res) => {
    const cart = req.session.cart || [];
    res.json(cart);
}

module.exports = {addToCart, viewCart}