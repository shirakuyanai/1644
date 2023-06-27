const Order = require('../models/Order');
const OrderDetail = require('../models/OrderDetail');
const User = require('../models/User');
const Address = require('../models/Address');
const Product = require('../models/Product');

const viewOrders = async (req, res) => {
  const orders = await Order.find();
  if (orders && orders.length > 0) {
    res.json(orders);
  }else {
    res.status(404).json('No orders found')
  }
};

const newOrder = async (req, res) => {
  try {
    let address = null
    const user = await User.findById(req.user.id)
    if (req.body.address_id === ''){
      address = new Address({
        user,
        ward: req.body.ward,
        province: req.body.province,
        district: req.body.district,
        city: req.body.city,
        zipcode: parseInt(req.body.zipcode),
      })
      await address.save()
    }else{
      address = await Address.findById(req.body.address_id)
    }

    const cart = req.session.cart || [];

    // Check if the cart is empty
    if (cart.length === 0) {
      return res.status(400).json('Cart is empty. Cannot place an order.');
    } else{
      let cartTotal = 0;
      for (const cartItem of cart) {
        cartTotal += cartItem.total;
      }

      const order = new Order({
        user,
        address,
        total: cartTotal + (cartTotal + 10) * (5 / 100), // 5% tax + 10% delivery
      });

      // Save the order to the database
      const savedOrder = await order.save();

      // Create order details for each product in the cart
      const orderDetails = [];
      let insufficient = false
      for (const cartItem of cart) {
        const orderDetail = new OrderDetail({
          order: savedOrder,
          product: cartItem.product,
          quantity: cartItem.quantity,
          price: cartItem.price,
          total: cartItem.total,
        });
        const product = await Product.findById(cartItem.product)
        if (product.stock < cartItem.quantity){
          cartItem.quantity = product.stock
          insufficient = true
          res.status(400).json('One or more items in your cart is insufficient in stock. We have updated your cart, please try again.', )
          break;
        }else{
          product.stock = product.stock - cartItem.quantity
          await product.save()
          
          // Save the order detail to the database
          await orderDetail.save();
        }
      }
      
      if (!insufficient){
        // Clear the cart after placing the order
        req.session.cart = [];
        res.json('Order created successfully');
      }
      
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
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
    const user = await User.findById(req.params.id)
    if (user){
      const orders = await Order.find({user: user})
      if (orders && orders.length > 0){
        res.json(orders);
      }else{
        res.status(404).json('No orders');
      }
    }
    else{
      res.status(404).json('No users');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Internal server error');
  }
};


const viewOrder = async (req,res) => {
  if (req.user){
    const user = req.user
    const order = await Order.findOne({_id: req.params.id})
    const items = await OrderDetail.find({order: req.params.id})
    
    if (order && items &&items.length > 0) { 
      res.json(order)
    }
    else{
      res.status(404).json('No order found')
    }
  }
  else{
    res.status(401).json('No user logged in')
  }
}

const changeOrderStatus = async (req, res) => {
  try{
    const order = await Order.findById(req.params.id)
    if (order){
      const old_status = order.status
      order.status = req.body.status
      order.updatedAt = new Date()
      await order.save()
      // Order gets canceled
      if (old_status !== 0 && req.body.status === 0){
        const details = await OrderDetail.find({order: order})
        if (details && details.length >= 0 ){
          for (const detail of details){
            const product = await Product.findById(detail.product)
            if (product){
              product.stock += detail.quantity
            }
            await product.save()
          }
        }
      }
      // Order gets reactivated and delivered for some reason
      else if (old_status === 0 && req.body.status === 4){
        const details = await OrderDetail.find({order: order})
        if (details && details.length >= 0 ){
          for (const detail of details){
            const product = await Product.findById(detail.product)
            if (product){
              product.stock -= detail.quantity
            }
            await product.save()
          }
        }
      }
      let newstatus = ''
      switch (order.status){
        case 0: 
          newstatus = 'Canceled' 
          break;
        case 1: 
          newstatus = 'Pending'
          break;
        case 2: 
          newstatus = 'Processing'
          break;
        case 3: 
          newstatus = 'Shipped'
          break;
        case 4: 
          newstatus = 'Delivered'
          break;
      }
      res.json('Order status changed to ' + newstatus)
    }else{
      res.status(404).json('No order found')
    }
  } catch (err){
    res.status(500).json(err)
  }
}

const details = async (req, res) => {
  try{
    const details = await OrderDetail.find({order: req.params.id})
    if (details && details.length > 0){
      res.json(details)
    }else{
      res.status(404).json('No details found')
    }
  } catch (err){
    res.status(500).json(err)
  }
}

module.exports = { viewOrders, newOrder, deleteOrder, viewUserOrders, viewOrder , changeOrderStatus, details};