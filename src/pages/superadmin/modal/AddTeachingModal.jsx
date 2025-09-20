import { useState } from "react";
import { Camera } from "lucide-react";
import { Api_Global_SuperAdministrador } from "../../../services/SuperAdministradorApi";
import apiClient from "../../../Utils/apiClient";

export default function AddTeachingModal({ isOpen, onClose, docente }) {
  const [photo, setPhoto] = useState(null);
  const [idDocente, setIdDocente] = useState("");
  const [formulario, setFormulario] = useState({
    nombre_completo: docente.nombre_completo,
    fecha_nacimiento: docente.fecha_nacimiento,
    telefono: docente.telefono,
    correo: docente.correo,
    direccion: docente.direccion,
    sexo: docente.sexo,
    estado: docente.estado,
    id_tipoespecializacion: docente.id_tipoespecializacion,
    anhos_de_experiencia: docente.anhos_de_experiencia,
    id_tiponiveleducativo: docente.id_tiponiveleducativo,
  });

  if (!isOpen) return null;

  if (docente.id_docente != "") {
    if (docente.nombre_completo != formulario.nombre_completo) {
      if (idDocente == "") {
        setIdDocente(docente.id_docente);
        setFormulario({
          nombre_completo: docente.nombre_completo,
          fecha_nacimiento: docente.fecha_nacimiento,
          telefono: docente.telefono,
          correo: docente.correo,
          direccion: docente.direccion,
          sexo: docente.sexo,
          estado: docente.estado,
          id_tipoespecializacion: docente.id_tipoespecializacion,
          anhos_de_experiencia: docente.anhos_de_experiencia,
          id_tiponiveleducativo: docente.id_tiponiveleducativo,
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
      id_tipoespecializacion: "",
      anhos_de_experiencia: "",
      id_tiponiveleducativo: "",
    });
    setIdDocente("");

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

  // REGISTRAR Y EDITAR
  const onGuardar = async () => {
  
    try {
      let response = null;
      if (idDocente != "") {
        response = await apiClient.put(Api_Global_SuperAdministrador.docentes.editar(idDocente), formulario);
      } else {
        response = await apiClient.post(Api_Global_SuperAdministrador.docentes.registrar(), formulario);
      }

      if (response.status === 200) {
        closeRegisterModal();
      } else {
      }
    } catch (error) {
    } finally {
    }
  };

  return (
    <div
      className="bg-gray-200 flex justify-center items-start fixed inset-0 z-50 h-full w-full p-0 md:p-6"
      // onClick={(event) => closeOutModal(event)}
      style={{ background: "#4d4d4d21", backdropFilter: "blur(10px)" }}
      id="register-modal"
      // data-isOut="true"
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
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Registrar Docente</h1>

          <form className="space-y-6">
            {/* Sección de foto de perfil */}
            <div className="flex items-center space-x-6">
              <div className="shrink-0">
                <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                  {photo ? (
                    <img
                      src={photo || "/placeholder.svg"}
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

            {/* Sección de información personal */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                  <option>Activo</option>
                  <option>Inactivo</option>
                  <option>Pendiente</option>
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
                  <option>Masculino</option>
                  <option>Femenino</option>
                  <option>Otro</option>
                </select>
              </div>

              <div>
                <label htmlFor="specialization" className="block text-sm font-medium text-gray-700">
                  Especialización
                </label>
                <input
                  type="text"
                  id="specialization"
                  name="specialization"
                  defaultValue={formulario.id_tipoespecializacion}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormulario({
                      ...formulario,
                      id_tipoespecializacion: value,
                    });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                  Años de Experiencia
                </label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  defaultValue={formulario.anhos_de_experiencia}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormulario({
                      ...formulario,
                      anhos_de_experiencia: value,
                    });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>

              <div>
                <label htmlFor="educationLevel" className="block text-sm font-medium text-gray-700">
                  Nivel Educativo
                </label>
                <select
                  id="educationLevel"
                  name="educationLevel"
                  defaultValue={formulario.id_tiponiveleducativo}
                  onChange={(e) => {
                    const value = e.target.value;
                    setFormulario({
                      ...formulario,
                      id_tiponiveleducativo: value,
                    });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="" disabled>Seleccione</option>
                  <option value="1">Licenciatura</option>
                  <option value="2">Maestría</option>
                  <option value="3">Doctorado</option>
                  <option value="4">Otro</option>
                </select>
              </div>
            </div>

            {/* Sección de cursos asignados */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Cursos Asignados</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="courseName" className="block text-sm font-medium text-gray-700">
                    Nombre del Curso
                  </label>
                  <input
                    type="text"
                    id="courseName"
                    name="courseName"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>

                <div>
                  <label htmlFor="courseSchedule" className="block text-sm font-medium text-gray-700">
                    Horario del Curso
                  </label>
                  <input
                    type="text"
                    id="courseSchedule"
                    name="courseSchedule"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>

                <div>
                  <label htmlFor="courseDuration" className="block text-sm font-medium text-gray-700">
                    Duración del Curso (horas)
                  </label>
                  <input
                    type="number"
                    id="courseDuration"
                    name="courseDuration"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>
              </div>
            </div>

            {/* Sección de notas adicionales */}
            <div className="mt-6">
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Notas Adicionales
              </label>
              <textarea
                id="notes"
                name="notes"
                rows="3"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              ></textarea>
            </div>

            {/* Botones de acción */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => closeRegisterModal()}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => onGuardar()}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}