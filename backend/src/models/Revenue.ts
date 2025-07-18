import { runQuery, runSingleQuery, runExecute } from '../database/database';

// Revenue interface
export interface Revenue {
  id?: number;
  amount: number;
  period: string;
  category?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

// Revenue statistics interface
export interface RevenueStats {
  totalRevenue: number;
  averageRevenue: number;
  recentRevenue: number;
  growthRate: number;
}

export class RevenueModel {
  // Get all revenue records
  static async getAll(): Promise<Revenue[]> {
    try {
      const revenues = await runQuery(`
        SELECT * FROM revenue 
        ORDER BY created_at DESC
      `);
      return revenues;
    } catch (error) {
      console.error('Error fetching all revenue:', error);
      throw error;
    }
  }

  // Get revenue by ID
  static async getById(id: number): Promise<Revenue | null> {
    try {
      const revenue = await runSingleQuery(`
        SELECT * FROM revenue WHERE id = ?
      `, [id]);
      return revenue || null;
    } catch (error) {
      console.error('Error fetching revenue by ID:', error);
      throw error;
    }
  }

  // Create new revenue record
  static async create(revenue: Revenue): Promise<number> {
    try {
      const result = await runExecute(`
        INSERT INTO revenue (amount, period, category, description)
        VALUES (?, ?, ?, ?)
      `, [revenue.amount, revenue.period, revenue.category, revenue.description]);
      return result.id;
    } catch (error) {
      console.error('Error creating revenue:', error);
      throw error;
    }
  }

  // Update revenue record
  static async update(id: number, revenue: Partial<Revenue>): Promise<boolean> {
    try {
      const result = await runExecute(`
        UPDATE revenue 
        SET amount = ?, period = ?, category = ?, description = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `, [revenue.amount, revenue.period, revenue.category, revenue.description, id]);
      return result.changes > 0;
    } catch (error) {
      console.error('Error updating revenue:', error);
      throw error;
    }
  }

  // Delete revenue record
  static async delete(id: number): Promise<boolean> {
    try {
      const result = await runExecute(`
        DELETE FROM revenue WHERE id = ?
      `, [id]);
      return result.changes > 0;
    } catch (error) {
      console.error('Error deleting revenue:', error);
      throw error;
    }
  }

  // Get revenue statistics
  static async getStats(): Promise<RevenueStats> {
    try {
      const stats = await runSingleQuery(`
        SELECT 
          SUM(amount) as totalRevenue,
          AVG(amount) as averageRevenue,
          (SELECT amount FROM revenue ORDER BY created_at DESC LIMIT 1) as recentRevenue,
          (
            SELECT ((r1.amount - r2.amount) / r2.amount * 100)
            FROM revenue r1
            JOIN revenue r2 ON r1.id = (SELECT MAX(id) FROM revenue)
            WHERE r2.id = (SELECT MAX(id) FROM revenue WHERE id < (SELECT MAX(id) FROM revenue))
          ) as growthRate
        FROM revenue
      `);

      return {
        totalRevenue: stats.totalRevenue || 0,
        averageRevenue: stats.averageRevenue || 0,
        recentRevenue: stats.recentRevenue || 0,
        growthRate: stats.growthRate || 0
      };
    } catch (error) {
      console.error('Error fetching revenue stats:', error);
      throw error;
    }
  }

  // Get revenue by period
  static async getByPeriod(period: string): Promise<Revenue[]> {
    try {
      const revenues = await runQuery(`
        SELECT * FROM revenue 
        WHERE period = ?
        ORDER BY created_at DESC
      `, [period]);
      return revenues;
    } catch (error) {
      console.error('Error fetching revenue by period:', error);
      throw error;
    }
  }

  // Get recent revenue (last N records)
  static async getRecent(limit: number = 5): Promise<Revenue[]> {
    try {
      const revenues = await runQuery(`
        SELECT * FROM revenue 
        ORDER BY created_at DESC 
        LIMIT ?
      `, [limit]);
      return revenues;
    } catch (error) {
      console.error('Error fetching recent revenue:', error);
      throw error;
    }
  }
} 