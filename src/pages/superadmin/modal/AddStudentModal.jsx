import { useState } from "react";
import { Camera } from "lucide-react";
import { Api_Global_SuperAdministrador } from "../../../services/SuperAdministradorApi";
import apiClient from "../../../Utils/apiClient";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

export default function AddStudentModal({ isOpen, onClose, estudiante, resetEstudiante }) {
  const [isLoading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [idEstudiante, setIdEstudiante] = useState("");
  const [formulario, setFormulario] = useState({
    nombre_completo: estudiante.nombre_completo,
    fecha_nacimiento: estudiante.fecha_nacimiento,
    telefono: estudiante.telefono,
    correo: estudiante.correo,
    direccion: estudiante.direccion,
    sexo: estudiante.sexo,
    estado: estudiante.estado,
  });

  if (!isOpen) return null;

  if (estudiante.id_estudiante != "") {
    if (estudiante.nombre_completo != formulario.nombre_completo) {
      if (idEstudiante == "") {
        setIdEstudiante(estudiante.id_estudiante);
        setFormulario({
          nombre_completo: estudiante.nombre_completo,
          fecha_nacimiento: estudiante.fecha_nacimiento,
          telefono: estudiante.telefono,
          correo: estudiante.correo,
          direccion: estudiante.direccion,
          sexo: estudiante.sexo,
          estado: estudiante.estado,
        });
      }
    }
  }

  const closeRegisterModal = () => {
    setFormulario({
      nombre_completo: "",
      fecha_nacimiento: "2000-01-01",
      telefono: "",
      correo: "",
      direccion: "",
      sexo: "1",
      estado: "1",
    });
    setIdEstudiante("");
    onClose();
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPhoto(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleGuardar = () => {
    setLoading(true);
    apiClient.post(Api_Global_SuperAdministrador.estudiantes.registrar(), formulario)
      .then((response) => {
        setLoading(false);
        toast.success("Realizado.");
        closeRegisterModal();
      })
      .catch((error) => {
        setLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleEditar = () => {
    setLoading(true);
    apiClient.put(Api_Global_SuperAdministrador.estudiantes.editar(idEstudiante), formulario)
      .then((response) => {
        setLoading(false);
        toast.success("Realizado.");
        closeRegisterModal();
      })
      .catch((error) => {
        setLoading(false);
        toast.warning(error.response.data);
      });
  };

  return (
    <div
      className="bg-gray-200 flex justify-center items-start fixed inset-0 z-50 h-full w-full p-0 md:p-6"
      style={{ background: "#4d4d4d21", backdropFilter: "blur(10px)" }}
      id="register-modal"
    >
      <div className="w-full h-full max-w-4xl bg-white rounded-lg shadow-lg relative overflow-auto">
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

        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Registrar Estudiante</h1>

          <form className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="shrink-0">
                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                  {photo ? (
                    <img
                      src={photo || "/placeholder.svg"}
                      alt="Foto del estudiante"
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
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Nombre y apellido
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  defaultValue={formulario.nombre_completo}
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
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Celular
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  defaultValue={formulario.telefono}
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
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Correo
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={formulario.correo}
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
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Estado
                </label>
                <select
                  id="status"
                  name="status"
                  defaultValue={formulario.estado}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormulario({
                      ...formulario,
                      estado: value,
                    });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="1">Activo</option>
                  <option value="0">Inactivo</option>
                  <option value="0">Pendiente</option>
                </select>
              </div>

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Dirección
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  defaultValue={formulario.direccion}
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
                <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  id="birthdate"
                  name="birthdate"
                  defaultValue={formulario.fecha_nacimiento}
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
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Género
                </label>
                <select
                  id="gender"
                  name="gender"
                  defaultValue={formulario.sexo}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormulario({
                      ...formulario,
                      sexo: value,
                    });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="1">Masculino</option>
                  <option value="2">Femenino</option>
                  <option value="3">Otro</option>
                </select>
              </div>

              <div>
                <label htmlFor="course" className="block text-sm font-medium text-gray-700">
                  Curso
                </label>
                <input
                  type="text"
                  id="course"
                  name="course"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => closeRegisterModal()}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isLoading ? <ClipLoader color="#374151" size={20} /> : "Cancelar"}
                </button>
              {(idEstudiante != "") ? (
                <button
                  type="button"
                  onClick={() => handleEditar()}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {isLoading ? <ClipLoader color="#ffffff" size={20} /> : "Editar"}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleGuardar()}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {isLoading ? <ClipLoader color="#ffffff" size={20} /> : "Guardar"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}