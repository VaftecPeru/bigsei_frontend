import { useState, useEffect } from "react";
import { Api_Global_Docente } from "../../../../services/DocenteApi";
import apiFileClient from "../../../../Utils/apiFileClient";
import apiClient from "../../../../Utils/apiClient";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

function ModalPresentacion({ clickClose, tema }) {
  const [isLoading, setIsLoading] = useState(false);
  const [archivos, setArchivos] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
  };

  const handleArchivos = () => {
    apiClient.get(Api_Global_Docente.archivos.listar({
      per_page: 15,
      page: 1,
    }, {label: "id_periodotema", value: tema.id_periodotema}))
      .then((response) => {
        setArchivos(response.data.data);
      })
      .catch((error) => {
        toast.warning(error.response.data);
      });
  };

  const handleUpload = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id_periodotema', tema.id_periodotema);
    formData.append('tipo', 2);

    setIsLoading(true);
    apiFileClient.post(Api_Global_Docente.archivos.registrar(), formData)
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        handleArchivos();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleDelete = (data) => {
    setIsLoading(true);
    apiClient.delete(Api_Global_Docente.archivos.eliminar(data.id_archivo))
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        handleArchivos();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };
  
  useEffect(() => {
    handleArchivos();
  },[]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[3px]"
        aria-hidden="true"
      />

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
          <button className="text-blue-900 font-medium px-4 py-2 rounded-lg hover:bg-blue-50"
            onClick={() => clickClose()}
          >
            Cerrar
          </button>
        </div>

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
                .JPEG, PNG, PDF, and MP4 formats up to 16MB
              </p>
              <label>
              <span className="cursor-pointer bg-white text-gray-700 border border-black rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-400">
                {isLoading ? <ClipLoader color="#1e3a8a" size={20} /> : 'Browse File'}
              </span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    handleUpload(file);
                  }
                }}
              />
              </label>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {archivos.map((file) => (
              <div
                key={file.id_archivo}
                className="bg-gray-50 rounded-lg p-3 flex items-center"
              >
                <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                  <span className="text-xs font-medium text-red-700" style={{textTransform: 'uppercase'}}>{file.extension}</span>
                </div>

                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {file.nombre}
                  </p>
                  <p className="text-xs text-gray-500">Completado</p>
                </div>

                <button className="ml-4 text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                  onClick={() => handleDelete(file)}
                >
                  {isLoading ? <ClipLoader color="#1e3a8a" size={20} /> :
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
                  }

                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalPresentacion;