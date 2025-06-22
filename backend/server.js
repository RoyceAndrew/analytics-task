import express from 'express';
import productRouter from './routes/product.js';
import saleRouter from './routes/sale.js';
import cors from 'cors';

const app = express();

app.use(cors(
    {
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
    }
));

app.use(express.json());

app.use("/sale", saleRouter);

app.use("/product", productRouter);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});

