
import logo from "../assets/logo.png";
import logoMain from "../assets/logoMain.jpg";
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "../components/users/ProfileMenu";
import Sidebar from "../components/sidebar/Siderbar";
import MainContent from "../components/mainContent/MainContent";

const HomeUsers = () => {
  const [activeSection, setActiveSection] = useState("inicio");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Sincronizar activeSection con la ruta actual
  useEffect(() => {
    if (location.pathname === "/user" || location.pathname === "/user/") {
      setActiveSection("inicio");
    } else if (location.pathname === "/user/nuevacita") {
      setActiveSection("nueva-cita");
    } else if (location.pathname === "/user/miscitas") {
      setActiveSection("mis-citas");
    } else if (location.pathname === "/user/especialidades") {
      setActiveSection("especialidades");
    }
  }, [location.pathname]);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    
    // Navegar a la ruta correspondiente
    switch (section) {
      case "inicio":
        navigate("/user");
        break;
      case "nueva-cita":
        navigate("/user/nuevacita");
        break;
      case "mis-citas":
        navigate("/user/miscitas");
        break;
      case "especialidades":
        navigate("/user/especialidades");
        break;
      default:
        navigate("/user");
    }
    
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <button
            className="md:hidden text-gray-700 text-2xl"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            ☰
          </button>
          <a href="/">
            <img src={logo} alt="logo" className="h-12 w-auto" />
          </a>
          <ProfileMenu />
        </div>
      </header>

      {/* Contenedor principal que incluye sidebar y contenido */}
      <div className="flex flex-1 relative">
        {/* Sidebar responsivo - Fijo en escritorio */}
        <div
          className={`fixed md:sticky inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:w-64 top-[61px] h-[calc(100vh-61px)]`}
        >
          <Sidebar activeSection={activeSection} setActiveSection={handleSectionChange} />
        </div>
        
        {/* Overlay para cerrar el menú en móviles */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-20 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Contenido principal - Expandible */}
        <main
          className="flex-1 overflow-auto bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${logoMain})`,
            backgroundAttachment: "fixed",
          }}
        >
          <div className="min-h-full w-full bg-gray-200 bg-opacity-20 p-4">
            <MainContent>
              <Outlet />
            </MainContent>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomeUsers;


