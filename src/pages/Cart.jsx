import { useContext } from "react";
import React from 'react';
import Navbar from "../components/Navbar";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, incrementQuantity, decrementQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.discount * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <div style={{ backgroundColor: "#fef7f1", minHeight: "100vh", padding: "40px 20px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", backgroundColor: "#ffffff", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }}>
          <h2 style={{ textAlign: "center", fontSize: "2.2rem", marginBottom: "30px", color: "#2c3e50" }}>
            🛒 Your Cart
          </h2>

          {cart.length === 0 ? (
            <p style={{ textAlign: "center", fontSize: "1.2rem" }}>Cart is empty.</p>
          ) : (
            <>
              <div style={{ marginBottom: "30px" }}>
                {cart.map((item, idx) => (
                  <div key={idx} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#f0f8ff",
                    padding: "15px 20px",
                    borderRadius: "8px",
                    marginBottom: "15px"
                  }}>
                    <div style={{ flex: 1 }}>
                      <strong style={{ fontSize: "1.1rem" }}>{item.name}</strong><br />
                      ₹{item.discount} × {item.quantity}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <button
                        onClick={() => decrementQuantity(item.id)}
                        style={{
                          padding: "6px 12px",
                          fontSize: "1rem",
                          backgroundColor: "#e74c3c",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer"
                        }}
                      >−</button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => incrementQuantity(item.id)}
                        style={{
                          padding: "6px 12px",
                          fontSize: "1rem",
                          backgroundColor: "#2ecc71",
                          color: "#fff",
                          border: "none",
                          borderRadius: "5px",
                          cursor: "pointer"
                        }}
                      >+</button>
                    </div>
                    <div style={{ fontWeight: "bold", fontSize: "1.1rem", marginLeft: "20px" }}>
                      ₹{item.discount * item.quantity}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontSize: "1.5rem", color: "#34495e" }}>Total: ₹{total}</h3>
                <button
                  onClick={() => navigate("/payment")}
                  style={{
                    padding: "12px 30px",
                    backgroundColor: "#16a085",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "1rem",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease"
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = "#13856d"}
                  onMouseOut={(e) => e.target.style.backgroundColor = "#16a085"}
                >
                  Buy Now
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
