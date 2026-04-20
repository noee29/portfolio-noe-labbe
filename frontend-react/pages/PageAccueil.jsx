import SectionAccueil from '../components/home/SectionAccueil.jsx';
import ConteneurPage from '../components/layout/ConteneurPage.jsx';
import AnimationApparition from '../components/common/AnimationApparition.jsx';

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
          <AnimationApparition direction="haut">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-100 mb-4">
              Explorez mon portfolio
            </h2>
            <p className="text-gray-400 mb-8">
              Découvrez mes projets, compétences et formations à travers les pages dédiées.
            </p>
            <a
              href="https://github.com/noee29"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-lg border border-gray-600 px-5 py-3 text-gray-200 font-semibold hover:border-cyan-300 hover:text-cyan-200 hover:-translate-y-1 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
                aria-hidden="true"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.017 2 16.442 4.865 20.194 8.839 21.521c.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.699-3.6.782-4.36-1.737-4.36-1.737-.59-1.5-1.44-1.9-1.44-1.9-1.178-.805.09-.789.09-.789 1.302.092 1.987 1.34 1.987 1.34 1.157 1.984 3.034 1.41 3.773 1.078.117-.84.454-1.41.826-1.734-2.874-.327-5.895-1.439-5.895-6.404 0-1.414.504-2.57 1.33-3.476-.134-.327-.577-1.645.126-3.429 0 0 1.084-.349 3.55 1.327a12.37 12.37 0 0 1 3.23-.435c1.096.005 2.2.148 3.23.435 2.466-1.676 3.548-1.327 3.548-1.327.705 1.784.262 3.102.129 3.429.828.906 1.328 2.062 1.328 3.476 0 4.978-3.026 6.073-5.908 6.394.466.402.88 1.196.88 2.41 0 1.74-.015 3.142-.015 3.57 0 .268.18.58.688.482A10.018 10.018 0 0 0 22 12.017C22 6.484 17.523 2 12 2Z" />
              </svg>
              Voir mon GitHub
            </a>
          </div>
          </AnimationApparition>
        </ConteneurPage>
      </section>
    </div>
  );
}
