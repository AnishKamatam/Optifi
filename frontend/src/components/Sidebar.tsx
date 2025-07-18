import { 
  LayoutGrid, 
  DollarSign, 
  Package, 
  TrendingUp, 
  Building2, 
  Users 
} from 'lucide-react'

const Sidebar: React.FC = () => {
  const menuItems = [
    {
      id: 'dashboard',
      icon: LayoutGrid,
      title: 'Dashboard',
      subtitle: 'Company Overview',
      count: null,
      active: true
    },
    {
      id: 'finances',
      icon: DollarSign,
      title: 'Finances',
      subtitle: 'Financial Management',
      count: '247'
    },
    {
      id: 'inventory',
      icon: Package,
      title: 'Inventory',
      subtitle: 'Stock Management',
      count: '1.2K'
    },
    {
      id: 'sales',
      icon: TrendingUp,
      title: 'Sales & CRM',
      subtitle: 'Sales Operations',
      count: '89'
    },
    {
      id: 'operations',
      icon: Building2,
      title: 'Operations',
      subtitle: 'Business Operations',
      count: '23'
    },
    {
      id: 'hr',
      icon: Users,
      title: 'HR & Admin',
      subtitle: 'Human Resources',
      count: '156'
    }
  ]

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-text">
            <div className="company-name">Optifi</div>
          </div>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const IconComponent = item.icon
          return (
            <div 
              key={item.id}
              className={`nav-item ${item.active ? 'active' : ''}`}
            >
              <div className="nav-icon">
                <IconComponent size={20} />
              </div>
              <div className="nav-content">
                <div className="nav-title">{item.title}</div>
                <div className="nav-subtitle">{item.subtitle}</div>
              </div>
              {item.count && (
                <div className="nav-count">{item.count}</div>
              )}
            </div>
          )
        })}
      </nav>
    </div>
  )
}

export default Sidebar 