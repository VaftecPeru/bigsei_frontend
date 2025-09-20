import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { ContextGlobal } from "../../../App";

function PersonalDataForm() {
  return (
    <div className="bg-white rounded-lg shadow-lg w-full">
      <h3 className="text-2xl font-semibold text-center mb-6">
        Registro Datos Personales
      </h3>
      <form className="space-y-4 w-full">
        <div className="max-w-5xl mx-auto p-6">
          <div className="bg-white rounded shadow-sm">
            <div className="grid grid-cols-[200px_1fr_1fr_1fr] gap-x-1 gap-y-0.5">
              {/* Header row */}
              <div className="bg-gray-100 p-2 font-medium">DATOS:</div>
              <div className="p-2 flex items-center gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tipo"
                    className="mr-1"
                    defaultChecked
                  />
                  <span>PADRE</span>
                </label>
              </div>
              <div className="p-2">
                <label className="flex items-center">
                  <input type="radio" name="tipo" className="mr-1" />
                  <span>MADRE</span>
                </label>
              </div>
              <div className="p-2">
                <label className="flex items-center">
                  <input type="radio" name="tipo" className="mr-1" />
                  <span>APODERADO</span>
                </label>
              </div>

              {/* CIP/DNI row */}
              <div className="bg-gray-100 p-2">CIP / DNI</div>
              <div className="p-0.5">
                <div className="flex">
                  <input
                    type="text"
                    className="w-full border p-1"
                    defaultValue="70745205"
                  />
                  <button className=" border-y border-r bg-white">
                    <Search />
                  </button>
                </div>
              </div>
              <div className="p-0.5">
                <div className="flex">
                  <input type="text" className="w-full border p-1" />
                  <button className=" border-y border-r bg-white">
                    <Search />
                  </button>
                </div>
              </div>
              <div className="p-0.5">
                <div className="flex">
                  <input type="text" className="w-full border p-1" />
                  <button className=" border-y border-r bg-white">
                    <Search />
                  </button>
                </div>
              </div>

              {/* AP. PATERNO row */}
              <div className="bg-gray-100 p-2">AP. PATERNO</div>
              <div className="p-0.5">
                <input
                  type="text"
                  className="w-full border p-1"
                  defaultValue="PICHIHUA"
                />
              </div>
              <div className="p-0.5">
                <input type="text" className="w-full border p-1" />
              </div>
              <div className="p-0.5">
                <input type="text" className="w-full border p-1" />
              </div>

              {/* AP. MATERNO row */}
              <div className="bg-gray-100 p-2">AP. MATERNO</div>
              <div className="p-0.5">
                <input
                  type="text"
                  className="w-full border p-1"
                  defaultValue="PARDO"
                />
              </div>
              <div className="p-0.5">
                <input type="text" className="w-full border p-1" />
              </div>
              <div className="p-0.5">
                <input type="text" className="w-full border p-1" />
              </div>

              {/* NOMBRE row */}
              <div className="bg-gray-100 p-2">NOMBRE</div>
              <div className="p-0.5">
                <input
                  type="text"
                  className="w-full border p-1"
                  defaultValue="BORIS ODELION"
                />
              </div>
              <div className="p-0.5">
                <input type="text" className="w-full border p-1" />
              </div>
              <div className="p-0.5">
                <input type="text" className="w-full border p-1" />
              </div>

              {/* N° CELULAR row */}
              <div className="bg-gray-100 p-2">N° CELULAR</div>
              <div className="p-0.5">
                <input
                  type="text"
                  className="w-full border p-1 bg-gray-50"
                  defaultValue="922194290"
                />
              </div>
              <div className="p-0.5">
                <input
                  type="text"
                  className="w-full border p-1 bg-gray-50"
                  placeholder="N° Celular"
                />
              </div>
              <div className="p-0.5">
                <input
                  type="text"
                  className="w-full border p-1 bg-gray-50"
                  placeholder="N° Celular"
                />
              </div>

              {/* DOMICILIO row */}
              <div className="bg-gray-100 p-2">DOMICILIO</div>
              <div className="p-0.5">
                <input type="text" className="w-full border p-1" />
              </div>
              <div className="p-0.5">
                <input type="text" className="w-full border p-1" />
              </div>
              <div className="p-0.5">
                <input type="text" className="w-full border p-1" />
              </div>

              {/* TELEF. DOMICILIO row */}
              <div className="bg-gray-100 p-2">TELEF. DOMICILIO</div>
              <div className="p-0.5">
                <input type="text" className="w-full border p-1" />
              </div>
              <div className="p-0.5">
                <input type="text" className="w-full border p-1" />
              </div>
              <div className="p-0.5">
                <input type="text" className="w-full border p-1" />
              </div>

              {/* CENTRO LABORAL row */}
              <div className="bg-gray-100 p-2">CENTRO LABORAL</div>
              <div className="p-0.5">
                <input type="text" className="w-full border p-1" />
              </div>
              <div className="p-0.5">
                <input type="text" className="w-full border p-1" />
              </div>
              <div className="p-0.5">
                <input type="text" className="w-full border p-1" />
              </div>

              {/* TELEF. TRABAJO row */}
              <div className="bg-gray-100 p-2">TELEF. TRABAJO</div>
              <div className="p-0.5">
                <input type="text" className="w-full border p-1" />
              </div>
              <div className="p-0.5">
                <input type="text" className="w-full border p-1" />
              </div>
              <div className="p-0.5">
                <input type="text" className="w-full border p-1" />
              </div>

              {/* EMAIL row */}
              <div className="bg-gray-100 p-2">EMAIL</div>
              <div className="p-0.5">
                <input
                  type="text"
                  className="w-full border p-1 bg-gray-50"
                  placeholder="Email"
                />
              </div>
              <div className="p-0.5">
                <input
                  type="text"
                  className="w-full border p-1 bg-gray-50"
                  placeholder="Email"
                />
              </div>
              <div className="p-0.5">
                <input
                  type="text"
                  className="w-full border p-1 bg-gray-50"
                  placeholder="Email"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function FamilyRegistration() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full">
      <h3 className="text-2xl font-semibold text-center mb-6">
        Registro Familiar
      </h3>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="estadoCivil">
            Estado Civil
          </label>
          <select
            id="estadoCivil"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccionar</option>
            <option value="soltero">Soltero/a</option>
            <option value="casado">Casado/a</option>
            <option value="divorciado">Divorciado/a</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="numHijos">
            Número de Hijos
          </label>
          <input
            type="number"
            id="numHijos"
            min="0"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            className="block text-gray-700 mb-2"
            htmlFor="contactoEmergencia"
          >
            Contacto de Emergencia
          </label>
          <input
            type="text"
            id="contactoEmergencia"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </form>
    </div>
  );
}

