import React, {useState, useEffect} from 'react';
import { Outlet } from 'react-router-dom';

export default function Layout() {
    const [loggedIn, setLoggedIn] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (loading) {
            checkLoginStatus();
        }
        else{
            if (Object.keys(loggedIn).length === 0 || loggedIn.role === 1){
                window.location.replace('/logout')
            }
        }
    });

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

      
  return (
    <div className="wrapper">
        {/* <!-- Preloader --> */}
        <div className="preloader flex-column justify-content-center align-items-center">
            <img className="animation__wobble" src="/assets/dist/img/AdminLTELogo.png" alt="AdminLTELogo" height="60" width="60"/>
        </div>

        {/* <!-- Navbar --> */}
        <nav className="main-header navbar navbar-expand navbar-dark">
            {/* <!-- Left navbar links --> */}
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <a href="/index" className="nav-link">Home</a>
                </li>
            </ul>

            {/* <!-- Right navbar links --> */}
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                        <i className="fas fa-expand-arrows-alt"></i>
                    </a>
                </li>
            </ul>
        </nav>
        {/* <!-- /.navbar --> */}

        {/* <!-- Main Sidebar Container --> */}
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* <!-- Brand Logo --> */}
            <a href="/index" className="brand-link">
                <img src="/assets/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}}/>
                <span className="brand-text font-weight-light">Admin Dashboard</span>
            </a>

            {/* <!-- Sidebar --> */}
            <div className="sidebar mt-3">
            {/* <!-- Sidebar user panel (optional) --> */}
                <div className="user-panel d-flex">
                    <div className="image">
                        <img src="/assets/dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image"/>
                    </div>
                    <div className="info">
                        <a href="/profile" className="d-block">{loggedIn ? <p>{loggedIn.firstname} {loggedIn.lastname}</p> : ''}</a>
                    </div>
                </div>

                {/* <!-- SidebarSearch Form --> */}
                <div className="form-inline">
                    <div className="input-group" data-widget="sidebar-search">
                    <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search"/>
                    <div className="input-group-append">
                        <button className="btn btn-sidebar">
                        <i className="fas fa-search fa-fw"></i>
                        </button>
                    </div>
                    </div>
                </div>

                {/* <!-- Sidebar Menu --> */}
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                    {/* <!-- Add icons to the links using the .nav-icon class
                        with font-awesome or any other icon font library --> */}
                        <li className="nav-item">
                            <a href="/products" className="nav-link">
                            <p>
                                Products
                            </p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/brands" className="nav-link">
                            <p>
                                Brands
                            </p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/accounts" className="nav-link">
                            <p>
                                Accounts
                            </p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/orders" className="nav-link">
                            <p>
                                Orders
                            </p>
                            </a>
                        </li>
                        <li className="nav-item">
                            <a href="/logout" className="nav-link">
                                <i className="fas fa-sign-out-alt mr-2"></i>
                                <p>
                                    Logout
                                </p>
                            </a>
                        </li>
                    </ul>
                </nav>
            {/* <!-- /.sidebar-menu --> */}
            </div>
            {/* <!-- /.sidebar --> */}
        </aside>


        <div className="content-wrapper"><Outlet /></div>
    
        
    </div>
  );
}
