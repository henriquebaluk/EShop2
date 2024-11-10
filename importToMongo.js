require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./src/models/Product");
const fs = require("fs");
const path = require("path");

// Conectar ao MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Conectado ao MongoDB!");
    })
    .catch((error) => {
        console.error("Erro ao conectar ao MongoDB:", error);
    });

// Ler o arquivo JSON exportado
const dataPath = path.join(__dirname, "exportedProducts.json");
let products = [];

try {
    const rawData = fs.readFileSync(dataPath);
    products = JSON.parse(rawData);
} catch (error) {
    console.error("Erro ao ler o arquivo JSON:", error);
    process.exit(1); 
}

// Função para importar produtos
const importProducts = async () => {
    try {
        await Product.insertMany(products);
        console.log("Produtos importados com sucesso!");
    } catch (error) {
        console.error("Erro ao importar produtos:", error);
    } finally {
        mongoose.connection.close();
    }
};


importProducts();
