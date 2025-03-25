import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dashboardSummary } from "../../redux/actions/dashboard/dashboardSummary";
import { RootState, AppDispatch } from '../../redux/store';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

const DashboardSummary = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { totalDoctors, totalSpecialties, totalMonthAppointments, topDoctor, topSpecialty } = useSelector((state: RootState) => state.dashboard);

  useEffect(() => {
    dispatch(dashboardSummary());
  }, [dispatch]);

  // Datos para gráfico de distribución
  const distributionData = {
    labels: ['Doctores', 'Especialidades', 'Citas Mensuales'],
    datasets: [
      {
        label: 'Distribución',
        data: [totalDoctors, totalSpecialties, totalMonthAppointments],
        backgroundColor: [
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Datos para gráfico de tendencia (simulados)
  const trendData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Citas por mes',
        data: [65, 59, 80, 81, 56, totalMonthAppointments],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center w-full">Panel de Control</h2>
           {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-blue-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Doctores</p>
              <p className="text-3xl font-bold">{totalDoctors}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <span className="text-2xl">👨‍⚕️</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-pink-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Especialidades</p>
              <p className="text-3xl font-bold">{totalSpecialties}</p>
            </div>
            <div className="bg-pink-100 p-3 rounded-full">
              <span className="text-2xl">🏥</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-green-500">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Citas este mes</p>
              <p className="text-3xl font-bold">{totalMonthAppointments}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <span className="text-2xl">📅</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Distribución General</h3>
          <div className="h-64">
            <Doughnut data={distributionData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-lg font-semibold mb-4">Tendencia de Citas</h3>
          <div className="h-64">
            <Line data={trendData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
      
      {/* Información destacada */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-yellow-400">
          <h3 className="text-lg font-semibold mb-4">Doctor Destacado</h3>
          <div className="flex items-center">
            <div className="bg-yellow-100 p-4 rounded-full mr-4">
              <span className="text-2xl">🏆</span>
            </div>
            <div>
              <p className="text-xl font-bold">{topDoctor || "No disponible"}</p>
              <p className="text-gray-600">Mayor número de citas</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-purple-400">
          <h3 className="text-lg font-semibold mb-4">Especialidad Destacada</h3>
          <div className="flex items-center">
            <div className="bg-purple-100 p-4 rounded-full mr-4">
              <span className="text-2xl">🔝</span>
            </div>
            <div>
              <p className="text-xl font-bold">{topSpecialty || "No disponible"}</p>
              <p className="text-gray-600">Más solicitada</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;



