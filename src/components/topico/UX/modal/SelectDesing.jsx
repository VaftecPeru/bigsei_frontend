import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const CustomSelect = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (selectedValue) => {
    onChange({ target: { value: selectedValue } });
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Select Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-24 px-3 py-2 text-sm bg-white border rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <span>{value}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 w-24 mt-1 bg-white border rounded-md shadow-lg"
          >
            <div className="py-1">
              {options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleSelect(option)}
                  className={`w-full px-3 py-2 text-sm text-left hover:bg-blue-50 ${
                    value === option ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const RecordsPerPage = ({ elementosPorPagina, setElementosPorPagina }) => {
  const options = ['4', '6', '8'];

  return (
    <div className="flex items-center space-x-2 text-sm text-gray-600 mt-2 mb-2 p-4">
      <span>Mostrar:</span>
      <CustomSelect
        value={elementosPorPagina.toString()}
        onChange={(e) => setElementosPorPagina(Number(e.target.value))}
        options={options}
      />
      <span>registros</span>
    </div>
  );
};

export default RecordsPerPage;