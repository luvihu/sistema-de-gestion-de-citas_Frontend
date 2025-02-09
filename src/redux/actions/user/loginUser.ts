import axios, { AxiosError} from 'axios';
import { LOGIN_USER, AUTH_ERROR } from "../../actions-types";
import { User } from '../../../interfaces/AuthContextProps';
import { Dispatch } from 'redux';

interface AuthAction {
  type: typeof LOGIN_USER | typeof AUTH_ERROR;
  payload:{
    user: User;
    token: string;
  } | string;
}
const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;
export const loginUser = (email: string, password: string) => {
  return async (dispatch: Dispatch<AuthAction>) => {
        try {
            console.log("Enviando solicitud a:", `${API_URL_BASE}/users/login`); 
            console.log("Credenciales:", { email, password });
            const response = await axios.post(`${API_URL_BASE}/users/login`, {
                email,
                password
            });
            console.log("Respuesta del servidor:", response.data.data);
            const { user, token } = response.data.data;
            localStorage.setItem("token", token);  // Guardamos el token en el almacenamiento local
            dispatch({
                type: LOGIN_USER,
                payload: {user, token}
            });
          
        } catch (error) {
            let errorMessage = "Error de autenticación desconocido";

            if (error instanceof AxiosError) {
                errorMessage = error.response?.data?.message || "Error de autenticación";
            }
            dispatch({
                type: AUTH_ERROR,
                payload: errorMessage
            });
        }
    };
}