
import React from "react";

interface SidebarProps {
  activeSection: string;
  setActiveSection: (id: string) => void;
}

const SidebarDashboard: React.FC<SidebarProps> = ({ activeSection, setActiveSection }) => {
  const sidebarItems = [
    { id: "dashboard", label: "Inicio", icon: "🏠" },
    { id: "doctors", label: "Doctores", icon: "🩺" },
    { id: "specialties", label: "Especialidades", icon: "🏥" },
    { id: "appointments", label: "Citas", icon: "📅" },
  ];

  return (
    <aside className="w-20 md:w-64 bg-white shadow-lg border-r border-gray-200 h-screen transition-all duration-300">
      <nav className="p-4">
        <ul className="space-y-6 font-semibold text-gray-900">
          {sidebarItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center w-full px-4 py-3 rounded-md transition-all ${
                  activeSection === item.id ? "bg-blue-500 text-white" : "hover:bg-blue-100"
                }`}
              >
                <span className="text-xl mr-3">{item.icon}</span>
                <span className="hidden md:inline">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default SidebarDashboard;

