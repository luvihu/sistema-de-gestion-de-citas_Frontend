import Swal from "sweetalert2";
import axios, { AxiosError} from "axios";
import { REGISTER_USER, AUTH_ERROR } from "../../actions-types";
import { Dispatch } from 'redux';
import { User } from "../../../interfaces/AuthContextProps";

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;
const showSuccess = () => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "¡Registro exitoso!",
    showConfirmButton: false,
    timer: 1500,
    width: '250px',
    toast: true
  }).then(() => window.location.href = "/login");
};

export const registerUser = (userData: User) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(`${API_URL_BASE}/users/register`, userData);
        dispatch({
        type: REGISTER_USER,
        payload: response.data
      });
      showSuccess();
           
    } catch (error) {
      let errorMessage = "Error de registro desconocido";
      if( error instanceof AxiosError) {
        if (error.response?.status === 400) {
          errorMessage = "El correo electrónico ya está en uso.";
        } else if (error.response?.status === 409) {
          errorMessage = "El DNI de usuario ya está en uso.";
        } else if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        }
      }
      dispatch({
        type: AUTH_ERROR,
        payload: errorMessage
      });
    }
  }
} 