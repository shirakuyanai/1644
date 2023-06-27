import React from 'react'
import { useState, useEffect } from 'react';

export default function AddProduct(){
  const [brands, setBrands] = useState([])
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')
  const [image, setImage] = useState(null)
  const [price, setPrice] = useState(1)
  const [stock, setStock] = useState(1)
  const [description, setDescription] = useState('');
  const [previewImage, setPreviewImage] = useState('');
  
  useEffect(() => {
    document.title = 'Add product'
  })

  useEffect(() => {
    getBrands()
  }, [brand])

  const getBrands = async () => {
    try {
        const token = localStorage.getItem('token')
        const response = await fetch('http://localhost:5000/brands', {
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


  const handleSubmit = async e => {
    e.preventDefault();
    try{
      if (brand === '') {
        alert('Please select a brand');
      }
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
      const response = await fetch(`http://localhost:5000/newproduct`, {
        method: 'POST',
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
        <h1>Add a new product</h1>
        <form action='#' onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="form-group">
              {/* Name */}
              <div className="mb-4">
                <label htmlFor="name">Name</label>
                <input type="text" className="form-control" id="name" placeholder="Product name" required onChange={event => setName(event.target.value)}/>
              </div>
              {/* Brands */}
              <div className="mb-4">
                <label htmlFor="brands">Brands</label>
                <select className="custom-select rounded-0" id="brands" onChange={event => setBrand(event.target.value)}>
                  <option selected>Select a brand</option>
                  {brands && brands.length > 0 ? brands.map(brand => {
                    return <option value={brand._id}>{brand.name}</option>
                  }) : null}
                </select>
              </div>
              {/* Image */}
              <div className="mb-4">
                <label htmlFor="image">Image</label>
                <div className="input-group">
                  <div className="custom-file">
                    <input type="file" className="custom-file-input" id="image" accept="image/jpeg, image/png, image/jpg" onChange={event => handleUpload(event.target.files[0])} required/>
                    <label className="custom-file-label" htmlFor="image">{image ? image.name : 'Choose file'}</label>
                  </div>
                </div>
                {previewImage !== '' ? 
                (
                  <div className="text-center m-5">
                    <img src={previewImage} style={{width: 400 + 'px'}}></img>
                  </div>
                ) : ('')}
                
              </div>
              {/* Price */}
              <div className="mb-4">
                <label htmlFor="name">Price</label>
                <input type="number" className="form-control" defaultValue='1' id="price" min="1" placeholder="Enter a price" required onChange={event => setPrice(event.target.value)}/>
              </div>
              {/* Stock */}
              <div className="mb-4">
                <label htmlFor="name">Stock</label>
                <input type="number" className="form-control" defaultValue='1' id="stock" min="1"  placeholder="Enter a stock number" required onChange={event => setStock(event.target.value)} />
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

