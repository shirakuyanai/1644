import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
export default function ViewUser(){
  const {id} = useParams();
  const [user, setUser] = useState({});
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    document.title = 'User';
    if (Object.keys(user).length < 1){
      getUser()
    }
  })

  useEffect(() => {
    getAddresses()
    if (loading){
      getOrders()
      setLoading(false)
    }
  })

  const changeOrderStatus = async (id, status) => {
    try{
      const token = localStorage.getItem('token')
      const response = await fetch(`https://atn-toy-server.onrender.com/changeOrderStatus/${id}`, {
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
      getOrders()
      alert(await response.json())
    } catch (err){
      alert(err)
    }
  }
    

  const getAddresses = async () => {
    try{
      const token = localStorage.getItem('token')
      const response = await fetch(`https://atn-toy-server.onrender.com/addresses/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        credentials: 'include'
      })
      const data = await response.json()
      if (response.ok){
        setAddresses(data)
      }
      else{
        console.error(data)
      }
    } catch (err){
      console.error(err)
    }
  }
  
  const getOrders = async () => {
    try{
      const token = localStorage.getItem('token')
      const response = await fetch(`https://atn-toy-server.onrender.com/api/user/${id}/orders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        credentials: 'include'
      })
      const data = await response.json()
      if (response.ok){
        setOrders(data)
      }
      else{
        console.error(data)
      }
    } catch (err){
      console.error(err)
    }
  }

  const getUser = async () => {
    try{
      const token = localStorage.getItem('token')
      const res = await fetch(`https://atn-toy-server.onrender.com/api/user/${id}`, {
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

  const changeUserStatus = async () => {
    try{
      const confirm = window.confirm('Are you sure you want to change this user\'s status?')
      if (confirm)
      {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://atn-toy-server.onrender.com/changeUserStatus/${id}`, {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          },
          credentials: 'include'
        })
        alert(await response.json())
        if (response.ok){
          getUser()
        }
      }
    }catch(e){
      alert(e)
    }
  }

  const changeRole = async (role) => {
    try{
      const confirm = window.confirm('Are you sure you want to change this user\'s role?')
      if (confirm)
      {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://atn-toy-server.onrender.com/changeRole/${id}`, {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          },
          body: JSON.stringify({
            role: role
          }),
          credentials: 'include'
        })
        alert(await response.json())
        if (response.ok){
          getUser()
        }
      }
    }catch(e){
      alert(e)
    }
  }

  return (
    <div>
      <table className="table table-striped projects">
        <tr>
          <th>ID</th>
          <td>{user._id}</td>
        </tr>
        <tr>
          <th>First Name</th>
          <td>{user.firstname}</td>
        </tr>
        <tr>
          <th>Last Name</th>
          <td>{user.lastname}</td>
        </tr>
        <tr>
          <th>Phone</th>
          <td>
            {user.phone}
          </td>
        </tr>
        <tr>
          <th>Email</th>
          <td>{user.email}</td>
        </tr>
        <tr>
          <th>Role</th>
          {/* <td>{user.role === 1 ? 'Customer' : user.role === 2 ? 'Staff' : user.role === 3 ? 'Manager' : 'Undefined'}</td> */}
          <td>
            <select value={user?.role} onChange={event => changeRole(event.target.value)}>
              <option value='1'>Customer</option>
              <option value='2'>Staff</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>Verified</th>
          <td>{user.verified ? <p className='text-success'>Verified</p> : <p className='text-danger'>Unverified</p>}</td>
        </tr>
        <tr>
          <th>Status</th>
          <td>{user.status ? <p className='text-success'>Active</p> : <p className='text-danger'>Suspended</p>}</td>
        </tr>
      </table>
      <div className='mb-5 mt-0'>
        {user.status ? 
          <a className="btn btn-danger btn-sm" onClick={changeUserStatus}>
            <i className="fas fa-stop mr-1"></i>
            Suspend
          </a> :
          <a className="btn btn-success btn-sm" onClick={changeUserStatus}>
            <i className="fas fa-play mr-1"></i>
            Activate
          </a>
        }
      </div>

      <section className="content">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">Addresses</h5>
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
                        <th className="text-center d-none d-lg-table-cell">
                            ID
                        </th>
                        <th className="text-center d-none d-lg-table-cell">
                            Ward
                        </th>
                        <th className="text-center d-none d-lg-table-cell">
                            Province
                        </th>
                        <th className="text-center d-none d-lg-table-cell">
                            District
                        </th>
                        <th className="text-center">
                            City
                        </th>
                        <th className="text-center">
                            Zip Code
                        </th>
                    </tr>
              </thead>
              <tbody>
                  {addresses && addresses.length > 0 ? (
                      addresses.map((address, index) => (
                          <tr key={index}>
                            <td className="text-center">{index + 1}</td>
                            <td className="text-center d-none d-lg-table-cell">{address._id}</td>
                            <td className="text-center d-none d-lg-table-cell">{address.ward}</td>
                            <td className="text-center d-none d-lg-table-cell">{address.province}</td>
                            <td className="text-center">${address.district}</td>
                            <td className="text-center">{address.city}</td>
                            <td className="text-center">{address.zipcode}</td>
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

      <section className="content">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title">Orders</h5>
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
                        <th className="text-center d-none d-lg-table-cell">
                            ID
                        </th>
                        <th className="text-center d-none d-lg-table-cell">
                            Created At
                        </th>
                        <th className="text-center">
                            Updated At
                        </th>
                        <th className="text-center">
                            Status
                        </th>
                        <th className="text-center">
                            Total
                        </th>
                    </tr>
              </thead>
              <tbody>
                  {orders && orders.length > 0 ? (
                      orders.map((order, index) => (
                          <tr key={index}>
                            <td className="text-center"><a href={`/order/${id}`}>{index + 1}</a></td>
                            <td className="text-center d-none d-lg-table-cell">{order._id}</td>
                            <td className="text-center d-none d-lg-table-cell">{order.createdAt}</td>
                            <td className="text-center">{order.updatedAt}</td>
                            <td className="text-center">
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
                            </td>
                            <td className="text-center">${order.total}</td>
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
