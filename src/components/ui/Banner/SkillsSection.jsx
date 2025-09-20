
export const SkillsSection = () => {
  const skills = [
    "Liderazgo estratégico",
    "Experiencia empresarial global",
    "Resolución innovadora de problemas",
    "Comunicación eficaz",
    "Prácticas empresariales sostenibles"
  ];

  return (
    <div className="bg-gray-100 p-8 w-full">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        ¿Qué habilidades aprenderás?
      </h2>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
        {skills.map((skill, index) => (
          <li key={index} className="flex items-start">
            <span className="text-gray-800 mr-2 mt-1">•</span>
            <span className="text-gray-700 font-medium">{skill}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

