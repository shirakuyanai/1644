import React, { useEffect } from 'react';

const Logout = () => {
  const logout = async () => {
    try {
      const response = await fetch('https://atn-toy-server.onrender.com/logout', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        localStorage.removeItem('token');
        window.location.replace('/login');
      } else {
        alert(await response.json());
      }
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    logout();
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
