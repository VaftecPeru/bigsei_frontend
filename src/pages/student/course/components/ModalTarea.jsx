import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Api_Global_Estudiante } from "../../../../services/EstudianteApi";
import { Api_Global_Setup } from "../../../../services/SetupApi";
import apiClient from "../../../../Utils/apiClient";
import apiFileClient from "../../../../Utils/apiFileClient";
import { createFileUtil } from "../../../../Utils/Utils";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

function ModalTarea({ clickClose, tema }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingEntregadas, setIsLoadingEntregadas] = useState(false);
  const [tarea, setTarea] = useState(null);
  const [entregadas, setEntregadas] = useState([]);
  const [archivos, setArchivos] = useState([]);
  const [file, setFile] = useState(null);
  const tareaRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      comentario: "",
    },
  });

  const handleFileClick = () => {
    tareaRef.current.click();
  };

  const handleEntregadas = (id_periodotarea) => {
    setIsLoadingEntregadas(true);
    apiClient.get(Api_Global_Estudiante.miAcademicoEntregaTareas.listar({
      per_page: 15,
      page: 1,
    }, id_periodotarea))
      .then((response) => {
        setIsLoadingEntregadas(false);
        setEntregadas(response.data.data);
      })
      .catch((error) => {
        setIsLoadingEntregadas(false);
        setEntregadas([]);
        toast.warning(error.response.data);
      });
  };

  const handleArchivos = (id_periodotarea) => {
    apiClient.get(Api_Global_Setup.archivos.listar({
      per_page: 15,
      page: 1,
    }, {label: "id_periodotarea", value: id_periodotarea}))
      .then((response) => {
        setArchivos(response.data.data);
      })
      .catch((error) => {
        setArchivos([]);
        toast.warning(error.response.data);
      });
  };

  const handleTareas = () => {
    apiClient.get(Api_Global_Estudiante.miAcademicoPeriodoTareas.listar({
      per_page: 15,
      page: 1,
    }, tema.id_periodotema))
      .then((response) => {
        if (response.data.data.length > 0) {
          setTarea(response.data.data[0]);
          handleArchivos(response.data.data[0].id_periodotarea);
          handleEntregadas(response.data.data[0].id_periodotarea);
        }
      })
      .catch((error) => {
        setTarea([]);
        toast.warning(error.response.data);
      });
  };

  const handleDescargar = (item) => {
    setIsLoading(true);
    apiClient.get(Api_Global_Setup.archivos.descargar(item.id_archivo))
      .then((response) => {
        createFileUtil(response.data.url, response.data.nombre, response.data.extension);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleUpload = () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('id_periodotarea', tarea.id_periodotarea);
    formData.append('comentario', comentario);

    setIsLoading(true);
    apiFileClient.post(Api_Global_Estudiante.miAcademicoEntregaTareas.registrar(), formData)
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
            {/* <span className="sr-only">Cerrar</span> */}
          </button>
        </div>
        <hr className="w-full" />

        <div className="flex">
          <div className="w-[420px] py-4 px-6">
            {isLoadingEntregadas ? (
              <div> ...Buscando tareas entregadas </div>
            ) : (entregadas.length > 0) ? (
              entregadas.map(item => (
                <div>
                  <div className="mb-3">
                    <p>Fecha de entrega: {item?.archivo_fecha}</p>
                  </div>
                <div
                  className="border border-gray-400 rounded-lg p-4"
                >
                  <div className="flex items-center">
                    <div className="bg-gray-200 rounded-full p-2 pl-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="purple" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file">
                        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                        <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                      </svg>
                    </div>
                    <div className="ml-2 flex-1">
                      <p className="text-sm font-medium">{item.archivo_nombre}</p>
                      <p className="text-xs text-gray-500">{parseInt((item.archivo_tamanho/1000), 10)} KB</p>
                    </div>
                    <button type="button"
                      className="bg-blue-200 rounded-full p-2"
                      onClick={(e) => handleDescargar(item)}
                      disabled={isLoading}
                    >
                      {isLoading ? <ClipLoader color="#1e3a8a" size={20} /> :
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" x2="12" y1="15" y2="3" />
                        </svg>
                      }
                    </button>
                  </div>
                </div>
                </div>
              ))
            ) : (
              <form onSubmit={handleSubmit(handleUpload)}>
                <div className="mb-3">
                  <p>Fecha límite de entrega: {tarea?.fecha_entrega_ff} {tarea?.hora_entrega_ff}</p>
                </div>
                <div className="mb-3">
                  <label className="block text-gray-700">Comentario</label>
                  <textarea
                    id="comentario"
                    {...register("comentario", { required: true })}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.comentario && <span className="text-xs text-pink-500">Este campo es requerido</span>}
                </div>
                <div className="mb-5">
                  <button type="button"
                    className="text-blue-900 hover:text-blue-800
                      border border-gray-400 rounded-lg px-4 py-2
                      flex items-center
                    "
                    onClick={handleFileClick}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="purple" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file">
                      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                    </svg>
                    <span className="ml-1">Seleccionar archivo</span>
                  </button>
                  <input
                    type="file"
                    ref={tareaRef}
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        setFile(file);
                      }
                    }}
                  />
                  {file ? (
                    <span className="text-xs">...{file.name}</span>
                  ) : (
                    <span className="text-xs text-pink-500">Este campo es requerido</span>
                  )}
                </div>
                <div className="mb-3">
                  <label >
                  <button type="submit"
                    className="ml-auto text-blue-900 hover:text-blue-800
                      border border-gray-400 rounded-lg px-4 py-2
                    "
                  >Entregar</button>
                  </label>
                </div>
              </form>
            )}

          </div>

          <div className="w-[342px] py-2 px-2">
            <div className="flex py-2">
              <h3 className="mr-4 text-black font-medium">Información de la tarea</h3>
            </div>
            <hr />

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
              <hr />

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
              <hr />
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
              <hr />
              <div className="flex items-center mt-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /></svg>
                <div className="px-5 text-sm">
                  <p className="text-black font-medium">Archivos de actividad</p>
                  {archivos?.length && archivos.map((item, index) => (
                    <div
                      className="border border-gray-400 rounded-lg px-2 py-1"
                    >
                      <div className="flex items-center">
                        <div className="bg-gray-200 rounded-full p-2 pl-2">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="purple" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file">
                            <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                            <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                          </svg>
                        </div>
                        <div className="ml-2 flex-1">
                          <a style={{cursor: "pointer"}}
                            onClick={(e) => handleDescargar(item)}
                            disabled={isLoading}
                          >
                            <p className="text-sm font-medium"
                              style={{whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                width: "167px"}}
                            >{item.nombre}</p>
                            <p className="text-xs text-gray-500">{parseInt((item.tamanho/1000), 10)} KB</p>
                          </a>
                        </div>
                        <button type="button" className="bg-blue-200 rounded-full p-2"
                          onClick={(e) => handleDescargar(item)}
                          disabled={isLoading}
                        >

                        {isLoading ? <ClipLoader color="#1e3a8a" size={20} /> :
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" x2="12" y1="15" y2="3" />
                          </svg>
                        }
                        </button>
                      </div>
                    </div>
                  ))}
                  <p></p>
                </div>
              </div>
              <hr />
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
      </div>
    </div>
  );
}

export default ModalTarea;