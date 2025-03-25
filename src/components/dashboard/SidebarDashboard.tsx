import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { logoutUser } from "../../redux/actions/user/logoutUser";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (id: string) => void;
}

const SidebarDashboard: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const sidebarItems = [
    { id: "dashboard", label: "Panel de Control", icon: "🏠" },
    { id: "doctors", label: "Panel de Doctores", icon: "🩺" },
    { id: "specialties", label: "Especialidades", icon: "🏥" },
    { id: "appointments", label: "Citas Médicas", icon: "📅" }
  ];
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const handleLogout = () => {
      dispatch(logoutUser());
      navigate("/");
  };
  
  return (
    <aside className="w-20 md:w-64 bg-gradient-to-b from-blue-50 to-white shadow-xl border-r border-gray-200 h-screen transition-all duration-300 flex flex-col justify-between">
      <div>
        <div className="p-4 border-b border-gray-100">
          <h2 className="hidden md:block text-xl font-poppins font-bold text-blue-600">Sistema Médico</h2>
          <p className="hidden md:block text-xs text-gray-500 mt-1">Panel de Administración</p>
        </div>
        
        <nav className="p-4 mt-4">
          <ul className="space-y-3 font-poppins">
            {sidebarItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center w-full px-4 py-3 rounded-lg transition-all duration-200 ${
                    activeSection === item.id 
                      ? "bg-blue-600 text-white shadow-md" 
                      : "text-gray-700 hover:bg-blue-100"
                  }`}
                >
                  <span className="text-xl mr-3">{item.icon}</span>
                  <span className="hidden md:inline font-medium">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      <div className="p-4 mb-6">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center md:justify-start px-4 py-3 rounded-lg text-red-600 font-poppins font-medium hover:bg-red-50 transition-all duration-200"
        >
          <span className="text-xl mr-3">🚪</span>
          <span className="hidden md:inline">Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default SidebarDashboard;
