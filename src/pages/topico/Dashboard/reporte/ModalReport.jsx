import React from 'react';
import { motion } from 'framer-motion';

export const ReportModal = ({ isOpen, setIsModalOpen, data }) => {
  console.log(data.sintomas)
  if (!isOpen) return null;
  

  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={()=>setIsModalOpen(!isOpen)}
    >
      <motion.div 
        className="bg-white rounded-lg shadow-xl w-full max-w-md mx-auto relative"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Content */}
        <div className="p-6">
          {/* Header with Logo */}
          <div className="flex justify-between mb-8">
            <div className="flex items-center">
              <div className="bg-red-500 h-8 w-8 transform -skew-x-12 mr-2"></div>
              <span className="text-xl font-bold uppercase">{data.nombre}</span>
            </div>
          </div>

          {/* Client Info */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="font-medium text-gray-600 mb-1">Nombre del Cliente</h3>
              <p className="text-sm">Nombre Completo</p>
              <p className="text-sm">Fecha Emitida</p>
              <p className="text-sm">DNI</p>
            </div>
            <div className="text-right">
              <h3 className="font-medium text-gray-600 mb-1">{data.nombre}</h3>
              <p className="text-sm">{`${data.nombre} ${data.apellido}`}</p>
              <p className="text-sm">{  data.fechaAtencion}</p>
              <p className="text-sm">{data.dni}6</p>
            </div>
          </div>

          {/* Invoice Items */}
          <div className="mb-8">
            <div className="grid grid-cols-4 text-sm font-medium text-gray-500 mb-2">
              <div>Sintomas</div>
              
            </div>
            {data.sintomas.map((sintoma)=>(
              <div className="grid grid-cols-4 text-sm py-3 border-t border-gray-200">
              <div>{sintoma}</div>
            </div>
            ))}
            {/* Item 1 */}
            

            {/* Item 2 */}
            <div className="grid grid-cols-4 text-sm py-3 border-t border-gray-200">
              <div>Enfermedad:</div>
              <div className="text-right">{data.enfermedad}</div>
           
            </div>
          </div>

          {/* Signature Fields */}
         

          {/* Total and Footer */}
          <div className="flex justify-between items-center bg-gray-50 p-4 -mx-6 rounded-b-lg">
            <div className="flex items-center">
              <div className="mr-1 text-red-500">♥</div>
              <p className="text-sm">Thank you!</p>
              <p className="text-sm text-gray-500 ml-4">1 of 22</p>
            </div>
           
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

 