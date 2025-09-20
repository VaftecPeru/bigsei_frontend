import Header from "@/components/layout/Header"
import { Calendar, Check } from "lucide-react"
import React, { useState, useRef, useEffect } from 'react';
import SyllabusAccordion from "./SilaboComponent";

const PageHabilidades = () => {

  const [activeTab, setActiveTab] = useState('overview');

  // References to each section
  const overviewRef = useRef(null);
  const syllabusRef = useRef(null);
  const startDatesRef = useRef(null);
  const requirementsRef = useRef(null);
  const educatorsRef = useRef(null);
  const includedRef = useRef(null);
  const reviewsRef = useRef(null);
  const tryItRef = useRef(null);
  const moreCoursesRef = useRef(null);

  const navItems = [
    { id: 'overview', label: 'Overview', ref: overviewRef },
    { id: 'syllabus', label: 'Syllabus', ref: syllabusRef },
    { id: 'startDates', label: 'Start dates', ref: startDatesRef },
    { id: 'requirements', label: 'Requirements', ref: requirementsRef },
    { id: 'educators', label: 'Educators', ref: educatorsRef },
    { id: 'included', label: 'What\'s included', ref: includedRef },
    { id: 'reviews', label: 'Learner reviews', ref: reviewsRef },
    { id: 'tryIt', label: 'Try it', ref: tryItRef },
    { id: 'moreCourses', label: 'More courses', ref: moreCoursesRef }
  ];

  // Handle navigation click - scroll to the section
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    const section = navItems.find(item => item.id === tabId);
    if (section && section.ref.current) {
      section.ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Set up intersection observer to update active tab based on scroll position
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -80% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-section');
          setActiveTab(id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    navItems.forEach(item => {
      if (item.ref.current) {
        observer.observe(item.ref.current);
      }
    });

    return () => {
      navItems.forEach(item => {
        if (item.ref.current) {
          observer.unobserve(item.ref.current);
        }
      });
    };
  }, []);
  return (

    <>

      <header>
        <Header />
      </header>

      <main>
        <div className=" w-[90%] mx-auto flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Left side - Course Info */}
          <div className="p-6 md:w-1/2">
            <div className="mb-4">
              <p className="text-pink-500 text-sm font-medium">Cursos en línea / IT & Ciencias de la Computación</p>
              <div className="flex items-center mt-4 mb-6">
                <div className="w-12 h-12">
                  <div className="bg-gray-900 w-10 h-10 flex items-center justify-center">
                    <div className="w-8 h-8 bg-gray-900"></div>
                  </div>
                </div>
                <div className="ml-2">
                  <span className="font-bold text-xl">DA CLICK</span>
                  <br />
                  <span className="font-bold text-xl">PARA INICIAR.</span>
                </div>
              </div>
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mb-4">Una introducción de la programación usando Python</h1>

            <div className="flex items-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
              <span className="ml-2 text-yellow-500 font-medium">4.9 (18 valoraciones)</span>
            </div>

            <p className="text-gray-700 mb-6">
              Aprende los fundamentos de la programación en Python y cómo iniciar tu carrera tecnológica con la Universidad de Leeds.
            </p>

            <button className="bg-pink-500 text-white font-bold py-2 px-6 rounded hover:bg-pink-600 transition duration-300">
              Unete ahora
            </button>

            <p className="text-gray-600 mt-4">10,107 matriculado en este cursos</p>
          </div>

          {/* Right side - Image and Call to Action */}
          <div className="md:w-1/2 relative bg-gradient-to-r from-pink-500 to-orange-400">
            <div className="flex justify-center items-center h-full p-6">
              <div className="relative">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <img src="https://ugc.bigsei.com/uploads/images/7e/0d/header_7e0d5bc5-b2b5-4c8e-8b5e-d8e2993a3919.jpg" alt="Estudiante con laptop" className="w-64 h-64 object-cover" />
                </div>
                <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
                  <button className="bg-white text-black font-bold py-2 px-4 rounded-md shadow-lg border-2 border-gray-200">
                    INSCRÍBETE AHORA
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Navigation */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto">
          <nav className="flex overflow-x-auto whitespace-nowrap">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`px-4 py-4 font-medium text-sm focus:outline-none transition-colors duration-200 relative ${activeTab === item.id
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
                onClick={() => handleTabClick(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-6xl mx-auto px-4">
        {/* Overview Section */}
        <div ref={overviewRef} data-section="overview" className="py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Desbloquea los fundamentos de programación de Python para codificar con confianza
            </h2>

            <p className="text-lg text-gray-700 mb-6">
              Python está revolucionando la industria tecnológica al hacer que la programación sea accesible y versátil.
            </p>

            <p className="text-lg text-gray-700 mb-10">
              Tanto si eres nuevo en la programación como si quieres mejorar tus habilidades, este curso completo de la Universidad de Leeds es tu puerta de entrada para aprender los conceptos básicos y explorar las habilidades que necesitas para lanzar una carrera de éxito en la tecnología.
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Explora los fundamentos de la programación en Python
            </h2>

            <p className="text-lg text-gray-700">
              Te embarcarás en un atractivo viaje a Python, uno de los lenguajes de programación más populares del mundo. Este curso está diseñado para construir su confianza en la codificación, independientemente de su nivel de experiencia.
            </p>
          </div>
        </div>

        {/* Syllabus Section */}
        <div ref={syllabusRef} data-section="syllabus" className="py-16 border-t border-gray-200">
          <SyllabusAccordion />
        </div>

        {/* Start Dates Section */}
        <div ref={startDatesRef} data-section="startDates" className="py-16 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Fechas de inicio</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-lg mb-4">Este curso tiene fechas de inicio flexibles. ¡Puedes empezar a aprender hoy mismo! </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-32 font-medium">Siguiente:</span>
                  <span>15 de mayo de 2025</span>
                </li>
                <li className="flex items-center">
                  <span className="w-32 font-medium">Siguiente: </span>
                  <span>12 de junio de 2025</span>
                </li>
                <li className="flex items-center">
                  <span className="w-32 font-medium">A tu ritmo: </span>
                  <span>Comienza cuando quieras</span>
                </li>
              </ul>
              <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700">
                Inscríbete ahora
              </button>
            </div>
          </div>
        </div>

        {/* Requirements Section */}
        <div ref={requirementsRef} data-section="requirements" className="py-16 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Requisitos</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Lo que necesitas para empezar</h3>
              <ul className="space-y-3">
                <li className="flex">
                  <svg className="flex-shrink-0 h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Un ordenador con acceso a internet</span>
                </li>
                <li className="flex">
                  <svg className="flex-shrink-0 h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>No se necesita experiencia previa en programación</span>
                </li>
                <li className="flex">
                  <svg className="flex-shrink-0 h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Conocimientos básicos de informática</span>
                </li>
                <li className="flex">
                  <svg className="flex-shrink-0 h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Curiosidad y ganas de aprender</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Educators Section */}
        <div ref={educatorsRef} data-section="educators" className="py-16 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Docentes</h2>
            <div className="grid md: grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h3 className="font-bold text-xl">Dr. Sarah Johnson</h3>
                    <p className="text-gray-600 mb-2">Instructora principal, doctora en Informática</p>
                    <p className="text-gray-700">Experta en programación Python con más de 10 años de experiencia docente en la Universidad de Leeds. </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-start">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h3 className="font-bold text-xl">Prof. Michael Chen</h3>
                    <p className="text-gray-600 mb-2">Diseñador del curso, Máster en Ingeniería de Software</p>
                    <p className="text-gray-700">Profesional del sector con experiencia en el desarrollo de aplicaciones Python para la ciencia de datos.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What's Included Section */}
        <div ref={includedRef} data-section="included" className="py-16 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Qué incluye?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-xl mb-3">Materiales del curso</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>24 horas de lecciones en vídeo</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Ejemplos de código descargables</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Ejercicios prácticos interactivos</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-bold text-xl mb-3">Certificado y asistencia</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Certificado al finalizar</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Soporte para preguntas y respuestas del instructor</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-blue-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>6 meses de acceso a los materiales del curso</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Learner Reviews Section */}
        <div ref={reviewsRef} data-section="reviews" className="py-16 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text- gray-800 mb-6">Comentarios de alumnos</h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-3">"Este curso era exactamente lo que necesitaba para empezar mi viaje de programación. Los instructores explican conceptos complejos de una manera que es fácil de entender."</p>
                <p className="font-medium">- Alex M., Completed March 2025</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-3">"Como alguien sin experiencia previa en codificación, temía que fuera demasiado difícil, pero el curso está estructurado perfectamente para principiantes. Ahora tengo confianza para escribir mis propios programas en Python."</p>
                <p className="font-medium">- Jessica T., Completado en Enero 2025</p>
              </div>
            </div>
          </div>
        </div>

        {/* Try It Section */}
        <div ref={tryItRef} data-section="tryIt" className="py-16 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Pruébalo</h2>
            <div className="bg-gray- 900 text-white p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Muestra de código Python</h3>
              <div className="bg-gray-800 p-4 rounded font-mono text-sm mb-4">
                <pre>
                  {`# Tu primer programa Python
                    def greet(nombre):
                        return f "¡Hola, {nombre}! Bienvenido a la programación Python!"

                    # Pruébalo
                    print(greet("Aprendiz"))
                    print("¡Python es increíble!")

                    # Salida:
                    # ¡Hola, Aprendiz! ¡Bienvenido a la programación en Python!
                    # ¡Python es increíble!`}
                </pre>
              </div>
              <p className="mb-4">Esto es sólo una muestra de lo que aprenderás en este curso. ¿Listo para escribir tu propio código Python?</p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700">
                Prueba la Vista Previa Gratis
              </button>
            </div>
          </div>
        </div>

        {/* More Courses Section */}
        <div ref={moreCoursesRef} data-section="moreCourses" className="py-16 border-t border-gray-200">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Más cursos</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-40 bg-blue-100"></div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">Programación avanzada en Python</h3>
                  <p className="text-gray-600 mb-3">Lleva tus conocimientos de Python al siguiente nivel con conceptos avanzados. </p>
                  <button className="text-blue-600 font-medium hover: underline">Aprende más</button>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="h-40 bg-green-100"></div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">Python para la ciencia de datos</h3>
                  <p className="text-gray-600 mb-3">Aprende a analizar datos y crear visualizaciones con Python. </p>
                  <button className="text-blue-600 font-medium hover:underline">Aprende más</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white p-6">

        {/* Topics Section */}
        <section className="bg-gray-100 p-6 mb-8">
          <h2 className="text-xl font-semibold text-center mb-6">¿Qué temas tratará?</h2>
          <ul className="space-y-2 max-w-2xl mx-auto">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">-</span>
              <span>¿Qué es el pensamiento crítico? </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">-</span>
              <span>Un modelo para el pensamiento crítico</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">-</span>
              <span>¿Por qué es importante el pensamiento crítico en la universidad? </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">-</span>
              <span>Desafíos para pensar críticamente en la universidad</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">-</span>
              <span>¿Cómo puedes mejorar tu pensamiento crítico? </span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">-</span>
              <span>Resultados del pensamiento crítico en la universidad</span>
            </li>
          </ul>
        </section>

        {/* Start Date Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">¿Cuándo te gustaría empezar?</h2>
          <p className="mb-4">Comienza ahora mismo y únete a un aula global de alumnos. Si el curso aún no ha comenzado, verás la fecha futura a continuación.</p>

          <div className="border-l-4 border-pink-600 pl-4 mb-4">
            <div className="flex justify-between items-center py-4 border-b">
              <div className="flex items-center">
                <Calendar className="mr-4 text-gray-500" size={24} />
                <span className="font-medium">Disponible ahora</span>
              </div>
              <button className="bg-pink-600 text-white px-4 py-1 rounded text-sm">Inscríbete hoy</button>
            </div>
          </div>
        </section>

        {/* Learning Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Aprendizaje en este curso</h2>
          <p>En cada paso del curso puedes conocer a otros alumnos, compartir tus ideas y participar en debates activos en los comentarios.</p>
        </section>

        {/* Achievements Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">¿Qué vas a conseguir?</h2>
          <p className="mb-4">Al finalizar el curso, serás capaz de...</p>

          <ul className="space-y-4">
            <li className="flex items-center">
              <Check className="text-green-600 mr-2 flex-shrink-0" size={24} />
              <span>Reflexiona sobre tu enfoque y capacidad para pensar críticamente</span>
            </li>
            <li className="flex items-center">
              <Check className="text-green-600 mr-2 flex-shrink-0" size={24} />
              <span>Explique qué significa pensar críticamente en la universidad</span>
            </li>
            <li className="flex items-center">
              <Check className="text-green-600 mr-2 flex-shrink-0" size={24} />
              <span>Identificar los retos potenciales para pensar críticamente en la universidad</span>
            </li>
            <li className="flex items-center">
              <Check className="text-green-600 mr-2 flex-shrink-0" size={24} />
              <span>Desarrollar estrategias para mejorar tus habilidades de pensamiento crítico</span>
            </li>
          </ul>
        </section>

        {/* Target Audience Section */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">¿A quién va dirigido el curso?</h2>
          <p className="mb-4">Este curso va dirigido a cualquier persona que se esté preparando para estudiar a nivel universitario o a estudiantes universitarios actuales. Puedes ser un estudiante universitario o un nuevo estudiante de postgrado que no esté familiarizado con los estudios en el Reino Unido. Si quieres tener una vida académica exitosa, este curso te dará los fundamentos sea cual sea tu disciplina en la universidad.</p>
          <p className="mb-4">Las habilidades de pensamiento crítico también son valoradas más adelante por los empleadores, así que si quieres refrescar tus habilidades, este práctico curso online es para ti. </p>
          <p>El curso forma parte de la <a href="#" className="text-pink-600 hover:underline">cartera de cursos de habilidades académicas</a> de la Universidad de Leeds con el objetivo de mejorar las habilidades necesarias para el estudio académico.</p>
        </section>

        {/* Instructors Section */}
        <section>
          <h2 className="text-xl font-semibold mb-6">¿Con quién vas a aprender? </h2>
          <div className="grid md: grid-cols-2 gap-6">
            <div className="flex justify-center">
              <img src="/api/placeholder/300/300" alt="Instructor del curso" className="rounded-full w-64 h-64 object- cover" />
            </div>
            <div className="flex justify-center">
              <img src="/api/placeholder/300/300" alt="Course instructor" className="rounded-full w-64 h-64 object-cover" />
            </div>
          </div>
        </section>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Endorsers and Supporters Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Patrocinadores y colaboradores
          </h2>

          <div className="flex flex-col md:flex-row justify-center items-center gap-12">
            <div className="text-center">
              <p className="text-gray-600 mb-3">apoyado por</p>
              <div className="h-16">
                <div className="font-bold text-2xl">
                  Instituto <span className="text-lg">de</span><br />
                  Codificación
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-3">financiado por</p>
              <div className="h-16 flex items-center justify-center">
                <div className="flex items-center">
                  <div className="w-10 h-10 mr-2 flex items-center justify- center">
                    <div className="w-8 h-8 border-2 border-black rounded-full flex items-center justify-center">
                      <span className="font-bold">N</span>
                    </div>
                  </div>
                  <span className="font-semibold text-xl">NOMINET</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* What's Included Section */}
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute right-0 top-0 w-64 h-64 -z-10">
            <div className="w-48 h-48 bg-orange-300 transform rotate-45 absolute right-0 top-0"></div>
            <div className="w-48 h-48 bg-red-400 transform rotate-45 absolute right-24 top-24"></div>
          </div>

          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            ¿Qué incluye?
          </h2>

          <div className="bg-white p-8 shadow-md rounded-lg mb-12">
            <p className="text-gray-700 mb-6">
              La Universidad de Leeds está ofreciendo a todos los que se unan a este curso una actualización digital gratuita, para que puedas experimentar todos los beneficios de estudiar en línea de forma gratuita. Esto significa que usted consigue:
            </p>

            <ul className="space-y-4">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink- 0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Acceso ilimitado a este curso</span>
              </li>

              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Incluye cualquier artículo, vídeos, revisiones por pares y cuestionarios</span>
              </li>

              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink- 0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Pruebas para validar tu aprendizaje</span>
              </li>

              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-2 mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text- gray-700">Un certificado de aprovechamiento en PDF para demostrar tu éxito cuando cumplas los requisitos</span>
              </li>
            </ul>

            <div className="flex justify-center mt-8">
              <button className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-6 rounded-md">
                Únete ahora
              </button>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default PageHabilidades