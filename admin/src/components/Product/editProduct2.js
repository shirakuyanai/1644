import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { updatedata } from '../context/ContextProvider';

const EditProduct2 = () => {
  const { setUPdata } = useContext(updatedata);
  const history = useHistory();
  const [product, setProduct] = useState({});

  const [inpval, setINP] = useState({
    name: '',
    brand: '',
    price: 0,
    stock: 0,
    description: '',
    image: null
  });

  const [brands, setBrands] = useState([]);

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

  const { id } = useParams();
  console.log(id);

  const getdata = async () => {
    const res = await fetch(`https://atn-toy-server.onrender.com/api/product/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log('error');
    } else {
      setINP(data);
      console.log('get data');
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch('https://atn-toy-server.onrender.com/brands');
        const data = await response.json();
        setBrands(data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, []);

  const updateProduct = async (e) => {
    e.preventDefault();

    const { name, brand, price, stock, description, image } = inpval;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('brand', brand);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('description', description);
    formData.append('image', image);

    const res = await fetch(`https://atn-toy-server.onrender.com/products/edit/${id}`, {
      method: 'PATCH',
      body: formData
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      alert('Fill the data');
    } else {
      setUPdata(data);
      history.push('/products'); // Redirect to /products page
    }
  };

  return (
    <div className="container">
      <NavLink to="/">Home</NavLink>
      <form className="mt-4">
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
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
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="brand" className="form-label">
              Brand
            </label>
            <select
              value={inpval.brand}
              onChange={setdata}
              name="brand"
              className="form-control"
              id="brand"
            >
              <option value="">Select Brand</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
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
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
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
            />
          </div>
          <div className="mb-3 col-12">
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
            ></textarea>
          </div>
          <div className="mb-3 col-12">
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
            />
          </div>
          <button type="submit" onClick={updateProduct} className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct2;
