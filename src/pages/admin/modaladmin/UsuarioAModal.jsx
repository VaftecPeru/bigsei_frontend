import { useState, useEffect, useRef } from "react";
import { Camera, Search } from "lucide-react";
import { Api_Global_Admin } from "../../../services/AdminApi";
import { Api_Global_Setup } from "../../../services/SetupApi";
import apiClient from "../../../Utils/apiClient";
import apiFileClient from "../../../Utils/apiFileClient";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import BuscarUsuarioAModal from "./BuscarUsuarioAModal";

export default function UsuarioAModal({ onClose, idUsuario }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenBuscar, setIsOpenBuscar] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [photoReal, setPhotoReal] = useState(null);
  const [tipoDocumentos, setTipoDocumentos] = useState([]);
  const [idUsuarioEdit, setIdUsuarioEdit] = useState(null);
  const [archivo, setArchivo] = useState(null);
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
  const formRef = useRef();

  const closeRegisterModal = () => {
    onClose();
  };

  const handleOpenBuscar = () => {
    setIsOpenBuscar(true);
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

  const handleUsuario = () => {
    setIsLoading(true);
    apiClient.get(Api_Global_Admin.usuarios.mostrar(idUsuarioEdit))
      .then((response) => {
        setIsLoading(false);
        setFormulario({
          ...response.data,
          fecha_nacimiento: response.data.fecha_nacimiento_date,
        });
        if (response.data.archivo_foto_url) {
          setPhotoReal(response.data.archivo_foto_url);
        }
        setPhoto(null);
        setArchivo(null);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleGuardar = () => {
    const formData = new FormData(formRef.current);
    if (archivo) {
      formData.append("file", archivo);
    }

    if (idUsuarioEdit) {
      setIsLoading(true);
      apiFileClient.post(Api_Global_Admin.usuarios.editar(idUsuarioEdit), formData)
        .then((response) => {
          setIsLoading(false);
          toast.success("Realizado.");
          closeRegisterModal();
        })
        .catch((error) => {
          setIsLoading(false);
          toast.warning(error.response.data);
        });
    } else {
      setIsLoading(true);
      apiFileClient.post(Api_Global_Admin.usuarios.registrar(), formData)
        .then((response) => {
          setIsLoading(false);
          toast.success("Realizado.");
          closeRegisterModal();
        })
        .catch((error) => {
          setIsLoading(false);
          toast.warning(error.response.data);
        });
    }
  };

  useEffect(() => {
    if (idUsuarioEdit) {
      handleUsuario();
    }
  }, [idUsuarioEdit]);

  useEffect(() => {
    handleDocumentos();
    if (idUsuario) {
      setIdUsuarioEdit(idUsuario);
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
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Registrar Usuario</h1>
          <hr class="mb-4" />

          <form className="space-y-6" ref={formRef}>
            <div className="flex items-center space-x-6">
              <div className="shrink-0">
                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                  {photo ? (
                    <img
                      src={photo || "/placeholder.svg"}
                      alt="Foto del docente"
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

            <div className="grid grid-cols-1 gap-3 mt-4 sm:grid-cols-2">
              <div>
                <label htmlFor="nombre_completo" className="block text-sm font-medium text-gray-700">
                  Nombre y apellido:
                </label>
                <input
                  type="text"
                  id="nombre_completo"
                  name="nombre_completo"
                  value={formulario.nombre_completo}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormulario({
                      ...formulario,
                      nombre_completo: value,
                    });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">
                  Celular:
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formulario.telefono}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormulario({
                      ...formulario,
                      telefono: value,
                    });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label htmlFor="id_tipodocumento" className="block text-sm font-medium text-gray-700">
                  Documento:
                </label>
                <select
                  id="id_tipodocumento"
                  name="id_tipodocumento"
                  value={formulario.id_tipodocumento}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormulario({
                      ...formulario,
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
                  type="tel"
                  id="numero_documento"
                  name="numero_documento"
                  value={formulario.numero_documento}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormulario({
                      ...formulario,
                      numero_documento: value,
                    });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
                  Correo:
                </label>
                <input
                  type="email"
                  id="correo"
                  name="correo"
                  value={formulario.correo}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormulario({
                      ...formulario,
                      correo: value,
                    });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label htmlFor="estado" className="block text-sm font-medium text-gray-700">
                  Estado:
                </label>
                <select
                  id="estado"
                  name="estado"
                  value={formulario.estado}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormulario({
                      ...formulario,
                      estado: value,
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="1">Activo</option>
                  <option value="0">Inactivo</option>
                </select>
              </div>

              <div>
                <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
                  Dirección:
                </label>
                <input
                  type="text"
                  id="direccion"
                  name="direccion"
                  value={formulario.direccion}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormulario({
                      ...formulario,
                      direccion: value,
                    });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label htmlFor="fecha_nacimiento" className="block text-sm font-medium text-gray-700">
                  Fecha de Nacimiento:
                </label>
                <input
                  type="date"
                  id="fecha_nacimiento"
                  name="fecha_nacimiento"
                  value={formulario.fecha_nacimiento}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormulario({
                      ...formulario,
                      fecha_nacimiento: value,
                    });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label htmlFor="sexo" className="block text-sm font-medium text-gray-700">
                  Género:
                </label>
                <select
                  id="sexo"
                  name="sexo"
                  value={formulario.sexo}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormulario({
                      ...formulario,
                      sexo: value,
                    });
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Usuario:
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formulario.username}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormulario({
                      ...formulario,
                      username: value,
                    });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Usuario correo:
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formulario.email}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormulario({
                      ...formulario,
                      email: value,
                    });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>

            <hr className="mt-6" />

            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div>
                <button
                  type="button"
                  onClick={() => handleOpenBuscar()}
                  className="text-[#22A8E8] flex w-44 h-9 border rounded-lg border-[#22A8E8] items-center justify-center gap-1"
                  disabled={isLoading}
                >
                  {isLoading ? <ClipLoader color="#374151" size={20} /> : ""}
                  <Search className="mr-2 h-4 w-4" />
                  Buscar persona
                </button>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => closeRegisterModal()}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={isLoading}
                >
                  {isLoading ? <ClipLoader color="#1e3a8a" size={20} /> : "Cancelar"}
                </button>
                <button
                  type="button"
                  onClick={() => handleGuardar()}
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

      {isOpenBuscar && (
        <BuscarUsuarioAModal onClose={(id_usuario) => {
            setIsOpenBuscar(false);
            if (id_usuario) {
              setIdUsuarioEdit(id_usuario);
            }
          }}
        />
      )}
    </div>
  );
}