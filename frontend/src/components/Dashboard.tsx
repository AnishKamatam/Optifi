import { 
  DollarSign, 
  Users, 
  Package, 
  MessageSquare, 
  AlertTriangle,
  TrendingUp,
  Building2,
  ArrowUp,
  Loader2
} from 'lucide-react'
import { useRevenue } from '../hooks/useRevenue'

const Dashboard: React.FC = () => {
  const { stats, loading, error } = useRevenue();

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Calculate growth rate percentage
  const formatGrowthRate = (rate: number) => {
    return rate > 0 ? `+${rate.toFixed(1)}%` : `${rate.toFixed(1)}%`;
  };

  const metrics = [
    {
      id: 'revenue',
      icon: DollarSign,
      iconColor: '#10b981',
      iconBg: '#10b98120',
      value: stats ? formatCurrency(stats.totalRevenue) : '$0',
      change: stats ? formatGrowthRate(stats.growthRate) : '+0%',
      period: 'Total Revenue'
    },
    {
      id: 'average',
      icon: TrendingUp,
      iconColor: '#3b82f6',
      iconBg: '#3b82f620',
      value: stats ? formatCurrency(stats.averageRevenue) : '$0',
      change: '+8.3%',
      period: 'Average Revenue'
    },
    {
      id: 'recent',
      icon: Package,
      iconColor: '#8b5cf6',
      iconBg: '#8b5cf620',
      value: stats ? formatCurrency(stats.recentRevenue) : '$0',
      change: '+12.1%',
      period: 'Recent Revenue'
    },
    {
      id: 'growth',
      icon: MessageSquare,
      iconColor: '#f59e0b',
      iconBg: '#f59e0b20',
      value: stats ? `${stats.growthRate.toFixed(1)}%` : '0%',
      change: '+2.3%',
      period: 'Growth Rate'
    }
  ]

  const departments = [
    {
      id: 'finances',
      icon: DollarSign,
      iconColor: '#10b981',
      iconBg: '#10b98120',
      title: 'Finances',
      status: 'Excellent',
      statusClass: 'status-excellent',
      metrics: [
        { label: 'Revenue', value: stats ? formatCurrency(stats.totalRevenue) : '$0' },
        { label: 'Average', value: stats ? formatCurrency(stats.averageRevenue) : '$0' },
        { label: 'Growth', value: stats ? formatGrowthRate(stats.growthRate) : '+0%' }
      ],
      alerts: null
    },
    {
      id: 'inventory',
      icon: Package,
      iconColor: '#f59e0b',
      iconBg: '#f59e0b20',
      title: 'Inventory',
      status: 'Warning',
      statusClass: 'status-warning',
      metrics: [
        { label: 'Items', value: '1,247' },
        { label: 'LowStock', value: '18' },
        { label: 'Turnover', value: '4.2x' }
      ],
      alerts: 5
    },
    {
      id: 'sales',
      icon: TrendingUp,
      iconColor: '#3b82f6',
      iconBg: '#3b82f620',
      title: 'Sales & CRM',
      status: 'Excellent',
      statusClass: 'status-excellent',
      metrics: [
        { label: 'Deals', value: '89' },
        { label: 'Closed', value: '67' },
        { label: 'Conversion', value: '75%' }
      ],
      alerts: null
    },
    {
      id: 'operations',
      icon: Building2,
      iconColor: '#8b5cf6',
      iconBg: '#8b5cf620',
      title: 'Operations',
      status: 'Good',
      statusClass: 'status-good',
      metrics: [
        { label: 'Projects', value: '23' },
        { label: 'Completed', value: '18' },
        { label: 'Efficiency', value: '89%' }
      ],
      alerts: 2
    },
    {
      id: 'hr',
      icon: Users,
      iconColor: '#ec4899',
      iconBg: '#ec489920',
      title: 'HR & Admin',
      status: 'Good',
      statusClass: 'status-good',
      metrics: [
        { label: 'Employees', value: '156' },
        { label: 'NewHires', value: '12' },
        { label: 'Retention', value: '91.8%' }
      ],
      alerts: 3
    }
  ]

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-container">
          <Loader2 className="loading-spinner" size={48} />
          <p>Loading revenue data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-container">
          <AlertTriangle size={48} color="#ef4444" />
          <p>Error loading data: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="insights-section">
        <h2 className="insights-title">Real-time insights across all business operations</h2>
        <div className="metrics-grid">
          {metrics.map((metric) => {
            const IconComponent = metric.icon
            return (
              <div key={metric.id} className="metric-card">
                <div 
                  className="metric-icon"
                  style={{ 
                    backgroundColor: metric.iconBg,
                    color: metric.iconColor
                  }}
                >
                  <IconComponent size={24} />
                </div>
                <div className="metric-content">
                  <div className="metric-title">{metric.period}</div>
                  <div className="metric-value">{metric.value}</div>
                  <div className="metric-change">
                    <ArrowUp size={14} />
                    {metric.change}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="department-section">
        <h2 className="insights-title">Department Summary</h2>
        <div className="department-grid">
          {departments.map((dept) => {
            const IconComponent = dept.icon
            return (
              <div key={dept.id} className="department-card">
                <div className="department-header">
                  <div className="department-title">
                    <div 
                      className="department-icon"
                      style={{ 
                        backgroundColor: dept.iconBg,
                        color: dept.iconColor
                      }}
                    >
                      <IconComponent size={18} />
                    </div>
                    {dept.title}
                  </div>
                  <div className={`status-badge ${dept.statusClass}`}>
                    {dept.status}
                  </div>
                </div>
                
                <div className="department-metrics">
                  {dept.metrics.map((metric, index) => (
                    <div key={index} className="metric-item">
                      <div className="metric-label">{metric.label}</div>
                      <div className="metric-value-small">{metric.value}</div>
                    </div>
                  ))}
                </div>
                
                {dept.alerts && (
                  <div className="department-alerts">
                    <AlertTriangle size={12} />
                    ▲ {dept.alerts} alerts
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Dashboard 