import './App.css'
import EnTeteNavigation from '../components/common/EnTeteNavigation.jsx'
import BasPage from '../components/common/BasPage.jsx'
import Home from '../pages/Home.jsx'

function App() {
  return (
    <div className="min-h-screen bg-[#0d1818] text-gray-100 relative overflow-hidden">
      <EnTeteNavigation />
      <main>
        <Home />
      </main>
      <BasPage />
    </div>
  )
}

export default App
