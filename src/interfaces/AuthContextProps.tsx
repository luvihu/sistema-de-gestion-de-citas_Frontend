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

export interface ProtectedRouteProps {
  children: React.ReactNode;
};

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
 isAuthenticated: boolean;
}

