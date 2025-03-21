import axios from "axios";
import {  FETCH_SPECIALTIESBYID, AUTH_ERROR } from "../../actions-types";
import { Dispatch } from 'redux';

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;

export const fetchSpecialtiesById = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token"); 
      console.log("Token en getUserId:", token);

      if (!token) {
        throw new Error("No se proporcionó un token de autenticación");
      }
      const response = await axios.get(`${API_URL_BASE}/specialty/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      console.log("Respuesta del servidor, getSpecialtyById:", response.data.data);
      dispatch({
        type: FETCH_SPECIALTIESBYID,
        payload: response.data.data,
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