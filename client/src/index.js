import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <script src="https://unpkg.com/react-router-dom/umd/react-router-dom.min.js"></script>
  </React.StrictMode>,
);
