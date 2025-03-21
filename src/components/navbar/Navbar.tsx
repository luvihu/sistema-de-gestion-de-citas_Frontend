import logo from '../../assets/logo.png';
import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

const NAV_LINKS = [
  { id: "nosotros", label: "Nosotros" },
  { id: "servicios", label: "Servicios" },
  { id: "contacto", label: "Contacto" },
];

const NavLinkItem = ({ id, label, closeMenu }: { id: string; label: string; closeMenu: () => void }) => (
  <a
    href={`#${id}`}
    onClick={(e) => {
      e.preventDefault();
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      closeMenu();
    }}
    className="text-stone-900 hover:text-blue-700 px-3 py-2 rounded-md text-lg font-medium font-poppins"
  >
    {label}
  </a>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = useCallback(() => setIsOpen(false), []);
 
  return (
    <nav className="bg-sky-400/20 backdrop-blur-md shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" onClick={handleLinkClick} className="flex-shrink-0">
            <img src={logo} alt="logo" className="h-12 w-auto" />
          </Link>
        
           {/* Enlaces de navegación (Desktop) */}
           <div className="hidden md:flex space-x-8">
            {NAV_LINKS.map((link) => (
              <NavLinkItem key={link.id} {...link} closeMenu={handleLinkClick} />
            ))}
          </div>

          {/* Login Button */}
          <div className="flex items-center">
            <Link to="/login" onClick={handleLinkClick} className="bg-cyan-600 text-white hover:bg-cyan-700 px-3 py-2 rounded-md text-sm font-medium font-poppins">
              Iniciar sesión
            </Link>
            <Link to="/register"
              className="bg-cyan-600 text-white hover:bg-cyan-700 px-3 py-2 rounded-md text-sm font-medium font-poppins ml-2 mr-2"
            >
              Registrarse
            </Link>

            {/* Botón hamburguesa */}
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="md:hidden ml-4 inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-sky-400/10">
              {NAV_LINKS.map((link) => (
                <NavLinkItem key={link.id} {...link} closeMenu={handleLinkClick} />
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

