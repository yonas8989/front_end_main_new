// src/types/layout.ts
export interface LayoutProps {
  children: React.ReactNode;
}

export interface AuthLayoutProps extends LayoutProps {
  title?: string;
}

export interface AppLayoutProps extends LayoutProps {
  showSidebar?: boolean;
}