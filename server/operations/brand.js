const Brand = require('../models/Brand')
const Product = require('../models/Product');

// View all brands
const viewBrands = async (req,res) => {
    const brands = await Brand.find()
    res.json(brands)
}

const viewOneBrand = async (req,res) => {
  const id = req.params.id;
  const brand = await Brand.findById(id)
  res.json(brand)
}
const addBrand = async (req,res) => {
    try{
      const brand = new Brand(
        {
            name: req.body.name
        }
      )
      brand.save()
      res.json(brand)
    }
    catch(err){
      res.status(404).json(err)
    }
}

const editBrand = async (req,res) => {
    try{
      const id = req.params.id;
      const brand = await Brand.findById(id);
      
      if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
      }
      brand.name = req.body.name;
      await brand.save();
      res.json(brand);
    }
    catch(err){
      res.status(400).json(err);
    }
}

const deleteBrand = async (req, res) => {
  const id = req.params.id;

  try {
    // Find the brand by ID
    const brand = await Brand.findById(id);
    if (!brand) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    // Find and delete the associated products
    await Product.deleteMany({ brand: id });

    // Delete the brand
    await Brand.findByIdAndDelete(id);

    res.json({ message: 'Brand and associated products deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const viewProductBrand = async (req, res) => {
  const brandId = req.params.id;
  const brand = await Brand.findById(brandId);
  if (!brand) {
    return res.status(404).json({ error: 'Brand not found' });
  }
  
  if (brandId) {
    // If brand ID is provided, fetch products based on the brand ID
    products = await Product.find({ brand: brandId });
  } else {
    // If brand ID is not provided, fetch all products
    products = await Product.find();
  }
  
  res.json(products);
};
  

const searchProductBrand = async (req, res) => {
  const searchTerm = req.query.search; // Get the search term from the query parameters

  let products;

  if (searchTerm) {
    // If search term is provided, search for products and brands by name
    const productQuery = { name: { $regex: searchTerm, $options: 'i' } };
    const brandQuery = { name: { $regex: searchTerm, $options: 'i' } };

    const [products, brands] = await Promise.all([
      Product.find(productQuery),
      Brand.find(brandQuery),
    ]);

    res.json({ products, brands });
  } else {
    // If search term is not provided, fetch all products and brands
    const [products, brands] = await Promise.all([
      Product.find(),
      Brand.find(),
    ]);

    res.json({ products, brands });
  }
};


module.exports = {viewBrands, addBrand, editBrand, deleteBrand, viewOneBrand, viewProductBrand, viewProductBrand, searchProductBrand}