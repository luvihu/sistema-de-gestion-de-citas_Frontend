import { combineReducers } from "redux";
import authReducer from "./reducer" // Importa el reducer de autenticación
import dashboardReducer from "./dashboardReducer";

// Combina todos los reducers en uno solo
const rootReducer = combineReducers({
  auth: authReducer, 
  dashboard: dashboardReducer,
  // Agrega otros reducers aquí cuando los tengas
});

// Exporta el tipo RootState, que representa todo el estado global de Redux
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

// Define el tipo RootState basado en la estructura real de los reducers combinados
// Es el punto central donde se define la estructura del estado global
// Sirve como fuente de verdad para el tipado del estado