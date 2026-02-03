import { useContext } from "react";
import React from 'react';
import Navbar from "../components/Navbar";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, incrementQuantity, decrementQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <div style={{ 
        background: "linear-gradient(135deg, #ecf0f1 0%, #bdc3c7 100%)", 
        minHeight: "100vh", 
        padding: "60px 20px" 
      }}>
        <div style={{ 
          maxWidth: "900px", 
          margin: "0 auto", 
          backgroundColor: "#ffffff", 
          padding: "40px", 
          borderRadius: "16px", 
          boxShadow: "0 12px 40px rgba(0,0,0,0.15)" 
        }}>
          <h2 style={{ 
            textAlign: "center", 
            fontSize: "2.5rem", 
            marginBottom: "40px", 
            color: "#2c3e50",
            fontWeight: "700"
          }}>
            🛒 Your Shopping Cart
          </h2>

          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <p style={{ fontSize: "1.4rem", color: "#7f8c8d", marginBottom: "20px" }}>
                Your cart is empty
              </p>
              <button
                onClick={() => navigate("/")}
                style={{
                  padding: "12px 30px",
                  background: "linear-gradient(135deg, #27ae60 0%, #229954 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontSize: "1rem",
                  fontWeight: "600",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(39, 174, 96, 0.3)"
                }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: "30px" }}>
                {cart.map((item, idx) => (
                  <div key={idx} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "linear-gradient(135deg, #f0f8ff 0%, #e8f4f8 100%)",
                    padding: "20px",
                    borderRadius: "12px",
                    marginBottom: "16px",
                    border: "2px solid #ecf0f1",
                    transition: "all 0.3s ease",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
                  }}>
                    <div style={{ flex: 1 }}>
                      <strong style={{ fontSize: "1.2rem", color: "#2c3e50", display: "block", marginBottom: "8px" }}>
                        {item.name}
                      </strong>
                      <span style={{ color: "#7f8c8d", fontSize: "1rem" }}>
                        ₹{item.price} × {item.quantity} = <strong style={{ color: "#27ae60" }}>₹{item.price * item.quantity}</strong>
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginLeft: "20px" }}>
                      <button 
                        onClick={() => decrementQuantity(item.id)}
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "8px",
                          border: "2px solid #27ae60",
                          background: "#fff",
                          color: "#27ae60",
                          fontSize: "1.2rem",
                          fontWeight: "700",
                          cursor: "pointer",
                          transition: "all 0.2s"
                        }}
                      >
                        −
                      </button>
                      <span style={{ fontSize: "1.1rem", fontWeight: "600", minWidth: "30px", textAlign: "center" }}>
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => incrementQuantity(item.id)}
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "8px",
                          border: "2px solid #27ae60",
                          background: "#27ae60",
                          color: "#fff",
                          fontSize: "1.2rem",
                          fontWeight: "700",
                          cursor: "pointer",
                          transition: "all 0.2s"
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ 
                borderTop: "3px solid #ecf0f1", 
                paddingTop: "30px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <h3 style={{ 
                  fontSize: "1.8rem", 
                  color: "#27ae60",
                  fontWeight: "700"
                }}>
                  Total: ₹{total.toFixed(2)}
                </h3>
                <button
                  onClick={() => navigate("/payment")}
                  style={{
                    padding: "14px 40px",
                    background: "linear-gradient(135deg, #27ae60 0%, #229954 100%)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    cursor: "pointer",
                    boxShadow: "0 6px 20px rgba(39, 174, 96, 0.3)",
                    transition: "all 0.3s ease"
                  }}
                  onMouseOver={(e) => e.target.style.transform = "translateY(-3px)"}
                  onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
                >
                  💳 Proceed to Payment
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
