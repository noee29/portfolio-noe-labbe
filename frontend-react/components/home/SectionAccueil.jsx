import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import ConteneurPage from '../layout/ConteneurPage.jsx';

/**
 * Section page d'accueil avec présentation, disponibilités et langues.
 */
export default function SectionAccueil() {
  return (
    <section id="hero" className="relative overflow-hidden pt-20 sm:pt-32 pb-20 sm:pb-28">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-25 animate-pulse"/>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-500 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}/>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-400 rounded-full mix-blend-screen filter blur-3xl opacity-15"/>
      </div>
      
      <ConteneurPage className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
          {/* Texte : apparaît depuis la gauche */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="mb-6">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-cyan-300 bg-slate-900 px-4 py-2 rounded-full border border-cyan-700/60">
                Qui suis-je ?
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-gray-100">
              Qui suis-je ?
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mb-8 leading-relaxed">
              Bonjour, je m'appelle Noé LABBÉ, j'ai 21 ans.
              <br />
              Actuellement je suis en 3ème année de Licence Informatique parcours Data, à l'Université Catholique de Lille (EDN).
              <br />
              Je recherche une alternance de 2 ans dans le domaine de la data afin de réaliser mes 2 années de Master en alternance.
            </p>
            <motion.div
              className="flex flex-col sm:flex-row items-center lg:items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
            >
              <Link to="/projets" className="px-8 py-4 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold hover:shadow-xl hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all">
                Voir mes projets
              </Link>
              <Link to="/contact" className="px-8 py-4 rounded-lg border-2 border-gray-600 text-gray-300 font-semibold hover:border-cyan-300 hover:text-cyan-200 hover:-translate-y-1 transition-all">
                Contact
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Photo : apparaît depuis la droite */}
          <motion.div
            className="relative w-full max-w-md aspect-[3/4] mx-auto lg:mx-0"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            <div className="absolute inset-0 rounded-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 overflow-hidden bg-slate-900">
              <img
                src="../images/20250228_185234.jpg"
                alt="Portrait"
                className="h-full w-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-16 grid grid-cols-1 gap-8 max-w-6xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
        >
          <div className="rounded-2xl border border-emerald-800/50 bg-slate-900/60 p-7 sm:p-8">
            <h2 className="text-base sm:text-lg font-bold tracking-wide uppercase text-emerald-300 mb-5">
              Disponibilité alternance
            </h2>
            <ul className="space-y-3 text-base sm:text-lg text-gray-200">
              <li><span className="text-emerald-200 font-semibold">Date de début :</span> Septembre 2026</li>
              <li><span className="text-emerald-200 font-semibold">Durée :</span> 2 ans</li>
              <li><span className="text-emerald-200 font-semibold">Localisation :</span> Lille</li>
              <li><span className="text-emerald-200 font-semibold">Rythme :</span> 2 jours école / 3 jours entreprise</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-cyan-800/50 bg-slate-900/60 p-7 sm:p-8">
            <h2 className="text-base sm:text-lg font-bold tracking-wide uppercase text-cyan-300 mb-5">
              Ce qui me définit
            </h2>
            <ul className="space-y-3">
              <li className="px-4 py-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-100 text-base w-fit">Rigoureux</li>
              <li className="px-4 py-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-100 text-base w-fit">Organisé</li>
              <li className="px-4 py-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-100 text-base w-fit">Autonome</li>
              <li className="px-4 py-2 rounded-full border border-cyan-500/40 bg-cyan-500/10 text-cyan-100 text-base w-fit">Esprit d'équipe</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-indigo-800/50 bg-slate-900/60 p-7 sm:p-8">
            <h2 className="text-base sm:text-lg font-bold tracking-wide uppercase text-indigo-300 mb-5">
              Langues
            </h2>
            <ul className="space-y-3 text-base sm:text-lg text-gray-200">
              <li className="flex items-center justify-between rounded-lg border border-indigo-500/30 bg-indigo-500/5 px-4 py-3">
                <span className="text-indigo-200 font-semibold">Français</span>
                <span className="text-sm font-semibold rounded-full border border-indigo-400/40 bg-indigo-400/10 px-3 py-1 text-indigo-100">Langue maternelle</span>
              </li>
              <li className="flex items-center justify-between rounded-lg border border-indigo-500/30 bg-indigo-500/5 px-4 py-3">
                <span className="text-indigo-200 font-semibold">Anglais</span>
                <span className="text-sm font-semibold rounded-full border border-indigo-400/40 bg-indigo-400/10 px-3 py-1 text-indigo-100">B1</span>
              </li>
              <li className="flex items-center justify-between rounded-lg border border-indigo-500/30 bg-indigo-500/5 px-4 py-3">
                <span className="text-indigo-200 font-semibold">Espagnol</span>
                <span className="text-sm font-semibold rounded-full border border-indigo-400/40 bg-indigo-400/10 px-3 py-1 text-indigo-100">B1</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-teal-800/50 bg-slate-900/60 p-7 sm:p-8">
            <h2 className="text-base sm:text-lg font-bold tracking-wide uppercase text-teal-300 mb-5">
              Mes centres d'intérêt
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="rounded-lg border border-teal-500/30 bg-slate-950/50 overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Course a pied"
                  className="w-full h-44 object-cover"
                  loading="lazy"
                />
                <p className="text-base text-teal-100 px-4 py-3">Course à pied</p>
              </div>
              <div className="rounded-lg border border-teal-500/30 bg-slate-950/50 overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Football"
                  className="w-full h-44 object-cover"
                  loading="lazy"
                />
                <p className="text-base text-teal-100 px-4 py-3">Football</p>
              </div>
              <div className="rounded-lg border border-teal-500/30 bg-slate-950/50 overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/36227708/pexels-photo-36227708.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Padel"
                  className="w-full h-44 object-cover object-[50%_35%]"
                  loading="lazy"
                />
                <p className="text-base text-teal-100 px-4 py-3">Padel</p>
              </div>
            </div>
          </div>
        </motion.div>
      </ConteneurPage>
    </section>
  );
}
