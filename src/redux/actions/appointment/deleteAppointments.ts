import axios from "axios";
import { DELETE_APPOINT, AUTH_ERROR } from "../../actions-types";
import { Dispatch } from 'redux';

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;

export const deleteAppointment = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No se proporcionó un token de autenticación");
      }
      
      const response = await axios.delete(`${API_URL_BASE}/appointments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
        dispatch({
        type: DELETE_APPOINT,
        payload: response.data.data
      });
      

    } catch (error) {
      let errorMessage = "Error de eliminación desconocido";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      dispatch({
        type: AUTH_ERROR,
        payload: errorMessage,
      });
    }
  };
};