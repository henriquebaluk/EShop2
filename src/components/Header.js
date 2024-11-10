import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { Navbar, Nav } from "react-bootstrap";
import "./Header.css";

const Header = () => {
  const { cartItems } = useCart();
  const [expanded, setExpanded] = useState(false); 
  const navbarRef = useRef(null); 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setExpanded(false); 
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      fixed="top"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      ref={navbarRef}
    >
      <Navbar.Brand as={Link} to="/" className="brand">
        E-Shop
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="navbar-nav"
        onClick={() => setExpanded(!expanded)}
      />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ml-auto nav-links">
          <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>
            Início
          </Nav.Link>
          <Nav.Link as={Link} to="/products/celulares" onClick={() => setExpanded(false)}>
            Celulares
          </Nav.Link>
          <Nav.Link as={Link} to="/products/computadores" onClick={() => setExpanded(false)}>
            Computadores
          </Nav.Link>
          <Nav.Link as={Link} to="/products/relogios" onClick={() => setExpanded(false)}>
            Relógios
          </Nav.Link>
          <Nav.Link as={Link} to="/cart" className="cart-icon" onClick={() => setExpanded(false)}>
            <FaShoppingCart size={20} />
            {cartItems.length > 0 && (
              <span className="cart-count">{cartItems.length}</span>
            )}
          </Nav.Link>
          <Nav.Link as={Link} to="/login" className="login-icon" onClick={() => setExpanded(false)}>            <FaUserCircle size={20} />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
