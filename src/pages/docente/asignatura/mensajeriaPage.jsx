import { useState, useEffect, useContext, useRef } from "react";
import { PaperclipIcon as PaperClipIcon, SmileIcon as FaceSmileIcon, ImageIcon, FileTypeIcon as DocumentIcon, ChevronRightIcon } from "lucide-react";
import { AsignaturaContext } from "./page.jsx";
import { Api_Global_Docente } from "../../../services/DocenteApi";
import apiClient from "../../../Utils/apiClient";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

function Forum({idPeriodocurso}) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [grupo, setGrupo] = useState(null);
  const [personas, setPersonas] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const targetRef = useRef(null);
  const targetRef2 = useRef(null);

  const handleGrupo = () => {
    apiClient.get(Api_Global_Docente.mensajeriaGrupos.listar({
      per_page: 15,
      page: 1,
    }, idPeriodocurso, "1"))
      .then((response) => {
        if (response.data.data.length > 0) {
          setGrupo(response.data.data[0]);
        }
      })
      .catch((error) => {
        setGrupo(null);
      });
  };

  const handlePersonas = () => {
    apiClient.get(Api_Global_Docente.mensajeriaPersonas.listar({
      per_page: 15,
      page: 1,
    }, grupo.id_mensajeriagrupo))
      .then((response) => {
        setPersonas(response.data.data);
      })
      .catch((error) => {
        setPersonas([]);
      });
  };

  const handleMensajes = () => {
    apiClient.get(Api_Global_Docente.mensajeriaMensajes.listar({
      per_page: 500,
      page: 1,
    }, grupo.id_mensajeriagrupo, ""))
      .then((response) => {
        setMensajes(response.data.data);
        scrollToFooter();
      })
      .catch((error) => {
        setMensajes([]);
      });
  };

  const handleSaveMensaje = () => {
    if (!grupo) {
      toast.warning("¡Atención! Grupo no encontrado");
      return ;
    }
    const data = {
      texto: message,
      id_mensajeriagrupo: grupo.id_mensajeriagrupo,
    };
    setIsLoading(true);
    apiClient.post(Api_Global_Docente.mensajeriaMensajes.registrar(), data)
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        setMessage("");
        handleMensajes();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const scrollToFooter = () => {
    setTimeout(() => {
      targetRef2.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
      targetRef.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }, 700);
  };

  useEffect(() => {
    if (grupo) {
      handlePersonas();
      handleMensajes();
    }
  },[grupo]);

  useEffect(() => {
    handleGrupo();
  },[]);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 border-r bg-gray-50
          hidden
          md:flex
        ">
          <div className="p-4">
            <div className="flex items-center space-x-3 p-3 bg-blue-100 rounded-lg">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">F</div>
              <div>
                <h3 className="font-medium">Foro</h3>
                <p className="text-sm text-gray-500">{grupo?.nombre}</p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              {personas.map((item, index) => (
                <ParticipantItem
                  letter={item.persona_nombre ? item.persona_nombre.charAt(0) : "X"}
                  name={item.persona_nombre}
                  time={item.mensaje_hora_ff}
                  bgColor="bg-yellow-200"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col" ref={targetRef}>
          <div className="flex-1 p-4 overflow-y-auto">
            {mensajes.map((item, index) => (
              <div className="flex items-start space-x-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                  {item.persona_nombre ? item.persona_nombre.charAt(0) : "X"}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{item.persona_nombre}</span>
                    <span className="text-sm text-gray-500">
                      <span style={{textTransform: "capitalize"}}> {item.mensaje_dia_ff} </span>
                      <span> {item.mensaje_hora_ff} </span>
                    </span>
                  </div>
                  <div className="mt-1 p-2 bg-gray-100 rounded-lg">
                    <div className="flex items-center space-x-2">
                      {item.texto}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div id="footer_mensajeria" ref={targetRef2}> </div>
          </div>

          <div className="border-t p-4">
            <div className="flex items-end space-x-2">
              <div className="flex-1 bg-gray-100 rounded-lg p-2">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escrieb tu mensaje"
                  className="w-full bg-transparent outline-none"
                  rows="1"
                ></textarea>
              </div>
              <div className="flex space-x-2">
                <ActionButton Icon={FaceSmileIcon} />
                <ActionButton Icon={ImageIcon} />
                <ActionButton Icon={DocumentIcon} />
                <ActionButton Icon={PaperClipIcon} />
                <button
                  type="button"
                  onClick={handleSaveMensaje}
                  className="p-2 bg-blue-500 text-white rounded-lg">
                  {isLoading ? <ClipLoader color="#1e3a8a" size={20} /> : <ChevronRightIcon className="w-5 h-5" />}
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



function ParticipantItem({ letter, name, message, time, bgColor }) {
  return (
    <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100">
      <div className={`w-8 h-8 ${bgColor} rounded-full flex items-center justify-center`}>
        {letter}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-medium truncate">{name}</h4>
        {message && <p className="text-sm text-gray-500 truncate">{message}</p>}
      </div>
      <span className="text-xs text-gray-500">{time}</span>
    </div>
  );
}

function ActionButton({ Icon }) {
  return (
    <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100">
      <Icon className="w-5 h-5" />
    </button>
  );
}

export default function MensajeriaPage() {
  const { idPeriodocurso } = useContext(AsignaturaContext);

  return (
    <div className="h-full w-full overflow-hidden p-6">
      <Forum idPeriodocurso={idPeriodocurso}></Forum>
    </div>
  );
}