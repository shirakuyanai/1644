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
    const brand = new Brand(
        {
            name: req.body.name
        }
    )
    brand.save()
    res.json(brand)
}

const editBrand = async (req,res) => {
    const id = req.params.id;
    const brand = await Brand.findById(id);
    
    if (!brand) {
    return res.status(404).json({ error: 'Brand not found' });
    }
    brand.name = req.body.name;
    await brand.save();
    res.json(brand);
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

  



module.exports = {viewBrands, addBrand, editBrand, deleteBrand, viewOneBrand}