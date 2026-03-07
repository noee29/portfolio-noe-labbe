import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import EnTeteNavigation from '../components/common/EnTeteNavigation.jsx'
import BasPage from '../components/common/BasPage.jsx'

// Pages
import PageAccueil from '../pages/PageAccueil.jsx'
import PageCompetences from '../pages/PageCompetences.jsx'
import PageProjets from '../pages/PageProjets.jsx'
import PageFormations from '../pages/PageFormations.jsx'
import PageContact from '../pages/PageContact.jsx'
import PageAdmin from '../pages/PageAdmin.jsx'
import PageDetailProjet from '../pages/PageDetailProjet.jsx'
import PageDashboardAdmin from '../pages/PageDashboardAdmin.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0d1818] text-gray-100 relative overflow-hidden">
        <EnTeteNavigation />
        <main>
          <Routes>
            <Route path="/" element={<PageAccueil />} />
            <Route path="/competences" element={<PageCompetences />} />
            <Route path="/projets" element={<PageProjets />} />
            <Route path="/projets/:id" element={<PageDetailProjet />} />
            <Route path="/formations" element={<PageFormations />} />
            <Route path="/contact" element={<PageContact />} />
            <Route path="/admin" element={<PageAdmin />} />
            <Route path="/admin/dashboard" element={<PageDashboardAdmin />} />
          </Routes>
        </main>
        <BasPage />
      </div>
    </BrowserRouter>
  )
}

export default App
