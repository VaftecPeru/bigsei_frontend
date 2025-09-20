import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const AttendanceChart = ({ data }) => {
    return (
        <div className="flex flex-wrap justify-center gap-6 mt-6 px-4">
            {data.map((item, index) => {
                const percentage = Math.min((item.value / item.total) * 360, 360); // Asegura que no exceda 360°

                return (
                    <div
                        key={index}
                        className="flex flex-col items-center p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow w-[180px]"
                    >
                        <p className="mb-3 text-center text-sm font-semibold text-gray-800 truncate w-full">
                            {item.name}
                        </p>
                        <div className="relative">
                            <PieChart width={140} height={140}>
                                <Pie
                                    data={[item]}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={65}
                                    startAngle={90}
                                    endAngle={90 - percentage}
                                    cornerRadius={5} // Bordes redondeados
                                    paddingAngle={2} // Pequeño espacio
                                >
                                    <Cell
                                        fill={item.color}
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
                                    {Math.round(item.value)}% {/* Redondea el porcentaje */}
                                </text>
                            </PieChart>
                            {item.value === 100 && (
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                    <span className="text-xs font-medium text-green-600">✔️</span>
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default AttendanceChart;
