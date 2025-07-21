const API_BASE_URL = 'https://below-jelsoft-lance-defects.trycloudflare.com';

export interface RevenueStats {
  totalRevenue: number;
  averageRevenue: number;
  recentRevenue: number;
  growthRate: number;
}

export interface RevenueRecord {
  id: number;
  amount: number;
  period: string;
  category: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Health check
  async getHealth(): Promise<{ status: string; timestamp: string; message: string }> {
    return this.request('/api/health');
  }

  // Get revenue statistics
  async getRevenueStats(): Promise<ApiResponse<RevenueStats>> {
    return this.request('/api/revenue/stats');
  }

  // Get all revenue records
  async getRevenueRecords(): Promise<ApiResponse<RevenueRecord[]>> {
    return this.request('/api/revenue');
  }

  // Add new revenue record
  async addRevenueRecord(data: Omit<RevenueRecord, 'id' | 'created_at' | 'updated_at'>): Promise<ApiResponse<RevenueRecord>> {
    return this.request('/api/revenue', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Update revenue record
  async updateRevenueRecord(id: number, data: Partial<RevenueRecord>): Promise<ApiResponse<RevenueRecord>> {
    return this.request(`/api/revenue/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Delete revenue record
  async deleteRevenueRecord(id: number): Promise<ApiResponse<{ id: number }>> {
    return this.request(`/api/revenue/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();
export default apiService; 