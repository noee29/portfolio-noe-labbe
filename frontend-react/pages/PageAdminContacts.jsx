import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { contactApi } from '../services/api.js';

export default function PageAdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(function () {
    loadContacts();
  }, []);

  async function loadContacts() {
    setLoading(true);
    setError('');

    try {
      const response = await contactApi.getAll();

      if (response && response.data && Array.isArray(response.data)) {
        const list = response.data.slice();

        list.sort(function (a, b) {
          let aDate = 0;
          if (a.created_at) {
            aDate = new Date(a.created_at).getTime();
          }

          let bDate = 0;
          if (b.created_at) {
            bDate = new Date(b.created_at).getTime();
          }

          return bDate - aDate;
        });

        setContacts(list);
      }

      if (!response || !response.data || !Array.isArray(response.data)) {
        setContacts([]);
      }
    } catch {
      setError('Impossible de charger les contacts.');
    }

    setLoading(false);
  }

  function formatDate(value) {
    if (!value) {
      return 'Date inconnue';
    }

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return 'Date inconnue';
    }

    return date.toLocaleString('fr-FR');
  }

  async function handleMarkAsRead(contactId) {
    setLoading(true);
    setMessage('');
    setError('');

    try {
      await contactApi.markAsRead(contactId);
      setMessage('Message marque comme lu.');
      await loadContacts();
    } catch (err) {
      let apiMessage = '';
      if (err && err.response && err.response.data && err.response.data.message) {
        apiMessage = err.response.data.message;
      }

      if (apiMessage !== '') {
        setError(apiMessage);
      }

      if (apiMessage === '') {
        setError('Erreur lors du marquage du message.');
      }
    }

    setLoading(false);
  }

  async function handleDelete(contactId) {
    const ok = window.confirm('Supprimer ce message.');
    if (!ok) {
      return;
    }

    setLoading(true);
    setMessage('');
    setError('');

    try {
      await contactApi.delete(contactId);
      setMessage('Message supprime.');
      await loadContacts();
    } catch (err) {
      let apiMessage = '';
      if (err && err.response && err.response.data && err.response.data.message) {
        apiMessage = err.response.data.message;
      }

      if (apiMessage !== '') {
        setError(apiMessage);
      }

      if (apiMessage === '') {
        setError('Erreur lors de la suppression du message.');
      }
    }

    setLoading(false);
  }

  return (
    <section className="mx-auto w-full max-w-5xl p-4 sm:p-6">
      <div className="mb-6 flex items-center justify-between rounded-xl bg-slate-800 p-4">
        <h1 className="text-2xl font-bold text-cyan-300">Admin - Contacts</h1>
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

      <div className="rounded-xl bg-slate-800 p-5">
        <h2 className="mb-3 text-lg font-semibold text-fuchsia-300">Liste des messages</h2>

        {loading && <p className="text-sm">Chargement...</p>}
        {!loading && contacts.length === 0 && <p className="text-sm">Aucun message.</p>}

        {!loading && contacts.length > 0 && (
          <div className="space-y-3">
            {contacts.map(function (contact) {
              let name = 'Nom inconnu';
              if (contact.name) {
                name = contact.name;
              }

              let email = 'Email inconnu';
              if (contact.email) {
                email = contact.email;
              }

              let text = 'Message vide';
              if (contact.message) {
                text = contact.message;
              }

              const isRead = contact.read === true;
              let statusText = 'Non lu';
              if (isRead) {
                statusText = 'Lu';
              }
              const dateText = formatDate(contact.created_at);

              let readButton = null;
              if (!isRead) {
                readButton = (
                  <button
                    type="button"
                    onClick={function () {
                      handleMarkAsRead(contact.id);
                    }}
                    className="rounded-lg bg-amber-400 px-3 py-1 text-sm font-semibold text-slate-900 hover:bg-amber-300"
                  >
                    Marquer comme lu
                  </button>
                );
              }

              return (
                <article key={contact.id} className="rounded-lg border border-slate-600 bg-slate-900 p-3">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-cyan-200">{name}</h3>
                    <span className="rounded bg-slate-700 px-2 py-1 text-xs text-slate-100">{statusText}</span>
                  </div>

                  <p className="text-sm text-slate-200">{email}</p>
                  <p className="mt-1 text-xs text-slate-400">Recu le {dateText}</p>
                  <p className="mt-3 whitespace-pre-wrap text-sm text-slate-200">{text}</p>

                  <div className="mt-4 flex gap-2">
                    {readButton}
                    <button
                      type="button"
                      onClick={function () {
                        handleDelete(contact.id);
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
