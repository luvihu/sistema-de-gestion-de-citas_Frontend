import axios, { AxiosError} from 'axios';
import { LOGIN_USER, AUTH_ERROR } from "../../actions-types";
import { Dispatch } from 'redux';

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;
export const loginUser = (email: string, password: string) => {
  return async (dispatch: Dispatch) => {
        try {
               const response = await axios.post(`${API_URL_BASE}/users/login`, {
                email,
                password
            });
          
            const { user, token, role } = response.data.data;
            // Guardar en Redux
            dispatch({
              type: LOGIN_USER,
              payload: { user, token, role }
            });
            // Guardar en localStorage inmediatamente después del login
              localStorage.setItem("user", JSON.stringify(user));
              localStorage.setItem("token", token);
              localStorage.setItem("role", role);
                     
        } catch (error) {
            let errorMessage = "Error de autenticación desconocido";

            if (error instanceof AxiosError) {
                if (error.response?.status === 404) {
                    errorMessage = "Usuario no registrado. Por favor, regístrese primero.";
                  } else if (error.response?.status === 401) {
                    errorMessage = "Email o contraseña incorrectos. Por favor, verifique sus datos.";
                  } else if (error.response?.data?.message) {
                    errorMessage = error.response.data.message;
                  }
            }
            dispatch({
                type: AUTH_ERROR,
                payload: errorMessage
            });
        }
    };
}