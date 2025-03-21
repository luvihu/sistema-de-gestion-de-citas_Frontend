
import React from "react";
import { logoutUser } from "../../redux/actions/user/logoutUser";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

interface NavbarProps {
  title: string;
}

const NavbarDashboard: React.FC<NavbarProps> = ({ title }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
      <button 
      onClick={handleLogout}
      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Cerrar sesión
      </button>
    </header>
  );
};

export default NavbarDashboard;

