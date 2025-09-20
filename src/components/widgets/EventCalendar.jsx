import React, { useState } from "react"
import Calendar from "react-calendar"
import "react-calendar/dist/Calendar.css"
import "./MyCalendar.css"

export default function EventCalendar() {
    const [value, setValue] = useState(new Date())

    // Fechas de eventos con categorías
    const events = [
        { date: new Date(2024, 10, 5), type: "Tarea" },
        { date: new Date(2024, 10, 12), type: "Actividad 1" },
        { date: new Date(2024, 10, 19), type: "Examen parcial" },
        { date: new Date(2024, 10, 26), type: "Examen final" },
    ]

    // Asignar colores según el tipo de evento
    const eventColors = {
        Tarea: "bg-green-500",
        "Actividad 1": "bg-blue-500",
        "Examen parcial": "bg-purple-500",
        "Examen final": "bg-red-500",
    }

    //Normalizar fechas a formato YYYY-MM-DD
    const normalizeDate = (date) => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }

    // Renderizado de puntos en las fechas con eventos
    const tileContent = ({ date, view }) => {
        if (view === "month") {
            const event = events.find(
                (event) => normalizeDate(event.date).getTime() === normalizeDate(date).getTime()
            )
            return event ? (
                <div
                    className={`w-2 h-2 mx-auto mt-1 rounded-full ${eventColors[event.type]}`}
                ></div>
            ) : null
        }
    }

    return (
        <div className="w-[400px]">
            <div className="mb-4">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Semana <span className="text-xl font-medium">3</span> de 8</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                        className="bg-black h-2.5 rounded-full"
                        style={{ width: '37.5%' }}
                    ></div>
                </div>
            </div>

            <div className="col-span-1 bg-white shadow-lg rounded-lg p-4 flex flex-col md:flex-row space-x-8">
                {/* Calendario - ocupará el espacio principal */}
                <div className="flex-1">
                    <Calendar
                        tileContent={tileContent}
                        className="react-calenda"
                    />
                </div>

                {/* Leyenda - se colocará al costado en pantallas medianas/grandes */}
                <div className="flex flex-col justify-center md:w-auto">
                    <div className="flex md:flex-col justify-between gap-2 text-xs text-gray-600">
                        {Object.entries(eventColors).map(([type, color]) => (
                            <div key={type} className="flex items-center space-x-2">
                                <span className={`w-3 h-3 rounded-full ${color}`}></span>
                                <span className="text-xs">{type}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
