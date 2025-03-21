import axios from "axios";
import { FETCH_DOCTOR_BY_ID, AUTH_ERROR } from "../../actions-types";
import { Dispatch } from 'redux';

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;

export const fetchDoctorById = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(`${API_URL_BASE}/doctor/${id}`);
      console.log("Respuesta del servidor, fetchDoctorById:", response.data);
      dispatch({
        type: FETCH_DOCTOR_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      let errorMessage = "Error de registro desconocido";
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