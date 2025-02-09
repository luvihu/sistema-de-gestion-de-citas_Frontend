import './App.css'
import  Home  from './views/Home';
import Navbar from './components/navbar/Navbar';
import Register from './views/Register';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import Profile from './views/Profile';
import { Routes, Route, useLocation} from 'react-router-dom';
import ProtectedRoute from './components/protected/ProtectedRoute';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authUser } from './redux/actions/user/authUser';
import { AppDispatch } from './redux/store';
function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(authUser(token));
    }
  }, []);
  return (
      <main>
          { 
          pathname !== "/register" && <Navbar />}
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route element={<ProtectedRoute />}>
                 <Route path="/profile" element={<Profile />} />
              </Route>
              <Route element={<ProtectedRoute roleRequired='ADMIN' />}>
                 <Route path="/admin" element={<Dashboard />} />
              </Route>
              <Route path="/unauthorized" element={<h1>No tiene permiso</h1>} />
              <Route path="*" element={<h1>404</h1>} />
          </Routes>
      </main>
   );
}

export default App
