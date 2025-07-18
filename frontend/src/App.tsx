import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './components/Dashboard'

function App() {
  return (
    <div className="App">
      <Sidebar />
      <div className="main-content">
        <Header />
        <Dashboard />
      </div>
    </div>
  )
}

export default App 