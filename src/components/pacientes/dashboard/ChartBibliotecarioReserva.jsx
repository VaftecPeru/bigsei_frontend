import { useState, useEffect } from "react";
import { Download } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { Api_Global_Dashboard } from "../../../services/DashboardApi";
import apiClient from "../../../Utils/apiClient";

const formatMonth = (monthStr) => {
  const months = {
    '01': 'ENE', '02': 'FEB', '03': 'MAR', '04': 'ABR',
    '05': 'MAY', '06': 'JUN', '07': 'JUL', '08': 'AGO',
    '09': 'SEP', '10': 'OCT', '11': 'NOV', '12': 'DIC'
  };
  const monthPart = monthStr.split('-')[1];
  return months[monthPart] || monthStr;
};

const ChartBibliotecarioReserva = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("anual");
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        setLoading(true);
        setError(null);

        const endpoint = Api_Global_Dashboard.bibliotecario.reserva("");
        const response = await apiClient.get(endpoint);

        if (!response.data || !response.data.data) {
          throw new Error('Datos de respuesta no válidos');
        }

        const formattedData = response.data.data.map(item => ({
          name: formatMonth(item.mes),
          mesCompleto: item.mes,
          estudiante: item.estudiante || 0,
          docente: item.docente || 0
        }));

        setChartData(formattedData);
      } catch (err) {
        console.error("Error al obtener datos:", err);
        setError("No se pudieron cargar los datos de reservas");
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [selectedPeriod]);

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period.toLowerCase());
  };

  const handleExport = () => {
    console.log("Exportar datos", chartData);
  };

  if (loading) {
    return (
      <div className="w-full mx-auto bg-white p-5 sm:p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="h-[380px] flex items-center justify-center">
          <p>Cargando datos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full mx-auto bg-white p-5 sm:p-6 rounded-2xl shadow-lg border border-gray-100">
        <div className="h-[380px] flex items-center justify-center text-red-500">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto bg-white p-5 sm:p-6 rounded-2xl shadow-lg border border-gray-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Resumen de reservas</h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">Visualiza el resumen de reservas de los usuarios</p>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            {["Hoy", "15 días", "Mensual", "Trimestre", "Anual"].map((period) => (
              <button
                key={period}
                onClick={() => handlePeriodChange(period)}
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
          <button 
            onClick={handleExport}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-white border border-indigo-500 text-indigo-600 hover:bg-indigo-50 transition-colors text-sm font-medium shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      <div className="h-[300px] sm:h-[380px] bg-gray-50 rounded-lg p-4 border border-gray-200">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            <defs>
              <linearGradient id="colorEstudiante" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorDocente" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#EC4899" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#EC4899" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} />

            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                fontSize: "12px"
              }}
              formatter={(value, key) => {
                const roleLabels = {
                  estudiante: 'Estudiantes',
                  docente: 'Docentes'
                };
                return [value, roleLabels[key] || key];
              }}
              labelFormatter={(label) => {
                const item = chartData.find(d => d.name === label);
                return item ? `Mes: ${item.mesCompleto}` : label;
              }}
            />

            <Area
              name="Estudiantes"
              type="monotone"
              dataKey="estudiante"
              stroke="#4F46E5"
              fill="url(#colorEstudiante)"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />

            <Area
              name="Docentes"
              type="monotone"
              dataKey="docente"
              stroke="#EC4899"
              fill="url(#colorDocente)"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center sm:justify-end mt-4 gap-4">
        <div className="flex items-center text-xs text-gray-600">
          <div className="w-3 h-3 rounded-sm bg-indigo-500 mr-2"></div>
          <span>Estudiantes</span>
        </div>
        <div className="flex items-center text-xs text-gray-600">
          <div className="w-3 h-3 rounded-sm bg-pink-500 mr-2"></div>
          <span>Docentes</span>
        </div>
      </div>
    </div>
  );
};

export default ChartBibliotecarioReserva;