import React, {useEffect, useState} from 'react'

export default function Orders(){
  const [orders, setOrders] = useState(null)
  const [users, setUsers] = useState(null)

  useEffect(() => {
    document.title = 'Orders';
    if (!users) {
      getUsers()
    }
    if (!orders) {
      getOrders()
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

  const getUsers = async () => {
    try{
      const token = localStorage.getItem('token')
      const res = await fetch("https://atn-toy-server.onrender.com/viewuser", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + token
        },
        credentials: 'include'
      });
      const data = await res.json();
      if (res.ok){
        setUsers(data)
      } else {
        console.error(data);
      }
    } catch (err) {
      console.error(err)
    }
  }
    
  const getOrders = async () => {
    try{
      const token = localStorage.getItem('token')
      const res = await fetch("https://atn-toy-server.onrender.com/orders", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: 'Bearer ' + token
        },
        credentials: 'include'
      });
      const data = await res.json();
      if (res.ok){
        setOrders(data)
      } else {
        console.error(data);
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
    {/* <!-- Content Header (Page header) --> */}
    <section className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1>Accounts</h1>
          </div>
          
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="/index">Home</a></li>
              <li className="breadcrumb-item active">Customers</li>
            </ol>
          </div>
        </div>
      </div>
      {/* <!-- /.container-fluid --> */}
    </section>
    {/* <!-- Main content --> */}
    <section className="content">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Customers</h5>
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
                <th style={{width: '1%'}} className="text-center">
                    #
                </th>
                <th style={{width: '1%'}} className="text-center d-none d-lg-table-cell">
                    ID
                </th>
                <th style={{width: '20%'}} className="text-center">
                    User
                </th>
                <th style={{width: '20%'}} className="text-center d-none d-lg-table-cell">
                    Created At
                </th>
                <th style={{width: '20%'}} className="text-center">
                    Last Updated
                </th>
                <th style={{width: '20%'}} className="text-center">
                    Total
                </th>
                <th style={{width: '20%'}} className="text-center">
                    Status
                </th>
              </tr>
            </thead>
            <tbody>
            {orders && orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={index}>
                  <td className="text-center"><a href={`/order/${order._id}`}>{index + 1}</a></td>
                  <td className="text-center d-none d-lg-table-cell">{order._id}</td>
                  <td className="text-center"><a href={`/account/${order.user}`}>{users && users.length > 0 ? (users.map((user, index) => (user._id === order.user ? user.email : ''))) : ''}</a></td>
                  <td className="text-center text-center d-none d-lg-table-cell">{order.createdAt}</td>
                  <td className="text-center">{order.updatedAt === order.createdAt ? '' : order.updatedAt}</td>
                  <td className="text-center">${order.total}</td>
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
                </tr>
            ))) : null}
            </tbody>
          </table>
        </div>
        {/* <!-- /.card-body --> */}
        </div>
    
      {/* <!-- /.card --> */}
    </section>
    {/* <!-- /.content --> */}
  </div>
  )
}