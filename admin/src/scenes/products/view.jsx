import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
export default function ViewProduct(){
    const {id} = useParams();
    const [brands, setBrands] = useState([])
    const [product, setProduct] = useState({})
    useEffect(() => {
      getBrands()
      getProduct()
    }, [brands, product])
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

  const deleteProduct = async productId => {
    try {
      const confirm = window.confirm('Are you sure you want to delete this product? This action cannot be undone.')
      if (confirm){
        const token = localStorage.getItem('token')
        const res = await fetch(`https://atn-toy-server.onrender.com/products/delete/${productId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token
          },
          credentials: 'include'
        });
        if (res.ok) {
          alert('Product deleted successfully')
          window.location.replace('/products')
        } else {
          alert("Failed to delete product");
        }
      }
    } catch (error) {
      alert("Error occurred while deleting product:", error);
    }
  };


  const getProduct = async () => {
    try{
      const response = await fetch(`https://atn-toy-server.onrender.com/api/product/${id}`, {
        method: 'GET',
        credentials: 'include',
      })
      if (response.ok){
        setProduct(await response.json())
      }
    } catch (e){
      console.error(e)
    }
  }
  return (
    <div>
      <table className="table table-striped projects">
        <tr>
          <th>ID</th>
          <td>{product._id}</td>
        </tr>
        <tr>
          <th>Name</th>
          <td>{product.name}</td>
        </tr>
        <tr>
          <th>Image</th>
          <td><img src={product.image} height="400px"/></td>
        </tr>
        <tr>
          <th>Brand</th>
          <td>
            {brands && brands.length > 0
              ? brands.map(brand => {
                  return brand._id === product.brand ? brand.name : '';
                })
              : ''}
          </td>
        </tr>
        <tr>
          <th>Price</th>
          <td>{product.price}</td>
        </tr>
        <tr>
          <th>Stock</th>
          <td>{product.stock}</td>
        </tr>
        <tr>
          <th>Description</th>
          <td dangerouslySetInnerHTML={{ __html: product.description }}></td>
        </tr>
      </table>
      <div className='d-flex justify-content-around justify-content-lg-start'>
        <a type="submit" className="btn btn-primary mr-md-5" href={`/product/edit/${product._id}`}>Edit</a>
        <button type="submit" className="btn btn-danger" onClick={() => deleteProduct(product._id)}>Delete</button>
      </div>
    </div>
  )
}
