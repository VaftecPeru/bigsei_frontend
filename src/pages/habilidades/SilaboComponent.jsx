import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function SyllabusAccordion() {
  const [expandedWeeks, setExpandedWeeks] = useState({});

  const toggleWeek = (weekId) => {
    setExpandedWeeks(prev => ({
      ...prev,
      [weekId]: !prev[weekId]
    }));
  };

  const weeks = [
    {
      id: 1,
      title: "Fundamentos de programación en Python",
      color: "bg-blue-600",
      courses: [
        {
          title: "Introducción a Python",
          description: "Aprende los fundamentos de la sintaxis, variables y tipos de datos de Python",
          image: "/api/placeholder/300/200"
        },
        {
          title: "Estructuras de control",
          description: "Domina las sentencias if-else, los bucles y la lógica condicional",
          image: "/api/placeholder/300/200"
        },
        {
          title: "Funciones y módulos",
          description: "Crea bloques de código reutilizables y organiza tu código",
          image: "/api/placeholder/300/200"
        }
      ]
    },
    {
      id: 2,
      title: "Conceptos de programación más avanzados",
      color: "bg-pink-500",
      courses: [
        {
          title: "Programación Orientada a Objetos",
          description: "Crear clases, objetos e implementar la herencia",
          image: "/api/placeholder/300/200"
        },
        {
          title: "Tratamiento de errores",
          description: "Aprende a capturar y manejar excepciones en tu código",
          image: "/api/placeholder/300/200"
        },
        {
          title: "Operaciones con archivos",
          description: "Lee y escribe en archivos usando Python",
          image: "/api/placeholder/300/200"
        }
      ]
    },
    {
      id: 3,
      title: "Estructuras de datos y algoritmos",
      color: "bg-yellow-400",
      courses: [
        {
          title: "Listas y diccionarios",
          description: "Trabaja con las estructuras de datos incorporadas de Python",
          image: "/api/placeholder/300/200"
        },
        {
          title: "Sorting Algorithms",
          description: "Implementar y comprender técnicas básicas de ordenación",
          image: "/api/placeholder/300/200"
        },
        {
          title: "Algoritmos de búsqueda",
          description: "Aprende implementaciones de búsqueda lineal y binaria",
          image: "/api/placeholder/300/200"
        }
      ]
    },
    {
      id: 4,
      title: "Trabajar con bases de datos",
      color: "bg-green-500",
      cursos: [
        {
          title: "Conceptos básicos de SQL",
          description: "Conectar y consultar bases de datos desde Python",
          image: "/api/placeholder/300/200"
        },
        {
          title: "Integración de SQLite",
          description: "Construye aplicaciones con bases de datos integradas",
          image: "/api/placeholder/300/200"
        },
        {
          title: "Conceptos de ORM",
          description: "Introducción al mapeo objeto-relacional",
          image: "/api/placeholder/300/200"
        }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">Silabo</h1>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 top-6 bottom-0 w-1 bg-gradient-to-b from-blue-600 via-pink-500 to-yellow-400"></div>

        {/* Weeks */}
        <div className="space-y-6">
          {weeks.map((week, index) => (
            <div key={week.id} className="relative">
              {/* Week marker */}
              <div className="absolute left-0 top-2 flex items-center justify-center">
                <div className={`w-8 h-8 rounded-full ${week.color} flex items-center justify-center z-10`}>
                  <span className="text-white font-bold"></span>
                </div>
              </div>

              {/* Week content */}
              <div className="ml-12">
                <div className="flex items-start">
                  <div className="text-lg font-medium text-gray-600 mt-1 w-20">Semana {week.id}</div>
                  <div className="flex-1">
                    <div className="bg-gray-100 p-6 rounded-lg">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">{week.title}</h3>

                      <button
                        onClick={() => toggleWeek(week.id)}
                        className={`flex items-center text-lg font-medium ${expandedWeeks[week.id] ? 'text-blue-600' : 'text-pink-500'} hover:underline focus:outline-none`}
                      >
                        Mostrar desglose semanal
                        {expandedWeeks[week.id] ? <ChevronUp className="ml-1" size={20} /> : <ChevronDown className="ml-1" size={20} />}
                      </button>

                      {expandedWeeks[week.id] && (
                        <div className="mt-4 space-y-4">
                          {week.courses.map((course, courseIndex) => (
                            <div key={courseIndex} className="bg-white p-4 rounded-md shadow-sm flex">
                              <div className="w-32 h-24 bg-gray-200 flex-shrink-0 overflow-hidden rounded-md">
                                <img
                                  src={course.image}
                                  alt={course.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="ml-4 flex-1">
                                <h4 className="font-bold text-gray-800">{course.title}</h4>
                                <p className="text-gray-600 text-sm mt-1">{course.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}