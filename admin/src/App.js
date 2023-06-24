import {useEffect, useState} from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Layout from './scenes/layout'
import Index from './scenes/index'
import Brands from './scenes/brands'
import Login from './scenes/login';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/index" replace />} />
          <Route path="/index" element={<Index />} />
          <Route path="/brands" element={<Brands />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
