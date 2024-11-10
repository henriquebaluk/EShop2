const mongoose = require("mongoose");

const connectMongoDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://engshenriquezaluk:ihWLCT2gBFYGbnqt@eshop.rmy5b.mongodb.net/eshop?retryWrites=true&w=majority&appName=Eshop");
    console.log("Conectado ao MongoDB");
  } catch (error) {
    console.error("Erro ao conectar ao MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectMongoDB;
