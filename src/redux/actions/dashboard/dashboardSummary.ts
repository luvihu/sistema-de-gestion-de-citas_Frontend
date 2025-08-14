import { Dispatch } from "redux";
import { AUTH_ERROR, SUMMARY_DASHBOARD } from "../../actions-types";
import axios from "axios";

const API_URL_BASE = import.meta.env.VITE_API_URL_BASE;

 export const dashboardSummary = () => {
    return async (dispatch: Dispatch) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error("Token no encontrado");
            }
          const response = await axios.get(`${API_URL_BASE}/admin`, {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          });
                dispatch({
                type: SUMMARY_DASHBOARD,
                payload: response.data.data,
            });
        } catch (error) {
            let errorMessage = "Error de DashboardData desconocido";
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