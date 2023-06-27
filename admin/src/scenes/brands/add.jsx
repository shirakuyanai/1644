import React from 'react'
import { useState, useEffect } from 'react';

export default function AddBrand(){
  const [name, setName] = useState('')
  useEffect(() => {
    document.title = 'New brand';
  },[])
  const addBrand = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('https://atn-toy-server.onrender.com/newbrand', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({name: name}),
        credentials: 'include'
      });
      if (response.ok) {
        alert('Brand added successfully');
        window.location.replace('/brands')
      } else {
        // Handle error response
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  
  return (
    <div className="m-lg-5 p-lg-5 m-5">
      <h1>New Brand</h1>
      <form onSubmit={addBrand}>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name" placeholder="Brand name" onChange={(event => setName(event.target.value))} required/>
          </div>
        </div>
        <div className="card-footer bg-transparent">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  )
}

