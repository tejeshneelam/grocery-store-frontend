import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async () => {
    if (!form.name || !form.email || !form.password || !form.confirmPassword) {
      alert("All fields are required");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (form.password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      await axios.post("/api/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password
      });

      alert("Registered successfully. Please login.");
      navigate("/login");

    } catch (err) {
      console.log("Signup error:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={{ fontSize: "2rem", color: "#27ae60", marginBottom: "10px" }}>
            📝 Create Account
          </h1>
          <p style={{ color: "#7f8c8d" }}>Join IN & OUT today</p>
        </div>

        <input
          style={styles.input}
          placeholder="Full Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          style={styles.input}
          placeholder="Email Address"
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
        />

        <button
          style={{
            ...styles.button,
            background: loading ? "#95a5a6" : "linear-gradient(135deg, #27ae60 0%, #229954 100%)"
          }}
          onClick={submit}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <div style={styles.divider}></div>

        <p style={styles.linkText}>
          Already have an account? <Link to="/login" style={styles.link}>Login</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "linear-gradient(135deg, #27ae60 0%, #229954 100%)",
    padding: "20px"
  },
  card: {
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 12px 40px rgba(0, 0, 0, 0.2)",
    width: "100%",
    maxWidth: "400px",
    background: "#ffffff"
  },
  header: {
    textAlign: "center",
    marginBottom: "30px"
  },
  input: {
    width: "100%",
    padding: "14px",
    margin: "12px 0",
    borderRadius: "8px",
    border: "2px solid #ecf0f1",
    fontSize: "1rem",
    fontFamily: "Poppins, sans-serif",
    transition: "all 0.3s ease",
    boxSizing: "border-box"
  },
  button: {
    width: "100%",
    padding: "14px",
    marginTop: "20px",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "1rem",
    transition: "all 0.3s ease",
    fontFamily: "Poppins, sans-serif"
  },
  divider: {
    height: "1px",
    background: "#ecf0f1",
    margin: "20px 0"
  },
  linkText: {
    textAlign: "center",
    color: "#7f8c8d",
    fontSize: "0.95rem",
    marginTop: "15px"
  },
  link: {
    color: "#27ae60",
    textDecoration: "none",
    fontWeight: "700",
    cursor: "pointer",
    transition: "color 0.3s ease"
  }
};