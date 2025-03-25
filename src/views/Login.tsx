import logo from '../assets/logo.png';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { useState, useEffect } from 'react';
import { loginUser } from '../redux/actions/user/loginUser';
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Logo en la esquina superior izquierda */}
      <div className="absolute top-4 left-4 w-full border-b border-gray-200">
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="logo" className="h-14 md:h-16 w-auto mb-2" />
        </Link>
      </div>
      
      {/* Contenedor principal centrado */}
      <div className="flex-grow flex items-center justify-center pt-20">
        <div className="w-full max-w-md mx-auto my-8 px-4">
          <div className="bg-white rounded-lg shadow-lg p-6 overflow-hidden">
            <h2 className="text-2xl font-bold text-center mb-6 font-poppins text-cyan-700">
              Iniciar sesión
            </h2>
            
            {authError && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-700 text-center text-sm">{authError}</p>
              </div>
            )}
            
            <Formik
              initialValues={initialValues}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, touched, errors }) => (
                <Form className="space-y-5">
                  <div className="w-full">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
                      Correo electrónico
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className={`w-full px-4 py-2.5 rounded-md border transition duration-200 focus:ring-2 focus:outline-none ${
                        touched.email && errors.email
                          ? "border-red-300 focus:ring-red-200"
                          : "border-gray-300 focus:ring-cyan-200 focus:border-cyan-500"
                      }`}
                      placeholder="ejemplo@correo.com"
                    />
                    <ErrorMessage name="email" component="p" className="mt-1 text-red-600 text-xs font-medium" />
                  </div>

                  <div className="w-full">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 font-montserrat">
                      Contraseña
                    </label>
                    <div className="relative">
                      <Field
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        className={`w-full px-4 py-2.5 rounded-md border transition duration-200 focus:ring-2 focus:outline-none ${
                          touched.password && errors.password
                            ? "border-red-300 focus:ring-red-200"
                            : "border-gray-300 focus:ring-cyan-200 focus:border-cyan-500"
                        }`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        {showPassword ? 
                          <FaEye className="text-xl" /> : 
                          <FaEyeSlash className="text-xl" />
                        }
                      </button>
                    </div>
                    <ErrorMessage name="password" component="p" className="mt-1 text-red-600 text-xs font-medium" />
                  </div>

                  <div className="pt-2 space-y-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-cyan-600 text-white py-2.5 rounded-md hover:bg-cyan-700 transition duration-200 font-medium shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Iniciando sesión...
                        </span>
                      ) : 'Ingresar'}
                    </button>
                    
                    <div className="text-center pt-2">
                      <p className="text-sm text-gray-600 font-montserrat">
                        ¿No tienes una cuenta?{' '}
                        <Link to="/register" className="font-medium text-cyan-600 hover:text-cyan-800 transition duration-200">
                          Regístrate aquí
                        </Link>
                      </p>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
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