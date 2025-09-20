import React from "react";
import { ChevronRight } from "lucide-react";

const AttentionsCardMedic = () => {
  const appointments = [
    {
      id: 1,
      dni: "18756955",
      name: "Nombre de estudiante",
      date: "Dec 1, 2021",
      time: "10:32",
    },
    {
      id: 2,
      dni: "18756955",
      name: "Nombre de estudiante",
      date: "Nov 15, 2021",
      time: "13:01",
    },
    {
      id: 3,
      dni: "18756955",
      name: "Nombre de estudiante",
      date: "Nov 02, 2021",
      time: "9:46",
    },
    {
      id: 4,
      dni: "18756955",
      name: "Nombre de estudiante",
      date: "Nov 02, 2021",
      time: "9:46",
    },
    {
      id: 5,
      dni: "18756955",
      name: "Nombre de estudiante",
      date: "Nov 02, 2021",
      time: "9:46",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium text-gray-900">
          Atenciones médicas recientes
        </h2>
        <button className="flex items-center text-blue-500 hover:text-blue-600 text-sm">
          Ver todos
          <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="text-sm text-gray-500">
            <th className="pb-4 text-left font-medium">Nº</th>
            <th className="pb-4 text-left font-medium">
              DNI
              <button className="ml-1 text-gray-400 hover:text-gray-600">
                ↕
              </button>
            </th>
            <th className="pb-4 text-left font-medium">Nombre</th>
            <th className="pb-4 text-left font-medium">
              Fecha
              <button className="ml-1 text-gray-400 hover:text-gray-600">
                ↕
              </button>
            </th>
            <th className="pb-4 text-left font-medium">Hora</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {appointments.map((appointment) => (
            <tr
              key={appointment.id}
              className="border-t border-gray-100 text-gray-600"
            >
              <td className="py-4">{appointment.id}</td>
              <td className="py-4">{appointment.dni}</td>
              <td className="py-4">{appointment.name}</td>
              <td className="py-4">{appointment.date}</td>
              <td className="py-4">{appointment.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttentionsCardMedic;
