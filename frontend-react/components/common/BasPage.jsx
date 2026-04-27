import { Link, useLocation } from 'react-router-dom';
import ConteneurPage from '../layout/ConteneurPage.jsx';

/**
 * BasPage - Footer du site
 */
export default function BasPage() {
  const anneeActuelle = new Date().getFullYear();
  const location = useLocation();
  
  // Ne pas afficher le footer sur les pages admin
  if (location.pathname.startsWith('/admin')) {
    return null;
  }
  
  return (
    <footer className="relative border-t border-cyan-500/20 bg-[#0d1818]">
      <ConteneurPage className="py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Copyright */}
        <p className="text-xs text-gray-400 font-medium">
          © {anneeActuelle} Noé LABBÉ. Tous droits réservés.
        </p>
        
        {/* Liens de navigation */}
        <div className="flex items-center gap-6">
          <Link to="/projets" className="text-sm text-gray-400 hover:text-cyan-300 transition-colors font-medium">
            Projets
          </Link>
          <Link to="/competences" className="text-sm text-gray-400 hover:text-cyan-300 transition-colors font-medium">
            Compétences
          </Link>
          <Link to="/formations" className="text-sm text-gray-400 hover:text-cyan-300 transition-colors font-medium">
            Formations
          </Link>
          <Link to="/contact" className="text-sm text-gray-400 hover:text-cyan-300 transition-colors font-medium">
            Contact
          </Link>
        </div>
      </ConteneurPage>
    </footer>
  );
}
