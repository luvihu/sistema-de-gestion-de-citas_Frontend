import portadaClinicc from '../assets/portada-clinic.jpg';
import { useNavigate } from 'react-router-dom';
import Servicios  from '../components/servicios/Servicios';
import Nosotros from '../components/servicios/Nosotros';
import Footer from '../components/footer/Footer';

const Home = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    };
    return (
        <div className="h-screen pt-16  ">
            <div className="relative h-[calc(100vh-4rem)] overflow-x-auto">
                <div className="absolute inset-0">
                    <img 
                        src={portadaClinicc}
                        alt="Background Clínica" 
                        className="w-full h-full object-fill"
                    />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/10 to-cyan-900/40"></div>
                </div>

                {/* Contenido principal */}
                <div className="relative z-10 h-full flex flex-col  ">
                  <div className='flex items-start pt-32'>
                    <div className="ml-20 bg-white/65 backdrop-blur-sm p-10 rounded-lg shadow-lg max-w-lg">
                        <div className="mb-8">
                            <h2 className="text-3xl text-cyan-800 mb-1 font-medium font-playfair">Clínica</h2>
                            <h1 className="text-6xl  text-cyan-900 font-medium font-poppins">Vital</h1>
                        </div>
                        <p className="text-cyan-700 text-xl mb-8 border-l-4 border-cyan-600 pl-4">
                            Central telefónica: <br/>
                            <span className="font-semibold">(01) 377-8800</span>
                        </p>
                        <div>
                            <button 
                                type="button"
                                onClick={handleLogin}
                                className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-12 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                            >
                                Agenda tu cita
                            </button>
                        </div>
                    </div>
                  </div>
                 <div className='items-center mt-40 p-4'>
                    <Nosotros/>
                 </div>
                  <div className='flex justify-center items-center p-4'>
                    <Servicios/>
                 </div>
                <Footer/>
                </div>
            </div>

         </div>
    );
};

export default Home;

