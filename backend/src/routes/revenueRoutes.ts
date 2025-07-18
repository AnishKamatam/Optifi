import { Router } from 'express';
import { RevenueController } from '../controllers/revenueController';

const router = Router();

// GET /api/revenue - Get all revenue records
router.get('/', RevenueController.getAllRevenue);

// GET /api/revenue/stats - Get revenue statistics
router.get('/stats', RevenueController.getRevenueStats);

// GET /api/revenue/recent - Get recent revenue records
router.get('/recent', RevenueController.getRecentRevenue);

// GET /api/revenue/period/:period - Get revenue by period
router.get('/period/:period', RevenueController.getRevenueByPeriod);

// GET /api/revenue/:id - Get revenue by ID
router.get('/:id', RevenueController.getRevenueById);

// POST /api/revenue - Create new revenue record
router.post('/', RevenueController.createRevenue);

// PUT /api/revenue/:id - Update revenue record
router.put('/:id', RevenueController.updateRevenue);

// DELETE /api/revenue/:id - Delete revenue record
router.delete('/:id', RevenueController.deleteRevenue);

export default router; 