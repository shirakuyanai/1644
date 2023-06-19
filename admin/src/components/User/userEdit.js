import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { updatedata } from '../context/ContextProvider';

const   Edit = () => {
  const { updata, setUPdata } = useContext(updatedata);
  const history = useHistory();

  const [inpval, setINP] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    role: '',
    verified: ''
  });

  const setdata = (e) => {
    const { name, value } = e.target;
    setINP((preval) => ({
      ...preval,
      [name]: value
    }));
  };

  const { id } = useParams();
  console.log(id);

  const getdata = async () => {
    const res = await fetch(`http://localhost:5000/api/user/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log('error');
    } else {
      setINP(data);
      console.log('get data');
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const updateuser = async (e) => {
    e.preventDefault();
  
    const { firstname, lastname, phone, email, role, verified } = inpval;
  
    const res2 = await fetch(`http://localhost:5000/api/user/edit/${id}`, {
      method: 'PATCH', // Corrected method to PATCH
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstname,
        lastname,
        phone,
        email,
        role,
        verified
      })
    });

    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 422 || !data2) {
      alert('Fill the data');
    } else {
      history.push('/users');
      setUPdata(data2);
    }
  };

  return (
    <div className="container">
      <NavLink to="/">home2</NavLink>
      <form className="mt-4">
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="firstname" className="form-label">
              First Name
            </label>
            <input
              type="text"
              value={inpval.firstname}
              onChange={setdata}
              name="firstname"
              className="form-control"
              id="firstname"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="lastname" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              value={inpval.lastname}
              onChange={setdata}
              name="lastname"
              className="form-control"
              id="lastname"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              value={inpval.email}
              onChange={setdata}
              name="email"
              className="form-control"
              id="email"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="phone" className="form-label">
              Mobile
            </label>
            <input
              type="number"
              value={inpval.phone}
              onChange={setdata}
              name="phone"
              className="form-control"
              id="phone"
            />
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select
              className="form-control"
              name="role"
              value={inpval.role}
              onChange={setdata}
              id="role"
            >
              <option value="">Select Role</option>
              <option value="1">Member</option>
              <option value="2">Admin</option>
            </select>
          </div>
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="verified" className="form-label">
              Verified
            </label>
            <select
              className="form-control"
              name="verified"
              value={inpval.verified}
              onChange={setdata}
              id="verified"
            >
              <option value="">Select Verified</option>
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <button type="submit" onClick={updateuser} className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;
