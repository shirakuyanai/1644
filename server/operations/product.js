const Product = require('../models/Product')
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');

const storage = getStorage();

const viewProducts = async (req,res) => {
    const products = await Product.find()
    res.json(products)
}

const newProduct = async (req, res) => {
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
  };
  

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
  };
  

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    const prod = await Product.findByIdAndDelete(id);
    res.json(prod)
}

module.exports = {viewProducts, newProduct, editProduct, deleteProduct}