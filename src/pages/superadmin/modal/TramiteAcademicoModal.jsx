import { useState } from "react";

export default function TramiteAcademicoModal({ isOpen, onClose }) {
  const [photo, setPhoto] = useState(null);

  if (!isOpen) return null;

  const closeRegisterModal = () => {
    console.log("ist");
    onClose();
  };

  const closeOutModal = (event) => {
    const isOut = event.target.getAttribute("data-isOut");
    if (isOut) {
      closeRegisterModal();
    }
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPhoto(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div
        className="bg-gray-200 flex justify-center items-center fixed inset-0 z-50 h-full w-full p-6"
        onClick={(event) => closeOutModal(event)}
        style={{ background: "#4d4d4d21", backdropFilter: "blur(10px)" }}
        id="register-modal"
        data-isOut="true"
      >
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg relative overflow-auto">
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
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Registrar tramites</h1>

            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Nombre y apellido
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Matricula
                  </label>
                  <input
                    type="text"
                    id="matricula"
                    name="matricula"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    Tipo Tramite
                  </label>
                  <select
                    id="status"
                    name="status"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option>Tramite 1</option>
                    <option>Tramite 2</option>
                    <option>Tramite 3</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="fsolicitud" className="block text-sm font-medium text-gray-700">
                    Fecha de solicitud
                  </label>
                  <input
                    type="date"
                    id="fsolicitud"
                    name="fsolicitud"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  />
                </div>

                <div>
                  <label htmlFor="estado" className="block text-sm font-medium text-gray-700">
                    Estado
                  </label>
                  <select
                    id="estado"
                    name="estado"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                  >
                    <option>Activo</option>
                    <option>Inactivo</option>
                    <option>Otro</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => closeRegisterModal()}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}