import React from 'react';

interface Doctor {
  id: string;
  name: string;
  lastname: string;
  specialty: {
    id: string;
    name: string;
  };
}

interface Specialty {
  id: string;
  name: string;
}

interface User {
  id: string;
  name: string;
  lastname: string;
}

interface AppointmentFiltersProps {
  doctors: Doctor[];
  specialties: Specialty[];
  users: User[];
  setDoctorFilter: (value: string) => void;
  setDateFilter: (value: string) => void;
  setWeekFilter: (value: string) => void;
  setSpecialtyFilter: (value: string) => void;
  setUserFilter: (value: string) => void;
}

const AppointmentFilters: React.FC<AppointmentFiltersProps> = ({
  doctors,
  specialties,
  users,
  setDoctorFilter,
  setDateFilter,
  setWeekFilter,
  setSpecialtyFilter,
  setUserFilter
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Filtro por doctor */}
        <div>
          <label className="block text-sm font-medium text-cyan-900 mb-1">Doctor</label>
          <select 
            className="w-full p-2 border border-blue-300 rounded-md focus:ring-blue-300 focus:border-blue-900"
            onChange={(e) => setDoctorFilter(e.target.value)}
            defaultValue=""
          >
            <option value="">Todos los doctores</option>
            {doctors.map(doctor => (
              <option key={doctor.id} value={`${doctor.name} ${doctor.lastname}`}>
                {doctor.name} {doctor.lastname}
              </option>
            ))}
          </select>
        </div>
        
        {/* Filtro por fecha */}
        <div>
          <label className="block text-sm font-medium text-cyan-900 mb-1">Fecha específica</label>
          <input 
            type="date" 
            className="w-full p-2 border border-blue-300 rounded-md focus:ring-blue-300 focus:border-blue-900"
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
        
        {/* Filtro por semana */}
        <div>
          <label className="block text-sm font-medium text-cyan-900 mb-1">Semana (inicio)</label>
          <input 
            type="date" 
            className="w-full p-2 border border-blue-300 rounded-md focus:ring-blue-300 focus:border-blue-900"
            onChange={(e) => setWeekFilter(e.target.value)}
          />
        </div>
        
        {/* Filtro por especialidad */}
        <div>
          <label className="block text-sm font-medium text-cyan-900 mb-1">Especialidad</label>
          <select 
            className="w-full p-2 border border-blue-300 rounded-md focus:ring-blue-300 focus:border-blue-900"
            onChange={(e) => setSpecialtyFilter(e.target.value)}
            defaultValue=""
          >
            <option value="">Todas las especialidades</option>
            {specialties.map(specialty => (
              <option key={specialty.id} value={specialty.name}>
                {specialty.name}
              </option>
            ))}
          </select>
        </div>
        
        {/* Filtro por usuario */}
        <div>
          <label className="block text-sm font-medium text-cyan-900 mb-1">Paciente</label>
          <select 
            className="w-full p-2 border border-blue-300 rounded-md focus:ring-blue-300 focus:border-blue-900"
            onChange={(e) => setUserFilter(e.target.value)}
            defaultValue=""
          >
            <option value="">Todos los pacientes</option>
            {users.map(user => (
              <option key={user.id} value={`${user.name} ${user.lastname}`}>
                {user.name} {user.lastname}
              </option>
            ))}
          </select>
        </div>
        
        {/* Botón de limpiar filtros */}
        <div className="flex items-end">
          <button 
            className="bg-blue-200 hover:bg-blue-300 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-300"
            onClick={() => {
              setDoctorFilter('');
              setDateFilter('');
              setWeekFilter('');
              setSpecialtyFilter('');
              setUserFilter('');
              
              // Limpiar los campos de selección
              const selects = document.querySelectorAll('select');
              selects.forEach(select => select.value = '');
              
              const inputs = document.querySelectorAll('input[type="date"]');
              inputs.forEach(input => (input as HTMLInputElement).value = '');
            }}
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentFilters;
