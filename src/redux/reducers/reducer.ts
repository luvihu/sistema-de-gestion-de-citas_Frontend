import { AUTH_USER, AUTH_ERROR, LOGIN_USER} from "../actions-types";
import { User } from "../../interfaces/AuthContextProps";

export interface AuthState {
  user: User | null;
  error: string | null;
  isLoggedIn: boolean;
  accessToken: string | null;
};
export interface AuthAction {
  type: typeof AUTH_USER | typeof LOGIN_USER | typeof AUTH_ERROR;
  payload: User | string | { user: User; token: string };
}

const initialState: AuthState = {
  user: null,
  error: null,
  isLoggedIn: false,
  accessToken: null
};
const authReducer = (state = initialState, action: AuthAction): AuthState => {
  let loginPayload;
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        user: action.payload as User,
        isLoggedIn: true,
        error: null
      };
    
    case AUTH_ERROR:
      return {
        ...state,
        user: null,
        accessToken: null,
        isLoggedIn: false,
        error: action.payload as string
      };
    case LOGIN_USER:
      loginPayload = action.payload as { user: User; token: string };
      return {
        ...state,
        user: loginPayload.user,
        accessToken: loginPayload.token,
        isLoggedIn: true,
        error: null
      };

    default:
      return state;
  }
};
export default authReducer;