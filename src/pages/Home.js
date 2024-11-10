import React from "react";
import { Carousel } from "react-bootstrap";
import "./Home.css"; 
import ProductList from "./ProductList"; 
const Home = () => {
  return (
    <div className="home-container">
      <div className="carousel-container">
        <Carousel fade interval={3000} className="carousel-fullscreen">
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src="https://i.imgur.com/P6hqeZ8.jpeg"
              alt="Imagem 1"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src="https://i.imgur.com/2FQF3OK.jpeg"
              alt="Imagem 2"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 carousel-image"
              src="https://i.imgur.com/nSCWgnH.jpeg"
              alt="Imagem 3"
            />
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="products-section">
        <ProductList /> 
      </div>
    </div>
  );
};

export default Home;
