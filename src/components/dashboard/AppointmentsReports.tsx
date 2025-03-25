import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppointments } from '../../redux/actions/appointment/fetchAppointments';
import { deleteAppointment } from '../../redux/actions/appointment/deleteAppointments';
import { fetchDoctors } from '../../redux/actions/dashboard/dashboardDoctor/fetchDoctors';
import { fetchSpecialties } from '../../redux/actions/specialties/fetchSpecialties';
import { fetchUsers } from '../../redux/actions/user/userGet';
import AppointmentFilters from './dashboardAppointmet/AppointmentFilters';
import AppointmentTable from './dashboardAppointmet/AppointmentTable';
import EditAppointmentModal from './dashboardAppointmet/EditAppointmentModal';
import { RootState, AppDispatch } from '../../redux/store';

enum StatusApp {
  PENDIENTE = "PENDIENTE",
  CONFIRMADO = "CONFIRMADO",
  CANCELADO = "CANCELADO"
}
type ValidTime = '09:00-18:00' | '09:00-15:00' | '14:00-18:00';
type ValidDays = 'LUNES' | 'MARTES' | 'MIERCOLES' | 'JUEVES' | 'VIERNES';

interface AppointmentsData {
  id: string;
  status?: StatusApp;
  date: string;
  hour: string; 
  date_creation?: string;
  user: {
    id: string;
    name: string;
    lastname: string;
    telephone: string;
    email: string;
  };
  doctor: {
    id: string;
    name: string;
    lastname: string;
    active?: boolean;
    days_atention: ValidDays;
    hours_attention: ValidTime;
    specialty: {
      id: string;
      name: string;
    };
  };
}

const AppointmentsReports = () => {
  const dispatch = useDispatch<AppDispatch>();
  const appointments = useSelector((state: RootState) => state.dashboard.appointments);
  const doctors = useSelector((state: RootState) => state.dashboard.doctors);
  const specialties = useSelector((state: RootState) => state.auth.specialties);
  const users = useSelector((state: RootState) => state.auth.users);
  
  const [filteredAppointments, setFilteredAppointments] = useState<AppointmentsData[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentsData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filtros
  const [doctorFilter, setDoctorFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [weekFilter, setWeekFilter] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('');
  const [userFilter, setUserFilter] = useState('');

  useEffect(() => {
    dispatch(fetchAppointments());
    dispatch(fetchDoctors());
    dispatch(fetchSpecialties());
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    applyFilters();
  }, [appointments, doctorFilter, dateFilter, weekFilter, specialtyFilter, userFilter]);

  const applyFilters = () => {
    let filtered = [...appointments];

    if (doctorFilter) {
      filtered = filtered.filter(
        app => `${app.doctor.name} ${app.doctor.lastname}`.toLowerCase().includes(doctorFilter.toLowerCase())
      );
    }

    if (dateFilter) {
      filtered = filtered.filter(app => app.date === dateFilter);
    }

    if (weekFilter) {
      const weekStart = new Date(weekFilter);
      const weekEnd = new Date(weekFilter);
      weekEnd.setDate(weekEnd.getDate() + 6);
      
      filtered = filtered.filter(app => {
        const appDate = new Date(app.date);
        return appDate >= weekStart && appDate <= weekEnd;
      });
    }

    if (specialtyFilter) {
      filtered = filtered.filter(
        app => app.doctor.specialty.name.toLowerCase().includes(specialtyFilter.toLowerCase())
      );
    }

    if (userFilter) {
      filtered = filtered.filter(
        app => `${app.user.name} ${app.user.lastname}`.toLowerCase().includes(userFilter.toLowerCase())
      );
    }

    setFilteredAppointments(filtered);
  };

  const handleEditAppointment = (appointment: AppointmentsData) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleDeleteAppointment = (id: string) => {
    Swal.fire({
              title: "¿Estás seguro de que deseas eliminar esta cita?",
              text: "No podrás revertir esto.",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#d33",
              cancelButtonColor: "#3085d6",
              confirmButtonText: "Sí, eliminar",
            }).then((result) => {
              if (result.isConfirmed) {
                dispatch(deleteAppointment(id));
                Swal.fire("Eliminado", "La cita ha sido eliminada.", "success");
              }
            });

  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center w-full">Gestión de Citas Médicas</h2>
      
      <AppointmentFilters 
        doctors={doctors}
        specialties={specialties}
        users={users}
        setDoctorFilter={setDoctorFilter}
        setDateFilter={setDateFilter}
        setWeekFilter={setWeekFilter}
        setSpecialtyFilter={setSpecialtyFilter}
        setUserFilter={setUserFilter}
      />
      
      <AppointmentTable 
        appointments={filteredAppointments}
        onEdit={handleEditAppointment}
        onDelete={handleDeleteAppointment}
      />
      
      {isModalOpen && selectedAppointment && (
        <EditAppointmentModal 
          appointment={selectedAppointment}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          doctors={doctors}
        />
      )}
    </div>
  );
};

export default AppointmentsReports;
