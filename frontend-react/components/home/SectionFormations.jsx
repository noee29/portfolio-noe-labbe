import { useEffect, useState } from 'react';
import SectionPage from '../layout/SectionPage.jsx';
import { formationsApi } from '../../services/api.js';

function ElementFormation({ f }) {
  const title = f.title || f.name || 'Formation';
  const org = f.school || f.organization || f.institution || '';
  const start = f.start_date || f.start || f.year || '';
  const end = f.end_date || f.end || '';

  return (
    <div className="relative pl-8">
      <span className="absolute left-0 top-2 h-4 w-4 rounded-full bg-cyan-500 ring-4 ring-slate-900"/>
      <div className="rounded-lg border border-cyan-500/20 bg-slate-800/50 p-4 shadow-sm hover:shadow-md hover:shadow-cyan-500/10 transition-shadow backdrop-blur-sm">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-bold text-gray-100">{title}</h3>
          <span className="text-xs text-gray-400 font-medium">{start}{end ? ` — ${end}` : ''}</span>
        </div>
        {org && (
          <p className="mt-1 text-sm text-gray-400">{org}</p>
        )}
      </div>
    </div>
  );
}

export default function SectionFormations() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    formationsApi.getAll()
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : (res.data?.data || []);
        if (mounted) setItems(data.slice(0, 5));
      })
      .catch(() => setError('Impossible de charger les formations'))
      .finally(() => setLoading(false));
    return () => { mounted = false; };
  }, []);

  return (
    <SectionPage id="formations" eyebrow="Parcours" title="Formations">
      {loading && (
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-20 rounded-lg bg-slate-800 border border-cyan-500/20 animate-pulse"/>
          ))}
        </div>
      )}
      {!loading && error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
      {!loading && !error && items.length > 0 && (
        <div className="space-y-6 border-l-2 border-cyan-500/50 pl-0">
          {items.map((f, idx) => (
            <ElementFormation key={f.id || idx} f={f} />
          ))}
        </div>
      )}
      {!loading && !error && items.length === 0 && (
        <div className="rounded-2xl border-2 border-dashed border-cyan-500/30 bg-slate-800/30 p-12 text-center">
          <p className="text-sm text-gray-400">En attente de contenu...</p>
        </div>
      )}
    </SectionPage>
  );
}
