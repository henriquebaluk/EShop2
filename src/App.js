import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext'; 
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import LoginRegister from './pages/LoginRegister'; 
import Cart from './pages/Cart';
import ProductList from './pages/ProductList';
import './App.css';

function App() {
  return (
    <AuthProvider> 
      <CartProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginRegister />} /> 
            <Route path="/cart" element={<Cart />} />
            <Route path="/products/:category" element={<ProductList />} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
