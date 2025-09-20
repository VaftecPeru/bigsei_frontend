import { useState, useEffect } from "react";
import CuestionarioForm from "./CuestionarioForm";
import { Api_Global_Estudiante } from "../../../../services/EstudianteApi";
import apiClient from "../../../../Utils/apiClient";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

function ModalCuestionario({ clickClose, tema }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [cuestionario, setCuestionario] = useState(null);

  const calcularPuntos = (item) => {
    return (Number(item.preguntas_correcto) * 100) / Number(item.preguntas_total);
  }

  const handleCuestionario = () => {
    setIsLoading(true);
    apiClient.get(Api_Global_Estudiante.miAcademicoPeriodoCuestionarios.listar({
      per_page: 15,
      page: 1,
    }, tema.id_periodotema))
      .then((response) => {
        setIsLoading(false);
        if (response.data.data.length > 0) {
          setCuestionario({
            id_periodocuestionario: response.data.data[0].id_periodocuestionario,
            titulo: response.data.data[0].titulo,
            fecha_full: response.data.data[0].fecha_full,
            puntos: calcularPuntos(response.data.data[0]),
          });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  useEffect(() => {
    handleCuestionario();
  },[]);

  return (
    <>
      <div
        className="fixed inset-0 h-full z-50 w-full backdrop-blur-[3px] bg-black/10 grid place-items-center"
      >
        <div
          className="rounded-md bg-white border border-gray-200 flex flex-col max-w-md h-[50%] xs:w-full md:w-[90%] overflow-hidden"
        >
          <div className="flex relative items-center justify-between w-full p-6">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="red"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-file-text"
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <path d="M10 9h4" />
                <path d="M10 13h4" />
                <path d="M10 17h4" />
              </svg>
              <div>
                <h2 className="text-lg font-bold text-blue-900 ml-2">CUESTIONARIO</h2>
                <p className="text-xs text-black text-center">SEMANA {tema.fecha}</p>
              </div>
            </div>

            <button
              onClick={clickClose}
              className="text-blue-900 hover:text-blue-800"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span className="sr-only">Cerrar</span>
            </button>
          </div>
          <hr />

          <div className="flex-1 px-6 py-4">
            <div className="flex gap-2 items-center">
              <span className="block w-24 text-end font-medium">Nombre:</span>
              <p className="flex-1 text-black">{cuestionario?.titulo}</p>
            </div>
            <div className="flex gap-2 items-center mt-4">
              <span className="block w-24 text-end font-medium">Fecha:</span>
              <p className="flex-1 text-black">{cuestionario?.fecha_full}</p>
            </div>
            <div className="flex gap-2 items-center mt-4">
              <span className="block w-24 text-end font-medium">Puntos:</span>
              <p className="flex-1 text-black">{cuestionario?.puntos}</p>
            </div>
          </div>

          <div className="flex justify-end gap-4 p-6 border-t border-gray-200">
            <button
              onClick={clickClose}
              className="text-blue-900 font-bold rounded-xl border-2 border-blue-900 hover:bg-blue-900 hover:text-white px-6 py-2 text-sm"
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader color="#1e3a8a" size={20} /> : "CERRAR"}
            </button>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-900 text-white font-bold rounded-xl border-2 border-blue-900 hover:bg-blue-800 px-6 py-2 text-sm"
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader color="#ffffff" size={20} /> : "IR AL CUESTIONARIO"}
            </button>
          </div>
        </div>
      </div>

      {showForm && <CuestionarioForm clickClose={() => setShowForm(false)} idPeriodocuestionario={cuestionario?.id_periodocuestionario} />}
    </>
  );
}

export default ModalCuestionario;