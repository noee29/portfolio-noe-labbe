import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Instance axios préconfigurée vers l'API Laravel.
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

// Intercepteur pour ajouter le token
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

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/admin';
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
  create: (data) => api.post('/admin/projects', data),
  /** Met à jour un projet (zone admin). */
  update: (id, data) => api.put(`/admin/projects/${id}`, data),
  /** Supprime un projet (zone admin). */
  delete: (id) => api.delete(`/admin/projects/${id}`),
};

/**
 * Opérations CRUD pour les compétences.
 */
export const skillsApi = {
  /** Récupère toutes les compétences. */
  getAll: () => api.get('/skills'),
  /** Crée une compétence (admin). */
  create: (data) => api.post('/admin/skills', data),
  /** Met à jour une compétence (admin). */
  update: (id, data) => api.put(`/admin/skills/${id}`, data),
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
 * Services d'authentification.
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