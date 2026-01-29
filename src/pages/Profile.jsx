import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Profile() {
  const token = localStorage.getItem("token");
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    photo: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get("/api/auth/me", {
          headers: { Authorization: token }
        });
        setUser(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error loading profile:", err);
        setLoading(false);
      }
    };
    load();
  }, [token]);

  const save = async () => {
    try {
      const res = await axios.put("/api/auth/me", user, {
        headers: { Authorization: token }
      });
      alert("✅ Profile Updated Successfully");
      localStorage.setItem("name", res.data.name);
      setUser(res.data);
      setIsEditing(false);
    } catch (err) {
      alert("❌ Failed to update profile");
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
          {loading ? (
            <p style={{ textAlign: "center", color: "#7f8c8d" }}>Loading profile...</p>
          ) : (
            <>
              <h2 style={{
                fontSize: "2rem",
                fontWeight: "700",
                color: "#2c3e50",
                marginBottom: "30px",
                textAlign: "center"
              }}>
                My Profile
              </h2>

              {user.photo && (
                <div style={{ textAlign: "center", marginBottom: "30px" }}>
                  <img
                    src={user.photo}
                    alt="profile"
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "4px solid #27ae60",
                      boxShadow: "0 4px 12px rgba(39, 174, 96, 0.3)"
                    }}
                  />
                </div>
              )}

              <div style={{ marginBottom: "20px" }}>
                <label style={{ color: "#7f8c8d", fontSize: "0.9rem", fontWeight: "600" }}>
                  Full Name
                </label>
                <input
                  placeholder="Name"
                  value={user.name}
                  onChange={e => setUser({ ...user, name: e.target.value })}
                  disabled={!isEditing}
                  style={inputStyle(isEditing)}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ color: "#7f8c8d", fontSize: "0.9rem", fontWeight: "600" }}>
                  Email Address
                </label>
                <input
                  placeholder="Email"
                  value={user.email}
                  disabled
                  style={inputStyle(false)}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ color: "#7f8c8d", fontSize: "0.9rem", fontWeight: "600" }}>
                  Phone Number
                </label>
                <input
                  placeholder="Phone"
                  value={user.phone || ""}
                  onChange={e => setUser({ ...user, phone: e.target.value })}
                  disabled={!isEditing}
                  style={inputStyle(isEditing)}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ color: "#7f8c8d", fontSize: "0.9rem", fontWeight: "600" }}>
                  Address
                </label>
                <textarea
                  placeholder="Address"
                  value={user.address || ""}
                  onChange={e => setUser({ ...user, address: e.target.value })}
                  disabled={!isEditing}
                  style={{
                    ...inputStyle(isEditing),
                    resize: "vertical",
                    minHeight: "80px",
                    fontFamily: "Poppins, sans-serif"
                  }}
                />
              </div>

              <div style={{ marginBottom: "30px" }}>
                <label style={{ color: "#7f8c8d", fontSize: "0.9rem", fontWeight: "600" }}>
                  Photo URL
                </label>
                <input
                  placeholder="Photo URL"
                  value={user.photo || ""}
                  onChange={e => setUser({ ...user, photo: e.target.value })}
                  disabled={!isEditing}
                  style={inputStyle(isEditing)}
                />
              </div>

              {isEditing ? (
                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    onClick={save}
                    style={{
                      flex: 1,
                      padding: "14px",
                      background: "linear-gradient(135deg, #27ae60 0%, #229954 100%)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "700",
                      cursor: "pointer",
                      transition: "all 0.3s ease"
                    }}
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    style={{
                      flex: 1,
                      padding: "14px",
                      background: "#ecf0f1",
                      color: "#2c3e50",
                      border: "none",
                      borderRadius: "8px",
                      fontWeight: "700",
                      cursor: "pointer",
                      transition: "all 0.3s ease"
                    }}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  style={{
                    width: "100%",
                    padding: "14px",
                    background: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "700",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                >
                  ✏️ Edit Profile
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

const inputStyle = (isEditing) => ({
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: isEditing ? "2px solid #27ae60" : "2px solid #ecf0f1",
  fontSize: "1rem",
  fontFamily: "Poppins, sans-serif",
  backgroundColor: isEditing ? "#fff" : "#f8f9fa",
  color: isEditing ? "#2c3e50" : "#95a5a6",
  cursor: isEditing ? "text" : "default",
  transition: "all 0.3s ease",
  marginTop: "8px"
});
