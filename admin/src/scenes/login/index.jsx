import React, { useEffect, useState } from 'react';

export default function Login() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState({});
  const [checked, setChecked] = useState(false)
  useEffect(() => {
    changeTitle('Login');
    if (checked === false) {
      checkLoginStatus();
      setChecked(true)
    }
    
    if (Object.keys(loggedIn).length > 0) {
      window.location.replace('/index');
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

  const changeTitle = data => {
    document.title = data;
  };

  const handleLogin = async event => {
    event.preventDefault();
    try {
      if (email !== '' && password !== '') {
        const response = await fetch('http://localhost:5000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          const token = data.token;
          localStorage.setItem('token', token);
          window.location.replace('/index');
        } else {
          alert(await response.json());
          console.error('Login failed:', await response.json());
        }
      } else {
        alert('Please fill out all the required fields');
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="hold-transition login-page bg-gray">
        <div className="login-box">
            <div className="card card-outline card-primary">
                <div className="card-header text-center">
                    <a href="../../index2.html" className="h1"><b>Admin</b>LTE</a>
                </div>
                <div className="card-body">
                    <p className="login-box-msg">Sign in to start your session</p>
                    <form action="../../index3.html" method="post">
                        <div className="input-group mb-3">
                            <input type="email" className="form-control" placeholder="Email" autoComplete="Email" required onChange={event => setEmail(event.target.value)}/>
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <input type="password" className="form-control" placeholder="Password" autoComplete="Password" required onChange={event => setPassword(event.target.value)}/>
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8">
                                <div className="icheck-primary">
                                    <input type="checkbox" id="remember"/>
                                    <label for="remember">
                                        Remember Me
                                    </label>
                                </div>
                            </div>
                            <div className="col-4">
                                <button type="submit" className="btn btn-primary btn-block" onClick={handleLogin}>Sign In</button>
                            </div>
                        </div>
                    </form>

                    <div className="social-auth-links text-center mt-2 mb-3">
                        <a href="#" className="btn btn-block btn-primary">
                        <i className="fab fa-facebook mr-2"></i> Sign in using Facebook
                        </a>
                        <a href="#" className="btn btn-block btn-danger">
                        <i className="fab fa-google-plus mr-2"></i> Sign in using Google+
                        </a>
                    </div>

                    <p className="mb-1">
                        <a href="forgot-password.html">I forgot my password</a>
                    </p>
                    <p className="mb-0">
                        <a href="register.html" className="text-center">Register a new membership</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}


