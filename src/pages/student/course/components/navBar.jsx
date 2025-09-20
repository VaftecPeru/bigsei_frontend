import { useState, useContext } from "react";
import { CursoContext } from "../page";
import Mensajeria from "../CourseMessage.jsx";

export default function NavBar() {
  const { setVistaComponente } = useContext(CursoContext);
  const [indiceActivo, setIndiceActivo] = useState(0); // Estado para el índice activo

  const clickNumItem = (indiceItem) => {
    setIndiceActivo(indiceItem); // Actualiza el índice activo
  };

  return (
    <div className="mt-0.5 md:pr-[15%] pt-[2%] bg-white rounded-t-2xl">
      <div className="w-full flex flex-wrap justify-around  items-center text-black font-medium text-base md:justify-start">
        {/* Actividades */}
        <div
          className={`p-4 pb-1.5 cursor-pointer bg-white rounded-xl hover:bg-gray-100 transition duration-200 md:w-auto text-center ${
            indiceActivo === 0 ? "text-blue-600 font-bold" : ""
          }`} 
          style={{ width: "25%" }}
          onClick={() => {
            setVistaComponente(<Clase />);
            clickNumItem(0);
          }}
        >
          Actividades
        </div>

        {/* Mensajeria */}
        <div
          className={`p-4 pb-1.5 cursor-pointer bg-white rounded-xl hover:bg-gray-100 transition duration-200 md:w-auto text-center ${
            indiceActivo === 1 ? "text-blue-600 font-bold" : ""
          }`} 
          style={{ width: "25%" }}
          onClick={() => {
            setVistaComponente(<Mensajeria />);
            clickNumItem(1);
          }}
        >
          Mensajeria
        </div>


        
        {/* Encuesta */}
        {/*
        <div
          className={`p-4 pb-1.5 cursor-pointer bg-white rounded-xl hover:bg-gray-100 transition duration-200 md:w-auto text-center ${
            indiceActivo === 3 ? "text-blue-600 font-bold" : ""
          }`} 
          style={{ width: "25%" }}
          onClick={() => {
            clickNumItem(2);
          }}
        >
          Encuesta
        </div>*/}
      </div> 

      {/* Barra azul */}
      <div className="w-full h-[4px] flex">
        <span
          className="w-[25%] bg-blue-500 rounded rounded-full transition duration-200 transition-all"
          id="barra"
          style={{ marginLeft: `${indiceActivo * 25}%` }} 
        ></span>
      </div>
    </div>
  );
}