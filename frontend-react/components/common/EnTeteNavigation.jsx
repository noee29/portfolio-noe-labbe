import { useState } from 'react';
import ConteneurPage from '../layout/ConteneurPage.jsx';

export default function EnTeteNavigation() {
  const [open, setOpen] = useState(false);
  const navItems = [
    { href: '#projects', label: 'Projets' },
    { href: '#skills', label: 'Compétences' },
    { href: '#formations', label: 'Formations' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-cyan-500/20 shadow-lg shadow-cyan-500/10">
      <ConteneurPage className="flex items-center justify-between py-4">
        <a href="#hero" className="font-bold text-xl tracking-tight text-cyan-300">
          Portfolio
        </a>
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-gray-300 hover:text-cyan-300 px-3 py-2 rounded-lg transition-colors">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <a href="#contact" className="text-sm font-semibold px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white hover:shadow-lg hover:shadow-cyan-500/30 transition-all hover:scale-105">
            Me contacter
          </a>
        </div>
        <button onClick={() => setOpen(!open)} aria-label="Menu" className="md:hidden p-2 rounded-lg border border-cyan-500/30 hover:border-cyan-400 transition-colors">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-gray-300">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </ConteneurPage>
      {open && (
        <div className="md:hidden border-t border-cyan-500/20">
          <ConteneurPage className="py-3 flex flex-col gap-2">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-sm text-gray-300 hover:text-cyan-300 px-3 py-2 rounded-lg transition-colors" onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
            <a href="#contact" className="text-sm font-semibold px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white" onClick={() => setOpen(false)}>
              Me contacter
            </a>
          </ConteneurPage>
        </div>
      )}
    </header>
  );
}
