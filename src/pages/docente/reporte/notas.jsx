import React, { useState, useEffect } from "react";
import { Lupa_icon } from "../asignatura/icons_svg.jsx";
import { Api_Global_Docente } from "../../../services/DocenteApi";
import apiClient from "../../../Utils/apiClient";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

function Header({periodo, ciclo}) {
  return (
    <div className="max-w-7xl mx-auto p-4">

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-semibold">⅓</span>
          <h1 className="text-xl font-medium">Reporte de notas</h1>
        </div>
        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700
          p-2 border-blue-400 border rounded-lg
          transition duration-100   
          hover:bg-blue-50
          "
        >
          <svg 
            className="w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
            />
          </svg>
          Descargar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-sm font-medium text-gray-600 mb-1">
            Periodo académico
          </h2>
          <p className="text-gray-900">
            {periodo?.nombre ? periodo?.nombre : "(No seleccionada)"}
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-sm font-medium text-gray-600 mb-1">
            Plan de estudios
          </h2>
          <p className="text-gray-900">
            {ciclo?.planestudio_anho} - {ciclo?.planestudio_nombre}
          </p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-sm font-medium text-gray-600 mb-1">
            Especialidad
          </h2>
          <p className="text-gray-900">
            {ciclo?.carrera_nombre ? ciclo?.carrera_nombre : "(No seleccionada)"}
          </p>
        </div>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">
        Introduzca las calificaciones de los estudiantes en los campos correspondientes. 
        Asegúrese de verificar cada nota antes de guardar los cambios. Una vez ingresadas, 
        las notas serán visibles para los estudiantes. Recuerde que puede editar las 
        calificaciones hasta [fecha límite].
      </p>
    </div>
  );
}

