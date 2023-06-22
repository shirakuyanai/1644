const Product = require('../models/Product')
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { validationResult } = require('express-validator');
const storage = getStorage();
const { ProductValidation, editProductValidation } = require('./validate')
// const { check } = require('express-validator');
const viewProducts = async (req, res) => {
  const products = await Product.find()
  res.json(products)
}

const oneProduct = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id)
  res.json(product)
}

// const validation = (req, res,   next) => {
//   const errors = validationResult(req);
//   if(errors.isEmpty()){
//     return next();
//   }
//   return res.status(400).json({errors: errors.array()})
// }

const newProduct = async (req, res) => {
  try {
    // Validate request body
    await Promise.all(ProductValidation.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const product = new Product({
      name: req.body.name,
      brand: req.body.brand,
      price: req.body.price,
      description: req.body.description,
      stock: req.body.stock,
      image: req.body.image,
    });

    try {
      const savedProduct = await product.save();

      if (req.file) {
        const storageRef = ref(storage, req.file.originalname);
        await uploadBytes(storageRef, req.file.buffer);
        const downloadURL = await getDownloadURL(storageRef);
        savedProduct.image = downloadURL; // Store the image URL in the saved product
        await savedProduct.save();
      }

      res.json(savedProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const editProduct = async (req, res) => {
  const id = req.params.id;
  const prod = await Product.findById(id);
  try {
    // Validate request body
    await Promise.all(ProductValidation.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    if (!prod) {
      return res.status(404).json({ error: 'Product not found' });
    }

    prod.name = req.body.name;
    prod.brand = req.body.brand;
    prod.price = req.body.price;
    prod.stock = req.body.stock;
    prod.image = req.body.image;
    prod.description = req.body.description;

    try {
      if (req.file) {
        const storageRef = ref(storage, req.file.originalname);
        await uploadBytes(storageRef, req.file.buffer);
        const downloadURL = await getDownloadURL(storageRef);
        prod.image = downloadURL; // Update the image URL of the product
      }

      await prod.save();
      res.json(prod);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;
  const prod = await Product.findByIdAndDelete(id);
  res.json(prod)
}




module.exports = { viewProducts, newProduct, editProduct, deleteProduct , oneProduct}