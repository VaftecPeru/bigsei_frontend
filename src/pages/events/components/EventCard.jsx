import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaCalendarAlt, FaClock, FaVideo } from "react-icons/fa";

export const eventos = [
    {
        id: 1,
        subtitulo: "Charla virtual: Modalidad admisión La Primera Opción",
        fecha: "12 de agosto",
        hora: "6:00 p.m.",
        plataforma: "Zoom",
        color: "bg-[#00264A]",
        imagen: "/img/eventos/admision.png",
    },
    {
        id: 2,
        titulo: "Admisión a Especialidades Artísticas",
        subtitulo: "Charla virtual: Admisión por Especialidades Artísticas",
        fecha: "15 de agosto",
        hora: "6:00 p.m.",
        plataforma: "Zoom",
        color: "bg-[#00264A]",
        imagen: "/img/eventos/admision9.png",
    },
    {
        id: 3,
        titulo: "Admisión por Rendimiento Superior",
        subtitulo:
            "¿Cómo ingreso a PUCP? – Modalidad Admisión por Rendimiento Superior",
        fecha: "14 de agosto",
        hora: "5:00 p.m.",
        plataforma: "Zoom",
        color: "bg-[#00264A]",
        imagen: "/img/eventos/admision7.png",
    },
];

export const visitas = [
    {
        id: 4,
        titulo: "¡Visita guiada por el Campus PUCP!",
        subtitulo: "Visita guiada por el campus",
        color: "bg-indigo-600",
        imagen: "/img/eventos/admision.png",
    },
    {
        id: 5,
        titulo: "Visitas guiadas virtuales",
        subtitulo: "Visitas guiadas virtuales por el campus",
        color: "bg-purple-600",
        imagen: "/img/eventos/admision2.jpg",
    },
    {
        id: 6,
        titulo: "Visitas guiadas virtuales por el campus",
        subtitulo: "¿No puedes venir al campus? Recorre desde tu casa",
        color: "bg-pink-600",
        imagen: "/img/eventos/admision3.jpg",
    },
];

export function EventoCard({ evento }) {
    return (
        <Card className="shadow-xl rounded-2xl overflow-hidden flex flex-col min-h-[350px] max-w-[310px] mx-auto transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <div className="relative">
                {evento.imagen ? (
                    <>
                        <img
                            src={evento.imagen}
                            alt={evento.titulo || evento.subtitulo}
                            className="w-full h-40 sm:h-48 lg:h-56 object-cover"
                        />
                        <div
                            className={`${evento.color} absolute top-2 left-2 px-3 py-1.5 rounded-lg text-white text-sm sm:text-base font-semibold shadow-md`}
                        >
                            Charla informativa virtual
                        </div>
                    </>
                ) : (
                    <div
                        className={`${evento.color} h-40 sm:h-48 lg:h-56 flex items-center justify-center text-white text-lg sm:text-xl lg:text-2xl font-semibold`}
                    >
                        Charla informativa virtual
                    </div>
                )}
            </div>

            <CardContent className="p-6 flex flex-col flex-grow bg-white dark:bg-gray-800">
                <p className="text-sm sm:text-base text-[#00264A] font-semibold flex-grow line-clamp-2">
                    {evento.subtitulo}
                </p>

                {/* Info con íconos en horizontal */}
                <div className="text-sm text-gray-600 dark:text-gray-300 flex items-center gap-6 py-8">
                    <p className="flex items-center gap-2">
                        <FaCalendarAlt className="text-gray-400 text-xl" /> {evento.fecha}
                    </p>
                    <p className="flex items-center gap-2">
                        <FaClock className="text-gray-400 text-xl" /> {evento.hora}
                    </p>
                    <p className="flex items-center gap-2">
                        <FaVideo className="text-gray-400 text-xl" /> {evento.plataforma}
                    </p>
                </div>

                <Button className="w-full mt-auto bg-gradient-to-r from-[#C9002B] to-[#00264A] text-white hover:from-blue-700 hover:to-purple-700 text-sm py-2 rounded-lg">
                    Regístrate
                </Button>
            </CardContent>


        </Card>
    );
}

export function VisitaCard({ visita }) {
    return (
        <Card className="shadow-xl rounded-2xl overflow-hidden flex flex-col min-h-[350px] max-w-[310px] mx-auto transition-all duration-300 hover:shadow-2xl hover:scale-105">
            <div className="relative">
                <img
                    src={visita.imagen}
                    alt={visita.titulo}
                    className="w-full h-40 sm:h-48 lg:h-56 object-cover"
                />
                <div
                    className={`${visita.color} absolute top-2 left-2 px-3 py-1.5 rounded-lg text-white text-sm sm:text-base font-semibold shadow-md`}
                >
                    Visita Guiada
                </div>
            </div>

            <CardContent className="p-6 flex flex-col flex-grow bg-white dark:bg-gray-800">
                <h3 className="text-lg sm:text-xl font-bold text-[#00264A] dark:text-white">
                    {visita.titulo}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-300 flex-grow line-clamp-2">
                    {visita.subtitulo}
                </p>

                <Button className="w-full mt-auto bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 text-sm py-2 rounded-lg">
                    Ver más
                </Button>
            </CardContent>
        </Card>
    );
}

