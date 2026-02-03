import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

import './index.css';
import App from './App';
import { CartProvider } from './context/CartContext';

// Set axios base URL
axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CartProvider>
    <App />
  </CartProvider>
);
