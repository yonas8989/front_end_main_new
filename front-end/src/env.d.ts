declare namespace NodeJS {
  interface ProcessEnv {
    readonly REACT_API_BASE_URL?: string;
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL?: string;
    // Add other environment variables here if needed
  }
}