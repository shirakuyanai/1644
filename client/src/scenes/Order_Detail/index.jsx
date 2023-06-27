import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'

const Order_Detail = () => {
  const {id} = useParams()
  const [order, setOrder] = useState({})
  const [product, setProduct] = useState({})
  useEffect(() => {
    getOrder()
  }, [])
  useEffect(() => {
    const fetchProducts = async () => {
      const productNames = {}
      for (const item of order.items) {
        const productName = await productById(item.product)
        productNames[item.product] = productName
      }
      setProduct(productNames)
    }
  
    if (order && order.items && order.items.length > 0) {
      fetchProducts()
    }
  }, [order])

  const productById = async (id) => {
    const response = await fetch(`https://atn-toy-server.onrender.com/api/product/${id}`, {
      method: 'GET',
      credentials: 'include',
    })
    if (response.ok){
      const data = await response.json()
      console.log(data.name)
      return data.name
      
    }
    else{
      return 'undefined'
    }
  }
  
  const getOrder = async () =>{
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`https://atn-toy-server.onrender.com/viewOrder/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      })
      if (response.ok){ 
        const data = await response.json()
        setOrder(data)
      }
    }
    catch(err){
      console.error(err)
    }
  }
  return (
    <div className='text-dark mt-5 text-center'>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Products</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {order && order.items && order.items.length > 0 ? (
            order.items.map((item, index) => (
              <tr key={item._id}>
                <th scope="row">{index}</th>
                <td><a href={`/product/${item.product}`}>{product[item.product]}</a></td>
                <td>{item.quantity}</td>
                <td>{item.total}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No items found</td>
            </tr>
          )}

          
        </tbody>
        <tr>
          <th scope="row">SubTotal</th>
          <td></td>
          <td></td>
          <td><b>$6234</b></td>
        </tr>
      </table>
      

    </div>
  )
}

export default Order_Detail
