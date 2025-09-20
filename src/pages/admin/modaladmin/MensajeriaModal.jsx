import { useState, useEffect } from "react";
import { Api_Global_Admin } from "../../../services/AdminApi";
import apiClient from "../../../Utils/apiClient";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import { PlusIcon, CheckCircle, User } from "lucide-react";

function MensajeriaModal({ onClose, curso }) {
  const [isLoading, setIsLoading] = useState(false);
  const [grupo, setGrupo] = useState(null);
  const [personas, setPersonas] = useState([]);

  const handleGrupo = () => {
    setIsLoading(true);
    apiClient.get(Api_Global_Admin.mensajerias.listarGrupos({
      per_page: 15,
      page: 1,
    }, curso.id_periodocurso))
      .then((response) => {
        setIsLoading(false);
        if (response.data.data.length > 0) {
          setGrupo(response.data.data[0]);
          handlePersonas(response.data.data[0].id_mensajeriagrupo);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handlePersonas = (id_mensajeriagrupo) => {
    setIsLoading(true);
    apiClient.get(Api_Global_Admin.mensajerias.listarPersonas({
      per_page: 15,
      page: 1,
    }, id_mensajeriagrupo))
      .then((response) => {
        setIsLoading(false);
        setPersonas(response.data.data);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
        setPersonas([]);
      });
  };

  const handleSaveGrupo = () => {
    const data = {
      id_periodocurso: curso.id_periodocurso,
      nombre: "Grupo de " + curso.curso_nombre,
      tipo: "1",
    };
    setIsLoading(true);
    apiClient.post(Api_Global_Admin.mensajerias.registrarGrupos(), data)
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        setGrupo(response.data);
        handlePersonas(response.data.id_mensajeriagrupo);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleSavePersonas = () => {
    const data = {
      id_mensajeriagrupo: grupo.id_mensajeriagrupo,
    };
    setIsLoading(true);
    apiClient.post(Api_Global_Admin.mensajerias.registrarEstudianteTodos(), data)
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        handlePersonas(grupo.id_mensajeriagrupo);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleSaveDocente = () => {
    const data = {
      id_mensajeriagrupo: grupo.id_mensajeriagrupo,
    };
    setIsLoading(true);
    apiClient.post(Api_Global_Admin.mensajerias.registrarDocentes(), data)
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        handlePersonas(grupo.id_mensajeriagrupo);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };
  
  useEffect(() => {
    handleGrupo();
  },[]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[3px]"
        aria-hidden="true"
      />

      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="red"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-medium text-blue-900">Mensajeria de {curso?.curso_nombre}</h2>
          </div>
          <button className="text-blue-900 font-medium px-4 py-2 rounded-lg hover:bg-blue-50"
            onClick={() => onClose()}
          >
            Cerrar
          </button>
        </div>

        <div className="p-4">

          <div className="">
            <button className="text-white bg-[#5CB85C] mr-2"
              title="Registrar grupo de mensajeria"
              disabled={isLoading}
              onClick={() => handleSaveGrupo()}
            >
              <span className="flex items-center justify-center p-2">
                <PlusIcon />
                {isLoading ? <ClipLoader color="#1e3a8a" size={20} /> : "Grupo"}
              </span>
            </button>

            {grupo &&
              <button className="text-white bg-[#1e40af] mr-2"
                title="Registrar estudiantes al grupo"
                disabled={isLoading}
                onClick={() => handleSavePersonas()}
              >
                <span className="flex items-center justify-center p-2">
                  <PlusIcon />
                  {isLoading ? <ClipLoader color="#ffffff" size={20} /> : "Estudiantes"}
                </span>
              </button>
            }

            {grupo &&
              <button className="text-white bg-[#996666] mr-2"
                title="Registrar docente al grupo"
                disabled={isLoading}
                onClick={() => handleSaveDocente()}
              >
                <span className="flex items-center justify-center p-2">
                  <PlusIcon />
                  {isLoading ? <ClipLoader color="#ffffff" size={20} /> : "Docente"}
                </span>
              </button>
            }
          </div>

          {grupo &&
            <div className="mt-4">
              <hr />
              <h2 className="text-lg font-medium text-blue-900">Grupo: {grupo?.nombre}</h2>
              <hr />
            </div>
          }

          <div className="mt-4 space-y-3" style={{maxHeight: "calc(90vh - 150px)", overflowY: "scroll", overflowX: "hidden"}}>
            {personas.map((item) => (
              <div
                key={item.id_mensajeriapersona}
                className="bg-gray-50 rounded-lg p-3 flex items-center"
              >
                <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                  <span className="text-xs font-medium text-red-700">
                    <User />
                  </span>
                </div>

                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {item.persona_nombre}
                  </p>
                  <p className="text-xs text-gray-500">Registrado</p>
                </div>

                <button className="ml-4" style={{color: "#1e40af"}}
                  disabled={isLoading}
                >
                  <CheckCircle />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MensajeriaModal;