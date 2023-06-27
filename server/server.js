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
const { viewBrands, addBrand, editBrand, deleteBrand, viewOneBrand, viewProductBrand, searchProductBrand} = require('./operations/brand')
const { viewProducts, newProduct, editProduct, deleteProduct, oneProduct } = require('./operations/product')
const { addToCart, viewCart, newQuantity, deleteSession, deleteProductCart } = require('./operations/cart')
const connectToDatabase = require('./db');
const { viewUser, viewOneUser, editUser, changeName, changeUserStatus, viewAddressesByUser, changeRole, getAddresses, addressById } = require('./operations/user');
const { viewOrders, newOrder, deleteOrder, viewUserOrders, viewOrder, changeOrderStatus, details} = require('./operations/order');
app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    httpOnly: true, 
    secure: true, 
    maxAge: 1000 * 60 * 60 * 48, 
    sameSite: 'none' 
  }
}))

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://admin.atntoy.online', 'https://atntoy.online'],
  credentials: true,
}));

app.enable('trust proxy')

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
      res.status(401).json('No user logged in')
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
    const user = req.user
    if (user && user.role !== 1){
      res.status(401).json('No user logged in')
    }else{
      await viewBrands(req, res)
    }
  })
  app.get('/search', async (req, res) => {
    const user = req.user
    if (user && user.role !== 1){
      res.status(401).json('No user logged in')
    }else{
      await searchProductBrand(req, res)
    }
  })

  app.post('/newbrand',authenticateToken,  async (req, res) => {
    const user = req.user
    if (!user){
      res.status(401).json('No user logged in')
    }else{
      if (req.user.role === 2 || req.user.role === 3){
        await addBrand(req, res)
      } else {
        res.status(401).json('Insufficient permissions.')
      }
    }
  })

  app.put('/brands/edit/:id',authenticateToken, async (req, res) => {
    const user = req.user
    if (!user){
      res.status(401).json('No user logged in')
    }else{
      if (req.user.role === 2 || req.user.role === 3){
        await editBrand(req, res)
      } else {
        res.status(401).json('Insufficient permissions.')
      }
    }
  });

  app.delete('/brands/delete/:id', authenticateToken,  async (req, res) => {
    const user = req.user
    if (!user){
      res.status(401).json('No user logged in')
    }else{
      if (req.user.role === 3){
        await deleteBrand(req, res)
      }else{
        res.status(401).json('Insufficient permissions.')
      }
    }
  });

  // products
  app.get('/productsbybrand/:id', async (req, res) => {
    const user = req.user
    if (user && user.role !== 1){
      res.status(401).json('No user logged in')
    }else{
      await viewProductBrand(req, res)
    }
  })
  app.get('/products', async (req, res) => {
    const user = req.user
    if (user && user.role !== 1){
      res.status(401).json('No user logged in')
    }else{
      await viewProducts(req, res)
    }
  })
  app.get('/api/product/:id', async (req, res) => {
    const user = req.user
    if (user && user.role !== 1){
      res.status(401).json('No user logged in')
    }else{
      await oneProduct(req, res)
    }
  })

  app.post('/newproduct', authenticateToken, upload.single('image'), async (req, res) => {
    const user = req.user
    if (!user){
      res.status(401).json('No user logged in')
    }else{
      if (req.user.role === 2 || req.user.role === 3){
        await newProduct(req, res)
      }else{
        res.status(401).json('Insufficient permissions.')
      }}
  });

  app.put('/products/edit/:id', authenticateToken, upload.single('image'), async (req, res) => {
    const user = req.user
    if (!user){
      res.status(401).json('No user logged in')
    }else{
      if (req.user.role === 2 || req.user.role === 3){
        await editProduct(req, res)
      }else{
        res.status(401).json('Insufficient permissions.')
      }
    }
  });

  app.delete('/products/delete/:id', authenticateToken, async (req, res) => {
    const user = req.user
    if (!user){
      res.status(401).json('No user logged in')
    }else{
      if (req.user.role === 3){
        await deleteProduct(req, res)
      }else{
        res.status(401).json('Insufficient permissions.')
      }
    }
  })

  // Cart
  app.post('/addToCart/:id', async (req, res) => {
    await addToCart(req, res)
  });

  app.get('/viewcart', async (req, res) => {
    await viewCart(req, res)
  });

  // Order
  app.get('/orders',authenticateToken, async (req, res) => {
    const user = req.user
    if (!user){
      res.status(401).json('No user logged in')
    }else{
      if (req.user.role === 2 || req.user.role === 3){
        await viewOrders(req, res)
      }else{
        res.status(401).json('Insufficient permissions.')
      }
    }
  });

  app.post('/neworder', authenticateToken, async (req, res) => {
    const user = req.user
    if (!user){
      res.status(401).json('No user logged in')
    }else{
      if (req.user.role === 1){
        await newOrder(req, res);
      }else{
        res.status(401).json('Insufficient permissions.')
      }
    }
  });

  app.post('/changeOrderStatus/:id', authenticateToken, async(req, res) => {
    if (req.user){
      if (req.user.role === 2 || req.user.role === 3){
        await changeOrderStatus(req, res);
      }
      else{
        res.status(401).json('Insufficient permissions.')
      }
    }else{
      res.status(401).json('No user logged in')
    }
  })

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

  // Users

  app.get('/viewUser', authenticateToken, async (req, res) => {
    const user = req.user
    if (!user){
      res.status(401).json('No user logged in')
    }else{
      if (req.user.role === 2 || req.user.role === 3){
        await viewUser(req, res)
      }else{
        res.status(401).json('Insufficient permissions.')
      }
    }
  })

  app.get('/api/user/:id', authenticateToken, async (req, res) => {
    const user = req.user
    if (!user){
      res.status(401).json('No user logged in')
    }else{
      await viewOneUser(req, res)
    }
  })

  app.post('/changeUserStatus/:id', authenticateToken, async (req,res) => {
    const user = req.user
    if (!user){
      res.status(401).json('No user logged in')
    }else{
      if (req.user.role === 2 || req.user.role === 3){
        await changeUserStatus(req, res)
      }else{
        res.status(401).json('Insufficient permissions.')
      }
    }
  })

  app.get('/addresses/:id', authenticateToken, async (req, res) => {
    if (req.user){
      if (req.user.role !== 1){
        await viewAddressesByUser(req,res)
      }else{
        res.status(401).json('Insufficient permissions')
      }
    }else{
      res.status(401).json('No user logged in')
    }
  })

  app.get('/addresses', authenticateToken, async (req, res) => {
    await getAddresses(req,res)
  })

  app.post('/changeRole/:id', authenticateToken, async (req, res) => {
    if (req.user){
      if (req.user.role === 3){
        await changeRole(req,res)
      }else{
        res.status(401).json('Insufficient permissions')
      }
    }else{
      res.status(401).json('No user logged in')
    }
  })

  app.get('/addressById/:addressId', authenticateToken, async(req,res) => {
    if (req.user){
      if (req.user.role === 2 || req.user.role === 3){
        await addressById(req,res)
      }else{
        res.status(401).json('Insufficient permissions')
      }
    }else{
      res.status(401).json('No user logged in')
    }
  })

  // Orders

  app.get('/api/user/:id/orders',authenticateToken, async (req, res) => {
    const user = req.user
    if (!user){
      res.status(401).json('No user logged in')
    }else{
      await viewUserOrders (req,res)
    }
  })

  app.get('/viewOrder/:id', authenticateToken, async (req, res) => {
    const user = req.user
    if (!user){
      res.status(401).json('No user logged in')
    }else{
      await viewOrder(req,res);
    }
  })

  app.get('/orderdetails/:id', authenticateToken, async (req,res) => {
    await details(req,res)
  })

  app.listen(PORT, () => console.log(`listening on port ${PORT}`))
})