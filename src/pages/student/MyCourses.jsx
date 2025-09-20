import CourseCard from '@/components/dashboard/CourseCard'
import { BookOpen, Search } from 'lucide-react'

function MyCourses() {
    const courses = [
        {   
            id: 1,
            title: "Fundamentos Gráficos - ART101",
            teacher: "Adrian Lizarbe",
            role: "Docente de Fundamentos Gráficos - ART101",
            email: "docente.prueba@gmail.com",
            schedule: "Lunes y jueves",
            time: "Lunes y Miércoles\n9:00 AM - 10:30 AM",
            zoomLink: "https://zoom/jc",
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
            schedule: "Martes y jueves",
            time: "Lunes y Miércoles\n9:00 AM - 10:30 AM",
            zoomLink: "https://zoom/jc",
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
            schedule: "Lunes y sábado",
            time: "Lunes y Miércoles\n9:00 AM - 10:30 AM",
            zoomLink: "https://zoom/jc",
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
            schedule: "Viernes",
            time: "Lunes y Miércoles\n9:00 AM - 10:30 AM",
            zoomLink: "https://zoom/jc",
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
            schedule: "Martes y viernes",
            time: "Lunes y Miércoles\n9:00 AM - 10:30 AM",
            zoomLink: "https://zoom/jc",
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
            schedule: "Jueves",
            time: "Lunes y Miércoles\n9:00 AM - 10:30 AM",
            zoomLink: "https://zoom/jc",
            location: "Estudio de Animación",
            bgColor: "bg-orange-200",
            textColor: "text-orange-800",
        },
    ];
    

    return (
        <div className={`flex flex-col justify-start items-center min-h-screen text-2xl w-full bg-sky-50 p-6 `}>

            {/* Encabezado */}
            <div className="w-full max-w-7xl p-4">
                <div className="flex justify-end items-center text-sm text-gray-500">
                    <span>
                        <a href="#" className="hover:underline">Iaion &gt; Menú &gt; Cursos</a>
                    </span>
                </div>
            </div>

            <div className='max-w-7xl w-full shadow-md rounded-lg bg-white'>
                <div className="flex items-center justify-between border-b p-4">
                    <h2 className="text-base font-semibold">
                        <BookOpen className="inline-block mr-1 w-5 h-5" />
                        Cursos matriculados
                    </h2>
                    <p className="text-sm text-blue-500 hover:underline cursor-pointer">Ver todo</p>
                </div>

                <div className='px-4 py-8'>
                    {/* Buscador */}
                    <div className="flex w-[750px] mb-4">
                        <input
                            type="text"
                            placeholder="Buscar curso"
                            className="w-full px-4 py-2 border border-gray-300 rounded-l-lg text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button className="relative overflow-hidden bg-gradient-to-r from-blue-500 to-indigo-500 px-4 py-2 rounded-r-lg text-white flex items-center justify-center transition-all duration-300 group">
                            <span className="absolute inset-0 bg-gradient-to-r from-white to-white opacity-0 group-hover:opacity-30 transform -translate-x-full group-hover:translate-x-full transition-all duration-500"></span>
                            <Search className="w-4 h-4 z-10" />
                        </button>
                    </div>
                    
                    {/* Tarjetas de cursos */}
                    <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                        {courses.map((course, index) => (
                            <CourseCard key={index} course={course} />
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default MyCourses