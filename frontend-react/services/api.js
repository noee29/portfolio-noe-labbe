import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

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
    const token = localStorage.getItem('token');
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
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

export default api;

// Services API
export const projectsApi = {
  getAll: () => api.get('/projects'),
  getOne: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/admin/projects', data),
  update: (id, data) => api.put(`/admin/projects/${id}`, data),
  delete: (id) => api.delete(`/admin/projects/${id}`),
};

export const skillsApi = {
  getAll: () => api.get('/skills'),
  create: (data) => api.post('/admin/skills', data),
  update: (id, data) => api.put(`/admin/skills/${id}`, data),
  delete: (id) => api.delete(`/admin/skills/${id}`),
};

export const formationsApi = {
  getAll: () => api.get('/formations'),
  create: (data) => api.post('/admin/formations', data),
  update: (id, data) => api.put(`/admin/formations/${id}`, data),
  delete: (id) => api.delete(`/admin/formations/${id}`),
};

export const contactApi = {
  send: (data) => api.post('/contact', data),
  getAll: () => api.get('/admin/contacts'),
  markAsRead: (id) => api.patch(`/admin/contacts/${id}/read`),
  delete: (id) => api.delete(`/admin/contacts/${id}`),
};

export const authApi = {
  login: (credentials) => api.post('/login', credentials),
  logout: () => api.post('/logout'),
  getUser: () => api.get('/user'),
};