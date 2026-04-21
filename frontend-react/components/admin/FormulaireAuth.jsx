import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../services/api.js';

/**
 * FormulaireAuth - Connexion admin.
 *
 * Rôle : valider les champs, appeler /login, stocker le token,
 * puis rediriger vers le dashboard.
 */
export default function FormulaireAuth() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  // --- Validation du formulaire ---

  function validerFormulaire() {
    if (email.trim() === '') {
      setError("L'email est requis.");
      return false;
    }

    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("L'email n'est pas valide.");
      return false;
    }

    if (password.trim() === '') {
      setError('Le mot de passe est requis.');
      return false;
    }

    if (password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères.');
      return false;
    }

    return true;
  }


  // --- Récupérer le message d'erreur ---

  function getMessageErreur(err) {
    if (err.response && err.response.data && err.response.data.message) {
      return err.response.data.message;
    }
    return 'Erreur de connexion.';
  }


  // --- Soumission du formulaire ---

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validerFormulaire()) return;

    setLoading(true);

    try {
      // Appel API de connexion
      const response = await authApi.login({ email, password });

      // On garde le token pour les prochaines requêtes admin.
      const token = response.data.token || response.data.access_token;
      if (token) {
        localStorage.setItem('authToken', token);
      }

      // Succès : redirection vers le dashboard
      setSuccess('Connexion réussie ! Redirection...');
      navigate('/admin/dashboard', { replace: true });

    } catch (err) {
      setError(getMessageErreur(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="rounded-xl border border-cyan-500/20 bg-slate-800/70 p-8 backdrop-blur-sm">
        <h2 className="text-2xl font-bold text-gray-100 mb-2 text-center">
          Connexion
        </h2>
        <p className="text-sm text-gray-400 text-center mb-6">
          Accédez à votre espace admin
        </p>

        {/* Message de succès */}
        {success && (
          <div className="mb-6 rounded-lg border border-green-500/50 bg-green-950/20 p-4">
            <p className="text-sm text-green-400">{success}</p>
          </div>
        )}

        {/* Message d'erreur */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-500/50 bg-red-950/20 p-4">
            <p className="text-sm text-red-400">{error}</p>
          </div>
        )}

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@exemple.com"
              className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-cyan-500/20 text-gray-100 placeholder-gray-500 focus:border-cyan-400/50 focus:outline-none transition-colors"
            />
          </div>

          {/* Mot de passe */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-slate-700/50 border border-cyan-500/20 text-gray-100 placeholder-gray-500 focus:border-cyan-400/50 focus:outline-none transition-colors"
            />
          </div>

          {/* Bouton submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-3 rounded-lg bg-cyan-600 hover:bg-cyan-500 disabled:bg-cyan-700 text-white font-semibold transition-colors cursor-pointer"
          >
            {loading && 'Connexion...'}
            {!loading && 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}
