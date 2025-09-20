import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Calendar, Clock, LinkIcon, Mail, CalendarDays, MailIcon, ChevronDown, ArrowRight } from 'lucide-react';
import { Button, Card } from '@mui/material';

function CourseDetailsD() {
    const { id } = useParams();
    const navigate = useNavigate()

    const goToMessages = () => {
        /* navigate('/student/cursos/mensajeria');  */
        navigate(`/director/cursos/${id}/mensajeria`);
    };

    const courses = [
        {   
            id: 1,
            title: "Fundamentos Gráficos - ART101",
            teacher: "Adrian Lizarbe",
            role: "Docente de Fundamentos Gráficos - ART101",
            email: "docente.prueba@gmail.com",
            schedule: "Lunes y jueves",
            time: "9:00 - 10:30",
            zoomLink: "https://zoom/jc",
            location: "Estudio de Diseño A",
            bgColor: "bg-purple-100",
            textColor: "text-purple-800",
            attendance: {
                completed: 10,
                total: 16
            },
            deliveries: {
                completed: 2,
                total: 2
            },
            modules: [
                { id: 1, title: "Módulo I", description: "Nombre del módulo" },
                { id: 2, title: "Módulo II", description: "Nombre del módulo" }
            ]
        },
        {
            id: 2,
            title: "Diseño Web Avanzado - ITD201",
            teacher: "Dr. Johnson",
            role: "Profesor de Diseño Web Avanzado",
            email: "dr.johnson@university.edu",
            schedule: "Martes y jueves",
            time: "9:00 - 10:30",
            zoomLink: "https://zoom/jc",
            location: "Laboratorio de Computación 3",
            bgColor: "bg-yellow-100",
            textColor: "text-yellow-800",
            attendance: {
                completed: 10,
                total: 16
            },
            deliveries: {
                completed: 2,
                total: 2
            },
            modules: [
                { id: 1, title: "Módulo I", description: "Nombre del módulo" },
                { id: 2, title: "Módulo II", description: "Nombre del módulo" }
            ]
        },
        {
            id: 3,
            title: "Investigación en Experiencia de Usuario - UXD301",
            teacher: "Prof. Davis",
            role: "Profesor de Investigación en UX",
            email: "prof.davis@university.edu",
            schedule: "Lunes y sábado",
            time: "9:00 - 10:30",
            zoomLink: "https://zoom/jc",
            location: "Laboratorio de Diseño 2",
            bgColor: "bg-green-100",
            textColor: "text-green-800",
            attendance: {
                completed: 10,
                total: 16
            },
            deliveries: {
                completed: 2,
                total: 2
            },
            modules: [
                { id: 1, title: "Módulo I", description: "Nombre del módulo" },
                { id: 2, title: "Módulo II", description: "Nombre del módulo" }
            ]
        },
        {
            id: 4,
            title: "Fotografía Digital - PHO101",
            teacher: "Dr. Adams",
            role: "Docente de Fotografía Digital",
            email: "dr.adams@university.edu",
            schedule: "Viernes",
            time: "9:00 - 10:30",
            zoomLink: "https://zoom/jc",
            location: "Estudio B",
            bgColor: "bg-pink-100",
            textColor: "text-pink-800",
            attendance: {
                completed: 10,
                total: 16
            },
            deliveries: {
                completed: 2,
                total: 2
            },
            modules: [
                { id: 1, title: "Módulo I", description: "Nombre del módulo" },
                { id: 2, title: "Módulo II", description: "Nombre del módulo" }
            ]
        },
        {
            id: 5,
            title: "Fundamentos de Machine Learning - ML101",
            teacher: "Dr. Lee",
            role: "Profesor de Fundamentos de Machine Learning",
            email: "dr.lee@university.edu",
            schedule: "Martes y viernes",
            time: "9:00 - 10:30",
            zoomLink: "https://zoom/jc",
            location: "Laboratorio de IA",
            bgColor: "bg-blue-100",
            textColor: "text-blue-800",
            attendance: {
                completed: 10,
                total: 16
            },
            deliveries: {
                completed: 2,
                total: 2
            },
            modules: [
                { id: 1, title: "Módulo I", description: "Nombre del módulo" },
                { id: 2, title: "Módulo II", description: "Nombre del módulo" }
            ]
        },
        {
            id: 6,
            title: "Animación 3D - ANI301",
            teacher: "Prof. White",
            role: "Profesor de Animación 3D",
            email: "prof.white@university.edu",
            schedule: "Jueves",
            time: "9:00 - 10:30",
            zoomLink: "https://zoom/jc",
            location: "Estudio de Animación",
            bgColor: "bg-orange-100",
            textColor: "text-orange-800",
            attendance: {
                completed: 10,
                total: 16
            },
            deliveries: {
                completed: 2,
                total: 2
            },
            modules: [
                { id: 1, title: "Módulo I", description: "Nombre del módulo" },
                { id: 2, title: "Módulo II", description: "Nombre del módulo" }
            ]
        },
    ];
    

    
    
    const course = courses.find(course => course.id === parseInt(id));

    if (!course) {
        return <div>Curso no encontrado</div>;
    }

    return (
        <div className="flex flex-col justify-start items-center min-h-screen w-full bg-sky-50 p-6">
            <div className="w-full max-w-7xl p-4">
                <div className="flex justify-end items-center text-sm text-gray-500">
                    <span>
                        <a href="#" className="hover:underline">Iaion &gt; Menú &gt; Cursos &gt; detalles</a>
                    </span>
                </div>
            </div>

            <div className="w-full max-w-7xl">
                {/* Banner con el perfil junto*/}
                <div 
                    className="relative w-full h-64 bg-cover bg-center rounded-t-lg overflow-hidden"
                    style={{ 
                        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/img/library-bg.jpg')`
                    }}
                >
                    <div className="absolute bottom-0 right-0 w-full p-8 text-right">
                        <h1 className="text-4xl font-bold text-white">{course.title}</h1>
                    </div>
                </div>

                {/* */}
                <div className="relative bg-white rounded-b-lg shadow-md p-2">
                    <div className="flex items-start space-x-4">
                        <div className="relative flex-shrink-0">
                            <div className="w-40 h-40 bg-white rounded-full border-4 border-white shadow-lg overflow-hidden -mt-20">
                                <img 
                                    src="/img/default-avatar.jpg" 
                                    alt={course.teacher}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        
                        <div className="flex items-baseline w-full gap-7">
                            <div className='flex-grow mt-0'>
                                <h2 className="text-2xl font-semibold text-gray-800">{course.teacher}</h2>
                                <p className="text-gray-600 mt-1">{course.role}</p>
                                <div className="flex items-center space-x-2">
                                    <MailIcon className="w-5 h-5 text-gray-500" />
                                    <span>{course.email}</span>
                                </div>
                            </div>
                            
                            <div className="mt-6 flex flex-col flex-wrap gap-2">
                                <div className="flex items-center gap-3 text-gray-700">
                                    <Calendar className="w-5 h-5"/>
                                    <span>{course.schedule}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <Clock className="w-5 h-5" />
                                    <span>{course.time}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <LinkIcon className="w-5 h-5" />
                                    <a href={course.zoomLink} className="text-blue-500 hover:underline">
                                        Link de zoom
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navegacion */}
                <Card className="mt-6 border-b border-gray-200 p-5">
                    <nav className="-mb-px flex space-x-8">
                        <a href="#" className="border-b-2 border-blue-500 pb-4 px-1 text-sm font-medium text-blue-600">
                            Actividades
                        </a>
                        <a onClick={goToMessages} className="border-b-2 border-transparent pb-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 cursor-pointer">
                            Mensajería
                        </a>
                        {/* <a className="border-b-2 border-transparent pb-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                            Encuesta
                        </a> */}
                    </nav>
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white rounded-lg p-6 shadow-sm border">
                            <h3 className="text-lg font-medium text-gray-900">Asistencia</h3>
                            <div className="mt-2 flex items-baseline">
                                <span className="text-5xl font-bold text-gray-900">70%</span>
                                <span className="ml-4 text-sm text-gray-500">
                                    Clases asistidas {course.attendance.completed} de {course.attendance.total}
                                </span>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg p-6 shadow-sm border">
                            <h3 className="text-lg font-medium text-gray-900">Entregas</h3>
                            <div className="mt-2 flex items-baseline">
                                <span className="text-5xl font-bold text-gray-900">100%</span>
                                <span className="ml-4 text-sm text-gray-500">
                                    Entregas completadas {course.deliveries.completed} de {course.deliveries.total}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        <div className="bg-white rounded-lg p-6 shadow-sm border">
                            <div className='bg-white rounded-lg p-6 shadow-sm border'>
                                <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                                <p className="mt-2 text-gray-600">
                                    Ingresa a la clase de Graphic Fundamentals y presta atención. ¡Únite vía Zoom!
                                </p>
                                <div className='flex flex-col justify-center items-center gap-5'>
                                    <img src="/img/zoom_platform.png" className='w-52 p-2' />
                                    <button className="bg-[#0C1E33] text-white px-4 py-2 rounded-lg flex items-center gap-2">        
                                        Conectarse
                                        <ArrowRight/>
                                    </button>
                                </div> 
                            </div>
                            
                            <div className='bg-white rounded-lg p-6 shadow-sm border'>
                                <h3 className="text-xl font-bold text-gray-900">Sin actividades <br /> pendientes</h3>
                                <p className="mt-2 text-gray-600">
                                    Felicidades, no tienes actividades pendientes
                                </p>
                            </div>
                            
                            
                        </div>
                        
                        {/* Modulos */}
                        <div className="md:col-span-2 bg-white rounded-lg p-6 shadow-sm border">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Módulos</h3>
                            <div className="space-y-2">
                                {course.modules.map((module) => (
                                    <div 
                                        key={module.id}
                                        className="bg-green-100 p-4 rounded-lg flex items-center justify-between cursor-pointer relative"
                                    >
                                        {/* Borde verde lateral */}
                                        <div className="absolute left-0 top-0 h-full w-2 bg-green-600 rounded-l-lg"></div>

                                        {/* Contenido */}
                                        <div className="pl-4"> {/* Agrega padding izquierdo */}
                                            <h4 className="font-bold text-green-700">{module.title}</h4>
                                            <p className="text-sm text-green-600">{module.description}</p>
                                        </div>

                                        {/* Icono */}
                                        <ChevronDown className="w-5 h-5 text-green-600" />
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </Card>
                {/* asistencia y entregas */}
                
            </div>
        </div>
    );
}

export default CourseDetailsD;

