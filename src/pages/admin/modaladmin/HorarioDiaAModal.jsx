import { CalendarDays } from "lucide-react";
import { useState, useEffect } from "react";
import { Api_Global_Admin } from "../../../services/AdminApi";
import { Api_Global_Setup } from "../../../services/SetupApi";
import apiClient from "../../../Utils/apiClient";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import { useForm } from "react-hook-form";

export default function HorarioDiaAModal({ onClose, idPeriodocurso, idPeriodohorarioEdit }) {
  const [isLoading, setIsLoading] = useState(false);
  const [dias, setDias] = useState([]);
  const [aulas, setAulas] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      id_dia: "",
      id_aula: "",
      hora_inicio: "",
      hora_fin: "",
    },
  });

  const closePriceModal = () => {
    onClose();
  };

  const onSubmit = (data) => {
    if (idPeriodohorarioEdit) {
      handleEditar(data);
    } else {
      handleRegistrar(data);
    }
  };

  const handleRegistrar = (data) => {
    setIsLoading(true);
    apiClient.post(Api_Global_Admin.academicoPeriodoHorarios.registrar(), {...data, id_periodocurso: idPeriodocurso})
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        closePriceModal();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleEliminar = () => {
    setIsLoading(true);
    apiClient.delete(Api_Global_Admin.academicoPeriodoHorarios.eliminar(idPeriodohorarioEdit))
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        closePriceModal();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleEditar = (data) => {
    setIsLoading(true);
    apiClient.put(Api_Global_Admin.academicoPeriodoHorarios.editar(idPeriodohorarioEdit), {...data, id_periodocurso: idPeriodocurso})
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        closePriceModal();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleHorario = () => {
    setIsLoading(true);
    apiClient.get(Api_Global_Admin.academicoPeriodoHorarios.mostrar(idPeriodohorarioEdit))
      .then((response) => {
        setIsLoading(false);
        setValue("id_dia", response.data.id_dia);
        setValue("id_aula", response.data.id_aula);
        setValue("hora_inicio", response.data.hora_inicio);
        setValue("hora_fin", response.data.hora_fin);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleAulas = () => {
    apiClient.get(Api_Global_Setup.aulas.activos({
      per_page: 15,
      page: 1,
    }, ""))
      .then((response) => {
        setAulas(response.data.data);
      })
      .catch((error) => {
        setAulas([]);
        toast.warning(error.response.data);
      });
  };

  const handleDias = () => {
    apiClient.get(Api_Global_Setup.dias.activos())
      .then((response) => {
        setDias(response.data);
      })
      .catch((error) => {
        setDias([]);
        toast.warning(error.response.data);
      });
  };

  useEffect(() => {
    handleAulas();
    handleDias();
    if (idPeriodohorarioEdit) {
      handleHorario();
    }
  }, []);

  return (
    <div
      className="bg-gray-200 flex justify-center items-start fixed inset-0 z-50 p-0 md:p-6"
      style={{ background: "#4d4d4d21", backdropFilter: "blur(10px)" }}
    >
      <div className="max-w-4xl bg-white rounded-lg shadow-lg relative max-h-[88vh] overflow-auto">
        <button
          type="button"
          className="absolute right-4 top-4 text-white hover:text-white"
          onClick={() => closePriceModal()}
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
        <div className="bg-indigo-600 text-white p-4 rounded-t-lg">
          <h2 className="text-xl font-bold flex">
            <CalendarDays />
            <span className="ml-2">Registro día</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pb-4">
            <div className="grid grid-cols-1 mt-2 mb-2 gap-2">
              <div>
                <label className="font-medium text-[14px]">Aula:</label>
                <select
                  {...register("id_aula", { required: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-[14px]"
                >
                  <option value="">--Seleccione--</option>
                  {aulas.map((item) => (
                    <option value={item.id_aula} key={item.id_aula}>{item.nombre}</option>
                  ))}
                </select>
                {errors.id_aula && <span className="text-xs text-pink-500">Este campo es requerido</span>}
              </div>
            </div>
            <hr className="text-black" />
            <div className="grid grid-cols-1 mt-2 mb-2 gap-2">
              <div>
                <label className="font-medium text-[14px]">Día:</label>
                <select
                  {...register("id_dia", { required: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-[14px]"
                >
                  <option value="">--Seleccione--</option>
                  {dias.map((item) => (
                    <option value={item.id_dia} key={item.id_dia}>{item.nombre}</option>
                  ))}
                </select>
                {errors.id_dia && <span className="text-xs text-pink-500">Este campo es requerido</span>}
              </div>
            </div>
            <hr className="text-black" />
            <div className="grid grid-cols-2 mt-2 mb-2 gap-2">
              <div>
                <label className="font-medium text-[14px]">Hora inicio:</label>
                <input
                  {...register("hora_inicio", { required: true })}
                  type="time"
                  className="p-1 text-[14px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.hora_inicio && <span className="text-xs text-pink-500">Este campo es requerido</span>}
                <hr className="text-black mt-2" />
              </div>
              <div>
                <label className="font-medium text-[14px]">Hora fin:</label>
                <input
                  {...register("hora_fin", { required: true })}
                  type="time"
                  className="p-1 text-[14px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.hora_fin && <span className="text-xs text-pink-500">Este campo es requerido</span>}
                <hr className="text-black mt-2" />
              </div>
            </div>
          </div>
          <hr className="text-black" />

          <div className="flex justify-center my-4">
            {idPeriodohorarioEdit && (
              <button
                type="button"
                className="text-red-900 font-bold rounded-xl border-2 border-red-900 hover:bg-red-900 hover:text-white px-8 py-[6px] text-sm mr-2"
                onClick={handleEliminar}
                disabled={isLoading}
              >
                {isLoading ? <ClipLoader color="#1e3a8a" size={20} /> : 'Eliminar'}
              </button>
            )}
            <button
              type="submit"
              className="text-blue-900 font-bold rounded-xl border-2 border-blue-900 hover:bg-blue-900 hover:text-white px-8 py-[6px] text-sm"
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader color="#1e3a8a" size={20} /> : 'GUARDAR'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}