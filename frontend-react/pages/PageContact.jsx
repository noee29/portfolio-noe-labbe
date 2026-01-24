import { useState } from 'react';
import SectionPage from '../components/layout/SectionPage.jsx';
import ConteneurPage from '../components/layout/ConteneurPage.jsx';
import { contactApi } from '../services/api.js';

/**
 * PageContact - Formulaire de contact
 */
export default function PageContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  function handleChange(event) {
    const champName = event.target.name;
    const champValue = event.target.value;
    
    setFormData(function(anciennesValeurs) {
      const nouvellesValeurs = {
        name: anciennesValeurs.name,
        email: anciennesValeurs.email,
        message: anciennesValeurs.message
      };
      
      if (champName === 'name') {
        nouvellesValeurs.name = champValue;
      } else if (champName === 'email') {
        nouvellesValeurs.email = champValue;
      } else if (champName === 'message') {
        nouvellesValeurs.message = champValue;
      }
      
      return nouvellesValeurs;
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    
    setLoading(true);
    setError('');
    setSuccess(false);
    
    const nom = formData.name;
    const email = formData.email;
    const message = formData.message;
    
    const nomSansEspaces = nom.trim();
    const emailSansEspaces = email.trim();
    const messageSansEspaces = message.trim();
    
    if (nomSansEspaces === '' || emailSansEspaces === '' || messageSansEspaces === '') {
      setError('Tous les champs sont requis');
      setLoading(false);
      return;
    }
    
    try {
      const donneesAEnvoyer = {
        name: nom,
        email: email,
        message: message
      };
      
      await contactApi.send(donneesAEnvoyer);
      
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(function() {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      let messageErreur = 'Erreur lors de l\'envoi du message. Veuillez réessayer.';
      if (err.response && err.response.data) {
        if (err.response.data.message) {
          messageErreur = err.response.data.message;
        } else if (err.response.data.errors) {
          const erreurs = err.response.data.errors;
          if (erreurs.name && erreurs.name[0]) {
            messageErreur = erreurs.name[0];
          } else if (erreurs.email && erreurs.email[0]) {
            messageErreur = erreurs.email[0];
          } else if (erreurs.message && erreurs.message[0]) {
            messageErreur = erreurs.message[0];
          }
        }
      }
      setError(messageErreur);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SectionPage 
      id="contact" 
      eyebrow="Contact" 
      title="Formulaire de contact"
      subtitle="N'hésitez pas à me contacter pour toute question"
    >
      <ConteneurPage>
        <div className="max-w-2xl mx-auto">
          {/* Message de succès */}
          {success && (
            <div className="mb-6 rounded-lg border border-green-500/50 bg-green-950/20 p-4">
              <p className="text-sm text-green-400">
                Votre message a été envoyé avec succès ! Je vous répondrai dès que possible.
              </p>
            </div>
          )}

          {/* Message d'erreur */}
          {error && (
            <div className="mb-6 rounded-lg border border-red-500/50 bg-red-950/20 p-4">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Champ Nom */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Votre nom
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Entrez votre nom"
                className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-cyan-500/20 text-gray-100 placeholder-gray-500 focus:border-cyan-400/50 focus:outline-none transition-colors"
              />
            </div>

            {/* Champ Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Votre email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="votre.email@exemple.com"
                className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-cyan-500/20 text-gray-100 placeholder-gray-500 focus:border-cyan-400/50 focus:outline-none transition-colors"
              />
            </div>

            {/* Champ Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Votre message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Écrivez votre message ici..."
                rows="5"
                className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-cyan-500/20 text-gray-100 placeholder-gray-500 focus:border-cyan-400/50 focus:outline-none transition-colors resize-none"
              />
            </div>

            {/* Bouton submit */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:bg-cyan-700 text-white font-semibold transition-colors cursor-pointer"
              >
                {loading && 'Envoi en cours...'}
                {!loading && 'Envoyer le message'}
              </button>
            </div>
          </form>

          {/* Icônes sociales */}
          <div className="mt-12 pt-8 border-t border-cyan-500/20">
            <p className="text-center text-gray-400 text-sm mb-6">
              Vous pouvez aussi me joindre directement
            </p>
            <div className="flex items-center justify-center gap-8">
              {/* Email */}
              <a
                href="mailto:noe.labbe29@gmail.com"
                className="flex flex-col items-center gap-2 group"
                title="Envoyer un email"
              >
                <div className="p-3 rounded-full bg-cyan-950/60 border border-cyan-500/40 group-hover:border-cyan-300 group-hover:bg-cyan-900 transition-all">
                  <svg 
                    className="w-6 h-6 text-cyan-300 group-hover:text-cyan-200 transition-colors" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-400 group-hover:text-cyan-300 transition-colors">
                  noe.labbe29@gmail.com
                </span>
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/no%C3%A9-labb%C3%A9-a3b12229a/"
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-2 group"
                title="Profil LinkedIn"
              >
                <div className="p-3 rounded-full bg-cyan-950/60 border border-cyan-500/40 group-hover:border-cyan-300 group-hover:bg-cyan-900 transition-all">
                  <svg 
                    className="w-6 h-6 text-cyan-300 group-hover:text-cyan-200 transition-colors" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                  </svg>
                </div>
                <span className="text-xs text-gray-400 group-hover:text-cyan-300 transition-colors">
                  LinkedIn
                </span>
              </a>
            </div>
          </div>
        </div>
      </ConteneurPage>
    </SectionPage>
  );
}
