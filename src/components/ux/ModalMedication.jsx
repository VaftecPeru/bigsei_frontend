import { useState } from "react";
import { X, Printer, Download, Check, ClipboardPlus } from "lucide-react";
import { Button } from "../pacientes/Buttom";
import { ModalDesing } from "./ModalDesing";
import MedicationSelect from "./SelectModal";

// Predefined medication database
const MEDICATION_DATABASE = [
  {
    id: 1,
    name: "Amoxicilina",
    dosage: ["500mg", "200mg", "800mg"],
    instructions: ["Cada 8 horas", "Cada 12 horas", "Cada 24 horas"],
    stock: 6,
  },
  {
    id: 2,
    name: "Ibuprofeno",
    dosage: ["400mg", "600mg"],
    instructions: ["Cada 12 horas", "Cada 24 horas"],
    stock: 9,
  },
  {
    id: 3,
    name: "Paracetamol",
    dosage: ["250mg", "500mg"],
    instructions: ["Cada 6 horas", "Cada 12 horas"],
    stock: 5,
  },
  {
    id: 4,
    name: "Aspirina",
    dosage: ["100mg", "300mg"],
    instructions: ["Cada 24 horas"],
    stock: 1,
  },
];
const MedicalPrescriptionApp = ({ paciente = {} }) => {
  const [activeTab, setActiveTab] = useState("medicamentos");
  const [selectedMedications, setSelectedMedications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const [selectedDosage, setSelectedDosage] = useState("");
  //agregar un arreglo de medicamentos para que se guarde...
  const defaultPatientData = {
    id: paciente.id || null,
    name: paciente.nombre || "",
    age: paciente.age || "",
    phone: paciente.telefono || "",
    email: paciente.email || "",
    lastVisit: paciente.ultimaVisita || "",
    scheduledDate: paciente.fechaProgramada || "",
    illness: paciente.enfermedad || "",
    illnessDescription: paciente.descripcionEnfermedad || "",
    symptoms: paciente.sintomas || [],
    guardian: paciente.apoderado || "",
    dni: paciente.dni || "",
  };
  const [patientData, setPatientData] = useState(defaultPatientData);
  const [prescriptionReady, setPrescriptionReady] = useState(false);
  const [selectMedicamento, setselectMedicamento] = useState(null);
  const handleMedicationSelect = (medication) => {
    const exists = selectedMedications.find((med) => med.id === medication.id);
    if (!exists) {
      setSelectedMedications([...selectedMedications, medication]);
    }
  };
  const handleMedicamentoSelect = (event) => {
    const medicationId = parseInt(event);
    console.log(medicationId);
    const medication = MEDICATION_DATABASE.find(
      (med) => med.id === medicationId
    );
    setselectMedicamento(medication);
    setSelectedDosage("");
  };
  const handleDosageSelect = (event) => {
    setSelectedDosage(event);
  };
  const removeMedication = (medicationId) => {
    setselectMedicamento(
      selectMedicamento.filter((med) => med.id !== medicationId)
    );
  };

  const validateAndProceed = () => {
    if (patientData.name && selectMedicamento) {
      setPrescriptionReady(true);
      setActiveTab("receta");
    } else {
      alert("Por favor, complete todos los campos");
    }
  };

  const printPrescription = () => {
    window.print();
  };

  return (
    <>
      <Button
        variant={"outline"}
        className=" text-black p-0"
        size={"icon"}
        onClick={handleOpenModal}
      >
        <ClipboardPlus />
      </Button>
      <ModalDesing isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className=" bg-gray-100 p-6">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg">
            <div className="flex border-b">
              <button
                onClick={() => setActiveTab("medicamentos")}
                className={`w-1/2 p-4 ${
                  activeTab === "medicamentos"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600"
                }`}
              >
                Seleccionar Medicamentos
              </button>
              <button
                onClick={() => setActiveTab("receta")}
                className={`w-1/2 p-4 ${
                  activeTab === "receta"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600"
                } 
              ${!prescriptionReady ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={!prescriptionReady}
              >
                Receta Médica
              </button>
            </div>

            {activeTab === "medicamentos" && (
              <div className="p-6">
                <div className="mb-4">
                  <h2 className="text-2xl font-bold text-blue-800 mb-4">
                    Información del Paciente
                  </h2>
                  <p>
                    <strong>Nombre:</strong> {patientData.name}
                  </p>
                  <p>
                    <strong>Edad:</strong> {patientData.age}
                  </p>
                  <p>
                    <strong>Teléfono:</strong> {patientData.phone}
                  </p>
                  <p>
                    <strong>Email:</strong> {patientData.email}
                  </p>
                  <p>
                    <strong>Última Visita:</strong> {patientData.lastVisit}
                  </p>
                  <p>
                    <strong>Fecha Programada:</strong>{" "}
                    {patientData.scheduledDate}
                  </p>
                  <p>
                    <strong>Enfermedad:</strong> {patientData.illness}
                  </p>
                  <p>
                    <strong>Síntomas:</strong> {patientData.symptoms.join(", ")}
                  </p>
                  <p>
                    <strong>Apoderado:</strong> {patientData.guardian}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {/* Select de Medicamentos */}
                  <MedicationSelect
                    medications={MEDICATION_DATABASE}
                    handleMedicamentoSelect={handleMedicamentoSelect}
                    handleDosageSelect={handleDosageSelect}
                    onMedicationSelect={(med) => console.log(med)}
                    onDosageSelect={(dose) => console.log(dose)}
                  />
                </div>

                <div className="mt-6">
                  <h3 className="font-bold mb-2">Medicamentos Seleccionados</h3>
                  {selectedMedications.map((medication) => (
                    <div
                      key={medication.id}
                      className="flex justify-between items-center bg-gray-100 p-2 rounded mb-2"
                    >
                      <span>
                        {medication.name} - {medication.dosage}
                      </span>
                      <button
                        onClick={() => removeMedication(medication.id)}
                        className="text-red-500"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={validateAndProceed}
                  className="w-full mt-4 bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
                >
                  Siguiente ds <Check className="inline ml-2" />
                </button>
              </div>
            )}

            {activeTab === "receta" && prescriptionReady && (
              <div className="p-6">
                <h2 className="text-2xl font-bold text-blue-800 mb-4">
                  Receta Médica
                </h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="font-semibold">Paciente:</p>
                    <p>{patientData.name}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Fecha:</p>
                    <p>{patientData.date}</p>
                  </div>
                </div>

                <div className="border-t border-b py-4 mb-6">
                  <h3 className="font-bold mb-3 text-blue-700">Medicamentos</h3>
                  {selectedMedications.map((medication) => (
                    <div
                      key={medication.id}
                      className="flex justify-between mb-2"
                    >
                      <span>
                        {medication.name} {medication.dosage}
                      </span>
                      <span>{medication.instructions}</span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={printPrescription}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Printer size={18} /> Imprimir
                  </button>
                  <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2">
                    <Download size={18} /> Descargar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </ModalDesing>
    </>
  );
};

export default MedicalPrescriptionApp;
