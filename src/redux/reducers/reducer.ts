import { AUTH_USER, 
  AUTH_ERROR, 
  LOGIN_USER, 
  LOGOUT_USER, 
  REGISTER_USER, 
  USER_ID,
  USER_GET,
  UPDATE_USER,
  CREATE_APPOINTMENT,
  FETCH_SPECIALTIESBYID,
  FETCH_SPECIALTIES,
  FETCH_DOCTOR_BY_ID,
  CREATE_SPECIALTY,
  DELETE_SPECIALTY,
  UPDATE_SPECIALTY,
} from "../actions-types";
import { User, Appointment, UserById, SpecialtyDataRedux, UserData } from "../../interfaces/AuthContextProps";
import { AnyAction } from "redux";

export interface AuthState {
  specialties: SpecialtyDataRedux[];
  doctorsBySpecialty: []; 
  doctorsById: [],
  appointment: Appointment | [],
  user: User | null;
  users: UserData[];
  userById: UserById | null;
  error: string | null;
  isLoggedIn: boolean;
  token: string | null;
  role: 'ADMIN' | 'USER'| null;
};

const initialState: AuthState = {
  specialties: [],
  doctorsBySpecialty: [],
  doctorsById: [],
  appointment: [],
  user: null,
  users: [],
  userById: null,
  token: null,
  role: null,
  isLoggedIn: false,
  error: null,
};

const authReducer = (state = initialState, action: AnyAction): AuthState => {
  switch (action.type) {
    case AUTH_USER:
        return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
        isLoggedIn: true,
        error: null
      };
    
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload as string
      };
    case LOGIN_USER:
        return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
        isLoggedIn: true,
        error: null,
      };
    case LOGOUT_USER:
         return initialState;

    case REGISTER_USER:
        return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role || "USER",
        isLoggedIn: true,
        error: null
      };
    case USER_ID:
      return {
        ...state,
        userById: action.payload,
        isLoggedIn: true,
        error: null
      };
    case USER_GET:
      return {
        ...state,
        users: action.payload,
      };
      case UPDATE_USER:
        return {
          ...state,
          // Actualizar el array users
          users: state.users.map((user) => user.id === action.payload.id
            ? {
              ...user,
              name: action.payload.name,
              lastname: action.payload.lastname,
              dni: action.payload.dni,
              telephone: action.payload.telephone,
              photo_profile: action.payload.photo_profile,
              email: action.payload.email,
              password: action.payload.password,
              role: action.payload.role,
            }: user),
          // Actualizar también el objeto user si coincide el ID
          user: state.user && state.user.id === action.payload.id
            ? {
              ...state.user,
              name: action.payload.name,
              lastname: action.payload.lastname,
              dni: action.payload.dni,
              telephone: action.payload.telephone,
              photo_profile: action.payload.photo_profile,
              email: action.payload.email,
              password: action.payload.password,
              role: action.payload.role,
            }
            : state.user,
          // También actualizar userById si coincide el ID
          userById: state.userById && state.userById.id === action.payload.id
            ? {
              ...state.userById,
              name: action.payload.name,
              lastname: action.payload.lastname,
              dni: action.payload.dni,
              telephone: action.payload.telephone,
              photo_profile: action.payload.photo_profile,
              email: action.payload.email,
              password: action.payload.password,
              role: action.payload.role,
            }
            : state.userById
        };
      
    case CREATE_APPOINTMENT:
      return {
        ...state,
        appointment: action.payload,
        isLoggedIn: true,
        error: null
      };
    case FETCH_SPECIALTIESBYID:
      return {
        ...state,
        doctorsBySpecialty: action.payload.doctors,
        isLoggedIn: true,
        error: null
      };
    case FETCH_SPECIALTIES:
      return {
        ...state,
        specialties: action.payload,
      };
    case CREATE_SPECIALTY:
      return {
          ...state,
          specialties: [...state.specialties, action.payload],
      };
    case DELETE_SPECIALTY:
      return {
          ...state,
          specialties: state.specialties.filter((specialty) => specialty.id !== action.payload.id),
      };
    case UPDATE_SPECIALTY:
      return {
          ...state,
          specialties: state.specialties.map((specialty) =>
            specialty.id === action.payload.id ? action.payload : specialty
          )
      };
    case FETCH_DOCTOR_BY_ID:
      return {
        ...state,
        doctorsById: action.payload,
        isLoggedIn: true,
        error: null
      };
    
    default:
      return state;
  }
};
export default authReducer;