const express = require('express');
const app = express();
const port = 5000
const mongoose = require('mongoose')
app.use(express.json())
mongoose.connect("mongodb+srv://react:React123@react.psjcoby.mongodb.net/").then(() => console.log("All set")).catch((console.error))

const Brand = require('./models/Brand')
const Product = require('./models/Product')
const Order = require('./models/Order')
const User = require('./models/User');
const OrderDetail = require('./models/OrderDetail');

const session = require('express-session');

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.get('/brands', async(req, res) => {
    const brands = await Brand.find()
    res.json(brands)
})

app.post('/newbrand', (req, res) => {
    const brand = new Brand(
        {
            name: req.body.name
        }
    )
    brand.save()
    res.json(brand)
})

app.put('/brands/edit/:id', async(req, res) => {
    const id = req.params.id;
    const brand = await Brand.findById(id);
    
    if (!prod) {
      return res.status(404).json({ error: 'Brand not found' });
    }
    brand.name = req.body.name;
    await brand.save();
    res.json(brand);
});

app.delete('/brands/delete/:id', async (req, res) => {
    const id = req.params.id;
    
    try {
      // Find the brand by ID
      const brand = await Brand.findById(id);
  
      if (!brand) {
        return res.status(404).json({ error: 'Brand not found' });
      }
  
      // Delete the brand and the associated products
      await Brand.findByIdAndDelete(id);
      await Product.deleteMany({ brand: id });
  
      res.json({ message: 'Brand and associated products deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// products
app.get('/products', async(req, res) => {
    const products = await Product.find()
    res.json(products)
})

app.post('/newproduct', async (req, res) => {
    const product = new Product({
      name: req.body.name,
      brand: req.body.brand,
      price: req.body.price,
      description: req.body.description,
      stock: req.body.stock,
      image: req.body.image
    });
  
    try {
      const savedProduct = await product.save();
      res.json(savedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.put('/products/edit/:id', async (req, res) => {
    const id = req.params.id;
    const prod = await Product.findById(id);
    
    if (!prod) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    prod.name = req.body.name;
    prod.brand = req.body.brand;
    prod.price = req.body.price;
    prod.description = req.body.description;
    prod.colors = req.body.colors;
    prod.specs = req.body.specs;
    
    await prod.save();
    
    res.json(prod);
  });
  
  app.delete('/products/delete/:id', async(req, res) => {
    const id = req.params.id;
    const prod = await Product.findByIdAndDelete(id);
   
    res.json(prod)
})


// let cart = []

// Cart
app.post('/addToCart/:id', async (req, res) => {
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
});



app.get('/viewcart', async (req, res) => {
  const cart = req.session.cart || [];

  res.json(cart);
});

// Order
app.get('/orders', async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

app.post('/neworder', async (req, res) => {
  try {
    const { user, status, address } = req.body;

    const cart = req.session.cart || [];

    // Check if the cart is empty
    if (cart.length === 0) {
      return res.status(400).json({ error: 'Cart is empty. Cannot place an order.' });
    }

    const order = new Order({
      user: user,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: status,
      address: address,
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
});


app.delete('/Deleteallorders', async (req, res) => {
  try {
    await Order.deleteMany({});
    res.json({ message: 'All orders deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => console.log(`listening on port ${port}`))