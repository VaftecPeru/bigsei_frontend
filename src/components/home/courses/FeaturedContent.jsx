import { Link } from "react-router-dom"

const FeaturedContent = ({ activeTab, isMobile = false }) => {
  const courses = {
    business: [
      {
        title: "Sostenibilidad en los negocios: construyendo un futuro más verde",
        description: "Descubre cómo las prácticas comerciales sostenibles dan forma a un futuro más verde y resiliente.",
        image: "/img/bigsei-portada.png",
      },
      {
        title: "Maestría en Administración de Empresas (MBA)",
        description: "Asuma su próximo puesto importante adquiriendo una visión empresarial de primer nivel y una experiencia práctica integral en la Universidad de Southampton.",
        image: "/img/bigsei-portada.png",
      },
    ],
    health: [
      {
        title: "Diplomado en Primeros Auxilios y Respuesta a Emergencias",
        description: "Aprende técnicas de primeros auxilios que pueden salvar vidas y cómo actuar en situaciones de emergencia. Este diplomado te preparará para brindar asistencia inmediata en accidentes y situaciones críticas de salud.",
        image: "/img/bigsei-portada.png",
      },
      {
        title: "Nutrición y Dietética: Fundamentos para una Vida Saludable",
        description: "Comprende los principios básicos de una alimentación saludable y su impacto en el bienestar general. Aprende a diseñar dietas equilibradas y a entender el papel de los nutrientes en el organismo.",
        image: "/img/bigsei-portada.png",
      },
    ],
    teaching: [
      {
        title: "Especialización en Gestión y Liderazgo Educativo",
        description: "Desarrolla habilidades clave para la gestión de instituciones educativas y liderazgo docente. Aprende a aplicar estrategias de gestión y liderazgo para mejorar la enseñanza y el ambiente educativo.",
        image: "/img/bigsei-portada.png",
      },
      {
        title: "Técnicas Innovadoras de Enseñanza y Aprendizaje",
        description: "Incorpora creatividad en tus lecciones para mejorar la experiencia del aprendizaje. Descubre estrategias didácticas avanzadas y el uso de la tecnología en la enseñanza.",
        image: "/img/bigsei-portada.png",
      },
    ],
    tech: [
      {
        title: "Curso de Introducción a la Programación con Python",
        description: "Empieza a programar con este curso diseñado para principiantes en el mundo del desarrollo de software. Aprende los fundamentos de la programación y desarrolla tus primeras aplicaciones con Python.",
        image: "/img/bigsei-portada.png",
      },
      {
        title: "Maestría en Ciberseguridad y Protección de Datos",
        description: "Domina la seguridad informática y protege datos y sistemas contra amenazas cibernéticas. Adquiere conocimientos sobre criptografía, análisis de vulnerabilidades y gestión de riesgos de seguridad.",
        image: "/img/bigsei-portada.png",
      },
    ],
    psychology: [
      {
        title: "Curso en Psicología Clínica y Manejo de la Ansiedad",
        description: "Explora las causas, síntomas y tratamientos de la ansiedad desde una perspectiva clínica. Aprende técnicas de intervención y estrategias de afrontamiento basadas en evidencia científica.",
        image: "/img/bigsei-portada.png",
      },
      {
        title: "Maestría en Psicología Positiva y Bienestar",
        description: "Descubre estrategias avanzadas para fomentar la felicidad, la resiliencia y el desarrollo personal. Integra herramientas de mindfulness y neurociencia para mejorar el bienestar emocional.",
        image: "/img/bigsei-portada.png",
      },
    ],
    languages: [
      {
        title: "Curso de Introducción al Neerlandés para Viajeros",
        description: "Aprende lo básico para comunicarte en neerlandés en situaciones cotidianas. Incluye vocabulario esencial, pronunciación y frases útiles para viajeros.",
        image: "/img/bigsei-portada.png",
      },
      {
        title: "Especialización en Redacción Académica y Preparación para el IELTS",
        description: "Mejora tus habilidades de escritura para destacar en el examen IELTS y en entornos académicos. Aprende técnicas avanzadas de redacción y estructura argumentativa en inglés.",
        image: "/img/bigsei-portada.png",
      },
    ],
  }

  const cardClass = isMobile
    ? "min-w-[350px] max-w-[85%] snap-start shrink-0"
    : "w-full";

  return (
    <>
      {courses[activeTab].map((course, index) => (
        <div
        key={index}
        className={`bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex-shrink-0 ${
          isMobile ? "w-[85vw] ml-4 last:mr-4 snap-start" : ""
        }`}
      >
        <img
          src={course.image || "/placeholder.svg?height=200&width=400"}
          alt={course.title}
          className="w-full h-40 object-cover"
        />
        <div className="p-6">
          <h3 className="font-bold text-lg text-center mb-2">{course.title}</h3>
          <p className="text-gray-600 text-sm mb-4">{course.description}</p>
          <Link to="/Temas" className="text-sm text-fuchsia-500 hover:underline hover:text-fuchsia-600">
            Ver más ...
          </Link>
        </div>
      </div>
      
      ))}
    </>
  )
}

export default FeaturedContent
