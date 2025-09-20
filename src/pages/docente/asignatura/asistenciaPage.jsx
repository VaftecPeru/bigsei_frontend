import React, { useState, useEffect, useContext } from "react";
import { Api_Global_Docente } from "../../../services/DocenteApi";
import apiClient from "../../../Utils/apiClient";
import { AsignaturaContext } from "./page.jsx";
import TableFoot5 from "../../../components/tables/TableFoot5";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

const AttendanceTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { idPeriodocurso } = useContext(AsignaturaContext);
  const [curso, setCurso] = useState(null);
  const [asistencias, setAsistencias] = useState([]);
  const [fecha, setFecha] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [perPage, setPerPage] = useState(15);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const foto = "https://www.esri.com/content/dam/esrisites/en-us/arcgis/user-types/assets/user-types-professional-plus-card.jpg";

  const handleToggleEdit = () => {
    setIsEdit(!isEdit);
  };

  const handleEstadoChange = (index, key, value, item) => {
    const asistencias_ = [...asistencias];
    asistencias_[index][key] = value;
    setAsistencias(asistencias_);
    handleSave(value, item);
  };

  const handleCurso = (data) => {
    setIsLoading(true);
    apiClient.get(Api_Global_Docente.academicoPeriodoCursos.mostrar(idPeriodocurso))
      .then((response) => {
        setIsLoading(false);
        setCurso(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        setCurso(null);
        toast.warning(error.response.data);
      });
  };

  const handleBuscar = (_page) => {
    if (fecha) {
      setPage(_page);
      setIsLoading(true);
      apiClient.get(Api_Global_Docente.asistencias.listarEstudiantes({
        per_page: perPage,
        page: _page,
      }, idPeriodocurso, fecha))
        .then((response) => {
          setIsLoading(false);
          setTotal(response.data.total);
          setAsistencias(response.data.data);
        })
        .catch((error) => {
          setIsLoading(false);
          setAsistencias([]);
          toast.warning(error.response.data);
        });
    } else {
      setAsistencias([]);
    }
  };

  const handleSaveTodos = () => {
    if (fecha == "") {
      return;
    }
    const data = {
      id_periodocurso: idPeriodocurso,
      fecha: fecha,
      tipo: "E",
      estado: "A",
    };
    setIsLoading(true);
    apiClient.post(Api_Global_Docente.asistencias.registrarEstudiantesTodos(), data)
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        handleBuscar(page);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleSave = (estado, item) => {
    const data = {
      id_asistencia: item.id_asistencia ? item.id_asistencia : "",
      id_periodocurso: idPeriodocurso,
      id_persona: item.id_persona,
      fecha: fecha,
      tipo: "E",
      estado: estado,
    };
    setIsLoading(true);
    apiClient.post(Api_Global_Docente.asistencias.registrarEstudiantes(), data)
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  useEffect(() => {
    handleCurso();
  },[]);

  useEffect(() => {
    handleBuscar(1);
  },[fecha]);

  useEffect(() => {
    if (!isEdit) {
      handleBuscar(page);
    }
  },[isEdit]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 pt-8">
      <div className="flex flex-col justify-evenly gap-4 md:flex-row ">
        <div className="rounded-md bg-blue-100
          text-black px-8 py-4 flex-1
          "
        >
          <p className="font-bold text-xl">Periodo academico</p>
          <p>{curso?.periodo_nombre}</p>
        </div>
        <div className="rounded-md bg-blue-100
          text-black px-8 py-4 flex-1
          "
        >
          <p className="font-bold text-xl">Plan de estudios</p>
          <p>{curso?.planestudio_anho_ff} - {curso?.planestudio_nombre} </p>
        </div>
        <div className="rounded-md bg-blue-100
          text-black px-8 py-4 flex-1
          "
        >
          <p className="font-bold text-xl">Especialidad</p>
          <p>{curso?.carrera_nombre}</p>
        </div>
      </div>
      <div className="my-8">
        Por favor, revise la lista de alumnos y marque la asistencia correspondiente.
        Asegúrese de registrar correctamente las asistencias, tardanzas e inasistencias.
        Recuerde que tiene hasta [Hora] para completar el registro de asistencia del día.
      </div>
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="flex flex-row   justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-sm text-gray-500">
                Fecha:
                <input
                  type="date"
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">CÓDIGO</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">FOTO</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">NOMBRE</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">FECHA</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">HORA</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">ESTADO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {asistencias.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm">{item.estudiante_codigo}</td>
                  <td className="px-4 py-3">
                    <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                      <img className="h-full w-full object-cover" src={item.estudiante_foto ? item.estudiante_foto : foto}></img>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{item.estudiante_nombre}</td>
                  <td className="px-4 py-3 text-sm">{item.asistencia_fecha_ff}</td>
                  <td className="px-4 py-3 text-sm">{item.asistencia_hora_ff}</td>
                  <td className="px-4 py-3">
                    {!isEdit ? (
                    <span
                      className={`inline-flex px-2 py-1 text-xs rounded-full ${item.estado === 'A'
                      ? 'bg-blue-100 text-blue-800'
                      : item.estado == "T" ? "bg-yellow-200 text-yellow-800" :
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      {item.estado_descripcion}
                    </span>
                    ) : (
                      <select
                        name="estado"
                        value={item.estado || ""}
                        onChange={(e) => handleEstadoChange(index, "estado", e.target.value, item)}
                        className="ml-4 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={isLoading}
                      >
                        <option value="">Marcar</option>
                        <option value="A">Asistió</option>
                        <option value="T">Tarde</option>
                        <option value="F">Falta</option>
                      </select>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <hr />
        <TableFoot5 perPage={perPage} page={page} total={total} changePage={(data) => handleBuscar(data)} />

      </div>
      <div className="flex gap-4 md:p-4 justify-center mt-20">
        <button
          type="button"
          className={`px-4 py-2 border rounded ${isEdit ? "bg-blue-900 text-white" : "hover:bg-gray-50"}`}
          onClick={handleToggleEdit}
          disabled={isLoading}
        >
          {isLoading ? <ClipLoader color="#1e3a8a" size={20} /> : (isEdit ? "Modificando" : "Modificar")}
        </button>
        <button
          type="button"
          className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900"
          onClick={handleSaveTodos}
          disabled={isLoading}
        >
          {isLoading ? <ClipLoader color="#1e3a8a" size={20} /> : "Registrar Asistencia"}
        </button>
      </div>
    </div>
  );
};

export default AttendanceTable;