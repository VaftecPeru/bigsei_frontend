import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { Api_Global_Dashboard } from "../../services/DashboardApi";
import apiClient from "../../Utils/apiClient";

const ChartUsers = () => {
    const [resEstudiante, setResEstudiante] = useState({ cantidad: 0 });
    const [resDocente, setResDocente] = useState({ cantidad: 0 });

    const getResEstudiante = async (text_search) => {
        try {
            const response = await apiClient.get(Api_Global_Dashboard.bibliotecario.reservaEstudiante(text_search));
            setResEstudiante({
                cantidad: response.data.data.cantidad_reservas,
            });
        } catch (error) {
            console.error("Error al obtener sede:", error);
        }
    };

    const getResDocente = async (text_search) => {
        try {
            const response = await apiClient.get(Api_Global_Dashboard.bibliotecario.reservaDocente(text_search));
            setResDocente({
                cantidad: response.data.data.cantidad_reservas,
            });
        } catch (error) {
            console.error("Error al obtener profesores:", error);
        }
    };

    useEffect(() => {
        getResEstudiante("");
        getResDocente("");
    }, []);

    const totalReserva = resEstudiante.cantidad + resDocente.cantidad;

    const data = [
        {
            name: "Estudiantes",
            value: resEstudiante.cantidad,
            total: totalReserva,
            color: "#0088FE",
            label: `${resEstudiante.cantidad} reservas`
        },
        {
            name: "Docentes",
            value: resDocente.cantidad,
            total: totalReserva,
            color: "#FF8042",
            label: `${resDocente.cantidad} reservas`
        }
    ];

    const lightenColor = (color, percent) => {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return `#${(
            0x1000000 +
            (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
            (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
            (B < 255 ? (B < 1 ? 0 : B) : 255)
        ).toString(16).slice(1)}`;
    };

    return (
        <div className="flex flex-wrap justify-center gap-6 px-4">
            {data.map((item, index) => {
                const percentage = Math.min((item.value / item.total) * 360, 360);
                const lightColor = lightenColor(item.color, 40);
                const displayPercentage = item.total > 0 
                    ? Math.round((item.value / item.total) * 100)
                    : 0;

                return (
                    <div
                        key={index}
                        className="flex flex-col items-center p-4 w-[180px]"
                    >
                        <p className="mb-3 text-center text-sm font-semibold text-gray-800 truncate w-full">
                            {item.name}
                        </p>
                        <div className="relative">
                            <PieChart width={140} height={140}>
                                <Pie
                                    data={[
                                        { value: item.value, name: item.name },
                                        { value: item.total - item.value, name: 'remaining' }
                                    ]}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={45}
                                    outerRadius={65}
                                    startAngle={90}
                                    endAngle={-270}
                                    cornerRadius={5}
                                    paddingAngle={2}
                                >
                                    <Cell
                                        key="cell-active"
                                        fill={item.color}
                                        stroke="#fff"
                                        strokeWidth={1.5}
                                    />
                                    <Cell
                                        key="cell-inactive"
                                        fill={lightColor}
                                        stroke="#fff"
                                        strokeWidth={1.5}
                                    />
                                </Pie>
                                <text
                                    x="50%"
                                    y="50%"
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className="text-xl font-bold fill-gray-800"
                                >
                                    {displayPercentage}%
                                </text>
                            </PieChart>
                            {item.value === item.total && (
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <span className="text-xs font-medium text-green-600">✔️</span>
                                </div>
                            )}
                        </div>
                        <p className="text-sm">{item.label}</p>
                    </div>
                );
            })}
            {totalReserva === 0 && (
                <div className="flex items-center justify-center w-full py-4 text-gray-500">
                    No hay datos de reservas disponibles
                </div>
            )}
        </div>
    );
};

export default ChartUsers;