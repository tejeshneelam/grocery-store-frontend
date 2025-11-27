import Navbar from "../components/Navbar";
import React from 'react';
import ImageSlider from "../components/Slider";
import CategoryCard from "../components/CategoryCard";

const categories = [
  { title: "Fruits", image: "/images/img1.jpeg" },
  { title: "Vegetables", image: "/images/img5.jpeg" },
  { title: "Dairy", image: "/images/img7.jpeg" },
  { title: "Fruits", image: "/images/img1.jpeg" },
  { title: "Vegetables", image: "/images/img5.jpeg" },
  { title: "Dairy", image: "/images/img7.jpeg" },
];

const Home = () => {
  return (
    <>
      <Navbar />
      
      <div className="slider-wrapper">
        <ImageSlider />
      </div>
      
      <div className="category-wrapper">
        <div className="container">
          {categories.map((cat, index) => (
            <CategoryCard key={index} {...cat} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
