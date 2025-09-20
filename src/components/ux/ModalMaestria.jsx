import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const FutureLearnForm = ({ onSubmit, setIsActive, isActive }) => {
  const [formData, setState] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    ubicacion: '',
    telefono: '',
    recibirInfo: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setIsActive(!isActive)} // Cierra al hacer clic fuera del modal
    >
      <motion.div 
        className="bg-white rounded shadow-md max-w-md w-full p-6 relative"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()} // Evita que el clic cierre el modal
      >
        {/* Encabezado */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">¿Quieres saber más?</h2>
          <button 
            onClick={() => setIsActive(!isActive)}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        
        <p className="text-sm text-gray-600 mb-4">
          Por favor, completa tus datos y compartiremos tu información con la Universidad de Southampton, quien se pondrá en contacto contigo.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre *
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Apellido *
            </label>
            <input
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo electrónico *
            </label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ¿Dónde vives?
            </label>
            <select
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-pink-500"
            >
              <option value="" disabled>Selecciona tu ubicación</option>
              <option value="uk">Reino Unido</option>
              <option value="us">Estados Unidos</option>
              <option value="ca">Canadá</option>
              <option value="au">Australia</option>
              <option value="other">Otro</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Número de teléfono (incluyendo código de país) *
            </label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-pink-500"
            />
          </div>

          <div className="mb-4 flex items-start">
            <input
              type="checkbox"
              name="recibirInfo"
              id="recibirInfo"
              checked={formData.recibirInfo}
              onChange={handleChange}
              className="mt-1 mr-2"
            />
            <label htmlFor="recibirInfo" className="text-sm text-gray-700">
              Quiero recibir más información de Bigsei sobre títulos y otra información relacionada.
            </label>
          </div>

          <div className="text-xs text-gray-600 mb-4">
            Al registrarte, aceptas la <a href="#" className="text-pink-500 hover:underline">Política de privacidad de Bigsei</a> y la <a href="#" className="text-pink-500 hover:underline">Política de la Universidad de Southampton</a>.
          </div>

          <motion.button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-4 rounded"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Enviar
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};
