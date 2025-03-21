import { useState } from "react";
import SidebarDashboard from "../../components/dashboard/SidebarDashboard";
import NavbarDashboard from "../../components/dashboard/NavbarDashboard";
import HomeDashboard from "../../components/dashboard/HomeDashboard";
import DoctorManagement from "../../components/dashboard/DoctorManagement";
import SpecialtiesManagement from "../../components/dashboard/SpecialtiesManagement";
import AppointmentsReports from "../../components/dashboard/AppointmentsReports";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "doctors":
        return <DoctorManagement />;
      case "specialties":
        return <SpecialtiesManagement />;
      case "appointments":
        return <AppointmentsReports />;
      default:
        return <HomeDashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden" >
      {/* Sidebar */}
      <SidebarDashboard activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Contenedor principal */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Navbar */}
        <NavbarDashboard title="Panel de Administración" />
        
        {/* Contenido dinámico */}
        <main className="flex-1 p-6 bg-white shadow-md overflow-auto">{renderContent()}</main>
      </div>
    </div>
  );
};

export default Dashboard;



