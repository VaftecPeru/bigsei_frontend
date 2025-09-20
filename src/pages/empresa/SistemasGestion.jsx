import { ChevronUp } from "lucide-react"

function SistemasGestion() {
  const features = [
    "Acceda a datos de aprendizaje en tiempo real para realizar un seguimiento del progreso de los empleados",
    "Obtenga información sobre el compromiso de los empleados",
    "Identificar carencias de habilidades, recomendar cursos y diseñar rutas de aprendizaje",
    "Comparta información a través de informes descargables",
  ]

  return (
    <div className="bg-gradient-to-br from-blue-50 to-pink-100 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          Sistemas de gestión del aprendizaje a medida
        </h1>

        <div className="bg-white rounded-3xl shadow-lg p-8 relative">
          <ChevronUp className="absolute top-4 right-4 text-pink-600 w-8 h-8" />

          <p className="text-pink-600 font-medium text-lg mb-6">
            Integre con su propio LMS o utilice el LMS interno de Bigsei, Learning Manager para...
          </p>

          <ul className="space-y-4 mb-8">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="w-2 h-2 bg-black rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>

          <p className="text-center text-gray-600 font-medium">
          Bigsei for Business: cursos en línea para empresas
          </p>
        </div>
      </div>
    </div>
  )
}
export default SistemasGestion