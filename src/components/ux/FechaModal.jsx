 
import  { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../ui/button";

export const FechaComponent = ({ buttonActive }) => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="p-6">
      {buttonActive === "general" && (
        <div className="space-y-4">
         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
              <label className="block text-xl font-bold text-gray-600 underline transition-all hover:text-blue-600">Pacientes</label>
              <select
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Seleccionar</option>
                <option value="brackets">Waldir</option>
                <option value="invisible">federico</option>
                <option value="sin_ortodoncia">Benjamin</option>
              </select>
            </div>

            <div>
              <label className="block text-xl font-bold text-gray-600 underline transition-all hover:text-blue-600">Enfermedad</label>
              <select
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="">Seleccionar</option>
                <option value="brackets">Tos</option>
                <option value="invisible">Fiebre</option>
              
              </select>
            </div>
            <div>
                  <Button className={'bg-gray-800 w-full'}>Reservar Paciente</Button>
            </div>
          </div>
        </div>
      )}

      {buttonActive === "comments" && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">Comentarios</h2>
          <textarea
            className="mt-1 block w-full h-32 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Escribe tus comentarios aquí..."
          ></textarea>
        </div>
      )}

      {buttonActive === "schedule" && (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700">Horario</h2>
          <label className="block text-sm font-medium text-gray-600">Selecciona la fecha</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            dateFormat="dd/MM/yyyy"
          />
        </div>
      )}
    </div>
  );
};

 