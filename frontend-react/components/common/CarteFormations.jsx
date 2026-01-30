/**
 * CarteFormations - Composant réutilisable pour afficher les formations
 * Responsive: Colonne simple sur mobile et tablette, 2 colonnes sur desktop
 */
export default function CarteFormations({ formations = [] }) {
  if (!formations || formations.length === 0) {
    return (
      <div className="text-center text-gray-400 py-12">
        Aucune formation à afficher
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
      {formations.map((formation) => (
        <div
          key={formation.id}
          className="
            group relative overflow-hidden rounded-lg border border-cyan-500/20
            hover:border-cyan-500/50 transition-all duration-300
            bg-gradient-to-br from-slate-800/50 to-slate-900/50
            hover:shadow-lg hover:shadow-cyan-500/10 p-5 md:p-6
          "
        >
          
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 md:gap-4 mb-3">
            <div>
              <h3 className="text-lg md:text-xl font-bold text-cyan-300 line-clamp-2">
                {formation.titre}
              </h3>
              <p className="text-sm md:text-base text-gray-400">
                {formation.etablissement}
              </p>
            </div>
            {formation.date && (
              <div className="text-xs md:text-sm text-gray-500 whitespace-nowrap">
                {formation.date}
              </div>
            )}
          </div>

          
          {formation.description && (
            <p className="text-sm md:text-base text-gray-400 mb-3 line-clamp-3">
              {formation.description}
            </p>
          )}


          {formation.specialite && (
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-300">
                {formation.specialite}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
