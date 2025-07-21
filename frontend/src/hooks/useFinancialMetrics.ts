import { useState, useEffect } from 'react';
import { apiService } from '../services/api';

export interface FinancialMetric {
  id: number;
  metric_name: string;
  value: number;
  period: string;
  change_percentage: number;
  change_type: string;
  additional_data: string;
  created_at: string;
  updated_at: string;
}

export interface FinancialMetricsStats {
  totalRevenue: number;
  growthRate: number;
  averageRevenue: number;
  recentRevenue: number;
}

export const useFinancialMetrics = () => {
  const [metrics, setMetrics] = useState<FinancialMetric[]>([]);
  const [stats, setStats] = useState<FinancialMetricsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const response = await apiService.getFinancialMetrics();
      if (response.success) {
        setMetrics(response.data);
        
        // Calculate stats from metrics
        const revenueMetric = response.data.find((m: FinancialMetric) => m.metric_name === 'Revenue');
        if (revenueMetric) {
          const additionalData = JSON.parse(revenueMetric.additional_data || '{}');
          setStats({
            totalRevenue: revenueMetric.value,
            growthRate: revenueMetric.change_percentage,
            averageRevenue: additionalData['3 month rolling average'] || revenueMetric.value,
            recentRevenue: revenueMetric.value
          });
        }
      }
    } catch (err) {
      setError('Failed to fetch financial metrics');
      console.error('Error fetching metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  return {
    metrics,
    stats,
    loading,
    error,
    fetchMetrics,
  };
}; 