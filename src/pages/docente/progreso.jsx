import * as React from "react";
import { useEffect, useState } from "react";
import { Api_Global_Dashboard } from "@/services/DashboardApi";
import apiClient from "@/Utils/apiClient";
import Cookies from 'js-cookie';

export default function Progreso() {
  const [donuts, setDonuts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const colorMap = {
    blue: "#3b82f6",
    yellow: "#eab308",
    red: "#ef4444",
    green: "#22c55e",
    purple: "#a855f7",
  };

  const colors = Object.keys(colorMap);

  useEffect(() => {
    const fetchData = async (idUsuario) => {
      try {
        const response = await apiClient.get(Api_Global_Dashboard.docente.cantidadAlumnos(idUsuario));
        const data = await response.data;

        if (data.success) {
          const transformedData = data.data.map((course, index) => {
            const vacantes = course.horarios[0]?.vacantes || 0;
            const capacidadTotal = vacantes + course.cantidadEstudiantes;
            const porcentajeOcupacion = Math.round((course.cantidadEstudiantes / capacidadTotal) * 100);

            return {
              title: `${course.cantidadEstudiantes} Registrados de ${capacidadTotal}`,
              porcentaje: `${porcentajeOcupacion}%`,
              color: colors[index % colors.length],
              className: `${course.nombreCurso}`,
              rawPercentage: porcentajeOcupacion
            };
          });

          setDonuts(transformedData);
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError("Error fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const idUser = Cookies.get('idUser')
    fetchData(idUser);
  }, []);

  if (loading) {
    return (
      <div className="mx-auto p-6 bg-white rounded-xl shadow-lg w-full">
        <div className="w-full h-full">
          <h1 className="text-lg font-bold text-center mb-6">Progreso de Clase</h1>
          <div className="flex justify-center items-center h-48">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto p-6 bg-white rounded-xl shadow-lg w-full">
        <div className="w-full h-full">
          <h1 className="text-lg font-bold text-center mb-6">Progreso de Clase</h1>
          <div className="flex justify-center items-center h-48">
            <p className="text-red-500">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6 bg-white rounded-xl shadow-lg w-full h-[530px]">
      <div className="w-full h-full">
        <h1 className="text-lg font-bold text-center mb-6">
          Progreso de Clase
        </h1>

        <div className="flex flex-col gap-4 mb-6 min-h-[200px] max-h-[480px] overflow-y-auto scrollbar-custom">
          {donuts.map((dataUnidad, index) => (
            <div key={index} className="bg-blue-50 p-4 rounded-lg shadow">
              <div className="flex flex-col items-center gap-4 h-full">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center">
                    <span className="font-bold text-gray-700">
                      {dataUnidad.className}
                    </span>
                    <p className="font-bold text-gray-500">{dataUnidad.title}</p>
                  </div>

                  <div
                    className="relative h-20 w-20 rounded-full flex items-center justify-center"
                    style={{
                      background: `conic-gradient(
                        ${colorMap[dataUnidad.color]} ${dataUnidad.rawPercentage}%,
                        white ${dataUnidad.rawPercentage}% 100%
                      )`,
                    }}
                  >
                    <div className="absolute h-16 w-16 rounded-full bg-blue-50 flex items-center justify-center">
                      <p className="text-xl font-bold">
                        {dataUnidad.porcentaje}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          .scrollbar-custom::-webkit-scrollbar {
            width: 8px;
          }
          .scrollbar-custom::-webkit-scrollbar-thumb {
            background-color: #3b82f6;
            border-radius: 4px;
          }
          .scrollbar-custom::-webkit-scrollbar-track {
            background-color: #f0f9ff;
            border-radius: 4px;
          }
          .scrollbar-custom {
            scrollbar-color: #3b82f6 #f0f9ff;
            scrollbar-width: thin;
          }
        `}
      </style>
    </div>
  );
}