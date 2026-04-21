/**
 * CarteProjets - Composant réutilisable pour afficher les projets
 * Responsive: Colonne simple sur mobile, 2 colonnes sur tablet, 3 sur desktop
 */
export default function CarteProjets({ projets = [] }) {
  if (!projets || projets.length === 0) {
    return (
      <div className="text-center text-gray-400 py-12">
        Aucun projet à afficher
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {projets.map((projet) => (
        <div
          key={projet.id}
          className="
            group relative overflow-hidden rounded-lg border border-cyan-500/20
            hover:border-cyan-500/50 transition-all duration-300
            bg-gradient-to-br from-slate-800/50 to-slate-900/50
            hover:shadow-lg hover:shadow-cyan-500/10 p-5 md:p-6
            flex flex-col h-full
          "
        >
          
          {projet.image && (
            <div className="relative w-full h-40 md:h-48 -mx-5 md:-mx-6 -mt-5 md:-mt-6 mb-4 overflow-hidden rounded-t-lg">
              <img
                src={projet.image}
                alt={projet.titre}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          )}

          
          <h3 className="text-lg md:text-xl font-bold text-cyan-300 mb-2 line-clamp-2">
            {projet.titre}
          </h3>
          <p className="text-sm md:text-base text-gray-400 mb-4 flex-grow line-clamp-3">
            {projet.description}
          </p>

          
          {projet.technologies && projet.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {projet.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="text-xs px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          
          {projet.lien && (
            <a
              href={projet.lien}
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-auto inline-flex items-center gap-2 text-sm
                text-cyan-400 hover:text-cyan-300
                font-semibold transition-colors
              "
            >
              Voir le projet
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.658 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
