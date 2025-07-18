import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import path from "path";
import productRoutes from "./routes/product.route.js";

dotenv.config();// Load environment variables from .env file

const app = express();

const __dirname = path.resolve();// Get the current directory path

app.use(express.json());// Middleware to parse JSON bodies

app.use("/api/products", productRoutes);// Mount product routes

const PORT = process.env.PORT || 5000;

if(process.env.NODE_ENV === "production") {// Check if the environment is production
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port ",+ PORT);
});
