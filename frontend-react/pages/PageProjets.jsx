import { useEffect, useState } from 'react';
import SectionPage from '../components/layout/SectionPage.jsx';
import ConteneurPage from '../components/layout/ConteneurPage.jsx';
import { projectsApi } from '../services/api.js';

/**
 * CardProjet - Carte d'affichage d'un projet
 */
function CardProjet(props) {
  const project = props.project;
  
  let title = 'Projet sans titre';
  if (project.title) {
    title = project.title;
  } else if (project.name) {
    title = project.name;
  }
  
  let description = '';
  if (project.description) {
    description = project.description;
  } else if (project.summary) {
    description = project.summary;
  }
  
  let link = null;
  if (project.url) {
    link = project.url;
  } else if (project.link) {
    link = project.link;
  } else if (project.repository_url) {
    link = project.repository_url;
  }

  return (
    <div className="rounded-xl border border-cyan-500/20 bg-slate-800/50 p-6 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 backdrop-blur-sm">
      {/* Titre et lien */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-lg font-bold text-gray-100">{title}</h3>
        {link && (
          <a 
            href={link} 
            target="_blank" 
            rel="noreferrer" 
            className="text-xs px-3 py-1 rounded-md bg-cyan-950/40 hover:bg-cyan-900 text-cyan-200 hover:text-cyan-100 font-medium transition-colors"
          >
            Voir
          </a>
        )}
      </div>

      {/* Description */}
      {description && (
        <p className="text-sm text-gray-400 line-clamp-3 mb-3">{description}</p>
      )}

      {/* Tags/Technologies */}
      {Array.isArray(project.tags) && project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 5).map(function(tag, index) {
            // Déterminer le texte à afficher pour ce tag
            let tagText = '';
            
            // Si le tag est juste une chaîne de texte
            if (typeof tag === 'string') {
              tagText = tag;
            } 
            // Si le tag est un objet avec une propriété name
            else if (tag && tag.name) {
              tagText = tag.name;
            }
            
            return (
              <span 
                key={index} 
                className="text-xs px-2.5 py-1 rounded-full bg-cyan-950/60 text-cyan-200 font-medium border border-cyan-500/30"
              >
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
 * PageProjets - Page dédiée aux projets
 * 
 * Affiche la liste complète des projets sous forme de grille.
 */
export default function PageProjets() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(function() {
    let composantMonte = true;
    
    function chargerProjets() {
      projectsApi.getAll()
        .then(function(reponse) {
          let projets = [];
          
          if (Array.isArray(reponse.data)) {
            projets = reponse.data;
          } else if (reponse.data && reponse.data.data && Array.isArray(reponse.data.data)) {
            projets = reponse.data.data;
          }
          
          if (composantMonte) {
            setProjects(projets);
          }
        })
        .catch(function() {
          setError('Impossible de charger les projets');
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
    <SectionPage 
      id="projets" 
      eyebrow="Portfolio" 
      title="Mes Projets"
      subtitle="Découvrez les projets que j'ai réalisés durant mon parcours."
    >
      <ConteneurPage>
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map(function(element, index) {
              return (
                <div 
                  key={index} 
                  className="h-48 rounded-2xl bg-slate-800 border border-cyan-500/20 animate-pulse"
                />
              );
            })}
          </div>
        )}

        {!loading && error && (
          <div className="rounded-lg border border-red-500/50 bg-red-950/20 p-4">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map(function(projet) {
              let cle = projet.id;
              if (!cle) {
                cle = projet._id;
              }
              if (!cle) {
                cle = projet.slug;
              }
              if (!cle) {
                cle = Math.random();
              }
              
              return (
                <CardProjet 
                  key={cle} 
                  project={projet} 
                />
              );
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
