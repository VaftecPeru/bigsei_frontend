import { useState, useEffect } from "react";
import ModalRegistrar from "./modalRegistrar.jsx";
import { Api_Global_Docente } from "../../../services/DocenteApi";
import apiClient from "../../../Utils/apiClient";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

const AttendanceSystem = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenModalRegister, setIsOpenModalRegister] = useState(false);
  const [asistencias, setAsistencias] = useState([]);
  const [porcentaje, setPorcentaje] = useState({
    total: 0,
    asistencia_total: 0,
    tarde_total: 0,
    falta_total: 0,
  });
  const date = new Date();
  const fechaActual = {
    diaNombre: date.toLocaleDateString('default', { weekday: 'long' }),
    mesNombre: date.toLocaleString('default', { month: 'long' }),
    dia: date.getDate(),
    hora: date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }),
  };
  const foto = "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29uYXxlbnwwfHwwfHx8MA%3D%3D";

  const [cursos, setCursos] = useState([]);
  const [loadingCursos, setLoadingCursos] = useState(false);

  const estilos = [
    { bgColor: "#e9d5ff" },
    { bgColor: "#fef08a" },
    { bgColor: "#bbf7d0" },
    { bgColor: "#fbcfe8" },
    { bgColor: "#fbe4b7" },
    { bgColor: "#bfdbfe" },
    { bgColor: "#f2abab" },
    { bgColor: "#fed7aa" },
  ];

  const onBurcar = (text_search = "") => {
    setLoadingCursos(true);
    apiClient.get(Api_Global_Docente.academicoPeriodoCursos.listar({
      per_page: 15,
      page: 1,
    }, text_search))
      .then((response) => {
        setLoadingCursos(false);
        let i = -1;
        const data = response.data.data.map((item, index) => {
          i++;
          if (i >= 8) i = 0;
          return {
            id_periodocurso: item.id_periodocurso,
            titulo: item.curso_nombre,
            horario: item.horario_descripcion,
            hora: item.horario_descripcion,
            lugar: item.aula_nombre,
            bgColor: estilos[i].bgColor,
            nroOrden: (index + 1),
          };
        });
        setCursos(data);
      })
      .catch((error) => {
        setLoadingCursos(false);
        setCursos([]);
      });
  };

  const clickShowModalRegister = () => {
    const data = {};
    setIsLoading(true);
    apiClient.post(Api_Global_Docente.miAsistencias.registrar(), data)
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        handleAsistencias();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const clickInside = (bool) => {
    //esto recibe un false para que se cierre
    setIsOpenModalRegister(bool);
  };

  const handleAsistencias = () => {
    setIsLoading(true);
    apiClient.get(Api_Global_Docente.miAsistencias.listar({
      per_page: 15,
      page: 1,
    }))
      .then((response) => {
        setIsLoading(false);
        setAsistencias(response.data.data);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
        setAsistencias([]);
      });
  };

  const handlePorcentajes = () => {
    setIsLoading(true);
    apiClient.get(Api_Global_Docente.miAsistencias.porcentajes())
      .then((response) => {
        setIsLoading(false);
        if (response.data.total > 0) {
          setPorcentaje({
            total: response.data.total,
            asistencia_total: ((response.data.asistencia_total * 100) / response.data.total).toFixed(2),
            tarde_total: ((response.data.tarde_total * 100) / response.data.total).toFixed(2),
            falta_total: ((response.data.falta_total * 100) / response.data.total).toFixed(2),
          });
        } else {
          setPorcentaje({
            total: 0,
            asistencia_total: 0,
            tarde_total: 0,
            falta_total: 0,
          });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
        setPorcentaje({
          total: 0,
          asistencia_total: 0,
          tarde_total: 0,
          falta_total: 0,
        });
      });
  };

  useEffect(() => {
    handleAsistencias();
    handlePorcentajes();
    onBurcar();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50 p-4 ">
        <div className="p-[2px] bg-blue-200 bg-gradient-to-l from-blue-100 via-blue-200 to-blue-300
        mb-6 rounded-lg
        ">
          <div
            className="
                         flex flex-col justify-between gap-4 p-4 text-white rounded-lg shadow md:flex-row md:items-center
                    bg-gradient-to-tr from-blue-500 via-blue-300 to-blue-500 
                        "
          >
            <div className="flex-1 md:px-12">
              <h1 className="text-xl font-bold">Registrar asistencia</h1>
              <p className="text-sm">
                Recuerda que dispones de un margen de tolerancia de 5 minutos
                para registrar tu asistencia. Una vez transcurrido este periodo,
                se considerará como tardanza
              </p>
            </div>
            <div className="flex flex-col flex-4 md:px-12">
              <span className="text-center mt-6 mb-2 md:mt-0 md:mb-0">
                <span style={{ textTransform: "capitalize" }}>{fechaActual.diaNombre}</span> {fechaActual.dia} de {fechaActual.mesNombre} {fechaActual.hora}
              </span>
              <button
                onClick={clickShowModalRegister}
                className="bg-white text-blue-600 px-6 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? <ClipLoader color="#374151" size={20} /> : 'Registrar'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                <div
                  className="h-12 w-12 rounded-full border-4 border-blue-500"
                  style={{ borderLeftColor: "transparent" }}
                >
                  <div
                    className="h-full w-full rounded-full bg-blue-500"
                    style={{
                      clipPath: "polygon(0 0, 66% 0, 66% 100%, 0 100%)",
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <p className="text-gray-600">Asistencia</p>
                <p className="text-2xl font-bold">{porcentaje.asistencia_total}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-yellow-100 flex items-center justify-center">
                <div
                  className="h-12 w-12 rounded-full border-4 border-yellow-500"
                  style={{ borderLeftColor: "transparent" }}
                >
                  <div
                    className="h-full w-full rounded-full bg-yellow-500"
                    style={{
                      clipPath: "polygon(0 0, 25% 0, 25% 100%, 0 100%)",
                    }}
                  ></div>
                </div>
              </div>
              <div>
                <p className="text-gray-600">Tardanza</p>
                <p className="text-2xl font-bold">{porcentaje.tarde_total}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                <div
                  className="h-12 w-12 rounded-full border-4 border-red-500"
                  style={{ borderLeftColor: "transparent" }}
                >
                  <div
                    className="h-full w-full rounded-full bg-red-500"
                    style={{ clipPath: "polygon(0 0, 9% 0, 9% 100%, 0 100%)" }}
                  ></div>
                </div>
              </div>
              <div>
                <p className="text-gray-600">Inasistencia</p>
                <p className="text-2xl font-bold">{porcentaje.falta_total}%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <div className="flex items-center gap-4 p-4 border-b border-gray-200">
            <label htmlFor="curso" className="text-sm font-medium text-gray-700">
              Curso:
            </label>
            <select
              name="curso"
              id="curso"
              className="mt-1 block w-52 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {loadingCursos ? (
                <option>Cargando...</option>
              ) : cursos.length > 0 ? (
                cursos.map((curso) => (
                  <option key={curso.id_periodocurso} value={curso.id_periodocurso}>
                    {curso.titulo}
                  </option>
                ))
              ) : (
                <option>No hay cursos</option>
              )}
            </select>
          </div>


          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Código
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Foto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Curso
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hora
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {asistencias.map((item, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.docente_codigo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="h-12 w-12 rounded-full bg-gray-200">
                      <img
                        className="object-cover rounded-full w-full h-full"
                        src={item.docente_foto ? item.docente_foto : foto}
                      ></img>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.docente_nombre}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.fecha_ff}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.hora_ff}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.estado == "A"
                        ? "bg-blue-100 text-blue-800"
                        : (item.estado == "T"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800")
                        }`}
                    >
                      {item.estado_descripcion}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
        <div
          class="flex items-center
                justify-center p-[35px] pb-6
                "
        >
          <div class="flex items-center gap-2">
            <span class="text-gray-600">Anterior</span>
            <button class="px-3 py-1 bg-blue-600 text-white rounded">1</button>
            <button class="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">
              2
            </button>
            <button class="px-3 py-1 text-gray-600 hover:bg-gray-100 rounded">
              3
            </button>
            <span class="text-gray-600">Siguiente</span>
          </div>
        </div>
      </div>
      {isOpenModalRegister ? (
        <ModalRegistrar clickInside={clickInside}></ModalRegistrar>
      ) : (
        ""
      )}

      <ToastContainer />
    </>
  );
};

export default AttendanceSystem;