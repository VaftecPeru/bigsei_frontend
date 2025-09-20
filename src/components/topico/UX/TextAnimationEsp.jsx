import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { UserPlus, UserCog, Stethoscope } from "lucide-react";

const AnimatedTitleEsp = ({ isEditing }) => {
  const titleText = useMemo(() => {
    if (isEditing?.id) return "Editar especialidad médica";

    return "Agregar especialida médica";
  }, [isEditing]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center space-y-4 mb-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
        className="rounded-full bg-blue-100 p-3"
      >
        {isEditing ? (
          <UserCog className="w-8 h-8 text-blue-600" />
        ) : (
          <UserPlus className="w-8 h-8 text-blue-600" />
        )}
      </motion.div>

      <div className="flex items-center gap-2">
        <Stethoscope className="w-5 h-5 text-blue-500" />
        <h2 className="text-2xl font-bold text-gray-800">
          <TypeAnimation
            sequence={[titleText]}
            wrapper="span"
            speed={50}
            cursor={true}
            repeat={0}
            className="inline-block"
          />
        </h2>
        <Stethoscope className="w-5 h-5 text-blue-500" />
      </div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.5 }}
        className="h-1 w-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
      />

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-gray-600 text-sm max-w-md"
      >
        {isEditing
          ? "Actualice la informacion de la especialidad en el siguiente formulario"
          : "Complete el formulario para registrar una nueva especialidad médica"}
      </motion.p>
    </motion.div>
  );
};

export default AnimatedTitleEsp;
