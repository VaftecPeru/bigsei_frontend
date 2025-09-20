import { useState, useEffect } from "react";
import { Api_Global_Estudiante } from "../../../../services/EstudianteApi";
import apiClient from "../../../../Utils/apiClient";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

function ModalVerGrabacion({ clickClose, tema }) {
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState([]);

  const handleVideos = () => {
    setIsLoading(true);
    apiClient.get(Api_Global_Estudiante.miAcademicoPeriodoVideos.listar({
      per_page: 15,
      page: 1,
    }, tema.id_periodotema))
      .then((response) => {
        setIsLoading(false);
        const data = response.data.data.map(item => {
          let youtubeID = null;
          if (item.url) {
            const index = item.url.indexOf("watch?v=");
            if (index > -1) {
              youtubeID = item.url.substring(index + 8);
            }
          }

          return {
            ...item,
            youtubeID: youtubeID,
          };
        });
        setVideos(data);
      })
      .catch((error) => {
        setIsLoading(false);
        setVideos([]);
        toast.warning(error.response.data);
      });
  };

  useEffect(() => {
    handleVideos();
  },[]);

  return (
    <div
      className="fixed inset-0 h-full z-50 w-full backdrop-blur-[3px] bg-black/10 grid place-items-center"
    >
      <div
        className="rounded-md bg-white border border-gray-200 flex flex-col max-w-md h-[70%] xs:w-full md:w-[90%] overflow-hidden"
      >
        <div className="flex relative items-center justify-between w-full p-6">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="red"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-file-video"
            >
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="m10 11 5 3-5 3v-6Z" />
            </svg>
            <div>
              <h2 className="text-lg font-bold text-blue-900 ml-2">VER GRABACIÓN</h2>
              <p className="text-xs text-black text-center">SEMANA {tema.fecha}</p>
            </div>
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
            <span className="sr-only">Cerrar</span>
          </button>
        </div>
        <hr />

        {videos.length ? (
          videos.map(item => (
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
              {/* <video
                controls
                className="w-full h-full object-cover"
                src={grabacion.url}
              >
                Tu navegador no soporta la reproducción de video.
              </video> */}
              {item.youtubeID !== null ? (
                <iframe className="video"
                  style={{width: "100%", height: "100%"}}
                  title="Youtube player"
                  sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
                  src={`https://youtube.com/embed/${item.youtubeID}?autoplay=0`}>
                </iframe>
              ) : (
                <div className="text-ls text-center text-white font-light py-12" style={{fontWeight: "bold"}}>
                  No hay video encontrado.
                </div>
              )}
            </div>

            <div className="mt-4 flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <span className="block w-24 text-end font-medium">Nombre:</span>
                <p className="flex-1 text-black">{item.nombre}</p>
              </div>

              <div className="flex gap-2">
                <span className="block w-24 text-end font-medium">Descripción:</span>
                <p className="flex-1 text-black">{item.descripcion}</p>
              </div>

              <div className="flex gap-2 items-center">
                <span className="block w-24 text-end font-medium">Fecha:</span>
                <p className="flex-1 text-black" style={{textTransform: "capitalize"}}>{item.fecha_full}</p>
              </div>

              {/* <div className="flex gap-2 items-center">
                <span className="block w-24 text-end font-medium">Tiempo:</span>
                <p className="flex-1 text-black">{grabacion.tiempo}</p>
              </div> */}
            </div>
          </div>
          ))
        ) : (
          <div className="text-ls text-center text-blue font-light py-12" style={{fontWeight: "bold"}}>
            No hay documentos subidos.
          </div>
        )}

        <div className="flex justify-end gap-4 p-6 border-t border-gray-200">
          <button
            onClick={clickClose}
            className="text-blue-900 font-bold rounded-xl border-2 border-blue-900 hover:bg-blue-900 hover:text-white px-6 py-2 text-sm"
            disabled={isLoading}
          >
            {isLoading ? <ClipLoader color="#1e3a8a" size={20} /> : "CERRAR"}
          </button>
          {/* <button
            onClick={() => {
              const link = document.createElement("a");
              link.href = grabacion.url;
              link.download = grabacion.nombre;
              link.click();
            }}
            className="bg-blue-900 text-white font-bold rounded-xl border-2 border-blue-900 hover:bg-blue-800 px-6 py-2 text-sm"
          >
            DESCARGAR
          </button> */}
        </div>
      </div>
    </div>
  );
}

export default ModalVerGrabacion;