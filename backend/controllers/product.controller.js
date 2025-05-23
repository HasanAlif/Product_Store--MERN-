import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const createProduct = async (req, res) => {
    const product = req.body;
  
    if (!product.name || !product.price || !product.image) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newProduct = new Product(product);
  
    try {
      await newProduct.save();
      res.status(201).json({ sucess: true, data: newProduct });
    } catch (error) {
      res.status(500).json({ sucess: false, message: "Server Error" });
    }
  }

  export const getProducts = async (req, res) => {
    try {
      const products = await Product.find({});
      res.status(200).json({ success: true, data: products });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  }

  export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "Product not found in database" });
    }
  
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, product, {
        new: true,
      });
      res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  }

  export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "Product not found in database" });
      }
  
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found in database" });
      }
      await Product.findByIdAndDelete(id);
      res.status(200).json({success: true, message: "Product deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  }