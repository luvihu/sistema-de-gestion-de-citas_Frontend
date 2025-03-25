import React from "react";
import SidebarItem from "./SiderbarItem";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const sidebarItems = [
    { id: "inicio", label: "Inicio", icon: "🏠" },
    { id: "nueva-cita", label: "Nueva Cita", icon: "📅" },
    { id: "mis-citas", label: "Mis Citas", icon: "📋" },
    { id: "especialidades", label: "Especialidades", icon: "🏥" },
  ];

  return (
    <aside className="h-full bg-gradient-to-b from-blue-50 to-white shadow-xl border-r border-gray-200 flex flex-col overflow-y-auto">
      <div className="p-4 border-b border-gray-100">
        <h2 className="hidden md:block text-xl font-poppins font-bold text-blue-600">Portal Paciente</h2>
        <p className="hidden md:block text-xs text-gray-500 mt-1">Gestión de citas</p>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-3 font-poppins">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.id}
              id={item.id}
              label={item.label}
              icon={item.icon}
              isActive={activeSection === item.id}
              onClick={setActiveSection}
            />
          ))}
        </ul>
      </nav>
        
    </aside>
  );
};

export default Sidebar;

