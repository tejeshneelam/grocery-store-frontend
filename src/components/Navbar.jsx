import '../styles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import React from 'react';

const Navbar = () => {
  const { cart } = useContext(CartContext);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const [name, setName] = useState(localStorage.getItem("name"));
  const [role, setRole] = useState(() => {
    try {
      const t = localStorage.getItem("token");
      if (!t) return null;
      const base64Url = t.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const payload = JSON.parse(jsonPayload);
      return payload.role || null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    const sync = () => {
      setName(localStorage.getItem("name"));
      try {
        const t = localStorage.getItem("token");
        if (!t) return setRole(null);
        const base64Url = t.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const payload = JSON.parse(jsonPayload);
        setRole(payload.role || null);
      } catch (e) {
        setRole(null);
      }
    };
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navbar-brand" onClick={() => navigate("/")}>
        <img src="/brand.svg" alt="Logo" className="navbar-logo" />
        <div className="brand-text">
          <h2>🛍️ IN & OUT</h2>
          <small>PREMIUM GROCERY STORE</small>
        </div>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">🛒 Cart ({totalItems})</Link>
        <Link to="/donate">Donate</Link>

        {token && <Link to="/profile">Profile</Link>}

        {role === "admin" && <Link to="/admin">Admin</Link>}

        {!token ? (
          <>
            <Link to="/login">🔓 Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        ) : (
          <>
            <span>{name}</span>
            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;