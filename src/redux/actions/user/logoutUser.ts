import { Dispatch } from "redux";
import { AUTH_ERROR } from "../../actions-types";

interface AuthAction {
  type: typeof AUTH_ERROR; 
  payload: string
}
export const logoutUser = () => {
  return (dispatch: Dispatch<AuthAction>) => {
    localStorage.removeItem("token");  

    dispatch({
      type: AUTH_ERROR,
      payload: "Sesión cerrada"
    });
  };
};
