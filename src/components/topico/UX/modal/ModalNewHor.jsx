import { useState } from "react";
import { motion } from "framer-motion";
import { Select, MenuItem, InputLabel, FormControl, Chip } from "@mui/material";
import { X } from "lucide-react";
import AnimatedTitleHor from "../TextAnimationHor";

export const ModalNewHor = ({
  isOpen,
  onClose,
  agregarHorario,
  guardarEdicion,
  horario,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    id: horario?.id || Date.now(),
    dia: horario?.dia ? horario.dia.split(" ") : [], // Convertir cadena a array
    nombre: horario?.nombre || "",
    fechaAtencion: horario?.fechaAtencion || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDiaChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      dia: event.target.value, // `event.target.value` ya es un array con los valores seleccionados
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que al menos un día haya sido seleccionado
    if (formData.dia.length === 0) {
      alert("Debes seleccionar al menos un día.");
      return;
    }

    const nuevaHorario = {
      ...formData,
      id: horario?.id || Date.now(),
      dia: formData.dia.join(" "), // Convertir array en string separado por espacios
    };

    if (horario?.id) {
      guardarEdicion(nuevaHorario);
    } else {
      agregarHorario(nuevaHorario);
    }
    window.location.reload();
    onClose(); // Cierra el modal después de guardar
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("overlay")) {
      onClose();
    }
  };

  const diasSemana = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  return (
    <div className="overlay" onClick={handleOverlayClick}>
      <motion.div
        className="modal-content"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatedTitleHor isEditing={horario} />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="space-y-4 items-center ">
              {/* Select de días con múltiples opciones */}
              <FormControl fullWidth>
                <Select
                  sx={{
                    height: "48px", // Ajusta la altura
                    width: "100%",
                  }}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        "& .MuiMenuItem-root:hover": {
                          backgroundColor: "#454545", // Azul (puedes cambiarlo)
                          color: "white",
                        },
                      },
                    },
                  }}
                  multiple
                  name="dia"
                  value={formData.dia}
                  onChange={handleDiaChange}
                  displayEmpty
                  renderValue={(selected) =>
                    selected.length === 0 ? (
                      <span style={{ color: "#aaa" }}>
                        Selecciona uno o más días
                      </span> // Placeholder
                    ) : (
                      <div
                        style={{ display: "flex", flexWrap: "wrap", gap: 8 }}
                      >
                        {selected.map((day) => (
                          <Chip key={day} label={day} />
                        ))}
                      </div>
                    )
                  }
                >
                  {diasSemana.map((dia) => (
                    <MenuItem key={dia} value={dia}>
                      {dia}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <input
                type="text"
                name="nombre"
                placeholder="Nombre y apellido"
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
              {horario?.id ? "Guardar cambios" : "Agregar horario"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
