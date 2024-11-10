
require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectMongoDB = require("./mongo");
const Product = require("./src/models/Product");
const CartItem = require("./src/models/CartItem");

const app = express();

// Conectar ao MongoDB
connectMongoDB();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Middleware de sessão
app.use((req, res, next) => {
  if (!req.cookies.session) {
    res.cookie("session", "novaSessao", { httpOnly: true });
  }
  next();
});

// Rotas para produtos
app.get("/products/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const products = await Product.find({ category });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar produtos", error });
  }
});

// Adicionar um item ao carrinho
app.post("/add-to-cart", async (req, res) => {
  const { item, userId } = req.body;

  if (!item || !userId) {
    return res.status(400).json({ message: "Item e userId são obrigatórios" });
  }

  try {
    const newItem = new CartItem({ ...item, userId, firebaseId: item.id });
    await newItem.save();
    res.status(200).json({ message: "Item adicionado ao carrinho!", firebaseId: item.id });
  } catch (error) {
    res.status(500).json({ message: "Erro ao adicionar item ao carrinho", error: error.message });
  }
});

// Listar itens do carrinho para um usuário
app.get("/cart/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const cartItems = await CartItem.find({ userId });
    res.status(200).json(cartItems);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar itens do carrinho", error });
  }
});

// Remover um item do carrinho com firebaseId
app.delete("/remove-from-cart/:firebaseId", async (req, res) => {
  const { firebaseId } = req.params;
  try {
    const deletedItem = await CartItem.findOneAndDelete({ firebaseId });
    if (deletedItem) {
      res.status(200).json({ message: "Item removido do carrinho!", firebaseId });
    } else {
      res.status(404).json({ message: "Item não encontrado no carrinho." });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao remover item do carrinho", error });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
