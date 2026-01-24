import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../../services/api.js';

/**
 * FormulaireAuth - Formulaire de connexion admin 
 */
export default function FormulaireAuth() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  function handleChange(event) {
    const champName = event.target.name;
    const champValue = event.target.value;
    
    setFormData(function(anciennesValeurs) {
      const nouvellesValeurs = {
        email: anciennesValeurs.email,
        password: anciennesValeurs.password
      };
      
      if (champName === 'email') {
        nouvellesValeurs.email = champValue;
      } else if (champName === 'password') {
        nouvellesValeurs.password = champValue;
      }
      
      return nouvellesValeurs;
    });
  }

  function validateForm() {
    const email = formData.email;
    const password = formData.password;
    
    const emailSansEspaces = email.trim();
    if (emailSansEspaces === '') {
      setError('L\'email est requis');
      return false;
    }
    
    const emailValide = email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    if (!emailValide) {
      setError('L\'email n\'est pas valide');
      return false;
    }
    
    const passwordSansEspaces = password.trim();
    if (passwordSansEspaces === '') {
      setError('Le mot de passe est requis');
      return false;
    }
    
    const longueurPassword = password.length;
    if (longueurPassword < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return false;
    }
    
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await authApi.login({
        email: formData.email,
        password: formData.password
      });

      let token = null;
      if (response.data && response.data.token) {
        token = response.data.token;
      } else if (response.data && response.data.access_token) {
        token = response.data.access_token;
      }
      
      if (token) {
        localStorage.setItem('authToken', token);
      }

      setSuccess('Connexion réussie ! Redirection en cours...');
      setFormData({ email: '', password: '' });
      navigate('/admin', { replace: true });
    } catch (err) {
      if (err.response && err.response.data) {
        console.error('Erreur auth:', err.response.data);
      }
      
      let errorMsg = '';
      
      if (err.response && err.response.data) {
        if (err.response.data.message) {
          errorMsg = err.response.data.message;
        } else if (err.response.data.errors && err.response.data.errors.email && err.response.data.errors.email[0]) {
          errorMsg = err.response.data.errors.email[0];
        } else if (err.response.data.errors && err.response.data.errors.password && err.response.data.errors.password[0]) {
          errorMsg = err.response.data.errors.password[0];
        }
      }
      
      if (errorMsg === '') {
        errorMsg = 'Erreur de connexion';
      }
      
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

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
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
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
