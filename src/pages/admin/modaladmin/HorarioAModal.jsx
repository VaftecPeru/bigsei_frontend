import { CalendarDays, PlusIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Api_Global_Admin } from "../../../services/AdminApi";
import apiClient from "../../../Utils/apiClient";
import { getBgBorder } from "../../../Utils/Utils";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import CalendarAdmin from "../components/CalendarAdmin";
import HorarioDiaAModal from "./HorarioDiaAModal";

export default function HorarioAModal({ onClose, curso }) {
  const [isLoading, setLoading] = useState(false);
  const [isOpenDiaModal, setIsOpenDiaModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [lunes, setLunes] = useState();
  const [idPeriodohorarioEdit, setIdPeriodohorarioEdit] = useState(null);

  const handleEventClick = (info) => {
    setIdPeriodohorarioEdit(info.event.id);
    setIsOpenDiaModal(true);
  };

  const closePriceModal = () => {
    onClose();
  };

  const handleHorarios = () => {
    setLoading(true);
    apiClient.get(Api_Global_Admin.academicoPeriodoHorarios.listar({
      per_page: 50,
      page: 1,
    }, curso.id_periodo, curso.id_periodocurso))
      .then((response) => {
        setLoading(false);
        const data = response.data.data.map((item) => ({
          id: item.id_periodohorario,
          title: item.curso_nombre,
          start: item.fecha_inicio_ff,
          end: item.fecha_fin_ff,
          backgroundColor: getBgBorder(0).backgroundColor,
          borderColor: getBgBorder(0).borderColor,
        }));
        if (response.data.data.length > 0) {
          setLunes(response.data.data[0].lunes);
        }
        setEvents(data);
      })
      .catch((error) => {
        setLoading(false);
        setEvents([]);
        toast.warning(error.response.data);
      });
  };

  useEffect(() => {
    handleHorarios();
  }, []);

  return (
    <div
      className="bg-gray-200 flex justify-center items-start fixed inset-0 z-50 p-0 md:p-6"
      style={{ background: "#4d4d4d21", backdropFilter: "blur(10px)" }}
    >
      <div className="max-w-4xl bg-white rounded-lg shadow-lg relative overflow-auto">
        <button
          className="absolute right-4 top-4 text-white hover:text-white"
          onClick={() => closePriceModal()}
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
        <div className="bg-indigo-600 text-white p-4 rounded-t-lg">
          <h2 className="text-xl font-bold flex">
            <CalendarDays />
            <span className="ml-2">Registro horario</span>
          </h2>
        </div>

        <div className="p-4 max-h-[88vh] overflow-y-auto">
          <div className="mb-4 grid grid-cols-2 gap-3">
            <div className="grid grid-cols-2">
              <div style={{lineHeight: "0.85em"}}>
                <div className="block text-sm font-medium text-gray-700">Periodo:</div>
                <div className="text-gray-500">{curso?.periodo_nombre}</div>
              </div>
              <div style={{lineHeight: "0.65em"}}>
                <div className="block text-sm font-medium text-gray-700">Carrera:</div>
                <div className="text-gray-500">{curso?.carrera_nombre}</div>
              </div>
            </div>

            <div className="grid grid-cols-3">
              <div style={{lineHeight: "0.65em"}}>
                <div className="block text-sm font-medium text-gray-700">Ciclo:</div>
                <div className="text-gray-500">{curso?.ciclo_nombre}</div>
              </div>
              <div style={{lineHeight: "0.65em"}}>
                <div className="block text-sm font-medium text-gray-700">Curso:</div>
                <div className="text-gray-500">{curso?.curso_nombre}</div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={() => setIsOpenDiaModal(true)}
                  className="text-white flex w-28 h-9 bg-[#5CB85C] rounded-lg items-center justify-center gap-1"
                  title="Registrar día"
                >
                  {isLoading ? <ClipLoader color="#374151" size={20} /> : <PlusIcon />}
                </button>
              </div>
            </div>
          </div>
          <hr />

          <div className="">
            {events.length ? (
              <CalendarAdmin events={events} onEventClick={handleEventClick} initialDate={lunes} />
            ) : (
              <div className="py-24 text-center font-bold">
                Horario no encontrado.
                {isLoading ? <ClipLoader color="#ffffff" size={20} /> : ""}
              </div>
            )}
          </div>
        </div>

        {isOpenDiaModal && <HorarioDiaAModal
          onClose={() => {
            setIsOpenDiaModal(false);
            setIdPeriodohorarioEdit(null);
            handleHorarios();
          }}
          idPeriodocurso={curso.id_periodocurso}
          idPeriodohorarioEdit={idPeriodohorarioEdit}
        />}
      </div>
    </div>
  );
}