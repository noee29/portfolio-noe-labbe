import ConteneurPage from '../layout/ConteneurPage.jsx';

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
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <span className="inline-block text-xs font-bold tracking-widest uppercase text-cyan-300 bg-slate-900 px-4 py-2 rounded-full border border-cyan-700/60">
                Qui suis-je ?
              </span>
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-gray-100">
              Qui suis-je ?
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mb-8 leading-relaxed">
              Bonjour, je m’appelle Noé Labbé, j’ai 21 ans et je suis étudiant en L3 informatique à l'Université Catholique de Lille (EDN). Je souhaite m’orienter vers les métiers de la data.
            </p>
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
              <a href="#projects" className="px-8 py-4 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold hover:shadow-xl hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all">
                Voir mes projets
              </a>
              <a href="#contact" className="px-8 py-4 rounded-lg border-2 border-gray-600 text-gray-300 font-semibold hover:border-cyan-300 hover:text-cyan-200 hover:-translate-y-1 transition-all">
                Contact
              </a>
            </div>
          </div>
          
          <div className="relative w-full max-w-md aspect-[3/4] mx-auto lg:mx-0">
            <div className="absolute inset-0 rounded-2xl border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 overflow-hidden bg-slate-900">
              <img
                src="../images/20250228_185234.jpg"
                alt="Portrait"
                className="h-full w-full object-cover object-center"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </ConteneurPage>
    </section>
  );
}
