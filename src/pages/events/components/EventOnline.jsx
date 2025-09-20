// src/components/EventosOnline.jsx
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const eventos = [
  {
    id: 1,
    fecha: { dia: "5", mes: "Lunes" },
    hora: "10:00",
    titulo: "Opción de Programa",
    descripcion: "",
  },
  {
    id: 2,
    fecha: { dia: "14", mes: "Viernes" },
    hora: "12:00",
    titulo: "Presentación informativa",
    descripcion: "Presentación informativa",
  },
  {
    id: 3,
    fecha: { dia: "25", mes: "Martes" },
    hora: "11:00",
    titulo: "Sesión de Preguntas y Respuestas",
    descripcion: "Región de estudiantes",
  },
  {
    id: 4,
    fecha: { dia: "25", mes: "Miercoles" },
    hora: "11:00 - 5 p.m.",
    titulo: "Opción de Programa",
    descripcion: "Opción de Programa",
  },
  {
    id: 5,
    fecha: { dia: "4", mes: "Jueves" },
    hora: "13:00",
    titulo: "Taller de Orientación",
    descripcion: "Taller de Orientación",
  },
];

export default function EventosOnline() {
  return (
    <section className="p-6">
      <div className="grid md:grid-cols-2 gap-5">
        {eventos.map((evento) => (
          <Card
            key={evento.id}
            className="flex items-center justify-between p-5"
          >
            <div className="flex items-center gap-5">
              {/* Fecha */}
              <div className="bg-[#C9002B] text-white w-16 h-16 rounded-md flex flex-col items-center justify-center font-bold leading-tight">
                <span className="text-sm">{evento.fecha.mes}</span>
                <span className="text-lg">{evento.fecha.dia}</span>
              </div>

              {/* Detalles */}
              <div>
                <p className="text-base font-semibold">
                  {evento.hora} - {evento.titulo}
                </p>
                {evento.descripcion && (
                  <p className="text-gray-500 text-sm">{evento.descripcion}</p>
                )}
              </div>
            </div>

            {/* Botón */}
            <Button className="bg-[#00264A] hover:bg-blue-700 text-white text-sm px-4 py-2 h-auto">
              Asistir
            </Button>
          </Card>
        ))}
      </div>
    </section>
  );
}
