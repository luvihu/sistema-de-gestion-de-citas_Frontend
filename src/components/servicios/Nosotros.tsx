import { useState, useEffect } from 'react';

const Nosotros = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      text: "Agenda tus citas médicas online de manera rápida y segura",
      image: "/citamedic.jpg",
    },
    {
      text: "Cuidado médico acorde a tus necesidades.",
      image: "/staffMedical.jpg",
    },
    {
      text: "Encuentra al especialista que necesitas.",
      image: "/especialities.jpg",
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        prevSlide === slides.length - 1 ? 0 : prevSlide + 1
      );
    }, 3000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8" id='nosotros'>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-playfair text-cyan-950 mb-10 text-center">Sobre Nosotros</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 text-justify leading-relaxed max-w-3xl mx-auto">
            En clínica Vital, contamos con una gran infraestructura, equipamiento, tecnología de última generación y con un staff médico de primer nivel que garantiza seguridad, 
            calidad y comodidad a nuestros pacientes durante todo el proceso de atención, comprometidos en brindarte la atención que tú y tu familia merecen.
          </p>
        </div>

        <div className="relative h-64 sm:h-80 md:h-96 lg:h-[32rem] overflow-hidden rounded-xl shadow-xl">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute w-full h-full transition-opacity duration-500 ease-in-out ${
                currentSlide === index ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="object-cover w-full h-full"
              />
              <div className="absolute bottom-0 w-full bg-black bg-opacity-40 text-white px-2 py-4 sm:px-6 sm:py-6 ">
                <p className="text-lg sm:text-xl md:text-2xl font-semibold">{slide.text}</p>
              </div>
            </div>
          ))}

          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                  currentSlide === index ? 'bg-cyan-700' : 'bg-cyan-400'
                }`}
                aria-label={`Ir al slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;
