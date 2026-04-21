/**
 * Grille responsive générique
 * Adapte automatiquement le nombre de colonnes selon l'écran
 */
export default function GrilleResponsive({
  children,
  cols = { mobile: 1, tablet: 2, desktop: 3 },
  gap = 'gap-4 md:gap-6',
  className = '',
}) {
  // Construire les classes de grille
  const gridCols = `
    grid-cols-${cols.mobile}
    md:grid-cols-${cols.tablet}
    lg:grid-cols-${cols.desktop}
  `;

  return (
    <div className={`grid ${gridCols} ${gap} ${className}`}>
      {children}
    </div>
  );
}
