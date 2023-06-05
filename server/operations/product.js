const Product = require('../models/Product')

const viewProducts = async (req,res) => {
    const products = await Product.find()
    res.json(products)
}

const newProduct = async (req,res) => {
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
}

const editProduct = async (req, res) => {
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
};

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    const prod = await Product.findByIdAndDelete(id);
    res.json(prod)
}

module.exports = {viewProducts, newProduct, editProduct, deleteProduct}