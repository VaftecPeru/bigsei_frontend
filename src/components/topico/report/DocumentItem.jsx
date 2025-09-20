import { useState } from "react";
import { FaEye } from "react-icons/fa";

export const DocumentItem = ({ info,setIsModalOpen ,isModalOpen,setIsDataModal}) => {
console.log(info)
  
  return (
    <div className={`p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col md:flex-row md:justify-between md:items-center border-l-4 gap-3 ${info.estado === 'Atendido' ? 'border-green-500' : 'border-red-500'}`}>
      <div className="flex flex-col">
        <span className="text-base font-semibold text-gray-800">{info.nombre} {info.apellido}</span>
        <span className="text-sm text-gray-500">Edad: {info.edad}</span>
        <span className={`text-sm font-medium ${info.estado === 'Atendido' ? 'text-green-600' : 'text-red-600'}`}>{info.estado}</span>
      </div>
      <button
       onClick={() => {
        setIsDataModal(info); // Pasar los datos al estado del modal
        setIsModalOpen(true); // Abrir el modal
      }}
      className="flex items-center gap-2 text-blue-500 hover:text-blue-700 transition-colors text-sm font-medium self-start md:self-center"  >
        <FaEye className="text-lg" />
        Ver más
      </button>
    </div>
  );
};
