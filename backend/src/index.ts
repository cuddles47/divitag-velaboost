import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';
import dotenv from 'dotenv';
import { corsOptions } from './config/corsOptions';
// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
const prisma = new PrismaClient();

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Brands API endpoints
app.get('/api/brands', async (req, res) => {
    try {
        const brands = await prisma.brand.findMany();
        res.json({ res: brands, error: null });
    } catch (error) {
        console.error('Error fetching brands:', error);
        res.status(500).json({ res: null, error: 'Failed to fetch brands' });
    }
});

app.post('/api/brands', async (req, res) => {
    try {
        const { name } = req.body;
        const newBrand = await prisma.brand.create({
            data: { name }
        });
        res.status(201).json({ res: newBrand, error: null });
    } catch (error) {
        console.error('Error creating brand:', error);
        res.status(500).json({ res: null, error: 'Failed to create brand' });
    }
});

// Categories API endpoints
app.get('/api/categories', async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.json({ res: categories, error: null });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ res: null, error: 'Failed to fetch categories' });
    }
});

// Products API endpoints
app.get('/api/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany({
            include: {
                brand: true,
                category: true
            }
        });
        res.json({ res: products, error: null });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ res: null, error: 'Failed to fetch products' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Backend server running on http://localhost:${port}`);
});