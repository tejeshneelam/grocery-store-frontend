import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import '../styles/ProductCard.css';
import React from 'react'; // ✅ Required for JSX to work

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);

  const handleAdd = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="card" style={{
      width: "200px",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      textAlign: "center",
      boxShadow: "2px 2px 5px rgba(0,0,0,0.1)"
    }}>
      <img src={product.image} alt={product.name} style={{ width: "100%", height: "150px", objectFit: "cover" }} />
      <h4>{product.name}</h4>
      <p>
        <strike>₹{product.price}</strike> <strong>₹{product.discount}</strong>
      </p>
      <input
        type="number"
        value={quantity}
        min="1"
        onChange={(e) => setQuantity(parseInt(e.target.value))}
        style={{ width: "50px", marginRight: "10px" }}
      />
      <button onClick={handleAdd} style={{ marginRight: "10px" }}>Add to Cart</button>
      <button>❤️</button>
    </div>
  );
};

export default ProductCard;
