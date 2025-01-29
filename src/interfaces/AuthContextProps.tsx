import React from "react";


export interface User {
  name: string;
  lastname: string;
  dni: string;
  telephone: string;
  photo_profile?: string;
  email: string;
  password: string;
  role?: 'ADMIN' | 'USER';
}

export interface AuthContextProps {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: () => boolean;
  isUser: () => boolean;
};

export interface ProtectedRouteProps {
  children: React.ReactNode;
}