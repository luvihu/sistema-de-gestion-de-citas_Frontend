import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SidebarDashboard from "../../components/dashboard/SidebarDashboard";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");
  const location = useLocation();
  const navigate = useNavigate();

  // Sincronizar activeSection con la ruta actual
    useEffect(() => {
      if (location.pathname === "/admin" || location.pathname === "/admin/") {
        setActiveSection("dashboard");
      } else if (location.pathname === "/admin/doctores") {
        setActiveSection("doctors");
      } else if (location.pathname === "/admin/especialidades") {
        setActiveSection("specialties");
      } else if (location.pathname === "/admin/citas") {
        setActiveSection("appointments");
      }
    }, [location.pathname]);

  const handleSectionChange = (section: string) => {{
    setActiveSection(section);
    // Navegar a la ruta correspondiente
    switch (section) {
      case "dashboard":
        navigate("/admin");
        break;
      case "doctors":
        navigate("/admin/doctores");
        break;
      case "specialties":
        navigate("/admin/especialidades");
        break;
      case "appointments":
        navigate("/admin/citas");
        break;
      default:
        navigate("/admin");
    }
  }};

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden" >
      {/* Sidebar */}
      <SidebarDashboard activeSection={activeSection} setActiveSection={handleSectionChange} />

      {/* Contenedor principal */}
      <div className="flex flex-col flex-1 overflow-hidden">
                
        {/* Contenido dinámico */}
        <main className="flex-1 p-6 bg-white shadow-md overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;



