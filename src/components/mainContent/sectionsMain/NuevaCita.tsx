import Swal from "sweetalert2";
import { AppDispatch, RootState } from "../../../redux/store";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpecialties } from "../../../redux/actions/specialties/fetchSpecialties";
import { fetchSpecialtiesById } from "../../../redux/actions/specialties/fetchSpecialtiesById";
import { createAppointment } from "../../../redux/actions/appointment/createAppointment";
import { useNavigate } from "react-router-dom";


const NuevaCita = () => {
  
  interface Specialty {
    id: string;
    name: string;
  }
  
  interface Doctor {
    id: string;
    name: string;
    lastname: string;
    days_atention: string;
    hours_attention: string;
  }
  
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const showSuccess = () => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "¡Cita agendada exitosamente!",
    showConfirmButton: false,
    timer: 1500,
    width: '250px',
    toast: true
  }).then(() => navigate("/user"));
  };

  const specialties = useSelector((state: RootState) => state.auth.specialties as Specialty[]);
const doctorsBySpecialty = useSelector((state: RootState) => state.auth.doctorsBySpecialty as Doctor[]);
const userById = useSelector((state: RootState) => state.auth.userById);
  const dataUserById = userById?.appointments || [];
 
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [selectedDoctorInfo, setSelectedDoctorInfo] = useState<Doctor | null>(null);
  const [error, setError] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    dispatch(fetchSpecialties());
  }, [dispatch]);

  useEffect(() => {
    if (selectedSpecialty) {
      dispatch(fetchSpecialtiesById(selectedSpecialty));
    }
  }, [dispatch, selectedSpecialty]);

  const handleSpecialtyChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpecialty(e.target.value);
    setSelectedDoctor("");
    setSelectedDoctorInfo(null);
    setDate("");
    setTime("");
  }, []);

  const handleDoctorChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const doctorId = e.target.value;
    setSelectedDoctor(doctorId);
    const doctor = doctorsBySpecialty.find((doc) => doc.id === doctorId) || null;
    setSelectedDoctorInfo(doctor);
    setDate("");
    setTime("");
  }, [doctorsBySpecialty]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    if (!selectedDate) {
    setDate("");
    return;
    };
    const dateObj = new Date(selectedDate + 'T00:00:00');
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (dateObj.getTime() <= today.getTime()) {
      setError("La fecha debe ser posterior a hoy.");
      return;
    }

    // Mapeo de días de la semana
    const diasSemana: Record<number, string> = {
    1: 'LUNES',
    2: 'MARTES',
    3: 'MIERCOLES',
    4: 'JUEVES',
    5: 'VIERNES'
    };
    
    const dayOfWeek = dateObj.getDay();
    const diaSeleccionado = diasSemana[dayOfWeek];

    if (!diaSeleccionado) {
    setError("No se pueden agendar citas los fines de semana");
    return;
    }

    // Verificar si el día seleccionado coincide con el día de atención del doctor
    if (selectedDoctorInfo && selectedDoctorInfo.days_atention !== diaSeleccionado) {
      setError(`El doctor solo atiende los días ${selectedDoctorInfo.days_atention}`);
      return;
    }
    setError("");
    setDate(selectedDate);
    setTime("");
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTime = e.target.value;
    const [hours, minutes] = selectedTime.split(":").map(Number);

    if (selectedDoctorInfo) {
      // Extraer y formatear las horas del horario del doctor
      const [startTime, endTime] = selectedDoctorInfo.hours_attention.split("-");
      const [startHour] = startTime.split(":").map(Number);
      const [endHour] = endTime.split(":").map(Number);

      // Validación contra el horario específico del doctor, permite agendar la última hora inclusive
      if (hours < startHour || hours > endHour) {
        setError(`El horario disponible del doctor es de ${selectedDoctorInfo.hours_attention}`);
        return;
      }
    }
    if (minutes !== 0) {
      setError("Solo se permiten citas en horas exactas (08:00, 09:00, etc.)");
      return;
    }

    setError("");
    setTime(selectedTime);
  };

  enum StatusApp {
    PENDIENTE = "PENDIENTE",
    CONFIRMADO = "CONFIRMADO",
    CANCELADO = "CANCELADO"
  }
  
  interface AppointmentData {
    id?: string;
    status?: StatusApp;
    date: string;
    hour: string;
    id_user: string;
    id_doctor: string;
  }
  const isAppointmentDuplicate = (selectedDoctor: string, date: string, time: string): boolean => {
    return dataUserById.some(appointment => 
      appointment.doctor.id === selectedDoctor &&
      appointment.date === date &&
      appointment.hour === time &&
      appointment.status !== StatusApp.CANCELADO
    );
  };
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!selectedSpecialty || !selectedDoctor || !date || !time) {
      setError("Por favor, completa todos los campos.");
      setIsSubmitting(false);
      return;
    }
    const user = localStorage.getItem("user");
    if (!user) {
    setError("No se encontró información del usuario. Por favor, inicie sesión nuevamente.");
    setIsSubmitting(false);
    return;
  }

    const userId = JSON.parse(user).id;
    
   // Verificamos si la cita está duplicada
    if (isAppointmentDuplicate(selectedDoctor, date, time)) {
      setError("Ya existe una cita programada para esta fecha y hora con el mismo doctor");
      setIsSubmitting(false);
      return;
    }
    const appointmentData: AppointmentData = {
      status: StatusApp.PENDIENTE,
      date,
      hour: time,
      id_user: userId,
      id_doctor: selectedDoctor,
    };

    try {
      await dispatch(createAppointment(appointmentData));
      resetForm();
      showSuccess();
      } catch (err) {
        console.error("Error al agendar la cita", err);
        setError("Ocurrió un error al agendar la cita. Por favor, inténtelo nuevamente.");
      } finally {
        setIsSubmitting(false);
      }
  };

  const resetForm = () => {
  setSelectedSpecialty("");
  setSelectedDoctor("");
  setSelectedDoctorInfo(null);
  setDate("");
  setTime("");
  setError("");
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
  <h1 className="text-2xl sm:text-3xl font-semibold mb-6 mt-0 font-playfair text-cyan-900">Agendar Nueva Cita</h1>
  
  {error && (
    <div className="max-w-lg mb-4 border-l-4 border-red-500 p-3 rounded-r shadow-sm bg-red-100 bg-opacity-80">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg className="h-4 w-4 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
          </svg>
        </div>
        <div className="ml-2">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      </div>
    </div>
  )}

  <form className="max-w-lg space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
      <div className="sm:col-span-2">
        <label className="block mb-2 font-semibold">Especialidad</label>
        <select className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-200" 
          onChange={handleSpecialtyChange} 
          value={selectedSpecialty}>
          <option value="">Selecciona una especialidad</option>
          {specialties.map((specialty) => (
            <option key={specialty.id} value={specialty.id}>
              {specialty.name}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label className="block mb-2 font-semibold">Doctor</label>
        <select className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100" 
          onChange={handleDoctorChange} 
          value={selectedDoctor} 
          disabled={!selectedSpecialty}>
          <option value="">Selecciona un doctor</option>
          {doctorsBySpecialty.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name} {doctor.lastname}
            </option>
          ))}
        </select>
      </div>

      {selectedDoctorInfo && (
        <div className="sm:col-span-2 p-2 text-cyan-900">
          <p className="text-sm sm:text-base"><strong>Días de atención:</strong> {selectedDoctorInfo.days_atention}</p>
          <p className="text-sm sm:text-base"><strong>Horario:</strong> {selectedDoctorInfo.hours_attention}</p>
        </div>
      )}

      <div className="sm:col-span-1">
        <label className="block mb-2 font-semibold">Fecha</label>
        <input type="date" 
          className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100" 
          onChange={handleDateChange} 
          value={date} 
          disabled={!selectedDoctor} />
      </div>

      <div className="sm:col-span-1">
        <label className="block mb-2 font-semibold">Hora</label>
        <input type="time" 
          className="w-full p-2 border border-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 disabled:bg-gray-100" 
          onChange={handleTimeChange} 
          value={time} 
          step="3600" 
          disabled={!date}
          />
      </div>
    </div>

    <button type="submit" 
      className={`w-full sm:w-auto px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed
      ${isSubmitting ? 'opacity-70' : ''}`}
      disabled={!time || isSubmitting || !!error}>
      {isSubmitting ? 'Agendando...' : 'Agendar Cita'}
    </button>
  </form>
 </div>

  );
};


export default NuevaCita;









