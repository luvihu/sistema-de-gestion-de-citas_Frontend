import  Home  from './views/Home';
import Navbar from './components/navbar/Navbar';
import Register from './views/Register';
import Login from './views/Login';
import Dashboard from './views/viewsDashboard/Dashboard';
import HomeUsers from './views/HomeUsers';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authUser } from './redux/actions/user/authUser';
import { AppDispatch} from './redux/store';
import ProtectedRoute from './components/protected/ProtectedRoute';
import Profile from './components/users/Profile';
import Inicio from './components/mainContent/sectionsMain/Inicio';
import NuevaCita from './components/mainContent/sectionsMain/NuevaCita';
import MisCitas from './components/mainContent/sectionsMain/MisCitas';
import Especialidades from './components/mainContent/sectionsMain/Especialidades';
import HomeDashboaard from './components/dashboard/HomeDashboard';
import DoctorManagement from './components/dashboard/DoctorManagement';
import SpecialtiesManagement from './components/dashboard/SpecialtiesManagement';
import AppointmentsReports from './components/dashboard/AppointmentsReports';


function App() {
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();
 
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log("Token encontrado en localStorage:", token);
    if (token) {
        dispatch(authUser(token));
     }
  },[dispatch] );

  const showNavbar = pathname === "/";
  return (
      <main>
         { showNavbar && <Navbar />}
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              <Route 
                path="/admin/*" 
                element={
                  <ProtectedRoute roleRequired="ADMIN">
                    <Dashboard />
                  </ProtectedRoute>
                } 
               > 
                <Route index element={<HomeDashboaard/>} />
                <Route path="doctores" element={<DoctorManagement />} />
                <Route path="especialidades" element={<SpecialtiesManagement />} />
                <Route path="citas" element={<AppointmentsReports />} />
                </Route>
              <Route 
                path="/user/*" 
                element={
                  <ProtectedRoute roleRequired="USER">
                    <HomeUsers />
                  </ProtectedRoute>
                }>
                  <Route index element={<Inicio />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="miscitas" element={<MisCitas />} />
                  <Route path="nuevacita" element={<NuevaCita />} />
                  <Route path="especialidades" element={<Especialidades />} />

              </Route>
              
              <Route path="/unauthorized" element={<h1>No tiene permiso</h1>} />
              <Route path="*" element={<h1>404</h1>} />
          </Routes>
      </main>
   );
}

export default App

