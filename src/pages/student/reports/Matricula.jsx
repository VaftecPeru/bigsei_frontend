import React from "react";
import EnrollmentTable2 from "@/components/tables/EnrollmentTable2";
import DownloadButton from "@/components/ui/DownloadButton";
import { Api_Global_Estudiante } from "../../../services/EstudianteApi";
import apiClient from "../../../Utils/apiClient";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import { useState, useEffect } from "react";

function Matricula() {
  const [isLoading, setLoading] = useState(false);
  const [periodos, setPeriodos] = useState([]);
  const [matriculas, setMatriculas] = useState([]);
  const [reporte, setReporte] = useState([]);
  const [formulario, setFormulario] = useState({
    id_periodo: "",
    id_matricula: "",
  });
  const headers = [
    "Especialidad",
    "Ciclo",
    "Asignatura",
    "Crédito",
    "Docente",
  ];

  const handlePeriodos = () => {
    apiClient.get(Api_Global_Estudiante.miAcademicoPeriodos.listar({
      per_page: 15,
      page: 1,
    }, ""))
      .then((response) => {
        setPeriodos(response.data.data);
      })
      .catch((error) => {
        setPeriodos([]);
        toast.warning(error.response.data);
      });
  };

  const handleMatriculas = () => {
    apiClient.get(Api_Global_Estudiante.miMatriculas.listar({
      per_page: 15,
      page: 1,
    }, formulario.id_periodo))
      .then((response) => {
        setMatriculas(response.data.data);
      })
      .catch((error) => {
        setMatriculas([]);
        toast.warning(error.response.data);
      });
  };

  const handleReporte = () => {
    setLoading(true);
    apiClient.get(Api_Global_Estudiante.reportes.matriculas(formulario.id_matricula))
      .then((response) => {
        setLoading(false);
        setReporte(response.data);
      })
      .catch((error) => {
        setLoading(false);
        setReporte([]);
        toast.warning(error.response.data);
      });
  };

  useEffect(() => {
    if (formulario.id_periodo) {
      handleMatriculas();
    }
  }, [formulario.id_periodo]);

  useEffect(() => {
    if (formulario.id_matricula) {
      handleReporte();
    } else {
      setReporte([]);
    }
  }, [formulario.id_matricula]);

  useEffect(() => {
    handlePeriodos();
  }, []);

  return (
    <div className="flex flex-col justify-start items-center min-h-screen text-lg w-full bg-sky-50 p-6">
      <div className="w-full max-w-7xl p-4">
        <div className="flex justify-end items-center text-sm text-gray-500">
          <span>
            <a href="#" className="hover:underline">
              Iaion &gt; Menú &gt; Cursos
            </a>
          </span>
        </div>
      </div>
            
      <div className="max-w-7xl w-full shadow-md rounded-lg bg-white">
        <div className="flex items-center justify-between border-b p-4">
          <div className='flex gap-x-2'>
            <img src="/img/icons/calendar-2.svg" alt="" />
            <h2 className="text-base font-semibold">
              Reporte de matricula
            </h2>
          </div>
        </div>

        <div className="flex justify-between mx-4">
          <div className="flex justify-start">
            <div className="px-1 w-[250px]">
              <label className="text-sm">Período académico:</label>
              <select
                id="id_periodo"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Período académico"
                value={formulario.id_periodo}
                onChange={(e) => setFormulario({ ...formulario, id_periodo: e.target.value, id_matricula: "" })}
              >
                <option value="">--Seleccione--</option>
                {periodos.map((item) => (
                  <option value={item.id_periodo} key={item.id_periodo}>{item.nombre}</option>
                ))}
              </select>
            </div>
            <div className="px-1 w-[250px]">
              <label className="text-sm">Matrícula:</label>
              <select
                id="id_matricula"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Período académico"
                value={formulario.id_matricula}
                onChange={(e) => setFormulario({ ...formulario, id_matricula: e.target.value })}
              >
                <option value="">--Seleccione--</option>
                {matriculas.map((item) => (
                  <option value={item.id_matricula} key={item.id_matricula}>{item.fecha_ff}</option>
                ))}
              </select>
            </div>
            <div className="flex" style={{alignItems: "end"}}>
              {isLoading ? <ClipLoader color="#374151" size={34} /> : ""}
            </div>
          </div>

          <div className="flex" style={{alignItems: "end"}}>
            <DownloadButton></DownloadButton>
          </div>
        </div>

        <div className="max-w-7xl w-full shadow-md rounded-lg bg-white mt-8">
          <EnrollmentTable2 headers={headers} grades={reporte} />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Matricula;