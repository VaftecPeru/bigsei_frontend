import React, { useState } from "react";
import { Modal, Box } from "@mui/material";
import "./MedicationForm.css";

const FormularioMedicamento = ({ open, onAgregar, onClose }) => {
  // Estado para los inputs
  const [formData, setFormData] = useState({
    codigo: "",
    nombre: "",
    categoria: "",
    presentacion: "",
    laboratorio: "",
    descripcion: "",
    precio: "",
    registroSanitario: "",
    lote: "",
    fechaDeVencimiento: "",
    cantidad: "",
    cantidadMinima: "",
    ubicacion: "",
  });

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validación y envío de datos
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica
    if (!formData.codigo || !formData.nombre || !formData.categoria) {
      alert("Por favor, completa los campos obligatorios.");
      return;
    }

    // Llamar a la función que recibe los datos en el componente padre
    onAgregar(formData);

    // Limpiar el formulario después de agregar
    setFormData({
      codigo: "",
      nombre: "",
      categoria: "",
      presentacion: "",
      laboratorio: "",
      descripcion: "",
      precio: "",
      registroSanitario: "",
      lote: "",
      fechaDeVencimiento: "",
      unidades: "",
      unidadesMinimas: "",
      ubicacionProducto: "",
    });
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600, // Ancho del formulario
          maxHeight: "90vh", // Altura máxima sin ocupar toda la pantalla
          overflowY: "auto", // Permitir scroll si hay mucho contenido
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2, // Bordes redondeados
        }}
      >
        <form onSubmit={handleSubmit} className="formulario-medicamento">
          <fieldset>
            <legend>📋 Datos del Medicamento</legend>

            <div className="gd-container">
              <div className="form-group">
                <label>Código:</label>
                <input
                  type="text"
                  name="codigo"
                  value={formData.codigo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Categoría:</label>
                <input
                  type="text"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Laboratorio:</label>
                <input
                  type="text"
                  name="laboratorio"
                  value={formData.laboratorio}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Presentacion:</label>
                <input
                  type="text"
                  name="presentacion"
                  value={formData.presentacion}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Descripción:</label>
                <textarea
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>💰 Información de Compra</legend>

            <div className="form-group">
              <label>Precio de Compra:</label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Registro Sanitario:</label>
              <input
                type="text"
                name="registroSanitario"
                value={formData.registroSanitario}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Lote:</label>
              <input
                type="text"
                name="lote"
                value={formData.lote}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Fecha de Vencimiento:</label>
              <input
                type="date"
                name="fechaDeVencimiento"
                value={formData.fechaDeVencimiento}
                onChange={handleChange}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>📦 Inventario</legend>

            <div className="form-group">
              <label>Cantidad:</label>
              <input
                type="number"
                name="unidades"
                value={formData.unidades}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Cantidad Mínima:</label>
              <input
                type="number"
                name="unidadesMinimas"
                value={formData.unidadesMinimas}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Ubicación:</label>
              <input
                type="text"
                name="ubicacionProducto"
                value={formData.ubicacionProducto}
                onChange={handleChange}
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

export default FormularioMedicamento;
