const express = require('express');
const app = express();
const port = 5000
const mongoose = require('mongoose')
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5000'
}))

mongoose.connect("mongodb+srv://atn:Atn123@tbhzone.54x3cwa.mongodb.net/").then(() => console.log("All set")).catch((console.error))

const Brand = require('./models/Brand')
const Product = require('./models/Product')
const Address = require('./models/Address')
const OrderDetail = require('./models/OrderDetail')
const Order = require('./models/Order')
const User = require('./models/User')

app.get('/', async(req, res) => {
    res.json('Server is online!')
})

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


// products
app.get('/products', async(req, res) => {
    const products = await Product.find()
    res.json(products)
})
//add product
app.post('/newproduct', async(req, res) => {
    const product = await new Product(
        {
            name: req.body.name,
            brand: req.body.brand,
            price: req.body.price,
            description: req.body.description,
            colors: req.body.colors,
            specs: req.body.specs
        }
    )
    product.save()
    res.json(product)
})
//edit product
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
  //delete product
  app.delete('/products/delete/:id', async(req, res) => {
    const id = req.params.id;
    const prod = await Product.findByIdAndDelete(id);
   
    res.json(prod)
})


  

//Order

app.get('/orders', async(req, res) => {
    const order = await Order.find()
    res.json(order)
})

app.post('/neworder', async(req, res) => {
    
})





app.listen(port, () => console.log(`listening on port ${port}`))