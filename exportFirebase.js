require("dotenv").config();
const admin = require("firebase-admin");
const fs = require("fs");

// Inicialize o Firebase Admin SDK
const serviceAccount = require("./firebase-adminsdk.json"); 

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Função para exportar dados da coleção "produtos"
const exportData = async () => {
  try {
    const productsSnapshot = await db.collection("produtos").get();
    const products = [];

    productsSnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });

    // Salva os dados em um arquivo JSON
    fs.writeFileSync("exportedProducts.json", JSON.stringify(products, null, 2));
    console.log("Exportação concluída! Dados salvos em exportedProducts.json");
  } catch (error) {
    console.error("Erro ao exportar dados do Firebase:", error);
  }
};

exportData();
