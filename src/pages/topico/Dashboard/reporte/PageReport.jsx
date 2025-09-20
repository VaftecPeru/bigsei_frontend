import { DocumentsApp } from "@/components/topico/report/DocumentApp"
import { ReportModal } from "./ModalReport"
import { useState } from "react";

const data = [
  {
    "id": 1740415236656,
    "nombre": "María Fernanda",
    "apellido": "Gómez",
    "edad": "45",
    "apoderado": "Carlos Gómez",
    "dni": "74859623",
    "fechaAtencion": "2024-02-23T03:23",
    "estado": "Atendido",
    "enfermedad": "Hipertensión arterial",
    "doctor": {
      "id": 9,
      "nombre": "Dr. Fernando Castillo",
      "especialidad": "Cardiología"
    },
    "sintomas": ["Dolor de cabeza", "Mareos", "Presión arterial elevada"]
  },
  {
    "id": 1740415260415,
    "nombre": "Javier Alejandro",
    "apellido": "López",
    "edad": "32",
    "apoderado": "N/A",
    "dni": "52147896",
    "fechaAtencion": "2024-02-23T15:23",
    "estado": "Atendido",
    "enfermedad": "Ansiedad generalizada",
    "doctor": {
      "id": 10,
      "nombre": "Dr. Fernando Castillo",
      "especialidad": "Psiquiatría"
    },
    "sintomas": ["Palpitaciones", "Dificultad para respirar", "Nerviosismo constante"]
  },
  {
    "id": 1740415280350,
    "nombre": "Luciana Isabel",
    "apellido": "Martínez",
    "edad": "27",
    "apoderado": "N/A",
    "dni": "78452136",
    "fechaAtencion": "2024-02-23T03:23",
    "estado": "En espera",
    "enfermedad": "Gripe",
    "doctor": {
      "id": 5,
      "nombre": "Dr. Luis Gutiérrez",
      "especialidad": "Medicina Interna"
    },
    "sintomas": ["Fiebre", "Congestión nasal", "Dolor de garganta"]
  }
];


const PageReport = () => {
  const [isDataModal, setIsDataModal] = useState({
    id: null,
    nombre: "",
    apellido: "",
    edad: "",
    apoderado: "",
    dni: "",
    fechaAtencion: "",
    estado: "",
    enfermedad: "",
    doctor: {
      id: null,
      nombre: "",
      especialidad: ""
    },
    sintomas: []
  });
 
    const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
        <DocumentsApp
        data={data}
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        setIsDataModal={setIsDataModal}
        />
        <ReportModal data={isDataModal} isOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    </div>
  )
}

export default PageReport