import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const createProduct = async (req, res) => {
    const product = req.body;// Get the product data from the request body
  
    if (!product.name || !product.price || !product.image) {// Check if all required fields are provided
      return res.status(400).json({ message: "All fields are required" });
    }
    const newProduct = new Product(product);// Create a new product instance
  
    try {
      await newProduct.save();// Save the product to the database
      // Return the created product with a success status
      res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server Error" });
    }
  }

  export const getProducts = async (req, res) => {
    try {
      const products = await Product.find({});// Fetch all products from the database
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  }

  export const updateProduct = async (req, res) => {
    const { id } = req.params;// Get the product ID from the request parameters
    const product = req.body;// Get the updated product data from the request body
  
    if (!mongoose.Types.ObjectId.isValid(id)) {// Check if the provided ID is valid
      return res.status(404).json({ message: "Product not found in database" });
    }
  
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, product, {
        new: true,
      });// Update the product in the database and return the updated document
      res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  }

  export const deleteProduct = async (req, res) => {
    const { id } = req.params;// Get the product ID from the request parameters

    if (!mongoose.Types.ObjectId.isValid(id)) {// Check if the provided ID is valid
        return res.status(404).json({ message: "Product not found in database" });
      }
  
    try {
      const product = await Product.findById(id);// Check if the product exists in the database
      if (!product) {
        return res.status(404).json({ message: "Product not found in database" });
      }
      await Product.findByIdAndDelete(id);// Delete the product from the database
      // Return a success message
      res.status(200).json({success: true, message: "Product deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  }