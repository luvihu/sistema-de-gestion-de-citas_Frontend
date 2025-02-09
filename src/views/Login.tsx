import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { loginUser } from '../redux/actions/user/loginUser';

interface LoginValues {
  email: string;
  password: string;
 
 };
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email inválido')
    .required('El email es requerido'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es requerida'),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const initialValues: LoginValues = {
    email: '',
    password: '',
    
  };
  const handleSubmit = async (values: LoginValues) => {
   await dispatch(loginUser(values.email, values.password));
    navigate('/profile');
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700 mb-2">
            Iniciar sesión
          </h1>
        </div>
        
        <Formik
          initialValues={initialValues}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 transition duration-200"
                    placeholder="ejemplo@correo.com"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-700 text-sm mt-1" />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                    Contraseña
                  </label>
                  <Field
                    type="password"
                    name="password"
                    className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 transition duration-200"
                    placeholder="••••••••"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-700 text-sm mt-1" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 rounded-lg text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200 font-semibold"
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Iniciando sesión...
                  </span>
                ) : 'Ingresar'}
              </button>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  ¿No tienes una cuenta?{' '}
                  <Link to="/register" className="font-medium text-cyan-600 hover:text-cyan-800 transition duration-200">
                    Regístrate aquí
                  </Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
};
export default Login;

// "email": "carlos@gmail.com",
    // "password":"carlos126",
    // ADMIN

  // "email": "guidos@gmail.com",
  //   "password":"guido102",
  //   "role": "USER"                                    