import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DownloadButton from "../ui/DownloadButton";
import { Api_Global_Dashboard } from "../../services/DashboardApi";
import apiClient from "../../Utils/apiClient";

export function PieChartDonutText() {
    const [cursos, setCursos] = useState([]);
    const [periodos, setPeriodos] = useState([]);
    const [ciclos, setCiclos] = useState([]);

    const [selectedCurso, setSelectedCurso] = useState("");
    const [selectedPeriodo, setSelectedPeriodo] = useState("");
    const [selectedCiclo, setSelectedCiclo] = useState("");

    const [loading, setLoading] = useState({
        periodos: true,
        ciclos: false,
        cursos: true,
        data: false
    });
    const [error, setError] = useState(null);
    const [attendanceData, setAttendanceData] = useState([
        { name: "Asistencia", value: 0, color: "#10B981" },
        { name: "Inasistencia", value: 0, color: "#EF4444" },
    ]);

    const getAttendanceData = async (idPeriodo, idCurso, idCiclo) => {
        if (!idPeriodo || !idCiclo || !idCurso) return;

        try {
            setLoading(prev => ({ ...prev, data: true }));
            const url = Api_Global_Dashboard.admin.asistencia(idPeriodo, idCurso, idCiclo);
            const response = await apiClient.get(url);

            const asistencia = response.data.asistio || 0;
            const inasistencia = response.data.noAsistio || 0;

            const total = asistencia + inasistencia;
            const porcentajeAsistencia = total > 0 ? Math.round((asistencia / total) * 100) : 0;
            const porcentajeInasistencia = total > 0 ? Math.round((inasistencia / total) * 100) : 0;

            setAttendanceData([
                { name: "Asistencia", value: porcentajeAsistencia, color: "#10B981" },
                { name: "Inasistencia", value: porcentajeInasistencia, color: "#EF4444" }
            ]);
        } catch (err) {
            console.error("Error al obtener asistencia:", err);
            setError("Error al cargar datos de asistencia");
            setAttendanceData([
                { name: "Asistencia", value: 0, color: "#10B981" },
                { name: "Inasistencia", value: 0, color: "#EF4444" }
            ]);
        } finally {
            setLoading(prev => ({ ...prev, data: false }));
        }
    };

    const getCursos = async (text_search = "") => {
        try {
            setLoading(prev => ({ ...prev, cursos: true }));
            const response = await apiClient.get(Api_Global_Dashboard.admin.listaNombreCurso(text_search));
            setCursos(response.data.data);
            setError(null);
        } catch (err) {
            console.error("Error al obtener cursos:", err);
            setError("Error al cargar los cursos");
            setCursos([]);
        } finally {
            setLoading(prev => ({ ...prev, cursos: false }));
        }
    };

    const getPeriodos = async (text_search = "") => {
        try {
            setLoading(prev => ({ ...prev, periodos: true }));
            const response = await apiClient.get(Api_Global_Dashboard.admin.listaNombrePeriodo(text_search));
            setPeriodos(response.data.data);
            setError(null);
        } catch (err) {
            console.error("Error al obtener periodos:", err);
            setError("Error al cargar los periodos");
            setPeriodos([]);
        } finally {
            setLoading(prev => ({ ...prev, periodos: false }));
        }
    };

    const getCiclosByPeriodo = async (idPeriodo) => {
        if (!idPeriodo) {
            setCiclos([]);
            setSelectedCiclo("");
            return;
        }

        try {
            setLoading(prev => ({ ...prev, ciclos: true }));
            const response = await apiClient.get(Api_Global_Dashboard.admin.listaNombreCiclo(idPeriodo));
            setCiclos(response.data.data);
            setError(null);
        } catch (err) {
            console.error("Error al obtener ciclos:", err);
            setError("Error al cargar los ciclos");
            setCiclos([]);
        } finally {
            setLoading(prev => ({ ...prev, ciclos: false }));
        }
    };

    const handleCursoChange = (value) => {
        setSelectedCurso(value);
        if (selectedPeriodo && selectedCiclo) {
            getAttendanceData(selectedPeriodo, value, selectedCiclo);
        }
    };

    const handlePeriodoChange = (value) => {
        setSelectedPeriodo(value);
        setSelectedCiclo("");
        getCiclosByPeriodo(value);
    };

    const handleCicloChange = (value) => {
        setSelectedCiclo(value);
        if (selectedPeriodo && selectedCurso) {
            getAttendanceData(selectedPeriodo, selectedCurso, value);
        }
    };

    useEffect(() => {
        getCursos();
        getPeriodos();
    }, []);

    useEffect(() => {
        if (selectedPeriodo && selectedCurso && selectedCiclo) {
            getAttendanceData(selectedPeriodo, selectedCurso, selectedCiclo);
        }
    }, [selectedPeriodo, selectedCurso, selectedCiclo]);

    return (
        <Card className="w-full max-w-4xl mx-auto rounded-xl border-0 shadow-xl bg-gradient-to-br from-white to-blue-50/50 h-[520px]">
            <CardHeader className="px-8 pt-6 pb-4 rounded-t-xl">
                <div className="flex justify-between items-center w-full">
                    <div>
                        <CardTitle className="text-2xl font-bold text-gray-900">Reporte de Asistencia</CardTitle>
                        <CardDescription className="text-sm font-medium text-gray-600">
                            Estadísticas del periodo académico actual
                        </CardDescription>
                    </div>
                    <DownloadButton
                        label="Descargar"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition-colors"
                    />
                </div>
            </CardHeader>

            <CardContent className="flex flex-row items-center justify-between gap-3 px-8 py-4 bg-white/50 border-b border-gray-100/50">
                {/* Select de Periodo */}
                {loading.periodos ? (
                    <div className="w-40 h-10 bg-gray-100 rounded-md animate-pulse"></div>
                ) : error ? (
                    <div className="text-red-500">{error}</div>
                ) : (
                    <Select value={selectedPeriodo} onValueChange={handlePeriodoChange}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Periodo" />
                        </SelectTrigger>
                        <SelectContent>
                            {periodos.map((periodo) => (
                                <SelectItem key={periodo.idPeriodo} value={periodo.idPeriodo}>
                                    {periodo.nombre}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}

                {/* Select de Ciclo */}
                {loading.ciclos ? (
                    <div className="min-w-[120px] h-10 bg-gray-100 rounded-md animate-pulse"></div>
                ) : error ? (
                    <div className="text-red-500">{error}</div>
                ) : (
                    <Select
                        value={selectedCiclo}
                        onValueChange={handleCicloChange}
                        disabled={!selectedPeriodo || ciclos.length === 0}
                    >
                        <SelectTrigger className="min-w-[120px]">
                            <SelectValue placeholder="Ciclo" />
                        </SelectTrigger>
                        <SelectContent>
                            {ciclos.map((ciclo) => (
                                <SelectItem key={ciclo.idCiclo} value={ciclo.idCiclo}>
                                    {ciclo.nombreCiclo}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}

                {/* Select de Curso */}
                {loading.cursos ? (
                    <div className="w-40 h-10 bg-gray-100 rounded-md animate-pulse"></div>
                ) : error ? (
                    <div className="text-red-500">{error}</div>
                ) : (
                    <Select value={selectedCurso} onValueChange={handleCursoChange}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Curso" />
                        </SelectTrigger>
                        <SelectContent>
                            {cursos.map((curso) => (
                                <SelectItem key={curso.idCurso} value={curso.idCurso}>
                                    {curso.nombre}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            </CardContent>

            <CardContent className="flex justify-center items-center gap-10 px-8 py-6 h-[300px]">
                {/* Gráfico de Asistencia */}
                <div className="flex flex-col items-center relative">
                    <div className="absolute -top-2 -right-2 bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded-full">
                        {loading.data ? '...' : '+2.5%'}
                    </div>
                    <ResponsiveContainer width={160} height={160}>
                        <PieChart>
                            <Pie
                                data={attendanceData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={45}
                                outerRadius={75}
                                paddingAngle={2}
                                startAngle={90}
                                endAngle={-270}
                                animationDuration={800}
                            >
                                {attendanceData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                        stroke="white"
                                        strokeWidth={2}
                                    />
                                ))}
                            </Pie>
                            <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="text-3xl font-bold fill-gray-800"
                            >
                                {loading.data ? '...' : `${attendanceData[0]?.value || 0}%`}
                            </text>
                        </PieChart>
                    </ResponsiveContainer>
                    <p className="mt-3 text-center text-sm font-semibold text-gray-700 bg-emerald-100/50 px-3 py-1 rounded-full">
                        Asistencia
                    </p>
                </div>

                {/* Gráfico de Inasistencia */}
                <div className="flex flex-col items-center relative">
                    <div className="absolute -top-2 -right-2 bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-full">
                        {loading.data ? '...' : '-1.2%'}
                    </div>
                    <ResponsiveContainer width={160} height={160}>
                        <PieChart>
                            <Pie
                                data={attendanceData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                innerRadius={45}
                                outerRadius={75}
                                paddingAngle={2}
                                startAngle={90}
                                endAngle={-270}
                                animationDuration={800}
                            >
                                {attendanceData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                        stroke="white"
                                        strokeWidth={2}
                                    />
                                ))}
                            </Pie>
                            <text
                                x="50%"
                                y="50%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className="text-3xl font-bold fill-gray-800"
                            >
                                {loading.data ? '...' : `${attendanceData[1]?.value || 0}%`}
                            </text>
                        </PieChart>
                    </ResponsiveContainer>
                    <p className="mt-3 text-center text-sm font-semibold text-gray-700 bg-red-100/50 px-3 py-1 rounded-full">
                        Inasistencia
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}