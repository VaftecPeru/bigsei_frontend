import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart,
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
import { Api_Global_Dashboard } from "@/services/DashboardApi";
import apiClient from "@/Utils/apiClient";
import Cookies from 'js-cookie';

export default function BarChartWithCurve() {
  const [coursesData, setCoursesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const formatDate = (date) => {
    return date.toLocaleString('default', { month: 'short' }) + ' ' + date.getFullYear();
  };

  useEffect(() => {
    const fetchData = async (idUsuario) => {
      try {
        const response = await apiClient.get(Api_Global_Dashboard.docente.cantidadAlumnos(idUsuario));
        const data = await response.data;

        if (data.success) {
          const transformedData = data.data.map(course => ({
            month: course.nombreCurso,
            matriculados: course.cantidadEstudiantes,
            promedio: Math.min(100, Math.max(0, Math.floor(Math.random() * 30) + 70))
          }));

          setCoursesData(transformedData);
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError("Error fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const idUser=Cookies.get('idUser')
    fetchData(idUser);
  }, [currentDate]);

  const goToPreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Card className="w-full bg-white shadow-lg rounded-lg h-full">
      <CardHeader className="flex items-center justify-between">
        <div className="flex w-full justify-between">
          <div>
            <CardTitle className="text-lg font-bold">Estudiantes matriculados por curso</CardTitle>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={goToPreviousMonth}
              className="border-none"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">{formatDate(currentDate)}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={goToNextMonth}
              className="border-none"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400} className="sm:h-[450px]">
          <ComposedChart
            data={coursesData}
            margin={{
              top: 20,
              right: 20,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              className="text-xs"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              className="text-sm"
              domain={[0, 'dataMax + 10']}
              tick={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
              itemStyle={{ color: "#333" }}
              formatter={(value, name) => {
                if (name === "Promedio") return [`${value}%`, name];
                return [value, name];
              }}
            />
            <Bar
              dataKey="matriculados"
              fill="#007bff"
              name="Matriculados"
              barSize={20}
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
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}