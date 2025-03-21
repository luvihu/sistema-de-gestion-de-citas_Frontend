import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../../../redux/actions/user/userId";
import { RootState, AppDispatch } from "../../../redux/store";
import { AppointmentByUser } from "../../../interfaces/AuthContextProps";

const MisCitas = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);
  const { userById } = useSelector((state: RootState) => state.auth);
  const dataUserById = userById?.appointments || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = localStorage.getItem("user");
        const userId = user ? JSON.parse(user).id : null;
        if (userId) {
          await dispatch(getUserId(userId));
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="p-4 md:p-6 lg:p-8 bg-slate-100 shadow-lg rounded-lg max-w-7xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold font-playfair text-cyan-900 mb-6 text-center">Mis Citas</h2>
      
      {isLoading ? (
        <div className="text-center p-6 bg-white rounded-lg shadow">
          <p className="text-lg text-gray-600">Cargando tus citas...</p>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-900 mx-auto mt-4"></div>
        </div>
      ) : dataUserById?.length === 0 ? (
        <div className="text-center p-8 bg-white rounded-lg shadow">
          <p className="text-lg text-gray-600">No tienes citas registradas.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="w-full bg-white">
            <thead>
              <tr className="bg-gradient-to-r from-blue-200 to-cyan-200 text-blue-950">
                <th className="px-4 py-3 text-left hidden md:table-cell">Fecha</th>
                <th className="px-4 py-3 text-left hidden md:table-cell">Hora</th>
                <th className="px-4 py-3 text-left">Doctor</th>
                <th className="px-4 py-3 text-left hidden lg:table-cell">Especialidad</th>
                <th className="px-4 py-3 text-left">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {dataUserById.map((appointment: AppointmentByUser) => (
                <tr key={appointment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4 hidden md:table-cell">{appointment.date}</td>
                  <td className="px-4 py-4 hidden md:table-cell">{appointment.hour}</td>
                  <td className="px-4 py-4">
                    <div className="font-medium text-blue-950">{appointment.doctor.name}</div>
                    <div className="text-sm text-blue-950 font-medium">{appointment.doctor.lastname}</div>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">{appointment.doctor.specialty.name}</td>
                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      appointment.status === 'CONFIRMADO' ? 'bg-green-100 text-green-900' :
                      appointment.status === 'PENDIENTE' ? 'bg-yellow-100 text-yellow-900' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MisCitas;
