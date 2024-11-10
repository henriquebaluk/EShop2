import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import "./ProductList.css";

const ProductList = () => {
  const { category } = useParams();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, "produtos");
      const q = category ? query(productsCollection, where("category", "==", category)) : productsCollection;
      const querySnapshot = await getDocs(q);
      setProducts(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchProducts();
  }, [category]);

  return (
    <Container className="product-list-container mt-5">
      <Row className="product-cards-container">
        {products.map(product => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="h-100">
              <Card.Img 
                variant="top" 
                src={product.imageUrl} 
                alt={product.name} 
                className="product-image" 
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title>{product.name}</Card.Title>
                <Card.Text className="product-description">
                  {product.description}
                </Card.Text>
                <Card.Text className="price">
                  R$ {Number(product.price).toFixed(2)}
                </Card.Text>
                <Button 
                  variant="primary" 
                  onClick={() => addToCart(product)} 
                  className="mt-auto"
                >
                  Adicionar ao Carrinho
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductList;
