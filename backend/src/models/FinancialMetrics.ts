import { runQuery, runSingleQuery, runExecute } from '../database/database';

// Financial Metrics interface
export interface FinancialMetric {
  id?: number;
  metric_name: string;
  value: number;
  period: string;
  change_percentage?: number;
  change_type?: string;
  additional_data?: string;
  created_at?: string;
  updated_at?: string;
}

export class FinancialMetricsModel {
  // Get all financial metrics
  static async getAll(): Promise<FinancialMetric[]> {
    try {
      const metrics = await runQuery(`
        SELECT * FROM financial_metrics 
        ORDER BY created_at DESC
      `);
      return metrics;
    } catch (error) {
      console.error('Error fetching all financial metrics:', error);
      throw error;
    }
  }

  // Get financial metric by ID
  static async getById(id: number): Promise<FinancialMetric | null> {
    try {
      const metric = await runSingleQuery(`
        SELECT * FROM financial_metrics WHERE id = ?
      `, [id]);
      return metric || null;
    } catch (error) {
      console.error('Error fetching financial metric by ID:', error);
      throw error;
    }
  }

  // Get financial metric by name
  static async getByName(metricName: string): Promise<FinancialMetric | null> {
    try {
      const metric = await runSingleQuery(`
        SELECT * FROM financial_metrics WHERE metric_name = ?
        ORDER BY created_at DESC LIMIT 1
      `, [metricName]);
      return metric || null;
    } catch (error) {
      console.error('Error fetching financial metric by name:', error);
      throw error;
    }
  }

  // Create new financial metric
  static async create(metric: FinancialMetric): Promise<number> {
    try {
      const result = await runExecute(`
        INSERT INTO financial_metrics (metric_name, value, period, change_percentage, change_type, additional_data)
        VALUES (?, ?, ?, ?, ?, ?)
      `, [metric.metric_name, metric.value, metric.period, metric.change_percentage, metric.change_type, metric.additional_data]);
      return result.id;
    } catch (error) {
      console.error('Error creating financial metric:', error);
      throw error;
    }
  }

  // Update financial metric
  static async update(id: number, metric: Partial<FinancialMetric>): Promise<boolean> {
    try {
      const result = await runExecute(`
        UPDATE financial_metrics 
        SET metric_name = ?, value = ?, period = ?, change_percentage = ?, change_type = ?, additional_data = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `, [metric.metric_name, metric.value, metric.period, metric.change_percentage, metric.change_type, metric.additional_data, id]);
      return result.changes > 0;
    } catch (error) {
      console.error('Error updating financial metric:', error);
      throw error;
    }
  }

  // Delete financial metric
  static async delete(id: number): Promise<boolean> {
    try {
      const result = await runExecute(`
        DELETE FROM financial_metrics WHERE id = ?
      `, [id]);
      return result.changes > 0;
    } catch (error) {
      console.error('Error deleting financial metric:', error);
      throw error;
    }
  }

  // Get all current financial metrics for the latest period
  static async getCurrentMetrics(): Promise<FinancialMetric[]> {
    try {
      const metrics = await runQuery(`
        SELECT * FROM financial_metrics 
        WHERE period = (SELECT period FROM financial_metrics ORDER BY created_at DESC LIMIT 1)
        ORDER BY metric_name
      `);
      return metrics;
    } catch (error) {
      console.error('Error fetching current financial metrics:', error);
      throw error;
    }
  }
} 