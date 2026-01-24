import { useEffect, useState } from 'react';
import SectionPage from '../components/layout/SectionPage.jsx';
import ConteneurPage from '../components/layout/ConteneurPage.jsx';
import { skillsApi } from '../services/api.js';

/**
 * PageCompetences - Page des compétences
 */
export default function PageCompetences() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(function() {
    let composantMonte = true;
    
    function chargerCompetences() {
      skillsApi.getAll()
        .then(function(reponse) {
          let competences = [];
          
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
    <SectionPage 
      id="competences" 
      eyebrow="Stack" 
      title="Mes Compétences"
      subtitle="Voici les technologies et compétences que j'ai développées au cours de ma formation et mes projets."
    >
      <ConteneurPage>
        {loading && (
          <div className="flex flex-wrap gap-3">
            {Array.from({ length: 12 }).map(function(element, index) {
              return (
                <div 
                  key={index} 
                  className="h-10 w-28 rounded-full bg-slate-700 border border-cyan-500/30 animate-pulse"
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

        {!loading && !error && skills.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {skills.map(function(competence) {
              let nomCompetence = 'Compétence';
              if (competence.name) {
                nomCompetence = competence.name;
              }
              
              return (
                <div 
                  key={competence.id} 
                  className="px-5 py-3 rounded-full bg-cyan-950/60 text-cyan-200 border border-cyan-500/40 font-medium hover:border-cyan-400/80 transition-colors cursor-default"
                >
                  {nomCompetence}
                </div>
              );
            })}
          </div>
        )}

        {!loading && !error && skills.length === 0 && (
          <div className="rounded-2xl border-2 border-dashed border-cyan-500/30 bg-slate-800/30 p-12 text-center">
            <p className="text-gray-400">Aucune compétence pour le moment. À venir...</p>
          </div>
        )}
      </ConteneurPage>
    </SectionPage>
  );
}
