import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [activeTab, setActiveTab] = useState("dashboard");

  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    image: "",
    category: ""
  });

  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    const res = await axios.get("/api/admin/orders", {
      headers: { Authorization: token }
    });
    setOrders(res.data);

    const total = res.data.reduce(
      (sum, o) => sum + o.totalAmount,
      0
    );
    setTotalRevenue(total);
  };

  const fetchProducts = async () => {
    const res = await axios.get("/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchOrders();
    fetchProducts();
  }, [fetchOrders, fetchProducts]);

  const addProduct = async () => {
    if (!form.name || !form.price || !form.quantity || !form.category) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "/api/admin/add-product",
        form,
        { headers: { Authorization: token } }
      );
      alert("Product added successfully");
      setForm({ name: "", price: "", quantity: "", image: "", category: "" });
      fetchProducts();
    } catch (err) {
      alert("Failed to add product");
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(
          `/api/admin/delete-product/${id}`,
          { headers: { Authorization: token } }
        );
        alert("Product deleted");
        fetchProducts();
      } catch (err) {
        alert("Failed to delete product");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div style={{
        background: "linear-gradient(135deg, #ecf0f1 0%, #bdc3c7 100%)",
        minHeight: "100vh",
        padding: "40px 20px"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h1 style={{
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "#2c3e50",
            marginBottom: "30px",
            textAlign: "center"
          }}>
            Admin Dashboard
          </h1>

          <div style={{
            display: "flex",
            gap: "12px",
            marginBottom: "30px",
            justifyContent: "center",
            flexWrap: "wrap"
          }}>
            {["dashboard", "orders", "products"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "12px 24px",
                  background: activeTab === tab 
                    ? "linear-gradient(135deg, #27ae60 0%, #229954 100%)" 
                    : "#ecf0f1",
                  color: activeTab === tab ? "#fff" : "#2c3e50",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "700",
                  textTransform: "capitalize",
                  transition: "all 0.3s ease"
                }}
              >
                {tab === "dashboard" ? "Dashboard" : tab === "orders" ? "Orders" : "🛒 Products"}
              </button>
            ))}
          </div>

          {/* DASHBOARD TAB */}
          {activeTab === "dashboard" && (
            <div style={{
              background: "#fff",
              padding: "40px",
              borderRadius: "16px",
              boxShadow: "0 12px 40px rgba(0,0,0,0.15)"
            }}>
              <div style={{
                background: "linear-gradient(135deg, #27ae60 0%, #229954 100%)",
                color: "#fff",
                padding: "40px",
                borderRadius: "12px",
                textAlign: "center",
                marginBottom: "30px"
              }}>
                <h2 style={{ fontSize: "2rem", marginBottom: "10px" }}>💰 Total Revenue</h2>
                <p style={{ fontSize: "2.5rem", fontWeight: "700" }}>₹{totalRevenue.toFixed(2)}</p>
              </div>

              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "20px"
              }}>
                <div style={{
                  background: "#e74c3c",
                  color: "#fff",
                  padding: "20px",
                  borderRadius: "12px",
                  textAlign: "center"
                }}>
                  <p style={{ fontSize: "1.2rem", marginBottom: "10px" }}>📦 Total Orders</p>
                  <p style={{ fontSize: "2rem", fontWeight: "700" }}>{orders.length}</p>
                </div>

                <div style={{
                  background: "#3498db",
                  color: "#fff",
                  padding: "20px",
                  borderRadius: "12px",
                  textAlign: "center"
                }}>
                  <p style={{ fontSize: "1.2rem", marginBottom: "10px" }}>🛒 Total Products</p>
                  <p style={{ fontSize: "2rem", fontWeight: "700" }}>{products.length}</p>
                </div>
              </div>
            </div>
          )}

          {/* ORDERS TAB */}
          {activeTab === "orders" && (
            <div>
              <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>📦 Recent Orders</h2>
              <div style={{
                display: "grid",
                gap: "20px"
              }}>
                {orders.length === 0 ? (
                  <div style={{
                    background: "#fff",
                    padding: "40px",
                    borderRadius: "12px",
                    textAlign: "center",
                    color: "#7f8c8d"
                  }}>
                    No orders yet
                  </div>
                ) : (
                  orders.map((order, index) => (
                    <div
                      key={index}
                      style={{
                        background: "#fff",
                        padding: "20px",
                        borderRadius: "12px",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        border: "2px solid #ecf0f1"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                        <p><strong>User:</strong> {order.userEmail}</p>
                        <p><strong>💰 Total:</strong> ₹{order.totalAmount}</p>
                      </div>
                      <p style={{ fontWeight: "700", marginBottom: "10px", color: "#27ae60" }}>Items:</p>
                      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                        {order.items.map((item, i) => (
                          <li key={i} style={{ padding: "8px", background: "#f8f9fa", marginBottom: "8px", borderRadius: "6px" }}>
                            {item.name} × {item.quantity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* PRODUCTS TAB */}
          {activeTab === "products" && (
            <div>
              <div style={{
                background: "#fff",
                padding: "30px",
                borderRadius: "16px",
                boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                marginBottom: "30px"
              }}>
                <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>➕ Add New Product</h2>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
                  <input
                    placeholder="Product Name"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    style={inputStyle}
                  />

                  <input
                    placeholder="Price"
                    type="number"
                    value={form.price}
                    onChange={e => setForm({ ...form, price: e.target.value })}
                    style={inputStyle}
                  />

                  <input
                    placeholder="Quantity"
                    type="number"
                    value={form.quantity}
                    onChange={e => setForm({ ...form, quantity: e.target.value })}
                    style={inputStyle}
                  />

                  <select
                    value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    style={inputStyle}
                  >
                    <option value="">Select Category</option>
                    <option value="fruits">🍎 Fruits</option>
                    <option value="vegetables">🥬 Vegetables</option>
                    <option value="dairy">🥛 Dairy</option>
                    <option value="dryfruits">🥜 Dry Fruits</option>
                  </select>

                  <input
                    placeholder="Image URL"
                    value={form.image}
                    onChange={e => setForm({ ...form, image: e.target.value })}
                    style={{ ...inputStyle, gridColumn: "1 / -1" }}
                  />
                </div>

                <button
                  onClick={addProduct}
                  style={{
                    width: "100%",
                    padding: "14px",
                    marginTop: "15px",
                    background: "linear-gradient(135deg, #27ae60 0%, #229954 100%)",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    fontWeight: "700",
                    fontSize: "1rem",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                >
                  Add Product
                </button>
              </div>

              <h2 style={{ color: "#2c3e50", marginBottom: "20px" }}>📋 Product List</h2>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "20px"
              }}>
                {products.map((p) => (
                  <div
                    key={p._id}
                    style={{
                      background: "#fff",
                      padding: "20px",
                      borderRadius: "12px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      border: "2px solid #ecf0f1",
                      transition: "all 0.3s ease"
                    }}
                  >
                    {p.image && (
                      <img
                        src={p.image}
                        alt={p.name}
                        style={{
                          width: "100%",
                          height: "150px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          marginBottom: "12px"
                        }}
                      />
                    )}
                    <h3 style={{ color: "#2c3e50", marginBottom: "10px" }}>{p.name}</h3>
                    <p style={{ color: "#7f8c8d", marginBottom: "8px" }}>💰 Price: ₹{p.price}</p>
                    <p style={{ color: "#7f8c8d", marginBottom: "8px" }}>📦 Qty: {p.quantity}</p>
                    <p style={{ color: "#27ae60", fontWeight: "700", marginBottom: "15px" }}>Category: {p.category}</p>

                    <button
                      onClick={() => deleteProduct(p._id)}
                      style={{
                        width: "100%",
                        padding: "10px",
                        background: "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)",
                        color: "#fff",
                        border: "none",
                        borderRadius: "8px",
                        fontWeight: "700",
                        cursor: "pointer",
                        transition: "all 0.3s ease"
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "2px solid #ecf0f1",
  fontSize: "1rem",
  fontFamily: "Poppins, sans-serif",
  transition: "all 0.3s ease"
};
