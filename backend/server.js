import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import Product from './models/product.model.js';

dotenv.config();

const app = express();

app.use(express.json());


app.post('/api/products',async (req, res) => {
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const newProduct = new Product(product);

  try{
    await newProduct.save();
    res.status(201).json({sucess: true, data: newProduct});
  }catch(error){
    res.status(500).json({sucess: false, message: "Server Error"});
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  connectDB();
  console.log('Server is running on port 3000');
});

