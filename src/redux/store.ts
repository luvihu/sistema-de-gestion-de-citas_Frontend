import { createStore, applyMiddleware, compose, Store, AnyAction } from "redux";
import rootReducer, { RootState } from "./reducers"; 
import { thunk, ThunkDispatch } from "redux-thunk";
import { AuthState } from "./reducers/reducer";
import { DashboardState } from "./reducers/dashboardReducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 📌 Función para cargar el estado desde localStorage
const loadState = (): Partial<AuthState> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return {}; // Si no hay token, no se carga estado

    return {
      user: JSON.parse(localStorage.getItem("user") || "null"),
      token,
      role: (localStorage.getItem("role") as "ADMIN" | "USER" | null) || null,
      isLoggedIn: true,
    };
  } catch (error) {
    console.error("Error al cargar el estado desde localStorage:", error);
    return {}; // Evita que se rompa la aplicación
  }
};

// 🌟 Solo persistimos user, token y role
// const persistedState = {
//   auth: loadState(),
// };
const persistedState: { auth: AuthState, dashboard: DashboardState } = {
  auth: {
    specialties: [],
    doctorsBySpecialty: [],
    doctorsById: [],
    appointment: [],
    user: loadState().user || null,
    users: [],
    userById: null,
    token: loadState().token || null,
    role: loadState().role || null,
    isLoggedIn: loadState().isLoggedIn || false,
    error: null,
  },
  dashboard: {
    totalDoctors: 0,
    totalSpecialties: 0,
    totalMonthAppointments: 0,
    topDoctor: null,
    topSpecialty: null,
    doctors: [],
    appointments: []
  }
};


const store: Store<RootState, AnyAction> = createStore(
  rootReducer,
  persistedState, 
  composeEnhancer(applyMiddleware(thunk))
);

// 📌 Suscribirse para actualizar `localStorage`
store.subscribe(() => {
  try {
    const { auth } = store.getState();
    if (auth.isLoggedIn) {
      localStorage.setItem("user", JSON.stringify(auth.user));
      localStorage.setItem("token", auth.token || "");
      localStorage.setItem("role", auth.role || "");
    } else {
      ["user", "token", "role"].forEach(key => localStorage.removeItem(key));
    }
  } catch (error) {
    console.error("Error al guardar en localStorage:", error);
  }
});

export type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;
export type { RootState };
export default store;
