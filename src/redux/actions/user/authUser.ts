import axios, { AxiosError} from 'axios';
import { AUTH_USER, AUTH_ERROR } from "../../actions-types";
import { User } from '../../../interfaces/AuthContextProps';
import { Dispatch } from 'redux';

interface AuthAction {
  type: typeof AUTH_USER | typeof AUTH_ERROR; 
  payload: {
    user: User;
    token: string;
  } | string
}

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;

export const authUser = (accessToken: string) => {
    return async (dispatch: Dispatch<AuthAction>) => {
        try {
            const response = await axios.get(`${API_URL_BASE}/verifyToken`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            const user = response.data;
            dispatch({
                type: AUTH_USER,
                payload: {user, token: accessToken}
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
};
