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

  function getBackendBaseUrl() {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
    return apiUrl.replace('/api', '');
  }

  function getSkillIconUrl(skill) {
    if (!skill) {
      return '';
    }

    if (skill.icon_url) {
      if (skill.icon_url.startsWith('http://') || skill.icon_url.startsWith('https://')) {
        return skill.icon_url;
      }
      return getBackendBaseUrl() + skill.icon_url;
    }

    if (skill.icon) {
      if (skill.icon.startsWith('http://') || skill.icon.startsWith('https://')) {
        return skill.icon;
      }
      return getBackendBaseUrl() + '/storage/' + skill.icon;
    }

    return '';
  }

  function getCategory(skill) {
    if (skill && skill.category && skill.category.trim() !== '') {
      return skill.category;
    }
    return 'Autre';
  }

  function getDisplayName(skill) {
    if (skill && skill.name && skill.name.trim() !== '') {
      return skill.name;
    }
    return 'Compétence';
  }

  function getInitials(name) {
    if (!name || name.trim() === '') {
      return 'C';
    }

    const parts = name.trim().split(' ');
    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }

    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  }

  function groupSkillsByCategory(items) {
    const result = {};

    for (let i = 0; i < items.length; i++) {
      const skill = items[i];
      const category = getCategory(skill);

      if (!result[category]) {
        result[category] = [];
      }

      result[category].push(skill);
    }

    return result;
  }

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
          <div className="space-y-6">
            {Object.entries(groupSkillsByCategory(skills)).map(function(entry) {
              const categoryName = entry[0];
              const categorySkills = entry[1];

              return (
                <section key={categoryName} className="rounded-2xl border border-cyan-500/30 bg-slate-800/50 p-5">
                  <h3 className="mb-4 text-lg font-semibold text-cyan-200">{categoryName}</h3>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {categorySkills.map(function(skill) {
                      const iconUrl = getSkillIconUrl(skill);
                      const name = getDisplayName(skill);

                      return (
                        <article
                          key={skill.id}
                          className="flex min-h-[84px] items-center gap-3 rounded-xl border border-slate-600 bg-slate-900/70 p-3"
                        >
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-slate-200 p-1.5 shadow-sm">
                            {iconUrl !== '' && (
                              <img
                                src={iconUrl}
                                alt={name}
                                className="h-full w-full object-contain"
                              />
                            )}

                            {iconUrl === '' && (
                              <span className="text-sm font-bold text-cyan-200">{getInitials(name)}</span>
                            )}
                          </div>

                          <div>
                            <p className="font-medium text-slate-100">{name}</p>
                            <p className="text-xs text-slate-400">{categoryName}</p>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
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
