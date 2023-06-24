import React, { useEffect, useState } from 'react';

export default function Head() {
  const [loggedIn, setLoggedIn] = useState({});
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState();
  useEffect(() => {
    if (Object.keys(loggedIn).length === 0) {
      checkLoginStatus();
    }
    if (Object.keys(loggedIn).length === 0) {
      if (verified === undefined) {
        checkVerifyStatus();
      }
    }
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

  const checkVerifyStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/checkVerifyStatus', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setVerified(data);
        setLoading(false);
      }
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  };
  // checkVerifyStatus()
  const handleResendVerification = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        'http://localhost:5000/resendVerificationEmail',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        },
      );
      if (response.ok) {
        const data = await response.json();
        console.log('Verification email resent successfully.', data);
      } else {
        console.error('Failed to resend verification email.');
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="top-header">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-md-7 col-sm-6 hidden-xs">
            <p className="top-text">Flexible Delivery, Fast Delivery.</p>
          </div>

          <div className="col-lg-4 col-md-5 col-sm-6 col-xs-12">
            <ul>
              <li>+180-123-4567</li>
              <li>info@demo.com</li>
              <li>
                <a href="#">Help</a>
              </li>
            </ul>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {Object.keys(loggedIn).length === 0 ? (
            ''
          ) : (
            <div>
              {!verified ? (
                <p className="text-warning">
                  Not verified.{' '}
                  <a href="#" onClick={handleResendVerification}>
                    Resend verification mail
                  </a>{' '}
                  to verify{' '}
                </p>
              ) : (
                ''
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
