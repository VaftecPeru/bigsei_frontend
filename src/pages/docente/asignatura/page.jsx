import { Book_icon, Lupa_icon, Horario_icon, Hora_icon, Lugar_icon } from "./icons_svg.jsx";
import DocenteContent from "./docenteContent.jsx";
import { createContext, useContext, useState, useEffect } from "react";
import { Clase } from "./docenteContent.jsx";
import { Api_Global_Docente } from "../../../services/DocenteApi";
import apiClient from "../../../Utils/apiClient";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { User, Plus, Users2 } from "lucide-react";
import { ClipLoader } from 'react-spinners';

export const AsignaturaContext = createContext();

function CursoCard({ dataUnidad }) {
  const { setIsClickledCard_docente } = useContext(AsignaturaContext);
  const { setIdPeriodocurso } = useContext(AsignaturaContext);

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
              <Users2 />
            </div>
            <span className="text-start flex-1 ml-2 truncate whitespace-nowrap overflow-hidden text-sm text-ellipsis">
              {dataUnidad.mensajeriagrupo_nombre}
            </span>
          </div>
          <div className="flex items-center justify-between mb-2" title={dataUnidad.horario}>
            <div className="h-6 w-6 flex items-center">
              <Horario_icon />
            </div>
            <span className="text-start flex-1 ml-2 truncate whitespace-nowrap overflow-hidden text-sm text-ellipsis">
              {dataUnidad.horario}
            </span>
          </div>
          <div className="flex items-center justify-between mb-2" title={dataUnidad.hora}>
            <div className="h-6 w-6 flex items-center">
              <Hora_icon />
            </div>
            <span className="text-start flex-1 ml-2 truncate whitespace-nowrap overflow-hidden text-sm text-ellipsis">
              {dataUnidad.hora}
            </span>
          </div>
          <div className="flex items-center justify-between" title={dataUnidad.lugar}>
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
  const [searchTerm, setSearchTerm] = useState("");
  const [cursos, setCursos] = useState([]);
  const [loadingCursos, setLoadingCursos] = useState(false);
  const estilos = [
    { bgColor: "#e9d5ff" },
    { bgColor: "#fef08a" },
    { bgColor: "#bbf7d0" },
    { bgColor: "#fbcfe8" },
    { bgColor: "#fbe4b7" },
    { bgColor: "#bfdbfe" },
    { bgColor: "#f2abab" },
    { bgColor: "#fed7aa" },
  ];

  const onBurcar = () => {
    setLoadingCursos(true);
    apiClient.get(Api_Global_Docente.academicoPeriodoCursos.listar({
      per_page: 15,
      page: 1,
    }, searchTerm))
      .then((response) => {
        setLoadingCursos(false);
        let i = -1;
        const data = response.data.data.map((item, index) => {
          i++;
          if (i >= 8) i = 0;
          return {
            ...item,
            titulo: item.curso_nombre,
            horario: item.horario_dias,
            hora: item.horario_horas,
            lugar: item.aula_nombre,
            bgColor: estilos[i].bgColor,
            docente: item.docente_nombre,
            periodo: item.periodo_nombre,
          };
        });
        setCursos(data);
      })
      .catch((error) => {
        setLoadingCursos(false);
        setCursos([]);
      });
  };

  useEffect(() => {
    onBurcar();
  }, []);

  return (
    <div className="p-0 w-full h-full rounded-xl bg-white flex flex-col">
      <div className="flex justify-between items-center relative bg-white p-6">
        <div className="flex">
          <span className="h-8 w-8 flex">
            <Book_icon></Book_icon>
          </span>
          <span className="ml-4">Asignaturas programadas</span>
        </div>
      </div>

      <span className="flex h-[2px] mb-4 w-full bg-gray-200 rounded-xl"></span>

      <div className="p-0 flex flex-col md:pt-2 flex-1">
        <div className="w-[90%] h-auto px-8">
          <div className="border-2 border-gray-300 rounded-lg overflow-hidden h-[50px] flex justify-between items-center w-[100%] md:w-[60%]">
            <div className="h-full w-full">
              <input
                type="text"
                className="h-full w-full p-2 pl-6"
                style={{ border: "none", outline: "none" }}
                placeholder="Buscar curso"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              ></input>
            </div>
            <button
              onClick={() => onBurcar()}
              className="p-4 bg-gradient-to-r from-[#2D20F7] to-[#7844ea] rounded-md"
              disabled={loadingCursos}
            >
              {loadingCursos ? <ClipLoader color="#ffffff" size={20} /> : <Lupa_icon></Lupa_icon>}
            </button>
          </div>
        </div>

        <div className="p-2 w-full mt-4">
          {loadingCursos ? (
            <div className="flex justify-center items-center h-32">
              <p className="text-gray-500 text-xl font-bold">Cargando cursos...</p>
            </div>
          ) : cursos && cursos.length > 0 ? (
            // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-6 justify-items-center">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {cursos.map((cursoData, index) => (
                <CursoCard
                  key={cursoData.id_periodocurso || index}
                  dataUnidad={cursoData}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-32">
              <p className="text-gray-500 text-xl font-bold">No se encontraron cursos.</p>
            </div>
          )}
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
      <AsignaturaContext.Provider
        value={{ setIsClickledCard_docente, vistaComponente, setVistaComponente, setIdPeriodocurso, idPeriodocurso }}
      >
        <div className="w-full p-4 md:p-8">
          {isClickedCard_docente ? (
            <DocenteContent idPeriodocurso={idPeriodocurso}></DocenteContent>

          ) : (
            <AsignaturaDefault></AsignaturaDefault>
          )}
        </div>
      </AsignaturaContext.Provider>
      <ToastContainer />
    </>
  );
}