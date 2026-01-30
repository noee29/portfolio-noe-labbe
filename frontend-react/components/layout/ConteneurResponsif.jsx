/**
 * Conteneur responsif flexible
 */
export default function ConteneurResponsif({ 
  children, 
  direction = 'row', 
  className = '' 
}) {
  const directionClass = direction === 'row' 
    ? 'flex-col lg:flex-row' 
    : 'flex-col';

  return (
    <div className={`flex ${directionClass} gap-4 md:gap-6 ${className}`}>
      {children}
    </div>
  );
}
