import axios, { AxiosProgressEvent } from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;
if (!baseURL && import.meta.env.PROD) {
  throw new Error('VITE_API_BASE_URL is not defined in production');
}

const apiClient = axios.create({
  baseURL: baseURL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    let errorMessage = 'An unexpected error occurred';
    if (error.response) {
      errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
      console.error('API Error:', error.response.status, error.response.data);
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/';
      }
    } else if (error.request) {
      errorMessage = 'Network error - no response from server';
      console.error('API Error: No response received', error.request);
    } else {
      errorMessage = error.message;
      console.error('API Error:', error.message);
    }
    return Promise.reject({ message: errorMessage });
  }
);

const api = {
  get: (url: string, params = {}, config = {}) => apiClient.get(url, { ...config, params }),
  post: (url: string, data = {}, config = {}) => apiClient.post(url, data, config),
  put: (url: string, data = {}, config = {}) => apiClient.put(url, data, config),
  patch: (url: string, data = {}, config = {}) => apiClient.patch(url, data, config),
  delete: (url: string, config = {}) => apiClient.delete(url, config),
  uploadFile: (
    url: string, 
    file: File, 
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
  ) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress,
    });
  },
};

export default api;