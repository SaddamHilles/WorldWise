// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com', // Replace with your API base URL
  timeout: 10000, // Request timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  config => {
    // Modify request config before sending it
    // For example, you can add authorization token here
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Add a response interceptor
api.interceptors.response.use(
  response => {
    // Modify response before returning it
    return response;
  },
  error => {
    // Handle errors
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g., redirect to login)
    }
    return Promise.reject(error);
  },
);

export default api;
