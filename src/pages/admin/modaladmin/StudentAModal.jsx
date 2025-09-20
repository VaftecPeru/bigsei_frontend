import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { Camera } from "lucide-react";
import { Api_Global_Admin } from "../../../services/AdminApi";
import { Api_Global_Setup } from "../../../services/SetupApi";
import apiClient from "../../../Utils/apiClient";
import apiFileClient from "../../../Utils/apiFileClient";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

export default function StudentAModal({ onClose, idEstudianteEdit }) {
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoReal, setPhotoReal] = useState(null);
  const [tipoDocumentos, setTipoDocumentos] = useState([]);
  const [archivo, setArchivo] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      nombre_completo: "",
      fecha_nacimiento: "",
      telefono: "",
      correo: "",
      direccion: "",
      sexo: "1",
      estado: "1",
      id_tipodocumento: "",
      numero_documento: "",
      codigo: "",
    },
  });
  const formRef = useRef();

  const handleCloseModal = () => {
    onClose();
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPhoto(e.target.result);
      reader.readAsDataURL(file);
      setArchivo(file);
    }
  };

  const handleDocumentos = () => {
    apiClient.get(Api_Global_Setup.tipoDocumentos.listar(""))
      .then((response) => {
        setTipoDocumentos(response.data);
      })
      .catch((error) => {
        setTipoDocumentos([]);
        toast.warning(error.response.data);
      });
  };

  const handleSave = () => {
    const formData = new FormData(formRef.current);
    if (archivo) {
      formData.append("file", archivo);
    }
    if (idEstudianteEdit) {
      handleEditar(formData);
    } else {
      handleRegistrar(formData);
    }
  };

  const handleRegistrar = (data) => {
    setIsLoading(true);
    apiFileClient.post(Api_Global_Admin.estudiantes.registrar(), data)
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        handleCloseModal();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleEditar = (data) => {
    setIsLoading(true);
    apiFileClient.post(Api_Global_Admin.estudiantes.editar(idEstudianteEdit), data)
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        handleCloseModal();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleEstudiante = () => {
    setIsLoading(true);
    apiClient.get(Api_Global_Admin.estudiantes.mostrar(idEstudianteEdit))
      .then((response) => {
        setIsLoading(false);
        setValue("nombre_completo", response.data.nombre_completo);
        setValue("fecha_nacimiento", response.data.fecha_nacimiento_date);
        setValue("telefono", response.data.telefono);
        setValue("correo", response.data.correo);
        setValue("direccion", response.data.direccion);
        setValue("sexo", response.data.sexo);
        setValue("estado", response.data.estado);
        setValue("id_tipodocumento", response.data.id_tipodocumento);
        setValue("numero_documento", response.data.numero_documento);
        setValue("codigo", response.data.codigo);
        if (response.data.archivo_foto_url) {
          setPhotoReal(response.data.archivo_foto_url);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  useEffect(() => {
    handleDocumentos();
    if (idEstudianteEdit) {
      handleEstudiante(idEstudianteEdit);
    }
  }, []);

  return (
    <div
      className="bg-gray-200 flex justify-center items-start fixed inset-0 z-50 h-full w-full p-0 md:p-6"
      style={{ background: "#4d4d4d21", backdropFilter: "blur(10px)" }}
    >
      <div className="w-full h-full max-w-4xl bg-white rounded-lg shadow-lg relative overflow-auto">
        <button
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          onClick={() => handleCloseModal()}
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
          <h1 className="text-2xl font-bold text-gray-900">Registrar Estudiante</h1>
        </div>
        <hr />

        <form className="space-y-6" onSubmit={handleSubmit(handleSave)} ref={formRef}>
          <div className="px-6 pt-6">
            <div className="flex items-center space-x-6">
              <div className="shrink-0">
                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                  {photo ? (
                    <img
                      src={photo || "/placeholder.svg"}
                      alt="Foto del estudiante"
                      className="w-full h-full object-cover"
                    />
                  ) : photoReal ? (
                    <img
                      src={`data:image/png;base64,${photoReal}`}
                      alt="Foto del docente"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="w-12 h-12 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  )}
                </div>
              </div>
              <label className="block">
                <span className="sr-only">Elegir foto de perfil</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="block w-full text-sm text-slate-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-violet-50 file:text-violet-700
                  hover:file:bg-violet-100
                "
                />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label htmlFor="nombre_completo" className="block text-sm font-medium text-gray-700">
                  Nombre y apellido:
                </label>
                <input
                  type="text"
                  id="nombre_completo"
                  name="nombre_completo"
                  {...register("nombre_completo", { required: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.nombre_completo && <span className="text-xs text-pink-500">Este campo es requerido</span>}
              </div>
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                  Celular:
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  {...register("telefono", { required: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.telefono && <span className="text-xs text-pink-500">Este campo es requerido</span>}
              </div>
              <div>
                <label htmlFor="id_tipodocumento" className="block text-sm font-medium text-gray-700">
                  Documento:
                </label>
                <select
                  id="id_tipodocumento"
                  name="id_tipodocumento"
                  {...register("id_tipodocumento", { required: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">--Seleccionar--</option>
                  {tipoDocumentos.map((item) => (
                    <option value={item.id_tipodocumento} key={item.id_tipodocumento}>{item.siglas} - {item.nombre}</option>
                  ))}
                </select>
                {errors.id_tipodocumento && <span className="text-xs text-pink-500">Este campo es requerido</span>}
              </div>
              <div>
                <label htmlFor="numero_documento" className="block text-sm font-medium text-gray-700">
                  Número documento:
                </label>
                <input
                  type="text"
                  id="numero_documento"
                  name="numero_documento"
                  {...register("numero_documento", { required: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.numero_documento && <span className="text-xs text-pink-500">Este campo es requerido</span>}
              </div>
              <div>
                <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
                  Correo:
                </label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  {...register("correo", { required: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.correo && <span className="text-xs text-pink-500">Este campo es requerido</span>}
              </div>
              <div>
                <label htmlFor="estado" className="block text-sm font-medium text-gray-700">
                  Estado:
                </label>
                <select
                  id="estado"
                  name="estado"
                  {...register("estado", { required: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="1">Activo</option>
                  <option value="0">Inactivo</option>
                </select>
                {errors.estado && <span className="text-xs text-pink-500">Este campo es requerido</span>}
              </div>
              <div>
                <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
                  Dirección:
                </label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  {...register("direccion", { required: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.direccion && <span className="text-xs text-pink-500">Este campo es requerido</span>}
              </div>
              <div>
                <label htmlFor="fecha_nacimiento" className="block text-sm font-medium text-gray-700">
                  Fecha de Nacimiento:
                </label>
                <input
                  type="date"
                  id="fecha_nacimiento"
                  name="fecha_nacimiento"
                  {...register("fecha_nacimiento", { required: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.fecha_nacimiento && <span className="text-xs text-pink-500">Este campo es requerido</span>}
              </div>
              <div>
                <label htmlFor="sexo" className="block text-sm font-medium text-gray-700">
                  Género:
                </label>
                <select
                  id="sexo"
                  name="sexo"
                  {...register("sexo", { required: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="1">Masculino</option>
                  <option value="2">Femenino</option>
                  <option value="3">Otro</option>
                </select>
                {errors.sexo && <span className="text-xs text-pink-500">Este campo es requerido</span>}
              </div>
            </div>
          </div>

          <div className="px-6 pt-6">
            <div className="font-bold">
              Estudiante
            </div>
            <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <div>
                <label htmlFor="codigo" className="block text-sm font-medium text-gray-700">
                  Código:
                </label>
                <input
                  type="text"
                  id="codigo"
                  name="codigo"
                  {...register("codigo", { required: true })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
                {errors.codigo && <span className="text-xs text-pink-500">Este campo es requerido</span>}
              </div>
            </div>
          </div>
          <hr />

          <div className="px-6 pb-6">
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => handleCloseModal()}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={isLoading}
              >
                {isLoading ? <ClipLoader color="#1e3a8a" size={20} /> : "Cancelar"}
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={isLoading}
              >
                {isLoading ? <ClipLoader color="#1e3a8a" size={20} /> : "Guardar"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}