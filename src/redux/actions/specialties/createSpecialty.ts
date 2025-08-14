import axios from "axios";
import Swal from "sweetalert2";
import { CREATE_SPECIALTY, AUTH_ERROR } from "../../actions-types";
import { Dispatch } from 'redux';
import { Specialty } from "../../../interfaces/AuthContextProps";

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;
const showSuccess = () => {
  Swal.fire({
    position: "center",
    icon: "success",
    title: "¡Registro exitoso!",
    showConfirmButton: false,
    timer: 2000,
    width: '300px',
    background: '#f0f8ff',
    toast: true
  })
};

export const createSpecialty = (specialtyData: Partial<Specialty>) => {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No se proporcionó un token de autenticación");
      }
      const response = await axios.post(`${API_URL_BASE}/specialty/create`, specialtyData, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
        dispatch({
        type: CREATE_SPECIALTY,
        payload: response.data.data,
      });
      showSuccess();

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