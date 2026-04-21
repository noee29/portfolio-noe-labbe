/**
 * Bouton responsive réutilisable
 * S'adapte automatiquement à la taille de l'écran
 */
export default function BoutonResponsif({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  disabled = false,
  className = '',
  ...props
}) {
  // Tailles de padding basées sur la taille
  const tailles = {
    sm: 'px-3 py-1.5 text-xs md:text-sm',
    md: 'px-4 py-2 text-sm md:text-base',
    lg: 'px-6 py-3 text-base md:text-lg',
  };

  // Variantes de couleur
  const variantes = {
    primary: `
      bg-cyan-600 hover:bg-cyan-500 text-white
      hover:shadow-lg hover:shadow-cyan-500/30
      disabled:bg-gray-600 disabled:cursor-not-allowed
    `,
    secondary: `
      border border-cyan-500/50 text-cyan-300 hover:text-cyan-200
      hover:border-cyan-500 hover:bg-cyan-500/10
      disabled:border-gray-500 disabled:text-gray-500 disabled:cursor-not-allowed
    `,
    tertiary: `
      text-cyan-400 hover:text-cyan-300
      hover:bg-cyan-500/10
      disabled:text-gray-500 disabled:cursor-not-allowed
    `,
  };

  const largeurClasse = fullWidth ? 'w-full md:w-auto' : '';

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        rounded-lg font-semibold transition-all duration-300
        inline-flex items-center justify-center gap-2
        hover:scale-105 disabled:hover:scale-100
        ${tailles[size]}
        ${variantes[variant]}
        ${largeurClasse}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
