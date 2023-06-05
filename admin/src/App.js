import React, {useEffect, useMemo, useState} from 'react'
import { CssBaseline, ThemeProvider } from '@mui/material'
import {createTheme } from '@mui/material'
import { themeSettings } from 'theme'
import { useSelector } from 'react-redux'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './scenes/dashboard'
import Layout from './scenes/layout'
export default function App() {
  const [brands, setBrands] = useState([{}])
  const mode = useSelector((state) => state.global.mode)
  const theme = useMemo( () => createTheme(themeSettings(mode)), [mode])
  useEffect(() => {
    fetch('/brands')
    .then(res=>res.json())
    .then(data => {setBrands(data)})
    .catch(err => console.log(err))
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Navigate to ="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}