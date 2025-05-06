import express from 'express';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.post('/products', (req, res) => {
  res.json({ message: 'Hello from the Products!' });
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  connectDB();
  console.log('Server is running on port 3000');
});

