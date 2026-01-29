import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import '../styles/ProductCard.css';
import React from 'react';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    addToCart({ ...product, id: product._id }, quantity);
    alert(`${product.name} added to cart 🛒`);
  };

  return (
    <div className="product-card">
      <img 
        src={product.image || "/images/img1.jpeg"} 
        alt={product.name} 
      />

      <h4>{product.name}</h4>

      <p style={{ color: "#27ae60", fontWeight: "600" }}>
        ₹{product.price}
      </p>

      <p style={{ fontSize: "0.85rem", color: "#7f8c8d" }}>
        Stock: {product.quantity}
      </p>

      <input
        type="number"
        value={quantity}
        min="1"
        max={product.quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />

      <div style={{ marginBottom: "12px" }}>
        <button onClick={handleAdd}>
          🛒 Add to Cart
        </button>
        <button style={{ marginLeft: "4px" }}>
          ❤️
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
