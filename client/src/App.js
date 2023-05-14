import { useEffect, useState } from 'react'
import Layout from './scenes/layouts/layout'
import Index from './scenes/index/index'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";



export default function App() {
  const [brands, setBrands] = useState([])
  const [newBrand, setNewBrand] = useState("")

  useEffect(() => {
      getBrand()
  }, [])

  const getBrand = () => {
    fetch('/brands')
    .then(res => res.json())
    .then(data => setBrands(data))
    .catch(err => console.log(err))
  }

  const addBrand = async () => {
    const data = await fetch('/newbrand', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify({
        name: newBrand
      })
    })
    .then( res => res.json())
    setBrands([...brands, data])
    setNewBrand("")
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/index" replace />} />
              <Route path="/index" element={<Index />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

