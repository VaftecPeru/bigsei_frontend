import React from 'react';
import { CalendarDays, ClipboardCheck, Clock1 } from 'lucide-react';
import GradesTable from '@/components/tables/GradesTable';
import DownloadButton from '@/components/ui/DownloadButton';
import PayTable from '@/components/tables/PayTable';
import DebtTable from '@/components/tables/DebtTable';

function Debt() {
    
    
    const paymentsData = [
        {
            id: 1,
            fecharegistro: '2024-12-01',
            descripcion: 'Pago de matrícula',
            saldo: 200.0,
            estado: 'Deuda',
            observacion: 'No podra Matricularse',
        },
        {
            id: 2,
            fecharegistro: '2024-12-05',
            descripcion: 'Cuota mensual',
            saldo: 100.0,
            estado: 'Deuda',
            observacion: '',
        },
        {
            id: 3,
            fecharegistro: '2024-12-10',
            descripcion: 'Pago extraordinario',
            saldo: 50.0,
            estado: 'Deuda',
            observacion: '',
        },
    ];
    
    const headers = [
        'ID',
        'Fecha de Registro',
        'Descripción',
        'Saldo',
        'Estado',
        'Observacion',
    ];

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
                            Reporte de deudas
                        </h2>
                    </div>
                    <p className="text-sm text-blue-500 hover:underline cursor-pointer">Ver todo</p>
                </div>


                {/* Tablas de notas */}
                <div className="max-w-7xl w-full shadow-md rounded-lg bg-white mt-8">
                    <div className="flex justify-end mb-4 m-3">
                        <DownloadButton 
                            label="Descargar" 
                        // onClick={handleDownload} 
                        />
                    </div>
                    <DebtTable headers={headers} payments={paymentsData} />
                </div>
            </div>
        </div>
    );
}

export default Debt;
