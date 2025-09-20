import { useState } from "react"
import TabCourses from "./TabCourses"
import FeaturedContent from "./FeaturedContent"
import { ChevronRight } from "lucide-react"

const CoursesPage = () => {
  const [activeTab, setActiveTab] = useState("business")

  return (
    <div className="p-6 sm:p-8 lg:p-12 m-4 sm:m-8 lg:m-16 rounded-3xl bg-white max-h-full">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Explora las asignaturas más importantes</h1>
        <div className="h-1 w-48 bg-red-600 mx-auto"></div>
      </div>

      <TabCourses activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex flex-col lg:flex-row mt-12 gap-12">
        {/* Contenido destacado - lado izquierdo */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-4xl font-bold uppercase tracking-tight mb-8">
            {activeTab === "business" && "Negocios y Gestión"}
            {activeTab === "health" && "Salud y Medicina"}
            {activeTab === "teaching" && "Educación"}
            {activeTab === "tech" && "Tecnología e IT"}
            {activeTab === "psychology" && "Psicología y Salud Mental"}
            {activeTab === "languages" && "Idiomas"}
          </h2>

          <p className="text-base text-gray-700 mb-6 leading-relaxed">
            {activeTab === "business" &&
              "Sea líder en los negocios con nuestros cursos especializados de capacitación, certificaciones industriales y títulos de alto nivel."}
            {activeTab === "health" &&
              "Obtén CPD y desarrollo profesional con nuestra amplia gama de cursos de salud y medicina, diseñados por expertos para apoyar tu carrera."}
            {activeTab === "teaching" &&
              "Conviértete en un líder educativo con nuestros cursos en línea, que abarcan desde el diseño curricular hasta la enseñanza inclusiva."}
            {activeTab === "tech" &&
              "Accede a cursos avanzados de IA generativa, programación y ciberseguridad impartidos por expertos como Microsoft y Cisco."}
            {activeTab === "psychology" &&
              "Transforma tu carrera con nuestros cursos en línea en psicología y salud mental, cubriendo temas desde el trauma hasta la atención plena."}
            {activeTab === "languages" &&
              "Aprende un idioma con nuestros cursos diseñados para ayudarte a mejorar tus habilidades de comunicación, desde vocabulario básico hasta fluidez avanzada."}
          </p>

          <p className="text-base text-gray-700 mb-6">
            {activeTab === "business" &&
              "No importa cuáles sean tus objetivos, los principales expertos de Accenture, AWS y la Universidad de Deakin te guiarán para alcanzarlos. Desde análisis de datos hasta marketing digital, comenzarás a aprender de los mejores."}
            {activeTab === "health" &&
              "Los expertos de instituciones médicas reconocidas te guiarán hacia el éxito, desde análisis clínicos hasta gestión hospitalaria."}
            {activeTab === "teaching" &&
              "Aprende de educadores experimentados y aplica metodologías innovadoras en tu práctica docente diaria."}
            {activeTab === "tech" &&
              "Prepárate para el futuro tecnológico con cursos que combinan teoría y práctica en un entorno de aprendizaje dinámico."}
            {activeTab === "psychology" &&
              "Aprende de profesionales de la salud mental y adquiere herramientas prácticas para ayudar a otros o desarrollar tu propia carrera."}
            {activeTab === "languages" &&
              "Nuestros instructores nativos te guiarán a través de un programa estructurado que desarrolla todas las habilidades lingüísticas."}
          </p>

          {activeTab === "business" && (
            <div className="border-l-4 border-red-600 pl-6 py-4 mb-8 bg-gray-100">
              <p className="italic text-gray-800">
                "El curso fue bellamente conceptualizado y bien presentado. Los videos fueron lúcidos, claros,
                articulados e informativos."
              </p>
              <p className="font-semibold mt-2">Charles, Reino Unido</p>
            </div>
          )}

          {activeTab === "health" && (
            <div className="border-l-4 border-red-600 pl-6 py-4 mb-8 bg-gray-100">
              <p className="italic text-gray-800">
                "A lo largo del curso se hizo hincapié en la reflexión y la autoobservación, lo cual encontré muy
                revelador. Siento que, además de ganar estrategias prácticas, también he aprendido algo sobre mí misma."
              </p>
              <p className="font-semibold mt-2">Simone, Reino Unido</p>
            </div>
          )}

          {activeTab === "teaching" && (
            <div className="border-l-4 border-red-600 pl-6 py-4 mb-8 bg-gray-100">
              <p className="italic text-gray-800">
                "El curso fue informativo, interactivo y útil. Definitivamente usaré los métodos y técnicas de inclusión
                en mi aula. Gracias."
              </p>
              <p className="font-semibold mt-2">Liuda, Moldavia</p>
            </div>
          )}

          {activeTab === "tech" && (
            <div className="border-l-4 border-red-600 pl-6 py-4 mb-8 bg-gray-100">
              <p className="italic text-gray-800">
                "Los módulos del curso estaban bien estructurados, con explicaciones claras, ejemplos relevantes y
                ejercicios interactivos que me permitieron aplicar lo que aprendí de manera práctica."
              </p>
              <p className="font-semibold mt-2">Ergem, Filipinas</p>
            </div>
          )}

          {activeTab === "psychology" && (
            <div className="border-l-4 border-red-600 pl-6 py-4 mb-8 bg-gray-100">
              <p className="italic text-gray-800">
                "Gran equilibrio entre investigación, historias personales y consejos prácticos. Gracias."
              </p>
              <p className="font-semibold mt-2">Joanna, Reino Unido</p>
            </div>
          )}
        </div>

        {/* Tarjetas de cursos - lado derecho */}
        <div className="w-full lg:w-1/2 min-h-[500px]">
          {/* Scroll horizontal en móviles */}
          <div className="flex gap-6 overflow-x-auto snap-x scroll-smooth pb-4 -mx-4 px-0 lg:hidden">
            <FeaturedContent activeTab={activeTab} isMobile />
          </div>


          {/* Grid en pantallas grandes */}
          <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 gap-6 transition-all duration-300 ease-in-out">
            <FeaturedContent activeTab={activeTab} />
          </div>
        </div>
      </div>

      <div className="mt-8 text-right">
        <a href="/Temas" className="text-fuchsia-500 font-bold hover:text-fuchsia-600 flex items-center justify-end">
          Ver todos los temas
          <ChevronRight className="w-4 h-4 ml-1" />
        </a>
      </div>
    </div>
  )
}

export default CoursesPage
