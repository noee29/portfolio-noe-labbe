import FormulaireAuth from '../components/admin/FormulaireAuth.jsx';
import ConteneurPage from '../components/layout/ConteneurPage.jsx';

/**
 * PageAdmin - Page d'authentification admin
 * 
 * Affiche le formulaire d'inscription/connexion pour accéder à l'espace admin.
 * Les utilisateurs peuvent créer un compte ou se connecter avec leurs identifiants.
 */
export default function PageAdmin() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-20">
      <ConteneurPage className="w-full">
        <div className="max-w-md mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-100 mb-2">
              Admin
            </h1>
          </div>

          {/* Formulaire d'authentification */}
          <FormulaireAuth />
        </div>
      </ConteneurPage>
    </div>
  );
}
