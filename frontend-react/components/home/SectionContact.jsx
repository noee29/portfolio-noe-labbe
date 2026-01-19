import SectionPage from '../layout/SectionPage.jsx';

export default function SectionContact() {
  return (
    <SectionPage id="contact" eyebrow="Contact" title="Formulaire de contact">
      <div className="rounded-2xl border-2 border-cyan-500/30 bg-slate-800/70 p-6 sm:p-8 backdrop-blur-sm">
        <div className="h-24 flex items-center justify-center">
          <p className="text-sm text-gray-400">En attente de contenu...</p>
        </div>
      </div>
    </SectionPage>
  );
}
