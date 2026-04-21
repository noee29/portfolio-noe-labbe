import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ConteneurPage from '../layout/ConteneurPage.jsx';
import { cvApi } from '../../services/api.js';

/**
 * EnTeteNavigation - Header avec navigation
 */
export default function EnTeteNavigation() {
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [cvUrl, setCvUrl] = useState('/CV/CV Noé LABBÉ Portfolio.pdf');
  const [cvFilename, setCvFilename] = useState('CV Noé LABBÉ Portfolio.pdf');

  useEffect(function () {
    chargerCvPublic();
  }, []);

  async function chargerCvPublic() {
    try {
      const response = await cvApi.get();
      if (response && response.data) {
        const url = response.data.url;
        const file = response.data.file;

        if (url) {
          setCvUrl(url);
        }

        if (file) {
          setCvFilename(file);
        }
      }
    } catch {
      // En cas d'erreur, on garde les valeurs par défaut
    }
  }
  
  function basculerMenu() {
    setMenuOuvert(!menuOuvert);
  }
  
  function fermerMenu() {
    setMenuOuvert(false);
  }
  
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-cyan-500/20 shadow-lg shadow-cyan-500/10">
      <ConteneurPage className="flex items-center justify-between py-4">
        {/* Logo/Titre */}
        <Link to="/" className="font-bold text-xl tracking-tight text-cyan-300">
          Portfolio Noé Labbé
        </Link>
        
        {/* Navigation desktop (cachée sur mobile) */}
        <nav className="hidden md:flex items-center gap-1">
          <Link 
            to="/projets" 
            className="text-sm text-gray-300 hover:text-cyan-300 px-3 py-2 rounded-lg transition-colors"
          >
            Projets
          </Link>
          <Link 
            to="/competences" 
            className="text-sm text-gray-300 hover:text-cyan-300 px-3 py-2 rounded-lg transition-colors"
          >
            Compétences
          </Link>
          <Link 
            to="/formations" 
            className="text-sm text-gray-300 hover:text-cyan-300 px-3 py-2 rounded-lg transition-colors"
          >
            Formations
          </Link>
          <Link 
            to="/contact" 
            className="text-sm text-gray-300 hover:text-cyan-300 px-3 py-2 rounded-lg transition-colors"
          >
            Contact
          </Link>
        </nav>
        <div className="hidden md:block">
          <a 
            href={cvUrl}
            download={cvFilename}
            className="text-sm font-semibold px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white hover:shadow-lg hover:shadow-cyan-500/30 transition-all hover:scale-105 inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Télécharger CV
          </a>
        </div>
        
        {/* Bouton menu mobile (visible seulement sur mobile) */}
        <button onClick={basculerMenu} aria-label="Menu" className="md:hidden p-2 rounded-lg border border-cyan-500/30 hover:border-cyan-400 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-300">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </ConteneurPage>
      
      {/* Menu mobile déroulant (affiché seulement si menuOuvert est true) */}
      {menuOuvert && (
        <div className="md:hidden border-t border-cyan-500/20">
          <ConteneurPage className="py-3 flex flex-col gap-2">
            <Link 
              to="/projets" 
              className="text-sm text-gray-300 hover:text-cyan-300 px-3 py-2 rounded-lg transition-colors" 
              onClick={fermerMenu}
            >
              Projets
            </Link>
            <Link 
              to="/competences" 
              className="text-sm text-gray-300 hover:text-cyan-300 px-3 py-2 rounded-lg transition-colors" 
              onClick={fermerMenu}
            >
              Compétences
            </Link>
            <Link 
              to="/formations" 
              className="text-sm text-gray-300 hover:text-cyan-300 px-3 py-2 rounded-lg transition-colors" 
              onClick={fermerMenu}
            >
              Formations
            </Link>
            <Link 
              to="/contact" 
              className="text-sm text-gray-300 hover:text-cyan-300 px-3 py-2 rounded-lg transition-colors" 
              onClick={fermerMenu}
            >
              Contact
            </Link>
            <a 
              href={cvUrl}
              download={cvFilename}
              className="text-sm font-semibold px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white inline-flex items-center gap-2" 
              onClick={fermerMenu}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Télécharger CV
            </a>
          </ConteneurPage>
        </div>
      )}
    </header>
  );
}
