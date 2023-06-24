import {useEffect, useState} from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './scenes/layouts/layout';
import Index from './scenes/index/index';
import Login from './scenes/login';
import Register from './scenes/register';
import Product from './scenes/product';
import Cart from './scenes/cart';
import Checkout from './scenes/checkout';
import Register_Success from './scenes/register_success';
import Profile from './scenes/profile';
import Order_Detail from './scenes/Order_Detail';



export default function App() {
  const [cartQuantity, setCartQuantity] = useState(0)
  useEffect(() => {
    cart()
  })
  const updateQuantity = (newQuantity) => {
    setCartQuantity(newQuantity)
  }

  const cart = async () => {
    try {
        
        const response = await fetch(
          `http://localhost:5000/viewcart`, // Replace `productId` with the actual product ID
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              
            },
            credentials: "include",
          }
        );
        if (response.ok) {
          const cart = await response.json();
          let quantity = 0
          cart.forEach(element => {
            quantity += element.quantity
          });
          updateQuantity(quantity)
        }
      } catch (ex) {
        console.error(ex);
      }
}

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout quantity={cartQuantity} updateQuantity={updateQuantity}/>}>
            <Route path="/" element={<Navigate to="/index" replace />} />
            <Route path="/index" element={<Index updateQuantity={updateQuantity}/>} />
            <Route path="/product/:id" element={<Product updateQuantity={updateQuantity}/>} />
            <Route path="/cart" element={<Cart updateQuantity={updateQuantity}/>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/viewOrder/:id" element={<Order_Detail />} />
            <Route path="/register_success" element={<Register_Success />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
