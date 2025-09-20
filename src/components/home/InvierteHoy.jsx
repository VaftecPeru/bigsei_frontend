import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { Api_Global_Web } from "../../services/WebApi";
import apiClient from "../../Utils/apiClient";
import { Api_Global_Setup } from "../../services/SetupApi";
import { rutaApi } from "../../Utils/Utils";

export default function InvierteHoy() {
  const [courses, setCourses] = useState([]);

  const handleListarCursos = () => {
    apiClient.get(Api_Global_Web.cursos.listarVisiblesWeb({
      per_page: 4,
      page: 1,
    }))
      .then((response) => {
        setCourses(response.data.data);
      })
      .catch((error) => {
        setCourses([]);
      });
  };

  useEffect(() => {
    handleListarCursos();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 inline-block">
            Invierte en ti <span className="font-black">hoy</span>
          </h2>
          <div className="h-1 w-16 bg-red-600 mt-1"></div>

          <p className="mt-4 text-lg text-gray-700 max-w-3xl">
            Lleva tu carrera al siguiente nivel con nuestros cursos detallados, que ofrecen orientación
            experta, conocimiento especializado y certificaciones profesionales
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link to={`/cursos`}>
              <button className="px-6 py-2 bg-red-600 text-white font-medium rounded-2xl hover:bg-red-700 transition-colors">
                Explorar las microcredenciales
              </button>
            </Link>
            <Link to={`/Marketplace`}>
              <button className="px-10 py-2 border-4 border-red-600 text-red-600 font-bold rounded-2xl hover:bg-red-50 transition-colors">
                Explorar  Marketplace
              </button>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <div key={course.id_periodocurso} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative">
                {course.curso_id_archivo ? (
                  <img
                    src={`${rutaApi(Api_Global_Setup.archivos.visualizarImagen(course.curso_id_archivo))}`}
                    alt={course.curso_nombre}
                    className="w-full h-48 object-cover"
                  />
                ) : (
                  <div className="h-48 flex items-center justify-center font-bold text-gray-500">
                    Cargando imagen...
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white p-1 rounded shadow-md">
                  {course.empresa_id_archivo ? (
                    <img
                      src={`${rutaApi(Api_Global_Setup.archivos.visualizarImagen(course.empresa_id_archivo))}`}
                      alt="Partner logo"
                      className="w-16 h-10 object-cover"
                    />
                  ) : (
                    <div className="w-16 h-10 object-cover flex items-center justify-center font-bold text-gray-500">
                      ...
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {course.curso_nombre}
                </h3>
                <p className="text-sm text-gray-700 mb-4">
                  {course.detalle}
                </p>
                <Link to={`/cursos`}>
                  <button className="inline-block bg-gray-300 px-3 py-2 rounded-full text-xs font-medium text-gray-800">
                    Microcredencial
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}