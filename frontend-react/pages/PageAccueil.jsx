import SectionAccueil from '../components/home/SectionAccueil.jsx';
import ConteneurPage from '../components/layout/ConteneurPage.jsx';

/**
 * PageAccueil - Page d'accueil (présentation du profil)
 * 
 * Affiche la présentation personnelle avec photo et description.
 * C'est la landing page du portfolio.
 */
export default function PageAccueil() {
  return (
    <div>
      <SectionAccueil />
      
      {/* Section optionnelle pour les prochaines étapes */}
      <section className="py-16 sm:py-20">
        <ConteneurPage>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-100 mb-4">
              Explorez mon portfolio
            </h2>
            <p className="text-gray-400 mb-8">
              Découvrez mes projets, compétences et formations à travers les pages dédiées.
            </p>
          </div>
        </ConteneurPage>
      </section>
    </div>
  );
}
