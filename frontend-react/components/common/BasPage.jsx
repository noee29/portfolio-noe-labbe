import ConteneurPage from '../layout/ConteneurPage.jsx';

export default function BasPage() {
  return (
    <footer className="relative border-t border-cyan-500/20 bg-[#0d1818]">
      <ConteneurPage className="py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
        <p className="text-xs text-gray-400 font-medium">© {new Date().getFullYear()} Portfolio</p>
        <div className="flex items-center gap-6">
          <a href="#projects" className="text-sm text-gray-400 hover:text-cyan-300 transition-colors font-medium">Projets</a>
          <a href="#skills" className="text-sm text-gray-400 hover:text-cyan-300 transition-colors font-medium">Compétences</a>
          <a href="#formations" className="text-sm text-gray-400 hover:text-cyan-300 transition-colors font-medium">Formations</a>
          <a href="#contact" className="text-sm text-gray-400 hover:text-cyan-300 transition-colors font-medium">Contact</a>
        </div>
      </ConteneurPage>
    </footer>
  );
}
