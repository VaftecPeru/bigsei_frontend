import { useState, useEffect } from "react";
import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import DownloadButton from '../ui/DownloadButton';
import { Api_Global_Dashboard } from "../../services/DashboardApi";
import apiClient from "../../Utils/apiClient";

function BarSedes() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSedeData = async () => {
        try {
            setLoading(true);

            // Obtener datos para todas las sedes en paralelo
            const [profesoresRes, estudiantesRes, padresRes] = await Promise.all([
                apiClient.get(Api_Global_Dashboard.superadministradores.cantidadSedeDocentes()),
                apiClient.get(Api_Global_Dashboard.superadministradores.cantidadSedeEstudiantes()),
                apiClient.get(Api_Global_Dashboard.superadministradores.cantidadSedePadres())
            ]);

            // Procesar los datos del backend
            const procesarDatos = (backendData) => {
                return backendData.data.data.map(item => ({
                    id_sede: item.id_sede,
                    nombre_sede: item.nombre_sede || `Sede ${item.id_sede}`,
                    cantidad: item.cantidad || 0
                }));
            };

            const profesoresData = procesarDatos(profesoresRes);
            const estudiantesData = procesarDatos(estudiantesRes);
            const padresData = procesarDatos(padresRes);

            // Combinar todos los datos por sede
            const sedesUnicas = [...new Set([
                ...profesoresData.map(s => s.id_sede),
                ...estudiantesData.map(s => s.id_sede),
                ...padresData.map(s => s.id_sede)
            ])];

            const datosCombinados = sedesUnicas.map(sedeId => {
                const sedeProfesor = profesoresData.find(s => s.id_sede === sedeId);
                const sedeEstudiante = estudiantesData.find(s => s.id_sede === sedeId);
                const sedePadre = padresData.find(s => s.id_sede === sedeId);

                return {
                    sede: sedeProfesor?.nombre_sede || sedeEstudiante?.nombre_sede || sedePadre?.nombre_sede || `Sede ${sedeId}`,
                    Estudiantes: sedeEstudiante?.cantidad || 0,
                    Padres: sedePadre?.cantidad || 0,
                    Docentes: sedeProfesor?.cantidad || 0,
                };
            });

            setData(datosCombinados);
        } catch (error) {
            console.error("Error al obtener datos de sedes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSedeData();
    }, []);

    return (
        <Card className="w-full">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Reporte de sedes</CardTitle>
                <DownloadButton
                    label="Descargar"
                    data={data}
                    filename="reporte-sedes"
                />
            </CardHeader>
            <CardContent>
                <div className="h-[400px]">
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            Cargando datos...
                        </div>
                    ) : (
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={data}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="sede"
                                    tick={false}
                                    textAnchor="end"
                                    height={70}
                                />
                                <YAxis
                                    domain={[0, 'dataMax + 10']}
                                    tick={{ fontSize: 14 }}
                                />
                                <Tooltip
                                    wrapperStyle={{
                                        fontSize: '0.875rem'
                                    }}
                                />
                                <Legend
                                    iconType="circle"
                                    wrapperStyle={{
                                        fontSize: '0.875rem'
                                    }}
                                />
                                <Bar
                                    dataKey="Estudiantes"
                                    stackId="a"
                                    fill="#818cf8"
                                    name="Estudiantes"
                                />
                                <Bar
                                    dataKey="Padres"
                                    stackId="a"
                                    fill="#10b981"
                                    name="Padres"
                                />
                                <Bar
                                    dataKey="Docentes"
                                    stackId="a"
                                    fill="#059669"
                                    name="Docentes"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export default BarSedes;