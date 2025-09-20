import Chard from "./chart.jsx";
import { Link } from "react-router-dom";
import Progreso from "./progreso.jsx";
import AttendanceLineChart from "./assistance.jsx";
import DeliveryTask from "./delivery.jsx";
import Homeworks from "./homework.jsx";
import { useState, useEffect } from "react";
import { Api_Global_Dashboard } from "../../services/DashboardApi";
import apiClient from "../../Utils/apiClient";
import Cookies from 'js-cookie';

//data del curso componente
const courses = [
  {
    id: 1,
    day: 31,
    title: "Programacion",
    time: "8 A.M - 12 P.M",
    status: "Ahora",
    place: "www.zoom.com",
  },
  {
    id: 2,
    day: 31,
    title: "Programacion",
    time: "8 A.M - 12 P.M",
    status: "Proximamente",
    place: "www.zoom.com",
  },
  {
    id: 3,
    day: 31,
    title: "Programacion",
    time: "8 A.M - 12 P.M",
    status: "Proximamente",
    place: "Laboratorio de ciencia física",
  },
  {
    id: 4,
    day: 31,
    title: "Programacion",
    time: "8 A.M - 12 P.M",
    status: "Proximamente",
    place: "Documento enviado vía email",
  },
];




function CoursePanel() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const idUser = Cookies.get('idUser');
        const response = await apiClient.get(Api_Global_Dashboard.docente.listarCursos(idUser));
        setCourses(response.data.cursos);
      } catch (err) {
        setError("Error al cargar los cursos");
        console.error("Error fetching courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto p-6 bg-white rounded-xl shadow-lg max-w-md w-full">
        <p>Cargando cursos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto p-6 bg-white rounded-xl shadow-lg max-w-md w-full">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="mx-auto p-6 bg-white rounded-xl shadow-lg max-w-md w-full">
        <p>No tienes cursos asignados</p>
      </div>
    );
  }

  // Función para formatear el día (ej: "Lunes" → "L")
  const formatDay = (day) => {
    if (!day) return '';
    return day.charAt(0).toUpperCase();
  };

  const getCourseStatus = (horario) => {
    return "En curso";
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-xl shadow-lg max-w-md w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Cursos asignados</h2>
        <Link to="/docente/asignaturas">
          <span className="text-base font-medium text-blue-600">Ver todos</span>
        </Link>
      </div>

      <div className="space-y-8">
        {courses.flatMap((course) =>
          course.horarios.map((horario, index) => (
            <div
              key={`${course.idCurso}-${index}`}
              className="flex items-center gap-4 p-5 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-200 rounded-full">
                <span className="text-lg font-semibold text-blue-700">
                  {formatDay(horario.dia)}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-md font-medium text-gray-800 truncate">
                    {course.nombreCurso}
                  </h3>
                  <span className="text-sm text-gray-600 whitespace-nowrap">
                    <span className="inline-block w-2 h-2 bg-blue-800 rounded-full mr-2"></span>
                    {`${horario.hora_ini.split(':').slice(0, 2).join(':')} - ${horario.hora_fin.split(':').slice(0, 2).join(':')}`}
                  </span>
                </div>

                <div className="flex items-center gap-4 mt-1">
                  <p className="text-gray-600 text-xs">
                    Aula: {horario.aula}
                  </p>
                  <span
                    className={`ml-auto px-2 py-1 text-xs font-medium rounded-full ${getCourseStatus(horario) === "Próximamente"
                      ? "text-orange-700 bg-orange-100"
                      : "text-green-700 bg-green-100"
                      }`}
                  >
                    {getCourseStatus(horario)}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default function InfoData() {
  return (
    <div
      className="
        // Grid responsivo
        grid gap-4 my-6 grid-cols-1
        md:grid-cols-2 md:gap-6
        xl:grid-cols-3 xl:gap-8 xl:my-8
      "
    >
      {/* Curso asignado card */}
      <CoursePanel />

      {/* Gráfico */}
      <div
        className="
          bg-red-500 rounded-xl
          mt-8
          md:mt-0
          h-full
          w-full
        "
      >
        <div className="w-full h-full">
          <Chard />
        </div>
      </div>

      {/* Progreso */}
      <div
      >
        <Progreso />
      </div>

      {/* Gráfico de asistencia */}
      <div
        className="
          bg-white
          mt-8
          md:mt-0
          h-full
          w-full
        "
      >
        <AttendanceLineChart />
      </div>

      {/* Tareas de entrega */}
      <div
      >
        <DeliveryTask />
      </div>

      {/* Tareas */}
      <div
      >
        <Homeworks />
      </div>
    </div>
  );
}