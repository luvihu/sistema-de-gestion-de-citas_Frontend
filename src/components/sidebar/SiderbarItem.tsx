import React from "react";

interface SidebarItemProps {
  id: string;
  label: string;
  icon: string;
  isActive: boolean;
  onClick: (id: string) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ id, label, icon, isActive, onClick }) => {
  return (
    <li>
      <button
        onClick={() => onClick(id)}
        className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200
          ${
            isActive 
              ? "bg-blue-600 text-white shadow-md" 
              : "text-gray-700 hover:bg-blue-100"
          }
        `}
      >
        {/* Icono responsivo */}
        <span className="text-xl mr-3 transform transition-transform duration-200 hover:scale-110">
          {icon}
        </span>
       
        {/* Texto responsivo */}
        <span className="hidden md:inline font-medium">{label}</span>
      </button>
    </li>
  );
};

export default SidebarItem;
