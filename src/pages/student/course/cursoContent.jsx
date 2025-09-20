import { useContext, useState, useRef, createContext, useEffect } from "react";
import { CursoContext } from "./page.jsx";
import NavBar from "./components/navBar.jsx";
import Perfil from "./components/perfilDocente.jsx";
import ActivitiesAccordion2 from "./components/ActivitiesAccordion2.jsx";
import { Api_Global_Estudiante } from "../../../services/EstudianteApi";
import apiClient from "../../../Utils/apiClient";

export const StudentContext = createContext();

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
          <span className="text-base text-blue-500 font-light">{title}</span>
          <br />
          <span className="text-xs text-blue-700">{subTema}</span>
        </div>
      </div>
      <span
        className="h-[28px] w-[50px] flex justify-center items-center
        border border-blue-500 rounded-sm px-8 text-sm text-blue-500 font-light cursor-pointer
        transition-all duration-100 bg-white hover:bg-blue-800 hover:text-white"
        onClick={clickShowModal}
      >
        VER
      </span>
    </div>
  );
};

const Actividades_otherCards_modulo = ({modulo}) => {
  const { isActiveModal, setIsActiveModal } = useContext(StudentContext);

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
  const { idPeriodocurso } = useContext(CursoContext);
  const { isActiveModal, setIsActiveModal } = useContext(StudentContext);
  const [curso, setCurso] = useState(null);
  const [modulos, setModulos] = useState([]);

  const handleCurso = () => {
    apiClient.get(Api_Global_Estudiante.miAcademicoPeriodoCursos.mostrar(idPeriodocurso))
      .then((response) => {
        setCurso(response.data);
      })
      .catch((error) => {
        setCurso(null);
      });
  };

  const handleModulos = () => {
    apiClient.get(Api_Global_Estudiante.miAcademicoPeriodoModulos.listar({
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
  },[]);

  return (
    <div className="w-full flex flex-col md:flex-row md:justify-between md:p-4">
      <div className="w-[100%] md:w-[35%] flex flex-col gap-6">
        <div className="w-full bg-white px-6 py-8 flex flex-col rounded-xl w-[425px] ml-10 border border-blue-300">
          <h2 className="font-bold text-xl">{curso?.curso_nombre} - {curso?.curso_codigo}</h2>
          <div className="self-center my-6 text-gray-500">
            <p>
              <span style={{fontWeight: "bold"}}>Periodo:  </span>
              {curso?.periodo_nombre}.
            </p>
            Ingresa a la clase de {curso?.curso_nombre} y presta atención. ¡Únete via Zoom!
          </div>
          <div className="self-center">
            <img src="/img/zoom_image.png" alt="Zoom" />
          </div>
          <a href={`${curso?.url_zoom}`} target="_blank" rel="noopener noreferrer" title="Abrir zoom">
          <div
            className="bg-black text-white px-2 py-4 rounded-xl font-bold text-center mt-14 cursor-pointer"
          >
            Conectarse
          </div>
          </a>
        </div>
        <div className="bg-white px-6 py-4 w-[425px] rounded-xl ml-10 py-14 border border-blue-300">
          <h2 className="font-bold text-2xl">Sin módulos pendientes</h2>
          <div className="self-center my-6 text-gray-500">
            Felicidades, no tienes módulos pendientes!
          </div>
        </div>
      </div>

      <div className="w-[100%] md:w-[45%] bg-white rounded-lg px-4 pt-0 pb-24 border border-blue-300">
        <div className="p-6 flex justify-between bg-white rounded-xl mb-8">
          <span style={{ fontSize: "25px", fontWeight: "700" }}>Módulos</span>
        </div>

        <div className="w-[95%] ml-8 flex flex-col gap-2 max-h-[450px] overflow-y-auto">
          {modulos.map((item, index) => (
            <Actividades_otherCards_modulo modulo={item}/>
          ))}
        </div>
      </div>

    </div>
  );
};

// Resto del código (Actividades, Clase, DocenteContent) permanece igual.

function Actividades() {
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

export default function DocenteContent() {
  const { setIsClickledCard_docente, vistaComponente } =
    useContext(CursoContext);

  const [isActiveModal, setIsActiveModal] = useState(false); //va a tener 2 modales ... "confirm" , "createClass"

  const clickFlechaLeft = () => {
    setIsClickledCard_docente(false);
  };

  return (
    <StudentContext.Provider value={{ isActiveModal, setIsActiveModal }}>
      <div className="h-full w-full overflow-hidden">
        <Perfil></Perfil>
        <NavBar></NavBar>
        {vistaComponente}
      </div>
    </StudentContext.Provider>
  );
}
