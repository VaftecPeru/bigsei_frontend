import { Card, CardContent } from "@/components/ui/card";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

const cronograma = [
  {
    id: 1,
    fecha: { dia: "6", mes: "MAY" },
    hora: "09:00 a.m.",
    titulo: "Inicio de inscripciones",
    descripcion: "5 - 31 de mayo",
    color: "#00264A",
  },
  {
    id: 2,
    fecha: { dia: "9", mes: "OCT" },
    hora: "17:00",
    titulo: "Examen de Admisión",
    descripcion: "Auditorio Central",
    color: "#C9002B",
  },
  {
    id: 3,
    fecha: { dia: "10", mes: "NOV" },
    hora: "10:00",
    titulo: "Entrega de documentos",
    descripcion: "Mesa de partes",
    color: "#00264A",
  },
];

export const CronogramaCard = ({ item }) => {
  return (
    <Card className="flex items-center justify-between p-5 min-h-[120px] border border-gray-200 shadow-sm rounded-xl">
      <div className="flex items-center gap-5">
        {/* Bloque fecha */}
        <div
          className="text-white w-16 h-16 rounded-md flex flex-col items-center justify-center font-bold leading-tight"
          style={{ backgroundColor: item.color }}
        >
          <span className="text-lg">{item.fecha.dia}</span>
          <span className="text-xs uppercase tracking-wider">{item.fecha.mes}</span>
        </div>
        <div>
          <p className="text-base font-semibold text-gray-900">{item.titulo}</p>
          {item.descripcion && (
            <p className="text-sm text-gray-600">{item.descripcion}</p>
          )}
          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <FaCalendarAlt className="text-gray-400" /> {item.fecha.dia} {item.fecha.mes}
            </span>
            <span className="flex items-center gap-1">
              <FaClock className="text-gray-400" /> {item.hora}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export const CronogramaSection = () => {
  return (
    <section id="cronograma" className="px-4 sm:px-8 lg:px-16 py-16 pb-8">
      <div className="text-center mb-6">
        <h2 className="inline-block text-2xl sm:text-3xl lg:text-4xl font-bold text-[#00264A] dark:text-white relative pb-2">
          Cronograma
          <span className="block w-20 h-1 bg-[#C9002B] mx-auto mt-2 rounded"></span>
        </h2>
      </div>

      {/* Cards */}
      <div className="space-y-6 w-full">
        {cronograma.map((item) => (
          <CronogramaCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
};