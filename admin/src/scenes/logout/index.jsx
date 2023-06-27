import React, { useEffect } from 'react';

const Logout = () => {
  useEffect(() => {
    const logout = async () => {
      try {
        const response = await fetch('http://localhost:5000/logout', {
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

    logout();
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
