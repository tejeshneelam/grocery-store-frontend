import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import productsData from "../data/products";

const CategoryPage = () => {
  const { name } = useParams();
  const normalizedName = name.toLowerCase();
  const categoryProducts = productsData[normalizedName] || [];

  return (
    <>
      <Navbar />
      <div style={{ padding: "40px 20px", maxWidth: "1200px", margin: "0 auto" }}>
        <h2 style={{
          textAlign: "center",
          fontSize: "2rem",
          marginBottom: "30px",
          textTransform: "capitalize"
        }}>
          🛒 {name} Items
        </h2>

        {categoryProducts.length === 0 ? (
          <p style={{ textAlign: "center" }}>No items found for {name}</p>
        ) : (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "30px",
              justifyContent: "center",
            }}
          >
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryPage;
