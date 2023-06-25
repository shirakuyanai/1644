const Product = require('../models/Product')
const { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } = require('firebase/storage');
const { validationResult } = require('express-validator');
const storage = getStorage();
const _ = require('lodash');
const { ProductValidation, editProductValidation } = require('./validate');
const { response } = require('express');
// const { check } = require('express-validator');
const viewProducts = async (req, res) => {
  const products = await Product.find()
  if (!products){
    res.status(404).json('No products found')
  }
  else{
    res.json(products)
  }
}

const oneProduct = async (req, res) => {
  try{
    const id = req.params.id;
    const product = await Product.findById(id)
    if (product){
      res.json(product)
    }
    else{
      res.status(404).json('No product found')
    }
  } catch (e) {
    res.status(500).json('Internal Server Error')
  }
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
      return res.status(401).json({ errors: errors.array() });
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

      res.json('Product added successfully!');
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
  try {
    const id = req.params.id;
    const prod = await Product.findById(id);
    const old_prod = _.cloneDeep(prod);
    if (!prod){
      res.status(401).json('Product not found');
    }
    
    if (req.file) {
      
      try{
        // Deleting the old upload before uploading a new one
        const storageRef = ref(storage, prod.image);
        try {
          // Check if the file exists
          await getDownloadURL(storageRef);
        
          // File exists, proceed with deletion
          await deleteObject(storageRef);
          console.log('File deleted successfully.');
        } catch (error) {
          if (error.code === 'storage/object-not-found') {
            console.log('File does not exist.');
          } else {
            console.error('Error deleting file:', error);
          }
        }
        const newstorageRef = ref(storage, req.file.originalname);
        await uploadBytes(newstorageRef, req.file.buffer);
        const downloadURL = await getDownloadURL(newstorageRef);
        prod.image = downloadURL; // Update the image URL of the product
      }
      catch (err) {
        console.error(err);
      }
    }
  
    if (req.body.name){
      prod.name = req.body.name;
    }
    
    if (req.body.brand){
      prod.brand = req.body.brand;
    }
    
    if (req.body.price && req.body.price !== 0 && req.body.price !== '0'){
      prod.price = parseInt(req.body.price);
    }

    if (req.body.stock && req.body.stock !== 0 && req.body.stock !== '0'){
      prod.stock = parseInt(req.body.stock);
    }

    if (req.body.description){
      prod.description = req.body.description;
    }

    await prod.save();
    res.json('Product edited successfully');

  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteProduct = async (req, res) => {
  try{
    const id = req.params.id;
    let prod = await Product.findById(id);
    const storageRef = ref(storage, prod.image);
    try {
      // Check if the file exists
      await getDownloadURL(storageRef);
    
      // File exists, proceed with deletion
      await deleteObject(storageRef);
      console.log('File deleted successfully.');
    } catch (error) {
      if (error.code === 'storage/object-not-found') {
        console.log('File does not exist.');
      } else {
        console.error('Error deleting file:', error);
      }
    }
    prod = await Product.findByIdAndDelete(id)
    res.json('Product deleted successfully!')
  } catch(err){
    res.status(500).json({ error: err.message });
  }
}




module.exports = { viewProducts, newProduct, editProduct, deleteProduct , oneProduct}