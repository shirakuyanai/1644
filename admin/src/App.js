import {useEffect, useState} from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './scenes/layout'
import Index from './scenes/index'
import Brands from './scenes/brands'
import Login from './scenes/login';
import AddBrand from './scenes/brands/add';
import EditBrand from './scenes/brands/edit';
import Products from './scenes/products';
import ViewProduct from './scenes/products/view';
import EditProduct from './scenes/products/edit';
import AddProduct from './scenes/products/add';
import Accounts from './scenes/accounts';
import ViewUser from './scenes/accounts/view';
import Logout from './scenes/logout';
import Orders from './scenes/orders';
import ViewOrder from './scenes/orders/view';
import Profile from './scenes/profile';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/index" replace />} />
          <Route path="/index" element={<Index />} />

          <Route path="/brands" element={<Brands />} />
          <Route path="/brand/add" element={<AddBrand />} />
          <Route path="/brand/edit/:id" element={<EditBrand />} />

          <Route path="/products" element={<Products />} />
          <Route path="/product/add" element={<AddProduct />} />
          <Route path="/product/:id" element={<ViewProduct />} />
          <Route path="/product/edit/:id" element={<EditProduct />} />
          
          <Route path="/accounts" element={<Accounts />} />
          <Route path="/account/:id" element={<ViewUser />} />

          <Route path="/orders" element={<Orders />} />
          <Route path="/order/:id" element={<ViewOrder />} />

          <Route path="/profile" element={<Profile />} />

        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
