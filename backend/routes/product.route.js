import express from "express";
import { createProduct, updateProduct, getProducts, deleteProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", createProduct );// Create a new product

router.get("/", getProducts );// Get all products

router.put("/:id",updateProduct );// Update a product

router.delete("/:id", deleteProduct );// Delete a product

export default router;
