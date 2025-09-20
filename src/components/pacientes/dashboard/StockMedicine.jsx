import React, { useState } from "react";

const StockMedicine = () => {
  const [medicamentos, setMedicamentos] = useState([
    {
      id: 1,
      nombre: "Paracetamol",
      categoria: "Analgésico",
      stock: 50,
      caducidad: "2025-06-15",
      descripcion: "Requiere receta médica",
    },
    {
      id: 2,
      nombre: "Ibuprofeno",
      categoria: "Antiinflamatorio",
      stock: 30,
      caducidad: "2026-08-10",
      descripcion: "No requiere receta",
    },
  ]);

  const eliminarMedicamento = (id) => {
    setMedicamentos(medicamentos.filter((med) => med.id !== id));
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Stock de Medicamentos</h2>
      <table className="min-w-full bg-white border border-gray-200 shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Nombre</th>
            <th className="py-2 px-4 border">Categoría</th>
            <th className="py-2 px-4 border">Stock</th>
            <th className="py-2 px-4 border">Caducidad</th>
            <th className="py-2 px-4 border">Descripción</th>
            <th className="py-2 px-4 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {medicamentos.map((med) => (
            <tr key={med.id} className="border text-center">
              <td className="py-2 px-4 border">{med.nombre}</td>
              <td className="py-2 px-4 border">{med.categoria}</td>
              <td className="py-2 px-4 border">{med.stock}</td>
              <td className="py-2 px-4 border">{med.caducidad}</td>
              <td className="py-2 px-4 border">{med.descripcion}</td>
              <td className="py-2 px-4 border space-x-2">
                <button className="bg-blue-500 text-white px-2 py-1 rounded">
                  Editar
                </button>
                <button
                  onClick={() => eliminarMedicamento(med.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockMedicine;
