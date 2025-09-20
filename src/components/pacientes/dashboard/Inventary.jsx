import React, { useState } from "react";
import FormularioMedicamento from "./MedicationForm";

const Inventario = () => {
  // Estado para la lista de medicamentos
  const [medicamentos, setMedicamentos] = useState([]);

  // Estado para controlar si se muestra el formulario (modal)
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Función para agregar un medicamento a la lista
  const agregarMedicamento = (nuevoMedicamento) => {
    setMedicamentos([...medicamentos, nuevoMedicamento]);
    setMostrarFormulario(false); // Cerrar modal después de agregar
  };

  // Función para cerrar el modal
  const handleClose = () => {
    setMostrarFormulario(false);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold text-black-700">
          📑 Registro de Medicamentos
        </h2>
      </div>

      {/* Botón para abrir el modal */}
      <div className="buttons-cont">
        <button
          className="buttonAddMedicine"
          onClick={() => setMostrarFormulario(true)}
        >
          ➕ Agregar
        </button>
      </div>

      {/* Modal con el formulario */}
      <FormularioMedicamento
        open={mostrarFormulario}
        onClose={handleClose}
        onAgregar={agregarMedicamento}
      />

      {/* Tabla de Medicamentos */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md">
          <thead>
            <tr>
              <th className="border p-2">Código</th>
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Categoría</th>
              <th className="border p-2">Laboratorio</th>
              <th className="border p-2">Descripción</th>
              <th className="border p-2">Precio de compra</th>
              <th className="border p-2">Registro Sanitario</th>
              <th className="border p-2">Lote</th>
              <th className="border p-2">Fecha de Vencimiento</th>
              <th className="border p-2">Cantidad</th>
              <th className="border p-2">Cantidad mínima</th>
              <th className="border p-2">Ubicación</th>
            </tr>
          </thead>
          <tbody>
            {medicamentos.map((med, index) => (
              <tr key={index}>
                <td className="border p-2">{med.codigo}</td>
                <td className="border p-2">{med.nombre}</td>
                <td className="border p-2">{med.categoria}</td>
                <td className="border p-2">{med.laboratorio}</td>
                <td className="border p-2">{med.descripcion}</td>
                <td className="border p-2">{med.precio}</td>
                <td className="border p-2">{med.registroSanitario}</td>
                <td className="border p-2">{med.lote}</td>
                <td className="border p-2">{med.fechaDeVencimiento}</td>
                <td className="border p-2">{med.unidades}</td>
                <td className="border p-2">{med.unidadesMinimas}</td>
                <td className="border p-2">{med.ubicacionProducto}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Inventario;
