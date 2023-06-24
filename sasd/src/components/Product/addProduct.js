import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';

const AddProduct = () => {
  const [inpval, setINP] = useState({
    name: '',
    brand: '',
    price: 0,
    stock: 0,
    description: '',
    image: null
  });
  const [brands, setBrands] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const history = useHistory();

  const setdata = (e) => {
    const { name, value, type } = e.target;
    if (name === 'image' && type === 'file') {
      setINP((prevVal) => ({
        ...prevVal,
        image: e.target.files[0]
      }));
    } else {
      setINP((prevVal) => ({
        ...prevVal,
        [name]: value
      }));
    }
  };
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('http://localhost:5000/brands');
        const data = await response.json();
        setBrands(data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, []);
  const addProduct = async (e) => {
    e.preventDefault();

    const { name, brand, price, stock, description, image } = inpval;

    if (!name || !brand || !price || !stock || !description || !image) {
      alert('Please fill in all the required fields');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('brand', brand);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const res = await fetch('http://localhost:5000/newproduct', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      console.log(data);

      if (res.status === 422 || !data) {
        alert('Failed to add product');
      } else {
        // Handle successful product addition
        setSuccessMessage('Product added successfully');

        history.push('/products'); // Redirect to /products page

        // Reset form fields
        setINP({
          name: '',
          brand: '',
          price: 0,
          stock: 0,
          description: '',
          image: null
        });
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="container">
      <h1>Add Product</h1>
      {successMessage && <p>{successMessage}</p>}
      <form className="mt-4">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            value={inpval.name}
            onChange={setdata}
            name="name"
            className="form-control"
            id="name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="brand" className="form-label">
            Brand
          </label>
          <select
            value={inpval.brand}
            onChange={setdata}
            name="brand"
            className="form-control"
            id="brand"
            required
          >
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option key={brand._id} value={brand._id}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            value={inpval.price}
            onChange={setdata}
            name="price"
            className="form-control"
            id="price"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="stock" className="form-label">
            Stock
          </label>
          <input
            type="number"
            value={inpval.stock}
            onChange={setdata}
            name="stock"
            className="form-control"
            id="stock"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            value={inpval.description}
            onChange={setdata}
            name="description"
            className="form-control"
            id="description"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={setdata}
            name="image"
            className="form-control"
            id="image"
            required
          />
        </div>
        <button type="submit" onClick={addProduct} className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
