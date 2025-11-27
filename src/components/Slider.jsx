import React, { useState, useEffect } from 'react';
import '../styles/Slider.css';

const images = [
  '/images/slider1.jpg',
  '/images/slider2.avif',
  '/images/slider3.jpeg'
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="slider-container">
      <img
        src={images[current]}
        alt={`Slide ${current}`}
        className="slider-image"
      />
      <div className="slider-dots">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`slider-dot ${current === idx ? 'active' : ''}`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
