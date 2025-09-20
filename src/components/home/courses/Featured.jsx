import PropTypes from "prop-types"

const Featured = ({ activeTab }) => {
  const featuredContent = {
    business: {
      title: "Negocios y gestión",
      description:
        "Sea líder en los negocios con nuestros cursos especializados de capacitación, certificaciones industriales y títulos de alto nivel.",
      description2:
        "No importa cuáles sean tus objetivos, los principales expertos de Accenture, AWS y la Universidad de Deakin te guiarán para alcanzarlos. Desde análisis de datos hasta marketing digital, comenzarás a aprender de los mejores.",
    },
    health: {
      title: "Salud y Medicina",
      description:
        "Obtén CPD y desarrollo profesional con nuestra amplia gama de cursos de salud y medicina, diseñados por expertos para apoyar tu carrera, ya seas enfermero, farmacéutico o investigador clínico.",
      description2:
        "Los expertos de Accenture, AWS y la Universidad de Deakin te guiarán hacia el éxito, desde análisis de datos hasta marketing digital.",
    },
    teaching: {
      title: "Educación",
      description:
        "Conviértete en un líder educativo con nuestros cursos en línea, que abarcan desde el diseño curricular hasta la enseñanza inclusiva, ayudándote a dominar habilidades clave.",
      description2:
        "Los expertos de Accenture, AWS y la Universidad de Deakin te guiarán hacia el éxito, desde análisis de datos hasta marketing digital.",
    },
    tech: {
      title: "Tecnología e IT",
      description:
        "Accede a cursos avanzados de IA generativa, programación y ciberseguridad impartidos por expertos como Microsoft, CloudSwyft y Cisco, y prepara tu carrera para el futuro tecnológico.",
      description2:
        "Los expertos de Accenture, AWS y la Universidad de Deakin te guiarán hacia el éxito, desde análisis de datos hasta marketing digital.",
    },
    psychology: {
      title: "Psicología y Salud Mental",
      description:
        "Transforma tu carrera con nuestros cursos en línea en psicología y salud mental, cubriendo temas desde el trauma hasta la atención plena, liderados por expertos del sector.",
      description2:
        "Los expertos de Accenture, AWS y la Universidad de Deakin te guiarán hacia el éxito, desde análisis de datos hasta marketing digital.",
    },
    languages: {
      title: "Idiomas",
      description:
        "Aprende un idioma con nuestros cursos diseñados para ayudarte a mejorar tus habilidades de comunicación, desde vocabulario básico hasta fluidez avanzada, con un enfoque práctico.",
      description2:
        "Los expertos de Accenture, AWS y la Universidad de Deakin te guiarán hacia el éxito, desde análisis de datos hasta marketing digital.",
    },
  }

  const citedContent = {
    business: {
      cited:
        "El curso fue bellamente conceptualizado y bien presentado. Los videos fueron lúcidos, claros, articulados e informativos.",
      author: "Charles, Reino Unido",
    },
    health: {
      cited:
        "A lo largo del curso se hizo hincapié en la reflexión y la autoobservación, lo cual encontré muy revelador. Siento que, además de ganar estrategias prácticas, también he aprendido algo sobre mí misma.",
      author: "Simone, Reino Unido",
    },
    teaching: {
      cited:
        "El curso fue informativo, interactivo y útil. Definitivamente usaré los métodos y técnicas de inclusión en mi aula. Gracias.",
      author: "Liuda, Moldavia",
    },
    tech: {
      cited:
        "Los módulos del curso estaban bien estructurados, con explicaciones claras, ejemplos relevantes y ejercicios interactivos que me permitieron aplicar lo que aprendí de manera práctica.",
      author: "Ergem, Filipinas",
    },
    psychology: {
      cited: "Gran equilibrio entre investigación, historias personales y consejos prácticos. Gracias.",
      author: "Joanna, Reino Unido",
    },
    languages: {
      cited: "",
      author: "",
    },
  }

  const { title, description, description2 } = featuredContent[activeTab] || {
    title: "Category not found",
    description: "Please select a valid category.",
    description2: "",
  }

  const { cited, author } = citedContent[activeTab] || {
    cited: "",
    author: "",
  }

  return (
    <div className="text-left">
      <h2 className="text-4xl font-bold uppercase tracking-tight mb-6">{title}</h2>
      <p className="text-base text-gray-700 mb-4">{description}</p>
      <p className="text-base text-gray-700 mb-6">{description2}</p>
      {cited && (
        <div className="border-l-4 border-red-600 pl-4 py-2 mb-6">
          <p className="italic text-gray-800">{cited}</p>
          {author && <p className="font-semibold mt-2">{author}</p>}
        </div>
      )}
    </div>
  )
}

export default Featured