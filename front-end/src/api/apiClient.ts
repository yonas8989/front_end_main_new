import axios, { AxiosProgressEvent, AxiosResponse } from "axios";

const baseURL =
  process.env.REACT_APP_API_BASE_URL ;
const apiKey = process.env.REACT_APP_API_KEY;

// Only throw errors in production
if (process.env.NODE_ENV === "production") {
  if (!baseURL)
    throw new Error("REACT_APP_API_BASE_URL is not defined in production");
  if (!apiKey)
    throw new Error("REACT_APP_API_KEY is not defined in production");
}

const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    ...(apiKey && { "x-api-key": apiKey }), // Only add if apiKey exists
  },
});

apiClient.interceptors.request.use(
  (config) => {
    config.headers = config.headers || {};

    // Add API key if it exists
    if (apiKey) {
      config.headers["x-api-key"] = apiKey;
    }

    // Add auth token if exists
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => {
    let errorMessage = "An unexpected error occurred";

    if (error.response) {
      // Handle API key errors specifically
      if (
        error.response.status === 400 &&
        error.response.data?.message?.includes("API Key")
      ) {
        errorMessage = "Authentication failed: Invalid API Key";
      } else {
        errorMessage =
          error.response.data?.message ||
          `Server error: ${error.response.status}`;
      }

      console.error("API Error:", error.response.status, error.response.data);

      if (error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    } else if (error.request) {
      errorMessage = "Network error - no response from server";
      console.error("API Error: No response received", error.request);
    } else {
      errorMessage = error.message;
      console.error("API Error:", error.message);
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
  delete: <T>(url: string, config = {}) => apiClient.delete<T>(url, config),
  uploadFile: <T>(
    url: string,
    file: File,
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiClient.post<T>(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "x-api-key": apiKey, // Ensure API key is included in file uploads
      },
      onUploadProgress,
    });
  },
};

export default api;
