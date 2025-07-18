import { useState, useEffect } from 'react';
import { apiService, RevenueStats, RevenueRecord } from '../services/api';

export const useRevenue = () => {
  const [stats, setStats] = useState<RevenueStats | null>(null);
  const [records, setRecords] = useState<RevenueRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await apiService.getRevenueStats();
      if (response.success) {
        setStats(response.data);
      }
    } catch (err) {
      setError('Failed to fetch revenue statistics');
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const response = await apiService.getRevenueRecords();
      if (response.success) {
        setRecords(response.data);
      }
    } catch (err) {
      setError('Failed to fetch revenue records');
      console.error('Error fetching records:', err);
    } finally {
      setLoading(false);
    }
  };

  const addRecord = async (data: Omit<RevenueRecord, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const response = await apiService.addRevenueRecord(data);
      if (response.success) {
        // Refresh the data
        await Promise.all([fetchStats(), fetchRecords()]);
        return response.data;
      }
    } catch (err) {
      setError('Failed to add revenue record');
      console.error('Error adding record:', err);
      throw err;
    }
  };

  const updateRecord = async (id: number, data: Partial<RevenueRecord>) => {
    try {
      const response = await apiService.updateRevenueRecord(id, data);
      if (response.success) {
        // Refresh the data
        await Promise.all([fetchStats(), fetchRecords()]);
        return response.data;
      }
    } catch (err) {
      setError('Failed to update revenue record');
      console.error('Error updating record:', err);
      throw err;
    }
  };

  const deleteRecord = async (id: number) => {
    try {
      const response = await apiService.deleteRevenueRecord(id);
      if (response.success) {
        // Refresh the data
        await Promise.all([fetchStats(), fetchRecords()]);
        return response.data;
      }
    } catch (err) {
      setError('Failed to delete revenue record');
      console.error('Error deleting record:', err);
      throw err;
    }
  };

  useEffect(() => {
    // Fetch both stats and records on component mount
    Promise.all([fetchStats(), fetchRecords()]);
  }, []);

  return {
    stats,
    records,
    loading,
    error,
    fetchStats,
    fetchRecords,
    addRecord,
    updateRecord,
    deleteRecord,
  };
}; 