import * as React from "react"
import { PieChart, Pie, Cell } from "recharts"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import DownloadButton from "../ui/DownloadButton"
import { Api_Global_Dashboard } from "../../services/DashboardApi"
import apiClient from "../../Utils/apiClient"
import { useState, useEffect } from "react"

const COLORS = {
    asistencia: "#22C55E",
    inasistencia: "#EF4444",
    empty: "#F3F4F6"
}

export function PieChartAttendaceSede() {
    const [sedes, setSedes] = useState([])
    const [selectedSede, setSelectedSede] = useState("")
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [attendanceData, setAttendanceData] = useState([
        { name: "Asistencia", value: 0, color: COLORS.asistencia },
        { name: "Inasistencia", value: 0, color: COLORS.inasistencia },
    ])

    const getSedes = async (text_search = "") => {
        try {
            setLoading(true)
            const response = await apiClient.get(Api_Global_Dashboard.superadministradores.listaNombresSede(text_search))
            setSedes(response.data.data)
            setError(null)
        } catch (err) {
            console.error("Error al obtener sedes:", err)
            setError("Error al cargar las sedes")
            setSedes([])
        } finally {
            setLoading(false)
        }
    }

    const getAttendanceData = async (sedeId) => {
        if (!sedeId) return;

        try {
            setLoading(true)
            const url = Api_Global_Dashboard.superadministradores.porcentajeAsistencia(sedeId)
            const response = await apiClient.get(url)

            const asistencia = response.data.porcentaje_asistio || 0;
            const inasistencia = response.data.porcentaje_no_asistio || 0;

            setAttendanceData([
                { name: "Asistencia", value: asistencia, color: COLORS.asistencia },
                { name: "Inasistencia", value: inasistencia, color: COLORS.inasistencia }
            ])
        } catch (err) {
            console.error("Error al obtener asistencia:", err)
            setError("Error al cargar datos de asistencia")
            setAttendanceData([
                { name: "Asistencia", value: 0, color: COLORS.asistencia },
                { name: "Inasistencia", value: 0, color: COLORS.inasistencia }
            ])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getSedes()
    }, [])

    useEffect(() => {
        if (selectedSede) {
            getAttendanceData(selectedSede)
        }
    }, [selectedSede])

    const handleSedeChange = (value) => {
        setSelectedSede(value)
    }

    // Función para determinar qué datos mostrar en cada gráfico
    const getChartData = (chartType) => {
        if (!selectedSede) {
            return [{ name: "empty", value: 100, color: COLORS.empty }];
        }

        if (chartType === "asistencia") {
            return attendanceData[0].value === 0
                ? [{ name: "empty", value: 100, color: COLORS.empty }]
                : attendanceData;
        } else {
            return attendanceData[1].value === 0
                ? [{ name: "empty", value: 100, color: COLORS.empty }]
                : attendanceData;
        }
    }

    return (
        <Card className="w-full max-w-4xl mx-auto rounded-lg shadow-lg h-[517px]">
            <CardHeader className="flex justify-between items-center">
                <div className="flex w-full flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <CardTitle className="text-lg sm:text-xl">
                        Reporte de asistencia de docentes por sede
                    </CardTitle>
                    <DownloadButton label="Descargar" />
                </div>
            </CardHeader>

            <CardContent className="flex flex-wrap items-center justify-between gap-4 mt-4">
                {loading ? (
                    <div>Cargando sedes...</div>
                ) : error ? (
                    <div className="text-red-500">{error}</div>
                ) : (
                    <Select value={selectedSede} onValueChange={handleSedeChange}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Seleccione sede" />
                        </SelectTrigger>
                        <SelectContent>
                            {sedes.map((sede) => (
                                <SelectItem
                                    key={sede.id_empresa}
                                    value={sede.id_empresa}
                                >
                                    {sede.razon_social}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            </CardContent>

            <CardContent className="flex justify-center gap-8 mt-6">
                <div className="flex flex-col items-center">
                    <PieChart width={150} height={174}>
                        <Pie
                            data={getChartData("asistencia")}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={75}
                            paddingAngle={5}
                            startAngle={90}
                            endAngle={-270}
                        >
                            {getChartData("asistencia").map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-2xl font-bold fill-gray-800"
                        >
                            {selectedSede ? `${attendanceData[0].value}%` : "--"}
                        </text>
                    </PieChart>
                    <p className="mt-2 text-center text-sm font-medium text-gray-700">
                        Asistencia
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <PieChart width={150} height={174}>
                        <Pie
                            data={getChartData("inasistencia")}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={75}
                            paddingAngle={5}
                            startAngle={90}
                            endAngle={-270}
                        >
                            {getChartData("inasistencia").map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="text-2xl font-bold fill-gray-800"
                        >
                            {selectedSede ? `${attendanceData[1].value}%` : "--"}
                        </text>
                    </PieChart>
                    <p className="mt-2 text-center text-sm font-medium text-gray-700">
                        Inasistencia
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}