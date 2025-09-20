import  { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./ModalDesing.css";
import { Plus, X } from "lucide-react";
import AnimatedTitle from "../TextAnimation";

export const ModalAgregarPaciente = ({ isOpen, onClose, agregarPaciente, guardarEdicion, paciente }) => {
    if (!isOpen) return null;
    console.log(`Modal`, paciente)
    const [formData, setFormData] = useState({
        id: paciente?.id || 0,
        nombre: paciente?.nombre || '',
        apellido: paciente?.apellido || '',
        edad: paciente?.edad || '',
        apoderado: paciente?.apoderado || '',
        dni: paciente?.dni || '',
        fechaAtencion: paciente?.fechaAtencion || '',
        estado: 'En espera',
        enfermedad: '',
        doctor: '',
        sintomas: paciente?.sintomas ? paciente.sintomas.map(s => s.trim()).filter(Boolean) : []
    });
    
      
      const [currentSymptom, setCurrentSymptom] = useState('');
      const symptomsInputRef = useRef(null);
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      };
    
      const handleSymptomKeyDown = (e) => {
        if (e.key === 'Enter' && currentSymptom.trim()) {
          e.preventDefault();
          addSymptom();
        }
      };
    
      const addSymptom = () => {
        if (currentSymptom.trim()) {
          setFormData(prev => ({
            ...prev,
            sintomas: [...prev.sintomas, currentSymptom.trim()]
          }));
          setCurrentSymptom('');
        }
      };
    
      const removeSymptom = (index) => {
        setFormData(prev => ({
          ...prev,
          sintomas: prev.sintomas.filter((_, i) => i !== index)
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
    
        const nuevoPaciente = {
            ...formData,
            id: paciente?.id || Date.now(), // Generar ID si es un nuevo paciente
           
        };
    
        if (paciente?.id) {
            guardarEdicion(nuevoPaciente);
        } else {
            agregarPaciente(nuevoPaciente);
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
                 <AnimatedTitle isEditing={paciente} />
                <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Información Personal */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Información Personal</h3>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="number"
            name="edad"
            minLength={3}
            placeholder="Edad"
            value={formData.edad}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Información Adicional */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Información Adicional</h3>
          <input
            type="text"
            name="apoderado"
            placeholder="Apoderado"
            value={formData.apoderado}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            name="dni"
            placeholder="DNI"
            value={formData.dni}
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

      {/* Síntomas Section */}
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Síntomas</h3>
        <div className="flex gap-2">
          <input
            ref={symptomsInputRef}
            type="text"
            value={currentSymptom}
            onChange={(e) => setCurrentSymptom(e.target.value)}
            onKeyDown={handleSymptomKeyDown}
            placeholder="Escriba un síntoma y presione Enter"
            className="flex-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={addSymptom}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <AnimatePresence>
          {formData.sintomas.length > 0 && (
            <motion.ul 
              className="mt-3 space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {formData.sintomas.map((sintoma, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-md"
                >
                  <span className="flex-1">{sintoma}</span>
                  <button
                    type="button"
                    onClick={() => removeSymptom(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
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
          {paciente?.id ? "Guardar cambios" : "Agregar paciente"}
        </button>
      </div>
    </form>
            </motion.div>
        </div>
    );
};
