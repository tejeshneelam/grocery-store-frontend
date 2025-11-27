import { useNavigate } from "react-router-dom";
import '../styles/Category.css';
import React from 'react'; // ✅ Required for JSX to work

const CategoryCard = ({ title, image }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to a category page (you can customize this as needed)
    navigate(`/category/${title.toLowerCase()}`);
  };

  return (
    <div className="category-box" onClick={handleClick}>
      <img src={image} alt={title} className="category-image" />
      <div className="category-title">{title}</div>
    </div>
  );
};

export default CategoryCard;
