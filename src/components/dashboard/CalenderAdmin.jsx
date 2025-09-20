import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import esLocale from "@fullcalendar/core/locales/es";

const CalendarAdmin = () => {
  const [currentView, setCurrentView] = useState("timeGridWeek");

  const events = [
    {
      title: "Algorítmica II - Teórico",
      start: "2024-11-18T08:00:00",
      end: "2024-11-18T10:00:00",
      backgroundColor: "#D6E4FF",
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
      backgroundColor: "#D0F0C0",
      borderColor: "#85C785",
    },
    {
      title: "Algorítmica II - Práctico",
      start: "2024-11-21T10:30:00",
      end: "2024-11-21T12:00:00",
      backgroundColor: "#D0F0C0",
      borderColor: "#85C785",
    },
  ];

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  return (
    <div className="mt-8 flex justify-center">
      <div className="w-full max-w-4xl"> 
        <div className="flex items-center justify-between mb-4">
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

          <div className="flex items-center gap-2">
            {["dayGridDay", "timeGridWeek", "dayGridMonth", "listYear"].map((view) => (
              <button
                key={view}
                onClick={() => handleViewChange(view)}
                className={`px-4 py-2 rounded-md text-sm ${
                  currentView === view
                    ? "bg-red-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {view === "dayGridDay"
                  ? "Day"
                  : view === "timeGridWeek"
                  ? "Week"
                  : view === "dayGridMonth"
                  ? "Month"
                  : "Year"}
              </button>
            ))}
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="border rounded-md px-3 py-1 text-sm bg-gray-100 focus:ring focus:outline-none"
            />
          </div>
        </div>

        <FullCalendar
          plugins={[timeGridPlugin, interactionPlugin, dayGridPlugin]}
          initialView={currentView}
          initialDate="2024-11-20"
          headerToolbar={false}
          allDaySlot={false}
          slotMinTime="08:00:00"
          slotMaxTime="18:00:00"
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
        />
      </div>
    </div>
  );
};

export default CalendarAdmin;
