import * as React from "react";
import { useEffect, useState } from "react";
import apiClient from "@/Utils/apiClient"; 
import { Api_Global_Dashboard } from "@/services/DashboardApi"; 
import Cookies from 'js-cookie';

export default function Homeworks() {
  const [homeworks, setHomeworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchHomeworks = async (idUsuario) => {
      try {
        const response = await apiClient.get(
          Api_Global_Dashboard.docente.listarTarea(idUsuario)
        );
        
        if (response.data.success) {
          const transformedData = response.data.data.map(tarea => ({
            id: tarea.idTareaCurso,
            tittle: tarea.descripcion,
            day: formatDate(tarea.fecha_inicio),
            time: formatTime(tarea.fecha_inicio),
            fecha_fin: tarea.fecha_fin,
            idCurso: tarea.idCurso
          }));
          
          setHomeworks(transformedData);
        } else {
          setError("Failed to fetch homework data");
        }
      } catch (err) {
        setError("Error fetching homework data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const idUser=Cookies.get('idUser')
    fetchHomeworks(idUser);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    return `${day} ${month}`;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const displayedHomeworks = showAll ? homeworks : homeworks.slice(0, 3);

  if (loading) {
    return (
      <div className="mx-auto p-6 bg-white rounded-xl shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-800">Tareas</h2>
        </div>
        <hr />
        <div className="flex justify-center items-center h-32">
          <p>Cargando tareas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto p-6 bg-white rounded-xl shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-800">Tareas</h2>
        </div>
        <hr />
        <div className="flex justify-center items-center h-32">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-6 bg-white rounded-xl shadow-lg max-w-md w-full h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Tareas</h2>
        {homeworks.length > 3 && (
          <button 
            onClick={toggleShowAll}
            className="text-base font-medium text-blue-600 hover:text-blue-800 focus:outline-none"
          >
            {showAll ? 'Ver menos' : 'Ver todos'}
          </button>
        )}
      </div>
      <hr />
      <div className="space-y-1"> 
        {displayedHomeworks.length > 0 ? (
          displayedHomeworks.map((homework, index) => (
            <React.Fragment key={homework.id}>
              <div className="flex items-center gap-2 p-3 bg-white rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-200 rounded-full">
                  <span className="text-base font-semibold text-blue-700">
                    {String.fromCharCode(64 + (homework.idCurso % 26))}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-medium text-gray-800 truncate">
                      {homework.tittle}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-1 mt-1">
                    <p className="text-gray-600 text-xs">Entrega: {homework.day}</p>
                    <p className="text-gray-600 text-xs">Hasta: {formatTime(homework.fecha_fin)}</p>
                  </div>
                </div>
              </div>
              {index !== displayedHomeworks.length - 1 && <hr />}
            </React.Fragment>
          ))
        ) : (
          <div className="flex justify-center items-center h-32">
            <p>No hay tareas asignadas</p>
          </div>
        )}
      </div>
    </div>
  );
}