import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {AuthContextProps, User} from "../interfaces/AuthContextProps";
import axios, { AxiosError } from "axios";

const AuthContext = createContext<AuthContextProps | null>(null)
const hasRole = (requiredRole: 'ADMIN' | 'USER', user: User | null): boolean => {
    return user?.role === requiredRole;
  };

const API_URL = 'http://localhost:3001';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
 const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
 const [loading, setLoading] = useState(true);
 //loading: controla el estado de carga inicial

 const navigate = useNavigate();

useEffect(() => {
  // Configuración global de axios
  axios.defaults.baseURL = API_URL;
  // Interceptor para incluir el token en las peticiones
  const interceptor = axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return () => {
    axios.interceptors.request.eject(interceptor);
  };
}, []);

useEffect(() => {
  const verifyToken = async () => {
    const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          const response = await axios.get(`${API_URL}/verifyToken`, {
            headers: {
              Authorization: `Bearer ${storedToken}`
            }
          });
          setUser(response.data.data);
        } catch (error: unknown) {
          if (error instanceof AxiosError) {
            console.error("Error verificando el token:", error.response?.data?.message || error.message);
          } else {
            console.error("Error desconocido al verificar el token");
          }
          logout();
        }
      }
      setLoading(false);
    };
    verifyToken();
  }, []);
  //Valida el token almacenado cuando se inicia la aplicación.
  
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, {
        email,
        password
      });
        const { token, userLog } = response.data.user;
        setUser(userLog);
        setToken(token);
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        navigate('/admin');
        return { success: true };
            
      } catch (error: unknown) {
      if(error instanceof AxiosError) {
        return {
          success: false,
          message: error.response?.data?.message || 'Error durante el inicio de sesión'
        };
      }
      return {
        success: false,
        message: 'Error desconocido'
      }
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/login');
  };

  if (loading) {
    return <div>Cargando...</div>;
  }
  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      logout, 
      isAuthenticated: !!token,
      isAdmin: () => hasRole('ADMIN', user),
      isUser: () => hasRole('USER', user) }}
      >
      {children}
    </AuthContext.Provider>
  //Proporciona el contexto de autenticación a toda la aplicación.
  );
};
export default AuthContext;

