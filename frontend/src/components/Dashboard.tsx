import { 
  DollarSign, 
  Users, 
  Package, 
  MessageSquare, 
  AlertTriangle,
  TrendingUp,
  Building2,
  ArrowUp,
  Loader2,
  Zap,
  Calendar,
  FileText,
  UserPlus,
  Clock,
  Eye
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
      id: 'employees',
      icon: Users,
      iconColor: '#3b82f6',
      iconBg: '#3b82f620',
      value: '156',
      change: '+8.3%',
      period: 'Active Employees'
    },
    {
      id: 'inventory',
      icon: Package,
      iconColor: '#8b5cf6',
      iconBg: '#8b5cf620',
      value: '$486K',
      change: '+12.1%',
      period: 'Inventory Value'
    },
    {
      id: 'health',
      icon: TrendingUp,
      iconColor: '#f59e0b',
      iconBg: '#f59e0b20',
      value: '94.2%',
      change: '+2.3%',
      period: 'Financial Health Score'
    }
  ]

  const recentActivities = [
    {
      id: 1,
      title: 'Q4 Financial Report Completed',
      category: 'Finances',
      timeAgo: '2 hours ago',
      icon: FileText,
      iconColor: '#10b981'
    },
    {
      id: 2,
      title: 'Inventory Low Stock Alert',
      category: 'Inventory',
      timeAgo: '4 hours ago',
      icon: Package,
      iconColor: '#f59e0b'
    },
    {
      id: 3,
      title: 'Major Deal Closed - TechCorp',
      category: 'Sales & CRM',
      timeAgo: '6 hours ago',
      icon: TrendingUp,
      iconColor: '#10b981'
    },
    {
      id: 4,
      title: 'New Employee Onboarding',
      category: 'HR & Admin',
      timeAgo: '1 day ago',
      icon: UserPlus,
      iconColor: '#3b82f6'
    },
    {
      id: 5,
      title: 'Operations Review Meeting',
      category: 'Operations',
      timeAgo: '2 days ago',
      icon: Building2,
      iconColor: '#8b5cf6'
    }
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: 'Board Meeting',
      time: 'Today, 3:00 PM',
      priority: 'high',
      attendees: '12 attendees'
    },
    {
      id: 2,
      title: 'All Hands Meeting',
      time: 'Tomorrow, 10:00 AM',
      priority: 'medium',
      attendees: '156 attendees'
    },
    {
      id: 3,
      title: 'Product Launch Review',
      time: 'Friday, 2:00 PM',
      priority: 'high',
      attendees: '25 attendees'
    },
    {
      id: 4,
      title: 'Monthly Performance Review',
      time: 'Next Monday',
      priority: 'medium',
      attendees: '8 attendees'
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

      <h2 className="insights-title">Department Summary</h2>
      <div className="department-section">
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
                      <IconComponent size={16} />
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
                    {dept.alerts} alerts
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <div className="activity-events-section">
        <div className="activity-section">
          <div className="section-header">
            <div className="section-title">
              <Zap size={20} />
              <h3>Recent Activity</h3>
            </div>
            <button className="view-all-btn">
              <Eye size={16} />
              View All
            </button>
          </div>
          <div className="activity-list">
            {recentActivities.map((activity) => {
              const IconComponent = activity.icon
              return (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon" style={{ color: activity.iconColor }}>
                    <IconComponent size={16} />
                  </div>
                  <div className="activity-content">
                    <div className="activity-title">{activity.title}</div>
                    <div className="activity-category">{activity.category}</div>
                  </div>
                  <div className="activity-time">{activity.timeAgo}</div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="events-section">
          <div className="section-header">
            <div className="section-title">
              <Calendar size={20} />
              <h3>Upcoming Events</h3>
            </div>
            <button className="view-all-btn">
              <Calendar size={16} />
              View Calendar
            </button>
          </div>
          <div className="events-list">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="event-item">
                <div className="event-icon">
                  <Calendar size={16} />
                </div>
                <div className="event-content">
                  <div className="event-title">{event.title}</div>
                  <div className="event-time">{event.time}</div>
                </div>
                <div className="event-details">
                  <div className={`priority-badge priority-${event.priority}`}>
                    {event.priority}
                  </div>
                  <div className="event-attendees">{event.attendees}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 