import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formationsApi } from '../services/api.js';

const initialForm = {
  school: '',
  degree: '',
  field: '',
  start_date: '',
  end_date: '',
  description: '',
};

export default function PageAdminFormations() {
  const [formations, setFormations] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(function () {
    loadFormations();
  }, []);

  async function loadFormations() {
    setLoading(true);
    setError('');

    try {
      const response = await formationsApi.getAll();
      if (response && response.data) {
        setFormations(response.data);
      } else {
        setFormations([]);
      }
    } catch {
      setError('Impossible de charger les formations.');
    }

    setLoading(false);
  }

  function resetForm() {
    setForm(initialForm);
    setEditingId(null);
  }

  function onChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    setForm(function (old) {
      const next = {
        school: old.school,
        degree: old.degree,
        field: old.field,
        start_date: old.start_date,
        end_date: old.end_date,
        description: old.description,
      };

      if (name === 'school') next.school = value;
      if (name === 'degree') next.degree = value;
      if (name === 'field') next.field = value;
      if (name === 'start_date') next.start_date = value;
      if (name === 'end_date') next.end_date = value;
      if (name === 'description') next.description = value;

      return next;
    });
  }

  function formatDateForInput(value) {
    if (!value) {
      return '';
    }
    if (value.length >= 10) {
      return value.substring(0, 10);
    }
    return value;
  }

  function startEdit(formation) {
    setEditingId(formation.id);

    let school = '';
    if (formation.school) school = formation.school;

    let degree = '';
    if (formation.degree) degree = formation.degree;

    let field = '';
    if (formation.field) field = formation.field;

    let startDate = '';
    if (formation.start_date) startDate = formatDateForInput(formation.start_date);

    let endDate = '';
    if (formation.end_date) endDate = formatDateForInput(formation.end_date);

    let description = '';
    if (formation.description) description = formation.description;

    setForm({
      school: school,
      degree: degree,
      field: field,
      start_date: startDate,
      end_date: endDate,
      description: description,
    });

    setMessage('');
    setError('');
  }

  function buildPayload() {
    const payload = {
      school: form.school.trim(),
      degree: null,
      field: null,
      start_date: null,
      end_date: null,
      description: null,
    };

    if (form.degree.trim() !== '') {
      payload.degree = form.degree.trim();
    }

    if (form.field.trim() !== '') {
      payload.field = form.field.trim();
    }

    if (form.start_date.trim() !== '') {
      payload.start_date = form.start_date;
    }

    if (form.end_date.trim() !== '') {
      payload.end_date = form.end_date;
    }

    if (form.description.trim() !== '') {
      payload.description = form.description.trim();
    }

    return payload;
  }

  async function onSubmit(event) {
    event.preventDefault();
    setMessage('');
    setError('');

    if (form.school.trim() === '') {
      setError('Le nom de l\'école est obligatoire.');
      return;
    }

    if (form.start_date !== '' && form.end_date !== '' && form.end_date < form.start_date) {
      setError('La date de fin ne peut pas être avant la date de début.');
      return;
    }

    const payload = buildPayload();
    setLoading(true);

    try {
      if (editingId !== null) {
        await formationsApi.update(editingId, payload);
        setMessage('Formation modifiée.');
      }

      if (editingId === null) {
        await formationsApi.create(payload);
        setMessage('Formation créée.');
      }

      resetForm();
      await loadFormations();
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

  async function onDelete(formationId) {
    const ok = window.confirm('Supprimer cette formation.');
    if (!ok) {
      return;
    }

    setLoading(true);
    setMessage('');
    setError('');

    try {
      await formationsApi.delete(formationId);
      setMessage('Formation supprimée.');
      await loadFormations();
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

  let formTitle = 'Ajouter une formation';
  let submitLabel = 'Ajouter';
  if (editingId !== null) {
    formTitle = 'Modifier une formation';
    submitLabel = 'Enregistrer';
  }

  return (
    <section className="mx-auto w-full max-w-5xl p-4 sm:p-6">
      <div className="mb-6 flex items-center justify-between rounded-xl bg-slate-800 p-4">
        <h1 className="text-2xl font-bold text-cyan-300">Admin - Formations</h1>
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
            name="school"
            value={form.school}
            onChange={onChange}
            placeholder="École (obligatoire)"
            className="w-full rounded-lg border border-slate-500 bg-slate-900 px-3 py-2 text-slate-100"
          />

          <div className="grid gap-3 sm:grid-cols-2">
            <input
              name="degree"
              value={form.degree}
              onChange={onChange}
              placeholder="Diplôme"
              className="w-full rounded-lg border border-slate-500 bg-slate-900 px-3 py-2 text-slate-100"
            />

            <input
              name="field"
              value={form.field}
              onChange={onChange}
              placeholder="Domaine"
              className="w-full rounded-lg border border-slate-500 bg-slate-900 px-3 py-2 text-slate-100"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="date"
              name="start_date"
              value={form.start_date}
              onChange={onChange}
              max={form.end_date !== '' ? form.end_date : undefined}
              className="w-full rounded-lg border border-slate-500 bg-slate-900 px-3 py-2 text-slate-100"
            />

            <input
              type="date"
              name="end_date"
              value={form.end_date}
              onChange={onChange}
              min={form.start_date !== '' ? form.start_date : undefined}
              className="w-full rounded-lg border border-slate-500 bg-slate-900 px-3 py-2 text-slate-100"
            />
          </div>

          <textarea
            name="description"
            value={form.description}
            onChange={onChange}
            rows={4}
            placeholder="Description"
            className="w-full rounded-lg border border-slate-500 bg-slate-900 px-3 py-2 text-slate-100"
          />

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
        <h2 className="mb-3 text-lg font-semibold text-fuchsia-300">Liste des formations</h2>

        {loading && <p className="text-sm">Chargement...</p>}
        {!loading && formations.length === 0 && <p className="text-sm">Aucune formation.</p>}

        {!loading && formations.length > 0 && (
          <div className="space-y-3">
            {formations.map(function (formation) {
              let school = '';
              if (formation.school) school = formation.school;

              let degree = 'Non défini';
              if (formation.degree) degree = formation.degree;

              let field = 'Non défini';
              if (formation.field) field = formation.field;

              let startDate = 'Non définie';
              if (formation.start_date) startDate = formatDateForInput(formation.start_date);

              let endDate = 'Non définie';
              if (formation.end_date) endDate = formatDateForInput(formation.end_date);

              let description = 'Aucune description';
              if (formation.description) description = formation.description;

              return (
                <article key={formation.id} className="rounded-lg border border-slate-600 bg-slate-900 p-3">
                  <h3 className="font-semibold text-cyan-200">{school}</h3>
                  <p className="mt-1 text-sm text-slate-200">Diplôme: {degree}</p>
                  <p className="text-sm text-slate-200">Domaine: {field}</p>
                  <p className="text-sm text-slate-200">Début: {startDate}</p>
                  <p className="text-sm text-slate-200">Fin: {endDate}</p>
                  <p className="mt-1 text-sm text-slate-300">{description}</p>

                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={function () {
                        startEdit(formation);
                      }}
                      className="rounded-lg bg-blue-400 px-3 py-1 text-sm font-semibold text-slate-900 hover:bg-blue-300"
                    >
                      Modifier
                    </button>

                    <button
                      type="button"
                      onClick={function () {
                        onDelete(formation.id);
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
