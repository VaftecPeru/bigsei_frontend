import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Datos de asistencia por mes
const attendanceDataByMonth = {
  "Sep 2022": [
    { class: "Class A", "Semana 1": 70, "Semana 2": 92, "Semana 3": 79, "Semana 4": 56 },
    { class: "Class B", "Semana 1": 79, "Semana 2": 70, "Semana 3": 89, "Semana 4": 56 },
    { class: "Class C", "Semana 1": 56, "Semana 2": 79, "Semana 3": 70, "Semana 4": 92 },
    { class: "Class D", "Semana 1": 92, "Semana 2": 79, "Semana 3": 70, "Semana 4": 56 }
  ],
  "Oct 2022": [
    { class: "Class A", "Semana 1": 79, "Semana 2": 70, "Semana 3": 89, "Semana 4": 56 },
    { class: "Class B", "Semana 1": 92, "Semana 2": 79, "Semana 3": 70, "Semana 4": 56 },
    { class: "Class C", "Semana 1": 70, "Semana 2": 92, "Semana 3": 79, "Semana 4": 56 },
    { class: "Class D", "Semana 1": 56, "Semana 2": 79, "Semana 3": 70, "Semana 4": 92 }
  ],
};

export default function AttendanceLineChart() {
  const [currentMonth, setCurrentMonth] = useState("Sep 2022");

  const months = Object.keys(attendanceDataByMonth);
  const currentData = attendanceDataByMonth[currentMonth];

  const goToPreviousMonth = () => {
    const currentIndex = months.indexOf(currentMonth);
    if (currentIndex > 0) {
      setCurrentMonth(months[currentIndex - 1]);
    }
  };

  const goToNextMonth = () => {
    const currentIndex = months.indexOf(currentMonth);
    if (currentIndex < months.length - 1) {
      setCurrentMonth(months[currentIndex + 1]);
    }
  };

  return (
    <Card className="w-full bg-white shadow-lg rounded-lg h-[350px] sm:h-[400px]">
      <CardHeader className="flex items-center justify-between">
        <div className="flex w-full justify-between">
          <div>
            <CardTitle className="text-lg font-bold">Asistencia por Clase</CardTitle>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={goToPreviousMonth}
              disabled={currentMonth === months[0]}
              className="border-none"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">{currentMonth}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={goToNextMonth}
              disabled={currentMonth === months[months.length - 1]}
              className="border-none"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300} className="sm:h-[350px]">
          <LineChart
            data={currentData}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="class"
              className="text-xs"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              className="text-sm"
              tick={{ fontSize: 12 }} 
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
              itemStyle={{ color: "#333" }}
            />
            <Line
              type="monotone"
              dataKey="Semana 1"
              stroke="#8884d8"
              strokeWidth={2}
              dot={{ r: 5 }} 
            />
            <Line
              type="monotone"
              dataKey="Semana 2"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="Semana 3"
              stroke="#ffc658"
              strokeWidth={2}
              dot={{ r: 5 }} 
            />
            <Line
              type="monotone"
              dataKey="Semana 4"
              stroke="#ff7300"
              strokeWidth={2}
              dot={{ r: 5 }} 
            />
            <Legend
              align="right"
              verticalAlign="bottom"
              iconType="circle"
              wrapperStyle={{
                paddingBottom: "10px",
                fontSize: "12px", 
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}