import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AppDispatch, RootState } from "../../../redux/store";
import { createDoctors } from "../../../redux/actions/dashboard/dashboardDoctor/createDoctor";
import { fetchSpecialties } from "../../../redux/actions/specialties/fetchSpecialties";
import { Doctor, Specialty } from "../../../interfaces/AuthContextProps";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DoctorFormModal = ({ isOpen, onClose }: ModalProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.auth.error);
  const specialtiesRedux: Specialty[] = useSelector((state: RootState) => state.auth.specialties);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(()=> {
    dispatch(fetchSpecialties())
  }, [dispatch]);

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };
  
  const formik = useFormik<Doctor>({
    initialValues: {
      name: "",
      lastname: "",
      days_atention: "LUNES",
      hours_attention: "09:00-18:00",
      telephone: "",
      email: "",
      active: true,
      specialty: {
        id: "",
        name: "",
        description: ""
      },
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
      specialty: Yup.object().shape({
        id: Yup.string()
        .required("La especialidad es obligatoria")
      })
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      const doctorSend = {
        ...values,
        id_specialty: values.specialty.id
      }
      try {
        await dispatch(createDoctors(doctorSend));
        handleClose();
      } catch (error) {
        console.error('Error al crear doctor:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

   // Manejador para la selección de especialidad
   const handleSpecialtyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const specialtyId = e.target.value;
    const selectedSpecialty = specialtiesRedux.find(spec => spec.id === specialtyId)
    formik.setFieldValue('specialty', selectedSpecialty);
  };
  if (!isOpen) return null;

 return (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Registro de Doctor</h2>
      {error && <p className="text-red-700 text-center mb-4">{error}</p>}
      
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-700 text-sm">{formik.errors.name}</p>
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
            className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300"
          />
          {formik.touched.lastname && formik.errors.lastname && (
            <p className="text-red-700 text-sm">{formik.errors.lastname}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Días de Atención</label>
          <select
            name="days_atention"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.days_atention}
            className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300"
          >
            <option value="LUNES">Lunes</option>
            <option value="MARTES">Martes</option>
            <option value="MIERCOLES">Miércoles</option>
            <option value="JUEVES">Jueves</option>
            <option value="VIERNES">Viernes</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Horario de Atención</label>
          <select
            name="hours_attention"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.hours_attention}
            className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300"
          >
            <option value="09:00-18:00">09:00-18:00</option>
            <option value="09:00-15:00">09:00-15:00</option>
            <option value="14:00-18:00">14:00-18:00</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Teléfono</label>
          <input
            type="text"
            name="telephone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.telephone}
            className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300"
          />
          {formik.touched.telephone && formik.errors.telephone && (
            <p className="text-red-700 text-sm">{formik.errors.telephone}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-700 text-sm">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Especialidad</label>
          <select
            name="specialty.id"
            onChange={handleSpecialtyChange}
            onBlur={formik.handleBlur}
            value={formik.values.specialty.id}
            className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300"
          >
            <option value="">Seleccione una especialidad</option>
            {specialtiesRedux && specialtiesRedux.length > 0 ? (
              specialtiesRedux.map((specialty) => (
                <option key={specialty.id} value={specialty.id}>
                  {specialty.name}
                </option>
              ))
            ) : (
              <option value="">No hay especialidades disponibles</option>
            )}
          </select>
          {formik.touched.specialty?.id && formik.errors.specialty?.id && (
            <p className="text-red-700 text-sm">{formik.errors.specialty.id}</p>
          )}
        </div>

        <div className="flex space-x-4 pt-2">
          <button
            type="submit"
            disabled={isSubmitting || !formik.isValid}
            className={`w-full ${
              isSubmitting || !formik.isValid 
                ? 'bg-gray-400' 
                : 'bg-cyan-600 hover:bg-cyan-700'
            } text-white py-2 rounded-md transition-colors`}
          >
            {isSubmitting ? 'Registrando...' : 'Registrar Doctor'}
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
);

};

export default DoctorFormModal;
