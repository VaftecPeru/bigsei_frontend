import React, { useState, useEffect } from "react";
import { CardTitle } from "../ui/card";
import DownloadButton from "../ui/DownloadButton";
import { Card, CardHeader } from "@mui/material";

const AssistanceCourse = ({ records, columns, filters = [] }) => {
    const [filter, setFilter] = useState(filters.length > 0 ? filters[0].value : null);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredData = filter ? records.filter(item => item.asignatura === filter) : records;

    const renderEstado = (estado) => {
        switch (estado) {
            case "Asistió":
                return (
                    <span className="inline-flex items-center justify-center w-24 px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md cursor-pointer">
                        {estado}
                    </span>

                );
            case "Justificado":
                return (
                    <span className="inline-flex items-center justify-center w-24 px-4 py-2 text-sm font-semibold text-white bg-yellow-500 rounded-md cursor-pointer">
                        {estado}
                    </span>
                );
            case "Inasistió":
                return (
                    <span className="inline-flex items-center justify-center w-24 px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-md cursor-pointer">
                        {estado}
                    </span>
                );
            default:
                return estado;
        }
    };

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;

    // Calcular los elementos a mostrar
    const currentItems = filteredData.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    // Resetear a página 0 cuando cambian los filtros
    useEffect(() => {
        setCurrentPage(0);
    }, [filteredData]);

    return (
        <Card className="w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
                <div className="flex w-full justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-800">Asistencia de docentes</h2>

                    {filters.length > 0 && (
                        <div className="mb-4">
                            <select
                                value={filter || ""}
                                onChange={handleFilterChange}
                                className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="">Todos</option>
                                {filters.map((filterOption) => (
                                    <option key={filterOption.value} value={filterOption.value}>
                                        {filterOption.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {columns.map((col, index) => (
                                    <th
                                        key={index}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        {col.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentItems.map((row, index) => (
                                <tr key={row.id} className="hover:bg-gray-50">
                                    {columns.map((col, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-600"
                                        >
                                            {col.accessor === "estado" ? renderEstado(row[col.accessor]) : row[col.accessor]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Paginación */}
                <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
                    <div className="text-sm text-gray-700">
                        Mostrando <span className="font-medium">{currentPage * itemsPerPage + 1}</span> a{" "}
                        <span className="font-medium">
                            {Math.min((currentPage + 1) * itemsPerPage, filteredData.length)}
                        </span>{" "}
                        de <span className="font-medium">{filteredData.length}</span> resultados
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 0))}
                            disabled={currentPage === 0}
                            className="px-4 py-2 border rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Anterior
                        </button>
                        <button
                            onClick={() => setCurrentPage(prev =>
                                Math.min(prev + 1, Math.ceil(filteredData.length / itemsPerPage) - 1)
                            )}
                            disabled={currentPage >= Math.ceil(filteredData.length / itemsPerPage) - 1}
                            className="px-4 py-2 border rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default AssistanceCourse;
