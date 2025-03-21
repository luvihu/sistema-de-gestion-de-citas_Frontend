import { FaFlask, FaAmbulance, FaHospital, FaFirstAid  } from 'react-icons/fa';

const Servicios = () => {
    return (
      <div className="container mx-auto px-4 py-14 max-w-7xl bg-gray-50" id="servicios">
        <h2 className="text-3xl md:text-4xl font-bold font-playfair text-cyan-950 mb-10 text-center">
          Tu cuidado y bienestar es primero
        </h2>
        <p className="text-lg md:text-xl text-gray-600 text-center mb-12 font-light">
          Conoce los servicios que tenemos para tí
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <FaFlask className="text-5xl text-cyan-600 mb-4" />
            <span className="text-xl text-center font-semibold text-gray-800">Laboratorio</span>
          </div>

          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <FaAmbulance className="text-5xl text-cyan-600 mb-4" />
            <span className="text-xl text-center font-semibold text-gray-800">Ambulancias</span>
          </div>

          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <FaHospital className="text-5xl text-cyan-600 mb-4" />
            <span className="text-xl text-center font-semibold text-gray-800">Hospitalización</span>
          </div>

          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <FaFirstAid className="text-5xl text-cyan-600 mb-4" />
            <span className="text-xl text-center font-semibold text-gray-800">Emergencia</span>
          </div>
        </div>
      </div>
    );
};

export default Servicios;
