import { Circle } from 'lucide-react'

const Header: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="header">
      <div className="header-left">
        <span className="live-data">Live Data</span>
      </div>
      
      <div className="header-center">
        <div className="status-indicator">
          <Circle size={8} fill="#10b981" color="#10b981" />
          <span className="status-text">All Systems Operational</span>
        </div>
        <span className="current-date">{currentDate}</span>
      </div>
      
      <div className="header-right">
        <div className="user-avatar">
          <span className="avatar-initials">JD</span>
        </div>
      </div>
    </div>
  )
}

export default Header 