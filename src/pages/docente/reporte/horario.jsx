import React, {useEffect, useState} from 'react';
import { Calendar, CalendarDays } from 'lucide-react';
import GradesTable from '@/components/tables/GradesTable';
import DownloadButton from '@/components/ui/DownloadButton';
import CalendarNew from '@/components/dashboard/CalendarNew';
import { Api_Global_Docente } from "../../../services/DocenteApi";
import apiClient from "../../../Utils/apiClient";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

function Horario() {
  const [isLoading, setIsLoading] = useState(false);
  const [periodos, setPeriodos] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [idPeriodoSelected, setIdPeriodoSelected] = useState("");
  const colors = [
    {
      backgroundColor: "#D6E4FF",
      borderColor: "#85AFFF",
    },
    {
      backgroundColor: "#D0F0C0",
      borderColor: "#85C785",
    },
  ];
  const fechaDefault = "2024-11-";
  const diaIni = 17;

  const handleEventClick = (info) => {
    alert(`Evento clickeado: ${info.event.title}`);
  };

  const handlePeriodos = () => {
    apiClient.get(Api_Global_Docente.academicoPeriodos.listar({
      per_page: 15,
      page: 1,
    }))
      .then((response) => {
        setPeriodos(response.data.data);
      })
      .catch((error) => {
        toast.warning(error.response.data);
        setPeriodos([]);
      });
  };

  const handleHorarios = () => {
    setIsLoading(true);
    apiClient.get(Api_Global_Docente.academicoPeriodoHorarios.listar({
      per_page: 15,
      page: 1,
    }, idPeriodoSelected))
      .then((response) => {
        setIsLoading(false);
        const data = response.data.data.map(item => {
          return {
            title: item.curso_nombre,
            start: fechaDefault + (diaIni+item.id_dia) + "T" + item.hora_inicio,
            end: fechaDefault + (diaIni+item.id_dia) + "T" + item.hora_fin,
            backgroundColor: "#D0F0C0",
            borderColor: "#85C785",
          };
        });
        setHorarios(data);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
        setHorarios([]);
      });
  };

  useEffect(() => {
    handlePeriodos();
  },[]);

  useEffect(() => {
    if (idPeriodoSelected != "") handleHorarios();
  },[idPeriodoSelected]);

  return (
    <div className="flex flex-col justify-start items-center min-h-screen text-lg w-full bg-sky-50 p-6">
      <div className="w-full max-w-7xl p-4">
        <div className="flex justify-end items-center text-sm text-gray-500">
          <span>
            <a href="#" className="hover:underline">
              Iaion &gt; Menú &gt; Cursos
            </a>
          </span>
        </div>
      </div>

      {/* Principal aqui esta los card mas la tabla */}
      <div className="max-w-7xl w-full shadow-md rounded-lg bg-white">
        <div className="flex items-center justify-between border-b p-4">
          <div className='flex gap-x-2'>
            <img src="/img/icons/calendar-2.svg" alt="" />
            <h2 className="text-base font-semibold">
              Reporte de horario
            </h2>
          </div>
          <div>
            <DownloadButton 
              label="Descargar" 
            />
          </div>
        </div>

        <div className="mt-3 mb-3 mr-2 ml-2">
          <div style={{textAlign: "center"}}>
            <select className="border border-gray-300 rounded-md p-2 text-[14px] ml-auto"
              name="id_periodo"
              value={idPeriodoSelected}
              onChange={(e) => setIdPeriodoSelected(e.target.value)}
            >
              <option value="">--Seleccione periodo--</option>
              {periodos.map((item, index) => (
                <option value={item.id_periodo}>{item.nombre}</option>
              ))}
            </select>
            {isLoading ? <ClipLoader color="#374151" size={20} /> : ""}
          </div>
        </div>

        <hr />

        <div className="">
          <CalendarNew events={horarios} onEventClick={handleEventClick} />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Horario;