function Notas() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [periodos, setPeriodos] = useState([]);
  const [ciclos, setCiclos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [notas, setNotas] = useState([]);
  const [periodoSelected, setPeriodoSelected] = useState(null);
  const [cicloSelected, setCicloSelected] = useState(null);
  const [formulario, setFormulario] = useState({
    id_periodo: "",
    id_periodociclo: "",
    id_periodocurso: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const foto = "https://plus.unsplash.com/premium_photo-1690407617542-2f210cf20d7e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29uYXxlbnwwfHwwfHx8MA%3D%3D";

  const handleNotaChange = (index, key, value, item) => {
    const notas_ = [...notas];
    notas_[index][key] = value;
    setNotas(notas_);
    handleSaveNota(value, item);
  };

  const handlePeriodos = () => {
    apiClient.get(Api_Global_Docente.academicoPeriodos.listar({
      per_page: 15,
      page: 1,
    }))
      .then((response) => {
        setPeriodos(response.data.data);
      })
      .catch((error) => {
        toast.warning(error.response.data);
        setPeriodos([]);
      });
  };

  const handleCiclos = () => {
    apiClient.get(Api_Global_Docente.academicoPeriodoCiclos.listar({
      per_page: 15,
      page: 1,
    }, formulario.id_periodo))
      .then((response) => {
        setCiclos(response.data.data);
      })
      .catch((error) => {
        toast.warning(error.response.data);
        setCiclos([]);
      });
  };

  const handleCursos = () => {
    apiClient.get(Api_Global_Docente.academicoPeriodoCursos.listar({
      per_page: 15,
      page: 1,
    }, "", formulario.id_periodociclo))
      .then((response) => {
        setCursos(response.data.data);
      })
      .catch((error) => {
        toast.warning(error.response.data);
        setCursos([]);
      });
  };

  const handleNotas = () => {
    if (formulario.id_periodocurso == "") return;

    setIsLoading(true);
    apiClient.get(Api_Global_Docente.evaluacionNotas.listar({
      per_page: 500,
      page: 1,
    }, formulario.id_periodocurso))
      .then((response) => {
        setIsLoading(false);
        setNotas(response.data.data);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
        setNotas([]);
      });
  };

  const handleSaveNota = (value, item) => {
    if (value == "") return;

    const data = {
      id_evaluacioncriterio: item.id_evaluacioncriterio,
      id_estudiante: item.id_estudiante,
      id_periodocurso: item.id_periodocurso,
      nota: value,
    };

    setIsLoading(true);
    apiClient.post(Api_Global_Docente.evaluacionNotas.registrar(), data)
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
    handlePeriodos();
  },[]);

  useEffect(() => {
    if (formulario.id_periodo) {
      const selected = periodos.find(item => item.id_periodo == formulario.id_periodo);
      setPeriodoSelected(selected);
      handleCiclos();
    }
  },[formulario.id_periodo]);

  useEffect(() => {
    if (formulario.id_periodociclo) {
      const selected = ciclos.find(item => item.id_periodociclo == formulario.id_periodociclo);
      setCicloSelected(selected);
      handleCursos();
    }
  },[formulario.id_periodociclo]);

  useEffect(() => {
    if (!isEdit) handleNotas();
  },[isEdit]);

  return (
    <div className="max-w-6xl mx-auto p-2 md:p-6 bg-white rounded-lg shadow">
      <Header periodo={periodoSelected} ciclo={cicloSelected} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Periodo
          </label>
          <select className="w-full border border-gray-300 rounded-md p-2"
            name="id_periodo"
            value={formulario.id_periodo}
            onChange={(e) => setFormulario({
              ...formulario,
              id_periodo: e.target.value,
              id_periodociclo: "",
              id_periodocurso: "",
            })}
          >
            <option value="">--Seleccione--</option>
            {periodos.map((item, index) => (
              <option value={item.id_periodo}>{item.nombre}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ciclo
          </label>
          <select className="w-full border border-gray-300 rounded-md p-2"
            name="id_periodociclo"
            value={formulario.id_periodociclo}
            onChange={(e) => setFormulario({
              ...formulario,
              id_periodociclo: e.target.value,
              id_periodocurso: "",
            })}
          >
            <option value="">--Seleccione--</option>
            {ciclos.map((item, index) => (
              <option value={item.id_periodociclo}>{item.ciclo_nombre}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Curso
          </label>
          <select className="w-full border border-gray-300 rounded-md p-2"
            name="id_periodocurso"
            value={formulario.id_periodocurso}
            onChange={(e) => setFormulario({
              ...formulario,
              id_periodocurso: e.target.value,
            })}
          >
            <option value="">--Seleccione--</option>
            {cursos.map((item, index) => (
              <option value={item.id_periodocurso}>{item.curso_nombre}</option>
            ))}
          </select>
        </div>
        <div className="text-center">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            &nbsp;
          </label>
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            style={{background:"#193D87"}}
            title="Filtrar notas"
            onClick={handleNotas}
            disabled={isLoading}
          >
            <Lupa_icon></Lupa_icon>
            {isLoading ? <ClipLoader color="#ffffff" size={20} /> : <span className="ml-2"> Notas </span>}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto p-2 border border-gray-300 rounded-lg pb-0">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-3 text-left text-sm font-medium text-gray-500">
                CODIGO
              </th>
              <th className="py-3 text-left text-sm font-medium text-gray-500">
                FOTO
              </th>
              <th className="py-3 text-left text-sm font-medium text-gray-500">
                NOMBRE
              </th>
              <th className="py-3 text-left text-sm font-medium text-gray-500">
                CRITERIO
              </th>
              <th className="py-3 text-right text-sm font-medium text-gray-500">
                NOTA
              </th>
            </tr>
          </thead>
          <tbody>
            {notas.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 text-sm text-gray-900">{item.estudiante_codigo}</td>
                <td className="py-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200">
                    <img
                      src={item.estudiante_foto ? item.estudiante_foto : foto}
                      alt="Foto de estudiante"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </td>
                <td className="py-3 text-sm text-gray-900">{item.estudiante_nombre}</td>
                <td className="py-3 text-sm text-gray-900">{item.criterio_titulo}</td>
                <td className="py-3 text-right text-sm text-gray-900">
                  {isEdit ? (
                    <input
                      type="text"
                      value={item.nota}
                      className="p-1 text-[14px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{width: "90px", textAlign: "center"}}
                      onChange={(e) => handleNotaChange(index, "nota", e.target.value, item)}
                      />
                  ) : (
                    <span>{item.nota}</span>
                  )}
                </td> 
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginacion */}
      <div className="flex items-center justify-center mt-6 gap-2">
        <button
          className="p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div className="flex gap-1">
          {[...new Array(3).fill(null)].map((data, page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-lg ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-200"
              }`}

              style={{background:currentPage == page? "#193D87": ""}}
            >
              {page + 1}
            </button>
          ))}
        </div>
        <button
          className="p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setCurrentPage(Math.min(2, currentPage + 1))}
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        {isEdit ? (
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" style={{background:"#193D87"}}
            onClick={(e) => setIsEdit(false)}
            disabled={isLoading}
          >
            {isLoading ? <ClipLoader color="#ffffff" size={20} /> : "Registrando notas"}
          </button>
        ) : (
          <button
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            onClick={(e) => setIsEdit(true)}
            disabled={isLoading}
          >
            {isLoading ? <ClipLoader color="#374151" size={20} /> : "Registrar notas"}
          </button>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default Notas;