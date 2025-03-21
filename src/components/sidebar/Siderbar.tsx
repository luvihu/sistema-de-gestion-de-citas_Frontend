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
    <aside className="w-80 md:w-60 bg-white shadow-xl h-screen overflow-y-auto">
      <nav className="p-4 md:p-6">
        <ul className="flex flex-col gap-4 font-semibold text-blue-950">
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

