// import React, { useState, useRef, useEffect  } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../../redux/store";
// import { logoutUser } from "../../redux/actions/user/logoutUser";
// import { useNavigate, Link } from "react-router-dom";
// import { AppDispatch } from "../../redux/store";

// const ProfileMenu: React.FC = () => {
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const menuRef = useRef<HTMLDivElement>(null);
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const user = useSelector((state: RootState) => state.auth.user);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setIsProfileOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     navigate("/");
//   };

//   return (
//     <div ref={menuRef} className="relative">
//       <div
//         className="flex items-center cursor-pointer"
//         onClick={() => setIsProfileOpen(!isProfileOpen)}
//       >
//         <img
//           src={user?.photo_profile || "/default-profile.png"}
//           alt="Profile"
//           className="h-12 w-12 rounded-full mr-2"
//         />
//         <span className="mr-2">{user?.name} {user?.lastname}</span>
//         <svg
//           className="w-5 h-5 text-gray-600"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M19 9l-7 7-7-7"
//           />
//         </svg>
//       </div>

//       {isProfileOpen && (
//         <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
//           <Link to="/user/profile" className="block px-4 py-2 hover:bg-gray-100">
//             Perfil
//           </Link>
//           <button
//             onClick={handleLogout}
//             className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//           >
//             Cerrar Sesión
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ProfileMenu;

import React, { useState, useRef, useEffect } from "react";
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
        className="flex items-center cursor-pointer bg-white hover:bg-blue-50 rounded-full px-3 py-2 transition-all duration-200 shadow-md"
        onClick={() => setIsProfileOpen(!isProfileOpen)}
      >
        <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-blue-100 shadow-sm mr-2">
          <img
            src={user?.photo_profile || "/default-profile.png"}
            alt="Profile"
            className="h-full w-full object-cover"
          />
        </div>
        <span className="font-poppins text-sm font-medium text-gray-700 mr-2 hidden md:block">
          {user?.name} {user?.lastname}
        </span>
        <svg
          className={`w-4 h-4 text-blue-600 transition-transform duration-200 ${isProfileOpen ? 'transform rotate-180' : ''}`}
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
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl z-50 border border-gray-100 overflow-hidden transition-all duration-200 transform origin-top-right">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900 font-poppins">
              {user?.name} {user?.lastname}
            </p>
            <p className="text-xs text-gray-500 truncate font-poppins">
              {user?.email}
            </p>
          </div>
          <Link 
            to="/user/profile" 
            className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 transition-colors duration-200 font-poppins"
          >
            <svg className="w-5 h-5 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Mi Perfil
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 font-poppins flex items-center"
          >
            <svg className="w-5 h-5 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
