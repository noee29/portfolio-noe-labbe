import axios from 'axios';

// L'URL de l'API vient du fichier .env (variable VITE_API_URL) par défaut localhost:8000.
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Instance axios préconfigurée vers l'API Laravel.
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Ajoute automatiquement le token (si présent) sur chaque requête API.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Si l'API répond 401, on nettoie le token local et on renvoie vers /admin.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Ne pas rediriger si on est déjà sur la page de login
      if (!window.location.pathname.startsWith('/admin')) {
        localStorage.removeItem('authToken');
        window.location.href = '/admin';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// Services API
/**
 * Opérations CRUD pour les projets.
 */
export const projectsApi = {
  /** Récupère la liste des projets publics. */
  getAll: () => api.get('/projects'),
  /** Récupère un projet par identifiant. */
  getOne: (id) => api.get(`/projects/${id}`),
  /** Crée un projet (zone admin, nécessite token). */
  create: (data) => {
    if (data instanceof FormData) {
      return api.post('/admin/projects', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
    return api.post('/admin/projects', data);
  },
  /** Met à jour un projet (zone admin). */
  update: (id, data) => {
    if (data instanceof FormData) {
      data.append('_method', 'PUT');
      return api.post(`/admin/projects/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
    return api.put(`/admin/projects/${id}`, data);
  },
  /** Supprime un projet (zone admin). */
  delete: (id) => api.delete(`/admin/projects/${id}`),
  /** Ajoute des medias (png/jpg/mp4) a un projet. */
  addMedia: (projectId, formData) => api.post(`/admin/projects/${projectId}/media`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  /** Supprime un media de projet. */
  deleteMedia: (projectId, mediaId) => api.delete(`/admin/projects/${projectId}/media/${mediaId}`),
};

/**
 * Opérations CRUD pour les compétences.
 */
export const skillsApi = {
  /** Récupère toutes les compétences. */
  getAll: () => api.get('/skills'),
  /** Crée une compétence (admin). */
  create: (data) => {
    if (data instanceof FormData) {
      return api.post('/admin/skills', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
    return api.post('/admin/skills', data);
  },
  /** Met à jour une compétence (admin). */
  update: (id, data) => {
    if (data instanceof FormData) {
      data.append('_method', 'PUT');
      return api.post(`/admin/skills/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
    }
    return api.put(`/admin/skills/${id}`, data);
  },
  /** Supprime une compétence (admin). */
  delete: (id) => api.delete(`/admin/skills/${id}`),
};

/**
 * Opérations CRUD pour les formations.
 */
export const formationsApi = {
  /** Récupère toutes les formations. */
  getAll: () => api.get('/formations'),
  /** Crée une formation (admin). */
  create: (data) => api.post('/admin/formations', data),
  /** Met à jour une formation (admin). */
  update: (id, data) => api.put(`/admin/formations/${id}`, data),
  /** Supprime une formation (admin). */
  delete: (id) => api.delete(`/admin/formations/${id}`),
};

/**
 * Services pour les messages de contact.
 */
export const contactApi = {
  /** Envoie un message de contact public. */
  send: (data) => api.post('/contact', data),
  /** Récupère les messages (admin). */
  getAll: () => api.get('/admin/contacts'),
  /** Marque un message comme lu (admin). */
  markAsRead: (id) => api.patch(`/admin/contacts/${id}/read`),
  /** Supprime un message (admin). */
  delete: (id) => api.delete(`/admin/contacts/${id}`),
};

/**
 * Appels d'authentification admin.
 * login/register renvoient un token, logout coupe la session API.
 */
export const authApi = {
  /** Inscription d'un nouvel utilisateur. */
  register: (data) => api.post('/register', data),
  /** Connexion d'un utilisateur. */
  login: (data) => api.post('/login', data),
  /** Déconnexion de l'utilisateur courant. */
  logout: () => api.post('/logout'),
  /** Récupère les informations de l'utilisateur connecté. */
  getUser: () => api.get('/user'),
};

/**
 * Services pour le CV.
 */
export const cvApi = {
  /** Récupère le CV actuel. */
  get: () => api.get('/cv', {
    params: {
      t: Date.now(),
    },
  }),
  /** Upload un nouveau CV (FormData avec champ 'cv'). */
  upload: (formData) => api.post('/admin/cv', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};