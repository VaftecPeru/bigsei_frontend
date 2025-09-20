import React from 'react';
import { Calendar, CalendarDays } from 'lucide-react';
import GradesTable from '@/components/tables/GradesTable';
import DownloadButton from '@/components/ui/DownloadButton';
import CalendarNew from '@/components/dashboard/CalendarNew';

function Horario() {
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

    const handleEventClick = (info) => {
        alert(`Evento clickeado: ${info.event.title}`);
    };

    return (
        <div className="flex flex-col justify-start items-center min-h-screen text-lg w-full bg-sky-50 p-6">
            <div className="w-full max-w-7xl p-4">
                <div className="flex justify-end items-center text-sm text-gray-500">
                    <span>
                        <a href="#" className="hover:underline">
                            Iaion &gt; Menú &gt; Cursos
                        </a>
                    </span>
                </div>
            </div>

            {/* Principal aqui esta los card mas la tabla */}
            <div className="max-w-7xl w-full shadow-md rounded-lg bg-white">
                <div className="flex items-center justify-between border-b p-4">
                    <div className='flex gap-x-2'>
                        <img src="/img/icons/calendar-2.svg" alt="" />
                        <h2 className="text-base font-semibold">
                            Reporte de horario
                        </h2>
                    </div>
                    <div>
                        <DownloadButton 
                            label="Descargar" 
                        />
                    </div>
                    
                </div>
                

                <div className="">
                    
                    <CalendarNew events={events} onEventClick={handleEventClick} />
                </div>
            </div>
        </div>
    );
}

export default Horario;
