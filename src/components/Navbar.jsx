import '../styles/Navbar.css';
// import { Link } from "react-router-dom";
import { Link, useNavigate } from 'react-router-dom';

import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import React from 'react'; // ✅ Required for JSX to work

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="navbar">
      {/* Logo & Brand */}
      <div className="navbar-brand">
        <img src="/brand.svg" alt="Logo" className="navbar-logo" />
        <div className="brand-text">
          <h2>SHOOOPPPP</h2>
          <small>NON-PROFIT ORGANIZATION</small>
        </div>
      </div>

      {/* Nav Links */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/category/Fruits">Fruits</Link>
        <Link to="/category/Vegetables">Vegetables</Link>
        <Link to="/cart">🛒 Cart ({totalItems})</Link>
        <Link to="/donate" className="donate-button">Donate</Link>
      </div>
    </div>
  );
};

export default Navbar;
