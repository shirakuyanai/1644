const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const User = require('../models/User');

const viewOrders = async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
};

const newOrder = async (req, res) => {
  try {
    const { user, status, address } = req.body;

    const cart = req.session.cart || [];

    // Check if the cart is empty
    if (cart.length === 0) {
      return res.status(400).json({ error: 'Cart is empty. Cannot place an order.' });
    }

    let cartTotal = 0;

    for (const cartItem of cart) {
      cartTotal += cartItem.total;
    }

    const order = new Order({
      user,
      createdAt: new Date(),
      updatedAt: new Date(),
      status,
      address,
      total: cartTotal + (cartTotal + 10) * (5 / 100), // 5% tax + 10% delivery
    });

    // Save the order to the database
    const savedOrder = await order.save();

    // Create order details for each product in the cart
    const orderDetails = [];

    for (const cartItem of cart) {
      const orderDetail = new OrderDetail({
        order: savedOrder._id,
        product: cartItem.product,
        quantity: cartItem.quantity,
        price: cartItem.price,
        total: cartItem.total,
      });

      // Save the order detail to the database
      const savedOrderDetail = await orderDetail.save();

      orderDetails.push(savedOrderDetail);
    }

    // Clear the cart after placing the order
    req.session.cart = [];

    res.json({ message: 'Order created successfully', order: savedOrder, orderDetails });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteOrder = async (req, res) => {
  try {
    await Order.deleteMany({});
    res.json({ message: 'All orders deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const viewUserOrders = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find orders associated with the user
    const orders = await Order.find({ user: userId });

    const userOrders = [];

    for (const order of orders) {
      const { _id, createdAt, status, address, total } = order;

      // Find order details for the current order
      const orderDetails = await OrderDetail.find({ order: _id });

      // Extract product, quantity, and total price from order details
      const products = orderDetails.map(detail => {
        const { product, quantity, total } = detail;

        return {
          productId: product._id, // Add product ID
          productName: product.name,
          quantity,
          total
        };
      });

      userOrders.push({
        _id,
        createdAt,
        status,
        address,
        total,
        products
      });
    }

    res.json(userOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};




module.exports = { viewOrders, newOrder, deleteOrder, viewUserOrders };
