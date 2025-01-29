import logo from '../../assets/logo.png';
import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-sky-400/10 shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/">
              <img src={logo} alt="logo" className="h-12 w-auto" />
            </a>
          </div>

          {/* Enlaces de navegación para pantallas grandes */}
          <div className="hidden md:flex space-x-8">
            <a href="/about" className="text-stone-900 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium font-poppins">
              Especialidades
            </a>
            <a href="/doctors" className="text-stone-900 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium font-poppins">
              Staff médico
            </a>
            <a href="/services" className="text-stone-900 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium font-poppins">
              Servicios
            </a>
            <a href="/sedes" className="text-stone-900 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium font-poppins">
              Sedes
            </a>
            <a href="/contact" className="text-stone-900 hover:text-blue-700 px-3 py-2 rounded-md text-sm font-medium font-poppins">
              Contacto
            </a>
          </div>

          {/* Login Button - visible en todas las pantallas */}
          <div className="flex items-center">
            <a href="/login" className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md text-sm font-medium font-poppins">
              Login
            </a>
            
            {/* Botón hamburguesa */}
            <button
              onClick={() => setIsOpen(!isOpen)}
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
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
              <a href="/about" className="block text-gray-800 hover:text-blue-700 px-3 py-2 rounded-md text-base font-medium font-poppins">
                Especialidades
              </a>
              <a href="/doctors" className="block text-gray-800 hover:text-blue-700 px-3 py-2 rounded-md text-base font-medium font-poppins">
                Staff médico
              </a>
              <a href="/services" className="block text-gray-800 hover:text-blue-700 px-3 py-2 rounded-md text-base font-medium font-poppins">
                Servicios
              </a>
              <a href="/sedes" className="block text-gray-800 hover:text-blue-700 px-3 py-2 rounded-md text-base font-medium font-poppins">
                Sedes
              </a>
              <a href="/contact" className="block text-gray-800 hover:text-blue-700 px-3 py-2 rounded-md text-base font-medium font-poppins">
                Contacto
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
