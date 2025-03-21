import axios from "axios";
import { CREATE_APPOINTMENT, AUTH_ERROR } from "../../actions-types";
import { Dispatch } from 'redux';
import { Appointment} from "../../../interfaces/AuthContextProps";

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;

export const createAppointment = (appointmentData: Appointment) => {
    return async (dispatch: Dispatch) => {
        try {
            const token = localStorage.getItem("token"); 
      console.log("Token en getUserId:", token);

      if (!token) {
        throw new Error("No se proporcionó un token de autenticación");
      }
            const response = await axios.post(`${API_URL_BASE}/appointments/schedule`, appointmentData,  {
                headers: {
                  Authorization: `Bearer ${token}` 
                }
              });
            console.log("Respuesta del servidor creacion de citas:", response.data);
            dispatch({
                type: CREATE_APPOINTMENT,
                payload: response.data
            });
        } catch (error) {
            let errorMessage = "Error de registro desconocido";
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            dispatch({
                type: AUTH_ERROR,
                payload: errorMessage
            });
        }
    };
};