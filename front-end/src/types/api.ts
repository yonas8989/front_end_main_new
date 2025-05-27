// src/types/api.ts
export interface ApiResponse<T = any> {
  data: T;
  status?:string;
  message?: string;
  token?: string; 
  
}