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
          
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
