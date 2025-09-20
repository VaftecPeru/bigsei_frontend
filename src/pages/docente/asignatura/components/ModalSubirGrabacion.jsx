import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Api_Global_Docente } from "../../../../services/DocenteApi";
import apiClient from "../../../../Utils/apiClient";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

function SubirGrabacionEnlace({ idPeriodotema }) {
  const [isLoading, setIsLoading] = useState(false);
  const [idPeriodovideo, setIdPeriodovideo] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      nombre: "",
      url: "",
      descripcion: "",
      tipo: "1",
      tiene_contenido: "0",
    },
  });

  const setVideoForm = (data) => {
    setValue("nombre", data.nombre || "");
    setValue("url", data.url || "");
    setValue("descripcion", data.descripcion || "");
    setIdPeriodovideo(data.id_periodovideo);
  };

  const handleVideo = () => {
    setIsLoading(true);
    apiClient.get(Api_Global_Docente.academicoPeriodoVideos.listar({
      per_page: 15,
      page: 1,
    }, idPeriodotema, "1"))
      .then((response) => {
        setIsLoading(false);
        if (response.data.data.length > 0) {
          setVideoForm(response.data.data[0]);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const onSubmit = (data) => {
    const data_ = {
      ...data,
      id_periodotema: idPeriodotema,
    };
    if (idPeriodovideo) {
      setIsLoading(true);
      apiClient.put(Api_Global_Docente.academicoPeriodoVideos.editar(idPeriodovideo), data_)
        .then((response) => {
          setIsLoading(false);
          toast.success("Realizado.");
        })
        .catch((error) => {
          setIsLoading(false);
          toast.warning(error.response.data);
        });
    } else {
      setIsLoading(true);
      apiClient.post(Api_Global_Docente.academicoPeriodoVideos.registrar(), data_)
        .then((response) => {
          setIsLoading(false);
          toast.success("Realizado.");
        })
        .catch((error) => {
          setIsLoading(false);
          toast.warning(error.response.data);
        });
    }
  };

  useEffect(() => {
    handleVideo();
  },[]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <span className="block w-24 text-end text-center">Nombre</span>
            <input
              {...register("nombre", { required: true })}
              id="nombre"
              name="nombre"
              className="rounded-xl border-2 border-gray-300 bg-white text-black flex-1 h-full"
              type="text"
            />
            {errors.nombre && <span className="text-xs text-pink-500">Este campo es requerido</span>}
          </div>
          <div className="flex gap-2">
            <span className="block w-24 text-end text-center">URL</span>
            <textarea
              id="url"
              rows="5"
              {...register("url", { required: true })}
              className="rounded-xl border-2 border-gray-300 bg-white text-black flex-1 h-full"
            />
            {errors.url && <span className="text-xs text-pink-500">Este campo es requerido</span>}
          </div>
          <div className="flex gap-2">
            <span className="block w-24 text-end">Descripción</span>
            <textarea
              id="descripcion"
              rows="5"
              {...register("descripcion", { required: true })}
              className="rounded-xl border-2 border-gray-300 bg-white text-black flex-1 h-full"
            />
            {errors.descripcion && <span className="text-xs text-pink-500">Este campo es requerido</span>}
          </div>
          <button className="text-blue-900 font-bold rounded-xl border-2 border-blue-900 hover:bg-blue-900 hover:text-white px-6 m-auto py-[10px] text-sm">
            {isLoading ? <ClipLoader color="#1e3a8a" size={20} /> : 'GUARDAR'}
          </button>
        </div>
      </div>
    </form>
  );
}

function SubirGrabacionVideo({ idPeriodotema }) {
  const [isOpenContenido, setIsOpenContenido] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [idPeriodovideo, setIdPeriodovideo] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      nombre: "",
      url: "",
      descripcion: "",
      tipo: "2",
      // tiene_contenido: "0",
    },
  });

  const setVideoForm = (data) => {
    setValue("nombre", data.nombre || "");
    setValue("descripcion", data.descripcion || "");
    setIsOpenContenido(data.tiene_contenido == "1" ? true : false);
    setIdPeriodovideo(data.id_periodovideo);
  };

  const handleVideo = () => {
    setIsLoading(true);
    apiClient.get(Api_Global_Docente.academicoPeriodoVideos.listar({
      per_page: 15,
      page: 1,
    }, idPeriodotema, "2"))
      .then((response) => {
        setIsLoading(false);
        if (response.data.data.length > 0) {
          setVideoForm(response.data.data[0]);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const onSubmit = (data) => {
    const data_ = {
      ...data,
      id_periodotema: idPeriodotema,
      tiene_contenido: isOpenContenido ? "1" : "0",
    };
    if (idPeriodovideo) {
      setIsLoading(true);
      apiClient.put(Api_Global_Docente.academicoPeriodoVideos.editar(idPeriodovideo), data_)
        .then((response) => {
          setIsLoading(false);
          toast.success("Realizado.");
        })
        .catch((error) => {
          setIsLoading(false);
          toast.warning(error.response.data);
        });
    } else {
      setIsLoading(true);
      apiClient.post(Api_Global_Docente.academicoPeriodoVideos.registrar(), data_)
        .then((response) => {
          setIsLoading(false);
          toast.success("Realizado.");
        })
        .catch((error) => {
          setIsLoading(false);
          toast.warning(error.response.data);
        });
    }
  };

  useEffect(() => {
    handleVideo();
  },[]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <span className="block w-24 text-end text-center">Nombre</span>
            <input
              {...register("nombre", { required: true })}
              id="nombre"
              name="nombre"
              className="rounded-xl border-2 border-gray-300 bg-white text-black flex-1"
              type="text"
            />
            {errors.nombre && <span className="text-xs text-pink-500">Este campo es requerido</span>}
          </div>

          <div className="flex gap-2">
            <span className="block w-24 text-end">Descripción</span>
            <input
              {...register("descripcion", { required: true })}
              id="descripcion"
              name="descripcion"
              className="border-2 border-gray-300 rounded-xl py-[45px] flex-1"
              type="text"
            />
            {errors.descripcion && <span className="text-xs text-pink-500">Este campo es requerido</span>}
          </div>

          <div className="flex gap-2 items-center">
            <div className="relative flex-1">
              <button
                type="button"
                className="w-full rounded-xl border-2 border-gray-300 bg-white text-black py-2 px-4 text-left cursor-pointer hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
                onClick={() => setIsOpenContenido(!isOpenContenido)}
              >
                <span>Contenido</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`transform transition-transform duration-200 ${isOpenContenido ? "rotate-180" : ""}`}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {isOpenContenido && (
                <div className="ml-12 mt-2 w-72 rounded-xs border-2 border-dashed border-gray-300 bg-white p-4 flex flex-col items-center justify-center gap-2">
                  <div className="rounded-full bg-gray-100 p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-big-up-dash"><path d="M9 19h6" /><path d="M9 15v-3H5l7-7 7 7h-4v3H9z" /></svg>
                  </div>
                  <p className="text-sm text-gray-600 text-center">
                    Puede arrastrar y soltar archivos aquí para añadirlos.
                  </p>
                  <label className="cursor-pointer bg-blue-900 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition-colors duration-200">
                    <span>Seleccionar archivo</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          console.log("Archivo seleccionado:", file.name);
                        }
                      }}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
          <div className="flex">
            <button className="text-blue-900 font-bold rounded-xl border-2 border-blue-900 hover:bg-blue-900 hover:text-white px-6 m-auto py-[10px] text-sm">
              {isLoading ? <ClipLoader color="#1e3a8a" size={20} /> : 'GUARDAR'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

function ModalSubirGrabacion({ clickClose, tema }) {
  const [selected, setSelected] = useState("ENLACE");

  const clickContentPresentation = (e) => {
    if (e.currentTarget.getAttribute("data-presentacionContent") == "true") {
      clickClose();
    }
  };

  return (
    <div
      className="fixed inset-0 h-full z-50 w-full backdrop-blur-[3px] bg-black/10 grid place-items-center"
      data-presentacionContent
      onClick={clickContentPresentation}
    >
      <div
        className="rounded-md bg-white border border-gray-200 flex flex-col max-w-md h-[70%] xs:w-full md:w-[90%] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
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
              className="lucide lucide-file-video"
            >
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="m10 11 5 3-5 3v-6Z" />
            </svg>
            <div>
              <h2 className="text-lg font-bold text-blue-900 ml-2">SUBIR VIDEOS</h2>
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

        <div className="flex justify-start items-center w-full px-6">
          <div className="w-full flex justify-start gap-2">
            <button
              className={`px-8 py-2 rounded-md cursor-pointer w-32 transition-all duration-200 border border-gray-200
                ${selected === "ENLACE"
                  ? "bg-blue-900 text-white border-b-2 border-b-red-500"
                  : "bg-white text-black border-b-2 border-b-blue-900"
                }`}
              onClick={() => setSelected("ENLACE")}
            >
              ENLACE
            </button>

            <button
              className={`px-8 py-2 rounded-md cursor-pointer w-32 transition-all duration-200 border border-gray-200
                ${selected === "VIDEO"
                  ? "bg-blue-900 text-white border-b-2 border-b-red-500"
                  : "bg-white text-black border-b-2 border-b-blue-900"
                }`}
              onClick={() => setSelected("VIDEO")}
            >
              VIDEO
            </button>
          </div>
        </div>

        {selected === "ENLACE" ? (
          <SubirGrabacionEnlace idPeriodotema={tema.id_periodotema} />
        ) : (
          <SubirGrabacionVideo idPeriodotema={tema.id_periodotema} />
        )}
      </div>
    </div>
  );
}

export default ModalSubirGrabacion;