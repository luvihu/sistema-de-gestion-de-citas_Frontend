import logo from '../../assets/logo.png';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6" id='contacto'>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Logo y descripción */}
          <div className="flex flex-col items-center md:items-start">
            <img src={logo} alt="logo" className="h-16 w-auto mb-4"/>
            <h3 className='text-white'>Clínica Vital</h3>
          </div>

          {/* Información de contacto */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contáctanos</h3>
            <div className="space-y-3">
              <p className="flex items-center"><FaPhone className="mr-2 text-lg"/> (01)-377 8800</p>
              <p className="flex items-center"><FaEnvelope className="mr-2 text-lg"/> info@clinicavital.com</p>
              <p className="flex items-center"><FaClock className="mr-2 text-xl"/> Lunes a Viernes, 9:00 AM - 6:00 PM</p>
              <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-xl"/>Av. de las Artes Norte 714, San Borja, Perú</p>
            </div>
          </div>

          {/* Mapa de Google */}
          <div>
            <h3 className="text-xl font-bold mb-6">Ubicación</h3>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.3148812827217!2d-77.00256332618261!3d-12.09058274271557!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c7d1edbee705%3A0xacf01cbbaee9068c!2sAv.%20de%20las%20Artes%20Nte.%20714%2C%20Lima%2015037%2C%20Per%C3%BA!5e0!3m2!1ses!2sus!4v1741209735899!5m2!1ses!2sus"
              className="w-full h-40 rounded-lg"
              loading="lazy"
            ></iframe>
          </div>

          {/* Redes Sociales */}
          <div>
            <h3 className="text-xl font-bold mb-6">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="hover:text-blue-300 transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400">© Copyright 2025. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
