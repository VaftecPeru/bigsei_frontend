import { useState } from "react";

function Description() {
    const [activeTab, setActiveTab] = useState("Cursos cortos");

    const tabs = ["Cursos cortos", "Pistas expertas", "Microcredenciales", "Grados en línea"];

    const tabContent = {
        "Cursos cortos": [
            {
                number: "1",
                title: "Elija un curso corto",
                description:
                    "Desde cursos introductorios hasta avanzados, encontrará cursos de alta calidad en todas las materias, diseñados e impartidos por expertos académicos y del sector.",
            },
            {
                number: "2",
                title: "Suscríbete o actualízate",
                description:
                    "Únete a Bigsei Unlimited para un acceso a largo plazo a tu curso y un certificado listo para tu CV, o actualízate individualmente en cada curso.",
            },
            {
                number: "3",
                title: "Aprende, conecta y debate",
                description:
                    "Los cursos se dividen en semanas y pasos. Podrá conectarse con otros alumnos a lo largo de su itinerario de aprendizaje.",
            },
            {
                number: "4",
                title: "Encuentra tu próximo curso",
                description: "Ahora que te he dejado con la intriga, ¿qué vas a aprender?",
            },
        ],
        "Pistas expertas": [
            {
                number: "1",
                title: "Selecciona una pista",
                description:
                    "Elige entre diferentes rutas de aprendizaje diseñadas por expertos en la industria para maximizar tu desarrollo profesional.",
            },
            {
                number: "2",
                title: "Sigue el camino",
                description:
                    "Completa los cursos en el orden recomendado para construir una base sólida de conocimientos y habilidades.",
            },
            {
                number: "3",
                title: "Practica lo aprendido",
                description:
                    "Aplica tus conocimientos en proyectos prácticos y casos de estudio reales proporcionados por empresas líderes.",
            },
            {
                number: "4",
                title: "Obtén certificación",
                description: "Al completar la pista, recibirás una certificación avalada por expertos de la industria.",
            },
        ],
        Microcredenciales: [
            {
                number: "1",
                title: "Explora programas",
                description:
                    "Descubre microcredenciales en campos específicos que te ayudarán a desarrollar habilidades profesionales especializadas.",
            },
            {
                number: "2",
                title: "Aprende a tu ritmo",
                description: "Estudia en línea con flexibilidad, dedicando entre 10-15 horas semanales durante 10-12 semanas.",
            },
            {
                number: "3",
                title: "Completa evaluaciones",
                description: "Demuestra tu comprensión a través de evaluaciones prácticas y proyectos del mundo real.",
            },
            {
                number: "4",
                title: "Credencial profesional",
                description: "Obtén una credencial reconocida por la industria que certifica tus habilidades especializadas.",
            },
        ],
        "Grados en línea": [
            {
                number: "1",
                title: "Elige tu grado",
                description:
                    "Selecciona entre una variedad de programas de grado acreditados, diseñados para una educación completa en línea.",
            },
            {
                number: "2",
                title: "Admisión flexible",
                description: "Proceso de admisión simplificado con múltiples fechas de inicio a lo largo del año.",
            },
            {
                number: "3",
                title: "Estudio estructurado",
                description:
                    "Participa en clases en línea, trabajos en grupo y recibe tutoría personalizada de profesores expertos.",
            },
            {
                number: "4",
                title: "Gradúate en línea",
                description:
                    "Obtén un título universitario completamente reconocido sin necesidad de asistir a un campus físico.",
            },
        ],
    };

    return (
        <div className="pt-20 pb-20 bg-gradient-to-br from-white via-pink-50 to-pink-100 p-8 flex items-center justify-center">
            <div className="max-w-6xl mx-auto w-full">
                <h1 className="text-4xl font-bold text-[#333] mb-2">¿Cómo funciona?</h1>
                <div className="w-12 h-1 bg-[#E6007E] mb-8"></div>

                
                <div className="flex flex-wrap justify-center gap-8 mb-16">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`text-gray-700 pb-2 px-2 transition-all ${
                                activeTab === tab ? "border-b-2 border-[#E6007E] font-medium" : "hover:text-[#E6007E]"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                
                <div className="grid md:grid-cols-4 gap-8">
                    {tabContent[activeTab].map((step) => (
                        <div key={step.number} className="space-y-4">
                            <div className="text-4xl font-bold text-[#E6007E]">{step.number}</div>
                            <h3 className="text-xl font-bold text-gray-800">{step.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Description;
