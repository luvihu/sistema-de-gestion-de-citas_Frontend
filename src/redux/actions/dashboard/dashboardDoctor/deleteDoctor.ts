import axios from "axios";
import Swal from "sweetalert2";
import { DELETE_DOCTOR, AUTH_ERROR } from "../../../actions-types";
import { Dispatch } from 'redux';

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;
  const showSuccess = () => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "¡Eliminación exitosa!",
      showConfirmButton: false,
      timer: 1500,
      width: '250px',
      toast: true
    });
  };

export const deleteDoctor = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token"); 
        if (!token) {
        throw new Error("No se proporcionó un token de autenticación");
      }
      const response = await axios.delete(`${API_URL_BASE}/doctor/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
        dispatch({
        type: DELETE_DOCTOR,
        payload: response.data.data,
      });
      showSuccess();
    } catch (error) {
      let errorMessage = "Error al eliminar desconocido";
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