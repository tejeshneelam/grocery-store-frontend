import React from 'react';
import Navbar from '../components/Navbar';

const Donate = () => {
  return (
    <>
      <Navbar />
      <div style={{
        background: "linear-gradient(135deg, #ecf0f1 0%, #bdc3c7 100%)",
        minHeight: "100vh",
        padding: "60px 20px"
      }}>
        <div style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "#fff",
          padding: "50px",
          borderRadius: "16px",
          boxShadow: "0 12px 40px rgba(0,0,0,0.15)"
        }}>
          <h1 style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "#27ae60",
            marginBottom: "20px",
            textAlign: "center"
          }}>
            ❤️ Support IN & OUT
          </h1>

          <p style={{
            fontSize: "1.2rem",
            color: "#7f8c8d",
            textAlign: "center",
            marginBottom: "40px",
            lineHeight: "1.6"
          }}>
            Thank you for considering a donation. Your support helps us grow and serve our community better. Every contribution makes a difference!
          </p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            marginBottom: "40px"
          }}>
            {[
              { amount: "₹100", description: "Feeds 5 families" },
              { amount: "₹500", description: "Weekly supplies for 20 people" },
              { amount: "₹1000", description: "Monthly groceries for a family" },
              { amount: "₹5000", description: "Support entire community" }
            ].map((option, idx) => (
              <button
                key={idx}
                style={{
                  padding: "30px",
                  background: "linear-gradient(135deg, #27ae60 0%, #229954 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "12px",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  textAlign: "center"
                }}
                onMouseOver={(e) => e.target.style.transform = "translateY(-5px)"}
                onMouseOut={(e) => e.target.style.transform = "translateY(0)"}
              >
                <p style={{ fontSize: "2rem", fontWeight: "700", margin: "0 0 10px 0" }}>
                  {option.amount}
                </p>
                <p style={{ margin: 0, fontSize: "0.95rem", opacity: "0.9" }}>
                  {option.description}
                </p>
              </button>
            ))}
          </div>

          <div style={{
            background: "#f0f8ff",
            padding: "30px",
            borderRadius: "12px",
            border: "2px solid #ecf0f1",
            marginBottom: "30px"
          }}>
            <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>💡 Why Donate?</h2>
            <ul style={{
              listStyle: "none",
              padding: 0,
              margin: 0
            }}>
              {[
                "Support affordable grocery access",
                "Help build sustainable communities",
                "Ensure fresh produce for all",
                "Create sustainable jobs"
              ].map((reason, idx) => (
                <li key={idx} style={{
                  padding: "12px 0",
                  borderBottom: idx < 3 ? "1px solid #ecf0f1" : "none",
                  color: "#2c3e50",
                  fontSize: "1.05rem"
                }}>
                  ✅ {reason}
                </li>
              ))}
            </ul>
          </div>

          <div style={{
            background: "linear-gradient(135deg, #27ae60 0%, #229954 100%)",
            color: "#fff",
            padding: "30px",
            borderRadius: "12px",
            textAlign: "center"
          }}>
            <h3 style={{ marginTop: 0, marginBottom: "15px" }}>📞 Contact Us</h3>
            <p style={{ margin: "10px 0" }}>Email: donate@inandout.com</p>
            <p style={{ margin: "10px 0" }}>Phone: +91 XXXX-XXXX-XXXX</p>
            <p style={{ margin: "10px 0", fontSize: "0.95rem", opacity: "0.9" }}>
              Every rupee counts towards our mission
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Donate;
