import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { skillsApi } from '../services/api.js';

const initialForm = {
  name: '',
  category: 'Informatique',
};

export default function PageAdminCompetences() {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [iconFile, setIconFile] = useState(null);

  const categoriesInfo = [
    'Informatique',
    'Frontend',
    'Backend',
    'Base de donnees',
    'DevOps',
    'Outils',
    'Autre',
  ];

  useEffect(function () {
    loadSkills();
  }, []);

  async function loadSkills() {
    setLoading(true);
    setError('');

    try {
      const response = await skillsApi.getAll();
      if (response && response.data) {
        setSkills(response.data);
      } else {
        setSkills([]);
      }
    } catch {
      setError('Impossible de charger les compétences.');
    }

    setLoading(false);
  }

  function resetForm() {
    setForm(initialForm);
    setEditingId(null);
    setIconFile(null);
  }

  function onChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setForm(function (old) {
      const next = {
        name: old.name,
        category: old.category,
      };

      if (name === 'name') next.name = value;
      if (name === 'category') next.category = value;

      return next;
    });
  }

  function startEdit(skill) {
    setEditingId(skill.id);
    setForm({
      name: skill.name || '',
      category: skill.category || 'Informatique',
    });
    setIconFile(null);
    setMessage('');
    setError('');
  }

  function buildPayload() {
    const payload = new FormData();
    payload.append('name', form.name.trim());

    if (form.category.trim() !== '') payload.append('category', form.category.trim());
    if (form.category.trim() === '') payload.append('category', 'Informatique');

    if (iconFile) {
      payload.append('icon', iconFile);
    }

    return payload;
  }

  async function onSubmit(event) {
    event.preventDefault();
    setMessage('');
    setError('');

    if (form.name.trim() === '') {
      setError('Le nom est obligatoire.');
      return;
    }

    const payload = buildPayload();
    setLoading(true);

    try {
      if (editingId !== null) {
        await skillsApi.update(editingId, payload);
        setMessage('Compétence modifiée.');
      }

      if (editingId === null) {
        await skillsApi.create(payload);
        setMessage('Compétence créée.');
      }

      resetForm();
      await loadSkills();
    } catch (err) {
      let apiMessage = '';
      if (err && err.response && err.response.data && err.response.data.message) {
        apiMessage = err.response.data.message;
      }

      if (apiMessage !== '') {
        setError(apiMessage);
      } else {
        setError('Erreur lors de la sauvegarde.');
      }
    }

    setLoading(false);
  }

  async function onDelete(skillId) {
    const ok = window.confirm('Supprimer cette compétence.');
    if (!ok) {
      return;
    }

    setLoading(true);
    setMessage('');
    setError('');

    try {
      await skillsApi.delete(skillId);
      setMessage('Compétence supprimée.');
      await loadSkills();
    } catch (err) {
      let apiMessage = '';
      if (err && err.response && err.response.data && err.response.data.message) {
        apiMessage = err.response.data.message;
      }

      if (apiMessage !== '') {
        setError(apiMessage);
      } else {
        setError('Erreur lors de la suppression.');
      }
    }

    setLoading(false);
  }

  let formTitle = 'Ajouter une compétence';
  let submitLabel = 'Ajouter';
  if (editingId !== null) {
    formTitle = 'Modifier une compétence';
    submitLabel = 'Enregistrer';
  }

  return (
    <section className="mx-auto w-full max-w-5xl p-4 sm:p-6">
      <div className="mb-6 flex items-center justify-between rounded-xl bg-slate-800 p-4">
        <h1 className="text-2xl font-bold text-cyan-300">Admin - Compétences</h1>
        <Link
          to="/admin/dashboard"
          className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-cyan-400"
        >
          Retour dashboard
        </Link>
      </div>

      <div className="mb-6 rounded-xl bg-slate-800 p-5">
        <h2 className="mb-3 text-lg font-semibold text-emerald-300">{formTitle}</h2>

        <form onSubmit={onSubmit} className="space-y-3">
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Nom"
            className="w-full rounded-lg border border-slate-500 bg-slate-900 px-3 py-2 text-slate-100"
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <input
              name="category"
              value={form.category}
              onChange={onChange}
              list="competences-categories"
              placeholder="Catégorie"
              className="w-full rounded-lg border border-slate-500 bg-slate-900 px-3 py-2 text-slate-100"
            />

            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={function (event) {
                const files = event.target.files;
                if (files && files.length > 0) {
                  const file = files[0];
                  const isAllowedType = file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/jpeg';
                  const isAllowedSize = file.size <= 2 * 1024 * 1024;

                  if (!isAllowedType) {
                    setError('Format icone invalide. Utilise PNG ou JPG.');
                    setIconFile(null);
                    return;
                  }

                  if (!isAllowedSize) {
                    setError('Icone trop lourde. Taille max: 2 Mo.');
                    setIconFile(null);
                    return;
                  }

                  setError('');
                  setIconFile(file);
                } else {
                  setIconFile(null);
                }
              }}
              className="w-full rounded-lg border border-slate-500 bg-slate-900 px-3 py-2 text-slate-100"
            />
          </div>

          <datalist id="competences-categories">
            {categoriesInfo.map(function (cat) {
              return <option key={cat} value={cat} />;
            })}
          </datalist>

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-slate-900 hover:bg-emerald-400"
            >
              {submitLabel}
            </button>

            {editingId !== null && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg bg-amber-400 px-4 py-2 font-semibold text-slate-900 hover:bg-amber-300"
              >
                Annuler
              </button>
            )}
          </div>
        </form>
      </div>

      {message !== '' && (
        <p className="mb-3 rounded-lg bg-emerald-200 p-2 text-sm text-emerald-900">{message}</p>
      )}

      {error !== '' && (
        <p className="mb-3 rounded-lg bg-red-200 p-2 text-sm text-red-900">{error}</p>
      )}

      <div className="rounded-xl bg-slate-800 p-5">
        <h2 className="mb-3 text-lg font-semibold text-fuchsia-300">Liste des compétences</h2>

        {loading && <p className="text-sm">Chargement...</p>}
        {!loading && skills.length === 0 && <p className="text-sm">Aucune compétence.</p>}

        {!loading && skills.length > 0 && (
          <div className="space-y-3">
            {skills.map(function (skill) {
              return (
                <article key={skill.id} className="rounded-lg border border-slate-600 bg-slate-900 p-3">
                  <h3 className="font-semibold text-cyan-200">{skill.name}</h3>
                  <p className="mt-1 text-sm text-slate-200">Catégorie: {skill.category || 'Non définie'}</p>
                  <p className="text-sm text-slate-200">Icône: {skill.icon ? 'Image uploadée' : 'Aucune'}</p>

                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={function () {
                        startEdit(skill);
                      }}
                      className="rounded-lg bg-blue-400 px-3 py-1 text-sm font-semibold text-slate-900 hover:bg-blue-300"
                    >
                      Modifier
                    </button>

                    <button
                      type="button"
                      onClick={function () {
                        onDelete(skill.id);
                      }}
                      className="rounded-lg bg-rose-400 px-3 py-1 text-sm font-semibold text-slate-900 hover:bg-rose-300"
                    >
                      Supprimer
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
