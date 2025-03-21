
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AppDispatch } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../redux/actions/user/registerUser";
import { RootState } from "../redux/store";
import { useState } from "react";


const RegisterForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const error = useSelector((state: RootState) => state.auth.error);

  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      dni: "",
      telephone: "",
      photo_profile: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo se permiten letras y espacios")
    .required("El nombre es obligatorio"),
    lastname: Yup.string()
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, "Solo se permiten letras y espacios") 
    .required("El apellido es obligatorio"),
      dni: Yup.string()
        .length(8, "El DNI debe tener 8 caracteres")
        .matches(/^\d+$/, "El DNI debe contener solo números")
        .required("El DNI es obligatorio"),
      telephone: Yup.string()
        .length(9, "El teléfono debe tener 9 caracteres")
        .matches(/^\d+$/, "El teléfono debe contener solo números")
        .required("El teléfono es obligatorio"),
      photo_profile: Yup.string().url("Debe ser una URL válida").nullable(),
      email: Yup.string().email("Correo inválido").required("El correo es obligatorio"),
      password: Yup.string()
        .min(6, "La contraseña debe tener al menos 6 caracteres")
        .required("La contraseña es obligatoria"),
    }),
    onSubmit: (values) => {
      dispatch(registerUser(values));
    },
  });

  return (
    <div className="max-w-md mx-auto  mt-8 mb-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Registro de Usuario</h2>
      {error && <p className="text-red-700 text-center mb-4">{error}</p>}
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/** Campos del formulario */}
        {["name", "lastname", "dni", "telephone", "photo_profile","email", "password"].map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium capitalize">{field.replace("_", " ")}</label>
            <div className="relative">
              <input
                type={field === "password" ? (showPassword ? "text" : "password") : "text"}
                name={field}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[field as keyof typeof formik.values]}
                className="mt-1 block w-full px-4 py-3 rounded-lg border border-gray-300 transition duration-200"
              />
              {field === "password" && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <FaEye className="text-gray-500 text-xl" />
                  ) : (
                    <FaEyeSlash className="text-gray-500 text-xl" />
                  )}
                </button>
              )}

            </div>
            {formik.touched[field as keyof typeof formik.values] && formik.errors[field as keyof typeof formik.errors] && (
              <p className="text-red-700 text-sm">{formik.errors[field as keyof typeof formik.errors]}</p>
            )}
          </div>
        ))}
        <button type="submit" className="w-full bg-cyan-600 text-white py-2 rounded-md hover:bg-cyan-700">
          Registrarse
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="w-full mt-2 bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600"
        >
          Volver al inicio
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;


// fotos para fronted: https://randomuser.me/api/portraits/men/20.jpg