import { useState, useRef } from "react";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Api_Global_Docente } from "../../../services/DocenteApi";
import apiClient from "../../../Utils/apiClient";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

export function ModalCreateClass({ clickClose, clickConfirm, idPeriodocurso }) {
  const modalRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id_periodocurso: "",
      titulo: "",
      descripcion: "",
      fecha_inicio: "",
      fecha_fin: "",
    },
  });

  const onSubmit = (data) => {
    const data_ = {
      ...data,
      id_periodocurso: idPeriodocurso,
    };
    setIsLoading(true);
    apiClient.post(Api_Global_Docente.academicoPeriodoModulos.registrar(), data_)
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        clickClose();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  }

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
      style={{ background: "#4747472e", backdropFilter: "blur(4px)" }}
    >
      <div ref={modalRef} className="bg-white w-full max-w-2xl mx-4 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Crear Nuevo Módulo</h2>
          <button onClick={clickClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="mb-4">
            <label className="block text-gray-700">Título</label>
            <input
              type="text"
              id="titulo"
              {...register("titulo", { required: true })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.titulo && <span className="text-xs text-pink-500">Este campo es requerido</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Descripción</label>
            <textarea
              id="descripcion"
              {...register("descripcion", { required: true })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
            {errors.descripcion && <span className="text-xs text-pink-500">Este campo es requerido</span>}
          </div>

          <div className="flex gap-4">
            <div className="mb-4 flex-1">
              <label className="block text-gray-700">Fecha de Inicio</label>
              <input
                type="date"
                id="fecha_inicio"
                {...register("fecha_inicio", { required: true })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.fecha_inicio && <span className="text-xs text-pink-500">Este campo es requerido</span>}
            </div>

            <div className="mb-4 flex-1">
              <label className="block text-gray-700">Fecha de Finalización</label>
              <input
                type="date"
                id="fecha_fin"
                {...register("fecha_fin", { required: true })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.fecha_fin && <span className="text-xs text-pink-500">Este campo es requerido</span>}
            </div>
          </div>

          <div className="border-t pt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={clickClose}
              className="px-4 py-2 text-gray-500 hover:text-gray-700"
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader color="#374151" size={20} /> : 'Cancelar'}
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-white bg-blue-600 rounded ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader color="#ffffff" size={20} /> : 'Crear Actividad'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


export function ModalConfirm({ clickConfirm, clickVolver }) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const clickContinuar = () => {
    if (isChecked) {
      clickConfirm();
    }
  };

  

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center">
      {/* Fondo oscuro con blur */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-[3px]"
        onClick={() => clickCreateClass(false)}
      />

      {/* Contenedor del modal */}
      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl mx-4">
        {/* Título */}
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          ¡Bienvenido/a a tu nuevo "Nombre de clase"
        </h2>

        {/* Contenido */}
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Estamos emocionados de acompañarte en este nuevo camino de aprendizaje.
          </p>

          {/* Checkbox */}
          <label className="flex items-start gap-2 text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              className="w-auto mt-1"
              onChange={handleCheckboxChange}
            />
            <span>He leído y entiendo el aviso anteriormente mencionado.</span>
          </label>
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-3">
          <button
            onClick={clickVolver}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md"
          >
            Volver
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            onClick={clickContinuar}
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  );
}

export const ModalPresentacion = ({ clickClose }) => {
  const [files, setFiles] = useState([
    { id: 1, name: "my-cv.pdf", status: "uploading", progress: 45 },
    {
      id: 2,
      name: "google-certificate.pdf",
      status: "completed",
      progress: 100,
    },
  ]);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
  };

  const clickTareaContent = (e) => {
    if (e.currentTarget.getAttribute("data-tarea") == "true") {
      clickClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      data-tarea
      onClick={clickTareaContent}
    >
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[3px]"
        aria-hidden="true"
      />

      {/* Modal Contenido */}
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
            <h2 className="text-lg font-medium text-blue-900">SUBIR ARCHIVO</h2>
          </div>
          <button className="text-blue-900 font-medium px-4 py-2 rounded-lg hover:bg-blue-50">
            Entregar
          </button>
        </div>

        {/* area de subida */}
        <div className="p-4">
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                Choose a file or drag & drop it here
              </p>
              <p className="text-xs text-gray-500 mb-4">
                .JPEG, PNG, PDF, and MP4 formats up to 50MB
              </p>
              <button className="bg-white text-gray-700 border border-black rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-400">
                Browse File
              </button>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {files.map((file) => (
              <div
                key={file.id}
                className="bg-gray-50 rounded-lg p-3 flex items-center"
              >
                {/* PDF Icon */}
                <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                  <span className="text-xs font-medium text-red-700">PDF</span>
                </div>

                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {file.name}
                  </p>
                  {file.status === "uploading" ? (
                    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full transition-all duration-300"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500">Completed</p>
                  )}
                </div>

                <button className="ml-4 text-gray-400 hover:text-gray-600">
                  {file.status === "completed" ? (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="w-5 h-5"
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
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModalTarea = ({ clickClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [value1, setValue1] = useState("");
  const [isFocused2, setIsFocused2] = useState(false);
  const [value2, setValue2] = useState("");

  const clickContentTarea = (e) => {
    if (e.currentTarget.getAttribute("data-tareaContent") == "true") {
      clickClose();
    }
  };

  return (
    <div
      className="fixed inset-0 h-full z-50 w-full backdrop-blur-[3px] bg-black/10 grid place-items-center"
      data-tareaContent
      onClick={clickContentTarea}
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
              <p className="text-xs text-black text-center">SEMANA 1</p>
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
          <div className="w-[500px] py-12 px-8">
            <div className="input-container relative">
              <input
                type="text"
                placeholder=" "
                className="rounded-xl bg-gray-100 border border-gray-400 p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                onFocus={() => setIsFocused1(true)}
                onBlur={() => !value1 && setIsFocused1(false)}
                onChange={(e) => setValue1(e.target.value)}
              />
              <label
                className={`placeholder-label absolute left-2 top-2 text-gray-500 transition-all duration-200 pointer-events-none ${(isFocused1 || value1) && "transform -translate-y-2 translate-x-1 text-sm text-blue-500 bg-gray-100 px-1"
                  }`}
              >
                Título
              </label>
            </div>
            <div className="input-container relative mt-8 mb-8">
              <input
                type="text"
                placeholder=" "
                className="h-32 rounded-xl bg-gray-100 border-3 border-gray-400 p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                onFocus={() => setIsFocused2(true)}
                onBlur={() => !value2 && setIsFocused2(false)}
                onChange={(e) => setValue2(e.target.value)}
              />
              <label
                className={`placeholder-label absolute left-2 top-2 text-gray-500 transition-all duration-200 pointer-events-none ${(isFocused2 || value2) && "transform -translate-y-2 translate-x-1 text-sm text-blue-500 bg-gray-100 px-1"
                  }`}
              >
                Instrucciones (opcional)
              </label>
            </div>
            <div className="flex justify-center mt-8">
              <button className="text-blue-900 font-bold rounded-xl border-2 border-blue-900 hover:bg-blue-900 hover:text-white px-8 py-[10px] text-sm">
                ASIGNAR
              </button>
            </div>
          </div>

          {/* Línea vertical */}
          <div className="w-px ml-0 h-full bg-gray-200 mx-4"></div>

          {/* Sección derecha (Configuración de la tarea) */}
          <div>
            <div className="flex py-2">
              <h3 className="mr-4 text-black font-medium">Configuración de la tarea</h3>
              <svg className="cursor-pointer" onClick={() => setIsModalOpen(true)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-settings"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
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
                    <p>20/04/25</p>
                    <p className="ml-2">12:00 AM</p>
                  </div>
                </div>
              </div>
              <hr className="w-56" />

              <div className="flex items-center mt-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-copy-check"><path d="m12 15 2 2 4-4" /><rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></svg>
                <div className="px-5 text-sm">
                  <p className="text-black font-medium">Intento permitido</p>
                  <div className="flex text-gray">
                    <p>1 intento</p>
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
                    <p>20 puntos</p>
                  </div>
                  <p></p>
                </div>
              </div>
              <hr className="w-56" />
              <div className="flex items-center mt-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /></svg>
                <div className="px-5 text-sm">
                  <p className="text-black font-medium">Archivos de actividad</p>
                  <div className="flex text-gray">
                    <p>Tarea.pdf</p>
                  </div>
                  <p></p>
                </div>
              </div>
              <hr className="w-56" />
              <div className="flex items-center mt-2 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                <div className="px-5 text-sm">
                  <p className="text-black font-medium">Disponibilidad</p>
                  <div className="text-gray">
                    <p>Desde 17/04/25   12:00 AM</p>
                    <p>Hasta 20/04/25   12:00 AM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal de configuración */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-[17rem] max-h-[450px] p-4 ml-[490px]">
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
                    <p className="text-xs text-black text-center">SEMANA 1</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
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
              <hr className="w-64 text-black" />
              <div className="mt-2 mb-2">
                <p className="font-medium text-[10px]">Fecha de entrega</p>
                <div className="flex w-52 gap-4">
                  <input
                    type="date"
                    className="p-1 text-[10px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="time"
                    className="p-1 text-[10px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <hr className="w-64 text-black" />
              <div className="mt-2 mb-2">
                <p className="font-medium text-[10px]">Intentos permitidos</p>
                <select className="w-52 border border-gray-500 text-[10px]">
                  <option value="1">1</option>
                  <option value="2">2</option>
                </select>
              </div>
              <hr className="w-64 text-black" />
              <div className="mt-2 mb-2">
                <p className="font-medium text-[10px]">Calificación máxima</p>
                <select className="w-52 border border-gray-500 text-[10px]">
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
              </div>
              <hr className="w-64 text-black" />
              <div className="mt-2 mb-2">
                <p className="font-medium text-[10px]">Archivos de actividad</p>
                <div className="flex items-center gap-2">
                  <p className="text-[10px] mr-8">Adjuntar archivo</p>
                  <label className="cursor-pointer bg-gray-300 justify-center text-black font-medium text-[10px] w-24 rounded-base h-6 flex items-center justify-center">
                    <span>Examinar equipo</span>
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
                <p className="text-[10px]">Archivo adjunto</p>
                <div className="w-52 flex border border-gray-500 border-dashed items-center justify-between p-1 rounded-md">
                  <p className="text-[10px] text-center">Tarea.pdf</p>
                  <button className="text-gray-500 hover:text-red-500">
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
                  </button>
                </div>
              </div>
              <hr className="w-64 text-black" />
              <div className="mt-4 mb-4">
                <p className="font-medium text-[10px]">Disponibilidad</p>
                <div className="flex">
                  <p className="text-[10px]">Mostrar desde</p>
                  <input className="w-36 ml-4 p-1 text-[10px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="date" />
                </div>
                <div className="flex">
                  <p className="text-[10px]">Mostrar hasta</p>
                  <input className="w-36 ml-4 p-1 text-[10px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" type="time" />
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const ModalConnectToClass = ({ clickClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-[3px]"
        onClick={clickClose}
      />

      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-xl font-medium text-gray-900">
          Unirse a una clase
        </h2>

        {/* seccion de Usuarios */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full">
              <img
                src="https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Deepak_Headshot.width-500.format-webp.webp"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="font-medium">Jean Marcos</div>
              <div className="text-sm text-gray-500">jeanMarcos@gmail.com</div>
            </div>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700">
            Cambiar de cuenta
          </button>
        </div>

        {/* codigo de clase*/}
        <div className="mb-6">
          <label className="mb-1 block text-base font-medium text-gray-900">
            Código de la clase
          </label>
          <p className="mb-4 text-sm text-gray-600">
            Pídele a tu profesor el código de la clase y, luego, ingrésalo aquí.
          </p>
          <input
            type="text"
            placeholder="Código de la clase"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="mb-8">
          <h3 className="mb-2 text-sm font-medium text-gray-900">
            Para acceder con un código de la clase
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Usa una cuenta autorizada.</li>
            <li>
              • Usa un código de la clase que tenga entre 5 y 7 letras o
              números, sin espacios ni símbolos.
            </li>
          </ul>
          <p className="mt-4 text-sm text-gray-600">
            Si tienes problemas para unirte a la clase, consulta este{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700">
              artículo del Centro de ayuda
            </a>
            .
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={clickClose}
            className="rounded-md px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
            Unirse
          </button>
        </div>
      </div>
    </div>
  );
};

export const ModalSubirGrabacion = ({ clickClose }) => {
  const [isOpen, setIsOpen] = useState(false);
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
        {/* Header del modal */}
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
              <p className="text-xs text-black text-center">SEMANA 1</p>
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

        {/* Botones de selección (ENLACE o VIDEO) */}
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

        {/* Contenido del modal con scroll */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {selected === "ENLACE" ? (
            <div className="flex flex-col gap-4">
              {/* Nombre */}
              <div className="flex gap-2 items-center">
                <span className="block w-24 text-end text-center">Nombre</span>
                <input
                  className="rounded-xl border-2 border-gray-300 bg-white text-black flex-1 h-full"
                  type="text"
                />
              </div>

              {/* URL video */}
              <div className="flex gap-2 items-center">
                <span className="block w-24 text-end text-center">URL</span>
                <input
                  className="rounded-xl border-2 border-gray-300 bg-white text-black flex-1 h-full"
                  type="text"
                />
              </div>

              {/* Descripción */}
              <div className="flex gap-2">
                <span className="block w-24 text-end">Descripción</span>
                <input
                  className="border-2 border-gray-300 rounded-xl py-[45px] flex-1"
                  type="text"
                />
              </div>

              {/* Botón ASIGNAR */}
              <button className="text-blue-900 font-bold rounded-xl border-2 border-blue-900 hover:bg-blue-900 hover:text-white px-6 m-auto py-[10px] text-sm">
                ASIGNAR
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {/* Nombre */}
              <div className="flex gap-2 items-center">
                <span className="block w-24 text-end text-center">Nombre</span>
                <input
                  className="rounded-xl border-2 border-gray-300 bg-white text-black flex-1"
                  type="text"
                />
              </div>

              {/* Descripción */}
              <div className="flex gap-2">
                <span className="block w-24 text-end">Descripción</span>
                <input
                  className="border-2 border-gray-300 rounded-xl py-[45px] flex-1"
                  type="text"
                />
              </div>

              {/* Botón desplegable para subir archivo */}
              <div className="flex gap-2 items-center">
                <div className="relative flex-1">
                  <button
                    className="w-full rounded-xl border-2 border-gray-300 bg-white text-black py-2 px-4 text-left cursor-pointer hover:bg-gray-100 transition-colors duration-200 flex items-center justify-between"
                    onClick={() => setIsOpen(!isOpen)}
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
                      className={`transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  {/* Espacio desplegable para subir archivo */}
                  {isOpen && (
                    <div className="ml-12 mt-2 w-72 rounded-xs border-2 border-dashed border-gray-300 bg-white p-4 flex flex-col items-center justify-center gap-2">
                      {/* Ícono de subida */}
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
                  CANCELAR
                </button>
                <button className="text-blue-900 font-bold rounded-xl border-2 border-blue-900 hover:bg-blue-900 hover:text-white px-6 m-auto py-[10px] text-sm">
                  ENVIAR
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const ModalCuestionario = ({ clickClose }) => {
  const [isFocused1, setIsFocused1] = useState(false);
  const [value1, setValue1] = useState("");
  const [isFocused2, setIsFocused2] = useState(false);
  const [value2, setValue2] = useState("");

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-[3px]"
        onClick={clickClose}
      />

      <div className="relative w-full max-w-lg rounded-lg bg-white p-6 shadow-xl mx-4">
        <div className="flex items-center h-full">
          <svg
            className="red-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            stroke="red"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="16" height="8" x="16" y="4" rx="2" />
            <path d="M16 8H12a4 4 0 0 0-4 4v28a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4v-1" />
            <path d="M32 8h4a4 4 0 0 1 3.46 2" />
            <path d="M16 36h2" />
            <path d="M42.756 25.252a2 2 0 0 0-6.008-6.008l-8.02 8.024a4 4 0 0 0-1.012 1.708l-1.674 5.74a1 1 0 0 0 1.24 1.24l5.74-1.674a4 4 0 0 0 1.708-1.012z" />
          </svg>
          <h2 className="text-lg font-bold text-blue-900 ml-2">
            CUESTIONARIO
          </h2>
        </div>
        <div className="py-12 px-8">
          <div className="input-container relative">
            <input
              type="text"
              placeholder=" "
              className="rounded-xl bg-gray-100 border border-gray-400 p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              onFocus={() => setIsFocused1(true)}
              onBlur={() => !value1 && setIsFocused1(false)}
              onChange={(e) => setValue1(e.target.value)}
            />
            <label
              className={`placeholder-label absolute left-2 top-2 text-gray-500 transition-all duration-200 pointer-events-none ${(isFocused1 || value1) && "transform -translate-y-2 translate-x-1 text-sm text-blue-500 bg-gray-100 px-1"
                }`}
            >
              Título
            </label>
          </div>
          <div className="input-container relative mt-8 mb-8">
            <input
              type="text"
              placeholder=" "
              className="h-32 rounded-xl bg-gray-100 border-3 border-gray-400 p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              onFocus={() => setIsFocused2(true)}
              onBlur={() => !value2 && setIsFocused2(false)}
              onChange={(e) => setValue2(e.target.value)}
            />
            <label
              className={`placeholder-label absolute left-2 top-2 text-gray-500 transition-all duration-200 pointer-events-none ${(isFocused2 || value2) && "transform -translate-y-2 translate-x-1 text-sm text-blue-500 bg-gray-100 px-1"
                }`}
            >
              Instrucciones (opcional)
            </label>
          </div>
          <div className="flex items-center border-2 border-blue-900 rounded-xl h-16 p-4">
            {/* Contenedor del SVG */}
            <div className="flex items-center justify-center h-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-file"
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              </svg>
            </div>

            {/* Línea vertical */}
            <div className="w-px h-16 bg-blue-900 mx-4"></div>

            {/* Texto */}
            <div className="text-black font-bold">
              <Link
                to="/formulario"
                className="text-blue-800 no-underline hover:text-blue-600 font-bold hover:underline transition-colors duration-200"
              >
                Crear pregunta
              </Link>
              <p className="text-sm text-gray-600">Formularios</p>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};