import { useEffect, useState } from 'react';
import SectionPage from '../layout/SectionPage.jsx';
import { projectsApi } from '../../services/api.js';

function CardProjet({ project }) {
  const title = project.title || project.name || 'Projet';
  const description = project.description || project.summary || '';
  const link = project.url || project.link || project.repository_url || null;

  return (
    <div className="group rounded-xl border border-cyan-500/20 bg-slate-800/50 p-5 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 backdrop-blur-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-lg font-bold text-gray-100">{title}</h3>
        {link && (
          <a href={link} target="_blank" rel="noreferrer" className="text-xs px-2 py-1 rounded-md bg-cyan-950/40 hover:bg-cyan-900 text-cyan-200 hover:text-cyan-100 font-medium transition-colors">Voir</a>
        )}
      </div>
      {description && (
        <p className="mt-2 text-sm text-gray-400 line-clamp-3">{description}</p>
      )}
      {Array.isArray(project.tags) && project.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.slice(0, 5).map((t, idx) => {
            // Uniformise l'affichage quel que soit le format reçu (string ou objet tag).
            let tagText = '';
            if (typeof t === 'string') {
              tagText = t;
            } else if (t && t.name) {
              tagText = t.name;
            }
            
            return (
              <span key={idx} className="text-xs px-2.5 py-1 rounded-full bg-cyan-950/60 text-cyan-200 font-medium border border-cyan-500/30">
                {tagText}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * Section des projets sélectionnés pour la page d'accueil.
 */
export default function SectionProjets() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(function() {
    // Evite un setState après un démontage pendant une requête lente.
    let composantMonte = true;
    
    function chargerProjets() {
      projectsApi.getAll()
        .then(function(reponse) {
          let projets = [];
          
          // Accepte les deux formats usuels: tableau direct ou { data: [] }.
          if (Array.isArray(reponse.data)) {
            projets = reponse.data;
          } else if (reponse.data && reponse.data.data && Array.isArray(reponse.data.data)) {
            projets = reponse.data.data;
          }
          
          const sixPremiers = projets.slice(0, 6);
          
          if (composantMonte) {
            setProjects(sixPremiers);
          }
        })
        .catch(function() {
          setError("Impossible de charger les projets");
        })
        .finally(function() {
          setLoading(false);
        });
    }
    
    chargerProjets();
    
    return function() {
      composantMonte = false;
    };
  }, []);

  return (
    <SectionPage id="projects" eyebrow="Portfolio" title="Projets sélectionnés">
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-40 rounded-2xl bg-slate-800 border border-cyan-500/20 animate-pulse"/>
          ))}
        </div>
      )}
      {!loading && error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
      {!loading && !error && projects.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <CardProjet key={p.id || p._id || p.slug || Math.random()} project={p} />
          ))}
        </div>
      )}
      {!loading && !error && projects.length === 0 && (
        <div className="rounded-2xl border-2 border-dashed border-cyan-500/30 bg-slate-800/30 p-12 text-center">
          <p className="text-sm text-gray-400">En attente de contenu...</p>
        </div>
      )}
    </SectionPage>
  );
}
