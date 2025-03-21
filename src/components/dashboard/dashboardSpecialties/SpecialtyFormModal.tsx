import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector  } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { createSpecialty } from '../../../redux/actions/specialties/createSpecialty';
import { updateSpeciality } from '../../../redux/actions/specialties/updateSpecialty';
import Swal from 'sweetalert2';
import { Specialty } from '../../../interfaces/AuthContextProps';

// Interfaz para las props del componente
interface SpecialtyFormModalProps {
  specialty: Specialty | null;
  onClose: () => void;
  onSuccess: () => void;
}

// Interfaz para los valores del formulario
interface FormValues {
  name: string;
  description: string;
}

const SpecialtySchema = Yup.object().shape({
  name: Yup.string()
    .required('El nombre es obligatorio')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre no puede exceder los 50 caracteres'),
  description: Yup.string()
    .max(250, 'La descripción no puede exceder los 250 caracteres')
});

const SpecialtyFormModal: React.FC<SpecialtyFormModalProps> = ({ specialty, onClose, onSuccess }) => {
  const dispatch = useDispatch<AppDispatch>();
  const error = useSelector((state: RootState) => state.auth.error);
 
  const isEditing = !!specialty;
 
  // Valores iniciales seguros incluso cuando specialty es null
  const initialValues: FormValues = {
    name: specialty?.name || '',
    description: specialty?.description || '',
  };

  const handleSubmit = async (
    values: FormValues, 
    { setSubmitting, resetForm }: FormikHelpers<FormValues>
  ) => {
    try {
      if (isEditing && specialty) {
        // Actualizar especialidad existente
        await dispatch(updateSpeciality(specialty.id, values));
      } else {
        // Crear nueva especialidad
        await dispatch(createSpecialty(values));
      }
      resetForm();
      onSuccess();
    } catch (err) {
      console.error('Error:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error || (isEditing
          ? 'Error al actualizar la especialidad'
          : 'Error al crear la especialidad')
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">
          {isEditing ? 'Editar Especialidad' : 'Agregar Nueva Especialidad'}
        </h3>
       
        <Formik
          initialValues={initialValues}
          validationSchema={SpecialtySchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-700 text-sm mt-1"
                />
              </div>
             
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-red-700 text-sm mt-1"
                />
              </div>
             
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Procesando...
                    </span>
                    ) : isEditing ? 'Actualizar' : 'Guardar'
                  }
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SpecialtyFormModal;
