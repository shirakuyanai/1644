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


let cart = []
//Cart
// Cart
app.post('/addToCart/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  
  if (!req.session.cart) {
    req.session.cart = [];
  }
  
  req.session.cart.push(product);
  
  res.json(req.session.cart);
});


app.get('/viewcart', async (req, res) => {
  const cart = req.session.cart || [];

  res.json(cart);
})

//Order

app.get('/orders', async(req, res) => {
    const order = await Order.find()
    res.json(order)
})

app.post('/neworder', async(req, res) => {
    const order = await new Order(
    {
        user: req.body.name,
        createdAt: req.body.createdAt,
        updatedAt: req.body.updatedAt,
        status: req.body.status,
        address: req.body.address
    }
    )
    foreach(product )
    const orderDetail = await new OrderDetail(
        {
            user: req.body.name,
            createdAt: req.body.createdAt,
            updatedAt: req.body.updatedAt,
            status: req.body.status,
            address: req.body.address
        }
        )
})





app.listen(port, () => console.log(`listening on port ${port}`))