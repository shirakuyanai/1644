const express = require('express');
const app = express();
const port = 5000
const mongoose = require('mongoose')
app.use(express.json())
mongoose.connect("mongodb+srv://react:React123@react.psjcoby.mongodb.net/").then(() => console.log("All set")).catch((console.error))

const Brand = require('./models/Brand')
const Product = require('./models/Product')
const Order = require('./models/Order')
const User = require('./models/User')

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

app.get('/products', async(req, res) => {
    const products = await Product.find()
    res.json(products)
})

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

app.listen(port, () => console.log(`listening on port ${port}`))