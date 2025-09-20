import React, { useState, useEffect } from "react";
import { Modal, Box } from "@mui/material";
import "./MedicationForm.css";

const FormSpecialties = ({ open, onClose, onAgregar, especialidadActual }) => {
  // Estado para los inputs con un id único
  const [formData, setFormData] = useState({
    id: null,
    especialidad: "",
    fechaDeRegistro: "",
  });

  // Actualizar el formulario cuando se edita una especialidad existente
  useEffect(() => {
    if (open) {
      setFormData(
        especialidadActual
          ? {
              ...especialidadActual,
              fechaDeRegistro:
                especialidadActual.fechaDeRegistro?.split("T")[0] || "",
            }
          : { id: null, especialidad: "", fechaDeRegistro: "" }
      );
    }
  }, [open, especialidadActual]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validación y envío de datos
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.especialidad || !formData.fechaDeRegistro) {
      alert("Por favor, completa los campos obligatorios.");
      return;
    }

    // Si es un nuevo elemento, asignar un id único
    if (!formData.id) {
      formData.id = Date.now(); // Generar un id basado en el tiempo actual
    }

    // Llamar a la función que agrega o edita la especialidad
    onAgregar(formData);

    // Cerrar el modal
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          maxHeight: "90vh",
          overflowY: "auto",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <form onSubmit={handleSubmit} className="formulario-medicamento">
          <fieldset>
            <legend>Registro de Especialidades</legend>

            <div className="form-group">
              <label>Especialidad médica:</label>
              <input
                type="text"
                name="especialidad"
                value={formData.especialidad}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Fecha de Registro:</label>
              <input
                type="datetime-local"
                name="fechaDeRegistro"
                value={formData.fechaDeRegistro}
                onChange={handleChange}
                required
              />
            </div>
          </fieldset>

          <div className="buttons-cont">
            <button className="saveMed" type="submit">
              Guardar
            </button>
            <button className="cancelMed" type="button" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default FormSpecialties;
