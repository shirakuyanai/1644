import { useEffect, useState } from 'react';
export default function Cart() {
  const [loggedIn, setLoggedIn] = useState({});
  const [loading, setLoading] = useState(true);
  const [old_Email, setOldEmail] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [old_password, setOldPassword] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const changeTitle = data => {
    document.title = data;
  };

  useEffect(() => {
    if (Object.keys(loggedIn).length === 0) {
      checkLoginStatus();
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

  const handleChangePassword = async event => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/changePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: email,
          old_password: old_password,
          new_password: password1,
          new_password_2: password2,
        }),
        credentials: 'include',
      });
      alert(await response.json());
      if (response.ok) {
        window.location.reload();
      }
    } catch (e) {
      console.error(e);
    }
  };
  const handleChangeEmail = async event => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/changeEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          old_Email: old_Email,
          email: email,
          old_password: old_password,
        }),
        credentials: 'include',
      });

      const data = await response.json();
      alert(data); // Display the response message
      if (response.ok) {
        window.location.reload();
      } else {
        throw new Error(data); // Throw an error with the response message
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    changeTitle('Profile');
  });

  if (loading) {
    return (
      <div className="container text-center">
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <section className="" style={{ backgroundColor: '#f4f5f7' }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-6 mb-4 mb-lg-0">
              <div className="card mb-3" style={{ borderRadius: 0.5 + 'rem' }}>
                <div className="row g-0">
                  <div
                    className="col-md-4 gradient-custom text-center text-white"
                    style={{
                      borderTopLeftRadius: 0.5 + 'rem',
                      borderBottomLeftRadius: 0.5 + 'rem',
                    }}
                  >
                    <img
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      alt="Avatar"
                      className="img-fluid my-5"
                      style={{ width: 80 + 'px' }}
                    />
                    <h2>
                      {loggedIn.firstname} {loggedIn.lastname}
                    </h2>
                    <i className="far fa-edit mb-5"></i>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4">
                      <h2>Information</h2>
                      <hr className="mt-0 mb-4 border" />
                      <div className="row pt-1">
                        <div className="col-6 mb-3">
                          <h2>Email</h2>
                          <p className="text-muted">{loggedIn.email}</p>
                        </div>
                        <div className="col-6 mb-3">
                          <h2>Phone</h2>
                          <p className="text-muted">{loggedIn.phone}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-primary m-2"
                      data-bs-toggle="modal"
                      data-bs-target="#changeName"
                    >
                      Change Name
                    </button>
                    <button
                      type="button"
                      className="btn btn-warning m-2"
                      data-bs-toggle="modal"
                      data-bs-target="#changeEmail"
                    >
                      Change Email
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger m-2"
                      data-bs-toggle="modal"
                      data-bs-target="#changePassword"
                    >
                      Change Password
                    </button>
                  </div>

                  <div
                    className="modal fade"
                    id="changeName"
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          >
                            Change Name
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <form action="#">
                          <div className="modal-body text-center">
                            <input
                              type="text"
                              placeholder="First Name"
                              className="mb-4 rounded pe-5 ps-2"
                              style={{ width: 280 + 'px' }}
                              onChange={event =>
                                setFirstname(event.target.value)
                              }
                            />
                            <br />
                            <input
                              type="text"
                              placeholder="Last Name"
                              className="rounded pe-5 ps-2"
                              style={{ width: 280 + 'px' }}
                              onChange={event =>
                                setLastname(event.target.value)
                              }
                            />
                          </div>
                          <div className="modal-footer d-flex justify-content-between">
                            <button type="button" className="btn btn-success">
                              Save changes
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div
                    className="modal fade"
                    id="changeEmail"
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          >
                            Change Email
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <form action="#" onSubmit={handleChangeEmail}>
                          <div className="modal-body text-center">
                            <input
                              type="email"
                              placeholder="Email"
                              className="mb-4 rounded pe-5 ps-2"
                              style={{ width: 280 + 'px' }}
                              onChange={event =>
                                setOldEmail(event.target.value)
                              }
                              required
                            />
                            <br />
                            <input
                              type="email"
                              placeholder="New Email"
                              className="mb-4 rounded pe-5 ps-2"
                              style={{ width: 280 + 'px' }}
                              onChange={event => setEmail(event.target.value)}
                              required
                            />
                            <br />
                            <input
                              type="password"
                              placeholder="Password"
                              className="mb-4 rounded pe-5 ps-2"
                              style={{ width: 280 + 'px' }}
                              onChange={event =>
                                setOldPassword(event.target.value)
                              }
                              required
                            />
                          </div>
                          <div className="modal-footer d-flex justify-content-between">
                            <button type="submit" className="btn btn-success">
                              Save changes
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div
                    className="modal fade"
                    id="changePassword"
                    tabIndex="-1"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1
                            className="modal-title fs-5"
                            id="exampleModalLabel"
                          >
                            Change Password
                          </h1>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <form action="#" onSubmit={handleChangePassword}>
                          <div className="modal-body text-center">
                            <input
                              type="email"
                              placeholder="Email"
                              className="mb-4 rounded pe-5 ps-2"
                              style={{ width: 280 + 'px' }}
                              onChange={event => setEmail(event.target.value)}
                            />
                            <br />
                            <input
                              type="password"
                              placeholder="Old Password"
                              className="mb-4 rounded pe-5 ps-2"
                              style={{ width: 280 + 'px' }}
                              onChange={event =>
                                setOldPassword(event.target.value)
                              }
                            />
                            <br />
                            <input
                              type="password"
                              placeholder="New Password"
                              className="mb-4 rounded pe-5 ps-2"
                              style={{ width: 280 + 'px' }}
                              onChange={event =>
                                setPassword1(event.target.value)
                              }
                            />
                            <br />
                            <input
                              type="password"
                              placeholder="Retype Password"
                              className="mb-4 rounded pe-5 ps-2"
                              style={{ width: 280 + 'px' }}
                              onChange={event =>
                                setPassword2(event.target.value)
                              }
                            />
                            <br />
                          </div>
                          <div className="modal-footer d-flex justify-content-between">
                            <button type="submit" className="btn btn-success">
                              Save changes
                            </button>
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
