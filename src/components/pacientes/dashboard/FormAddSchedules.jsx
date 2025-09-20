import React, { useState, useEffect } from "react";
import { Modal, Box } from "@mui/material";
import "./MedicationForm.css";

const FormSchedules = ({ open, onClose, onAgregar, horarioActual }) => {
  // Estado para los inputs con un id único
  const [formData, setFormData] = useState({
    id: null,
    dia: "",
    doctor: "",
    fechaDeRegistro: "",
  });

  // Actualizar el formulario cuando se edita un horario existente
  useEffect(() => {
    if (open) {
      setFormData(
        horarioActual
          ? {
              ...horarioActual,
              fechaDeRegistro:
                horarioActual.fechaDeRegistro?.split("T")[0] || "",
            }
          : { id: null, dia: "", doctor: "", fechaDeRegistro: "" }
      );
    }
  }, [open, horarioActual]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validación y envío de datos
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.dia || !formData.doctor || !formData.fechaDeRegistro) {
      alert("Por favor, completa los campos obligatorios.");
      return;
    }

    // Si es un nuevo elemento, asignar un id único
    if (!formData.id) {
      formData.id = Date.now(); // Generar un id basado en el tiempo actual
    }

    // Llamar a la función que agrega o edita el horario
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
            <legend>Días de atención médica</legend>

            <div className="form-group">
              <label>Días de atención médica:</label>
              <input
                type="text"
                name="dia"
                value={formData.dia}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Doctor:</label>
              <input
                type="text"
                name="doctor"
                value={formData.doctor}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Fecha de Registro:</label>
              <input
                type="date"
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

export default FormSchedules;
