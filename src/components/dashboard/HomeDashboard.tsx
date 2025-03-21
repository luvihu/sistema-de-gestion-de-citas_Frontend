import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dashboardSummary } from "../../redux/actions/dashboard/dashboardSummary";
import { RootState, AppDispatch } from '../../redux/store';


const DashboardSummary = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { totalDoctors, totalSpecialties, totalMonthAppointments, topDoctor, topSpecialty } = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    dispatch(dashboardSummary());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {/* Total de Doctores */}
      <div className="bg-white shadow-md p-4 rounded-lg flex items-center">
        <span className="text-4xl mr-4">👨‍⚕️</span>
        <div>
          <p className="text-xl font-semibold">{totalDoctors}</p>
          <p className="text-gray-600">Doctores Registrados</p>
        </div>
      </div>

      {/* Total de Especialidades */}
      <div className="bg-white shadow-md p-4 rounded-lg flex items-center">
        <span className="text-4xl mr-4">🏥</span>
        <div>
          <p className="text-xl font-semibold">{totalSpecialties}</p>
          <p className="text-gray-600">Especialidades</p>
        </div>
      </div>

      {/* Total de Citas del Mes */}
      <div className="bg-white shadow-md p-4 rounded-lg flex items-center">
        <span className="text-4xl mr-4">📅</span>
        <div>
          <p className="text-xl font-semibold">{totalMonthAppointments}</p>
          <p className="text-gray-600">Citas este Mes</p>
        </div>
      </div>

      {/* Doctor con más citas */}
      <div className="bg-white shadow-md p-4 rounded-lg flex items-center">
        <span className="text-4xl mr-4">🏆</span>
        <div>
          <p className="text-xl font-semibold">{topDoctor || "No disponible"}</p>
          <p className="text-gray-600">Doctor con más Citas</p>
        </div>
      </div>

      {/* Especialidad más solicitada */}
      <div className="bg-white shadow-md p-4 rounded-lg flex items-center">
        <span className="text-4xl mr-4">🔝</span>
        <div>
          <p className="text-xl font-semibold">{topSpecialty || "No disponible"}</p>
          <p className="text-gray-600">Especialidad más Solicitada</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;





// const DashboardHome = () => {
//   return (
//     <div className="p-6 bg-white shadow-md rounded-md">
//       <h2 className="text-2xl font-semibold mb-4">Bienvenido al Panel de Administración</h2>
//       <p>Selecciona una opción del menú para gestionar el sistema.</p>
//     </div>
//   );
// };

// export default DashboardHome;
