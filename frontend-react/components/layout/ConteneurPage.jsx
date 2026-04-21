/**
 * ConteneurPage - Conteneur de largeur maximale pour le contenu
 */
export default function ConteneurPage(props) {
  const children = props.children;
  let className = props.className;
  
  if (!className) {
    className = '';
  }
  
  const fullClassName = 'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ' + className;
  
  return (
    <div className={fullClassName}>
      {children}
    </div>
  );
}
