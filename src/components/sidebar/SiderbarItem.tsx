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
        className={`w-40 md:w-full flex items-center px-2 py-2 mb-2  md:py-2 rounded-md transition-all duration-300 
          ${isActive ? "bg-sky-300 text-black font-semibold" : "hover:bg-sky-100"}
        `}
      >
        {/* Icono responsivo */}
        <span className="text-xl md:text-2xl mr-2 transform transition-transform duration-200 hover:scale-110 md:hover:scale-125">
          {icon}
        </span>
        
        {/* Texto responsivo */}
        <span className="text-md md:text-lg">{label}</span>
      </button>
    </li>
  );
};

export default SidebarItem;
