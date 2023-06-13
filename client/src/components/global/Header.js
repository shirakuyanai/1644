import React, { useEffect, useState } from 'react';

export default function Header() {
  const [loggedIn, setLoggedIn] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);
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
  // checkLoginStatus()

  const handleLogout = async () => {
    try {
      const reponse = await fetch('http://localhost:5000/logout', {
        method: 'POST',
        credentials: 'include',
      });
      localStorage.removeItem('token');
      window.location.replace('/index');
    } catch (ex) {
      console.error(ex);
    }
  };

  if (loading) {
    return (
      <div className="container">
        <h1 className="text-center">Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-sm-3 col-xs-8">
            <div className="logo">
              <a href="/index">
                <img src="../assets/images/logo.png" alt="" />{' '}
              </a>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
            <div className="search-bg">
              <input
                type="text"
                className="form-control"
                placeholder="Search Here"
              />
              <button type="Submit">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
          <div className="col-lg-3 col-md-3 col-sm-12">
            <div className="account-section">
              {Object.keys(loggedIn).length === 0 ? (
                <ul>
                  <li className="title">
                    <a href="/login">Login</a>
                  </li>
                  <li className="title">|</li>
                  <li className="title">
                    <a href="/register">Register</a>
                  </li>
                  <li className="title">|</li>
                  <li className="title">
                    <a href="/cart">
                      <i className="fa fa-shopping-cart"></i>{' '}
                      <sup className="cart-quantity">1</sup>
                    </a>
                  </li>
                </ul>
              ) : (
                <ul>
                  <li className="title">
                    <a href="/profile">Hello {loggedIn.firstname}</a>
                  </li>
                  <li className="title">|</li>
                  <li className="title">
                    <a href="#" onClick={handleLogout}>
                      Logout
                    </a>
                  </li>
                  <li className="title">|</li>
                  <li className="title">
                    <a href="/cart">
                      <i className="fa fa-shopping-cart"></i>{' '}
                      <sup className="cart-quantity">1</sup>
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
