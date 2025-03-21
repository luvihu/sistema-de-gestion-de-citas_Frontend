
import React from "react";
import Inicio from "./sectionsMain/Inicio";
import NuevaCita from "./sectionsMain/NuevaCita";
import MisCitas from "./sectionsMain/MisCitas";
import Especialidades from "./sectionsMain/Especialidades";

interface MainContentProps {
  activeSection: string;
}

const MainContent: React.FC<MainContentProps> = ({ activeSection }) => {
  const renderContent = () => {
    switch (activeSection) {
      case "inicio":
        return <Inicio />;
        case "nueva-cita":
          return <NuevaCita />;
        case "mis-citas":
          return <MisCitas />;
        case "especialidades":
          return <Especialidades />;
        default:
          return <Inicio />;
    }
  };

  return <main className="flex-1 p-8">{renderContent()}</main>;
};

export default MainContent;
