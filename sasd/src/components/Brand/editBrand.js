import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useParams, useHistory } from 'react-router-dom';
import { updatedata } from '../context/ContextProvider';

const BrandEdit = () => {
  const { updata, setUPdata } = useContext(updatedata);
  const history = useHistory();

  const [inpval, setINP] = useState({
    name: '',
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
    const res = await fetch(`http://localhost:5000/api/brand/${id}`, {
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

  const updatebrand = async (e) => {
    e.preventDefault();
  
    const { name } = inpval;
  
    const res2 = await fetch(`http://localhost:5000/brands/edit/${id}`, {
      method: 'PATCH', // Corrected method to PATCH
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name
      })
    });

    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 422 || !data2) {
      alert('Fill the data');
    } else {
      history.push('/brands');
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
              Name
            </label>
            <input
              type="text"
              value={inpval.name}
              onChange={setdata}
              name="name"
              className="form-control"
              id="name"
              aria-describedby="emailHelp"
            />
          </div>
          
          <button type="submit" onClick={updatebrand} className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default BrandEdit;
