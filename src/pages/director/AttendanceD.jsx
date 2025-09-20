import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { Api_Global_Director } from "../../services/DirectorApi";
import apiClient from "../../Utils/apiClient";
import { ClipLoader } from 'react-spinners';

export default function PanelAsistencia() {
  const [isLoading, setLoading] = useState(false);
  const [periodos, setPeriodos] = useState([]);
  const [carreras, setCarreras] = useState([]);
  const [ciclos, setCiclos] = useState([]);
  const [asistencias, setAsistencias] = useState([]);
  const [asistenciaSelected, setAsistenciaSelected] = useState({
    name: "",
    asistencia: 0,
    inasistencia: 0,
  });
  const [formulario, setFormulario] = useState({
    id_periodo: "",
    id_carrera: "",
    id_periodociclo: "",
  });

  const handlePeriodos = () => {
    apiClient.get(Api_Global_Director.academicoPeriodos.listar(""))
      .then((response) => {
        setPeriodos(response.data);
      })
      .catch((error) => {
        setPeriodos([]);
      });
  };

  const handleCarreras = (text_search = "", id_periodo = "") => {
    apiClient.get(Api_Global_Director.academicoCarreras.listar(text_search, id_periodo))
      .then((response) => {
        setCarreras(response.data);
      })
      .catch((error) => {
        setCarreras([]);
      });
  };

  const handleCiclos = (id_periodo = "", id_carrera = "") => {
    apiClient.get(Api_Global_Director.academicoPeriodoCiclos.listar("", id_periodo, id_carrera))
      .then((response) => {
        setCiclos(response.data);
      })
      .catch((error) => {
        setCiclos([]);
      });
  };

  const handleEstadisticas = (id_periodociclo = "") => {
    if (id_periodociclo == "") {
      setAsistencias([]);
      return;
    }

    setLoading(true);
    apiClient.get(Api_Global_Director.asistencias.estadisticas(id_periodociclo))
      .then((response) => {
        setLoading(false);
        const data = response.data.map((item) => ({
          name: item.tipo_persona,
          asistencia: ((item.cant_asistencia * 100) / item.cant_total).toFixed(2),
          inasistencia: ((item.cant_inasistencia * 100) / item.cant_total).toFixed(2),
          total: item.cant_total,
        }));
        setAsistencias(data);
        if (data.length > 0) {
          setAsistenciaSelected(data[0]);
        }
      })
      .catch((error) => {
        setLoading(false);
        setAsistencias([]);
      });
  };

  const handleChangePeriodo = (value) => {
    setFormulario({
      ...formulario,
      id_periodo: value,
      id_carrera: "",
      id_periodociclo: "",
    });
    handleCarreras("", value);
  }

  const handleChangeCarrera = (value) => {
    setFormulario({
      ...formulario,
      id_carrera: value,
      id_periodociclo: "",
    });
    handleCiclos(formulario.id_periodo, value);
  }

  const handleChangeCiclo = (value) => {
    setFormulario({
      ...formulario,
      id_periodociclo: value,
    });
    handleEstadisticas(value);
  }

  useEffect(() => {
    handlePeriodos();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Panel de Asistencia</h2>
      <div className="flex justify-center mb-6">
        <div className="mr-2 ml-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Periodo</label>
          <select
            id="id_periodo"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={formulario.id_periodo}
            onChange={(e) => handleChangePeriodo(e.target.value)}
          >
            <option value="">--Seleccione--</option>
            {periodos.map((item) => (
              <option value={item.id_periodo}>{item.nombre}</option>
            ))}
          </select>
        </div>

        <div className="mr-2 ml-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Carrera</label>
          <select
            id="id_carrera"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={formulario.id_carrera}
            onChange={(e) => handleChangeCarrera(e.target.value)}
          >
            <option value="">--Seleccione--</option>
            {carreras.map((item) => (
              <option value={item.id_carrera}>{item.nombre}</option>
            ))}
          </select>
        </div>

        <div className="mr-2 ml-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Ciclo</label>
          <select
            id="id_periodociclo"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            value={formulario.id_periodociclo}
            onChange={(e) => handleChangeCiclo(e.target.value)}
          >
            <option value="">--Seleccione--</option>
            {ciclos.map((item) => (
              <option value={item.id_periodociclo}>{item.ciclo_nombre}</option>
            ))}
          </select>
        </div>

        <div className="mr-2 ml-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">&nbsp;</label>
          <button
            type="button"
            className={`w-full bg-emerald-600 text-white py-2 px-3 rounded`}
            onClick={(e) => handleEstadisticas(formulario.id_periodociclo)}
          >
            {isLoading ? <ClipLoader color="#ffffff" size={20} /> : 'Buscar'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {asistencias.map((item) =>
          <Card onClick={() => setAsistenciaSelected(item)} style={{cursor: "pointer", background: (item.name == asistenciaSelected?.name) ? "#ddcea9" : ""}}>
            <CardContent>
              <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600">Total: {item.total}</p>
              <p className="text-green-600 font-semibold">Asistencia: {item.asistencia}%</p>
              <p className="text-red-600 font-semibold">Inasistencia: {item.inasistencia}%</p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-center mb-4">Estadísticas Generales</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={[asistenciaSelected]} barCategoryGap={30}>
            <XAxis dataKey="name" tick={{ fill: "#374151" }} />
            <YAxis tick={{ fill: "#374151" }} />
            <Tooltip cursor={{ fill: "#F3F4F6" }} />
            <Legend />
            <Bar dataKey="asistencia" fill="#4F46E5" radius={[6, 6, 0, 0]} />
            <Bar dataKey="inasistencia" fill="#EF4444" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
