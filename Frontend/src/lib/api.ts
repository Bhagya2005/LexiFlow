import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to add the auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/user/login', { email, password });
    return response.data;
  },
  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/user/register', { name, email, password });
    return response.data;
  },
};

 // Blog APIs
 export const blogAPI = {
   generateBlog: async (title: string, tone: string, length: number, keywords: string) => {
     const response = await api.post('/blog/generateblog', {
       title,
       tone,
       length,
       keywords,
     });
     return response.data;
   },
};
export const emailAPI = {
  generateEmail: async (subject: string, tone: string, length: number, context: string) => {
    const response = await api.post('/email/generateemail', {
      subject,
      tone,
      length,
      context,
    });
    return response.data;
  },
};


export default api; 