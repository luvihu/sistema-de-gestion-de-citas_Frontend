import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { useState, useEffect } from 'react';
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
  
 const [showPassword, setShowPassword] = useState(false); 
 const authError = useSelector((state: RootState) => state.auth.error);
const { role } = useSelector((state: RootState) => state.auth);
  console.log("Role en Login:", role);

  const initialValues: LoginValues = {
    email: '',
    password: '',
    
  };
  useEffect(() => {
    if(role === 'ADMIN') {
      navigate("/admin");
    } 
    if(role === 'USER') {
      navigate("/user");
    }
  }, [navigate, role]);
  const handleSubmit = async (values: LoginValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    const emailLowerCase = values.email.toLowerCase();
    console.log("Email en Login:", emailLowerCase);
    await dispatch(loginUser(emailLowerCase, values.password));
    
     setSubmitting(false);
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-2xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-700 mb-2">
            Iniciar sesión
          </h1>
        </div>
        {authError && (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <span className="block sm:inline">{authError}</span>
      </div>
    )}
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
                  <div className="relative">
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 transition duration-200"
                    placeholder="••••••••"
                  />
                  <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                          <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-700 text-sm mt-1" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-3 px-4 rounded-lg text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-cyan-500"
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