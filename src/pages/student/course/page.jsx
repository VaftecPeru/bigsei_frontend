import {
  Book_icon,
  Plus_icon,
  Lupa_icon,
  Horario_icon,
  Hora_icon,
  Lugar_icon,
} from "./icons_svg.jsx";
import CursoContent from "./cursoContent.jsx";
import { createContext, useContext, useState, useEffect } from "react";
import { Clase } from "./cursoContent.jsx";
import { Api_Global_Estudiante } from "../../../services/EstudianteApi";
import apiClient from "../../../Utils/apiClient";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import { User, Plus } from "lucide-react";

export const CursoContext = createContext();

function FirstBlock() {
  let isOpen = false;

  const clickPlusIcon = () => {
    const modalCreateCourse = document.querySelector("#modalCreateCourse");
    if (isOpen) {
      modalCreateCourse.style.display = "none";
      isOpen = false;
      return;
    }

    modalCreateCourse.style.display = "flex";
    isOpen = true;
  };

  const closeModal = (event) => {
    const modalCreateCourse = document.querySelector("#modalCreateCourse");
    if (event.target === modalCreateCourse) {
      modalCreateCourse.style.display = "none";
      isOpen = false;
    }
  };

  return (
    <div className="flex justify-between items-center relative bg-white">
      <div className="flex">
        <span className="h-8 w-8 flex">
          <Book_icon></Book_icon>
        </span>
        <span className="ml-4">Cursos matriculados</span>
      </div>

      <CrearCursoModal closeModal={closeModal}></CrearCursoModal>
    </div>
  );
}

