import React from 'react';
import Header from './Header';
import { Play, FileText, DollarSign, ShieldCheck, CheckCircle } from 'lucide-react';

export default function Reporte({ ficha, pasos, pasoActual }) {
    // Valores por defecto para pruebas
    const defaultFicha = {
        nombre: "Rodrigo Garcia",
        codigo: "2021001234",
        carrera: "Ingeniería de Sistemas",
        ciclo: "VII",
        sede: "Lima",
        estado: "En revisión",
    };

    const defaultPasos = [
        { nombre: "Inicio", fecha: "02/08/2024" },
        { nombre: "Revisión", fecha: "03/08/2024" },
        { nombre: "Autorización de pago", fecha: "04/08/2024" },
        { nombre: "Verificación final", fecha: "05/08/2024" },
        { nombre: "Concluido", fecha: "06/08/2024" },
    ];

    const defaultPasoActual = 2;

    const dataFicha = ficha || defaultFicha;
    const dataPasos = pasos || defaultPasos;
    const dataPasoActual = pasoActual !== undefined ? pasoActual : defaultPasoActual;

    const obtenerIcono = (nombre, color = 'white', ariaLabel) => {
        const props = { size: 20, color, 'aria-label': ariaLabel };
        switch (nombre) {
            case "Inicio":
                return <Play {...props} />;
            case "Revisión":
                return <FileText {...props} />;
            case "Autorización de pago":
                return <DollarSign {...props} />;
            case "Verificación final":
                return <ShieldCheck {...props} />;
            case "Concluido":
                return <CheckCircle {...props} />;
            default:
                return <CheckCircle {...props} />;
        }
    };

    const handlePrioridadClick = () => {
        alert('Marcado como prioritario'); // Reemplazar con lógica real
    };

    return (
        <div className="min-h-screen bg-[#dfebfb]">
            <Header />

            <main className="p-8 max-w-6xl mx-auto">
                <div className="p-6 bg-[#dfebfb] min-h-screen">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Panel de Ficha Académica */}
                        <div className="bg-white p-4 rounded-xl shadow col-span-2">
                            <h2 className="text-lg font-semibold mb-2">Ficha Académica</h2>
                            <p className="text-2xl font-bold text-black">{dataFicha.nombre}</p>
                            <div className="mt-2 grid grid-cols-2 gap-x-6">
                                <p><span className="font-semibold text-gray-500">Programa:</span> {dataFicha.carrera}</p>
                                <p><span className="font-semibold text-gray-500">Ciclo:</span> <span className="text-blue-700 font-semibold">{dataFicha.estado}</span></p>
                                <p><span className="font-semibold text-gray-500">Sede:</span> {dataFicha.sede}</p>
                            </div>
                        </div>

                        {/* Panel de Prioridad */}
                        <div>
                            <div className="bg-white p-4 rounded-xl shadow flex flex-col justify-between">
                                <div className="flex items-start gap-4 divide-x divide-gray-300">
                                    <div className="flex-1 pl-4 text-left">
                                        <p className="text-sm text-gray-600">Tiempo promedio por etapa</p>
                                        <p className="text-4xl font-bold text-[#00407D]">
                                            2,1 <span className="text-base">días</span>
                                        </p>
                                    </div>

                                    <div className="flex-1 pl-4 text-left">
                                        <p className="text-sm text-gray-600">Tiempo ran del cap-docente</p>
                                        <p className="text-4xl font-bold text-[#00407D]">
                                            3,0 <span className="text-base">días</span>
                                        </p>
                                    </div>

                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    onClick={handlePrioridadClick}
                                    className="mt-4 bg-[#22a8e8] hover:bg-[#148AC3] text-white py-2 px-8 rounded-lg font-medium"
                                >
                                    Marcar como prioritario
                                </button>
                            </div>
                        </div>

                        {/* Panel de Visualización del Trámite */}
                        <div className="bg-white p-4 rounded-xl shadow col-span-2">
                            <h3 className="text-xl font-semibold mb-3">Visualización del trámite</h3>

                            <div className="flex items-center justify-between relative flex-col sm:flex-row text-center">

                                {/* Barra de progreso */}
                                <div
                                    role="progressbar"
                                    aria-valuenow={(dataPasoActual / (dataPasos.length - 1)) * 100}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                    className="absolute top-5 left-0 w-full h-1 bg-gray-300 z-0"
                                >
                                    <div
                                        className="h-1 bg-[#00407D] transition-all duration-500"
                                        style={{ width: `${(dataPasoActual / (dataPasos.length - 1)) * 100}%` }}
                                    />
                                </div>

                                {/* Pasos del proceso */}
                                {dataPasos.map((paso, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center flex-1 z-10 min-h-[100px]"
                                    >
                                        <div
                                            className={`
                        w-10 h-10 rounded-full flex items-center justify-center font-bold text-white
                        ${index < dataPasoActual ? "bg-[#00407D]" : ""}
                        ${index === dataPasoActual ? "bg-pink-500" : ""}
                        ${index > dataPasoActual ? "bg-gray-300" : ""}
                    `}
                                        >
                                            {index < dataPasoActual ? (
                                                <CheckCircle
                                                    size={20}
                                                    color="white"
                                                    aria-label={`Paso ${paso.nombre} completado`}
                                                />
                                            ) : (
                                                <span className="w-5 h-5 flex items-center justify-center">
                                                    {obtenerIcono(paso.nombre, 'white', `Icono de ${paso.nombre}`)}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm font-semibold mt-1 text-center">{paso.nombre}</p>
                                        {index <= dataPasoActual && (
                                            <p className="text-xs text-gray-500 text-center">{paso.fecha}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>


                        {/* Panel de Estadísticas Comparativas */}
                        <div className="bg-white p-4 rounded-xl shadow">
                            <h3 className="text-lg font-semibold mb-2">Estadísticas comparativas</h3>
                            <p className="text-sm">Rendimiento del ama académica</p>
                            <p className="text-2xl font-bold text-blue-800 mt-1">17,4%</p>
                            <p className="mt-4 text-sm">% de expedientes retrasados</p>
                            <div className="text-sm mt-1">
                                <p className="flex justify-between"><span>Arequipa</span> <span>3.8</span></p>
                                <p className="flex justify-between"><span>Trujillo</span> <span>3.0</span></p>
                            </div>
                        </div>

                        {/* Panel de Historial Académico */}
                        <div className="bg-white p-4 rounded-xl shadow lg:col-span-3">
                            <h3 className="text-lg font-semibold mb-4">Informe del historial académico</h3>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Exportar</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        <tr>
                                            <td className="px-6 py-4 text-sm text-gray-700">Admisión</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">15/02/2022</td>
                                            <td className="px-6 py-4 text-sm text-right">
                                                <a href="#" className="text-blue-600 hover:underline">Exportar a PDF</a>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="px-6 py-4 text-sm text-gray-700">Matrícula</td>
                                            <td className="px-6 py-4 text-sm text-gray-700">11/03/2022</td>
                                            <td className="px-6 py-4 text-sm text-right">
                                                <a href="#" className="text-blue-600 hover:underline">Exportar a PDF</a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>


                    </div>
                </div>
            </main>
        </div>
    );
}