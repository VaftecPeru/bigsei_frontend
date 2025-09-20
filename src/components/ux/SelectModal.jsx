import  { useState, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import Introduction from '@/pages/degrees/introduction';

const MedicationSelect = ({ 
  medications, 
  onMedicationSelect, 
  onDosageSelect,
  handleDosageSelect,
  handleMedicamentoSelect
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMed, setSelectedMed] = useState(null);
  const [selectedDose, setSelectedDose] = useState('');
  const [selectInstruction, setSelectedInstruction]=useState('');
  const filteredMeds = medications.filter(med =>
    med.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleMedSelect = (med) => {
    setSelectedMed(med);
    setIsOpen(false);
    onMedicationSelect?.(med);
    setSearchTerm('');
    setSelectedDose('');
    setSelectedInstruction();
  };

  const handleDosageChange = (dose) => {
    setSelectedDose(dose);
    onDosageSelect?.(dose);
    handleDosageSelect(dose)
  };
  const handleInstruction = (instruction) => {
    setSelectedInstruction(instruction);
   
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <div
          className="relative border rounded-lg bg-white shadow-sm cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center justify-between p-2">
            <span className="text-gray-700">
              {selectedMed ? selectedMed.name : 'Seleccione un medicamento'}
            </span>
            <ChevronDown 
              className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              size={20}
            />
          </div>
        </div>

        {isOpen && (
          <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg border z-50 animate-in fade-in slide-in-from-top-2">
            <div className="p-2 border-b">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Buscar medicamento..."
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            <div className="max-h-48 overflow-auto">
              {filteredMeds.map((med) => (
                <div
                  key={med.id}
                  onClick={() => {
                    handleMedSelect(med);
                    handleMedicamentoSelect(med.id);
                  }}
                  
                  className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors duration-150"
                >
                  <div className="font-medium">{med.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedMed && (
        <div className="transition-all duration-200 ease-in-out">
          <select
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedDose}
            onChange={(e) => handleDosageChange(e.target.value)}
          >
            <option value="">Seleccione una dosis</option>
            {selectedMed.dosage.map((dose, index) => (
              <option key={index} value={dose}>
                {dose}
              </option>
            ))}
          </select>
          <select
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectInstruction}
            onChange={(e) => handleInstruction(e.target.value)}
          >
            <option value="">Selecciona el Horario</option>
            {selectedMed.instructions.map((instruction, index) => (
              <option key={index} value={instruction}>
                {instruction}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default MedicationSelect;