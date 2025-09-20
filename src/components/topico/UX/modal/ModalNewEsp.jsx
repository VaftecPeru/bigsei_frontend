import { useState } from "react";
import { motion } from "framer-motion";
import "./ModalDesing.css";
import { X } from "lucide-react";
import AnimatedTitleEsp from "../TextAnimationEsp";

export const ModalNewEsp = ({
  isOpen,
  onClose,
  agregarEspecialidad,
  guardarEdicion,
  especialidad,
}) => {
  if (!isOpen) return null;

  console.log(`Modal`, especialidad);

  const [formData, setFormData] = useState({
    id: especialidad?.id || 0,
    nombre: especialidad?.nombre || "",
    fechaAtencion: especialidad?.fechaAtencion || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaEspecialidad = {
      ...formData,
      id: especialidad?.id > 0 ? especialidad.id : Date.now(),
    };

    if (especialidad?.id) {
      guardarEdicion(nuevaEspecialidad);
    } else {
      agregarEspecialidad(nuevaEspecialidad);
    }
    window.location.reload();

    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("overlay")) {
      onClose();
    }
  };

  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <motion.div
        className="modal-content"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatedTitleEsp isEditing={especialidad} />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4 items-center ">
            {/* Información de la Reserva */}
            <div className="space-y-4">
              <input
                type="text"
                name="nombre"
                placeholder="Nueva especialidad..."
                value={formData.nombre}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />

              <input
                type="datetime-local"
                name="fechaAtencion"
                value={formData.fechaAtencion}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {especialidad?.id ? "Guardar cambios" : "Agregar especialidad"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
