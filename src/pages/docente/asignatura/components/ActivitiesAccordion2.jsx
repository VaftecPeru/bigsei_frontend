import React, { useState, useEffect } from 'react';
import { Exam_icon, FlechaBajo_icon } from '@/pages/docente/asignatura/docente_icons';
import { Api_Global_Docente } from "../../../../services/DocenteApi";
import apiClient from "../../../../Utils/apiClient";
import TemaModal from "./TemaModal";
import ModalTarea from "./ModalTarea";
import ModalPresentacion from "./ModalPresentacion";
import ModalCuestionario from "./ModalCuestionario";
import ModalSubirGrabacion from "./ModalSubirGrabacion";

function ActivitiesAccordion2({ setIsActiveModal, modulo }) {
  const [openWeeks, setOpenWeeks] = useState({});
  const [isActivityOpen, setIsActivityOpen] = useState(false);
  const [isOpenTemaModal, setIsOpenTemaModal] = useState(false);
  const [semanas, setSemanas] = useState([]);
  const [tema, setTema] = useState(null);
  const [isOpenTareaModal, setIsOpenTareaModal] = useState(false);
  const [isOpenPresentacionModal, setIsOpenPresentacionModal] = useState(false);
  const [isOpenCuestionarioModal, setIsOpenCuestionarioModal] = useState(false);
  const [isOpenSubirGrabacionModal, setIsOpenSubirGrabacionModal] = useState(false);

  // Función para manejar el clic en una semana
  const handleWeekClick = (weekId) => {
    setOpenWeeks((prev) => ({
      ...prev,
      [weekId]: !prev[weekId], 
    }));
  };

  const handleActivityClick = () => {
    setIsActivityOpen((prev) => !prev); 
    if (isActivityOpen) {
      setOpenWeeks({});
    }
  };

  const handleOpenModals = (opcion, value) => {
    switch(opcion) {
      case "tarea":
        setTema(value);
        setIsOpenTareaModal(true);
        break;
      case "presentacion":
        setTema(value);
        setIsOpenPresentacionModal(true);
        break;
      case "cuestionario":
        setTema(value);
        setIsOpenCuestionarioModal(true);
        break;
      case "subir-grabacion":
        setTema(value);
        setIsOpenSubirGrabacionModal(true);
        break;
    }
  };

  const handleTemas = () => {
    apiClient.get(Api_Global_Docente.academicoPeriodoTemas.listar({
      per_page: 15,
      page: 1,
    }, modulo.id_periodomodulo))
      .then((response) => {
        setSemanas(response.data.data);
      })
      .catch((error) => {
        setSemanas([]);
      });
  };

  useEffect(() => {
    handleTemas();
  },[]);

  return (
    <>
      <div
          className="w-[100%] flex items-center cursor-pointer relative transition duration-200 rounded rounded-md h-[60px] hover:bg-green-200 overflow-hidden"
          onClick={handleActivityClick} 
      >
        <span className="flex bg-green-500 absolute left-0 top-0 h-full w-[4px] rounded rounded-full"></span>
        <div className="w-full flex justify-between px-4 items-center">
          <div className="flex flex-col">
            <p className="font-bold text-xl" style={{ color: "#307b4a" }}>
              {modulo?.titulo}
            </p>
            <p className="text-sm" style={{ color: "#2b7244" }}>
              {modulo?.descripcion}
            </p>
          </div>

          <div
            className="transition duration-200 transition-all"
            style={{
              height: "26px",
              width: "26px",
              transform: isActivityOpen ? "rotate(180deg)" : "rotate(0deg)", 
            }}
          >
            <FlechaBajo_icon></FlechaBajo_icon>
          </div>
        </div>
      </div>
      {isActivityOpen && (
        <div className="mb-2 mt-2 mr-2 ml-2">
          <span
            className="w-full h-full pt-1 pb-1 pr-2 pl-1 cursor-pointer bg-black text-white hover:bg-gray-100 hover:text-black transition duration-200 rounded-full flex items-center justify-center w-[40px] h-[40px]"
            onClick={(e) => setIsOpenTemaModal(true)}
          >
            + Nuevo
          </span>
        </div>
      )}

      {isActivityOpen && semanas.map((semana, index) => (
        <React.Fragment key={semana.id_periodotema}>
          <div className="w-[90%] bg-purple-300 h-[50px] transition duration-200 transition-all">
            <div className="w-full bg-purple-50 h-full" onClick={() => handleWeekClick(semana.id_periodotema)}>
              <div className="w-full flex items-center cursor-pointer relative transition duration-200 rounded rounded-md h-full hover:bg-purple-200 py-2 overflow-hidden">
                <span className="flex bg-purple-500 absolute left-0 top-0 h-full w-[4px] rounded rounded-full"></span>
                <div className="w-full flex justify-between px-4 items-center">
                  <div className="flex flex-col">
                    <p className="font-bold text-sm text-purple-500">
                      Semana {index + 1} - {semana.titulo}
                    </p>
                    <p className="text-sm" style={{ color: "#2b7244" }}>
                      {semana.fecha}
                    </p>
                  </div>
                  <div
                    className="h-[20px] w-[20px] transition-transform duration-200"
                    style={{
                      transform: openWeeks[semana.id_periodotema] ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  >
                    <FlechaBajo_icon></FlechaBajo_icon>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {openWeeks[semana.id_periodotema] && (
            <div className="transition duration-200 transition-all w-[90%] px-4 flex flex-col gap-4 items-end py-2 rounded rounded-md"
              style={{
                border: "1px solid #6d6dff",
                overflow: "hidden",
              }}
            >
              <div className="w-full flex justify-between items-center">
                <div className="flex items-center justify-center">
                  <div
                    className="h-[37px] w-[37px] p-2 rounded-full bg-gray-300
                    cursor-pointer transition-all duration-200
                    hover:bg-gray-100 hover:border hover:border-blue-200"
                  >
                    <Exam_icon></Exam_icon>
                  </div>
                  <div className="ml-4">
                    <span className="text-base">Tarea</span>
                    <br />
                    <span className="text-xs">Realizar estructura de control (PPT)</span>
                  </div>
                </div>
                <span
                  className="h-[28px] w-[50px] flex justify-center items-center
                  border border-blue-500 rounded-sm px-8 text-sm font-bold cursor-pointer
                  transition-all duration-100 bg-white hover:bg-blue-800 hover:text-white"
                  onClick={() => handleOpenModals("tarea", semana)}
                >
                  VER
                </span>
              </div>

              <div className="w-full flex justify-between items-center">
                <div className="flex items-center justify-center">
                  <div
                    className="h-[37px] w-[37px] p-2 rounded-full bg-gray-300
                    cursor-pointer transition-all duration-200
                    hover:bg-gray-100 hover:border hover:border-blue-200"
                  >
                    <Exam_icon></Exam_icon>
                  </div>
                  <div className="ml-4">
                    <span className="text-base">Subir documento</span>
                    <br />
                    <span className="text-xs">Realizar estructura de control (PPT)</span>
                  </div>
                </div>
                <span
                  className="h-[28px] w-[50px] flex justify-center items-center
                  border border-blue-500 rounded-sm px-8 text-sm font-bold cursor-pointer
                  transition-all duration-100 bg-white hover:bg-blue-800 hover:text-white"
                  onClick={() => handleOpenModals("presentacion", semana)}
                >
                  VER
                </span>
              </div>

              <div className="w-full flex justify-between items-center">
                <div className="flex items-center justify-center">
                  <div
                    className="h-[37px] w-[37px] p-2 rounded-full bg-gray-300
                    cursor-pointer transition-all duration-200
                    hover:bg-gray-100 hover:border hover:border-blue-200"
                  >
                    <Exam_icon></Exam_icon>
                  </div>
                  <div className="ml-4">
                    <span className="text-base">Cuestionario</span>
                    <br />
                    <span className="text-xs">Realizar estructura de control (PPT)</span>
                  </div>
                </div>
                <span
                  className="h-[28px] w-[50px] flex justify-center items-center
                  border border-blue-500 rounded-sm px-8 text-sm font-bold cursor-pointer
                  transition-all duration-100 bg-white hover:bg-blue-800 hover:text-white"
                  onClick={() => handleOpenModals("cuestionario", semana)}
                >
                  VER
                </span>
              </div>

              <div className="w-full flex justify-between items-center">
                <div className="flex items-center justify-center">
                  <div
                    className="h-[37px] w-[37px] p-2 rounded-full bg-gray-300
                    cursor-pointer transition-all duration-200
                    hover:bg-gray-100 hover:border hover:border-blue-200"
                  >
                    <Exam_icon></Exam_icon>
                  </div>
                  <div className="ml-4">
                    <span className="text-base">Grabación</span>
                    <br />
                    <span className="text-xs">Última clase {semana.fecha}</span>
                  </div>
                </div>
                <span
                  className="h-[28px] w-[50px] flex justify-center items-center
                  border border-blue-500 rounded-sm px-8 text-sm font-bold cursor-pointer
                  transition-all duration-100 bg-white hover:bg-blue-800 hover:text-white"
                  onClick={() => handleOpenModals("subir-grabacion", semana)}
                >
                  VER
                </span>
              </div>
            </div>
          )}
        </React.Fragment>
      ))}

      {isOpenTemaModal && <TemaModal onClose={() => {
        handleTemas();
        setIsOpenTemaModal(false);
      }} idPeriodomodulo={modulo.id_periodomodulo} />}

      {isOpenTareaModal && (
        <ModalTarea clickClose={() => setIsOpenTareaModal(false)} tema={tema} />
      )}
      {isOpenPresentacionModal && (
        <ModalPresentacion clickClose={() => setIsOpenPresentacionModal(false)} tema={tema} />
      )}
      {isOpenCuestionarioModal && (
        <ModalCuestionario clickClose={() => setIsOpenCuestionarioModal(false)} tema={tema} />
      )}
      {isOpenSubirGrabacionModal && (
        <ModalSubirGrabacion clickClose={() => setIsOpenSubirGrabacionModal(false)} tema={tema} />
      )}
    </>
  );
}

export default ActivitiesAccordion2;