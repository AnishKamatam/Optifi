import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Finances from './components/Finances'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  const renderPage = () => {
    switch (currentPage) {
      case 'finances':
        return <Finances />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="App">
      <Sidebar onNavigate={setCurrentPage} currentPage={currentPage} />
      <div className="main-content">
        <Header />
        {renderPage()}
      </div>
    </div>
  )
}

export default App 