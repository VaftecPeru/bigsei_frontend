import React from "react"
import FullCalendar from "@fullcalendar/react" // React wrapper
import timeGridPlugin from "@fullcalendar/timegrid" // Plugin for time grid
import interactionPlugin from "@fullcalendar/interaction" // Enables user interactions
import dayGridPlugin from "@fullcalendar/daygrid" // For week/month views
import esLocale from "@fullcalendar/core/locales/es"
import { Download } from "lucide-react"

export default function Schedule() {
  const events = [
    {
      title: "Algorítmica II - Teórico",
      start: "2024-11-18T08:00:00",
      end: "2024-11-18T10:00:00",
      backgroundColor: "#D6E4FF", // Light Blue
      borderColor: "#85AFFF",
    },
    {
      title: "Algorítmica II - Práctico",
      start: "2024-11-20T10:30:00",
      end: "2024-11-20T12:00:00",
      backgroundColor: "#D6E4FF",
      borderColor: "#85AFFF",
    },
    {
      title: "Algorítmica II - Teórico",
      start: "2024-11-21T08:00:00",
      end: "2024-11-21T10:00:00",
      backgroundColor: "#D0F0C0", // Light Green
      borderColor: "#85C785",
    },
    {
      title: "Algorítmica II - Práctico",
      start: "2024-11-21T10:30:00",
      end: "2024-11-21T12:00:00",
      backgroundColor: "#D0F0C0",
      borderColor: "#85C785",
    },
  ]

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">HORARIO 2024 – II</h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <Download/>
          Descargar
        </button>
      </div>
      <FullCalendar
        plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
        initialView="timeGridWeek"
        initialDate="2024-11-20" // Asegúrate de que esta fecha esté dentro del rango de los eventos
        headerToolbar={false} // No header controls
        allDaySlot={false} // Disable "all day" row
        slotMinTime="08:00:00" // Start at 8 AM
        slotMaxTime="18:00:00" // End at 6 PM
        events={events}
        locale={esLocale}
        height="auto"
        eventTextColor="#000"
        eventDisplay="block"
        slotLabelFormat={{
          hour: "2-digit",
          minute: "2-digit",
          omitZeroMinute: false,
          hour12: false,
        }}
        dayHeaderContent={(arg) => {
          const dayName = arg.text.charAt(0).toUpperCase() + arg.text.slice(1)
          return <span>{dayName}</span>
        }}
        dayHeaderFormat={{ weekday: "long" }}
        eventContent={(arg) => (
          <div className="flex flex-col items-start px-2 py-1">
            <p className="font-medium">{arg.event.title}</p>
            <p className="text-xs text-gray-500">{arg.timeText}</p>
          </div>
        )}
      />
    </div>
  )
}
