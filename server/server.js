const { config } = require('dotenv');
config();
const express = require('express');
const app = express();
const PORT = process.env.PORT
app.use(express.json())
const cors = require('cors');
var session = require('express-session')

const {Login, Register, verifyUser, changePassword} = require('./operations/auth')
const {viewBrands, addBrand, editBrand, deleteBrand} = require('./operations/brand')
const {viewProducts, newProduct, editProduct, deleteProduct} = require('./operations/product')
const {addToCart, viewCart} = require('./operations/cart')

const connectToDatabase = require('./db');

app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: null } 
}))

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
}));


connectToDatabase().then(() => {

  app.get('/brands', async (req,res) => {
      await viewBrands(req,res)
  })

  app.post('/newbrand', async (req, res) => {
      await addBrand(req,res)
  })

  app.put('/brands/edit/:id', async (req, res) => {
      await editBrand(req,res)
  });

  app.delete('/brands/delete/:id', async (req, res) => {
      await deleteBrand(req,res)
  });

  // products
  app.get('/products', async(req,res) => {
      await viewProducts(req,res)
  })

  app.post('/newproduct', async (req, res) => {
      await newProduct(req,res)
  });

  app.put('/products/edit/:id', async (req, res) => {
      await editProduct(req, res)
  });
    
  app.delete('/products/delete/:id', async(req, res) => {
      await deleteProduct(req, res)
  })

  // Cart
  app.post('/addToCart/:id', async (req, res) => {
    await addToCart(req, res)
  });

  app.get('/viewcart', async (req, res) => {
    await viewCart(req, res)
  });

  // Order
  app.get('/orders', async (req,res) => {
    await newOrder(req, res)
  });

  app.post('/neworder', async (req, res) => {
    await newOrder(req, res);
  });


  app.delete('/Deleteallorders', async (req, res) => {
    await deleteOrder(req, res);
  });

app.get('/checkLoginStatus', (req, res) => {
  if (req.session && req.session.user) {
      // User is logged in
      res.json({ isLoggedIn: true, user: req.session.user });
  } else {
      // User is not logged in
      res.json({ isLoggedIn: false });
  }
})

    // User login

  app.post('/login', async (req, res) => {
      await Login(req,res)
  });

  // User logout

  app.post('/logout', (req,res) => {
      try{
          if (req.session.user)
          {
              req.session.user = null;
              res.json('Logout successfully!');
          }
          else
          {
              res.status(401).json('No user currently logged in.');
          }
      }
      catch (error) {
          res.status(401).json(error);
      }
  })

    app.post('/changePassword', async(req, res) => {
        await changePassword(req,res)
    })

    // Register new users
    
    app.post('/register', async (req, res) =>{
        await Register(req, res);
    })

    app.get('/verify/:token', async (req, res) => {
        await verifyUser(req, res)
    })

    app.listen(PORT, () => console.log(`listening on port ${PORT}`))
})