import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../redux/store';
import { updateAppointment } from '../../../redux/actions/appointment/updateAppointment';

interface Doctor {
  id: string;
  name: string;
  lastname: string;
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

  if (!isOpen) return null;

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

  const handleSubmit = (values: {
    date: string;
    hour: string;
    status?: StatusApp;
    doctorId: string;
  }) => {
    const updatedAppointment = {
      id: appointment.id,
      date: values.date,
      hour: values.hour,
      status: values.status,
      id_doctor: values.doctorId,
      id_user: appointment.user.id
    };
  
    dispatch(updateAppointment(appointment.id, updatedAppointment));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
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
          {({ isSubmitting }) => (
            <Form className="space-y-4">
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
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="12:00">12:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
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

              <div>
                <label htmlFor="doctorId" className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor
                </label>
                <Field
                  as="select"
                  id="doctorId"
                  name="doctorId"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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

              <div className="pt-2">
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Paciente:</span> {appointment.user.name} {appointment.user.lastname}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Contacto:</span> {appointment.user.telephone} | {appointment.user.email}
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
