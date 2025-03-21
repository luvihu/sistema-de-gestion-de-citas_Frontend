import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { fetchSpecialties } from '../../redux/actions/specialties/fetchSpecialties';
import { deleteSpecialty } from '../../redux/actions/specialties/deleteSpecialty';
import SpecialtyFormModal from './dashboardSpecialties/SpecialtyFormModal';
import { AppDispatch, RootState } from '../../redux/store';
import { Specialty } from '../../interfaces/AuthContextProps';

const SpecialtiesManagement = () => {

  const dispatch = useDispatch<AppDispatch>();
  const specialties = useSelector((state: RootState) => state.auth.specialties);
  const error = useSelector((state: RootState) => state.auth.error);
  // Estado local para controlar la carga inicial
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [currentSpecialty, setCurrentSpecialty] = useState<Specialty | null>(null);

  useEffect(() => {
    const loadSpecialties = async () => {
      setIsLoading(true);
      await dispatch(fetchSpecialties());
      setIsLoading(false);
    };
    
    loadSpecialties();
  }, [dispatch]);

  const handleOpenModal = (specialty?: Specialty) => {
    setCurrentSpecialty(specialty || null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentSpecialty(null);
  };

  const handleDelete = async (id: string) => {
    Swal.fire({
          title: "¿Estás seguro?",
          text: "No podrás revertir esto.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Sí, eliminar",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(deleteSpecialty(id));
            Swal.fire("Eliminado", "La especialidad ha sido eliminada.", "success");
          }
        });
  };

  return (
    <div className="container mx-auto px-4 py-6">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800">Gestión de Especialidades</h2>
      <button
        onClick={() => handleOpenModal()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center"
      >
        <FaPlus className="mr-2" /> Agregar Especialidad
      </button>
    </div>

    {error && (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <p>{error}</p>
      </div>
    )}

    {isLoading ? (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    ) : (
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nombre
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Descripción
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Doctores
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {specialties && specialties.length > 0 ? (
              specialties.map((specialty) => (
                <tr key={specialty.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{specialty.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-500">{specialty.description || 'Sin descripción'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{specialty.doctors?.length || 0} doctores</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleOpenModal(specialty)}
                        className="text-blue-800 hover:text-blue-900 mx-2"
                        title="Editar especialidad"
                      >
                        <FaEdit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(specialty.id)}
                        className="text-red-700 hover:text-red-900 mx-2"
                        title="Eliminar especialidad"
                      >
                        <FaTrash className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                  No hay especialidades disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    )}

    {/* Modal para agregar/editar especialidad */}
    {showModal && (
      <SpecialtyFormModal
        specialty={currentSpecialty}
        onClose={handleCloseModal}
        onSuccess={() => {
          handleCloseModal();
          dispatch(fetchSpecialties());
        }}
      />
    )}
  </div>
  );
};

export default SpecialtiesManagement;
