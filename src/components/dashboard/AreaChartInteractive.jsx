"use client";

import * as React from "react";
import { Download } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Datos del gráfico
const chartData = [
  { date: "2024-01-01", ingresos: 50, egresos: 30 },
  { date: "2024-02-01", ingresos: 80, egresos: 60 },
  { date: "2024-03-01", ingresos: 70, egresos: 50 },
  { date: "2024-04-01", ingresos: 90, egresos: 80 },
  { date: "2024-05-01", ingresos: 100, egresos: 90 },
  { date: "2024-06-01", ingresos: 110, egresos: 100 },
];

// Colores para los gráficos
const colors = {
  ingresos: "hsl(212, 90%, 50%)", // Azul
  egresos: "hsl(24, 90%, 50%)", // Naranja
};

export function AreaChartInteractive() {
  const [timeRange, setTimeRange] = React.useState("6m");

  // Filtrar datos según el rango seleccionado
  const filteredData = React.useMemo(() => {
    if (timeRange === "6m") return chartData;
    if (timeRange === "3m") return chartData.slice(-3);
    if (timeRange === "1m") return chartData.slice(-1);
    return chartData;
  }, [timeRange]);

  return (
    <Card className="w-full max-w-4xl mx-auto p-6 rounded-lg shadow-lg">
      {/* Header con título y filtros */}
      <CardHeader className="flex justify-between items-center">
        <div>
          <CardTitle>Reporte de ingresos y egresos</CardTitle>
          <CardDescription>Selecciona un rango de tiempo</CardDescription>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 text-blue-600 border rounded-lg border-blue-600 hover:bg-blue-100">
          <Download className="w-4 h-4" />
          Descargar
        </button>
      </CardHeader>

      {/* Selects para rango de tiempo */}
      <CardContent className="flex justify-between items-center mt-4">
        <div className="flex gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Mensual" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Último mes</SelectItem>
              <SelectItem value="3m">Últimos 3 meses</SelectItem>
              <SelectItem value="6m">Últimos 6 meses</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>

      {/* Gráfico */}
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer className="aspect-auto h-[250px] w-full">
          <AreaChart data={filteredData}>
            {/* Definir gradientes para las áreas */}
            <defs>
              <linearGradient id="colorIngresos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.ingresos} stopOpacity={0.8} />
                <stop offset="95%" stopColor={colors.ingresos} stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="colorEgresos" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.egresos} stopOpacity={0.8} />
                <stop offset="95%" stopColor={colors.egresos} stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickFormatter={(value) => new Date(value).toLocaleDateString("es-ES", { month: "short" })}
              tickLine={false}
              axisLine={false}
            />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              type="monotone"
              dataKey="ingresos"
              stroke={colors.ingresos}
              fill="url(#colorIngresos)"
            />
            <Area
              type="monotone"
              dataKey="egresos"
              stroke={colors.egresos}
              fill="url(#colorEgresos)"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
