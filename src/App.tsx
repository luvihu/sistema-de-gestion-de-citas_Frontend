import './App.css'
import  Home  from './views/Home';
import Navbar from './components/navbar/Navbar';
import Register from './views/Register';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import  { AuthProvider } from './context/AuthContext';
import { Routes, Route, useLocation} from 'react-router-dom';
import ProtectedRoute from './components/protected/ProtectedRoute';

function App() {
  const { pathname } = useLocation();
  return (
      <AuthProvider>
        <main>
          {pathname !== "/login" && 
          pathname !== "/register" && <Navbar />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={
              <ProtectedRoute requiredRole='ADMIN'>
                <Dashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
       </AuthProvider>
     )
}

export default App
