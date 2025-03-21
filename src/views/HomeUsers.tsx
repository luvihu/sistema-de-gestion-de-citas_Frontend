import logo from "../assets/logo.png";
import logoMain from "../assets/logoMain.jpg";
import { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "../components/users/ProfileMenu";
import Sidebar from "../components/sidebar/Siderbar";
import MainContent from "../components/mainContent/MainContent";

const HomeUser = () => {
  const [activeSection, setActiveSection] = useState("inicio");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isProfilePath = location.pathname === "/user/profile";

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    navigate("/user");
    setIsSidebarOpen(false); // Cerrar sidebar en móviles al cambiar de sección
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

      <div className="flex flex-1">
        {/* Sidebar responsivo */}
        <div
          className={`fixed inset-y-0 left-0 z-50 transform bg-white shadow-lg w-48 transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0 md:w-60`}
        >
          <div className="h-full overflow-hidden">
            <Sidebar activeSection={activeSection} setActiveSection={handleSectionChange} />
          </div>
        </div>
        {/* Overlay para cerrar el menú en móviles */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-20 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Contenido principal */}
        <main
          className="flex-1 relative z-0 bg-cover bg-center bg-no-repeat min-h-screen"
          style={{
            backgroundImage: `url(${logoMain})`,
            backgroundAttachment: "fixed",
          }}
        >
          <div className="min-h-full w-full bg-gray-200 bg-opacity-20 p-4">
            {isProfilePath ? <Outlet /> : <MainContent activeSection={activeSection} />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomeUser;





