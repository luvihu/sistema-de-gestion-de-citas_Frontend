import { createStore, applyMiddleware, compose, Store, AnyAction } from "redux";
import rootReducer, { RootState } from "./reducers"; 
import {thunk, ThunkDispatch} from "redux-thunk";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 🛠️ Corrección: Asegurar que `store` tenga el tipo `Store<RootState, AnyAction>`
const store: Store<RootState, AnyAction> = createStore(
  rootReducer,
  undefined, // 👈 Inicializamos el estado global explícitamente
  composeEnhancer(applyMiddleware(thunk))
);

// ✅ Tipado correcto de `dispatch`
export type { RootState };
export type AppDispatch = ThunkDispatch<RootState, undefined, AnyAction>;

export default store;







// import { createStore, applyMiddleware, compose, Reducer } from 'redux';
// import rootReducer from './reducers/index';
// import {thunk, ThunkDispatch, ThunkAction} from 'redux-thunk';
// import { AuthState, AuthAction} from './reducers/reducer';

// interface StoreState {
//   auth: AuthState;
// }
// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//   }
// }

// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const typedRootReducer = (rootReducer as unknown) as Reducer<StoreState, AuthAction>;

// const store = createStore(
//   typedRootReducer,
//   composeEnhancer(applyMiddleware(thunk))
// );

// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   StoreState,
//   undefined,
//   AuthAction
// >;

// export type AppDispatch = ThunkDispatch<StoreState, undefined, AuthAction>; // Esto ayuda a tipar `dispatch`
// export type RootState = ReturnType<typeof rootReducer>;
// export default store;


 // Exporta el tipo RootState para que otros componentes puedan importarlo directamente desde el store
// Facilita el uso con los hooks personalizados como useAppSelector
 // Mejora la accesibilidad del tipo en toda la aplicación
