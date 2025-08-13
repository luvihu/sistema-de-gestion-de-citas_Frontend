import { 
  SUMMARY_DASHBOARD,
  FETCH_DOCTORS, 
  CREATE_DOCTOR, 
  DELETE_DOCTOR, 
  UPDATE_DOCTOR,
  FETCH_APPOINTMENTS,
  DELETE_APPOINT,
  UPDATE_APPOINT
} from "../actions-types";
import { AnyAction } from "redux";
import { DoctorDashboard, AppointmentsData } from "../../interfaces/AuthContextProps";

export interface DashboardState {
  totalDoctors: number;
  totalSpecialties: number;
  totalMonthAppointments: number;
  topDoctor: string | null;
  topSpecialty: string | null;
  doctors: DoctorDashboard[];
  appointments: AppointmentsData[];
}

const initialState: DashboardState = {
  totalDoctors: 0,
  totalSpecialties: 0,
  totalMonthAppointments: 0,
  topDoctor: null,
  topSpecialty: null,
  doctors: [],
  appointments: []
};

const dashboardReducer = (state = initialState, action: AnyAction): DashboardState => {
   switch (action.type) {
    case SUMMARY_DASHBOARD:
      return {
        ...state,
        ...action.payload
      };
    case FETCH_DOCTORS:
      return {
        ...state,
        doctors: action.payload
      };
    case CREATE_DOCTOR:
      return {
        ...state,
        doctors: [...state.doctors, action.payload]
      };
    case DELETE_DOCTOR:
      return {
        ...state,
        doctors: state.doctors.filter(doctor => doctor.id !== action.payload.id)
      };
    case UPDATE_DOCTOR:
      return {
        ...state,
        doctors: state.doctors.map(doctor => 
          doctor.id === action.payload.id 
          ? {
            ...doctor,
            name: action.payload.name,
            lastname: action.payload.lastname,
            days_atention: action.payload.days_atention,
            hours_attention: action.payload.hours_attention,
            telephone: action.payload.telephone,
            email: action.payload.email,
            active: action.payload.active,
            specialty: action.payload.specialty,
            appointments: action.payload.appointments
          }
        : doctor
        )
      };
    case FETCH_APPOINTMENTS:
      return {
        ...state,
        appointments: action.payload
      };
    case UPDATE_APPOINT:
      return {
        ...state,
        appointments: state.appointments.map(appointment =>
          appointment.id === action.payload.id
          ? {
            ...appointment,
            status: action.payload.status,
            date: action.payload.date,
            hour: action.payload.hour,
            date_creation: action.payload.date_creation,
            user: action.payload.user,
            doctor: action.payload.doctor
          }
        : appointment
        )
      };
    case DELETE_APPOINT:
      return {
        ...state,
        appointments: state.appointments.filter(appointment => appointment.id !== action.payload.id)
      };
    default:
      return state;
  }
};

export default dashboardReducer;
