import { useContext, useState, useRef, createContext, useEffect } from "react";
import { AsignaturaContext } from "./page.jsx";
import NavBar from "./components/navBar.jsx";
import Perfil from "./components/perfil.jsx";
import {
  ModalConfirm,
  ModalCreateClass,
  ModalConnectToClass,
} from "./Modales_docenteContent.jsx";
import ActivitiesAccordion2 from "./components/ActivitiesAccordion2.jsx";
import { Api_Global_Docente } from "../../../services/DocenteApi";
import apiClient from "../../../Utils/apiClient";
import ModalEvaluacionCriterio from "./components/ModalEvaluacionCriterio.jsx";

export const DocenteContext = createContext();

function Exam_icon() {
  return (
    <span className="w-full h-full flex items-center justify-center">
      <img
        className="h-full w-full"
        src="/img/exam_new_icon.png"
        alt="Exam icon"
      />
    </span>
  );
}

export const Tema = ({ icon, title, subTema, clickShowModal }) => {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="flex items-center justify-center">
        <div
          className="h-[37px] w-[37px] p-2 rounded-full bg-gray-300
          cursor-pointer transition-all duration-200
          hover:bg-gray-100 hover:border hover:border-blue-200"
        >
          {icon}
        </div>
        <div className="ml-4">
          <span className="text-base">{title}</span>
          <br />
          <span className="text-xs">{subTema}</span>
        </div>
      </div>
      <span
        className="h-[28px] w-[50px] flex justify-center items-center
        border border-blue-500 rounded-sm px-8 text-sm font-bold cursor-pointer
        transition-all duration-100 bg-white hover:bg-blue-800 hover:text-white"
        onClick={clickShowModal}
      >
        VER
      </span>
    </div>
  );
};

const Actividades_otherCards_modulo = ({ modulo }) => {
  const { isActiveModal, setIsActiveModal } = useContext(DocenteContext);

  const [isOpenModule, setIsOpenModule] = useState(false);
  const [isOpenTema, setIsOpenTema] = useState(false);

  const moduloDocenteRef = useRef();
  const temaRef = useRef();

  const handleClick = () => {
    if (isOpenModule) {
      moduloDocenteRef.current.style.height = "50px";
    } else {
      moduloDocenteRef.current.style.height = "0px";
      moduloDocenteRef.current.style.overflow = "hidden";
      setIsOpenTema(false);
    }
    setIsOpenModule((prev) => !prev);
  };

  const clickWeek = () => {
    if (isOpenTema) {
      temaRef.current.style.height = "100%";
      temaRef.current.style.padding = "0.5rem 1rem";
      temaRef.current.style.border = "1px solid rgb(109, 109, 255)";
    } else {
      temaRef.current.style.height = "0px";
      temaRef.current.style.padding = "0";
      temaRef.current.style.border = "none";
    }
    setIsOpenTema((prev) => !prev);
  };

  return (
    <div className="w-[90%] bg-green-50 flex flex-col items-end justify-center mb-2 transition-all duration-200">
      <ActivitiesAccordion2
        handleClick={handleClick}
        isOpenModule={isOpenModule}
        moduloDocenteRef={moduloDocenteRef}
        clickWeek={clickWeek}
        temaRef={temaRef}
        setIsActiveModal={setIsActiveModal}
        modulo={modulo}
      />
    </div>
  );
};

