import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

enum StatusApp {
  PENDIENTE = "PENDIENTE",
  CONFIRMADO = "CONFIRMADO",
  CANCELADO = "CANCELADO"
}
type ValidTime = '09:00-18:00' | '09:00-15:00' | '14:00-18:00';
type ValidDays = 'LUNES' | 'MARTES' | 'MIERCOLES' | 'JUEVES' | 'VIERNES';

interface AppointmentsData {
  id: string;
  status?: StatusApp;
  date: string;
  hour: string; 
  date_creation?: string;
  user: {
    id: string;
    name: string;
    lastname: string;
    telephone: string;
    email: string;
  };
  doctor: {
    id: string;
    name: string;
    lastname: string;
    active?: boolean;
    days_atention: ValidDays;
    hours_attention: ValidTime;
    specialty: {
      id: string;
      name: string;
    };
  };
}

interface AppointmentTableProps {
  appointments: AppointmentsData[];
  onEdit: (appointment: AppointmentsData) => void;
  onDelete: (id: string) => void;
}

const AppointmentTable: React.FC<AppointmentTableProps> = ({ appointments, onEdit, onDelete }) => {
  // Función para formatear la fecha
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  // Colores para los diferentes estados
  const statusColors = {
    'PENDIENTE': 'bg-yellow-100 text-yellow-800',
    'CONFIRMADO': 'bg-green-100 text-green-800',
    'CANCELADO': 'bg-red-100 text-red-800',
     };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-cyan-100">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Paciente
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Doctor
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Especialidad
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Fecha
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Hora
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Estado
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointments?.length > 0 ? (
              appointments?.map((appointment) => (
                <tr key={appointment?.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="text-sm font-medium text-gray-900">
                        {appointment?.user?.name} {appointment?.user?.lastname}
                      </div>
                      <div className="text-sm text-gray-500">
                        {appointment?.user?.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        Tel: {appointment?.user?.telephone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                     {appointment.doctor && appointment.doctor.name
                       ? `Dr. ${appointment.doctor.name} ${appointment.doctor.lastname}`
                       : 'Sin doctor'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {(appointment.doctor && appointment.doctor.specialty && appointment.doctor.specialty.name)
                        ? appointment.doctor.specialty.name
                        : 'Sin especialidad'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatDate(appointment?.date)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {appointment?.hour}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[appointment.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}`}>
                      {appointment?.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onEdit(appointment)}
                        className="text-blue-700 hover:text-blue-900 transition duration-150"
                        title="Editar cita"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => onDelete(appointment.id)}
                        className="text-red-700 hover:text-red-900 transition duration-150"
                        title="Eliminar cita"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                  No se encontraron citas con los filtros aplicados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentTable;
