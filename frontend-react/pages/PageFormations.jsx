import { useEffect, useState } from 'react';
import SectionPage from '../components/layout/SectionPage.jsx';
import ConteneurPage from '../components/layout/ConteneurPage.jsx';
import { formationsApi } from '../services/api.js';

/**
 * ElementFormation - Item de formation dans la timeline
 */
function ElementFormation(props) {
  const formation = props.formation;
  
  let title = 'Formation';
  if (formation.title) {
    title = formation.title;
  } else if (formation.name) {
    title = formation.name;
  }
  
  let org = '';
  if (formation.school) {
    org = formation.school;
  } else if (formation.organization) {
    org = formation.organization;
  } else if (formation.institution) {
    org = formation.institution;
  }
  
  let start = '';
  if (formation.start_date) {
    start = formation.start_date;
  } else if (formation.start) {
    start = formation.start;
  } else if (formation.year) {
    start = formation.year;
  }
  
  let end = '';
  if (formation.end_date) {
    end = formation.end_date;
  } else if (formation.end) {
    end = formation.end;
  }

  return (
    <div className="relative pl-8">
      {/* Point de la timeline */}
      <span className="absolute left-0 top-2 h-4 w-4 rounded-full bg-cyan-500 ring-4 ring-slate-900" />
      
      {/* Carte formation */}
      <div className="rounded-lg border border-cyan-500/20 bg-slate-800/50 p-4 shadow-sm hover:shadow-md hover:shadow-cyan-500/10 transition-shadow backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-bold text-gray-100">{title}</h3>
          <span className="text-xs text-gray-400 font-medium whitespace-nowrap">
            {start}
            {end && ` — ${end}`}
          </span>
        </div>
        
        {/* Organisation */}
        {org && (
          <p className="mt-1 text-sm text-gray-400">{org}</p>
        )}
      </div>
    </div>
  );
}

/**
 * PageFormations - Page dédiée aux formations
 * 
 * Affiche les formations sous forme de timeline.
 */
export default function PageFormations() {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Charger les formations au montage du composant
  useEffect(function() {
    let composantMonte = true;
    
    function chargerFormations() {
      formationsApi.getAll()
        .then(function(reponse) {
          let donnees = [];
          
          if (Array.isArray(reponse.data)) {
            donnees = reponse.data;
          } else if (reponse.data && reponse.data.data && Array.isArray(reponse.data.data)) {
            donnees = reponse.data.data;
          }
          
          if (composantMonte) {
            setFormations(donnees);
          }
        })
        .catch(function() {
          setError('Impossible de charger les formations');
        })
        .finally(function() {
          setLoading(false);
        });
    }
    
    chargerFormations();
    
    return function() {
      composantMonte = false;
    };
  }, []);

  return (
    <SectionPage 
      id="formations" 
      eyebrow="Parcours" 
      title="Mes Formations"
      subtitle="Mon parcours académique et les formations que j'ai suivies."
    >
      <ConteneurPage>
        {/* État de chargement: afficher des cartes vides */}
        {loading && (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map(function(element, index) {
              return (
                <div 
                  key={index} 
                  className="h-20 rounded-lg bg-slate-800 border border-cyan-500/20 animate-pulse"
                />
              );
            })}
          </div>
        )}

        {/* État d'erreur: message rouge */}
        {!loading && error && (
          <div className="rounded-lg border border-red-500/50 bg-red-950/20 p-4">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Timeline de formations: afficher chaque formation */}
        {!loading && !error && formations.length > 0 && (
          <div className="space-y-6 border-l-2 border-cyan-500/50 pl-0">
            {formations.map(function(formation) {
              return (
                <ElementFormation 
                  key={formation.id} 
                  formation={formation} 
                />
              );
            })}
          </div>
        )}

        {/* Pas de contenu: si aucune formation */}
        {!loading && !error && formations.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-cyan-500/30 bg-slate-800/30 p-12 text-center">
            <p className="text-gray-400">Aucune formation pour le moment. À venir...</p>
          </div>
        )}
      </ConteneurPage>
    </SectionPage>
  );
}
