import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { updateUser } from '../../redux/actions/user/userUpdate';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: {
    id?: string;
    name?: string;
    lastname?: string;
    telephone?: string;
    dni?: string;
    email?: string;
  } | null;
}
// Esquema de validación con Yup
const ProfileValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede tener más de 50 caracteres')
    .required('El nombre es obligatorio'),
  lastname: Yup.string()
    .min(2, 'El apellido debe tener al menos 2 caracteres')
    .max(50, 'El apellido no puede tener más de 50 caracteres')
    .required('El apellido es obligatorio'),
  telephone: Yup.string()
    .matches(/^9\d{8}$/, "El teléfono debe comenzar con 9 y contener solo números")
    .length(9, "El teléfono debe tener 9 caracteres")
    .required("El teléfono es obligatorio"),
  dni: Yup.string()
    .matches(/^\d+$/, "El DNI debe contener solo números")
    .length(8, 'El DNI debe tener 8 dígitos')
    .required('El DNI es obligatorio'),
  email: Yup.string()
    .email('Correo electrónico inválido')
    .required('El correo electrónico es obligatorio')
});

const ProfileUpdate: React.FC<EditProfileModalProps> = ({ isOpen, onClose, userData }) => {
  const dispatch = useDispatch<AppDispatch>();

  if (!isOpen) return null;

  const initialValues = {
    name: userData?.name || '',
    lastname: userData?.lastname || '',
    telephone: userData?.telephone || '',
    dni: userData?.dni || '',
    email: userData?.email || ''
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4 mt-16">
      <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-cyan-900">Editar Perfil</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <Formik
          initialValues={initialValues}
          validationSchema={ProfileValidationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            if (userData?.id) {
              try {
                await dispatch(updateUser(userData.id, values));
                     
                onClose();
                setSubmitting(false);
              } catch (error) {
                console.error("Error al actualizar el perfil:", error);
                setSubmitting(false);
              }
            }
          }}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form className="space-y-4">
              {[
                { label: 'Nombre', name: 'name' },
                { label: 'Apellido', name: 'lastname' },
                { label: 'Teléfono', name: 'telephone' },
                { label: 'Dni', name: 'dni' },
                { label: 'Email', name: 'email', type: 'email' }
              ].map((field, index) => (
                <div key={index} className="flex flex-col">
                  <label htmlFor={field.name} className="text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <Field
                    type={field.type || 'text'}
                    name={field.name}
                    id={field.name}
                    className={`border ${
                      touched[field.name as keyof typeof touched] && 
                      errors[field.name as keyof typeof errors] 
                        ? 'border-red-700' 
                        : 'border-gray-300'
                    } rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  <ErrorMessage 
                    name={field.name} 
                    component="div" 
                    className="text-red-700 text-xs mt-1" 
                  />
                </div>
              ))}
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ProfileUpdate;
