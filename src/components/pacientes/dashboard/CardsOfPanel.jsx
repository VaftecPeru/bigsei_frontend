import React, { memo } from "react";
import "./CardEffect.css";

// Componente de tarjeta individual
const StatsCard = memo(({ title, value, icon }) => {
  const formattedValue = value.toLocaleString();

  return (
    <div className="fade-in">
      <div
        className="relative animated-border bg-white/40 
          backdrop-blur-lg 
          p-6 rounded-3xl shadow-lg hover:shadow-xl 
          transition-all duration-300 border border-white/50 
          flex flex-col justify-between"
      >
        {/* Ícono en la esquina superior */}
        <div className="absolute -top-5 left-4 w-12 h-12 flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-md">
          <span className="text-white text-2xl">{icon}</span>
        </div>

        {/* Contenido principal */}
        <div className="flex flex-col items-center justify-center mt-2 mb-4">
          <span className="border-0  text-lg font-semibold bg-transparent px-4 py-2 rounded-full shadow-lg backdrop-blur-lg">
            {title}
          </span>
          <div className="mt-2 bg-gradient-to-r from-[#16a1cc] via-[#9F00FF] to-[#D896FF] rounded-full w-24 h-24 text-3xl text-white font-bold flex items-center justify-center shadow-lg">
            {formattedValue}
          </div>
        </div>

        {/* Botón */}
        <div className="flex justify-center mt-auto">
          <button className="bg-blue-500 text-white rounded-xl px-6 py-2 text-md font-semibold shadow-md hover:bg-blue-600 transition-all">
            Ver detalles
          </button>
        </div>
      </div>
    </div>
  );
});

// Datos de las tarjetas
const statsData = [
  { title: "CITAS", value: 10, icon: "📅" },
  { title: "PACIENTES", value: 45, icon: "👤" },
  { title: "MÉDICOS", value: 8, icon: "🩺" },
  { title: "USUARIOS", value: 1200, icon: "👥" },
];

// Componente principal
const CardsOfPanel = () => (
  <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[90%] mx-auto">
    {statsData.map(({ title, value, icon }) => (
      <StatsCard key={title} title={title} value={value} icon={icon} />
    ))}
  </div>
);

export default CardsOfPanel;
