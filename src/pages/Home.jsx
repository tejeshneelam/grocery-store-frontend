import Navbar from "../components/Navbar";
import React from 'react';
import ImageSlider from "../components/Slider";
import CategoryCard from "../components/CategoryCard";

const categories = [
  { title: "Fruits", slug: "fruits", image: "/images/img1.jpeg" },
  { title: "Vegetables", slug: "vegetables", image: "/images/img5.jpeg" },
  { title: "Dairy", slug: "dairy", image: "/images/img7.jpeg" },
  { title: "Dry Fruits", slug: "dryfruits", image: "/images/img1.jpeg" },
];

const Home = () => {
  return (
    <>
      <Navbar />
      
      <div className="slider-wrapper" style={{ padding: "20px 40px" }}>
        <ImageSlider />
      </div>
      
      <div style={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        padding: "60px 20px",
      }}>
        <h2 style={{
          textAlign: "center",
          fontSize: "2.5rem",
          fontWeight: "700",
          color: "#2c3e50",
          marginBottom: "50px",
          letterSpacing: "1px"
        }}>
          🛒 Shop by Category
        </h2>
        
        <div className="category-wrapper">
          <div className="container">
            {categories.map((cat, index) => (
              <CategoryCard 
                key={index} 
                title={cat.title}
                slug={cat.slug}
                image={cat.image}
              />
            ))}
          </div>
        </div>
      </div>

      <div style={{
        background: "#27ae60",
        color: "#fff",
        padding: "60px 20px",
        textAlign: "center",
        marginTop: "40px"
      }}>
        <h3 style={{ fontSize: "1.8rem", marginBottom: "20px", fontWeight: "700" }}>
          Why Choose IN & OUT?
        </h3>
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          gap: "40px",
          flexWrap: "wrap",
          maxWidth: "1200px",
          margin: "0 auto"
        }}>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <h4 style={{ fontSize: "1.3rem", marginBottom: "10px" }}>Free Delivery</h4>
            <p>On orders above ₹500</p>
          </div>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <h4 style={{ fontSize: "1.3rem", marginBottom: "10px" }}>Fresh Products</h4>
            <p>100% organic & fresh</p>
          </div>
          <div style={{ flex: 1, minWidth: "250px" }}>
            <h4 style={{ fontSize: "1.3rem", marginBottom: "10px" }}>Best Prices</h4>
            <p>Competitive pricing guaranteed</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
