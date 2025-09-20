import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import AnimatedTitleAnimate from "../../ui/TextAnimate";
 
const doctores = [
    { id: 1, nombre: "Dr. Juan Pérez", especialidad: "Cardiología" },
    { id: 2, nombre: "Dra. María López", especialidad: "Pediatría" },
    { id: 3, nombre: "Dr. Carlos Ramírez", especialidad: "Dermatología" },
    { id: 4, nombre: "Dra. Ana Torres", especialidad: "Neurología" },
    { id: 5, nombre: "Dr. Luis Gutiérrez", especialidad: "Medicina Interna" },
    { id: 6, nombre: "Dra. Sofía Mendoza", especialidad: "Ginecología" },
    { id: 7, nombre: "Dr. Ricardo Flores", especialidad: "Traumatología" },
    { id: 8, nombre: "Dra. Elena Vargas", especialidad: "Oftalmología" },
    { id: 9, nombre: "Dr. Fernando Castillo", especialidad: "Psiquiatría" },
]
 
export const AddDiagnostico = ({ isOpen, onClose, paciente, guardarEdicion }) => {
    console.log(paciente)
    if (!isOpen) return null;

    const [formData, setFormData] = useState({
        id: 0,
        nombre: '',
        apellido: '',
        edad: '',
        apoderado: '',
        dni: '',
        fechaAtencion: '',
        estado: 'En espera',
        enfermedad: '',
        doctor: '',
        sintomas: []
    });

    // 🔥 ACTUALIZA LOS DATOS DEL PACIENTE CUANDO CAMBIA
    useEffect(() => {
        if (paciente) {
            setFormData({
                id: paciente.id || 0,
                nombre: paciente.nombre || '',
                apellido: paciente.apellido || '',
                edad: paciente.edad || '',
                apoderado: paciente.apoderado || '',
                dni: paciente.dni || '',
                fechaAtencion: paciente.fechaAtencion || '',
                estado: 'En espera',
                enfermedad: '',
                doctor: '',
                sintomas: paciente.sintomas ? paciente.sintomas.map(s => s.trim()).filter(Boolean) : []
            });
        }
    }, [paciente]); // Se ejecuta cuando `paciente` cambia

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        if (!formData.doctor || !formData.enfermedad) {
            alert("Seleccione un doctor y una enfermedad.");
            return;
        }

        const doctorSeleccionado = doctores.find(d => d.id === Number(formData.doctor));
        if (!doctorSeleccionado) {
            alert("Doctor no válido.");
            return;
        }

        const nuevoDiagnostico = {
            ...formData,
            estado: "Atendido",
            doctor: doctorSeleccionado
        };

        guardarEdicion(nuevoDiagnostico);
        console.log("Diagnóstico guardado:", nuevoDiagnostico);
        onClose();
    };

    return (
        <div className="overlay" onClick={(e) => e.target.classList.contains("overlay") && onClose()}>
             <motion.div  className="modal-content"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}>
             <div className="modal-content">
                <h2 className="text-center font-bold text-xl"></h2>
                <AnimatedTitleAnimate isEditing={paciente} />
                <div>
                    <label>Nombre</label>
                    <input type="text" value={formData.nombre} disabled />
                </div>

                <div>
                    <label>Doctor</label>
                    <select name="doctor" value={formData.doctor} onChange={handleChange}>
                        <option value="">Seleccione un doctor</option>
                        {doctores.map(doctor => (
                            <option key={doctor.id} value={doctor.id}>{doctor.nombre}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Enfermedad</label>
                    <input type="text" name="enfermedad" value={formData.enfermedad} onChange={handleChange} />
                </div>
                <div className="flex gap-4 mt-4">
                <button className="w-full text-white bg-blue-600" onClick={onClose}>Cancelar</button>
                <button className=" w-full bg-gray-800 text-white" onClick={handleSubmit}>Guardar Diagnóstico</button>

                </div>
            </div>

             </motion.div>
           
        </div>
    );
};
