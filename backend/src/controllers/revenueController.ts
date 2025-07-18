import { Request, Response } from 'express';
import { RevenueModel, Revenue } from '../models/Revenue';

export class RevenueController {
  // Get all revenue records
  static async getAllRevenue(req: Request, res: Response) {
    try {
      const revenues = await RevenueModel.getAll();
      res.json({
        success: true,
        data: revenues,
        message: 'Revenue records retrieved successfully'
      });
    } catch (error) {
      console.error('Error in getAllRevenue:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve revenue records',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get revenue by ID
  static async getRevenueById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid revenue ID'
        });
      }

      const revenue = await RevenueModel.getById(id);
      if (!revenue) {
        return res.status(404).json({
          success: false,
          message: 'Revenue record not found'
        });
      }

      res.json({
        success: true,
        data: revenue,
        message: 'Revenue record retrieved successfully'
      });
    } catch (error) {
      console.error('Error in getRevenueById:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve revenue record',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Create new revenue record
  static async createRevenue(req: Request, res: Response) {
    try {
      const { amount, period, category, description } = req.body;

      // Validation
      if (!amount || !period) {
        return res.status(400).json({
          success: false,
          message: 'Amount and period are required'
        });
      }

      if (typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Amount must be a positive number'
        });
      }

      const revenueData: Revenue = {
        amount,
        period,
        category,
        description
      };

      const newId = await RevenueModel.create(revenueData);
      const newRevenue = await RevenueModel.getById(newId);

      res.status(201).json({
        success: true,
        data: newRevenue,
        message: 'Revenue record created successfully'
      });
    } catch (error) {
      console.error('Error in createRevenue:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create revenue record',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Update revenue record
  static async updateRevenue(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid revenue ID'
        });
      }

      const { amount, period, category, description } = req.body;

      // Check if revenue exists
      const existingRevenue = await RevenueModel.getById(id);
      if (!existingRevenue) {
        return res.status(404).json({
          success: false,
          message: 'Revenue record not found'
        });
      }

      // Validation
      if (amount !== undefined && (typeof amount !== 'number' || amount <= 0)) {
        return res.status(400).json({
          success: false,
          message: 'Amount must be a positive number'
        });
      }

      const updateData: Partial<Revenue> = {
        amount: amount !== undefined ? amount : existingRevenue.amount,
        period: period || existingRevenue.period,
        category: category !== undefined ? category : existingRevenue.category,
        description: description !== undefined ? description : existingRevenue.description
      };

      const success = await RevenueModel.update(id, updateData);
      if (!success) {
        return res.status(500).json({
          success: false,
          message: 'Failed to update revenue record'
        });
      }

      const updatedRevenue = await RevenueModel.getById(id);
      res.json({
        success: true,
        data: updatedRevenue,
        message: 'Revenue record updated successfully'
      });
    } catch (error) {
      console.error('Error in updateRevenue:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update revenue record',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Delete revenue record
  static async deleteRevenue(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid revenue ID'
        });
      }

      // Check if revenue exists
      const existingRevenue = await RevenueModel.getById(id);
      if (!existingRevenue) {
        return res.status(404).json({
          success: false,
          message: 'Revenue record not found'
        });
      }

      const success = await RevenueModel.delete(id);
      if (!success) {
        return res.status(500).json({
          success: false,
          message: 'Failed to delete revenue record'
        });
      }

      res.json({
        success: true,
        message: 'Revenue record deleted successfully'
      });
    } catch (error) {
      console.error('Error in deleteRevenue:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete revenue record',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get revenue statistics
  static async getRevenueStats(req: Request, res: Response) {
    try {
      const stats = await RevenueModel.getStats();
      res.json({
        success: true,
        data: stats,
        message: 'Revenue statistics retrieved successfully'
      });
    } catch (error) {
      console.error('Error in getRevenueStats:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve revenue statistics',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get revenue by period
  static async getRevenueByPeriod(req: Request, res: Response) {
    try {
      const { period } = req.params;
      if (!period) {
        return res.status(400).json({
          success: false,
          message: 'Period parameter is required'
        });
      }

      const revenues = await RevenueModel.getByPeriod(period);
      res.json({
        success: true,
        data: revenues,
        message: `Revenue records for period ${period} retrieved successfully`
      });
    } catch (error) {
      console.error('Error in getRevenueByPeriod:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve revenue records by period',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get recent revenue
  static async getRecentRevenue(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 5;
      const revenues = await RevenueModel.getRecent(limit);
      res.json({
        success: true,
        data: revenues,
        message: 'Recent revenue records retrieved successfully'
      });
    } catch (error) {
      console.error('Error in getRecentRevenue:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve recent revenue records',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
} 