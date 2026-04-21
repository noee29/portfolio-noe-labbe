import ConteneurPage from './ConteneurPage.jsx';

/**
 * SectionPage - Section de page avec titre et effets de fond
 */
export default function SectionPage(props) {
  const id = props.id;
  const eyebrow = props.eyebrow;
  const title = props.title;
  const subtitle = props.subtitle;
  const children = props.children;
  let className = props.className;

  if (!className) {
    className = '';
  }

  const sectionClassName = 'py-16 sm:py-20 relative ' + className;

  let afficherEnTete = false;
  if (eyebrow || title || subtitle) {
    afficherEnTete = true;
  }

  return (
    <section id={id} className={sectionClassName}>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-20"/>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-emerald-500 rounded-full mix-blend-screen filter blur-3xl opacity-15" style={{animationDelay: '1s'}}/>
      </div>

      <ConteneurPage className="relative z-10">
        {afficherEnTete && (
          <div className="mb-10">
            {eyebrow && (
              <div className="text-xs tracking-widest uppercase text-cyan-300 font-semibold">{eyebrow}</div>
            )}
            {title && (
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-gray-100">{title}</h2>
            )}
            {subtitle && (
              <p className="mt-3 text-base sm:text-lg text-gray-300 max-w-2xl">{subtitle}</p>
            )}
          </div>
        )}

        {children}
      </ConteneurPage>
    </section> 
  );
}
