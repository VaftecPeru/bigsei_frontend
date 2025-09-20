import { Card, CardContent } from "@/components/ui/card";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

export const cronograma = [
  { id: 1, fecha: "6", mes: "MAY", titulo: "Inicio de inscripciones", detalle: "5 - 31 de mayo", hora: "09:00 a.m.", color: "bg-[#00264A]" },
  { id: 2, fecha: "9", mes: "OCT", titulo: "Examen de Admisión", detalle: "Auditorio Central", hora: "17:00", color: "bg-[#C9002B]" },
  { id: 3, fecha: "10", mes: "NOV", titulo: "Entrega de documentos", detalle: "Mesa de partes", hora: "10:00", color: "bg-[#00264A]" },
];

// 👉 Card individual
export const CronogramaCard = ({ item }) => {
  return (
    <Card className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden border border-gray-200 shadow-sm">
      <div className="flex flex-col sm:flex-row items-stretch">
        
        {/* Bloque fecha */}
        <div
          className={`${item.color} text-white flex flex-col items-center justify-center 
                      w-14 sm:w-16 rounded-md m-2 py-2`}
        >
          <span className="text-base sm:text-lg font-bold leading-none">{item.fecha}</span>
          <span className="text-[10px] sm:text-xs uppercase tracking-wider">{item.mes}</span>
        </div>

        {/* Contenido */}
        <CardContent className="flex-1 p-4 sm:p-5">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">{item.titulo}</h3>
          <p className="text-sm sm:text-base text-gray-600">{item.detalle}</p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-2 text-xs sm:text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <FaCalendarAlt className="text-gray-400" /> {item.fecha} {item.mes}
            </span>
            <span className="flex items-center gap-1">
              <FaClock className="text-gray-400" /> {item.hora}
            </span>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

// 👉 Sección completa con título incluido
export const CronogramaSection = () => {
  return (
    <section id="cronograma" className="min-h-screen px-4 sm:px-8 lg:px-16 mt-8">
      {/* Título centrado con raya */}
      <div className="text-center mb-6 mt-6">
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
