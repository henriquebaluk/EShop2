import React from "react";
import { useCart } from "../context/CartContext";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./Cart.css";

const Cart = () => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <Container className="cart-container">
      <h2 className="my-4">Carrinho de Compras</h2>
      {cartItems.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <Row className="cart-items-container">
          {cartItems.map((item) => (
            <Col key={item.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <div className="cart-item p-3 text-center">
                <img src={item.imageUrl} alt={item.name} className="img-fluid" />
                <div className="cart-item-details mt-3">
                  <h5 className="cart-item-name">{item.name}</h5>
                  <p className="cart-item-price">R$ {item.price.toFixed(2)}</p>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remover
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Cart;
