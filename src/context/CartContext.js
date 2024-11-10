import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const [cartItems, setCartItems] = useState([]);

  // Carrega o carrinho do "localStorage" ao montar o componente, se o usuário estiver logado
  useEffect(() => {
    if (currentUser) {
      const savedCart = localStorage.getItem(`cartItems-${currentUser.uid}`);
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      } else {
        fetchCartItems();
      }
    }
  }, [currentUser]);

  // Atualiza o "localStorage" sempre que "cartItems" mudar
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`cartItems-${currentUser.uid}`, JSON.stringify(cartItems));
    }
  }, [cartItems, currentUser]);

  // Função para buscar itens do carrinho do backend
  const fetchCartItems = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/cart/${currentUser.uid}`);
      setCartItems(response.data);
    } catch (error) {
      console.error("Erro ao buscar itens do carrinho:", error);
    }
  };

  // Adiciona um item ao carrinho
  const addToCart = async (item) => {
    if (!currentUser) {
      alert("Você precisa estar logado para adicionar itens ao carrinho.");
      return;
    }
    try {
      const response = await axios.post("http://localhost:5000/add-to-cart", { item, userId: currentUser.uid });
      setCartItems((prevItems) => [...prevItems, { ...item, firebaseId: response.data.firebaseId }]);
    } catch (error) {
      console.error("Erro ao adicionar item ao carrinho:", error);
    }
  };

  // Remove um item do carrinho e atualiza o estado e o "localStorage"
  const removeFromCart = async (firebaseId) => {
    try {
      await axios.delete(`http://localhost:5000/remove-from-cart/${firebaseId}`);
      setCartItems((prevItems) => prevItems.filter((item) => item.firebaseId !== firebaseId));
    } catch (error) {
      console.error("Erro ao remover item do carrinho:", error);
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
