import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
// import { useState, useEffect } from 'react';

interface ProtectedRouteProps {
  roleRequired?: "ADMIN" | "USER";
  children: React.ReactNode;
}

const ProtectedRoute = ({ roleRequired, children }: ProtectedRouteProps) => {
  const auth = useSelector((state: RootState) => state.auth);
  const { user, isLoggedIn } = auth;

   //Si no está autenticado, redirige al home
  if (!isLoggedIn || !user) {
    return <Navigate to="/" replace />;
  }

 // Si el usuario no tiene el rol correcto, lo manda a "No autorizado"
  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;

  // const [isAuthorized, setIsAuthorized] = useState(false);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   if (!isLoggedIn || !user) {
  //     setIsAuthorized(false);
  //     setIsLoading(false);
  //     return;
  //   }

  //   if (user.role === roleRequired) {
  //     setIsAuthorized(true);
  //   } else {
  //     setIsAuthorized(false);
  //   }
  //   setIsLoading(false);
  // }, [isLoggedIn, user, roleRequired]);

  // if (isLoading) {
  //   return <h1>Cargando...</h1>;
  // }

  // if (!isAuthorized && !isLoggedIn) {
  //   return <Navigate to="/" replace />;
  // }

  // if (!isAuthorized && isLoggedIn) {
  //   return <Navigate to="/unauthorized" replace />;
  // }

  // return <>{children}</>;
        
};

export default ProtectedRoute;

