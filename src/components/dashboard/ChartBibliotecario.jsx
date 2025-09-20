import { useState, useEffect } from "react";
import { Download } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Api_Global_Dashboard } from "../../services/DashboardApi";
import apiClient from "../../Utils/apiClient";

const ChartBibliotecario = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("anual");
  const [rawData, setRawData] = useState({ visitas: [] });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Array para los nombres cortos de los meses en español
  const monthNames = [
    "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
    "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(
          Api_Global_Dashboard.bibliotecario.visitas()
        );
        setRawData({
          visitas: response.data.data || [],
        });
        setError(null);
      } catch (error) {
        console.error("Error al obtener datos:", error);
        setError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (rawData.visitas && rawData.visitas.length > 0) {
      filterDataByPeriod(selectedPeriod);
    }
  }, [selectedPeriod, rawData]);

  const filterDataByPeriod = (period) => {
    let filtered = [...rawData.visitas];

    switch (period.toLowerCase()) {
      case "hoy":
        filtered = rawData.visitas.slice(-1);
        break;
      case "15 días":
        filtered = rawData.visitas.slice(-2);
        break;
      case "mensual":
        filtered = rawData.visitas.slice(-1);
        break;
      case "trimestre":
        filtered = rawData.visitas.slice(-3);
        break;
      case "anual":
      default:
        filtered = rawData.visitas.slice(-12);
        break;
    }

    const formatted = filtered.map((item) => ({
      name: monthNames[(item.mes || 1) - 1], // Mes número a nombre corto
      value: item.total_visitas || 0,         // Total visitas correcto
    }));

    setChartData(formatted);
  };

  const handleExport = () => {
    // Aquí implementa la exportación (CSV, Excel, PDF, etc)
    console.log("Exportando datos:", chartData);
  };

  if (loading) return <div className="text-center py-8">Cargando datos...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="w-full mx-auto bg-white p-5 sm:p-6 rounded-2xl border border-gray-100 shadow-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Frecuencia de visitas
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Visualiza el comportamiento de tus usuarios
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
          {/* Period Filters */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            {["Hoy", "15 días", "Mensual", "Trimestre", "Anual"].map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period.toLowerCase())}
                className={`px-3 py-1.5 rounded-full text-xs sm:text-sm transition-all whitespace-nowrap ${
                  selectedPeriod === period.toLowerCase()
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {period}
              </button>
            ))}
          </div>

          {/* Export Button */}
          <button
            onClick={handleExport}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white border border-indigo-500 text-indigo-600 hover:bg-indigo-50 transition-colors text-sm font-medium shadow-sm"
            disabled={chartData.length === 0}
          >
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[280px] sm:h-[350px]">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 10, left: 0, bottom: 10 }}
              barCategoryGap={15}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="100%" stopColor="#6366F1" />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6B7280" }}
                padding={{ left: 10, right: 10 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#6B7280" }}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                  fontSize: "12px",
                }}
                formatter={(value) => [value.toLocaleString(), "Visitas"]}
              />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <Bar
                dataKey="value"
                fill="url(#colorValue)"
                radius={[6, 6, 0, 0]}
                barSize={24}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No hay datos disponibles
          </div>
        )}
      </div>

      {/* Legend */}
      {chartData.length > 0 && (
        <div className="flex justify-end mt-2">
          <div className="flex items-center text-xs text-gray-500">
            <div className="w-3 h-3 rounded-sm bg-indigo-500 mr-2"></div>
            <span>Total de visitas</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartBibliotecario;