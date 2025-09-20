import { useState } from "react";
import CourseCardD from "./courses/CourseCardP";
import { BookOpen, Search } from "lucide-react";

const courses = [
  {
    id: 1,
    title: "Fundamentos Gráficos - ART101",
    teacher: "Adrian Lizarbe",
    role: "Docente de Fundamentos Gráficos - ART101",
    email: "docente.prueba@gmail.com",
    location: "Estudio de Diseño A",
    bgColor: "bg-purple-200",
    textColor: "text-purple-800",
  },
  {
    id: 2,
    title: "Diseño Web Avanzado - ITD201",
    teacher: "Dr. Johnson",
    role: "Profesor de Diseño Web Avanzado",
    email: "dr.johnson@university.edu",
    location: "Laboratorio de Computación 3",
    bgColor: "bg-yellow-200",
    textColor: "text-yellow-800",
  },
  {
    id: 3,
    title: "Investigación en Experiencia de Usuario - UXD301",
    teacher: "Prof. Davis",
    role: "Profesor de Investigación en UX",
    email: "prof.davis@university.edu",
    location: "Laboratorio de Diseño 2",
    bgColor: "bg-green-200",
    textColor: "text-green-800",
  },
  {
    id: 4,
    title: "Fotografía Digital - PHO101",
    teacher: "Dr. Adams",
    role: "Docente de Fotografía Digital",
    email: "dr.adams@university.edu",
    location: "Estudio B",
    bgColor: "bg-pink-200",
    textColor: "text-pink-800",
  },
  {
    id: 5,
    title: "Fundamentos de Machine Learning - ML101",
    teacher: "Dr. Lee",
    role: "Profesor de Fundamentos de Machine Learning",
    email: "dr.lee@university.edu",
    location: "Laboratorio de IA",
    bgColor: "bg-blue-200",
    textColor: "text-blue-800",
  },
  {
    id: 6,
    title: "Animación 3D - ANI301",
    teacher: "Prof. White",
    role: "Profesor de Animación 3D",
    email: "prof.white@university.edu",
    location: "Estudio de Animación",
    bgColor: "bg-orange-200",
    textColor: "text-orange-800",
  },
  {
    id: 7,
    title: "Arte Digital - ART202",
    teacher: "Dra. Thompson",
    role: "Docente de Arte Digital",
    email: "thompson@university.edu",
    location: "Aula 4",
    bgColor: "bg-red-200",
    textColor: "text-red-800",
  },
  {
    id: 8,
    title: "Redes Neuronales - ML201",
    teacher: "Dr. Martinez",
    role: "Profesor de Redes Neuronales",
    email: "martinez@university.edu",
    location: "Laboratorio de IA 2",
    bgColor: "bg-teal-200",
    textColor: "text-teal-800",
  },
  {
    id: 9,
    title: "Edición de Video - VID101",
    teacher: "Prof. Richardson",
    role: "Docente de Edición de Video",
    email: "richardson@university.edu",
    location: "Sala de Postproducción",
    bgColor: "bg-gray-200",
    textColor: "text-gray-800",
  },
  {
    id: 10,
    title: "Desarrollo de Videojuegos - GAM301",
    teacher: "Dr. Evans",
    role: "Profesor de Desarrollo de Videojuegos",
    email: "evans@university.edu",
    location: "Laboratorio de Juegos",
    bgColor: "bg-indigo-200",
    textColor: "text-indigo-800",
  },
  {
    id: 11,
    title: "Cinematografía - CIN101",
    teacher: "Prof. Stewart",
    role: "Docente de Cinematografía",
    email: "stewart@university.edu",
    location: "Estudio de Cine",
    bgColor: "bg-cyan-200",
    textColor: "text-cyan-800",
  },
  {
    id: 12,
    title: "Realidad Aumentada - AR301",
    teacher: "Dr. Wilson",
    role: "Profesor de Realidad Aumentada",
    email: "wilson@university.edu",
    location: "Laboratorio de AR/VR",
    bgColor: "bg-lime-200",
    textColor: "text-lime-800",
  },
  {
    id: 13,
    title: "Música Digital - MUS201",
    teacher: "Prof. Allen",
    role: "Docente de Música Digital",
    email: "allen@university.edu",
    location: "Estudio de Audio",
    bgColor: "bg-rose-200",
    textColor: "text-rose-800",
  },
  {
    id: 14,
    title: "Blockchain y Criptografía - BC101",
    teacher: "Dr. Clark",
    role: "Profesor de Blockchain",
    email: "clark@university.edu",
    location: "Laboratorio de Ciberseguridad",
    bgColor: "bg-fuchsia-200",
    textColor: "text-fuchsia-800",
  },
  {
    id: 15,
    title: "Escritura Creativa - WRIT101",
    teacher: "Prof. Harris",
    role: "Docente de Escritura Creativa",
    email: "harris@university.edu",
    location: "Biblioteca Central",
    bgColor: "bg-emerald-200",
    textColor: "text-emerald-800",
  },
  {
    id: 16,
    title: "Realidad Virtual - VR401",
    teacher: "Dr. King",
    role: "Profesor de Realidad Virtual",
    email: "king@university.edu",
    location: "Laboratorio VR",
    bgColor: "bg-violet-200",
    textColor: "text-violet-800",
  },
  {
    id: 17,
    title: "Ilustración Digital - ILU202",
    teacher: "Prof. Lewis",
    role: "Docente de Ilustración Digital",
    email: "lewis@university.edu",
    location: "Estudio Creativo",
    bgColor: "bg-amber-200",
    textColor: "text-amber-800",
  },
  {
    id: 18,
    title: "Fotografía Analógica - PHO201",
    teacher: "Dr. Walker",
    role: "Profesor de Fotografía Analógica",
    email: "walker@university.edu",
    location: "Cuarto Oscuro",
    bgColor: "bg-sky-200",
    textColor: "text-sky-800",
  },
  {
    id: 19,
    title: "Dibujo Técnico - DRAW101",
    teacher: "Prof. Scott",
    role: "Docente de Dibujo Técnico",
    email: "scott@university.edu",
    location: "Aula de Arquitectura",
    bgColor: "bg-zinc-200",
    textColor: "text-zinc-800",
  },
  {
    id: 20,
    title: "Producción Audiovisual - AVP301",
    teacher: "Dr. Lopez",
    role: "Profesor de Producción Audiovisual",
    email: "lopez@university.edu",
    location: "Sala de Edición",
    bgColor: "bg-red-300",
    textColor: "text-red-900",
  },
];

function MyCoursesP() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col justify-start items-center min-h-screen w-full bg-sky-50 p-6">
      {/* Encabezado */}
      <div className="w-full max-w-7xl p-4">
        <div className="flex justify-end text-sm text-gray-500">
          <a href="#" className="hover:underline">
            Iaion &gt; Menú &gt; Cursos
          </a>
        </div>
      </div>

      {/* Contenedor Principal */}
      <div className="max-w-7xl w-full shadow-md rounded-lg bg-white">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-semibold flex items-center">
            <BookOpen className="mr-2 w-6 h-6" />
            Cursos Existentes
          </h2>
          <p className="text-sm text-blue-500 hover:underline cursor-pointer">
            Ver todo
          </p>
        </div>

        {/* Buscador */}
        <div className="px-4 py-6 flex justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Buscar curso"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Buscar curso"
            />
            <button className="absolute right-3 top-2 text-gray-500 hover:text-gray-700">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tarjetas de cursos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCardD key={course.id} course={course} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500">
              No se encontraron cursos.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyCoursesP;
