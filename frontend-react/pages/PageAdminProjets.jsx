import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectsApi } from '../services/api.js';

const initialForm = {
  title: '',
  description: '',
  technologies: '',
  github_link: '',
  demo_link: '',
  featured: false,
};

/**
 * Page d'administration des projets (CRUD + gestion des medias).
 */
export default function PageAdminProjets() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [mediaFiles, setMediaFiles] = useState([]);

  useEffect(function () {
    loadProjects();
  }, []);

  /**
   * Charge les projets admin depuis l'API.
   */
  async function loadProjects() {
    setLoading(true);
    setError('');
    try {
      const response = await projectsApi.getAll();
      if (response && response.data) setProjects(response.data);
      if (!response || !response.data) setProjects([]);
    } catch {
      setError('Impossible de charger les projets.');
    }
    setLoading(false);
  }

  /**
  * Réinitialise le formulaire, l'édition et les médias.
   */
  function resetForm() {
    setForm(initialForm);
    setEditingId(null);
    setMediaFiles([]);
  }

  /**
  * Met à jour les champs texte du formulaire.
   */
  function onTextChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setForm(function (old) {
      const next = {
        title: old.title,
        description: old.description,
        technologies: old.technologies,
        github_link: old.github_link,
        demo_link: old.demo_link,
        featured: old.featured,
      };
      if (name === 'title') next.title = value;
      if (name === 'description') next.description = value;
      if (name === 'technologies') next.technologies = value;
      if (name === 'github_link') next.github_link = value;
      if (name === 'demo_link') next.demo_link = value;
      return next;
    });
  }

  /**
  * Met à jour l'état du flag "mis en avant".
   */
  function onFeaturedChange(event) {
    const checked = event.target.checked;
    setForm(function (old) {
      return {
        title: old.title,
        description: old.description,
        technologies: old.technologies,
        github_link: old.github_link,
        demo_link: old.demo_link,
        featured: checked,
      };
    });
  }

  /**
  * Pré-remplit le formulaire pour modifier un projet.
   */
  function startEdit(project) {
    let technologiesText = '';
    if (Array.isArray(project.technologies)) technologiesText = project.technologies.join(', ');
    setEditingId(project.id);
    setForm({
      title: project.title || '',
      description: project.description || '',
      technologies: technologiesText,
      github_link: project.github_link || '',
      demo_link: project.demo_link || '',
      featured: Boolean(project.featured),
    });
    setMessage('');
    setError('');
  }

  /**
  * Construit le payload JSON pour création/mise à jour.
   */
  function buildPayload() {
    const title = form.title.trim();
    const description = form.description.trim();
    const payload = {
      title: title,
      description: description,
      technologies: [],
      featured: form.featured,
    };

    if (form.github_link.trim() !== '') payload.github_link = form.github_link.trim();
    if (form.github_link.trim() === '') payload.github_link = null;
    if (form.demo_link.trim() !== '') payload.demo_link = form.demo_link.trim();
    if (form.demo_link.trim() === '') payload.demo_link = null;

    const techParts = form.technologies.split(',');
    let techIndex = 0;
    for (let i = 0; i < techParts.length; i++) {
      const tech = techParts[i].trim();
      if (tech !== '') {
        payload.technologies.push(tech);
        techIndex = techIndex + 1;
      }
    }

    return payload;
  }

  /**
  * Vérifie si une URL est valide en http/https.
   */
  function isValidHttpUrl(value) {
    try {
      const url = new URL(value);
      if (url.protocol === 'http:' || url.protocol === 'https:') {
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  /**
  * Enregistre le projet et uploade les médias si présents.
   */
  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    setError('');

    const title = form.title.trim();
    const description = form.description.trim();
    if (title === '' || description === '') {
      setError('Titre et description sont obligatoires.');
      return;
    }

    if (form.github_link.trim() !== '' && !isValidHttpUrl(form.github_link.trim())) {
      setError('Le lien GitHub doit être une URL valide (http ou https).');
      return;
    }

    if (form.demo_link.trim() !== '' && !isValidHttpUrl(form.demo_link.trim())) {
      setError('Le lien Démo doit être une URL valide (http ou https).');
      return;
    }

    const payload = buildPayload();
    setLoading(true);

    try {
      let projectId = null;

      if (editingId !== null) {
        await projectsApi.update(editingId, payload);
        projectId = editingId;
        setMessage('Projet modifié.');
      }

      if (editingId === null) {
        const response = await projectsApi.create(payload);
        if (response && response.data && response.data.id) projectId = response.data.id;
        setMessage('Projet créé.');
      }

      if (projectId !== null && mediaFiles.length > 0) {
        const mediaPayload = new FormData();
        for (let i = 0; i < mediaFiles.length; i++) mediaPayload.append('files[]', mediaFiles[i]);
        await projectsApi.addMedia(projectId, mediaPayload);
      }

      resetForm();
      await loadProjects();
    } catch (err) {
      let apiMessage = '';
      if (err && err.response && err.response.data && err.response.data.message) apiMessage = err.response.data.message;
      if (apiMessage !== '') setError(apiMessage);
      if (apiMessage === '') setError('Erreur lors de la sauvegarde du projet.');
    }

    setLoading(false);
  }

  /**
  * Supprime un projet après confirmation.
   */
  async function handleProjectDelete(projectId) {
    const ok = window.confirm('Supprimer ce projet.');
    if (!ok) return;

    setLoading(true);
    setMessage('');
    setError('');

    try {
      await projectsApi.delete(projectId);
      setMessage('Projet supprimé.');
      await loadProjects();
    } catch (err) {
      let apiMessage = '';
      if (err && err.response && err.response.data && err.response.data.message) apiMessage = err.response.data.message;
      if (apiMessage !== '') setError(apiMessage);
      if (apiMessage === '') setError('Erreur lors de la suppression du projet.');
    }

    setLoading(false);
  }

  /**
  * Supprime un média d'un projet après confirmation.
   */
  async function handleMediaDelete(projectId, mediaId) {
    const ok = window.confirm('Supprimer ce media.');
    if (!ok) return;

    setLoading(true);
    setMessage('');
    setError('');

    try {
      await projectsApi.deleteMedia(projectId, mediaId);
      setMessage('Média supprimé.');
      await loadProjects();
    } catch (err) {
      let apiMessage = '';
      if (err && err.response && err.response.data && err.response.data.message) apiMessage = err.response.data.message;
      if (apiMessage !== '') setError(apiMessage);
      if (apiMessage === '') setError('Erreur lors de la suppression du média.');
    }

    setLoading(false);
  }

  let formTitle = 'Ajouter un projet';
  let submitLabel = 'Ajouter';
  if (editingId !== null) {
    formTitle = 'Modifier un projet';
    submitLabel = 'Enregistrer';
  }

  return (
    <section className="mx-auto w-full max-w-5xl p-4 sm:p-6">
      <div className="mb-6 flex items-center justify-between rounded-xl bg-slate-800 p-4">
        <h1 className="text-2xl font-bold text-cyan-300">Admin - Projets</h1>
        <Link to="/admin/dashboard" className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-cyan-400">Retour dashboard</Link>
      </div>

      <div className="mb-6 rounded-xl bg-slate-800 p-5">
        <h2 className="mb-3 text-lg font-semibold text-emerald-300">{formTitle}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="title" value={form.title} onChange={onTextChange} placeholder="Titre" className="w-full rounded-lg border border-slate-500 bg-slate-900 px-3 py-2 text-slate-100" />
          <textarea name="description" value={form.description} onChange={onTextChange} rows={4} placeholder="Description" className="w-full rounded-lg border border-slate-500 bg-slate-900 px-3 py-2 text-slate-100" />
          <input name="technologies" value={form.technologies} onChange={onTextChange} placeholder="Technologies: React, Laravel" className="w-full rounded-lg border border-slate-500 bg-slate-900 px-3 py-2 text-slate-100" />
          <div className="grid gap-3 sm:grid-cols-2">
            <input name="github_link" value={form.github_link} onChange={onTextChange} placeholder="Lien GitHub" className="w-full rounded-lg border border-slate-500 bg-slate-900 px-3 py-2 text-slate-100" />
            <input name="demo_link" value={form.demo_link} onChange={onTextChange} placeholder="Lien Demo" className="w-full rounded-lg border border-slate-500 bg-slate-900 px-3 py-2 text-slate-100" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-xs text-slate-300">
              Documents projet (captures/vidéo)
            </div>
            <input type="file" accept=".png,.jpg,.jpeg,.mp4" multiple onChange={function (event) { const files = event.target.files; if (files) setMediaFiles(files); if (!files) setMediaFiles([]); }} className="w-full rounded-lg border border-slate-500 bg-slate-900 px-3 py-2 text-slate-100" />
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-200"><input type="checkbox" checked={form.featured} onChange={onFeaturedChange} />Projet mis en avant</label>
          <div className="flex gap-2">
            <button type="submit" disabled={loading} className="rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-slate-900 hover:bg-emerald-400">{submitLabel}</button>
            {editingId !== null && <button type="button" onClick={resetForm} className="rounded-lg bg-amber-400 px-4 py-2 font-semibold text-slate-900 hover:bg-amber-300">Annuler</button>}
          </div>
        </form>
      </div>

      {message !== '' && <p className="mb-3 rounded-lg bg-emerald-200 p-2 text-sm text-emerald-900">{message}</p>}
      {error !== '' && <p className="mb-3 rounded-lg bg-red-200 p-2 text-sm text-red-900">{error}</p>}

      <div className="rounded-xl bg-slate-800 p-5">
        <h2 className="mb-3 text-lg font-semibold text-fuchsia-300">Liste des projets</h2>
        {loading && <p className="text-sm">Chargement...</p>}
        {!loading && projects.length === 0 && <p className="text-sm">Aucun projet.</p>}

        {!loading && projects.length > 0 && (
          <div className="space-y-3">
            {projects.map(function (project) {
              let technologiesText = '';
              if (Array.isArray(project.technologies)) technologiesText = project.technologies.join(', ');

              return (
                <article key={project.id} className="rounded-lg border border-slate-600 bg-slate-900 p-3">
                  <h3 className="font-semibold text-cyan-200">{project.title}</h3>
                  <p className="mt-1 text-sm text-slate-200">{project.description}</p>
                  {technologiesText !== '' && <p className="mt-2 text-xs text-slate-300">Technologies: {technologiesText}</p>}
                  <div className="mt-3 flex gap-2">
                    <button type="button" onClick={function () { startEdit(project); }} className="rounded-lg bg-blue-400 px-3 py-1 text-sm font-semibold text-slate-900 hover:bg-blue-300">Modifier</button>
                    <button type="button" onClick={function () { handleProjectDelete(project.id); }} className="rounded-lg bg-rose-400 px-3 py-1 text-sm font-semibold text-slate-900 hover:bg-rose-300">Supprimer</button>
                  </div>
                  <div className="mt-4 rounded-lg border border-slate-700 bg-slate-800 p-3">
                    <p className="mb-2 text-sm font-semibold text-amber-200">Documents</p>
                    {(!project.images || project.images.length === 0) && <p className="text-xs text-slate-300">Aucun média.</p>}
                    {project.images && project.images.length > 0 && (
                      <div className="space-y-2">
                        {project.images.map(function (media) {
                          return (
                            <div key={media.id} className="flex items-center justify-between gap-2 rounded border border-slate-600 p-2">
                              <p className="text-xs text-slate-200">Média {media.id} - {media.file_type}</p>
                              <button type="button" onClick={function () { handleMediaDelete(project.id, media.id); }} className="rounded bg-rose-400 px-2 py-1 text-xs font-semibold text-slate-900 hover:bg-rose-300">Supprimer média</button>
                            </div>
                          );
                        })}
                      </div>
                    )}
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
