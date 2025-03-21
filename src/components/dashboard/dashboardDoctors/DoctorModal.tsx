import { useEffect, useState } from 'react';
import { DoctorDashboard } from '../../../interfaces/AuthContextProps';
import { fetchSpecialties } from '../../../redux/actions/specialties/fetchSpecialties';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';

type ValidTime = '09:00-18:00' | '09:00-15:00' | '14:00-18:00';
type ValidDays = 'LUNES' | 'MARTES' | 'MIERCOLES' | 'JUEVES' | 'VIERNES';

interface Specialty {
  id: string;
  name: string;
};

interface UpdateDoctorModalProps {
  doctor: DoctorDashboard;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: string, doctorData: Partial<DoctorDashboard>) => void;
};

interface FormData {
  name: string;
  lastname: string;
  email: string;
  telephone: string;
  days_atention: ValidDays;
  hours_attention: ValidTime;
  active: boolean;
  specialty: string;
};

const DoctorModal = ({ doctor, isOpen, onClose, onUpdate }: UpdateDoctorModalProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: doctor.name,
    lastname: doctor.lastname,
    email: doctor.email,
    telephone: doctor.telephone,
    days_atention: doctor.days_atention as ValidDays,
    hours_attention: doctor.hours_attention as ValidTime,
    active: doctor.active ?? true,
    specialty: doctor.specialty.id
  });
  const specialtiesRedux = useSelector((state: RootState) => state.auth.specialties as Specialty[]);
  const dispatch = useDispatch<AppDispatch>();
 
  const diasAtencion: ValidDays[] = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];
  const horariosAtencion: ValidTime[] = ['09:00-18:00', '09:00-15:00', '14:00-18:00'];

  const handleDaysChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({...formData, days_atention: e.target.value as ValidDays});
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({...formData, hours_attention: e.target.value as ValidTime});
  };

  const handleSpecialtyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      specialty: e.target.value,
    });
  };

  useEffect(() => {
   dispatch(fetchSpecialties());
  }, [dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.specialty) {
      alert('Por favor complete todos los campos requeridos');
      return;
    }
    // Crear el objeto con la estructura correcta para el backend
    const doctorDataToUpdate = {
      name: formData.name,
      lastname: formData.lastname,
      days_atention: formData.days_atention,
      hours_attention: formData.hours_attention,
      telephone: formData.telephone,
      email: formData.email,
      active: formData.active,
      id_specialty: formData.specialty// Aquí enviamos solo el ID de la especialidad
    };

    try {
      await onUpdate(doctor.id, doctorDataToUpdate);
      onClose();
    } catch (error) {
      console.error('Error al actualizar el doctor:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center overflow-y-auto p-4 ">
      <div className="bg-white p-8 rounded-lg w-[500px] mt-40 ">
        <h2 className="text-2xl font-bold mb-4">Actualizar Doctor</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">Nombre</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full border rounded px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Apellido</label>
              <input
                type="text"
                value={formData.lastname}
                onChange={(e) => setFormData({...formData, lastname: e.target.value})}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Teléfono</label>
            <input
              type="text"
              value={formData.telephone}
              onChange={(e) => setFormData({...formData, telephone: e.target.value})}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Días de Atención</label>
            <select
              value={formData.days_atention}
              onChange={handleDaysChange}
              className="w-full border rounded px-3 py-2"
            >
              {diasAtencion.map((dia) => (
                <option key={dia} value={dia}>{dia}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Horario de Atención</label>
            <select
              value={formData.hours_attention}
              onChange={handleHoursChange}
              className="w-full border rounded px-3 py-2"
            >
              {horariosAtencion.map((horario) => (
                <option key={horario} value={horario}>{horario}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Especialidad</label>
            <select
              value={formData.specialty}
              onChange={handleSpecialtyChange}
              className="w-full border rounded px-3 py-2"
             >
              {specialtiesRedux.map((specialty) => (
                <option key={specialty.id} value={specialty.id}>
                  {specialty.name}
                </option>
              ))}
             </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">Estado</label>
            <select
              value={formData.active.toString()}
              onChange={(e) => setFormData({...formData, active: e.target.value === 'true'})}
              className="w-full border rounded px-3 py-2"
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorModal;
