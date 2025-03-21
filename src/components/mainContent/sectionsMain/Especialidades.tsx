import { FaPersonCane, FaLungs, FaEye, FaPersonDress, FaBrain, FaHeartPulse,FaStethoscope } from "react-icons/fa6";
import { FaBone, FaSyringe } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpecialties } from "../../../redux/actions/specialties/fetchSpecialties";
import { RootState, AppDispatch } from "../../../redux/store";
import SpecialtyCard from "./specialties/SpecialtyCard";

interface Doctor {
  id: string;
  name: string;
  lastname:string;
}

interface Specialty {
  id: string;
  name: string;
  description: string;
  doctors: Doctor[];
}
// Mapa de íconos por especialidad
const specialtyIcons: { [key: string]: JSX.Element } = {
  'Geriatria': <FaPersonCane className="w-10 h-10 text-cyan-500" />,
  'Traumatologia y ortopedia': <FaBone className="w-10 h-10 text-cyan-500" />,
  'Neumologia': <FaLungs className="w-10 h-10 text-cyan-500" />,
  'Oftalmologia': <FaEye className="w-10 h-10 text-cyan-500" />,
  'Anestesiologia': <FaSyringe className="w-10 h-10 text-cyan-500" />,
  'Ginecologia': <FaPersonDress className="w-10 h-10 text-cyan-500" />,
  'Neurologia': <FaBrain className="w-10 h-10 text-cyan-500" />,
  'Cardiologia': <FaHeartPulse className="w-10 h-10 text-cyan-500" />
};
const Especialidades = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { specialties } = useSelector((state: RootState) => state.auth);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchSpecialties());
  }, [dispatch]);

  const selectedSpecialtyData = selectedSpecialty 
    ? (specialties as Specialty[]).find((s) => s.id === selectedSpecialty)
    : null;

    return (
      <div className="container mx-auto px-4 py-4 max-w-7xl" id="especialidades">
        <h2 className="text-2xl md:text-3xl font-bold font-playfair text-cyan-950 mb-10 text-center">
          Especialidades Médicas
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {(specialties as Specialty[]).map((specialty) => (
            <SpecialtyCard
              key={specialty.id}
              specialty={{
                ...specialty,
                icon: specialtyIcons[specialty.name] || <FaStethoscope className="w-12 h-12 md:w-14 md:h-14 text-cyan-500" />
              }}
              onClick={() => setSelectedSpecialty(specialty.id)}
            />
          ))}
        </div>
    
        {selectedSpecialtyData && (
          <div className="mt-8 p-6 bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl">
            <h3 className="text-xl font-semibold text-blue-950 mb-4">{selectedSpecialtyData.name}</h3>
            <p className="text-gray-700 text-lg mb-6">{selectedSpecialtyData.description}</p>
            
            <h3 className="font-semibold text-xl text-blue-950 mb-4">Doctores:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedSpecialtyData.doctors.map((doctor) => (
                <div key={doctor.id} className="p-4 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                  <span className="text-gray-800 font-medium whitespace-nowrap text-ellipsis block">
                    Dr(a): {doctor.name} {doctor.lastname}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
    
};

export default Especialidades;


