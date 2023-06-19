import React, { useContext, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { adddata } from '../context/ContextProvider';

const AddBrand = () => {
  const history = useHistory();
  const [inpval, setInpval] = useState({ name: '' });

  const setdata = (e) => {
    setInpval({ ...inpval, [e.target.name]: e.target.value });
  };

  const addBrand = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/newbrand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(inpval)
      });

      if (response.ok) {
        
        history.push('/brands');
      } else {
        // Handle error response
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div className="container">
      <NavLink to="/">home</NavLink>
      <form className="mt-4">
        <div className="row">
          <div className="mb-3 col-lg-6 col-md-6 col-12">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Name
            </label>
            
            <input
              type="text"
              value={inpval.name}
              onChange={setdata}
              name="name"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
        </div>
        <button type="submit" onClick={addBrand} className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddBrand;
