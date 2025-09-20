import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Trash2 } from 'lucide-react';

export const ContainerTable = ({ data, onEdit, onDelete }) => {
  // Animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  // Animation variants for each row
  const rowVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: { 
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="relative overflow-x-auto">
      <motion.table 
        className="w-full text-sm text-left"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th className="px-6 py-3">Nombre</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Fecha</th>
            <th className="px-6 py-3">Síntomas</th>
            <th className="px-6 py-3">Acciones</th>
          </tr>
        </thead>
        <AnimatePresence mode="wait">
          <motion.tbody key={data.map(item => item.id).join(',')}>
            {data.map((paciente) => (
              <motion.tr
                key={paciente.id}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {paciente.nombre}
                </td>
                <td className="px-6 py-4">{paciente.email}</td>
                <td className="px-6 py-4">{paciente.fecha}</td>
                <td className="px-6 py-4">{paciente.sintomas}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onEdit(paciente)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onDelete(paciente.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-5 h-5" />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </AnimatePresence>
        {data.length === 0 && (
          <motion.tr
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <td colSpan="5" className="px-6 py-8 text-gray-500">
              No se encontraron registros
            </td>
          </motion.tr>
        )}
      </motion.table>
    </div>
  );
};

export default ContainerTable;