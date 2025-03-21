import React from "react";


export interface User {
  name: string;
  lastname: string;
  dni: string;
  telephone: string;
  photo_profile?: string;
  email: string;
  password: string;
  role?: 'ADMIN' | 'USER';
}
export interface UserData {
  id: string;
  name: string;
  lastname: string;
  dni: string;
  telephone: string;
  photo_profile?: string;
  email: string;
  password: string;
  role?: 'ADMIN' | 'USER';
  date_registration?: string;
  appointments: AppointmentByUser[];
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
};


// type ValidTimeAppoint = '08:00' | '09:00' | '10:00' | '11:00' | '12:00' | '13:00' | '14:00' | '15:00' | '16:00' | '17:00' | '18:00';
enum StatusApp {
  PENDIENTE = "PENDIENTE",
  CONFIRMADO = "CONFIRMADO",
  CANCELADO = "CANCELADO"
}

export interface Appointment {
  id?: string;
  status?: StatusApp; // Estado de la cita
  date: string;             // Fecha en formato YYYY-MM-DD
  hour:string;   // Hora en formato HH:MM
  id_user:string,
   id_doctor: string,           
}

export interface AppointmentsData {
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
    specialty: {
      id: string;
      name: string;
    };
  };
}

export interface UserById {
  id: string;
  name:              string;
  lastname:          string;
  dni:               string;
  telephone:         string;
  photo_profile?:     string;
  email:             string;
  password:          string;
  role?:              'ADMIN' | 'USER';
  appointments:      AppointmentByUser[];
}

export interface AppointmentByUser {
  id:            string;
  status?:        StatusApp;
  date:          string;
  hour:          string;
  date_creation?: string;
  doctor:        Doctor;
}
type ValidTime = '09:00-18:00' | '09:00-15:00' | '14:00-18:00';
type ValidDays = 'LUNES' | 'MARTES' | 'MIERCOLES' | 'JUEVES' | 'VIERNES';

export interface Doctor {
  id?:              string;
  name:            string;
  lastname:        string;
  days_atention:   ValidDays;
  hours_attention: ValidTime;
  telephone:       string;
  email:           string;
  active?:          boolean;
  specialty:       Specialty;
 }
 export interface AppointmentDoctorDash {
  status?: StatusApp; 
  date: string;             
  hour:string; 
  date_creation: string;
}

export interface DoctorDashboard {
  id:              string;
  name:            string;
  lastname:        string;
  days_atention:   ValidDays;
  hours_attention: ValidTime;
  telephone:       string;
  email:           string;
  active?:          boolean;
  specialty:      {
            id: string;
            name: string;
            };
  appointments: AppointmentDoctorDash[] 
   
 }

export interface Specialty {
  id:          string;
  name:        string;
  description: string;
}

export interface SpecialtyDataRedux {
  id: string;
  name: string;
  description: string;
  active?: boolean;
  doctors: Array<{
    id: string;
    name: string;
    lastname: string;
    days_atention: string;
    hours_attention: string;
    telephone: string;
    email: string;
    active: boolean;
  }>;
}
