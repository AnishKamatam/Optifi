import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import './database/database'; // Initialize database
import financialMetricsRoutes from './routes/financialMetricsRoutes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Optifi API' });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'Optifi Backend is running'
  });
});

// API Routes
app.use('/api/financial-metrics', financialMetricsRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📊 Financial Metrics API: http://localhost:${PORT}/api/financial-metrics`);
}); 