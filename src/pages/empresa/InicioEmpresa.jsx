import { ArrowRight } from "lucide-react"
import empresa from '../../assets/empresa.jpg';
import React, {useState} from 'react';
import FormRegistrar from "@/components/home/empresa/FormRegistrar.jsx"

function InicioEmpresa() {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };

  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="bg-gradient-to-b from-[#00264A] to-[#004B93] rounded-xl overflow-hidden">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 p-8 md:p-12 space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Convierte a tu personal en <span className="text-pink-500">especialistas</span>
              </h1>
              <div className="h-1 w-16 bg-pink-500 rounded-full"></div>
            </div>

            <p className="text-white text-lg">
              Capacite a su equipo y conviértalos en expertos en su campo con los cursos en línea de Bigsei. Haga
              de su fuerza laboral su fórmula ganadora.
            </p>

            <button 
            onClick={openModal}
            className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 px-6 rounded-full transition-all flex items-center gap-2 group">
              Pregunte ahora
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="w-full md:w-1/2 p-8 md:pl-16">
          <img
          src={empresa}
          alt="Equipo de profesionales colaborando"
          className="w-[425px] h-120 object-cover rounded-lg" 
          />
          </div>
        </div>
      </div>

    {/* Modal con el formulario */}
    {isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-4 w-[26rem] max-4 max-h-[90vh] overflow-y-auto relative">
          {/* Botón para cerrar el modal */}
          <button
            onClick={closeModal}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Llamada al componente FormContacto */}
          <FormRegistrar onSubmit={closeModal} />
        </div>
      </div>
    )}
    </div>
  )
}

export default InicioEmpresa

