import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import { deleteDoctor } from "../../redux/actions/dashboard/dashboardDoctor/deleteDoctor";
import { updateDoctor } from "../../redux/actions/dashboard/dashboardDoctor/updateDoctor";
import { fetchDoctors } from "../../redux/actions/dashboard/dashboardDoctor/fetchDoctors";
import { DoctorDashboard } from "../../interfaces/AuthContextProps";
import { useEffect, useState } from "react";
import DoctorModal from "./dashboardDoctors/DoctorModal";
import DoctorFormModal from "./dashboardDoctors/DoctorFormModal";

const DoctorManagement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const doctors = useSelector((state: RootState) => state.dashboard.doctors);
 
  const initialFilters = {
    fullName: '',
    specialty: '',
    active: '',
    days: ''
  };

  const [filters, setFilters] = useState(initialFilters);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorDashboard | null>(null);
  const [isModalOpenRegist, setIsModalOpenRegist] = useState(false);

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const filteredDoctors = doctors
    .filter(doctor => {
      const fullName = `${doctor.name} ${doctor.lastname}`.toLowerCase();
      const matchName = fullName.includes(filters.fullName.toLowerCase());
      const matchSpecialty = doctor.specialty.name.toLowerCase().includes(filters.specialty.toLowerCase());
      const matchActive = filters.active === '' ? true : doctor.active?.toString() === filters.active;
      const matchDays = doctor.days_atention.toLowerCase().includes(filters.days.toLowerCase());
      
      return matchName && matchSpecialty && matchActive && matchDays;
    })
    .sort((a, b) => {
      const nameA = `${a.name} ${a.lastname}`.toLowerCase();
      const nameB = `${b.name} ${b.lastname}`.toLowerCase();
      return nameA.localeCompare(nameB);
    });
  
    useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
    });
      if (result.isConfirmed) {
        await dispatch(deleteDoctor(id));
        await dispatch(fetchDoctors());
        Swal.fire("Eliminado", "El doctor ha sido eliminado.", "success");
      }
   };
  
  const handleUpdateClick = (doctor: DoctorDashboard) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };
  
  const handleUpdate = async (id: string, doctorData: Partial<DoctorDashboard>) => {
    await dispatch(updateDoctor(id, doctorData));
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">Panel de Control de Doctores</h2>
        <div className="flex space-x-4">
          <button
        onClick={() => setIsModalOpenRegist(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
        >
        <FaPlus className="mr-2" /> Agregar Doctor
        </button>

      <DoctorFormModal 
        isOpen={isModalOpenRegist}
        onClose={() => {
          setIsModalOpenRegist(false);
          dispatch(fetchDoctors());
        }}
      />
      <button 
          onClick={resetFilters}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
          Resetear Filtros
        </button>
      </div>
        
      </div>
      

      {filteredDoctors.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          No se encontraron doctores con los filtros seleccionados
        </div>
      ) : (
      <div className="overflow-x-auto rounded-md">
       <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-cyan-100">
            <tr>
              <th className="px-6 py-3">
                <input
                  type="text"
                  placeholder="Filtrar por nombre"
                  className="w-full px-2 py-1 text-sm border rounded border-blue-300 focus:outline-none font-normal text-gray-700"
                  value={filters.fullName}
                  onChange={(e) => setFilters({...filters, fullName: e.target.value})}
                />
              </th>
              <th className="px-6 py-3">
                <input
                  type="text"
                  placeholder="Filtrar por especialidad"
                  className="w-full px-2 py-1 text-sm border rounded border-blue-300 focus:outline-none font-normal text-gray-700"
                  value={filters.specialty}
                  onChange={(e) => setFilters({...filters, specialty: e.target.value})}
                />
              </th>
              <th className="px-6 py-3">
                <input
                  type="text"
                  placeholder="Filtrar por días"
                  className="w-full px-2 py-1 text-sm border rounded border-blue-300 focus:outline-none font-normal text-gray-700"
                  value={filters.days}
                  onChange={(e) => setFilters({...filters, days: e.target.value})}
                />
              </th>
              <th className="px-6 py-3">
                <div className="text-xs font-medium text-gray-700 uppercase tracking-wider">Horario</div>
              </th>
              <th className="px-6 py-3">
                <div className="text-xs font-medium text-gray-700 uppercase tracking-wider">Contacto</div>
              </th>
              <th className="px-6 py-3">
                <select
                  className="w-full px-1 py-1 text-sm border rounded border-blue-300 focus:outline-none"
                  value={filters.active}
                  onChange={(e) => setFilters({...filters, active: e.target.value})}
                >
                  <option value="">Todos</option>
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </select>
              </th>
              <th className="px-6 py-3">
                <div className="text-xs font-medium text-gray-700 uppercase tracking-wider">Citas</div>
              </th>
              <th className="px-6 py-3">
                <div className="text-xs font-medium text-gray-700 uppercase tracking-wider">Acciones</div>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDoctors.map((doctor) => (
              <tr key={doctor.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                     <div className="text-sm font-medium text-gray-900">
                        {doctor.name} {doctor.lastname}
                      </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {doctor.specialty.name}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {doctor.days_atention}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {doctor.hours_attention}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{doctor.email}</div>
                  <div className="text-sm text-gray-500">{doctor.telephone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${doctor.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {doctor.active ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {doctor.appointments.length}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <button
                    onClick={() => handleUpdateClick(doctor)}
                    className="text-blue-700 hover:text-blue-900 mx-2"
                    title="Editar Doctor"
                  >
                    <FaEdit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(doctor.id)}
                    className="text-red-700 hover:text-red-900 mx-2"
                    title="Eliminar Doctor"
                  >
                    <FaTrash className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
         </table>
       </div>
      )} 
      {selectedDoctor && (
        <DoctorModal
          doctor={selectedDoctor}
          isOpen={isModalOpen}
          onUpdate={handleUpdate}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedDoctor(null);
          }}
        />
      )}
   </div>
  );
};

export default DoctorManagement;

 