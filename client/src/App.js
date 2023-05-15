
import Layout from './scenes/layouts/layout'
import Index from './scenes/index/index'
import Login from './scenes/login/login'
import Register from './scenes/register/register'

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";



export default function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/index" replace />} />
              <Route path="/index" element={<Index/>} />
          </Route>
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}