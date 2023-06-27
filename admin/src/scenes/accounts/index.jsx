import React, {useEffect, useState} from 'react'

export default function Accounts(){
  const [users, setUsers] = useState(null)
  const [loggedIn, setLoggedIn] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = 'Accounts';
    if (!users) {
      getUsers()
    }
  })

  useEffect(() => {
    checkLoginStatus();
  }, [loggedIn]);

  const checkLoginStatus = async () => {
      try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/checkLoginStatus', {
          method: 'GET',
          headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
      });
      if (response.ok) {
          const data = await response.json();
          setLoggedIn(data);
          console.log(loggedIn);
          setLoading(false);
      }
      setLoading(false);
      } catch (e) {
      console.error(e);
      setLoading(false);
      }
  };
  
  const changeUserStatus = async id => {
    try{
      const confirm = window.confirm('Are you sure you want to change this user\'s status?')
      if (confirm)
      {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:5000/changeUserStatus/${id}`, {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          },
          credentials: 'include'
        })
        alert(await response.json())
        if (response.ok){
          setUsers(prevUsers => {
            return prevUsers.map(user => {
              if (user._id === id) {
                return { ...user, status: !user.status };
              } else {
                return user;
              }
            })})
        }
      }
    }catch(e){
      alert(e)
    }
  }

  const getUsers = async () => {
    try{
      const token = localStorage.getItem('token')
      const res = await fetch("http://localhost:5000/viewuser", {
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
                            <th style={{width: '1%'}} className="text-center d-none d-lg-table-cell">
                                ID
                            </th>
                            <th style={{width: '20%'}} className="text-center">
                                First Name
                            </th>
                            <th style={{width: '20%'}} className="text-center">
                                Last Name
                            </th>
                            <th style={{width: '20%'}} className="text-center">
                                Phone
                            </th>
                            <th style={{width: '20%'}} className="text-center">
                                Email
                            </th>
                            <th style={{width: '20%'}} className="text-center d-none d-lg-table-cell">
                                Verified
                            </th>
                            <th style={{width: '20%'}} className="text-center d-none d-lg-table-cell">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {users && users.length > 0 ? (
                        users.map((user, index) => (
                          user.role === 1 ? (
                            <tr key={index}>
                              <td onClick={() => window.location.replace(`/account/${user._id}`)} className="text-center d-none d-lg-table-cell">{user._id}</td>
                              <td onClick={() => window.location.replace(`/account/${user._id}`)} className="text-center">{user.firstname}</td>
                              <td onClick={() => window.location.replace(`/account/${user._id}`)} className="text-center">{user.lastname}</td>
                              <td onClick={() => window.location.replace(`/account/${user._id}`)} className="text-center">{user.phone}</td>
                              <td onClick={() => window.location.replace(`/account/${user._id}`)} className="text-center">{user.email}</td>
                              <td onClick={() => window.location.replace(`/account/${user._id}`)} className="text-center d-none d-lg-table-cell">{user.verified ? <p className='text-success'>Verified</p> : <p className='text-danger'>Unverified</p>}</td>
                              <td className="project-actions text-center d-none d-lg-table-cell">
                                {user.status ? 
                                  <a className="btn btn-danger btn-sm" onClick={() => changeUserStatus(user._id)}>
                                    <i className="fas fa-stop mr-1"></i>
                                    Suspended
                                  </a> :
                                  <a className="btn btn-success btn-sm" onClick={() => changeUserStatus(user._id)}>
                                    <i className="fas fa-play mr-1"></i>
                                    Active
                                  </a>
                                }
                              </td>
                            </tr>
                            ) : null
                        ))) : null}
                </tbody>
            </table>
        </div>
        {/* <!-- /.card-body --> */}
        </div>
    
      {/* <!-- /.card --> */}
    </section>
    {/* <!-- /.content --> */}

    {loggedIn.role === 3 ? (
      <section className="content">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title">Staff</h5>
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
                                <th style={{width: '1%'}} className="text-center d-none d-lg-table-cell">
                                    ID
                                </th>
                                <th style={{width: '20%'}} className="text-center">
                                    First Name
                                </th>
                                <th style={{width: '20%'}} className="text-center">
                                    Last Name
                                </th>
                                <th style={{width: '20%'}} className="text-center">
                                    Phone
                                </th>
                                <th style={{width: '20%'}} className="text-center">
                                    Email
                                </th>
                                <th style={{width: '20%'}} className="text-center d-none d-lg-table-cell">
                                    Verified
                                </th>
                                <th style={{width: '20%'}} className="text-center d-none d-lg-table-cell">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {users && users.length > 0 ? (
                            users.map((user, index) => (
                              user.role === 2 ? (
                                <tr key={index}>
                                  <td onClick={() => window.location.replace(`/account/${user._id}`)} className="text-center d-none d-lg-table-cell">{user._id}</td>
                                  <td onClick={() => window.location.replace(`/account/${user._id}`)} className="text-center">{user.firstname}</td>
                                  <td onClick={() => window.location.replace(`/account/${user._id}`)} className="text-center">{user.lastname}</td>
                                  <td onClick={() => window.location.replace(`/account/${user._id}`)} className="text-center">{user.phone}</td>
                                  <td onClick={() => window.location.replace(`/account/${user._id}`)} className="text-center">{user.email}</td>
                                  <td onClick={() => window.location.replace(`/account/${user._id}`)} className="text-center d-none d-lg-table-cell">{user.verified ? <p className='text-success'>Verified</p> : <p className='text-danger'>Unverified</p>}</td>
                                  <td className="project-actions text-center d-none d-lg-table-cell">
                                    {user.status ? 
                                      <a className="btn btn-danger btn-sm" onClick={() => changeUserStatus(user._id)}>
                                        <i className="fas fa-stop mr-1"></i>
                                        Suspended
                                      </a> :
                                      <a className="btn btn-success btn-sm" onClick={() => changeUserStatus(user._id)}>
                                        <i className="fas fa-play mr-1"></i>
                                        Active
                                      </a>
                                    }
                                  </td>
                                </tr>) : null
                            ))) : null}
                    </tbody>
                </table>
            </div>
            {/* <!-- /.card-body --> */}
            </div>
        
          {/* <!-- /.card --> */}
        </section>
    ) : null}
  </div>
  )
}