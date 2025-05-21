import axios, { AxiosProgressEvent, AxiosResponse } from 'axios';

const baseURL = process.env.REACT_API_BASE_URL || 'http://localhost:5000/api';

if (!baseURL && process.env.NODE_ENV === 'production') {
  throw new Error('REACT_API_BASE_URL is not defined in production');
}

const apiClient = axios.create({
  baseURL,
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
  (response: AxiosResponse) => response.data, // Return just the data
  (error) => {
    let errorMessage = 'An unexpected error occurred';

    if (error.response) {
      errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
      console.error('API Error:', error.response.status, error.response.data);

      if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    } else if (error.request) {
      errorMessage = 'Network error - no response from server';
      console.error('API Error: No response received', error.request);
    } else {
      errorMessage = error.message;
      console.error('API Error:', error.message);
    }

    return Promise.reject(new Error(errorMessage));
  }
);

export const api = {
  get: <T>(url: string, params = {}, config = {}) =>
    apiClient.get<T>(url, { ...config, params }),
  post: <T>(url: string, data = {}, config = {}) =>
    apiClient.post<T>(url, data, config),
  put: <T>(url: string, data = {}, config = {}) =>
    apiClient.put<T>(url, data, config),
  patch: <T>(url: string, data = {}, config = {}) =>
    apiClient.patch<T>(url, data, config),
  delete: <T>(url: string, config = {}) =>
    apiClient.delete<T>(url, config),
  uploadFile: <T>(
    url: string,
    file: File,
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
  ) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post<T>(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress,
    });
  },
};

export default api;