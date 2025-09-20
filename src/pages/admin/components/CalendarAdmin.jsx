import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";
import { Search } from "lucide-react";

export default function CalendarAdmin({ events, initialView = "timeGridWeek", onEventClick, initialDate = "2024-11-20", slotMinTime = "08:00:00", slotMaxTime = "18:00:00" }) {
  const [currentView, setCurrentView] = useState(initialView);

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="mt-5 flex justify-center">
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between mb-4 gap-2">
          <div className="flex items-center gap-2">
            <button className="text-gray-700 bg-gray-100 px-2 py-1 rounded-md hover:bg-gray-200 text-sm">
              {"<"}
            </button>
            <button className="text-gray-700 bg-gray-100 px-2 py-1 rounded-md hover:bg-gray-200 text-sm">
              Hoy
            </button>
            <button className="text-gray-700 bg-gray-100 px-2 py-1 rounded-md hover:bg-gray-200 text-sm">
              {">"}
            </button>
          </div>

          <div className="flex flex-wrap gap-2 justify-start sm:justify-end">
            {["dayGridDay", "timeGridWeek", "dayGridMonth", "listYear"].map((view) => (
              <button
                key={view}
                onClick={() => handleViewChange(view)}
                className={`px-4 py-2 rounded-md text-base ${
                  currentView === view
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {view === "dayGridDay"
                  ? "Día"
                  : view === "timeGridWeek"
                  ? "Semana"
                  : view === "dayGridMonth"
                  ? "Mes"
                  : "Año"}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Buscar"
              className="border rounded-md pl-10 pr-3 py-1 text-sm bg-gray-100 focus:ring focus:outline-none w-full sm:w-auto"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <FullCalendar
            plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
            initialView={currentView}
            initialDate={initialDate}
            headerToolbar={false}
            allDaySlot={false}
            slotMinTime={slotMinTime}
            slotMaxTime={slotMaxTime}
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
              const dayName = arg.text.charAt(0).toUpperCase() + arg.text.slice(1);
              return <span className="text-sm">{dayName}</span>;
            }}
            dayHeaderFormat={{ weekday: "long" }}
            eventContent={(arg) => (
              <div className="flex flex-col items-start px-2 py-1 text-sm">
                <p className="font-medium">{arg.event.title}</p>
                <p className="text-xs text-gray-500">{arg.timeText}</p>
              </div>
            )}
            slotLabelContent={(arg) => (
              <span className="text-sm text-gray-700">{arg.text}</span>
            )}
            dayCellContent={(arg) => (
              <span className="text-sm text-gray-700">{arg.dayNumberText}</span>
            )}
            eventClick={onEventClick}
          />
        </div>
      </div>
    </div>
  );
}