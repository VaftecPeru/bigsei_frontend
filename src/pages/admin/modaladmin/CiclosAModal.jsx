import { useState, useEffect } from "react";
import { CircleCheck, CircleX } from "lucide-react";
import { Api_Global_Admin } from "../../../services/AdminApi";
import apiClient from "../../../Utils/apiClient";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

export default function CiclosAModal({ onClose, idPlanestudio }) {
  const [isLoading, setIsLoading] = useState(false);
  const [plan, setPlan] = useState(null);
  const [ciclos, setCiclos] = useState([]);

  const closeRegisterModal = () => {
    onClose();
  };

  const handlePlan = () => {
    apiClient.get(Api_Global_Admin.planEstudios.mostrar(idPlanestudio))
      .then((response) => {
        setPlan(response.data);
      })
      .catch((error) => {
        toast.warning(error.response.data);
      });
  };


  const handleCiclos = () => {
    setIsLoading(true);
    apiClient.get(Api_Global_Admin.planEstudioCiclos.listarCheck({
      per_page: 25,
      page: 1,
    }, idPlanestudio, ""))
      .then((response) => {
        setIsLoading(false);
        setCiclos(response.data.data);
      })
      .catch((error) => {
        setIsLoading(false);
        setCiclos([]);
        toast.warning(error.response.data);
      });
  };

  const handleHabilitar = (item) => {
    const data = {
      id_planestudio: idPlanestudio,
      id_ciclo: item.id_ciclo,
    };

    setIsLoading(true);
    apiClient.post(Api_Global_Admin.planEstudioCiclos.registrar(), data)
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        handleCiclos();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleDeshabilitar = (item) => {
    setIsLoading(true);
    apiClient.delete(Api_Global_Admin.planEstudioCiclos.eliminar(item.id_planestudiociclo))
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        handleCiclos();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  useEffect(() => {
    if (idPlanestudio) {
      handleCiclos();
      handlePlan();
    }
  }, []);

  return (
    <div
      className="bg-gray-200 flex justify-center items-start fixed inset-0 z-50 h-full w-full p-0 md:p-6"
      style={{ background: "#4d4d4d21", backdropFilter: "blur(10px)" }}
    >
      <div className="w-full h-full max-w-md bg-white rounded-lg shadow-lg relative overflow-auto">
        <button
          type="button"
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          onClick={() => closeRegisterModal()}
          aria-label="Cerrar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Seleccion de ciclos</h1>
          <hr class="mb-4" />

          <div>
            <span style={{fontWeight: "bold"}}>Plan: </span>
            {plan?.nombre}
          </div>

          <div className="mt-4 space-y-3">
            {ciclos.map((item, index) => (
              <div
                className="bg-gray-50 rounded-lg p-3 flex items-center"
              >
                <div className={`w-8 h-8 rounded flex items-center justify-center ${(item.ciclo_esta_habilitado == "1") ? "bg-green-100" : "bg-red-100"}`}>
                  <span className={`text-xs font-medium ${(item.ciclo_esta_habilitado == "1") ? "text-green-700" : "text-red-700"}`} style={{textTransform: 'uppercase'}}>{(index+1)}</span>
                </div>

                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {item.nombre}
                  </p>
                  {item.ciclo_esta_habilitado == "1" ? (
                    <p className="text-xs text-gray-500">Habilitado</p>
                  ) : (
                    <p className="text-xs text-gray-500">Deshabilitado</p>
                  )}
                </div>

                {item.ciclo_esta_habilitado == "1" ? (
                  <button type="button" className="pl-2 pr-2 text-green-400 hover:text-green-600"
                    title="Deshabilitar"
                    disabled={isLoading}
                    onClick={() => handleDeshabilitar(item)}
                  >
                    {isLoading ? <ClipLoader color="#33cc99" size={20} /> : <CircleCheck />}
                  </button>
                ) : (
                  <button type="button" className="pl-2 pr-2 text-red-400 hover:text-red-600"
                    title="Habilitar"
                    disabled={isLoading}
                    onClick={() => handleHabilitar(item)}
                  >
                    {isLoading ? <ClipLoader color="#F87117" size={20} /> : <CircleX />}
                  </button>
                )}
              </div>
            ))}
          </div>
          <hr className="mt-6" />
        </div>
      </div>
    </div>
  );
}