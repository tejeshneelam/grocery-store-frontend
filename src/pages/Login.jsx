import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [otp, setOtp] = useState("");
  const [stage, setStage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("/api/auth/login", { email, password, role });

      // If server returned a token (admin immediate login), finish login immediately
      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("email", res.data.email);

        const profile = await axios.get("/api/auth/me", {
          headers: { Authorization: res.data.token }
        });
        localStorage.setItem("name", profile.data.name);

        navigate("/");
        return;
      }

      alert("OTP sent to your email");
      setStage(2);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const verify = async () => {
    if (!otp) {
      alert("Enter OTP");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("/api/auth/verify-otp", { email, otp });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("email", res.data.email);

      const profile = await axios.get("/api/auth/me", {
        headers: { Authorization: res.data.token }
      });
      localStorage.setItem("name", profile.data.name);

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {stage === 1 ? (
          <>
            <div style={styles.header}>
              <h1 style={{ fontSize: "2rem", color: "#27ae60", marginBottom: "10px" }}>
                🔓 IN & OUT Login
              </h1>
              <p style={{ color: "#7f8c8d" }}>Welcome back to your grocery store</p>
            </div>

            <input
              style={styles.input}
              placeholder="Email Address"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <div style={{ display: "flex", gap: "12px", marginTop: "8px", alignItems: "center" }}>
              <label style={{ color: "#7f8c8d", fontSize: "0.95rem" }}>Sign in as:</label>
              <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <input type="radio" name="role" value="user" checked={role === "user"} onChange={() => setRole("user")} /> User
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <input type="radio" name="role" value="admin" checked={role === "admin"} onChange={() => setRole("admin")} /> Admin
              </label>
            </div>
            <button
              style={{
                ...styles.button,
                background: loading ? "#95a5a6" : "linear-gradient(135deg, #27ae60 0%, #229954 100%)"
              }}
              onClick={login}
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Login"}
            </button>

            <div style={styles.divider}></div>

            <p style={styles.linkText}>
              Don't have an account? <Link to="/signup" style={styles.link}>Sign Up</Link>
            </p>
          </>
        ) : (
          <>
            <div style={styles.header}>
              <h1 style={{ fontSize: "2rem", color: "#27ae60", marginBottom: "10px" }}>
                Verify OTP
              </h1>
              <p style={{ color: "#7f8c8d" }}>Enter the OTP sent to {email}</p>
            </div>

            <input
              style={styles.input}
              placeholder="Enter 6-digit OTP"
              type="text"
              maxLength="6"
              value={otp}
              onChange={e => setOtp(e.target.value)}
            />
            <button
              style={{
                ...styles.button,
                background: loading ? "#95a5a6" : "linear-gradient(135deg, #27ae60 0%, #229954 100%)"
              }}
              onClick={verify}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button
              onClick={() => setStage(1)}
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "12px",
                background: "#ecf0f1",
                color: "#2c3e50",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
                transition: "all 0.3s ease"
              }}
            >
              Back to Login
            </button>
          </>
        )}
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