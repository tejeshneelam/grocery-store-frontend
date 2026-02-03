import axios from "axios";
import Navbar from "../components/Navbar";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Payment() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [qrCode, setQrCode] = useState(null);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "/api/order/place",
        {
          items: cart,
          totalAmount
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      console.log("===== SECURE ORDER DATA =====");
      console.log("Order ID:", res.data.orderId);
      console.log("Encrypted Order:", res.data.encryptedOrder);
      console.log("Digital Signature:", res.data.signature);
      console.log("QR Code:", res.data.qr);

      // Set QR code for display
      setQrCode(res.data.qr);

      alert("✅ Order placed securely!");
      if (clearCart) clearCart();
      // Don't navigate immediately, show QR first

    } catch (err) {
      console.log("Payment error:", err);
      alert("❌ Payment failed");
    }
  };

  return (
    <>
      <Navbar />
      <div style={{
        background: "linear-gradient(135deg, #ecf0f1 0%, #bdc3c7 100%)",
        minHeight: "100vh",
        padding: "60px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <div style={{
          background: "#fff",
          padding: "40px",
          borderRadius: "16px",
          boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
          maxWidth: "500px",
          width: "100%"
        }}>
          <h2 style={{
            fontSize: "2rem",
            fontWeight: "700",
            color: "#2c3e50",
            marginBottom: "10px",
            textAlign: "center"
          }}>
            💳 Secure Payment
          </h2>

          <p style={{
            textAlign: "center",
            color: "#7f8c8d",
            marginBottom: "30px",
            fontSize: "0.95rem"
          }}>
            Your payment is secured with encryption
          </p>

          <div style={{
            background: "linear-gradient(135deg, #f0f8ff 0%, #e8f4f8 100%)",
            padding: "20px",
            borderRadius: "12px",
            marginBottom: "30px",
            border: "2px solid #ecf0f1"
          }}>
            <h3 style={{ color: "#2c3e50", marginBottom: "15px" }}>📦 Order Summary</h3>

            {cart.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                  paddingBottom: "10px",
                  borderBottom: "1px solid #ecf0f1"
                }}
              >
                <span style={{ color: "#2c3e50", fontWeight: "500" }}>
                  {item.name} × {item.quantity}
                </span>
                <span style={{ color: "#27ae60", fontWeight: "700" }}>
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "15px",
              paddingTop: "15px",
              borderTop: "2px solid #27ae60"
            }}>
              <strong style={{ fontSize: "1.2rem", color: "#2c3e50" }}>Total Amount</strong>
              <strong style={{ fontSize: "1.5rem", color: "#27ae60" }}>₹{totalAmount.toFixed(2)}</strong>
            </div>
          </div>

          <button
            onClick={placeOrder}
            style={{
              width: "100%",
              padding: "16px",
              background: "linear-gradient(135deg, #27ae60 0%, #229954 100%)",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              fontSize: "1.1rem",
              fontWeight: "700",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 6px 20px rgba(39, 174, 96, 0.3)",
              marginBottom: "12px"
            }}
            onMouseOver={(e) => e.target.style.transform = "translateY(-3px)"}
            onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
          >
            ✅ Confirm & Pay Securely
          </button>

          <button
            onClick={() => navigate("/cart")}
            style={{
              width: "100%",
              padding: "12px",
              background: "#ecf0f1",
              color: "#2c3e50",
              border: "none",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.3s ease"
            }}
          >
            ← Back to Cart
          </button>

          {qrCode && (
            <div style={{
              marginTop: "20px",
              padding: "20px",
              background: "#e8f4f8",
              borderRadius: "12px",
              border: "2px solid #27ae60",
              textAlign: "center"
            }}>
              <h3 style={{ color: "#27ae60", marginBottom: "15px" }}>🎫 Order QR Code</h3>
              <img
                src={qrCode}
                alt="Order QR Code"
                style={{
                  maxWidth: "200px",
                  border: "3px solid #27ae60",
                  borderRadius: "8px"
                }}
              />
              <p style={{ marginTop: "10px", color: "#2c3e50", fontSize: "0.9rem" }}>
                📱 Scan this QR code to verify your order
              </p>
              <button
                onClick={() => navigate("/")}
                style={{
                  marginTop: "15px",
                  padding: "10px 20px",
                  background: "#27ae60",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "600"
                }}
              >
                Continue Shopping
              </button>
            </div>
          )}

          <div style={{
            marginTop: "20px",
            padding: "15px",
            background: "#e8f4f8",
            borderRadius: "8px",
            borderLeft: "4px solid #27ae60"
          }}>
            <p style={{ margin: 0, color: "#27ae60", fontSize: "0.9rem", fontWeight: "600" }}>
              🔐 Your payment data is encrypted and secured
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
