import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ModalEstudiante = ({ isActive, setIsActive, nombreEstudiante = "Vaftec" }) => {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div 
            className="bg-white rounded-md max-w-xl w-full p-8 relative"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              y: 0,
              transition: { 
                type: "spring", 
                damping: 25, 
                stiffness: 300 
              }
            }}
            exit={{ 
              scale: 0.8, 
              opacity: 0,
              y: 20,
              transition: { 
                duration: 0.2 
              }
            }}
          >
            {/* Botón para cerrar */}
            <button
              onClick={() => setIsActive(!isActive)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {/* Encabezado */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{nombreEstudiante}, ¡bienvenido a tu curso!</h2>
            {/* Sección: Antes de empezar */}
            <div className="mb-6">
              <h3 className="text-xl font-medium text-gray-700 mb-2">Antes de empezar</h3>
              <p className="text-gray-600 mb-2">Hemos reunido algunos consejos para ayudarte a aprovechar al máximo tu aprendizaje en nuestro</p>
              <a href="#" className="text-pink-500 font-medium hover:underline">Guía completa para utilizar Bigsei.</a>
            </div>
            {/* Sección: Tu recorrido por el curso */}
            <div className="mb-8">
              <h3 className="text-xl font-medium text-gray-700 mb-2">Tu recorrido por el curso</h3>
              <p className="text-gray-600">Utilice el menú del lado izquierdo de la pantalla para ver dónde se encuentra en su curso en todo momento y navegar fácilmente por sus cursos.</p>
            </div>
            {/* Botón de empezar */}
            <div className="flex justify-start">
              <motion.button
                onClick={() => setIsActive(!isActive)}
                className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-6 rounded"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Empezar
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};