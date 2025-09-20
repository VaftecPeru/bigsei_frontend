import React from "react";

function PercentageCard({ title, data = [] }) {  
  // Definimos colores consistentes
  const colors = [
    "#3B82F6", "#10B981", "#F59E0B", 
    "#EF4444", "#8B5CF6", "#EC4899"
  ];

  // Procesamos los datos para asegurar que siempre tengan color
  const processedData = data.map((item, index) => ({
    ...item,
    color: item.color || colors[index % colors.length]
  }));

  return (
    <div className="hover:bg-gray-100 transition-all duration-300 hover:scale-[1.02] flex flex-col p-6 bg-white rounded-xl shadow-lg border border-gray-200 w-full max-w-sm">
      <h2 className="text-lg font-semibold text-gray-800 mb-6">{title}</h2>
      {processedData.length > 0 ? (
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left pb-3 text-sm text-gray-500 font-medium px-1">Método</th>
              <th className="text-right pb-3 text-sm text-gray-500 font-medium px-1">Porcentaje</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {processedData.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-1 text-gray-700 text-sm">{item.name}</td>
                <td className="py-3 px-1 text-right">
                  <span 
                    className="inline-block px-3 py-1.5 text-sm font-semibold rounded-lg border-2" 
                    style={{ 
                      borderColor: item.color,
                      backgroundColor: `${item.color}20`
                    }}
                  >
                    {item.percentage}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 text-sm">No hay datos disponibles</p>
      )}
    </div>
  );
}

export default PercentageCard;