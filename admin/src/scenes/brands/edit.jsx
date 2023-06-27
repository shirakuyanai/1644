import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function EditBrand(){
  const {id} = useParams();
  const [name, setName] = useState('')
  const [brand, setBrand] = useState({})
  useEffect(() => {
    document.title = 'Edit Brand';
    getBrand(id)
  }, [])
  const getBrand = async id => {
    try{
      const token = localStorage.getItem('token')
      const response = await fetch(`https://atn-toy-server.onrender.com/api/brand/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        credentials: 'include'
      });
      if (response.ok){
        setBrand(await response.json())
      }
    }
    catch (error){
      console.error(error)
    }
  }

  const editBrand = async e => {
    e.preventDefault();
    try{
      const token = localStorage.getItem('token')
      const response = await fetch(`https://atn-toy-server.onrender.com/brands/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({name: name}),
        credentials: 'include'
      })
      if (response.ok){
        alert('Brand edited successfully')
        window.location.replace('/brands')
      }
    }catch (e){
      console.error(e);
    }
  }

  return (
    <div className='m-5 p-lg-5'>
      <h1>Edit brand {brand ? brand.name : 'undefined'}</h1>
      <form onSubmit={editBrand}>
        <div className="card-body">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name" placeholder="Brand name" onChange={(event => setName(event.target.value))} required/>
          </div>
        </div>
        <div className="card-footer bg-transparent mt-0 pt-0">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  )
}