const CrearCursoModal = ({ closeModal }) => {
  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
      id="modalCreateCourse"
      style={{ display: "none" }}
      onClick={closeModal}
    >
      <div
        className="w-[270px] h-[360px] rounded-2xl border-2 border-gray-100 bg-white backdrop-blur-lg md:w-[350px] md:h-[450px]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rounded-2xl h-full w-full p-6">
          <h4 className="font-bold text-xl mb-6 md:text-2xl xl:text-3xl">
            Crear curso
          </h4>
          <div className="w-full my-6">
            <p className="mb-2">Nombre *</p>
            <input className="w-full rounded-md border-2 border-gray-200 p-2 pl-4 outline-none" />
          </div>
          <div className="w-full my-6">
            <p className="mb-2">Dia *</p>
            <input className="w-full rounded-md border-2 border-gray-200 p-2 pl-4 outline-none" />
          </div>
          <div className="w-full my-6">
            <p className="mb-2">Hora *</p>
            <input className="w-full rounded-md border-2 border-gray-200 p-2 pl-4 outline-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

function InputContainer() {
  return (
    <div className="w-[90%] h-auto">
      <div
        className="w-20 border-2 border-gray-300 rounded-lg overflow-hidden h-[50px]
        flex justify-between items-center w-[100%] md:w-[60%]"
      >
        <div className="h-full w-full">
          <input
            type="text"
            className="h-full w-full p-2 pl-6"
            style={{ border: "none", outline: "none" }}
            placeholder="Buscar curso"
          ></input>
        </div>
        <div className="p-4 bg-gradient-to-r from-[#2D20F7] to-[#7844ea] rounded-md ">
          <Lupa_icon></Lupa_icon>
        </div>
      </div>
    </div>
  );
}

function Card({ dataUnidad }) {
  const { setIsClickledCard_docente, setIdPeriodocurso } = useContext(CursoContext);

  const clickShowCard = () => {
    setIdPeriodocurso(dataUnidad.id_periodocurso);
    setIsClickledCard_docente(true);
  };

  return (
    <div className="relative w-[230px] min-h-[250px]">
      <div
        className="absolute inset-0 bg-gray-300 rounded-xl transform translate-x-2 translate-y-2"
        style={{ zIndex: 0 }}
      ></div>

      <div
        className="bg-white rounded-xl p-6 w-full min-h-full 
          hover:scale-105 transform transition duration-150 cursor-pointer
          flex-col relative"
        onClick={() => clickShowCard(dataUnidad)}
        style={{ background: dataUnidad.bgColor, zIndex: 1 }}
      >
        <div className="font-bold text-base mb-2 text-center break-words min-h-[40px] flex items-center justify-center">
          {dataUnidad.titulo}
        </div>

        <div className="h-[2px] w-full bg-black mb-2"></div>

        <div className="flex flex-col flex-grow justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="h-6 w-6 flex items-center">
              <Plus />
            </div>
            <span className="text-start flex-1 ml-2 truncate whitespace-nowrap overflow-hidden text-sm text-ellipsis">
              {dataUnidad.periodo}
            </span>
          </div>

          <div className="flex items-center justify-between mb-2">
            <div className="h-6 w-6 flex items-center">
              <User />
            </div>
            <span className="text-start flex-1 ml-2 truncate whitespace-nowrap overflow-hidden text-sm text-ellipsis">
              {dataUnidad.docente}
            </span>
          </div>

          <div className="flex items-center justify-between mb-2">
            <div className="h-6 w-6 flex items-center">
              <Horario_icon />
            </div>
            <span className="text-start flex-1 ml-2 truncate whitespace-nowrap overflow-hidden text-sm text-ellipsis">
              {dataUnidad.horario}
            </span>
          </div>

          <div className="flex items-center justify-between mb-2">
            <div className="h-6 w-6 flex items-center">
              <Hora_icon />
            </div>
            <span className="text-start flex-1 ml-2 truncate whitespace-nowrap overflow-hidden text-sm text-ellipsis">
              {dataUnidad.hora}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="h-6 w-6 flex items-center">
              <Lugar_icon />
            </div>
            <span className="text-start flex-1 ml-2 truncate whitespace-nowrap overflow-hidden text-sm text-ellipsis">
              {dataUnidad.lugar}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function AsignaturaDefault() {
  const [isLoading, setIsLoading] = useState(false);
  const [cursos, setCursos] = useState([]);
  const [textSearch, setTextSearch] = useState("");
  const estilos = [
    { bgColor: "#e9d5ff" },
    { bgColor: "#fef08a" },
    { bgColor: "#bbf7d0" },
    { bgColor: "#fbcfe8" },
    { bgColor: "#fbe4b7" },
    { bgColor: "#bfdbfe" },
    { bgColor: "#f2abab" },
    { bgColor: "#fed7aa" },
    { bgColor: "#B5EAD7" },
    { bgColor: "#C7CEEA" },
    { bgColor: "#E2F0CB" },
    { bgColor: "#E0F7FA" },
    { bgColor: "#FFF3CD" },
    { bgColor: "#B2E2F0" },
    { bgColor: "#F0E6EF" },
    { bgColor: "#C4E1FF" },
    { bgColor: "#FFB7B2" },
  ];

  const indexColor = (i) => {
    if (i < 17) {
      return i;
    } else {
      const res = i % 17;
      return res;
    }
  };

  const handleCursos = (text_search = "") => {
    setIsLoading(true);
    apiClient.get(Api_Global_Estudiante.miAcademicoPeriodoCursos.listar({
      per_page: 15,
      page: 1,
    }, text_search))
      .then((response) => {
        setIsLoading(false);
        const data = response.data.data.map((item, index) => ({
          id: item.id_periodocurso,
          id_periodocurso: item.id_periodocurso,
          titulo: item.curso_nombre,
          horario: item.horario_dias,
          hora: item.horario_horas,
          lugar: item.aula_nombre,
          docente: item.docente_nombre,
          periodo: item.periodo_nombre,
          bgColor: estilos[indexColor(index)].bgColor,
        }));
        setCursos(data);
      })
      .catch((error) => {
        setIsLoading(false);
        setCursos([]);
        toast.warning(error.response.data);
      });
  };

  useEffect(() => {
    handleCursos(textSearch);
  },[]);

  return (
    <div
      className="
        p-0
        w-full h-full rounded rounded-xl bg-white 
        md:p-6 
        flex flex-col
      "
    >
      <div className="flex justify-between items-center relative bg-white">
        <div className="flex">
          <span className="h-8 w-8 flex">
            <Book_icon></Book_icon>
          </span>
          <span className="ml-4">Cursos matriculados</span>
        </div>
      </div>

      <span
        className="flex h-[2px] 
          mt-2
          mb-12 
          md:my-4
          w-full bg-gray-200 
          rounded rounded-xl
        "
      ></span>

      <div
        className="
          p-0 mx-16
          flex flex-col md:pt-2 flex-1"
      >
        <div className="w-[90%] h-auto">
          <div
            className="w-20 border-2 border-gray-300 rounded-lg overflow-hidden h-[50px]
            flex justify-between items-center w-[100%] md:w-[60%]"
          >
            <div className="h-full w-full">
              <input
                type="text"
                className="h-full w-full p-2 pl-6"
                style={{ border: "none", outline: "none" }}
                placeholder="Buscar curso"
                onChange={(e) => setTextSearch(e.target.value)}
              ></input>
            </div>
            <div className="p-4 bg-gradient-to-r from-[#2D20F7] to-[#7844ea] rounded-md "
              onClick={(e) => handleCursos(textSearch)}
            >
              {isLoading ? <ClipLoader color="#ffffff" size={20} /> : <Lupa_icon></Lupa_icon>}
            </div>
          </div>
        </div>
        <div
          className="
          p-2
          w-full flex-1 md:p-2
          grid grid-cols-1 mt-8 gap-8
          justify-items-center
          sm:grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          2xl:grid-cols-4
          "
        >
          {cursos &&
            cursos.map((dataUnidad, index) => {
              return <Card dataUnidad={dataUnidad} key={index}></Card>;
            })}
        </div>
      </div>
    </div>
  );
}

export default function PageAsignatura() {
  const [isClickedCard_docente, setIsClickledCard_docente] = useState(false);
  const [vistaComponente, setVistaComponente] = useState(<Clase></Clase>);
  const [idPeriodocurso, setIdPeriodocurso] = useState("");

  return (
    <>
    <CursoContext.Provider
      value={{ setIsClickledCard_docente, vistaComponente, setVistaComponente, setIdPeriodocurso, idPeriodocurso }}
    >
      <div
        className="w-full
             p-4
             md:p-6 md:p-8"
      >
        {isClickedCard_docente ? (
          <CursoContent></CursoContent>
        ) : (
          <AsignaturaDefault></AsignaturaDefault>
        )}
      </div>
    </CursoContext.Provider>
    <ToastContainer />
    </>
  );
}
