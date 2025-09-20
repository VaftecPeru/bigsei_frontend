import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
 
export const ModalDesing = ({ children, isOpen, onClose }) => {
  const paciente = { id: 1, name: "Gerson" };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white rounded-lg shadow-lg w-full max-w-xl"
          >
            <div className="flex justify-between items-center p-4 bg-white rounded-md shadow-lg border-b-4 border-gray-100">
              <h2 className="text-[17px] text-gray-800 fotn-bold">
                 Añadir Reserva Medica
              </h2>
              <button className="text-gray-500 hover:text-gray-700">
                <X size={25} onClick={() => onClose()} />
              </button>
            </div>

            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
