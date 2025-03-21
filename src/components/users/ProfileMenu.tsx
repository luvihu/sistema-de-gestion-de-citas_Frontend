import React, { useState, useRef, useEffect  } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { logoutUser } from "../../redux/actions/user/logoutUser";
import { useNavigate, Link } from "react-router-dom";
import { AppDispatch } from "../../redux/store";

const ProfileMenu: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div ref={menuRef} className="relative">
      <div
        className="flex items-center cursor-pointer"
        onClick={() => setIsProfileOpen(!isProfileOpen)}
      >
        <img
          src={user?.photo_profile || "/default-profile.png"}
          alt="Profile"
          className="h-12 w-12 rounded-full mr-2"
        />
        <span className="mr-2">{user?.name} {user?.lastname}</span>
        <svg
          className="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {isProfileOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
          <Link to="/user/profile" className="block px-4 py-2 hover:bg-gray-100">
            Perfil
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
