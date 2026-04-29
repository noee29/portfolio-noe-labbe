import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cvApi } from '../services/api.js';

/**
 * Page d'administration du CV (consultation et upload).
 */
export default function PageAdminCV() {
  const [currentFile, setCurrentFile] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(function () {
    loadCurrentCv();
  }, []);

  /**
  * Récupère le CV courant (nom + URL) depuis l'API.
   */
  async function loadCurrentCv() {
    setLoading(true);
    setError('');

    try {
      const response = await cvApi.get();

      if (response && response.data) {
        const file = response.data.file;
        const url = response.data.url;

        if (file) {
          setCurrentFile(file);
        }

        if (!file) {
          setCurrentFile('');
        }

        if (url) {
          setCurrentUrl(url);
        }

        if (!url) {
          setCurrentUrl('');
        }
      }

      if (!response || !response.data) {
        setCurrentFile('');
        setCurrentUrl('');
      }
    } catch {
      setError('Impossible de charger le CV actuel.');
    }

    setLoading(false);
  }

  /**
  * Valide le fichier sélectionné (PDF, taille max 5 Mo).
   */
  function onFileChange(event) {
    const files = event.target.files;
    setMessage('');
    setError('');

    if (!files || files.length === 0) {
      setSelectedFile(null);
      return;
    }

    const file = files[0];
    const isPdf = file.type === 'application/pdf';
    const isSizeValid = file.size <= 5 * 1024 * 1024;

    if (!isPdf) {
      setError('Le fichier doit être un PDF.');
      setSelectedFile(null);
      return;
    }

    if (!isSizeValid) {
      setError('Le fichier est trop lourd (max 5 Mo).');
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  }

  /**
   * Envoie le nouveau CV vers l'API admin.
   */
  async function onSubmit(event) {
    event.preventDefault();
    setMessage('');
    setError('');

    if (!selectedFile) {
      setError('Sélectionne un fichier PDF.');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('cv', selectedFile);

      const response = await cvApi.upload(formData);

      if (response && response.data) {
        if (response.data.file) {
          setCurrentFile(response.data.file);
        }
        if (response.data.url) {
          setCurrentUrl(response.data.url);
        }
      }

      setMessage('CV mis à jour avec succès.');
      setSelectedFile(null);
      await loadCurrentCv();
    } catch (err) {
      if (err && err.response && err.response.status === 401) {
        setError('Session admin expirée. Reconnecte-toi puis réessaie.');
        setLoading(false);
        return;
      }

      let apiMessage = '';
      if (err && err.response && err.response.data && err.response.data.message) {
        apiMessage = err.response.data.message;
      }

      if (apiMessage !== '') {
        setError(apiMessage);
      }

      if (apiMessage === '') {
        setError('Erreur lors de la mise à jour du CV.');
      }
    }

    setLoading(false);
  }

  let currentText = 'Aucun CV en ligne pour le moment.';
  if (currentFile !== '') {
    currentText = currentFile;
  }

  return (
    <section className="mx-auto w-full max-w-5xl p-4 sm:p-6">
      <div className="mb-6 flex items-center justify-between rounded-xl bg-slate-800 p-4">
        <h1 className="text-2xl font-bold text-cyan-300">Admin - CV</h1>
        <Link
          to="/admin/dashboard"
          className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-cyan-400"
        >
          Retour dashboard
        </Link>
      </div>

      {message !== '' && (
        <p className="mb-3 rounded-lg bg-emerald-200 p-2 text-sm text-emerald-900">{message}</p>
      )}

      {error !== '' && (
        <p className="mb-3 rounded-lg bg-red-200 p-2 text-sm text-red-900">{error}</p>
      )}

      <div className="mb-6 rounded-xl bg-slate-800 p-5">
        <h2 className="mb-2 text-lg font-semibold text-fuchsia-300">CV actuel</h2>
        {loading && <p className="text-sm text-slate-300">Chargement...</p>}
        {!loading && <p className="text-sm text-slate-200">{currentText}</p>}

        {currentUrl !== '' && (
          <a
            href={currentUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex rounded-lg bg-blue-400 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-blue-300"
          >
            Ouvrir le CV actuel
          </a>
        )}
      </div>

      <div className="rounded-xl bg-slate-800 p-5">
        <h2 className="mb-3 text-lg font-semibold text-emerald-300">Mettre à jour le CV</h2>

        <form onSubmit={onSubmit} className="space-y-3">
          <input
            type="file"
            accept=".pdf"
            onChange={onFileChange}
            className="w-full rounded-lg border border-slate-500 bg-slate-900 px-3 py-2 text-slate-100"
          />

          <p className="text-xs text-slate-300">Format autorisé : PDF - Taille max : 5 Mo</p>

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-slate-900 hover:bg-emerald-400"
          >
            Enregistrer le nouveau CV
          </button>
        </form>
      </div>
    </section>
  );
}
