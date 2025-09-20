import { useState } from "react"
import { Link } from "react-router-dom"

function ContenidoCalidad() {
  const [hoveredIndex, setHoveredIndex] = useState(0)

  const instructors = [
    {
      name: "Mónica Sánchez",
      role: "Desarrollo personal",
      image: "https://picsum.photos/400/600?random=1",
    },
    {
      name: "Diego Mejías",
      role: "Digital Marketing",
      image: "https://picsum.photos/400/600?random=2",
    },
    {
      name: "Katherine Hernández",
      role: "Data Science",
      image: "https://picsum.photos/400/600?random=3",
    },
    {
      name: "Mayrol Choquellamaca",
      role: "Business Finance",
      image: "https://picsum.photos/400/600?random=4",
    },
  ]

  return (
    <div
      className="relative pt-20 overflow-hidden bg-gradient-to-r from-[#000000] via-[#213C69] to-[#213C69]"
    >
      <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col lg:flex-row items-center justify-between relative z-10">
        <div className="lg:w-1/2 mb-10 lg:mb-4 mr-2">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
            <span className="text-[#FF8A00]">Docentes</span> de calidad,
            <br />
            <span className="text-[#FF1F6D]">cursos</span> <span className="text-white">excelentes</span>
          </h1>

          <p className="text-gray-200 text-lg mb-8 max-w-xl">
            En nuestra plataforma, experimenta educación de calidad con docentes capacitados y apasionados que utilizan
            métodos innovadores y fomentan la participación activa. Descubre a nuestros destacados docentes para
            alcanzar tus metas académicas y profesionales con una educación excepcional.
          </p>

          <Link
            to="/cursos" className="bg-[#FF1F6D] hover:bg-[#FF1F6D]/90 text-white w-[80%] text-center x-6 py-3 justify-center rounded-lg inline-flex items-center group transition-all">
            Ir a catálogo de cursos
            <svg
              className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="flex w-full px-[18vw] justify-start lg:justify-center lg:px-4">
          <div className="flex gap-2 w-full overflow-x-auto pb-4 lg:overflow-visible lg:pb-0">
            {instructors.map((instructor, index) => (
              <div
                key={index}
                className={`relative h-[200px] sm:h-[300px] lg:h-[400px] rounded-2xl overflow-hidden transition-all duration-500 ease-in-out cursor-pointer flex-shrink-0
          ${hoveredIndex === index ? "w-[120px] sm:w-[180px] lg:w-[240px]" : "w-[60px] sm:w-[80px]"}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Fondo degradado */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2D1F3F]/50 to-[#2D1F3F]/90 z-10"></div>

                {/* Imagen del instructor */}
                <img
                  src={instructor.image || "/placeholder.svg"}
                  alt={instructor.name}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />

                {/* Info visible al hacer hover */}
                <div
                  className={`absolute bottom-0 left-0 right-0 p-2 sm:p-4 z-20 transition-opacity duration-300
          ${hoveredIndex === index ? "opacity-100" : "opacity-0"}`}
                >
                  <h3 className="text-white font-semibold text-sm sm:text-lg truncate">{instructor.name}</h3>
                  <p className="text-gray-300 text-xs sm:text-sm truncate">{instructor.role}</p>
                </div>

                {/* Nombre vertical (estado normal) */}
                <div
                  className={`absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-300
          ${hoveredIndex === index ? "opacity-0" : "opacity-100"}`}
                  style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
                >
                  <span className="text-white text-xs sm:text-sm">{instructor.name.split(" ")[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContenidoCalidad