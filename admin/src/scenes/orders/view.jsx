import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
export default function ViewOrder(){
  const {id} = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null)
  const [details, setDetails] = useState(null)
  const [address, setAddress] = useState(null)
  const [products, setProducts] = useState([])
  useEffect(() => {
    document.title = 'Order';
  })
  
  useEffect(() => {
    if (!order){
      getOrder()
    }
    if (!address && order){
      getAddress(order.address)
      getUser(order.user)
    }
    if (!details){
      getDetails()
    }
  })
  
  useEffect(() => {
      getProducts()
  }, [products])

  const getProducts = async () => {
    try{
      const response = await fetch('http://localhost:5000/products', {
        method: 'GET',
        credentials: 'include'
      })
      if (response.ok){
        setProducts(await response.json())
      }
    } catch (e){
      console.error(e)
    }
  }

  const getOrder = async () => {
    try{
      const response = await fetch(`http://localhost:5000/viewOrder/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        credentials: 'include'
      })
      const data = await response.json()
      if (response.ok){
        setOrder(data)
      }else{
        alert(data)
      }
    } catch (err){
      alert(err)
    }
  }

  const getAddress = async addressId => {
    try{
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:5000/addressById/${addressId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        credentials: 'include'
      })
      if (response.ok){
        setAddress(await response.json())
      } else{
        alert(await response.json())
      }
    } catch (err){
      alert(err)
    }
  }
  
  const getUser = async userId => {
    try{
      const token = localStorage.getItem('token')
      const res = await fetch(`http://localhost:5000/api/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        credentials: 'include'
      });
      const data = await res.json();
      if (res.ok){
        setUser(data)
      }
      console.error(data)
    } catch (err) {
      console.error(err)
    }
  };

  const changeOrderStatus = async (id, status) => {
    try{
      const token = localStorage.getItem('token')
      const response = await fetch(`http://localhost:5000/changeOrderStatus/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          status: status
        }),
        credentials: 'include'
      })
      alert(await response.json())
      getOrder()
    } catch (err){
      alert(err)
    }
  }
  
  const getDetails = async () => {
    try{
      const response = await fetch(`http://localhost:5000/orderdetails/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        credentials: 'include'
      })
      const data = await response.json()
      if (response.ok){
        setDetails(data)
      }
      else{
        alert(data)
      }
    } catch (err){
      alert(err)
    }
  }

  return (
    <div>
      <table className="table table-striped projects">
        <tr>
          <th>ID</th>
          <td>{order ? order._id : ''}</td>
        </tr>
        <tr>
          <th>User</th>
          <td><a href={`/account/${user._id}`}>{user ? user.email : ''}</a></td>
        </tr>
        <tr>
          <th>Created At</th>
          <td>{order ? order.createdAt : ''}</td>
        </tr>
        <tr>
          <th>Last Update</th>
          <td>
            {order ? order.createdAt !== order.updatedAt ? order.updatedAt : '' : ''}
          </td>
        </tr>
        <tr>
          <th>Status</th>
          {order ? <td>
          <div class="dropdown">
            {order.status === 1 ? 
              <button class="btn badge badge-warning dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Pending
              </button> : 
              order.status === 2 ? 
              <button class="btn badge badge-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Processing
              </button> : 
              order.status === 3 ? 
              <button class="btn badge badge-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Shipped
              </button> : 
              order.status === 4 ? 
              <button class="btn badge badge-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Delivered
              </button> : 
              order.status === 0 ? 
              <button class="btn badge badge-danger dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Canceled
              </button> : 
              null}
              <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); changeOrderStatus(order._id, 1)}}>Pending</a>
                <a class="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); changeOrderStatus(order._id, 2)}}>Processing</a>
                <a class="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); changeOrderStatus(order._id, 3)}}>Shipped</a>
                <a class="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); changeOrderStatus(order._id, 4)}}>Delivered</a>
                <a class="dropdown-item" href="#" onClick={(e) => {e.preventDefault(); changeOrderStatus(order._id, 0)}}>Canceled</a>
              </div>
            </div>
          </td> : ''}
        </tr>
        <tr>
          <th>Address</th>
          <td>
            {address ? <p>{address.ward}, {address.province}, {address.district}, {address.city} ({address.zipcode})</p> : ''}
          </td>
        </tr>
        <tr>
          <th>Total</th>
          <td>{order ? <p>${order.total}</p> : ''}</td>
        </tr>
      </table>

      <section className="content">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">Items</h5>
            <div className="card-tools">
                <button type="button" className="btn btn-tool" data-card-widget="collapse">
                    <i className="fas fa-minus"></i>
                </button>
                
                <button type="button" className="btn btn-tool" data-card-widget="remove">
                    <i className="fas fa-times"></i>
                </button>
            </div>
          </div>
          {/* <!-- /.card-header --> */}
          <div className="card-body">
            <table className="table table-striped projects">
              <thead>
                    <tr>
                        <th className="text-center">
                            #
                        </th>
                        <th className="text-center">
                            Product
                        </th>
                        <th className="text-center">
                            Quantity
                        </th>
                        <th className="text-center">
                            Total price
                        </th>
                    </tr>
              </thead>
              <tbody>
                  {details && details.length > 0 ? (
                      details.map((detail, index) => (
                          <tr key={index}>
                            <td className="text-center">{index + 1}</td>
                            <td className="text-center"><a href={`/product/${detail.product}`}>{products.map(product => product._id === detail.product ? product.name : '')}</a></td>
                            <td className="text-center">{detail.quantity}</td>
                            <td className="text-center">${detail.total}</td>
                          </tr>
                      ))
                  ) : null}
              </tbody>
            </table>
          </div>
          {/* <!-- /.card-body --> */}
          </div>
      
        {/* <!-- /.card --> */}
      </section>
    </div>
  )
}
