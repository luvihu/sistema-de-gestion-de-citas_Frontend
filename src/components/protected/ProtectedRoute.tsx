import React, {useContext} from 'react';
import  { Navigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const ProtectedRoute = ({ requiredRole, children }: { requiredRole: 'ADMIN' | 'USER', children: React.ReactNode }) => {
  const auth = useContext(AuthContext);
  
  if (!auth?.isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (auth.user?.role !== requiredRole) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};
export default ProtectedRoute;
