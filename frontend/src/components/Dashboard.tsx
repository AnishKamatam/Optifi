import { 
  DollarSign, 
  Users, 
  Package, 
  MessageSquare, 
  AlertTriangle,
  TrendingUp,
  Building2,
  ArrowUp
} from 'lucide-react'

const Dashboard: React.FC = () => {
  const metrics = [
    {
      id: 'revenue',
      icon: DollarSign,
      iconColor: '#10b981',
      iconBg: '#10b98120',
      value: '$2.4M',
      change: '+15.6%',
      period: 'This Quarter'
    },
    {
      id: 'employees',
      icon: Users,
      iconColor: '#3b82f6',
      iconBg: '#3b82f620',
      value: '156',
      change: '+8.3%',
      period: 'vs Last Month'
    },
    {
      id: 'inventory',
      icon: Package,
      iconColor: '#8b5cf6',
      iconBg: '#8b5cf620',
      value: '$486K',
      change: '+12.1%',
      period: 'Current Stock'
    },
    {
      id: 'satisfaction',
      icon: MessageSquare,
      iconColor: '#f59e0b',
      iconBg: '#f59e0b20',
      value: '94.2%',
      change: '+2.3%',
      period: 'Average Rating'
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
        { label: 'Revenue', value: '$2.4M' },
        { label: 'Outstanding', value: '$45.2K' },
        { label: 'Growth', value: '+15.6%' }
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
                  <IconComponent size={28} />
                </div>
                <div className="metric-content">
                  <div className="metric-value">{metric.value}</div>
                  <div className="metric-change">
                    <ArrowUp size={14} />
                    {metric.change} {metric.period}
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