import ChartBibliotecario from "@/components/dashboard/ChartBibliotecario";
import StatCard from "@/components/dashboard/StatCard";
import { Link } from "react-router-dom";
import ChartBibliotecarioReserva from "@/components/pacientes/dashboard/ChartBibliotecarioReserva";
import {
  GraduationCap,
  RotateCcw,
  UserRound,
} from "lucide-react";
import ChartUsers from "./pieChartUsers";
import React, { useState, useEffect } from 'react';
import { ArrowUpDown } from 'lucide-react';
import DownloadButton from "@/components/ui/DownloadButton";
import { Api_Global_Dashboard } from "../../services/DashboardApi";
import apiClient from "../../Utils/apiClient";

export default function Bibliotecario() {
  const [libros, setLibros] = useState([]);
  const [resEstudiante, setResEstudiante] = useState({ cantidad: 0 });
  const [resDocente, setResDocente] = useState({ cantidad: 0 });
  const [devolAtrasado, setDevolAtrasado] = useState({ cantidad: 0 });
  const [reservas, setReservas] = useState([]);

  const getDevolAtrasado = async (text_search) => {
    try {
      const response = await apiClient.get(Api_Global_Dashboard.bibliotecario.devolucionAtrasada(text_search));
      setDevolAtrasado({
        cantidad: response.data.data.total_atrasadas,
        porcentaje: response.data.data.porcentaje_atrasadas,
      });
    } catch (error) {
      console.error("Error al obtener sede:", error);
    } finally {
    }
  };

  const getResEstudiante = async (text_search) => {
    try {
      const response = await apiClient.get(Api_Global_Dashboard.bibliotecario.reservaEstudiante(text_search));
      setResEstudiante({
        cantidad: response.data.data.cantidad_reservas,
      });
    } catch (error) {
      console.error("Error al obtener sede:", error);
    } finally {
    }
  };

  const getResDocente = async (text_search) => {
    try {
      const response = await apiClient.get(Api_Global_Dashboard.bibliotecario.reservaDocente(text_search));
      setResDocente({
        cantidad: response.data.data.cantidad_reservas,
      });
    } catch (error) {
      console.error("Error al obtener profesores:", error);
    } finally {
    }
  };

  useEffect(() => {
    const fetchLibrosRecientes = async (text_search) => {
      try {
        const response = await apiClient.get(Api_Global_Dashboard.bibliotecario.listarLibro(text_search));

        if (response.data.success) {
          const sortedLibros = response.data.data
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 3);

          setLibros(sortedLibros);
        }
      } catch (err) {
        console.error(err);
      }
    };

    const fetchUltimasReservas = async (text_search) => {
      try {
        const response = await apiClient.get(Api_Global_Dashboard.bibliotecario.ultReserva(text_search));

        if (response.data.success) {
          setReservas(response.data.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchUltimasReservas("");
    fetchLibrosRecientes("");
    getResEstudiante("");
    getResDocente("");
    getDevolAtrasado("");
  }, []);

  const [sortConfig, setSortConfig] = useState({
    key: 'fecha',
    direction: 'desc',
  });

  const sortData = (data, key, direction) => {
    return [...data].sort((a, b) => {
      if (key === 'fecha') {
        const dateA = new Date(a[key]);
        const dateB = new Date(b[key]);
        return direction === 'asc' ? dateA - dateB : dateB - dateA;
      }

      let valueA, valueB;
      if (key === 'nombre') {
        valueA = a.usuario?.nombres?.toLowerCase() || '';
        valueB = b.usuario?.nombres?.toLowerCase() || '';
      } else if (key === 'tipo') {
        valueA = a.tipo_usuario.toLowerCase() || '';
        valueB = b.tipo_usuario.toLowerCase() || '';
      } else if (key === 'material') {
        valueA = a.libro?.titulo?.toLowerCase() || '';
        valueB = b.libro?.titulo?.toLowerCase() || '';
      } else {
        valueA = a[key]?.toString().toLowerCase() || '';
        valueB = b[key]?.toString().toLowerCase() || '';
      }

      if (valueA < valueB) return direction === 'asc' ? -1 : 1;
      if (valueA > valueB) return direction === 'asc' ? 1 : -1;
      return 0;
    });
  };

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    const newSortConfig = { key, direction };
    setSortConfig(newSortConfig);
    setReservas(sortData(reservas, key, direction));
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  const totalReserva = resEstudiante.cantidad + resDocente.cantidad;

  const porcResEstudiante = totalReserva > 0
    ? ((resEstudiante.cantidad / totalReserva) * 100).toFixed(2)
    : 0;

  const porcResDocente = totalReserva > 0
    ? ((resDocente.cantidad / totalReserva) * 100).toFixed(2)
    : 0;

  return (
    <div className="flex flex-col justify-start items-center min-h-screen text-2xl w-full bg-sky-50">
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 p-8 rounded-2xl">
        <StatCard
          title="Reserva Estudiantes"
          value={resEstudiante.cantidad}
          icon={<GraduationCap />}
          percentage={porcResEstudiante}
          description="Del total de reservas"
        />
        <StatCard
          title="Reserva Docentes"
          value={resDocente.cantidad}
          icon={<UserRound />}
          percentage={porcResDocente}
          description="Del total de reservas"
        />
        <StatCard
          title="Devolucion Atrasados"
          value={devolAtrasado.cantidad}
          icon={<RotateCcw />}
          percentage={devolAtrasado.porcentaje}
          iconBgColor="bg-red-100 color-red-200"
          iconColor="text-red-600"
          percentageBgColor="bg-red-100"
          percentageTextColor="text-red-600"
          description="Del total de devoluciones"
        />
      </div>

      {/* Seccion de pendientes */}

      <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-4 p-8 rounded-2xl">
        <ChartBibliotecario />
      </div>
      <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-4 p-8 rounded-2xl">
        <ChartBibliotecarioReserva />
      </div>



      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full w-[1200px]">
        {/* Columna izquierda - Contenido principal (8/12) */}
        <div className="lg:col-span-8 flex flex-col gap-6 h-full">
          {/* Tarjeta de gráfico de usuarios */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-80">
            <div className="flex items-center justify-between p-6 pb-2">
              <h2 className="text-lg font-semibold text-gray-800">Distribución de Usuarios</h2>
              <Link
                to="/bibliotecario/usuarios"
                className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                <span className="text-sm font-medium">Ver todos</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            </div>
            <div className="flex-1 p-4">
              <ChartUsers />
            </div>
          </div>

          {/* Tarjeta de tabla de reservas */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex-1">
            <div className="p-6 pb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Últimas Reservas</h2>
                <div className="flex gap-3">
                  <DownloadButton
                    label="Exportar"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 text-sm rounded-md"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto px-6 pb-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    {[
                      { key: 'id', label: 'N°' },
                      { key: 'nombre', label: 'Nombre' },
                      { key: 'tipo', label: 'Tipo' },
                      { key: 'material', label: 'Material' },
                      { key: 'fecha', label: 'Fecha' },
                    ].map((header) => (
                      <th
                        key={header.key}
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => requestSort(header.key)}
                      >
                        <div className="flex items-center gap-1">
                          {header.label}
                          {getSortIcon(header.key)}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reservas.map((reserva) => (
                    <tr key={reserva.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{reserva.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {reserva.usuario_nombres || 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${reserva.nombre === 'student' ? 'bg-blue-100 text-blue-800' :
                              reserva.nombre === 'docente' ? 'bg-green-100 text-green-800' :
                                'bg-gray-100 text-gray-800'}`}
                        >
                          {reserva.nombre || 'Desconocido'}
                        </span>

                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reserva.libro_titulo || 'Sin título'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(reserva.fecha).toLocaleDateString('es-ES', {
                          day: '2-digit',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        </div>

        {/* Columna derecha - Sidebar (4/12) */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-800">Materiales</h2>
            </div>

            <div className="px-6 pt-4">
              <Link to="/bibliotecario/registrar-material">
                <button className="flex items-center gap-2 text-sm bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                  Agregar material
                </button>
              </Link>
            </div>

            <div className="px-6 pt-6">
              <p className="text-base font-light text-gray-600">Agregados recientemente</p>
            </div>

            <div className="p-6 flex-grow overflow-y-auto">
              <div className="space-y-6">
                {libros.map((libro) => (
                  <div key={libro.id} className="flex gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <img
                      className="h-24 w-16 object-cover rounded"
                      src={libro.file_portada && libro.file_portada.trim() !== ""
                        ? libro.file_portada
                        : "https://imgs.search.brave.com/QGBkOtAqw1y-CQiEQ31Lat-GoiwWjIMSIuHoHWSBJdE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTEtNkNhVUxpQkwu/anBn"}
                      alt={`Portada de ${libro.titulo}`}
                    />
                    <div className="flex-1">
                      <h3 className="text-base font-medium text-gray-800 mb-1">{libro.titulo}</h3>
                      <p className="text-sm font-light text-gray-500">{libro.autor}</p>
                      <p className="text-sm font-light text-gray-500">
                        {libro.categoria?.nombre || 'Sin categoría'} • {libro.genero?.nombre || 'Sin género'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 border-t border-gray-100 text-center">
              <Link to="/bibliotecario/listar-materiales">
                <button className="bg-gray-300 hover:bg-gray-200 text-base rounded-lg px-6 py-2 text-gray-700 font-medium transition-colors">
                  Ver todos
                </button>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
