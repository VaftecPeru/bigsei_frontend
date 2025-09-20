import { ArrowRight, Calendar } from "lucide-react";
import { useState } from "react";
import AlertModal from "@/components/bigsei/AlertModal.jsx";

export default function CurrentClass() {
    const [hasCurrentClass, setHasCurrentClass] = useState(true)
    const [isAlertOpen, setAlertOpen] = useState(false);
    const [alertActionType, setAlertActionType] = useState("");

    const openAlertModal = (actionType) => {
        setAlertActionType(actionType);
        setAlertOpen(true);
      };
    
      const handleAlertConfirm = () => {
        setAlertOpen(false); // Solo cierra el modal al confirmar
      };
    
      const handleAlertClose = () => {
        setAlertOpen(false); // Cierra el modal al cancelar
      };

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">👋 Bienvenido, Adrián!</h1>
                <p className="text-sm text-gray-500">12 Jan 2023, Friday</p>
            </div>
            <div className={`bg-white h-[289px] sm:col-span-2 shadow-md rounded-lg p-6 flex items-center space-x-6 border-2 
        ${hasCurrentClass ? "border-blue-700" : "border-gray-300"}
        `}>
                {hasCurrentClass ? (
                    // Bloque para cuando hay clase en curso
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-800 md:text-left">
                            AHORA: BASE DE DATOS II
                        </h2>
                        <p className="text-sm text-gray-600 mt-3 leading-relaxed md:text-left">
                            No te pierdas la clase de Base de Datos II y disfruta de la clase.
                            <br />
                            ¡Únete vía Zoom!
                        </p>
                        <button 
                            className="mt-5 text-md flex items-center bg-gray-800 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition-all duration-300"
                            onClick={() =>openAlertModal("connectToClass")}
                        >
                            Conectarse
                            <ArrowRight className="h-5 w-5 ml-2 inline-block" />
                        </button>
                    </div>
                ) : (
                    // Bloque alternativo cuando no hay clase
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-800 md:text-left">
                            No hay clases en curso
                        </h2>
                        <p className="text-sm text-gray-600 mt-3 leading-relaxed md:text-left">
                            No tienes ninguna clase programada en este momento.
                            <br />
                            ¡Aprovecha para estudiar o revisar tus tareas pendientes!
                        </p>
                        <button className="mt-5 flex items-center bg-gray-800 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition-all duration-300">
                            Ver Tareas
                            <Calendar className="h-5 w-5 ml-2 inline-block" />
                        </button>
                    </div>
                )}
                <div className="flex-shrink-0">
                    <div className={`${hasCurrentClass ? "bg-blue-100" : "bg-gray-100"} p-4 rounded-full hidden md:block`}>
                        <img
                            src={hasCurrentClass ? "/img/zoom_platform.png" : "/img/no_class.png"}
                            alt={hasCurrentClass ? "Zoom" : "No Class"}
                            className="h-24 w-24 object-contain"
                        />
                    </div>
                </div>
            </div>
            {/* AlertModal */}
            <AlertModal
            isOpen={isAlertOpen}
            onClose={handleAlertClose}
            actionType={alertActionType}
            onConfirm={handleAlertConfirm}
      />
        </div>
    )
}