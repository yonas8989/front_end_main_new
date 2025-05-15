// src/types/api.ts
export interface ApiResponse<T = any> {
  data: T; 
  message?: string;
  token?: string; 
  
}