function MedicalRecord() {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h3 className="text-2xl font-semibold text-center mb-6">
        Registro de Ficha Medica
      </h3>
      <form className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="tipoSangre">
            Tipo de Sangre
          </label>
          <select
            id="tipoSangre"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Seleccionar</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="alergias">
            Alergias
          </label>
          <textarea
            id="alergias"
            rows="3"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700 mb-2" htmlFor="medicamentos">
            Medicamentos Actuales
          </label>
          <textarea
            id="medicamentos"
            rows="3"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default function PersonalRecord() {
  const [currentStep, setCurrentStep] = useState(0);

  const {setIdStep } = useContext(ContextGlobal);

  const steps = [
    { id: 0, title: "Registro Datos Personales", component: PersonalDataForm },
    { id: 1, title: "Registro Familiar", component: FamilyRegistration },
    { id: 2, title: "Registro de Ficha Medica", component: MedicalRecord },
  ];
/*

//esto solo es de prueba
  useEffect(() => {
    alert(idStep);
  }, [idStep]);*/

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Navigation Buttons */}
      <div className="flex justify-between mb-8">
        {steps.map((step) => (
          <button
            key={step.id}
            //  onClick={() => setCurrentStep(step.id)} //esto lo quitare temporalmente para evitar que los botones sigan adelante
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              currentStep === step.id
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {step.title}
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="relative">
          <div className="flex justify-between items-center">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`w-8 h-8 rounded-full flex items-center justify-center
                                    ${
                                      step.id <= currentStep
                                        ? "bg-blue-600"
                                        : "bg-gray-200"
                                    }
                                `}
              >
                {step.id < currentStep ? (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : step.id === currentStep ? (
                  <div className="w-3 h-3 bg-white rounded-full" />
                ) : null}
              </div>
            ))}
          </div>
          <div className="absolute top-4 left-0 w-full">
            <div
              className="h-0.5 bg-blue-600 transition-all duration-300"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="transition-all duration-300">
        {
   
        steps[currentStep].component()
        }
      </div>
      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => {
            setCurrentStep(Math.max(0, currentStep - 1)); //;
            setIdStep((prev) => prev - 1); // Corrección aquí
          }}
          disabled={currentStep === 0}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg  hover:bg-gray-300"
        >
          Anterior
        </button>

        <button
          onClick={() => {
            setCurrentStep(Math.min(steps.length - 1, currentStep + 1));
            setIdStep((prev) => prev + 1); // Corrección aquí
          }}
          disabled={currentStep === steps.length - 1}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
        >
          Siguientes
        </button>
      </div>
    </div>
  );
}
