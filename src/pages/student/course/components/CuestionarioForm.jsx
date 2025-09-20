import { useEffect, useState } from "react";
import { Api_Global_Estudiante } from "../../../../services/EstudianteApi";
import apiClient from "../../../../Utils/apiClient";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

function PreguntaForm({ pregunta, index }) {
  const [isLoading, setIsLoading] = useState(false);
  const [idPeriodorespuesta, setIdPeriodorespuesta] = useState("");

  const handleRespuestaChange = (item) => {
    setIdPeriodorespuesta(item.id_periodorespuesta);
    const data = {
      id_periodopregunta: pregunta.id_periodopregunta,
      id_periodorespuesta: item.id_periodorespuesta,
    };

    setIsLoading(true);
    apiClient.post(Api_Global_Estudiante.miAcademicoEntregaRespuestas.registrar(), data)
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
    setIdPeriodorespuesta(pregunta.id_periodorespuesta);
  },[]);

  return (
    <div key={pregunta.id_periodopregunta} className="mb-4 bg-white border border-gray-200 rounded-lg px-6 py-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg text-gray-900 font-normal">
          <strong className="mr-2">{(index+1)})</strong>
          {pregunta.descripcion}
        </h3>
        <span className="text-lg text-gray-500 font-normal">
          {pregunta.puntos} puntos
        </span>
      </div>

      <div className="space-y-3">
        {pregunta.respuestas.map((item, index) => (
          <label 
            key={item.id_periodorespuesta} 
            className="flex items-center"
          >
            {isLoading ? <ClipLoader color="#1e3a8a" size={20} /> : ""}
            <input
              type="radio"
              id={`respuesta-${item.id_periodorespuesta}`}
              name={`pregunta-${pregunta.id_periodopregunta}`}
              value={item.id_periodorespuesta}
              checked={item.id_periodorespuesta == idPeriodorespuesta}
              onChange={() => handleRespuestaChange(item)}
              className="mr-2 h-4 w-4 text-gray-600 focus:ring-gray-500"
              disabled={isLoading}
            />
            <span className="text-lg text-gray-800">
              {item.descripcion}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export const CuestionarioForm = ({ clickClose, idPeriodocuestionario }) => {
  const [cuestionario, setCuestionario] = useState(null);
  const [preguntas, setPreguntas] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCuestionario = () => {
    apiClient.get(Api_Global_Estudiante.miAcademicoPeriodoCuestionarios.mostrar(idPeriodocuestionario))
      .then((response) => {
        setCuestionario(response.data);
        handlePreguntas();
      })
      .catch((error) => {
        setCuestionario(null);
      });
  };

  const handlePreguntas = () => {
    apiClient.get(Api_Global_Estudiante.miAcademicoPeriodoPreguntas.listar({
      per_page: 15,
      page: 1,
    }, idPeriodocuestionario))
      .then((response) => {
        setPreguntas(response.data.data);
      })
      .catch((error) => {
        setPreguntas([]);
      });
  };

  useEffect(() => {
    handleCuestionario();
  },[]);

  return (
    <div 
    className="fixed inset-0 z-50 backdrop-blur-[3px] bg-black/10 flex items-center justify-center" 
    >
      <div 
      className="flex flex-col w-full h-full" 
      >
        <div className="bg-[#617D9E] border border-gray-200 rounded-lg flex flex-col h-full">
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center h-full">
                <svg 
                className="w-24 h-24 text-green-500 mb-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                >
                  <path strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                  />
                </svg>
                <p className="text-2xl font-medium text-green-600">
                  ¡Respuesta enviada con éxito!
                </p>
              </div>
            ) : (
              <div>
                <div className="max-w-2xl mx-auto w-full mt-6 rounded-lg overflow-hidden shadow-lg mb-4">
                  <div className="h-3 bg-[#00264A]"></div>
                  <div className="p-4 bg-white">
                    <h2 className="text-4xl font-normal text-black mb-2">
                      {cuestionario?.titulo}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {cuestionario?.instruccion}
                    </p>
                    <p className="text-sm text-gray-600">
                      Escoge la respuesta correcta.
                    </p>
                    <div className="border-b border-gray-300 my-2"></div>
                    <p className="text.sm text-gray-600">
                      Fecha:
                      <span className="text-blue-600 ml-1">
                        {cuestionario?.fecha_full}
                      </span>
                    </p>
                  </div>
                </div>

                {preguntas.map((item, index) => (
                  <PreguntaForm pregunta={item} index={index} />
                ))}

                <div className="flex justify-center gap-4 py-4 max-w-2xl mx-auto">
                  <button
                   type="button" 
                   onClick={clickClose} 
                   className="text-blue-900 font-bold rounded-lg border-2 border-blue-900 hover:bg-blue-900 hover:text-white px-6 py-3 text-base"
                  >
                    CERRAR
                  </button>
                  <button 
                    type="button" 
                    onClick={(e) => {
                      setIsSubmitted(true);
                      setTimeout(() => {
                        clickClose();
                      }, 1600);
                    }} 
                    className="bg-blue-900 text-white font-bold rounded-lg border-2 border-blue-900 hover:bg-blue-800 px-6 py-3 text-base"
                  >
                    ENVIAR
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuestionarioForm;