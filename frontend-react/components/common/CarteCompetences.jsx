/**
 * CarteCompetences - Composant réutilisable pour afficher les compétences
 * Responsive: Colonne simple sur mobile, 2 colonnes sur tablet, 4 sur desktop
 */
export default function CarteCompetences({ competences = [] }) {
  if (!competences || competences.length === 0) {
    return (
      <div className="text-center text-gray-400 py-12">
        Aucune compétence à afficher
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
      {competences.map((competence) => (
        <div
          key={competence.id}
          className="
            group relative overflow-hidden rounded-lg border border-cyan-500/20
            hover:border-cyan-500/50 transition-all duration-300
            bg-gradient-to-br from-slate-800/50 to-slate-900/50
            hover:shadow-lg hover:shadow-cyan-500/10 p-3 md:p-4
            text-center
          "
        >
          {/* Icône ou symbole */}
          {competence.icone && (
            <div className="text-2xl md:text-3xl mb-2 text-cyan-400">
              {competence.icone}
            </div>
          )}

          {/* Nom de la compétence */}
          <h3 className="text-sm md:text-base font-bold text-cyan-300 mb-1">
            {competence.nom}
          </h3>

          {/* Niveau de maîtrise (optionnel) */}
          {competence.niveau && (
            <div className="text-xs text-gray-400">
              Niveau: <span className="text-cyan-400 font-semibold">{competence.niveau}</span>
            </div>
          )}

          {/* Catégorie (optionnel) */}
          {competence.categorie && (
            <p className="text-xs text-gray-500 mt-2">
              {competence.categorie}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
