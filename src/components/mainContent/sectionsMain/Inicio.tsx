import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserId } from "../../../redux/actions/user/userId";
import { AppDispatch, RootState } from "../../../redux/store";
import logoMedical from "../../../assets/calendar.png";


const Inicio = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userById } = useSelector( (state: RootState) => state.auth );


  useEffect(() => {
    const inciarSesion = async () => {
      try {
        const user = localStorage.getItem("user");
        const userId = user ? JSON.parse(user).id : null;
        if (userId) {
          dispatch(getUserId(userId));
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };
    inciarSesion();
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center md:items-start justify-center min-h-[80vh] px-4 md:px-8 w-full">
      <div className="text-center md:text-start mb-6 md:mb-10 w-full">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold font-playfair text-cyan-900 mb-3 md:mb-4 drop-shadow-lg">
          ¡Hola {userById?.name}!
        </h1>
        <span className="text-xl md:text-2xl text-gray-800 block">
          Bienvenido al sistema de gestión de citas
        </span>
      </div>
      <div className="flex justify-center md:justify-start w-full">
        <img 
          src={logoMedical} 
          alt="logoMedical" 
          className="w-36 md:w-44 lg:w-52 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
        />
      </div>
    </div>
  );
  
};

export default Inicio;
