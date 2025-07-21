import express from 'express';
import { FinancialMetricsController } from '../controllers/financialMetricsController';

const router = express.Router();

// Get all financial metrics
router.get('/', FinancialMetricsController.getAllMetrics);

// Get current financial metrics (latest period)
router.get('/current', FinancialMetricsController.getCurrentMetrics);

// Get financial metric by ID
router.get('/:id', FinancialMetricsController.getMetricById);

// Get financial metric by name
router.get('/name/:name', FinancialMetricsController.getMetricByName);

// Create new financial metric
router.post('/', FinancialMetricsController.createMetric);

// Update financial metric
router.put('/:id', FinancialMetricsController.updateMetric);

// Delete financial metric
router.delete('/:id', FinancialMetricsController.deleteMetric);

export default router; 