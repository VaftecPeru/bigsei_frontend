import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import { Api_Global_Admin } from "../../../services/AdminApi";
import { Api_Global_Setup } from "../../../services/SetupApi";
import apiClient from "../../../Utils/apiClient";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";

export default function BuscarUsuarioAModal({ onClose }) {
  const [isLoading, setIsLoading] = useState(false);
  const [tipoDocumentos, setTipoDocumentos] = useState([]);
  const [persona, setPersona] = useState(null);
  const [formularioBurcar, setFormularioBurcar] = useState({
    numero_documento: "",
    id_tipodocumento: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const closeRegisterModal = () => {
    onClose(null);
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

  const handleBuscarPersona = () => {
    setIsLoading(true);
    apiClient.get(Api_Global_Admin.usuarios.buscarPersonas(formularioBurcar.id_tipodocumento, formularioBurcar.numero_documento))
      .then((response) => {
        setIsLoading(false);
        setPersona(response.data);
        setValue("id_persona", response.data.id_persona);
      })
      .catch((error) => {
        setIsLoading(false);
        setPersona(null);
        toast.warning(error.response.data);
      });
  };

  const handleRegistrar = (data) => {
    setIsLoading(true);
    apiClient.post(Api_Global_Admin.usuarios.completarPersonas(), data)
      .then((response) => {
        setIsLoading(false);
        onClose(response.data.id_usuario);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  useEffect(() => {
    handleDocumentos();
  }, []);

  return (
    <div
      className="bg-gray-200 flex justify-center items-start fixed inset-0 z-50 h-full w-full p-0 md:p-6"
      style={{ background: "#4d4d4d21", backdropFilter: "blur(10px)" }}
    >
      <div className="w-full h-full max-w-4xl bg-white rounded-lg shadow-lg relative overflow-auto">

        <div className="p-6">
          <button
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
          <h1 className="text-2xl font-bold text-gray-900">Buscar Persona (Estudiante, Docente, Otros)</h1>

        </div>
        <hr />

        <div className="p-6">

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div>
              <label htmlFor="nombre_completo" className="block text-sm font-medium text-gray-700">
                Documento:
              </label>
              <select
                id="id_tipodocumento"
                name="id_tipodocumento"
                value={formularioBurcar.id_tipodocumento}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormularioBurcar({
                    ...formularioBurcar,
                    id_tipodocumento: value,
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">--Seleccionar--</option>
                {tipoDocumentos.map((item) => (
                  <option value={item.id_tipodocumento} key={item.id_tipodocumento}>{item.siglas} - {item.nombre}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="numero_documento" className="block text-sm font-medium text-gray-700">
                Número documento:
              </label>
              <input
                type="text"
                id="numero_documento"
                name="numero_documento"
                value={formularioBurcar.numero_documento}
                onChange={(e) => {
                  const value = e.target.value;
                  setFormularioBurcar({
                    ...formularioBurcar,
                    numero_documento: value,
                  });
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="flex items-end">
              <button
                type="button"
                onClick={() => handleBuscarPersona()}
                className="text-[#22A8E8] flex w-44 h-11 border rounded-lg border-[#22A8E8] items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? <ClipLoader color="#374151" size={20} /> : ""}
                <Search className="mr-2 h-4 w-4" />
                Buscar persona
              </button>
            </div>
          </div>

          <hr className="mt-6 mb-4" />
            {persona ? (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
                  <div>
                    <label htmlFor="nombre_completo" className="block text-sm font-medium text-gray-700">
                      Nombre y apellido:
                    </label>
                    <input
                      type="text"
                      value={persona.nombre_completo}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      readonly
                    />
                  </div>

                  <div>
                    <label htmlFor="id_tipodocumento" className="block text-sm font-medium text-gray-700">
                      Documento:
                    </label>
                    <select
                      value={persona.id_tipodocumento}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      readonly
                    >
                      {tipoDocumentos.map((item) => (
                        <option value={item.id_tipodocumento} key={item.id_tipodocumento}>{item.siglas} - {item.nombre}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="numero_documento" className="block text-sm font-medium text-gray-700">
                      Celular:
                    </label>
                    <input
                      type="text"
                      value={persona.numero_documento}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      readonly
                    />
                  </div>
                </div>

                {persona.id_usuario ? (
                  <div className="text-center text-2x p-8" style={{fontWeight: "bold"}}>
                    Persona encontrada, es usuario.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(handleRegistrar)}>
                    <div className="text-center text-2x p-8" style={{fontWeight: "bold"}}>
                      Persona encontrada, no es usuario.
                    </div>
                    <input
                      type="hidden"
                      name="id_persona"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                      {...register("id_persona")}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Usuario:
                        </label>
                        <input
                          type="text"
                          name="username"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          {...register("username", { required: true })}
                        />
                        {errors.username && <span className="text-xs text-pink-500">Ingresa usuario válido</span>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Correo de usuario:
                        </label>
                        <input
                          type="email"
                          name="email"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                          {...register("email", { required: true })}
                        />
                        {errors.email && <span className="text-xs text-pink-500">Ingresa correo de usuario válido</span>}
                      </div>

                      <div className="flex items-end">
                        <button
                          type="submit"
                          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          disabled={isLoading}
                        >
                          {isLoading ? <ClipLoader color="#ffffff" size={20} /> : ""}
                          Registrar Usuario
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              <div className="text-center text-2xl p-8" style={{fontWeight: "bold"}}>
                Persona no encontrada.
              </div>
            )}

        </div>
      </div>
    </div>
  );
}