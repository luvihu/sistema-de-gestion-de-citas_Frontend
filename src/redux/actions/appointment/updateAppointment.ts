import axios from "axios";
import Swal from "sweetalert2";
import { UPDATE_APPOINT, AUTH_ERROR } from "../../actions-types";
import { Dispatch } from 'redux';
import { Appointment } from "../../../interfaces/AuthContextProps";

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;
const showSuccess = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "¡Cita actualizado exitosamente!",
    showConfirmButton: false,
    timer: 2000,
    width: '300px',
    background: '#f0f8ff',
    toast: true
  })
};

export const updateAppointment = (id: string, change: Partial<Appointment>) => {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No se proporcionó un token de autenticación");
      }
      
      const response = await axios.put(`${API_URL_BASE}/appointments/${id}`, change, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
        dispatch({
        type: UPDATE_APPOINT,
        payload: response.data.data
      });
      showSuccess();
      
    } catch (error) {
      let errorMessage = "Error de actualización desconocido";
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