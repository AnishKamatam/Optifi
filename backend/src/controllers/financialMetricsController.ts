import { Request, Response } from 'express';
import { FinancialMetricsModel, FinancialMetric } from '../models/FinancialMetrics';

export class FinancialMetricsController {
  // Get all financial metrics
  static async getAllMetrics(req: Request, res: Response) {
    try {
      const metrics = await FinancialMetricsModel.getAll();
      res.json({
        success: true,
        data: metrics,
        message: 'Financial metrics retrieved successfully'
      });
    } catch (error) {
      console.error('Error in getAllMetrics:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve financial metrics',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get current financial metrics (latest period)
  static async getCurrentMetrics(req: Request, res: Response) {
    try {
      const metrics = await FinancialMetricsModel.getCurrentMetrics();
      res.json({
        success: true,
        data: metrics,
        message: 'Current financial metrics retrieved successfully'
      });
    } catch (error) {
      console.error('Error in getCurrentMetrics:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve current financial metrics',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get financial metric by ID
  static async getMetricById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid metric ID'
        });
      }

      const metric = await FinancialMetricsModel.getById(id);
      if (!metric) {
        return res.status(404).json({
          success: false,
          message: 'Financial metric not found'
        });
      }

      res.json({
        success: true,
        data: metric,
        message: 'Financial metric retrieved successfully'
      });
    } catch (error) {
      console.error('Error in getMetricById:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve financial metric',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Get financial metric by name
  static async getMetricByName(req: Request, res: Response) {
    try {
      const { name } = req.params;
      if (!name) {
        return res.status(400).json({
          success: false,
          message: 'Metric name is required'
        });
      }

      const metric = await FinancialMetricsModel.getByName(name);
      if (!metric) {
        return res.status(404).json({
          success: false,
          message: 'Financial metric not found'
        });
      }

      res.json({
        success: true,
        data: metric,
        message: 'Financial metric retrieved successfully'
      });
    } catch (error) {
      console.error('Error in getMetricByName:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve financial metric',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Create new financial metric
  static async createMetric(req: Request, res: Response) {
    try {
      const { metric_name, value, period, change_percentage, change_type, additional_data } = req.body;

      // Validation
      if (!metric_name || value === undefined || !period) {
        return res.status(400).json({
          success: false,
          message: 'Metric name, value, and period are required'
        });
      }

      if (typeof value !== 'number') {
        return res.status(400).json({
          success: false,
          message: 'Value must be a number'
        });
      }

      const metricData: FinancialMetric = {
        metric_name,
        value,
        period,
        change_percentage,
        change_type,
        additional_data: additional_data ? JSON.stringify(additional_data) : undefined
      };

      const newId = await FinancialMetricsModel.create(metricData);
      const newMetric = await FinancialMetricsModel.getById(newId);

      res.status(201).json({
        success: true,
        data: newMetric,
        message: 'Financial metric created successfully'
      });
    } catch (error) {
      console.error('Error in createMetric:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create financial metric',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Update financial metric
  static async updateMetric(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid metric ID'
        });
      }

      const { metric_name, value, period, change_percentage, change_type, additional_data } = req.body;

      // Check if metric exists
      const existingMetric = await FinancialMetricsModel.getById(id);
      if (!existingMetric) {
        return res.status(404).json({
          success: false,
          message: 'Financial metric not found'
        });
      }

      const updateData: Partial<FinancialMetric> = {};
      if (metric_name !== undefined) updateData.metric_name = metric_name;
      if (value !== undefined) updateData.value = value;
      if (period !== undefined) updateData.period = period;
      if (change_percentage !== undefined) updateData.change_percentage = change_percentage;
      if (change_type !== undefined) updateData.change_type = change_type;
      if (additional_data !== undefined) updateData.additional_data = JSON.stringify(additional_data);

      const success = await FinancialMetricsModel.update(id, updateData);
      if (!success) {
        return res.status(500).json({
          success: false,
          message: 'Failed to update financial metric'
        });
      }

      const updatedMetric = await FinancialMetricsModel.getById(id);

      res.json({
        success: true,
        data: updatedMetric,
        message: 'Financial metric updated successfully'
      });
    } catch (error) {
      console.error('Error in updateMetric:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update financial metric',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  // Delete financial metric
  static async deleteMetric(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid metric ID'
        });
      }

      // Check if metric exists
      const existingMetric = await FinancialMetricsModel.getById(id);
      if (!existingMetric) {
        return res.status(404).json({
          success: false,
          message: 'Financial metric not found'
        });
      }

      const success = await FinancialMetricsModel.delete(id);
      if (!success) {
        return res.status(500).json({
          success: false,
          message: 'Failed to delete financial metric'
        });
      }

      res.json({
        success: true,
        message: 'Financial metric deleted successfully'
      });
    } catch (error) {
      console.error('Error in deleteMetric:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete financial metric',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
} 