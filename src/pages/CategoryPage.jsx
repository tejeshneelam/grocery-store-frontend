import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import axios from "axios";

const CategoryPage = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        const filtered = res.data.filter(p => p.category === name);
        setProducts(filtered);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [name]);

  const getCategoryEmoji = (category) => {
    const emojiMap = {
      fruits: "🍎",
      vegetables: "🥬",
      dairy: "🥛",
      dryfruits: "🥜"
    };
    return emojiMap[category] || "🛍️";
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
          <h2 style={{ 
            textTransform: "capitalize",
            fontSize: "2.5rem",
            fontWeight: "700",
            color: "#2c3e50",
            marginBottom: "40px",
            display: "flex",
            alignItems: "center",
            gap: "15px"
          }}>
            {getCategoryEmoji(name)} {name} Products
          </h2>

          {loading ? (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <p style={{ fontSize: "1.2rem", color: "#7f8c8d" }}>Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <p style={{ fontSize: "1.2rem", color: "#7f8c8d" }}>No products found in this category</p>
            </div>
          ) : (
            <div style={{ 
              display: "flex", 
              flexWrap: "wrap", 
              gap: "30px",
              justifyContent: "center"
            }}>
              {products.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
