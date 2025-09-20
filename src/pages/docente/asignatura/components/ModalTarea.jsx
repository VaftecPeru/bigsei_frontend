import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Api_Global_Docente } from "../../../../services/DocenteApi";
import apiClient from "../../../../Utils/apiClient";
import apiFileClient from "../../../../Utils/apiFileClient";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

function ModalTareaConfig({ clickClose, idPeriodotarea }) {
  const [isLoading, setIsLoading] = useState(false);
  const [tarea, setTarea] = useState(null);
  const [archivos, setArchivos] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      fecha_entrega: "",
      hora_entrega: "",
      numero_intentos: "1",
      calificacion_maxima: "10",
      fecha_mostrar_desde: "",
      fecha_mostrar_hasta: "",
    },
  });

  const setTareaForm = (data) => {
    setValue("fecha_entrega", data.fecha_entrega);
    setValue("hora_entrega", data.hora_entrega);
    setValue("numero_intentos", data.numero_intentos);
    setValue("calificacion_maxima", data.calificacion_maxima ? parseInt(data.calificacion_maxima) : "");
    setValue("fecha_mostrar_desde", data.fecha_mostrar_desde ? data.fecha_mostrar_desde.substring(0, 10) : "");
    setValue("fecha_mostrar_hasta", data.fecha_mostrar_hasta ? data.fecha_mostrar_hasta.substring(0, 10) : "");
  };

  const handleTarea = () => {
    apiClient.get(Api_Global_Docente.academicoPeriodoTarea.mostrar(idPeriodotarea))
      .then((response) => {
        setTarea(response.data);
        setTareaForm(response.data);
      })
      .catch((error) => {
        toast.warning(error.response.data);
      });
  };

  const handleArchivos = () => {
    apiClient.get(Api_Global_Docente.archivos.listar({
      per_page: 15,
      page: 1,
    }, {label: "id_periodotarea", value: idPeriodotarea}))
      .then((response) => {
        setArchivos(response.data.data);
      })
      .catch((error) => {
        toast.warning(error.response.data);
      });
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    apiClient.patch(Api_Global_Docente.academicoPeriodoTarea.editar(idPeriodotarea), data)
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        clickClose();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleUpload = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id_periodotarea', idPeriodotarea);
    formData.append('tipo', 1);

    setIsLoading(true);
    apiFileClient.post(Api_Global_Docente.archivos.registrar(), formData)
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        handleArchivos();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleDelete = (data) => {
    setIsLoading(true);
    apiClient.delete(Api_Global_Docente.archivos.eliminar(data.id_archivo))
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        handleArchivos();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  useEffect(() => {
    if (idPeriodotarea) {
      handleTarea();
      handleArchivos();
    }
  },[]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-[21rem] max-h-[450px] p-4 ml-[490px]"
        style={{maxHeight: 'inherit'}}
      >
        <div className="flex items-center">
          <div className="flex items-center mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="red"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-clipboard-pen-line"
            >
              <rect width="8" height="4" x="8" y="2" rx="1" />
              <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.5" />
              <path d="M16 4h2a2 2 0 0 1 1.73 1" />
              <path d="M8 18h1" />
              <path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
            </svg>
            <div className="ml-2">
              <h2 className="text-base font-bold text-blue-900">TAREA</h2>
              <p className="text-xs text-black text-center">SEMANA {tarea?.tema_fecha}</p>
            </div>
          </div>
          <button
            onClick={() => clickClose()}
            className="ml-auto text-blue-900 hover:text-blue-800"
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
        <hr className="text-black" />

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 mt-2 mb-2 gap-2">
            <div>
              <label className="font-medium text-[14px]">Fecha entrega</label>
              <input
                {...register("fecha_entrega", { required: true })}
                type="date"
                className="p-1 text-[14px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.fecha_entrega && <span className="text-xs text-pink-500">Este campo es requerido</span>}
            </div>
            <div>
              <label className="font-medium text-[14px]">Hora entrega</label>
              <input
                {...register("hora_entrega", { required: true })}
                type="time"
                className="p-1 text-[14px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.hora_entrega && <span className="text-xs text-pink-500">Este campo es requerido</span>}
            </div>
          </div>
          <hr className="text-black" />
          <div className="mt-2 mb-2">
            <p className="font-medium text-[14px]">Intentos permitidos</p>
            <select
              {...register("numero_intentos", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-[14px]"
            >
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
            {errors.numero_intentos && <span className="text-xs text-pink-500">Este campo es requerido</span>}
          </div>
          <hr className="text-black" />
          <div className="mt-2 mb-2">
            <p className="font-medium text-[14px]">Calificación máxima</p>
            <select
              {...register("calificacion_maxima", { required: true })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-[14px]"
            >
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
            {errors.calificacion_maxima && <span className="text-xs text-pink-500">Este campo es requerido</span>}
          </div>
          <hr className="text-black" />
          <div className="mt-2 mb-2">
            <p className="font-medium text-[14px]">Archivos de actividad</p>
            <div className="grid grid-cols-2 items-center gap-2 mb-2">
              <p className="text-[14px] mr-8">Adjuntar archivo</p>
              <label className="cursor-pointer bg-gray-300 justify-center text-black font-medium text-[14px] w-full rounded-base h-6 flex items-center justify-center">
                <span>Examinar</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      handleUpload(file);
                    }
                  }}
                />
              </label>
            </div>
            <p className="text-[14px]">Archivos adjuntos</p>
            {archivos?.length && archivos.map((item, index) => (
            <div className="flex border border-gray-500 border-dashed items-center justify-between p-1 rounded-md mb-2">
              <p className="text-[14px] text-center">{item.nombre}</p>
              <button type="button" className="text-gray-500 hover:text-red-500"
                disabled={isLoading}
                onClick={() => handleDelete(item)}
              >
                {isLoading ? <ClipLoader color="#1e3a8a" size={20} /> :
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-trash-2"
                >
                  <path d="M3 6h18" />
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                  <line x1="10" x2="10" y1="11" y2="17" />
                  <line x1="14" x2="14" y1="11" y2="17" />
                </svg>
                }
              </button>
            </div>
            ))}
          </div>
          <hr className="text-black" />
          <div className="mt-4 mb-4">
            <p className="font-medium text-[14px]">Disponibilidad</p>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <p className="text-[14px]">Mostrar desde</p>
                <input
                  {...register("fecha_mostrar_desde", { required: true })}
                  className="w-36 p-1 text-[14px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="date"
                />
                {errors.fecha_mostrar_desde && <span className="text-xs text-pink-500">Este campo es requerido</span>}
              </div>
              <div>
                <p className="text-[14px]">Mostrar hasta</p>
                <input
                  {...register("fecha_mostrar_hasta", { required: true })}
                  className="w-36 p-1 text-[14px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="date"
                />
                {errors.fecha_mostrar_hasta && <span className="text-xs text-pink-500">Este campo es requerido</span>}
              </div>
            </div>
          </div>
          <hr className="text-black" />

          <div className="flex justify-center mt-4">
            <button className="text-blue-900 font-bold rounded-xl border-2 border-blue-900 hover:bg-blue-900 hover:text-white px-8 py-[6px] text-sm"
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader color="#1e3a8a" size={20} /> : 'GUARDAR'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

function ModalTarea({ clickClose, tema }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [value1, setValue1] = useState("");
  const [isFocused2, setIsFocused2] = useState(false);
  const [value2, setValue2] = useState("");
  const [tarea, setTarea] = useState(null);
  const [archivos, setArchivos] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      id_periodotema: "",
      titulo: "",
      instruccion: "",
    },
  });

  const handleArchivos = (id_periodotarea) => {
    apiClient.get(Api_Global_Docente.archivos.listar({
      per_page: 15,
      page: 1,
    }, {label: "id_periodotarea", value: id_periodotarea}))
      .then((response) => {
        setArchivos(response.data.data);
      })
      .catch((error) => {
        toast.warning(error.response.data);
      });
  };

  const handleCerrarConfigModal = () => {
    setIsModalOpen(false);
    handleTareas();
  };

  const handleTareas = () => {
    apiClient.get(Api_Global_Docente.academicoPeriodoTarea.listar({
      per_page: 15,
      page: 1,
    }, tema.id_periodotema))
      .then((response) => {
        if (response.data.data.length > 0) {
          setTarea(response.data.data[0]);
          setValue("titulo", response.data.data[0].titulo);
          setValue("instruccion", response.data.data[0].instruccion);
          setValue("id_periodotema", response.data.data[0].id_periodotema);
          handleArchivos(response.data.data[0].id_periodotarea);
        }
      })
      .catch((error) => {
        toast.warning(error.response.data);
      });
  };

  const onSubmit = (data) => {
    const data_ = {
      ...data,
      id_periodotema: tema.id_periodotema,
    };
    if (tarea?.id_periodotarea) {
      setIsLoading(true);
      apiClient.put(Api_Global_Docente.academicoPeriodoTarea.editar(tarea.id_periodotarea), data_)
        .then((response) => {
          setIsLoading(false);
          toast.success("Realizado.");
          setTarea(response.data);
        })
        .catch((error) => {
          setIsLoading(false);
          toast.warning(error.response.data);
        });
    } else {
      setIsLoading(true);
      apiClient.post(Api_Global_Docente.academicoPeriodoTarea.registrar(), data_)
        .then((response) => {
          setIsLoading(false);
          toast.success("Realizado.");
          setTarea(response.data);
        })
        .catch((error) => {
          setIsLoading(false);
          toast.warning(error.response.data);
        });
    }
  };

  useEffect(() => {
    handleTareas();
  },[]);

  return (
    <div
      className="fixed inset-0 h-full z-50 w-full backdrop-blur-[3px] bg-black/10 grid place-items-center"
    >
      <div
        className="rounded-md bg-white border border-gray-200 flex flex-col max-w-3xl h-[62%] xs:w-full md:w-[90%] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header del modal */}
        <div className="flex relative items-center justify-between w-full p-4">
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
              className="lucide lucide-clipboard-pen-line"
            >
              <rect width="8" height="4" x="8" y="2" rx="1" />
              <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.5" />
              <path d="M16 4h2a2 2 0 0 1 1.73 1" />
              <path d="M8 18h1" />
              <path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
            </svg>
            <div className="ml-2">
              <h2 className="text-lg font-bold text-blue-900">TAREA</h2>
              <p className="text-xs text-black text-center">SEMANA {tema.fecha}</p>
            </div>
          </div>

          {/* Botón de cerrar */}
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
        <hr className="w-full" />

        {/* Contenido principal del modal */}
        <div className="flex">
          {/* Sección izquierda (Título, Instrucciones, Botón ASIGNAR) */}
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-[500px] py-12 px-8">
            <div className="input-container relative">
              <input
                {...register("titulo", { required: true })}
                type="text"
                placeholder=" "
                className="rounded-xl bg-gray-100 border border-gray-400 p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                onFocus={() => setIsFocused1(true)}
                onBlur={() => !value1 && setIsFocused1(false)}
              />
              <label
                className={`placeholder-label absolute left-2 top-2 text-gray-500 transition-all duration-200 pointer-events-none ${(isFocused1 || value1) && "transform -translate-y-2 translate-x-1 text-sm text-blue-500 bg-gray-100 px-1"
                  }`}
              >
                Título
              </label>
              {errors.titulo && <span className="text-xs text-pink-500">Este campo es requerido</span>}
            </div>
            <div className="input-container relative mt-8 mb-8">
              <input
                {...register("instruccion", { required: true })}
                type="text"
                placeholder=" "
                className="h-32 rounded-xl bg-gray-100 border-3 border-gray-400 p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                onFocus={() => setIsFocused2(true)}
                onBlur={() => !value2 && setIsFocused2(false)}
              />
              <label
                className={`placeholder-label absolute left-2 top-2 text-gray-500 transition-all duration-200 pointer-events-none ${(isFocused2 || value2) && "transform -translate-y-2 translate-x-1 text-sm text-blue-500 bg-gray-100 px-1"
                  }`}
              >
                Instrucciones (opcional)
              </label>
              {errors.instruccion && <span className="text-xs text-pink-500">Este campo es requerido</span>}
            </div>
            <div className="flex justify-center mt-8">
              <button className="text-blue-900 font-bold rounded-xl border-2 border-blue-900 hover:bg-blue-900 hover:text-white px-8 py-[10px] text-sm"
                disabled={isLoading}
              >
                {isLoading ? <ClipLoader color="#ffffff" size={20} /> : 'ASIGNAR'}
              </button>
            </div>
          </div>
          </form>

          {/* Línea vertical */}
          <div className="w-px ml-0 h-full bg-gray-200 mx-4"></div>

          {/* Sección derecha (Configuración de la tarea) */}
          <div>
            <div className="flex py-2">
              <h3 className="mr-4 text-black font-medium">Configuración de la tarea</h3>
              {tarea && (<svg className="cursor-pointer" style={{cursor: 'pointer'}}
                onClick={() => setIsModalOpen(true)}
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
              )}
            </div>
            <hr className="w-64" />

            {/* Detalles de configuración */}
            <div className="py-2">
              <div className="flex items-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-calendar"
                >
                  <path d="M8 2v4" />
                  <path d="M16 2v4" />
                  <rect width="18" height="18" x="3" y="4" rx="2" />
                  <path d="M3 10h18" />
                </svg>
                <div className="px-5 text-sm">
                  <p className="text-black font-medium">Fecha de entrega</p>
                  <div className="flex text-gray">
                    <p>{tarea?.fecha_entrega_ff}</p>
                    <p className="ml-2">{tarea?.hora_entrega_ff}</p>
                  </div>
                </div>
              </div>
              <hr className="w-56" />

              <div className="flex items-center mt-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy-check"><path d="m12 15 2 2 4-4" /><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                <div className="px-5 text-sm">
                  <p className="text-black font-medium">Intento permitido</p>
                  <div className="flex text-gray">
                    <p>{tarea?.numero_intentos} intentos</p>
                  </div>
                  <p></p>
                </div>
              </div>
              <hr className="w-56" />
              <div className="flex items-center mt-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" /></svg>
                <div className="px-5 text-sm">
                  <p className="text-black font-medium">Calificación</p>
                  <div className="flex text-gray">
                    <p>{tarea?.calificacion_maxima} puntos</p>
                  </div>
                  <p></p>
                </div>
              </div>
              <hr className="w-56" />
              <div className="flex items-center mt-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /></svg>
                <div className="px-5 text-sm">
                  <p className="text-black font-medium">Archivos de actividad</p>
                  {archivos?.length && archivos.map((item, index) => (
                    <div className="flex text-gray mb-1">
                      <p>({index + 1}) {item.nombre}</p>
                    </div>
                  ))}
                  <p></p>
                </div>
              </div>
              <hr className="w-56" />
              <div className="flex items-center mt-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                <div className="px-5 text-sm">
                  <p className="text-black font-medium">Disponibilidad</p>
                  <div className="text-gray">
                    <p>Desde {tarea?.fecha_mostrar_desde_ff}</p>
                    <p>Hasta {tarea?.fecha_mostrar_hasta_ff}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isModalOpen && ( <ModalTareaConfig clickClose={() => handleCerrarConfigModal()} idPeriodotarea={tarea.id_periodotarea} /> )}
      </div>
    </div>
  );
}

export default ModalTarea;