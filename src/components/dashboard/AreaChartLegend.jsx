import { useState, useEffect } from 'react';
import { TrendingUp } from "lucide-react";
import {
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import DownloadButton from "../ui/DownloadButton";
import { Api_Global_Dashboard } from "../../services/DashboardApi";
import apiClient from "../../Utils/apiClient";

export function AreaChartLegend() {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totales, setTotales] = useState({ aprobados: 0, desaprobados: 0 });

    const listarEvaluacionesNotas = async () => {
        try {
            setLoading(true);
            const response = await apiClient.get(Api_Global_Dashboard.admin.notas(""));
            
            if (response.data?.success && response.data.data?.evaluaciones_por_mes) {
                // Transformar fechas a formato "MMM YYYY" y ordenar por fecha (más reciente primero)
                const transformedData = response.data.data.evaluaciones_por_mes
                    .map(item => ({
                        fecha: new Date(item.fecha),
                        month: new Date(item.fecha).toLocaleDateString('es-ES', {
                            month: 'short',
                            year: 'numeric'
                        }),
                        aprobados: item.aprobados,
                        desaprobados: item.desaprobados
                    }))
                    .sort((a, b) => b.fecha - a.fecha) // Orden descendente
                    .map(item => ({
                        month: item.month,
                        average: item.aprobados,
                        failed: item.desaprobados
                    }));

                setChartData(transformedData);
                setTotales(response.data.data.totales || { aprobados: 0, desaprobados: 0 });
            } else {
                throw new Error("La estructura de datos no es la esperada");
            }
        } catch (error) {
            console.error("Error al obtener evaluaciones:", error);
            setError(error.message);
            setChartData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        listarEvaluacionesNotas();
    }, []);

    if (loading) {
        return (
            <Card className="w-full h-full bg-white border-0 rounded-2xl shadow-lg overflow-hidden">
                <CardContent className="flex items-center justify-center h-80">
                    <p>Cargando datos de calificaciones...</p>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="w-full h-full bg-white border-0 rounded-2xl shadow-lg overflow-hidden">
                <CardContent className="flex items-center justify-center h-80 text-red-500">
                    <p>Error: {error}</p>
                </CardContent>
            </Card>
        );
    }

    const dateRange = chartData.length > 0
        ? `${chartData[chartData.length - 1].month} - ${chartData[0].month}`
        : 'No hay datos disponibles';

    return (
        <Card className="w-full h-full bg-white border-0 rounded-2xl shadow-lg overflow-hidden">
            <CardHeader className="relative flex flex-col space-y-1 px-8 pt-8 pb-2">
                <div className="flex justify-between items-start w-full">
                    <div>
                        <CardTitle className="text-2xl font-bold text-gray-900">Reporte de Calificaciones</CardTitle>
                        <CardDescription className="text-sm text-gray-600 font-medium">
                            {`Total Aprobados: ${totales.aprobados} | Total Desaprobados: ${totales.desaprobados}`}
                        </CardDescription>
                    </div>
                    <DownloadButton
                        label="Descargar"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition-all"
                        onClick={() => console.log('Descargar reporte')}
                    />
                </div>
            </CardHeader>

            <CardContent className="relative px-8 pb-2">
                {chartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={320}>
                        <AreaChart data={chartData}>
                            <defs>
                                <linearGradient id="colorAverage" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorFailed" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2}/>
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0"/>
                            <XAxis 
                                dataKey="month"
                                tick={{ fill: '#64748b', fontSize: '0.75rem', fontWeight: 500 }}
                                tickLine={false}
                                axisLine={{ stroke: '#cbd5e1' }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "white",
                                    borderRadius: "8px",
                                    border: "1px solid #e2e8f0",
                                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                    padding: "12px 16px",
                                }}
                                formatter={(value, name) => {
                                    if (name === 'average') return [value, 'Aprobados'];
                                    if (name === 'failed') return [value, 'Desaprobados'];
                                    return value;
                                }}
                                labelFormatter={(label) => `Periodo: ${label}`}
                            />
                            <Area
                                type="monotone"
                                dataKey="average"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                fill="url(#colorAverage)"
                                fillOpacity={1}
                                name="Aprobados"
                                activeDot={{ r: 6 }}
                            />
                            <Area
                                type="monotone"
                                dataKey="failed"
                                stroke="#8b5cf6"
                                strokeWidth={2}
                                fill="url(#colorFailed)"
                                fillOpacity={1}
                                name="Desaprobados"
                                activeDot={{ r: 6 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="flex items-center justify-center h-80">
                        <p>No hay datos de calificaciones disponibles</p>
                    </div>
                )}
            </CardContent>

            <div className="relative px-8 pb-8 pt-4 bg-gradient-to-r from-blue-50/30 to-purple-50/30 border-t border-gray-100/50">
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-3">
                        <div className="bg-emerald-100 p-2 rounded-lg">
                            <TrendingUp className="h-5 w-5 text-emerald-600"/>
                        </div>
                        <div>
                            <p className="font-bold text-gray-800">
                                {((totales.aprobados / (totales.aprobados + totales.desaprobados)) * 100).toFixed(1)}% de aprobados
                            </p>
                            <p className="text-sm text-gray-500">Tasa de aprobación histórica</p>
                        </div>
                    </div>
                    <div className="text-sm bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200 text-gray-600 font-medium">
                        {dateRange}
                    </div>
                </div>
            </div>
        </Card>
    );
}