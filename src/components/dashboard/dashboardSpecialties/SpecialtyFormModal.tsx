import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector  } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { createSpecialty } from '../../../redux/actions/specialties/createSpecialty';
import { updateSpeciality } from '../../../redux/actions/specialties/updateSpecialty';
import Swal from 'sweetalert2';
import { Specialty } from '../../../interfaces/AuthContextProps';

interface SpecialtyFormModalProps {
  specialty: Specialty | null;
  onClose: () => void;
  onSuccess: () => void;
}

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
    .max(500, 'La descripción no puede exceder los 500 caracteres') 
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
        await dispatch(updateSpeciality(specialty.id, values));
      } else {
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
      <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-6 text-center ">
          {isEditing ? 'Editar Especialidad Médica' : 'Agregar Nueva Especialidad Médica'}
        </h3>
       
        <Formik
          initialValues={initialValues}
          validationSchema={SpecialtySchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de la Especialidad *
                </label>
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Ej: Cardiología, Pediatría, etc."
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-100"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-700 text-sm mt-2"
                />
              </div>
             
              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Descripción
                </label>
                <Field
                  as="textarea"
                  id="description"
                  name="description"
                  rows={6} 
                  placeholder="Describa los detalles de esta especialidad médica..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-100 resize-y min-h-[120px]"
                />
                <div className="flex justify-between mt-1">
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-700 text-sm"
                  />
                  <span className="text-xs text-gray-500">
                    Máximo 500 caracteres
                  </span>
                </div>
              </div>
             
              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-5 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Procesando...
                    </span>
                    ) : isEditing ? 'Actualizar' : 'Guardar Especialidad'
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