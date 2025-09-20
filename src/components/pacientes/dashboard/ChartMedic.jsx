import { useState } from "react";
import { Download } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "JAN", value: 100, maxValue: 400 },
  { name: "FEB", value: 120, maxValue: 400 },
  { name: "MAR", value: 140, maxValue: 400 },
  { name: "APR", value: 200, maxValue: 400 },
  { name: "MAY", value: 250, maxValue: 400 },
  { name: "JUN", value: 230, maxValue: 400 },
  { name: "JUL", value: 260, maxValue: 400 },
  { name: "AUG", value: 120, maxValue: 400 },
  { name: "SEP", value: 280, maxValue: 400 },
  { name: "OCT", value: 300, maxValue: 400 },
  { name: "NOV", value: 350, maxValue: 400 },
  { name: "DEC", value: 380, maxValue: 400 },
];

const FrequencyChartMedic = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("mensual");

  return (
    <div className="w-full   mx-auto bg-white p-6 rounded-lg shadow-lg">
      {/*  Encabezado completamente responsive */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <h2 className="text-lg font-semibold">Frecuencias de atenciones</h2>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/*  Botones de periodo con scroll si es necesario */}
          <div className="flex items-cente gap-2 overflow-x-auto r ">
            {["Hoy", "15 días", "Mensual", "Trimestre", "Anual"].map(
              (period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period.toLowerCase())}
                  className={`px-4 py-1.5 rounded-full text-sm transition-colors whitespace-nowrap ${
                    selectedPeriod === period.toLowerCase()
                      ? "bg-green-500 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {period}
                </button>
              )
            )}
          </div>
          <button className="flex items-center justify-center gap-2 px-4 py-1.5 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-50">
            <Download className="w-4 h-4" />
            <span>Descargar</span>
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barCategoryGap={10}>
          <XAxis dataKey="name" className="text-gray-500" />
          <YAxis className="text-gray-500" />
          <Tooltip />
          <Bar
            dataKey="value"
            fill="#2563eb"
            radius={[5, 5, 5, 5]}
            opacity={1}
            barSize={30}
            stackId="stack"
          />
          <Bar
            dataKey="maxValue"
            fill="#cbd5e1"
            radius={[5, 5, 0, 0]}
            barSize={30}
            stackId="stack"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FrequencyChartMedic;
