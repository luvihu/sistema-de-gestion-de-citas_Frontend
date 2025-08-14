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
        <div className="flex flex-col min-h-screen pt-16 ">
            <div className="relative h-[calc(100vh-4rem)] overflow-`x-auto">
                <div className="absolute inset-0">
                    <img 
                        src={portadaClinicc}
                        alt="Background Clínica" 
                        className="w-full h-full object-fill mb-16"
                        loading="lazy"
                    />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/10 to-cyan-900/40"></div>
                </div>

                {/* Contenido principal */}
                <div className="relative z-10 h-full flex flex-col">
                    <div className='flex flex-col md:flex-row items-start pt-28 md:pt-32'>
                        <div className="mx-auto md:ml-20 bg-white/65 backdrop-blur-sm p-6 md:p-10 rounded-lg shadow-lg max-w-lg">
                            <div className="mb-8">
                                <h2 className="text-2xl md:text-3xl text-cyan-800 mb-1 font-medium font-playfair">Clínica</h2>
                                <h1 className="text-4xl md:text-6xl text-cyan-900 font-medium font-poppins">Vital</h1>
                            </div>
                            <p className="text-cyan-700 text-lg md:text-xl mb-8 border-l-4 border-cyan-600 pl-4">
                                Central telefónica: <br/>
                                <span className="font-semibold">(01) 377-8800</span>
                            </p>
                            <div>
                                <button 
                                    type="button"
                                    onClick={handleLogin}
                                    className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 md:px-12 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                                >
                                    Agenda tu cita
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col items-center mt-36 md:mt-24 p-4'>
                        <Nosotros/>
                    </div>
                    <div className='flex justify-center items-center p-4'>
                        <Servicios/>
                    </div>
                    <div >
                     <Footer />
                    </div>
                </div>
            </div>
       </div>
    );
};

export default Home;

