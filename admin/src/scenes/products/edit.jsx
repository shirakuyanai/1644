import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function EditProduct(){
  const {id} = useParams();
  const [product, setProduct] = useState({})
  const [brands, setBrands] = useState([])
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [image, setImage] = useState(null)
  const [price, setPrice] = useState('0')
  const [stock, setStock] = useState('0')
  const [description, setDescription] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  
  useEffect(() => {
    document.title = 'Edit product'
  })


  useEffect(() => {
    if (Object.keys(product).length < 1){
      getProduct()
      if (product) 
      {
        setPrice(product.price)
        setPrice(product.stock)
      }
      else{
        setPrice('0')
        setStock('0')
      }
    }
  })


  useEffect(() => {
    getBrands()
  }, [brands])

  useEffect(() => {
    setDescription(product.description);
  }, [product.description]);

  useEffect(() => {
    setPreviewImage(product.image);
  }, [product.image]);

  const getBrands = async () => {
    try {
        const token = localStorage.getItem('token')
        const response = await fetch('https://atn-toy-server.onrender.com/brands', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            credentials: 'include',
        })
        if (response.ok){
            const data = await response.json()
            setBrands(data)
        }
    }
    catch (e){
        console.error(e)
    }
  }
  const getProduct = async () => {
    try{
      const response = await fetch(`https://atn-toy-server.onrender.com/api/product/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      if (response.ok){
        const data = await response.json()
        setProduct(data)
      }
    }
    catch (error){
      console.error(error)
    }
  }

  function handleUpload(file) {
    if (file && file.type.includes('image/')) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setPreviewImage(product.image);
    }
  }

  useEffect(() => {
    // Listen for the custom input event on descriptionInput
    document.getElementById('descriptionInput').addEventListener('input', handleInputChange);

    // Clean up the event listener when the component unmounts
    return () => {
      document.getElementById('descriptionInput').removeEventListener('input', handleInputChange);
    };
  });

  const handleInputChange = () => {
    setDescription(document.getElementById('descriptionInput').value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const formData = new FormData();
      formData.append('name', name);
      formData.append('brand', brand);
      const priceValue = parseFloat(price);
      if (!isNaN(priceValue)) {
        formData.append('price', priceValue);
      } else {
        formData.append('price', 0);
      }

      const stockValue = parseFloat(stock);
      if (!isNaN(stockValue)) {
        formData.append('stock', stockValue);
      } else {
        formData.append('stock', 0);
      }
      formData.append('image', image);
      formData.append('description', description);
      const token = localStorage.getItem('token');
      const response = await fetch(`https://atn-toy-server.onrender.com/products/edit/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
        body: formData
      });
      if (response.ok){
        alert(await response.json())
        window.location.replace('/products')
      }
    } catch(err){
      alert('Uncaught error: ' + err)
    }
  }

  return (
    <div className='mt-5 pt-5 container'>
      <div className="container">
        <h1>Edit product {product ? product.name : 'undefined'}</h1>
        <form action='#' onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="form-group">
              {/* Name */}
              <div className="mb-4">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" defaultValue={product.name} placeholder="Product name" required onChange={event => setName(event.target.value)}/>
              </div>
              {/* Brands */}
              <div className="mb-4">
                <label htmlFor="brands">Brands</label>
                <select className="custom-select rounded-0" id="brands" defaultValue={product.brand} onChange={event => setBrand(event.target.value)}>
                  {brands && brands.length > 0 ? brands.map(brand => {
                    return <option value={brand._id}>{brand.name}</option>
                  }) : null}
                </select>
              </div>
              {/* Image */}
              <div className="mb-4">
                <label htmlFor="exampleInputFile">Image</label>
                <div className="input-group">
                  <div className="custom-file">
                    <input type="file" className="custom-file-input" id="exampleInputFile" accept="image/jpeg, image/png, image/jpg" onChange={event => handleUpload(event.target.files[0])}/>
                    <label className="custom-file-label" htmlFor="exampleInputFile">{image ? image.name : 'Choose file'}</label>
                  </div>
                </div>
                <div className="text-center m-5">
                  <img src={previewImage} style={{width: 400 + 'px'}}></img>
                </div>
              </div>
              {/* Price */}
              <div className="mb-4">
                <label htmlFor="name">Price</label>
                <input type="number" className="form-control" defaultValue={product.price} id="name" min="0" placeholder="Product name" required onChange={event => setPrice(event.target.value)}/>
              </div>
              {/* Stock */}
              <div className="mb-4">
                <label htmlFor="name">Stock</label>
                <input type="number" className="form-control" defaultValue={product.stock} id="name" placeholder="Product name" required onChange={event => setStock(event.target.value)} />
              </div>
              {/* Description */}
              
              <div className="mb-4">
                <label htmlFor="name">Description</label>
                <div className="col-md-12">
                  <div className="card card-outline card-info">
                    <div className="card-body">
                      <textarea id="summernote"></textarea>
                    </div>
                  </div>
                </div>
                <div>
                  <h3>Preview:</h3>
                  <div dangerouslySetInnerHTML={{ __html: description }}></div>
                  <input type='hidden' id="descriptionInput" value={description} />
                  <input type='hidden' id="descriptionOutput" value={product.description}/>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer bg-transparent pt-0">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

