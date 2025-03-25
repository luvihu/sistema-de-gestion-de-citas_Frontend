import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { updateAppointment } from '../../../redux/actions/appointment/updateAppointment';

interface Doctor {
  id: string;
  name: string;
  lastname: string;
  days_atention: ValidDays; 
  hours_attention: ValidTime; 
  specialty: {
    id: string;
    name: string;
  };
}

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

interface EditAppointmentModalProps {
  appointment: AppointmentsData;
  isOpen: boolean;
  onClose: () => void;
  doctors: Doctor[];
}

const EditAppointmentModal: React.FC<EditAppointmentModalProps> = ({
  appointment,
  isOpen,
  onClose,
  doctors
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [availableHours, setAvailableHours] = useState<string[]>([]);

  // Establecer el doctor seleccionado inicialmente
  useEffect(() => {
    if (isOpen) {
      const initialDoctor = doctors.find(doc => doc.id === appointment.doctor.id) || null;
      setSelectedDoctor(initialDoctor);
      
      if (initialDoctor) {
        setAvailableHours(getAvailableHours(initialDoctor.hours_attention));
      }
    }
  }, [isOpen, appointment.doctor.id, doctors]);

  if (!isOpen) return null;

  // Función para obtener las horas disponibles a partir del rango de horas
  const getAvailableHours = (hoursRange: string): string[] => {
    if (!hoursRange) return [];
    
    const [startTime, endTime] = hoursRange.split('-');
    if (!startTime || !endTime) return [];
    
    const start = parseInt(startTime.split(':')[0]);
    const end = parseInt(endTime.split(':')[0]);
    
    const hours: string[] = [];
    for (let i = start; i < end; i++) {
      hours.push(`${i.toString().padStart(2, '0')}:00`);
    }
    
    return hours;
  };

  // Función para formatear los días de atención
  const formatDaysAtention = (daysString: string): string => {
    if (!daysString) return "No disponible";
    
    const daysMap: Record<string, string> = {
      "LUNES": "Lunes",
      "MARTES": "Martes",
      "MIERCOLES": "Miércoles",
      "JUEVES": "Jueves",
      "VIERNES": "Viernes"
    };
    
    const days = daysString.split(',');
    return days.map(day => daysMap[day.trim()] || day.trim()).join(", ");
  };

  const validationSchema = Yup.object({
    date: Yup.date()
      .required('La fecha es obligatoria')
      .min(new Date(), 'La fecha no puede ser anterior a hoy'),
    hour: Yup.string().required('La hora es obligatoria'),
    status: Yup.string().required('El estado es obligatorio'),
    doctorId: Yup.string().required('El doctor es obligatorio')
  });

  const initialValues = {
    date: appointment.date,
    hour: appointment.hour,
    status: appointment.status,
    doctorId: appointment.doctor.id
  };

  const handleSubmit = async (values: {
    date: string;
    hour: string;
    status?: StatusApp;
    doctorId: string;
  }) => {
    try {
      const updatedAppointment = {
        id: appointment.id,
        date: values.date,
        hour: values.hour,
        status: values.status,
        id_doctor: values.doctorId,
        id_user: appointment.user.id
      };
    
      await dispatch(updateAppointment(appointment.id, updatedAppointment));
      onClose();
      navigate(0); // Esto recarga la página actual

      } catch (error) {
      console.error('Error al actualizar la cita:', error);
      } 
  };

  // Función para manejar el cambio de doctor
  const handleDoctorChange = (doctorId: string) => {
    const doctor = doctors.find(doc => doc.id === doctorId) || null;
    setSelectedDoctor(doctor);
    
    if (doctor) {
      setAvailableHours(getAvailableHours(doctor.hours_attention));
    } else {
      setAvailableHours([]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Editar Cita</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor
                </label>
                <Field
                  as="select"
                  id="doctorId"
                  name="doctorId"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setFieldValue("doctorId", e.target.value);
                    handleDoctorChange(e.target.value);
                  }}
                >
                  <option value="">Selecciona un doctor</option>
                  {doctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      Dr. {doctor.name} {doctor.lastname} - {doctor.specialty.name}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="doctorId" component="div" className="text-red-700 text-sm mt-1" />
              </div>

              {/* Información de disponibilidad del doctor */}
              {selectedDoctor && (
                <div className="bg-blue-50 p-3 rounded-md border border-blue-200 mt-2">
                  <h3 className="font-medium text-blue-800 mb-2">Disponibilidad del Dr. {selectedDoctor.name} {selectedDoctor.lastname}</h3>
                  <p className="text-sm text-gray-700">
                    <span className="font-medium">Días de atención:</span> {formatDaysAtention(selectedDoctor.days_atention)}
                  </p>
                  <p className="text-sm text-gray-700 mt-1">
                    <span className="font-medium">Horario de atención:</span> {selectedDoctor.hours_attention}
                  </p>
                </div>
              )}

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha
                </label>
                <Field
                  type="date"
                  id="date"
                  name="date"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage name="date" component="div" className="text-red-700 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="hour" className="block text-sm font-medium text-gray-700 mb-1">
                  Hora
                </label>
                <Field
                  as="select"
                  id="hour"
                  name="hour"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Selecciona una hora</option>
                  {availableHours.map(hour => (
                    <option key={hour} value={hour}>{hour}</option>
                  ))}
                </Field>
                <ErrorMessage name="hour" component="div" className="text-red-700 text-sm mt-1" />
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Estado
                </label>
                <Field
                  as="select"
                  id="status"
                  name="status"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Selecciona un estado</option>
                  <option value="PENDIENTE">PENDIENTE</option>
                  <option value="CONFIRMADO">CONFIRMADO</option>
                  <option value="CANCELADO">CANCELADO</option>
                </Field>
                <ErrorMessage name="status" component="div" className="text-red-700 text-sm mt-1" />
              </div>

              <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                <h3 className="font-medium text-gray-800 mb-2">Información del Paciente</h3>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Nombre:</span> {appointment.user.name} {appointment.user.lastname}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <span className="font-medium">Teléfono:</span> {appointment.user.telephone}
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <span className="font-medium">Email:</span> {appointment.user.email}
                </p>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50"
                >
                  {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditAppointmentModal;








