import Layout from './scenes/layouts/layout'
import Index from './scenes/index/index'
import Login from './scenes/login'
import Register from './scenes/register'
import Product from './scenes/product'
import Cart from './scenes/cart'
import Checkout from './scenes/checkout'
import Register_Success from './scenes/register_success'
import Profile from './scenes/profile'

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export default function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/index" replace />} />
              <Route path="/index" element={<Index/>} />
              <Route path="/product" element={<Product/>} />
              <Route path="/cart" element={<Cart/>} />
              <Route path="/profile" element={<Profile/>} />
              <Route path="/register_success" element={<Register_Success/>} />
          </Route>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/checkout" element={<Checkout/>} />
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}