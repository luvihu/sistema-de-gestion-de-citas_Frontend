import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
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

const DoctorModal = ({ doctor, isOpen, onClose, onUpdate }: UpdateDoctorModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const specialtiesRedux = useSelector((state: RootState) => state.auth.specialties as Specialty[]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const diasAtencion: ValidDays[] = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];
  const horariosAtencion: ValidTime[] = ['09:00-18:00', '09:00-15:00', '14:00-18:00'];

  const formik = useFormik({
    initialValues: {
      name: doctor.name,
      lastname: doctor.lastname,
      email: doctor.email,
      telephone: doctor.telephone,
      days_atention: doctor.days_atention as ValidDays,
      hours_attention: doctor.hours_attention as ValidTime,
      active: doctor.active ?? true,
      specialty: doctor.specialty.id
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo se permiten letras y espacios")
        .required("El nombre es obligatorio"),
      lastname: Yup.string()
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo se permiten letras y espacios")
        .required("El apellido es obligatorio"),
      days_atention: Yup.string()
        .oneOf(["LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES"])
        .required("El día de atención es obligatorio"),
      hours_attention: Yup.string()
        .oneOf(["09:00-18:00", "09:00-15:00", "14:00-18:00"])
        .required("El horario de atención es obligatorio"),
      telephone: Yup.string()
        .length(9, "El teléfono debe tener 9 caracteres")
        .matches(/^9\d{8}$/, "El teléfono debe comenzar con 9 y contener solo números")
        .required("El teléfono es obligatorio"),
      email: Yup.string()
        .email("Correo inválido")
        .required("El correo es obligatorio"),
      active: Yup.boolean(),
      specialty: Yup.string().required("La especialidad es obligatoria")
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      
      // Crear el objeto con la estructura correcta para el backend
      const doctorDataToUpdate = {
        name: values.name,
        lastname: values.lastname,
        days_atention: values.days_atention,
        hours_attention: values.hours_attention,
        telephone: values.telephone,
        email: values.email,
        active: values.active,
        id_specialty: values.specialty
      };

      try {
        await onUpdate(doctor.id, doctorDataToUpdate);
        onClose();
      } catch (error) {
        console.error('Error al actualizar el doctor:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    enableReinitialize: true // Esto permite que los valores iniciales se actualicen cuando cambia el doctor
  });

  useEffect(() => {
    dispatch(fetchSpecialties());
  }, [dispatch]);

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-800">Actualizar Doctor</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nombre</label>
              <input
                type="text"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-700 text-sm mt-1">{formik.errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Apellido</label>
              <input
                type="text"
                name="lastname"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastname}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              {formik.touched.lastname && formik.errors.lastname && (
                <p className="text-red-700 text-sm mt-1">{formik.errors.lastname}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-700 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Teléfono</label>
            <input
              type="text"
              name="telephone"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.telephone}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            {formik.touched.telephone && formik.errors.telephone && (
              <p className="text-red-700 text-sm mt-1">{formik.errors.telephone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Días de Atención</label>
            <select
              name="days_atention"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.days_atention}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              {diasAtencion.map((dia) => (
                <option key={dia} value={dia}>{dia}</option>
              ))}
            </select>
            {formik.touched.days_atention && formik.errors.days_atention && (
              <p className="text-red-700 text-sm mt-1">{formik.errors.days_atention}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Horario de Atención</label>
            <select
              name="hours_attention"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.hours_attention}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              {horariosAtencion.map((horario) => (
                <option key={horario} value={horario}>{horario}</option>
              ))}
            </select>
            {formik.touched.hours_attention && formik.errors.hours_attention && (
              <p className="text-red-700 text-sm mt-1">{formik.errors.hours_attention}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Especialidad</label>
            <select
              name="specialty"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.specialty}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Seleccione una especialidad</option>
              {specialtiesRedux.map((specialty) => (
                <option key={specialty.id} value={specialty.id}>
                  {specialty.name}
                </option>
              ))}
            </select>
            {formik.touched.specialty && formik.errors.specialty && (
              <p className="text-red-700 text-sm mt-1">{formik.errors.specialty}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Estado</label>
            <select
              name="active"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.active.toString()}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formik.isValid}
              className={`px-4 py-2 rounded-md text-white ${
                isSubmitting || !formik.isValid 
                  ? 'bg-gray-400' 
                  : 'bg-blue-500 hover:bg-blue-600'
              } transition-colors`}
            >
              {isSubmitting ? 'Actualizando...' : 'Actualizar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorModal;