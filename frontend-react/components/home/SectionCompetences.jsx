import { useEffect, useState } from 'react';
import SectionPage from '../layout/SectionPage.jsx';
import { skillsApi } from '../../services/api.js';

/**
 * Section des compétences affichées sur la page Compétences.
 */
export default function SectionCompetences() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(function() {
    // Evite un setState après un démontage pendant une requête lente.
    let composantMonte = true;
    
    function chargerCompetences() {
      skillsApi.getAll()
        .then(function(reponse) {
          let competences = [];
          
          // Accepte les deux formats usuels: tableau direct ou { data: [] }.
          if (Array.isArray(reponse.data)) {
            competences = reponse.data;
          } else if (reponse.data && reponse.data.data && Array.isArray(reponse.data.data)) {
            competences = reponse.data.data;
          }
          
          if (composantMonte) {
            setSkills(competences);
          }
        })
        .catch(function() {
          setError('Impossible de charger les compétences');
        })
        .finally(function() {
          setLoading(false);
        });
    }
    
    chargerCompetences();
    
    return function() {
      composantMonte = false;
    };
  }, []);

  return (
    <SectionPage id="skills" eyebrow="Stack" title="Compétences principales">
      {loading && (
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-8 w-24 rounded-full bg-slate-700 border border-cyan-500/30 animate-pulse"/>
          ))}
        </div>
      )}
      {!loading && error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
      {!loading && !error && skills.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {skills.map((s, idx) => (
            <span key={s.id || idx} className="text-sm px-4 py-2 rounded-full bg-cyan-950/60 text-cyan-200 border border-cyan-500/40 font-medium hover:border-cyan-400/80 transition-colors">
              {s.name || s.title || 'Compétence'}
            </span>
          ))}
        </div>
      )}
      {!loading && !error && skills.length === 0 && (
        <div className="rounded-2xl border-2 border-dashed border-cyan-500/30 bg-slate-800/30 p-12 text-center">
          <p className="text-sm text-gray-400">En attente de contenu...</p>
        </div>
      )}
    </SectionPage>
  );
}
