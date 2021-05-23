import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
//Routes
import productRoutes from './routes/productRoutes.js';

const app = express();
app.use(express.json())
dotenv.config();
connectDB();

app.get("/", (req, res) => res.send('API is running'));
app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || PORT;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));