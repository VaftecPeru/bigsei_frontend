import React, { useEffect, useState } from 'react';
import { Pill, Stethoscope, BarChart3 } from "lucide-react";
import { Link } from 'react-router-dom';
import { Api_Global_Dashboard } from '@/services/DashboardApi';
import apiClient from '@/Utils/apiClient';

export const PatientCard = () => {
  const [paciente, setPaciente] = useState(0);
  const [doctor, setDoctor] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responsePaciente = await apiClient.get(Api_Global_Dashboard.topico.cantidadPaciente(""));
        setPaciente(responsePaciente.data?.cantidad || 0);

        const responseDoctor = await apiClient.get(Api_Global_Dashboard.topico.cantidadDoctor(""));
        setDoctor(responseDoctor.data?.cantidad || 0);
      } catch (error) {
        console.error("Error al obtener datos del dashboard:", error);
      }
    };

    fetchData();
  }, []);

  const dashboardData = [
    {
      id: 1,
      title: "Número de Pacientes",
      value: paciente,
      icon: <Pill size={28} />,
      image: "https://brandandhealth.com/wp-content/uploads/2017/09/Tipos-de-pacientes-y-co%CC%81mo-tratar-a-cada-uno-de-ellos-scaled.jpeg",
      path: "/topicomedico/pacientes",
    },
    {
      id: 2,
      title: "Número de Doctores",
      value: doctor,
      icon: <Stethoscope size={28} />,
      image: "https://www.tuproyectodevida.pe/wp-content/uploads/2020/11/D%C3%B3nde-puedes-trabajar-como-doctor.jpg",
      path: "/topicomedico/añadir-doctor",
    },
    {
      id: 3,
      title: "Estadísticas",
      value: "85%",
      icon: <BarChart3 size={28} />,
      image: "https://www.emagister.com/blog/wp-content/uploads/2021/10/Estadistica-1.jpg",
      path: "/topico/TopicoDashboard",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      {dashboardData.map((item) => (
        <div
          key={item.id}
          className="rounded-xl p-6 shadow-lg text-white flex flex-col items-center justify-between"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${item.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex items-center justify-center w-14 h-14 bg-blue-600 rounded-full mb-4">
            {item.icon}
          </div>
          <h3 className="text-xl font-semibold text-center">{item.title}</h3>
          <p className="text-3xl font-bold mt-2">{item.value}</p>
          <Link
            to={item.path}
            className="mt-4 px-5 py-2 bg-white text-black font-bold rounded-lg text-sm transition-all hover:bg-gray-200"
          >
            Ver más
          </Link>
        </div>
      ))}
    </div>
  );
};