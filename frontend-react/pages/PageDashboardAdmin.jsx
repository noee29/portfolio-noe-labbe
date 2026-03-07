import ConteneurPage from '../components/layout/ConteneurPage.jsx';

/**
 * PageDashboardAdmin - Dashboard admin
 */
export default function PageDashboardAdmin() {
  return (
    <div className="min-h-[calc(100vh-200px)] py-20">
      <ConteneurPage>
        <h1 className="text-3xl font-bold text-gray-100">
          Dashboard Admin
        </h1>
        <p className="text-gray-400 mt-2">
          Bienvenue dans l'espace d'administration.
        </p>
      </ConteneurPage>
    </div>
  );
}
