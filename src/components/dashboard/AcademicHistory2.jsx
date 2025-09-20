import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar los componentes para Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function AcademicHistory2({dataY, dataX}) {
  const data = {
    labels: dataX,
    datasets: [
      {
        label: "Promedio Académico",
        data: dataY,
        borderColor: "#2563eb",
        backgroundColor: "rgba(37, 99, 235, 0.2)",
        tension: 0.3,
        pointBorderColor: "#2563eb",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          color: "#4B5563", // Color de las etiquetas
        },
      },
      tooltip: {
        backgroundColor: "#2563eb",
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6B7280", // Color de las etiquetas del eje X
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: "#E5E7EB",
        },
        ticks: {
          color: "#6B7280", // Color de las etiquetas del eje Y
        },
      },
    },
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 col-span-2">
      <h2 className="text-base font-semibold">Historial académico</h2>
      <div className="mt-4  w-full">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}