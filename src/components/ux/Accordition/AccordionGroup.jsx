import { AccordionDesign } from "./Accordion";

export const AccordionGroup = () => {
  return (
    <div className="w-[87%] mx-auto flex-1 mb-8">
      {[
        {
          id: 1,
          title: "¿Qué necesito para solicitarlo?",
          content: "Para solicitar este programa, necesitará lo siguiente:",
          bulletPoints: [
            "Documento de identidad válido",
            "Formulario de solicitud cumplimentado",
            "Currículum vitae o CV con experiencia relevante",
            "Expedientes académicos o certificados",
            "Carta de recomendación (opcional)"
          ]
        },
        {
          id: 2,
          title: "¿Cuáles son los resultados del aprendizaje?",
          content: "Después de completar este programa, serás capaz de:",
          bulletPoints: [
            "Comprender conceptos y metodologías fundamentales",
            "Aplicar los conocimientos teóricos a situaciones prácticas",
            "Analizar problemas complejos utilizando las habilidades adquiridas",
            "Desarrollar soluciones creativas a los retos de la industria",
            "Comunicar los resultados de manera efectiva a diversos públicos"
          ]
        }
      ].map(({ id, title, content, bulletPoints }) => (
        <AccordionDesign
          key={id}
          title={title}
          content={content}
          bulletPoints={bulletPoints}
          id={id}
        />
      ))}
    </div>
  );
};