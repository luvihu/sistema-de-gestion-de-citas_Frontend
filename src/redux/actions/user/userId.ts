import axios, { AxiosError} from 'axios';
import { AUTH_ERROR, USER_ID } from "../../actions-types";
import { Dispatch } from 'redux';

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;

export const getUserId = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token"); 
      
      if (!token) {
        throw new Error("No se proporcionó un token de autenticación");
      }
      const response = await axios.get(`${API_URL_BASE}/users/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      } );
      const userData = response.data.data;
        dispatch({
        type: USER_ID,
        payload: userData,
      });
    } catch (error) {
      let errorMessage = "Error al obtener datos del usuario";
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          errorMessage = "No autorizado: el token es inválido o ha expirado";
        } else if (error.response?.status === 404) {
          errorMessage = "Usuario no encontrado";
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }
      }
    
      dispatch({
        type: AUTH_ERROR,
        payload: errorMessage,
      });
    }
  };
}