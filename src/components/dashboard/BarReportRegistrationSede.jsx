import { useState, useEffect } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import DownloadButton from '../ui/DownloadButton'
import { Api_Global_Dashboard } from "../../services/DashboardApi";
import apiClient from "../../Utils/apiClient";

const data = [
  { sede: "Sede 1", registrations: 50 },
  { sede: "Sede 2", registrations: 20 },
  { sede: "Sede 3", registrations: 80 },
  { sede: "Sede 4", registrations: 60 },
  { sede: "Sede 5", registrations: 45 },
  { sede: "Sede 6", registrations: 85 },
  { sede: "Sede 7", registrations: 65 },
]

const timeFilters = ["Hoy", "15 dias", "Mensual", "Trimestre", "Anual"]

function BarReportRegistrationSede() {
  const [selectedFilter, setSelectedFilter] = useState("Mensual");
  const [matriculasData, setMatriculasData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mapeo de filtros frontend a backend
  const filterMap = {
    "Hoy": "hoy",
    "15 dias": "15dias",
    "Mensual": "mensual",
    "Trimestre": "trimestral",
    "Anual": "anual"
  };

  const getMatriculasPorSede = async (filter) => {
    try {
      setLoading(true);
      const backendFilter = filterMap[filter] || "mensual";

      const response = await apiClient.get(
        `/dashboard/superadministrador/cantidad-matriculas-sede?text_search=${backendFilter}`
      );

      const formattedData = response.data.map((item) => ({
        sede: item.razon_social,
        registrations: item.cantidad
      }));

      setMatriculasData(formattedData);
    } catch (error) {
      console.error("Error al obtener matrículas por sede:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMatriculasPorSede(selectedFilter);
  }, [selectedFilter]);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
        <CardTitle className="text-xl">Nuevas matriculas por sede</CardTitle>
        <div className="flex items-center gap-28">
          <div className="flex gap-2">
            {timeFilters.map((filter) => (
              <Button
                key={filter}
                onClick={() => {
                  setSelectedFilter(filter)
                  getMatriculasPorSede("")
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
          <Button variant="outline" size="icon">
            <DownloadButton label="Descargar" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="h-[400px] flex items-center justify-center">
            <p>Cargando datos...</p>
          </div>
        ) : matriculasData.length === 0 ? (
          <div className="h-[400px] flex items-center justify-center">
            <p>No hay datos disponibles</p>
          </div>
        ) : (
          <div className="h-[400px] w-full text-sm">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={matriculasData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="sede"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#666' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#666' }}
                  domain={[0, 'dataMax + 10']}
                />
                <Tooltip
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{
                    background: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '4px'
                  }}
                />
                <Bar
                  dataKey="registrations"
                  fill="#818CF8"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default BarReportRegistrationSede