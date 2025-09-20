import { BookOpen, Database, Target, Leaf } from "lucide-react"

function AcademiasHabilidades() {
  const academias = [
    { id: 1, name: "Academia de liderazgo", icon: BookOpen, active: true },
    { id: 2, name: "Academia de tecnología y datos", icon: Database },
    { id: 3, name: "Academia de marketing", icon: Target },
    { id: 4, name: "Academia de Sostenibilidad", icon: Leaf },
  ]

  const cards = [
    {
      id: 1,
      title: "Habilidades de gestión de personas",
      description:
        "Descubra los métodos, estrategias y principios clave de la gestión de personas y desarrolle su propio estilo de gestión.",
      image: "https://picsum.photos/400/300?random=1",
    },
    {
      id: 2,
      title: "Habilidades de influencia y comunicación para directivos",
      description:
        "Conviértase en un mejor gerente a medida que descubre estrategias de comunicación y técnicas de influencia para mejorar la comunicación en el",
      image: "https://picsum.photos/400/300?random=2",
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <div className="flex justify-end mb-4">
          <button className="text-pink-600 font-medium">Pregunte ahora</button>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Academias de habilidades: paquetes de cursos personalizados
        </h1>

        <div className="w-20 h-1 bg-pink-600 mx-auto mb-12"></div>

        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {academias.map((academia) => (
            <button
              key={academia.id}
              className={`flex flex-col items-center gap-2 px-4 py-2 ${
                academia.active ? "text-pink-600 border-b-2 border-pink-600" : "text-gray-600"
              }`}
            >
              <academia.icon className="w-6 h-6" />
              <span className="text-sm font-medium">{academia.name}</span>
            </button>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Academia de liderazgo</h2>

        <p className="text-gray-600 max-w-3xl mx-auto mb-12">
          Desarrolla a tu equipo con las habilidades para liderar y desarrollar equipos de alto rendimiento con la
          Academia de Liderazgo de Bigsei.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
        {cards.map((card) => (
          <div key={card.id} className="bg-white rounded-lg shadow-md overflow-hidden max-w-xs w-full">
            <img src={card.image || "/placeholder.svg"} alt={card.title} className="w-full h-40 object-cover" />
            <div className="p-5">
              <h3 className="font-bold text-lg mb-2">{card.title}</h3>
              <p className="text-gray-600 text-sm">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <div className="relative pl-6 py-4">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-pink-600"></div>
          <div className="text-gray-800 text-base font-medium mb-4">
            <span className="text-3xl leading-none font-serif text-pink-600">"</span>
            Bigsei gave flexibility for our staff to pursue the learning of interest to them. It was especially
            helpful to members of our team that wanted a deeper dive into a topic and it allowed our L&D team to give
            them access to courses that were relevant to them
            <span className="text-3xl leading-none font-serif text-pink-600">"</span>
          </div>
          <p className="text-gray-700 text-sm font-medium">
            Matthew Smith, Group Lead – Knowledge, Learning and Development, Nesta
          </p>
          <div className="h-3 w-3 rounded-full bg-pink-600 mt-4"></div>
        </div>
      </div>
    </div>
  )
}
export default AcademiasHabilidades