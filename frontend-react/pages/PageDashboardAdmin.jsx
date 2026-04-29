import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authApi } from '../services/api.js';

/**
 * Dashboard admin principal.
 *
 * Contient aussi l'action de déconnexion.
 */
export default function PageDashboardAdmin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const sections = [
    {
      title: 'Projets',
      description: 'Gérer les projets, documents et informations principales.',
      to: '/admin/projets',
      action: 'Ouvrir',
    },
    {
      title: 'Compétences',
      description: 'Ajouter, modifier et organiser les compétences.',
      to: '/admin/competences',
      action: 'Ouvrir',
    },
    {
      title: 'Formations',
      description: 'Mettre à jour le parcours de formation.',
      to: '/admin/formations',
      action: 'Ouvrir',
    },
    {
      title: 'Contacts',
      description: 'Consulter les messages reçus depuis le formulaire.',
      to: '/admin/contacts',
      action: 'Ouvrir',
    },
    {
      title: 'CV',
      description: 'Gérer le fichier CV disponible au téléchargement.',
      to: '/admin/cv',
      action: 'Ouvrir',
    },
  ];

  /**
  * Déconnecte l'admin côté API puis nettoie le token.
   */
  async function handleLogout() {
    setLoading(true);
    setError('');

    try {
      // Déconnexion côté backend.
      await authApi.logout();
    } catch {
      // Même si l'API échoue, on supprime la session locale.
    }

    // Déconnexion côté frontend.
    localStorage.removeItem('authToken');
    setLoading(false);
    navigate('/admin');
  }

  return (
    <section className="mx-auto w-full max-w-6xl p-4 sm:p-6">
      <div className="rounded-2xl border border-slate-700 bg-slate-900/80 p-6 shadow-lg shadow-black/20">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-bold text-cyan-300">Dashboard Admin</h1>
          <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            className="rounded-lg bg-rose-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-rose-300"
          >
            Déconnexion
          </button>
        </div>

        {error !== '' && <p className="mt-3 rounded-lg bg-red-200 p-2 text-sm text-red-900">{error}</p>}
      </div>

      <nav className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sections.map(function (section) {
          return (
            <article
              key={section.to}
              className="rounded-xl border border-slate-700 bg-slate-900/70 p-5 transition-colors hover:border-cyan-500"
            >
              <h2 className="text-lg font-semibold text-slate-100">{section.title}</h2>
              <p className="mt-2 text-sm text-slate-300">{section.description}</p>
              <div className="mt-4">
                <Link
                  to={section.to}
                  className="inline-flex rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
                >
                  {section.action}
                </Link>
              </div>
            </article>
          );
        })}
      </nav>
    </section>
  );
}
