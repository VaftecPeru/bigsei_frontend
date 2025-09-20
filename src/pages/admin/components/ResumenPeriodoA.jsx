import React from 'react';
import { BarChartBig } from 'lucide-react';

export default function ResumenPeriodoA({resumen, estaAbierto = "0"}) {

  return (
    <div className='w-full max-w-7xl bg-white shadow-md rounded-lg overflow-hidden mt-6'>
      <div className="py-6 px-6">
        <div className="pb-4 flex items-end">
          <BarChartBig size={40} className="text-blue-500" />
          <span className="font-bold text-xl text-gray-500 ml-2">Resumen de la carrera</span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div style={{lineHeight: "0.85em"}}>
            <div className="block text-sm font-medium text-gray-700 flex">Total ciclos:</div>
            <div className="text-gray-500">{resumen?.total_ciclos}</div>
          </div>
          <div style={{lineHeight: "0.85em"}}>
            <div className="block text-sm font-medium text-gray-700">Total cursos:</div>
            <div className="text-gray-500">{resumen?.total_cursos}</div>
          </div>
          <div style={{lineHeight: "0.85em"}}>
            <div className="block text-sm font-medium text-gray-700">Total créditos:</div>
            <div className="text-gray-500">{resumen?.total_creditos}</div>
          </div>
          <div style={{lineHeight: "0.65em"}}>
            <div className="block text-sm font-medium text-gray-700">Total Horas:</div>
            <div className="text-gray-500">{resumen?.total_horas_semanal}</div>
          </div>
        </div>
        <hr className="my-6" />
        <div className="flex items-center justify-center">
          {estaAbierto == "0" ? (
            <div className="py-6 font-bold text-center text-xl text-gray-500">
              El período está cerrado.
            </div>
          ) : (
            <div className="py-6 font-bold text-center text-xl text-blue-700">
              El período está abierto.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}