import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionPage from '../components/layout/SectionPage.jsx';
import ConteneurPage from '../components/layout/ConteneurPage.jsx';
import { projectsApi } from '../services/api.js';

/**
 * CardProjet - Carte cliquable d'un projet
 */
function CardProjet(props) {
  var project = props.project;
  var title = project.title;
  if (!title) {
    title = 'Projet sans titre';
  }
  var description = project.description;
  if (!description) {
    description = '';
  }

  var technologies = [];
  if (Array.isArray(project.technologies)) {
    technologies = project.technologies;
  }

  return (
    <Link
      to={'/projets/' + project.id}
      className="block rounded-xl border border-cyan-500/20 bg-slate-800/50 p-6 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 backdrop-blur-sm"
    >
      <h3 className="text-lg font-bold text-gray-100 mb-3">{title}</h3>

      {description && (
        <p className="text-sm text-gray-400 line-clamp-3 mb-3">{description}</p>
      )}

      {technologies.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {technologies.slice(0, 5).map(function (tech, index) {
            return (
              <span key={index} className="text-xs px-2.5 py-1 rounded-full bg-cyan-950/60 text-cyan-200 font-medium border border-cyan-500/30">
                {tech}
              </span>
            );
          })}
        </div>
      )}

      <p className="text-xs text-cyan-400 mt-3">Voir le projet →</p>
    </Link>
  );
}

/**
 * PageProjets - Liste des projets en grille
 */
export default function PageProjets() {
  var [projects, setProjects] = useState([]);
  var [loading, setLoading] = useState(true);
  var [error, setError] = useState('');

  useEffect(function () {
    projectsApi.getAll()
      .then(function (reponse) {
        if (Array.isArray(reponse.data)) {
          setProjects(reponse.data);
        }
      })
      .catch(function () {
        setError('Impossible de charger les projets');
      })
      .finally(function () {
        setLoading(false);
      });
  }, []);

  return (
    <SectionPage
      id="projets"
      eyebrow="Portfolio"
      title="Mes Projets"
      subtitle="Découvrez les projets que j'ai réalisés durant mon parcours."
    >
      <ConteneurPage>
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="h-48 rounded-2xl bg-slate-800 border border-cyan-500/20 animate-pulse" />
            <div className="h-48 rounded-2xl bg-slate-800 border border-cyan-500/20 animate-pulse" />
            <div className="h-48 rounded-2xl bg-slate-800 border border-cyan-500/20 animate-pulse" />
          </div>
        )}

        {!loading && error && (
          <div className="rounded-lg border border-red-500/50 bg-red-950/20 p-4">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(function (projet) {
              return <CardProjet key={projet.id} project={projet} />;
            })}
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-cyan-500/30 bg-slate-800/30 p-12 text-center">
            <p className="text-gray-400">Aucun projet pour le moment. À venir...</p>
          </div>
        )}
      </ConteneurPage>
    </SectionPage>
  );
}
