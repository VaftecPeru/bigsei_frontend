import { useState, useEffect } from "react";
import { Camera, KeySquare } from "lucide-react";
import { Api_Global_Admin } from "../../../services/AdminApi";
import { Api_Global_Setup } from "../../../services/SetupApi";
import apiClient from "../../../Utils/apiClient";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

export default function GenerarPWUsuarioAModal({ onClose, idUsuario }) {
  const [isLoading, setIsLoading] = useState(false);
  const [photoReal, setPhotoReal] = useState(null);
  const [tipoDocumentos, setTipoDocumentos] = useState([]);
  const [formulario, setFormulario] = useState({
    nombre_completo: "",
    fecha_nacimiento: "",
    telefono: "",
    correo: "",
    direccion: "",
    sexo: "1",
    estado: "1",
    numero_documento: "",
    id_tipodocumento: "",
    username: "",
    email: "",
  });

  const closeRegisterModal = () => {
    onClose();
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

  const handleUsuario = () => {
    setIsLoading(true);
    apiClient.get(Api_Global_Admin.usuarios.mostrar(idUsuario))
      .then((response) => {
        setIsLoading(false);
        setFormulario({
          ...response.data,
          fecha_nacimiento: response.data.fecha_nacimiento_date,
        });
        if (response.data.archivo_foto_url) {
          setPhotoReal(response.data.archivo_foto_url);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleGenerar = () => {
    const data = {
      id_usuario: idUsuario,
    };

    setIsLoading(true);
    apiClient.post(Api_Global_Admin.usuarios.generarPassword(), data)
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado. "+response.data.mensaje);
        closeRegisterModal();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  useEffect(() => {
    handleDocumentos();
    if (idUsuario) {
      handleUsuario();
    }
  }, []);

  return (
    <div
      className="bg-gray-200 flex justify-center items-start fixed inset-0 z-50 h-full w-full p-0 md:p-6"
      style={{ background: "#4d4d4d21", backdropFilter: "blur(10px)" }}
    >
      <div className="w-full h-full max-w-4xl bg-white rounded-lg shadow-lg relative overflow-auto">
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
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Generar contraseña</h1>
          <hr class="mb-4" />

          <div className="flex items-center space-x-6">
            <div className="shrink-0">
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                {photoReal ? (
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
            <div className="">
              <button
                type="button"
                onClick={() => handleGenerar()}
                className="px-4 py-2 flex items-center border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                disabled={isLoading}
              >
                {isLoading ? <ClipLoader color="#ffffff" size={20} /> : ""}
                <KeySquare />
                <span class="ml-1">Generar nueva contraseña</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 mt-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nombre y apellido:
              </label>
              <input
                type="text"
                name="nombre_completo"
                value={formulario.nombre_completo}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                readonly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Celular:
              </label>
              <input
                type="tel"
                name="telefono"
                value={formulario.telefono}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                readonly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Documento:
              </label>
              <select
                name="id_tipodocumento"
                value={formulario.id_tipodocumento}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                readonly
              >
                <option value="">--Seleccionar--</option>
                {tipoDocumentos.map((item) => (
                  <option value={item.id_tipodocumento} key={item.id_tipodocumento}>{item.siglas} - {item.nombre}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Número documento:
              </label>
              <input
                type="tel"
                name="numero_documento"
                value={formulario.numero_documento}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                readonly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Correo:
              </label>
              <input
                type="email"
                name="correo"
                value={formulario.correo}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                readonly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Estado:
              </label>
              <select
                name="estado"
                value={formulario.estado}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                readonly
              >
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Dirección:
              </label>
              <input
                type="text"
                name="direccion"
                value={formulario.direccion}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                readonly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fecha de Nacimiento:
              </label>
              <input
                type="date"
                name="fecha_nacimiento"
                value={formulario.fecha_nacimiento}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                readonly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Género:
              </label>
              <select
                name="sexo"
                value={formulario.sexo}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                readonly
              >
                <option value="1">Masculino</option>
                <option value="2">Femenino</option>
                <option value="3">Otro</option>
              </select>
            </div>
          </div>

          <hr className="mt-6" />
          <div style={{fontWeight: "bold"}}>
            Datos usuario
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Usuario:
              </label>
              <input
                type="text"
                name="username"
                value={formulario.username}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                readonly
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Usuario correo:
              </label>
              <input
                type="email"
                name="email"
                value={formulario.email}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                readonly
              />
            </div>
          </div>
          <hr className="mt-6" />
        </div>
      </div>
    </div>
  );
}