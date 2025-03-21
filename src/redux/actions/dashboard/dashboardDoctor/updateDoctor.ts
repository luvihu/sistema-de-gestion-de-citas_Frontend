import axios from "axios";
import Swal from "sweetalert2";
import { UPDATE_DOCTOR, AUTH_ERROR } from "../../../actions-types";
import { Dispatch } from 'redux';
import { DoctorDashboard } from "../../../../interfaces/AuthContextProps";

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;
const showSuccess = () => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "¡Doctor actualizado exitosamente!",
    showConfirmButton: false,
    timer: 1500,
    width: '250px',
    toast: true
  })
};

export const updateDoctor = (id: string, doctorData: Partial<DoctorDashboard>) => {
  return async (dispatch: Dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No se proporcionó un token de autenticación");
      }
      
      const response = await axios.put(`${API_URL_BASE}/doctor/${id}`, doctorData, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      console.log("Respuesta del servidor, updateDoctor:", response.data.data);
      dispatch({
        type: UPDATE_DOCTOR,
        payload: response.data.data
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