import React, { useState } from 'react';
import { Exam_icon, FlechaBajo_icon } from '@/pages/docente/asignatura/docente_icons';
import { Tema } from '@/pages/docente/asignatura/docenteContent';

function ActivitiesAccordion({ setIsActiveModal }) {
    // Estado para controlar qué semanas están abiertas
    const [openWeeks, setOpenWeeks] = useState({});

    // Estado para controlar si "Actividad I" está abierto o cerrado
    const [isActivityOpen, setIsActivityOpen] = useState(false);

    // Función para manejar el clic en una semana
    const handleWeekClick = (weekId) => {
        setOpenWeeks((prev) => ({
            ...prev,
            [weekId]: !prev[weekId], 
        }));
    };

    // Función para manejar el clic en "Actividad I"
    const handleActivityClick = () => {
        setIsActivityOpen((prev) => !prev); 
        if (isActivityOpen) {
            // Si "Actividad I" está abierto, cerrar todas las semanas
            setOpenWeeks({});
        }
    };

    // Datos de ejemplo para las semanas y sus contenidos
    const semanas = [
        {
            id: 1,
            nombre: "Semana 1 - Nombre del tema",
            fecha: "Lunes 17/10/2024",
            actividades: [
                { tipo: "Tarea", descripcion: "Realizar estructura de control (PPT)", modal: "tarea" },
                { tipo: "Subir documento", descripcion: "Realizar estructura de control (PPT)", modal: "presentacion" },
                { tipo: "Cuestionario", descripcion: "Realizar estructura de control (PPT)", modal: "cuestionario" },
                { tipo: "Grabacion", descripcion: "Última clase 10/10/2024", modal: "subirGrabacion" }
            ]
        },
        {
            id: 2,
            nombre: "Semana 2 - Nombre del tema",
            fecha: "Lunes 24/10/2024",
            actividades: [
                { tipo: "Tarea", descripcion: "Realizar estructura de control (PPT)", modal: "tarea" },
                { tipo: "Subir documento", descripcion: "Realizar estructura de control (PPT)", modal: "presentacion" },
                { tipo: "Cuestionario", descripcion: "Realizar estructura de control (PPT)", modal: "cuestionario" },
                { tipo: "Grabacion", descripcion: "Última clase 10/10/2024", modal: "subirGrabacion" }
            ]
        },
        {
            id: 3,
            nombre: "Semana 3 - Nombre del tema",
            fecha: "Lunes 24/10/2024",
            actividades: [
                { tipo: "Tarea", descripcion: "Realizar estructura de control (PPT)", modal: "tarea" },
                { tipo: "Subir documento", descripcion: "Realizar estructura de control (PPT)", modal: "presentacion" },
                { tipo: "Cuestionario", descripcion: "Realizar estructura de control (PPT)", modal: "cuestionario" },
                { tipo: "Grabacion", descripcion: "Última clase 10/10/2024", modal: "subirGrabacion" }
            ]
        }
    ];

    return (
        <>
            {/* Div de Modulo (Actividad I) */}
            <div
                className="w-[100%] flex items-center cursor-pointer relative transition duration-200 rounded rounded-md h-[60px] hover:bg-green-200 overflow-hidden"
                onClick={handleActivityClick} 
            >
                <span className="flex bg-green-500 absolute left-0 top-0 h-full w-[4px] rounded rounded-full"></span>
                <div className="w-full flex justify-between px-4 items-center">
                    <div className="flex flex-col">
                        <p className="font-bold text-xl" style={{ color: "#307b4a" }}>
                            Actividad I
                        </p>
                        <p className="text-sm" style={{ color: "#2b7244" }}>
                            Nombre de la actividad
                        </p>
                    </div>

                    <div
                        className="transition duration-200 transition-all"
                        style={{
                            height: "26px",
                            width: "26px",
                            transform: isActivityOpen ? "rotate(180deg)" : "rotate(0deg)", 
                        }}
                    >
                        <FlechaBajo_icon></FlechaBajo_icon>
                    </div>
                </div>
            </div>

            {/* Mapeo de semanas (solo se muestra si "Actividad I" está abierto) */}
            {isActivityOpen && semanas.map((semana) => (
                <React.Fragment key={semana.id}>
                    {/* Div de Semana */}
                    <div className="w-[90%] bg-purple-300 h-[50px] transition duration-200 transition-all">
                        <div className="w-full bg-purple-50 h-full" onClick={() => handleWeekClick(semana.id)}>
                            <div className="w-full flex items-center cursor-pointer relative transition duration-200 rounded rounded-md h-full hover:bg-purple-200 py-2 overflow-hidden">
                                <span className="flex bg-purple-500 absolute left-0 top-0 h-full w-[4px] rounded rounded-full"></span>
                                <div className="w-full flex justify-between px-4 items-center">
                                    <div className="flex flex-col">
                                        <p className="font-bold text-sm text-purple-500">
                                            {semana.nombre}
                                        </p>
                                        <p className="text-sm" style={{ color: "#2b7244" }}>
                                            {semana.fecha}
                                        </p>
                                    </div>
                                    <div
                                        className="h-[20px] w-[20px] transition-transform duration-200"
                                        style={{
                                            transform: openWeeks[semana.id] ? "rotate(180deg)" : "rotate(0deg)",
                                        }}
                                    >
                                        <FlechaBajo_icon></FlechaBajo_icon>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Div de contenido (solo se muestra si la semana está abierta) */}
                    {openWeeks[semana.id] && (
                        <div className="transition duration-200 transition-all w-[90%] px-4 flex flex-col gap-4 items-end py-2 rounded rounded-md"
                            style={{
                                border: "1px solid #6d6dff",
                                overflow: "hidden",
                            }}
                        >
                            {semana.actividades.map((actividad, index) => (
                                <Tema
                                    key={index}
                                    icon={<Exam_icon></Exam_icon>}
                                    title={actividad.tipo}
                                    subTema={actividad.descripcion}
                                    clickShowModal={() => setIsActiveModal(actividad.modal)} 
                                />
                            ))}
                        </div>
                    )}
                </React.Fragment>
            ))}
        </>
    );
}

export default ActivitiesAccordion;