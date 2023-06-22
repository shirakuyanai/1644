const { config } = require('dotenv');
config();
const express = require('express');
const app = express();
const PORT = process.env.PORT
app.use(express.json())
const cors = require('cors');
var session = require('express-session')
const multer = require('multer');
const { initializeApp } = require('firebase/app');
const { getStorage } = require('firebase/storage');
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC0_n8aeUkQW7tDLHHmdaiF8hcCKihTt2Y",
  authDomain: "atn-toy.firebaseapp.com",
  projectId: "atn-toy",
  storageBucket: "atn-toy.appspot.com",
  messagingSenderId: "212199370557",
  appId: "1:212199370557:web:8c757b71ebc48115f6df54",
  measurementId: "G-9LT2NQPGXM"
};

const storage = getStorage(initializeApp(firebaseConfig));

// Multer configuration for file upload
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // Maximum file size in bytes (e.g., 5MB)
  },
});

const { Login, Register, verifyUser, changePassword, checkLoginStatus, authenticateToken, editUserEmail, checkVerifyStatus, resendVerificationEmail } = require('./operations/auth')
const { viewBrands, addBrand, editBrand, deleteBrand, viewOneBrand} = require('./operations/brand')
const { viewProducts, newProduct, editProduct, deleteProduct, oneProduct } = require('./operations/product')
const { addToCart, viewCart, newQuantity, deleteSession, deleteProductCart } = require('./operations/cart')
const connectToDatabase = require('./db');
const { viewUser, viewOneUser, editUser, changeName } = require('./operations/user');
const { viewOrders, newOrder, deleteOrder} = require('./operations/order');
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
  app.post('/resendVerificationEmail', authenticateToken, async (req, res) => {
    try {
      await resendVerificationEmail(req, res);
    } catch (error) {
      console.log(error)
    }
  });


  app.post('/changeName', authenticateToken, async (req,res)=>{
    const user = req.user
    if (!user){
      window.location.replace('/login')
    }else{
      await changeName(req,res)
    }
  })
  app.delete('/clearcart', async (req, res) =>{
    await deleteSession(req, res);
  })
  app.delete('/api/cart/product/:id', async (req, res) =>{
    await deleteProductCart(req, res);
  })
  app.get('/checkVerifyStatus', authenticateToken, async (req, res) => {
    await checkVerifyStatus(req, res)
  });
  app.get('/checkLoginStatus', authenticateToken, async (req, res) => {
    await checkLoginStatus(req, res)
  });
  app.put('/quantity/:id', async (req, res) => {
   await newQuantity(req, res);
  })
  app.get('/brands', async (req, res) => {
    await viewBrands(req, res)
  })
  app.get('/api/brand/:id', async (req, res) => {
    await viewOneBrand(req, res)
  })

  app.post('/newbrand',  async (req, res) => {
    await addBrand(req, res)
  })

  app.patch('/brands/edit/:id', async (req, res) => {
    await editBrand(req, res)
  });

  app.delete('/brands/delete/:id',  async (req, res) => {
    await deleteBrand(req, res)
  });

  // products
  app.get('/products', async (req, res) => {
    await viewProducts(req, res)
  })
  app.get('/api/product/:id', async (req, res) => {
    await oneProduct(req, res)
  })

  app.post('/newproduct', upload.single('image'), async (req, res) => {
    await newProduct(req, res)
  });

  app.patch('/products/edit/:id', upload.single('image'), async (req, res) => {
    await editProduct(req, res)
  });

  app.delete('/products/delete/:id', async (req, res) => {
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
  app.get('/orders', async (req, res) => {
    await viewOrders(req, res)
  });

  app.post('/neworder', async (req, res) => {
    await newOrder(req, res);
  });
  app.delete('/deleteallorders', async (req, res) => {
    await deleteOrder(req, res);
  });

  // User login

  app.post('/login', async (req, res) => {
    await Login(req, res)
  });

  // User logout

  app.post('/logout', (req, res) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          console.error('Error logging out:', err);
          return res.status(500).json('Internal server error');
        }
        res.clearCookie('session-id'); // Clear the session cookie
        res.json({ message: 'Logout successful' });
      });
    }
    catch (err) {
      console.error(err);
    }
  })

  app.post('/changePassword', authenticateToken, async (req, res) => {
    await changePassword(req, res)
  })
  //User change email
  app.post('/changeEmail', authenticateToken, async (req, res) => {
    await editUserEmail(req, res)
  })
  // Register new users

  app.post('/register', async (req, res) => {
    await Register(req, res);
  })

  app.get('/verify/:token', async (req, res) => {
    await verifyUser(req, res)
  })
  app.get('/viewUser', async (req, res) => {
    await viewUser(req, res)
  })

  app.get('/api/user/:id', async (req, res) => {
    await viewOneUser(req, res)
  })
  app.patch('/api/user/edit/:id', async (req, res) => {
    await editUser(req, res)
  })
  app.listen(PORT, () => console.log(`listening on port ${PORT}`))
})