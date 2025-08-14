import logo from '../../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from 'react-icons/fa';

const socialLinks = [
  {
    href: 'https://facebook.com',
    label: 'Facebook',
    icon: <FaFacebook size={24} />,
    color: 'hover:text-blue-400',
  },
  {
    href: 'https://instagram.com',
    label: 'Instagram',
    icon: <FaInstagram size={24} />,
    color: 'hover:text-orange-400',
  },
  {
    href: 'https://twitter.com',
    label: 'Twitter',
    icon: <FaTwitter size={24} />,
    color: 'hover:text-blue-300',
  },
  {
    href: 'https://linkedin.com',
    label: 'LinkedIn',
    icon: <FaLinkedin size={24} />,
    color: 'hover:text-blue-500',
  },
];

const Footer = () => {

  const navigate = useNavigate();

  const goToHome = () => {
     navigate('/');
    };

  return (
    <footer className="bg-gray-800 text-white pt-8 pb-4" id="contacto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-7 sm:gap-10 md:gap-12 lg:gap-14 lg:grid lg:grid-cols-4">
          {/* Logo y descripción */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left mb-1 lg:mb-0"
          >
            <img 
            src={logo} 
            alt="logo" 
            className="h-12 sm:h-14 md:h-16 w-auto mb-4 cursor-pointer transition-transform hover:scale-105"
            onClick={goToHome} />
            <h3 className="text-white text-lg md:text-xl font-semibold mb-2">Clínica Vital</h3>
            <p className="text-gray-400 text-sm ">
              Tu salud, nuestra prioridad. Atención personalizada y profesional.
            </p>
          </div>

          {/* Información de contacto */}
          <div className="mb-6 lg:mb-0">
            <h3 className="text-base md:text-lg font-semibold mb-4">Contáctanos</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <FaPhone className="mr-2 text-lg" /> (01)-377 8800
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2 text-lg" /> info@clinicavital.com
              </li>
              <li className="flex items-center">
                <FaClock className="mr-2 text-xl" /> Lunes a Viernes, 9:00 AM - 6:00 PM
              </li>
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-xl" />
                Av. de las Artes Norte 714, San Borja, Perú
              </li>
            </ul>
          </div>

          {/* Mapa de Google */}
          <div className="mb-6 lg:mb-0">
            <h3 className="text-base md:text-lg font-semibold mb-4">Ubicación</h3>
            <div className="rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.3148812827217!2d-77.00256332618261!3d-12.09058274271557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c7d1edbee705%3A0xacf01cbbaee9068c!2sAv.%20de%20las%20Artes%20Nte.%20714%2C%20Lima%2015037%2C%20Per%C3%BA!5e0!3m2!1ses!2sus!4v1741209735899!5m2!1ses!2sus"
                className="w-full h-40 sm:h-32"
                loading="lazy"
                title="Ubicación Clínica Vital"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Redes Sociales */}
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="text-base md:text-lg font-semibold mb-4">Síguenos</h3>
            <div className="flex space-x-4 mb-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className={`${link.color} transition-colors`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <p className="text-gray-400 text-xs">¡Conéctate con nosotros!</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400">
            © Copyright 2025. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;