import { useState, useEffect } from "react";
import { Api_Global_Estudiante } from "../../../../services/EstudianteApi";
import { Api_Global_Setup } from "../../../../services/SetupApi";
import apiClient from "../../../../Utils/apiClient";
import { createFileUtil } from "../../../../Utils/Utils";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

function ModalPresentacion({ clickClose, tema }) {
  const [isLoading, setIsLoading] = useState(false);
  const [archivos, setArchivos] = useState([]);

  const handleDescargar = (item) => {
    setIsLoading(true);
    apiClient.get(Api_Global_Setup.archivos.descargar(item.id_archivo))
      .then((response) => {
        createFileUtil(response.data.url, response.data.nombre, response.data.extension);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleArchivos = () => {
    setIsLoading(true);
    apiClient.get(Api_Global_Estudiante.temaArchivos.listar({
      per_page: 15,
      page: 1,
    }, tema.id_periodotema))
      .then((response) => {
        setIsLoading(false);
        setArchivos(response.data.data);
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

      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg h-[500px] mx-4">
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
            <h2 className="text-lg font-medium text-blue-900">DOCUMENTOS DE LA PRESENTACIÓN</h2>
          </div>

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
          </button>
        </div>

        {archivos.length ? (
          archivos.map(item => (
            <div className="p-2">
              <p className="text-xs text-end text-blue font-light pt-4" style={{textTransform: "capitalize"}}>{item.fecha_full}</p>
              <div
                className="border border-gray-400 rounded-lg p-4"
              >
                <div className="flex items-center">
                  <div className="bg-gray-200 rounded-full p-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="purple" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file">
                      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                    </svg>
                  </div>
                  <div className="ml-2 flex-1">
                    <p className="text-sm font-medium">{item.nombre}</p>
                    <p className="text-xs text-gray-500">{parseInt((item.tamanho/1000), 10)} KB</p>
                  </div>
                  <button type="button" className="bg-blue-200 rounded-full p-2"
                    onClick={(e) => handleDescargar(item)}
                    disabled={isLoading}
                  >
                    {isLoading ? <ClipLoader color="#1e3a8a" size={20} /> :
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" x2="12" y1="15" y2="3" />
                      </svg>
                    }
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-ls text-center text-blue font-light pt-12" style={{fontWeight: "bold"}}>
            No hay documentos subidos.
          </div>
        )}

        <div>
          {/* <div className="mt-4 space-y-3">
            <div
              className="border border-gray-400 rounded-lg p-4 h-48"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div>
                <div className="ml-2 flex-1">
                  <p className="text-sm font-medium">Comentarios</p>
                </div>
                <div className="flex space-x-2 pt-4">
                  <img className="w-8 h-8" src="/img/perfil_imagen.png"></img>
                  <div className="bg-gray-200 rounded-xl px-4 py-2">
                    <p>That sounds great! I'm in, What time works for you</p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className="mt-8 w-72 mx-auto flex items-center border border-gray-300 rounded-xl shadow-lg p-2 overflow-hidden">
            <input
              type="text"
              placeholder="Escribir un comentario"
              className="flex-1 outline-none border-none w-full"
            />
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
              className="lucide lucide-paperclip ml-2 flex-shrink-0"
            >
              <path d="M13.234 20.252 21 12.3" />
              <path d="m16 6-8.414 8.586a2 2 0 0 0 0 2.828 2 2 0 0 0 2.828 0l8.414-8.586a4 4 0 0 0 0-5.656 4 4 0 0 0-5.656 0l-8.415 8.585a6 6 0 1 0 8.486 8.486" />
            </svg>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default ModalPresentacion;