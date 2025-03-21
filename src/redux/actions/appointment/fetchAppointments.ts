import axios from "axios";
import { FETCH_APPOINTMENTS, AUTH_ERROR } from '../../actions-types';
import { Dispatch } from 'redux';

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;

export const fetchAppointments = () => {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No se proporcionó un token de autenticación");
      }
      const response = await axios.get(`${API_URL_BASE}/appointments`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({
        type: FETCH_APPOINTMENTS,
        payload: response.data.data,
      });
    } catch (error) {
      let errorMessage = "Error desconocido";
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