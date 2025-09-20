import { useState, useEffect } from "react";
import { Camera, CircleCheck, CircleX, CircleCheckBig, Circle } from "lucide-react";
import { Api_Global_Admin } from "../../../services/AdminApi";
import apiClient from "../../../Utils/apiClient";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

export default function ConfigUsuarioAModal({ onClose, idUsuario }) {
  const [isLoading, setIsLoading] = useState(false);
  const [photoReal, setPhotoReal] = useState(null);
  const [roles, setRoles] = useState([]);
  const [formulario, setFormulario] = useState(null);

  const closeRegisterModal = () => {
    onClose();
  };

  const handleRoles = () => {
    setIsLoading(true);
    apiClient.get(Api_Global_Admin.roles.listar({
      per_page: 25,
      page: 1,
    }, idUsuario))
      .then((response) => {
        setIsLoading(false);
        setRoles(response.data.data);
      })
      .catch((error) => {
        setIsLoading(false);
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

  const handleHabilitar = (item) => {
    const data = {
      id_usuario: idUsuario,
      id_rol: item.id_rol,
    };

    setIsLoading(true);
    apiClient.post(Api_Global_Admin.roles.registrar(), data)
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        handleRoles();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleDeshabilitar = (item) => {
    setIsLoading(true);
    apiClient.delete(Api_Global_Admin.roles.eliminar(item.id_usuariorol))
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        handleRoles();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handlePrincipal = (item) => {
    setIsLoading(true);
    apiClient.put(Api_Global_Admin.roles.elegirPrincipal(item.id_usuariorol))
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        handleRoles();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  useEffect(() => {
    handleRoles();
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
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Configuración roles</h1>
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
              <div>
                <strong>Nombre: </strong>
                {formulario?.nombre_completo}</div>
              <div>
                <strong>{formulario?.tipodocumento_siglas}: </strong>
                {formulario?.numero_documento}</div>
            </div>
          </div>
          <hr className="my-3" />

          <div>
            <span style={{fontWeight: "bold"}}>Roles del usuario </span>
            (Habilitado/Deshabilitado)
          </div>

          <div className="mt-4 space-y-3">
            {roles.map((item, index) => (
              <div
                className="bg-gray-50 rounded-lg p-3 flex items-center"
              >
                <div className={`w-8 h-8 rounded flex items-center justify-center ${(item.rol_esta_habilitado == "1") ? "bg-green-100" : "bg-red-100"}`}>
                  <span className={`text-xs font-medium ${(item.rol_esta_habilitado == "1") ? "text-green-700" : "text-red-700"}`} style={{textTransform: 'uppercase'}}>{(index+1)}</span>
                </div>

                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {item.nombre}
                  </p>
                  {item.rol_esta_habilitado == "1" ? (
                    <p className="text-xs text-gray-500">Habilitado</p>
                  ) : (
                    <p className="text-xs text-gray-500">Deshabilitado</p>
                  )}
                </div>

                {item.rol_esta_habilitado == "1" ? (
                  <div>
                    {item.es_principal == "1" ? (
                      <button type="button" className="pl-2 pr-2 text-blue-400 hover:text-blue-600 cursor-auto"
                        title="Principal"
                        disabled={isLoading}
                      >
                        {isLoading ? <ClipLoader color="#60a5fa" size={20} /> : <CircleCheckBig />}
                      </button>
                    ) : (
                      <button type="button" className="pl-2 pr-2 text-gray-400 hover:text-gray-600"
                        title="Elegir como principal"
                        disabled={isLoading}
                        onClick={() => handlePrincipal(item)}
                      >
                        {isLoading ? <ClipLoader color="#9cafa3" size={20} /> : <Circle />}
                      </button>
                    )}
                    <button type="button" className="pl-2 pr-2 text-green-400 hover:text-green-600"
                      title="Deshabilitar"
                      disabled={isLoading}
                      onClick={() => handleDeshabilitar(item)}
                    >
                      {isLoading ? <ClipLoader color="#33cc99" size={20} /> : <CircleCheck />}
                    </button>
                  </div>
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