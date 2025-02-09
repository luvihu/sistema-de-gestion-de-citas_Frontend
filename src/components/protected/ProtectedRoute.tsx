import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface ProtectedRouteProps {
  roleRequired?: "ADMIN" | "USER";
}
const ProtectedRoute = ({ roleRequired }: ProtectedRouteProps) => {
  const auth = useSelector((state: RootState) => state.auth);
  // if(!auth) {
  //   return <Navigate to="/" />;
  // }
  const { isLoggedIn, user } = auth;
  if(!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  if(roleRequired && user?.role !== roleRequired) {
    return <Navigate to="/unauthorized" />;
  }
  return <Outlet />;

};

export default ProtectedRoute;

