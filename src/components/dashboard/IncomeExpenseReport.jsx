import React, { useState, useEffect } from "react";
import { Download, TrendingUp, TrendingDown } from "lucide-react";
import {
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import apiClient from "../../Utils/apiClient";
import { Skeleton } from "@/components/ui/skeleton";

function IncomeExpenseReport() {
    const timeFilters = ["Hoy", "15 dias", "Mensual", "Trimestre", "Anual"];
    const [selectedFilter, setSelectedFilter] = useState("Mensual");
    const [chartData, setChartData] = useState([]);
    const [summary, setSummary] = useState({
        total_ingresos: 0,
        total_egresos: 0
    });
    const [loading, setLoading] = useState(true);

    const filterMap = {
        "Hoy": "hoy",
        "15 dias": "15dias",
        "Mensual": "mensual",
        "Trimestre": "trimestral",
        "Anual": "anual"
    };

    const getPeriodLabel = () => {
        const labels = {
            "Hoy": "Hoy",
            "15 dias": "Últimos 15 días",
            "Mensual": "Este mes",
            "Trimestre": "Este trimestre",
            "Anual": "Este año"
        };
        return labels[selectedFilter] || selectedFilter;
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-PE', {
            style: 'currency',
            currency: 'PEN',
            minimumFractionDigits: 2
        }).format(value);
    };

    const getBalanceStatus = () => {
        const balance = summary.total_ingresos - summary.total_egresos;
        return {
            value: Math.abs(balance),
            positive: balance >= 0
        };
    };

    const fetchData = async (filter) => {
        try {
            setLoading(true);
            const backendFilter = filterMap[filter] || "mensual";

            const response = await apiClient.get(
                `/dashboard/admin/balance-general?text_search=${backendFilter}`
            );

            const resData = response.data;

            // Aquí asignamos data recibida
            setChartData(resData.data || []);

            // Resumen desde backend (total ingresos, egresos)
            setSummary({
                total_ingresos: resData.ingresos || 0,
                total_egresos: resData.egresos || 0
            });

        } catch (error) {
            console.error("Error al obtener el reporte financiero:", error);
            // Opcional: limpiar datos o dejar como están
            setChartData([]);
            setSummary({ total_ingresos: 0, total_egresos: 0 });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(selectedFilter);
    }, [selectedFilter]);

    if (loading) {
        return (
            <Card className="w-full bg-white border-0 rounded-xl shadow-lg overflow-hidden">
                <CardHeader>
                    <Skeleton className="h-8 w-1/3" />
                    <Skeleton className="h-4 w-1/2 mt-2" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[350px] w-full" />
                </CardContent>
                <CardFooter>
                    <Skeleton className="h-6 w-full" />
                </CardFooter>
            </Card>
        );
    }

    return (
        <Card className="w-full bg-white border-0 rounded-xl shadow-lg overflow-hidden">
            <div>
                <CardHeader className="px-8 pt-6 pb-4">
                    <div className="flex justify-between items-start w-full">
                        <div>
                            <CardTitle className="text-2xl font-bold text-gray-900">Reporte Financiero</CardTitle>
                            <CardDescription className="text-sm font-medium text-gray-600">
                                Ingresos vs Egresos - {getPeriodLabel()}
                            </CardDescription>
                        </div>

                        <CardContent className="px-8 py-4 border-b border-gray-100/50">
                            <div className="flex flex-wrap gap-2">
                                {timeFilters.map((filter) => (
                                    <Button
                                        key={filter}
                                        onClick={() => {
                                            setSelectedFilter(filter);
                                        }}
                                        className={`text-sm transition-colors ${selectedFilter === filter
                                            ? "bg-green-600 hover:bg-green-700 text-white"
                                            : "bg-transparent hover:bg-gray-100"
                                            }`}
                                        variant="ghost"
                                    >
                                        {filter}
                                    </Button>
                                ))}
                            </div>
                        </CardContent>

                        <Button
                            variant="outline"
                            size="sm"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Exportar
                        </Button>
                    </div>
                </CardHeader>
            </div>

            {/* Chart */}
            <CardContent className="px-8 py-6">
                <ResponsiveContainer width="100%" height={350}>
                    <AreaChart
                        data={chartData}
                        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                        <XAxis
                            dataKey="month"
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            tickLine={false}
                            axisLine={{ stroke: '#e5e7eb' }}
                        />
                        <YAxis
                            tick={{ fill: '#6b7280', fontSize: 12 }}
                            tickLine={false}
                            axisLine={{ stroke: '#e5e7eb' }}
                            tickFormatter={(value) => `S/. ${value.toLocaleString()}`}
                        />
                        <Tooltip
                            formatter={(value, name) => {
                                const formattedValue = `S/. ${value.toLocaleString()}`;
                                if (name === "income") {
                                    return [formattedValue, "Ingresos"];
                                } else if (name === "expense") {
                                    return [formattedValue, "Egresos"];
                                }
                                return [formattedValue, name];
                            }}
                            labelFormatter={(label) => `Periodo: ${label}`}
                            contentStyle={{
                                backgroundColor: "white",
                                borderRadius: "8px",
                                border: "1px solid #e5e7eb",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                                padding: "12px 16px",
                                fontSize: "14px",
                            }}
                        />
                        <Legend />
                        <Area
                            type="monotone"
                            dataKey="income"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            fill="url(#colorIncome)"
                            fillOpacity={1}
                            name="Ingresos"
                            activeDot={{ r: 6 }}
                        />
                        <Area
                            type="monotone"
                            dataKey="expense"
                            stroke="#ef4444"
                            strokeWidth={2}
                            fill="url(#colorExpense)"
                            fillOpacity={1}
                            name="Egresos"
                            activeDot={{ r: 6 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>

            {/* Footer with stats */}
            <CardFooter className="px-8 py-4 bg-gray-50/50 border-t border-gray-100/50">
                <div className="flex flex-wrap items-center justify-between w-full gap-4">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <span className="text-sm font-medium text-gray-700">
                                Ingresos: {formatCurrency(summary.total_ingresos)}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <span className="text-sm font-medium text-gray-700">
                                Egresos: {formatCurrency(summary.total_egresos)}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        {getBalanceStatus().positive ? (
                            <>
                                <TrendingUp className="w-4 h-4 text-emerald-500" />
                                <span>Balance positivo: {formatCurrency(getBalanceStatus().value)}</span>
                            </>
                        ) : (
                            <>
                                <TrendingDown className="w-4 h-4 text-red-500" />
                                <span>Balance negativo: {formatCurrency(getBalanceStatus().value)}</span>
                            </>
                        )}
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}

export default IncomeExpenseReport;