const Actividades_otherCards = () => {
  const { isActiveModal, setIsActiveModal } = useContext(DocenteContext);
  const { idPeriodocurso } = useContext(AsignaturaContext);
  const [isModalEvalOpen, setIsModalEvalOpen] = useState(false);
  const [curso, setCurso] = useState(null);
  const [modulos, setModulos] = useState([]);

  const openEvalModal = () => {
    setIsModalEvalOpen(true);
  };

  const handleCurso = () => {
    apiClient.get(Api_Global_Docente.academicoPeriodoCursos.mostrar(idPeriodocurso))
      .then((response) => {
        setCurso(response.data);
      })
      .catch((error) => {
        setCurso(null);
      });
  };

  const handleModulos = () => {
    apiClient.get(Api_Global_Docente.academicoPeriodoModulos.listar({
      per_page: 15,
      page: 1,
    }, idPeriodocurso))
      .then((response) => {
        setModulos(response.data.data);
      })
      .catch((error) => {
        setModulos([]);
      });
  };

  useEffect(() => {
    handleCurso();
    handleModulos();
  },[idPeriodocurso]);
 
  return (
    <div className="w-full flex flex-col md:flex-row gap-8 md:justify-between md:p-4">
      <div className="w-[100%] md:w-[35%] flex flex-col gap-6">
        <div className="w-full bg-white px-6 py-8 flex flex-col rounded-xl border border-blue-300">
          <h2 className="font-bold text-xl">{curso?.curso_nombre} - {curso?.curso_codigo}</h2>
          <div className="self-center my-6 text-gray-500">
            <p>
              <span style={{fontWeight: "bold"}}>Periodo: </span>
              {curso?.periodo_nombre}.
            </p>
            Ingresa a la clase de {curso?.curso_nombre} y presta atención. ¡Únete via Zoom!
          </div>
          <div className="self-center">
            <img src="/img/zoom_image.png" alt="Zoom" />
          </div>
          <div
            className="bg-black text-white px-2 py-4 rounded-xl font-bold text-center mt-14 cursor-pointer"
            onClick={() => setIsActiveModal("connectToClass")}
          >
            Conectarse
          </div>
        </div>
        <div className="bg-white px-6 py-4 rounded-xl py-14 border border-blue-300">
          <h2 className="font-bold text-2xl text-center">Sin módulos programadas</h2>
          <div 
             className="bg-black text-white px-2 py-4 rounded-xl font-bold text-center mt-14 cursor-pointer"
            onClick={() => setIsActiveModal("createClass")}
          >
            Crear Módulo
          </div>
        </div>

        <div className="bg-white px-6 py-4 rounded-xl py-14 border border-blue-300">
          <h2 className="font-bold text-2xl text-center">Criterios de evaluación</h2>
          <div 
             className="bg-black text-white px-2 py-4 rounded-xl font-bold text-center mt-14 cursor-pointer"
             onClick={() => openEvalModal()}
          >
            Crear
          </div>
        </div>
      </div>

      <div className="w-[100%] md:w-[45%] bg-white rounded-lg px-4 pt-0 pb-24 border border-blue-300">
        <div className="p-6 flex justify-between bg-white rounded-xl mb-8">
          <span style={{ fontSize: "25px", fontWeight: "700" }}>Módulos</span>
          <div className="relative" style={{ fontSize: "40px", lineHeight: ".9" }}>
            <span
              className="w-full h-full cursor-pointer hover:bg-gray-100 transition duration-200 rounded-full flex items-center justify-center w-[40px] h-[40px]"
              onClick={() => setIsActiveModal("createClass")}
            >
              +
            </span>
          </div>
        </div>

        <div className="w-[95%] ml-8 flex flex-col gap-2 max-h-[450px] overflow-y-auto">
          {modulos.map((item, index) => (
            <Actividades_otherCards_modulo modulo={item}/>
          ))}
        </div>
      </div>

      {isActiveModal === "confirm" && (
        <ModalConfirm
          clickConfirm={() => setIsActiveModal("createClass")}
          clickVolver={() => setIsActiveModal(null)}
        />
      )}
      {isActiveModal === "createClass" && (
        <ModalCreateClass
          clickClose={() => {
            setIsActiveModal(null);
            handleModulos();
          }}
          idPeriodocurso={idPeriodocurso} />
      )}
      {isActiveModal === "connectToClass" && (
        <ModalConnectToClass clickClose={() => setIsActiveModal(null)} />
      )}

      {isModalEvalOpen && (
        <ModalEvaluacionCriterio onClose={() => setIsModalEvalOpen(false)} idPeriodocurso={idPeriodocurso} />
      )}
    </div>
  );
};

// Resto del código (Actividades, Clase, DocenteContent) permanece igual.

function Actividades() {
  const { idPeriodocurso } = useContext(AsignaturaContext);

  return (
    <div className="h-full w-full  flex justify-around flex-wrap gap-6">
      <div className="flex flex-row bg-white rounded-2xl p-8 border border-blue-300 w-full lg:w-[36%]">
        <div className="flex flex-col justify-center px-4">
          <div className="font-bold text-lg">Asistencia</div>
          <span className="font-bold text-6xl">70%</span>
        </div>

        <div className="flex items-end ml-3">
          <span className="text-lg text-gray-500">Clases asistidas 10 de 16</span>
        </div>
      </div>

      <div className="flex flex-row bg-white rounded-2xl p-8 border border-blue-300 w-full lg:w-[45%]">
        <div className="flex flex-col justify-center px-4">
          <div className="font-bold text-lg">Entregas</div>
          <span className="font-bold text-6xl">100%</span>
        </div>

        <div className="flex items-end ml-3">
          <span className="text-lg text-gray-500">Entregas completadas 2 de 2</span>
        </div>
      </div>


      <Actividades_otherCards></Actividades_otherCards>

    </div>
  );
}

//este es la vista CLase por defecto
export function Clase() {
  return (
    <div className="bg-white">
      <div className="w-full px-2 py-8">
        <Actividades></Actividades>
      </div>
    </div>
  );
}

export default function DocenteContent(data) {
  const { setIsClickledCard_docente, vistaComponente } =
    useContext(AsignaturaContext);

  const [isActiveModal, setIsActiveModal] = useState(false); //va a tener 2 modales ... "confirm" , "createClass"
  const [perfil, setPerfil] = useState(null);

  const clickFlechaLeft = () => {
    setIsClickledCard_docente(false);
  };

  const getCurso = () => {
    apiClient.get(Api_Global_Docente.academicoPeriodoCursos.mostrar(data.idPeriodocurso))
      .then((response) => {
        setPerfil(response.data);
      })
      .catch((error) => {
        setPerfil(null);
      });
  };

  useEffect(() => {
    if (data?.idPeriodocurso) {
      getCurso(data?.idPeriodocurso);
    }
  }, [data?.idPeriodocurso]);

  return (
    <DocenteContext.Provider value={{ isActiveModal, setIsActiveModal }}>
      <div className="h-full w-full overflow-hidden">
        <Perfil perfil={perfil} onGoBack={clickFlechaLeft}></Perfil>
        <NavBar></NavBar>
        {vistaComponente}
      </div>
    </DocenteContext.Provider>
  );
}