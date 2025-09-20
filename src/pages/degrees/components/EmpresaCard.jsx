import { GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EmpresaCard({ empresa }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md overflow-hidden">
      <img
        src={empresa.empresa_url_img || "/placeholder.svg"}
        alt={empresa.nombre}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="font-semibold text-lg mb-2">{empresa.nombre}</h3>
        <p className="text-sm text-gray-600 mb-4">{empresa.empresa_razon_social}</p>
        <p className="text-sm text-gray-500 mb-4">{empresa.tituloacademico_nombre}</p>
        <div className="flex flex-col items-start">
          <span className="text-sm mb-2 flex items-center">
            <GraduationCap className="w-4 h-4 mr-1" />
            {empresa.tituloacademico_tipo}
          </span>
          <button
            // onClick={() => navigate('/maestria')}
            onClick={() => navigate('/cursos')}
            className="bg-pink-600 text-white px-6 py-2 text-sm hover:bg-pink-700 transition-colors w-full"
          >
            Saber más
          </button>
        </div>
      </div>
    </div>
  )
}