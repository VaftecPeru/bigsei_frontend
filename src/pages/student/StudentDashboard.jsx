import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import CourseCard from "@/components/dashboard/CourseCard";
import CurrentClass from "@/components/dashboard/CurrentClass";
import TaskCard from "@/components/dashboard/TaskCard";
import EventCalendar from "@/components/widgets/EventCalendar";
import { ArrowRight, BookOpen, Clock, NotepadText, X } from "lucide-react";
import apiClient from "@/Utils/apiClient";
import { Api_Global_Dashboard } from "@/services/DashboardApi";
import Cookies from 'js-cookie';

export default function StudentDashboard() {
    const [asistencias, setAsistencias] = useState([]);
    const [courses, setCourses] = useState([]);
    const [notas, setNotas] = useState([]);
    const [tareas, setTareas] = useState([]);
    const [showWelcome, setShowWelcome] = useState(true);
    const idUser = Cookies.get('idUser');

    useEffect(() => {
        const fetchCourses = async (idUsuario) => {
            try {
                const response = await apiClient.get(Api_Global_Dashboard.student.listarCursos(idUsuario));
                if (!response.data.success) {
                    throw new Error(response.data.message || 'Error al obtener los cursos');
                }

                const transformedCourses = response.data.data.map(course => {
                    const teachers = course.curso.docentes.map(docente => ({
                        name: `${docente.nombres} ${docente.apellidoPaterno}`,
                        horarios: docente.horarios
                    }));

                    const mainTeacher = teachers.length > 0 ? teachers[0].name : 'Profesor no asignado';

                    const allSchedules = teachers.flatMap(teacher => teacher.horarios);
                    const firstSchedule = allSchedules.length > 0 ? allSchedules[0] : null;

                    const colors = [
                        { bg: 'bg-blue-100', text: 'text-blue-800' },
                        { bg: 'bg-green-100', text: 'text-green-800' },
                        { bg: 'bg-purple-100', text: 'text-purple-800' },
                        { bg: 'bg-yellow-100', text: 'text-yellow-800' },
                        { bg: 'bg-pink-100', text: 'text-pink-800' },
                    ];
                    const randomColor = colors[Math.floor(Math.random() * colors.length)];

                    return {
                        id: course.idCursoEstudiante,
                        title: course.curso.nombreCurso,
                        code: course.curso.codigoCurso,
                        credits: course.curso.creditos,
                        teacher: mainTeacher,
                        day: firstSchedule ? firstSchedule.dia : 'Día no asignado',
                        time: firstSchedule
                            ? `${firstSchedule.horaInicio.split(':').slice(0, 2).join(':')}-${firstSchedule.horaFin.split(':').slice(0, 2).join(':')}`
                            : 'Horario no asignado',
                        location: firstSchedule?.aula || 'Aula no asignada',
                        bgColor: randomColor.bg,
                        textColor: randomColor.text,
                        allTeachers: teachers,
                        allSchedules: allSchedules
                    };
                });

                setCourses(transformedCourses);
            } catch (err) {
                console.error("Error fetching courses:", err);
            }
        };

        fetchCourses(idUser);

        const fetchNotas = async (idUsuario) => {
            try {
                const response = await apiClient.get(Api_Global_Dashboard.student.listarNotas(idUsuario));
                setNotas(response.data.data);
            } catch (err) {
                console.error("Error fetching data: ", err)
            }
        };

        fetchNotas(idUser);

        const fetchTareas = async (idUsuario) => {
            try {
                const response = await apiClient.get(Api_Global_Dashboard.student.listarTareas(idUsuario));
                setTareas(response.data.data);
            } catch (err) {
                console.error("Error fetching data: ", err)
            }
        };

        fetchTareas(idUser);

        const fetchAsistencia = async (idUsuario) => {
            try {
                const response = await apiClient.get(Api_Global_Dashboard.student.listarAsistencia(idUsuario));
                setAsistencias(response.data.data);
            } catch (err) {
                console.error("Error fetching data: ", err)
            }
        };

        fetchAsistencia(idUser);
    }, []);

    useEffect(() => {
        if (showWelcome) {
            const timer = setTimeout(() => {
                setShowWelcome(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showWelcome]);

    useEffect(() => {
        if (showWelcome) {
            const timer = setTimeout(() => {
                setShowWelcome(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [showWelcome]);

    return (
        <div className="flex flex-col items-center min-h-screen w-full bg-sky-50 p-6">
            {/* Encabezado */}
            <div className="w-full max-w-7xl p-4">
                <div className="flex justify-end items-center text-sm text-black font-bold">
                    <span>
                        <Link to="#" className="hover:underline">Iaion &gt; Menú &gt; Inicio</Link>
                    </span>
                </div>
            </div>

            {/* Grid principal */}
            <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 lg:gap-7 p-4">
                {/* Clase actual y calendario */}
                <div className="sm:col-span-2">
                    <CurrentClass />
                </div>
                <div className="sm:col-span-1">
                    <EventCalendar />
                </div>

                {/* Cursos matriculados */}
                <div className="bg-white shadow-md rounded-lg sm:col-span-2">
                    <div className="flex items-center justify-between border-b p-4">
                        <h2 className="text-lg font-bold flex items-center">
                            <BookOpen className="inline-block mr-2 w-5 h-5" />
                            Cursos matriculados
                        </h2>
                        <Link to="/student/cursos" className="flex items-center hover:underline">
                            <span className="text-sm text-blue-900 font-bold">Ver todos</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="blue" strokeWidth="3" className="ml-1">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                        {courses.length > 0 ? (
                            courses.slice(0, 3).map((course) =>
                                < CourseCard key={course.id} course={course} />
                            )) : (
                            <div className="col-span-full text-center py-4 text-gray-500">
                                No tienes cursos matriculados
                            </div>
                        )}
                    </div>
                </div>

                {/* Tareas */}
                <div className="bg-white shadow-md rounded-lg sm:col-span-1 row-span-3">
                    <div className="flex items-center justify-between border-b p-4">
                        <h2 className="text-lg font-bold flex items-center">
                            <NotepadText className="inline-block mr-2 w-5 h-5" />
                            Tareas
                        </h2>
                        <Link to="/student/tareas" className="flex items-center hover:underline">
                            <span className="text-sm text-blue-900 font-bold">Ver todos</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="blue" strokeWidth="3" className="ml-1">
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 gap-4 p-4">
                        {tareas.length > 0 ? (
                            tareas.map((task) => (
                                <TaskCard key={task.idTarea} task={task} />
                            ))
                        ) : (
                            <div className="text-center py-8">
                                <p>No tienes tareas asignadas</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Notas */}
                <div className="bg-white shadow-md rounded-lg sm:col-span-1 sm:row-span-2 lg:col-span-1">
                    <div className="flex items-center justify-between border-b p-4">
                        <h2 className="text-[19px] font-bold">
                            <Clock className="inline-block mr-2 w-5 h-5" />
                            Notas
                        </h2>
                        <Link
                            to={`/student/reporte/notas`} className="flex items-center hover:underline cursor-pointer">
                            <p className="text-sm text-blue-900 font-bold">Ver todos</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="blue"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-blue-500"
                            >
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </Link>
                    </div>
                    <div className="p-4">
                        <p className="text-sm text-gray-500 mb-4">Recientemente del parcial</p>
                        <ul className="space-y-8">
                            {notas.length > 0 ? (
                                notas.map((nota, index) => (
                                    <li key={index} className="flex justify-between text-sm text-gray-700">
                                        <span>
                                            {nota.curso.nombre} - {nota.curso.codigo}
                                        </span>
                                        <span className="font-semibold">{nota.nota}</span>
                                    </li>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">No hay notas registradas</p>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Asistencia */}
                <div className="bg-white shadow-md rounded-lg sm:col-span-1 sm:row-span-2 lg:col-span-1">
                    <div className="flex items-center justify-between border-b p-4">
                        <h2 className="text-[19px] font-bold">
                            <Clock className="inline-block mr-2 w-5 h-5" />
                            Asistencia del docente
                        </h2>
                        <Link to={`/student/asistencia`} className="flex items-center hover:underline cursor-pointer">
                            <p className="text-sm text-blue-900 font-bold">Ver todos</p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="blue"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-blue-500"
                            >
                                <path d="m9 18 6-6-6-6" />
                            </svg>
                        </Link>
                    </div>
                    <div className="p-4">
                        <ul className="space-y-6">
                            {asistencias.map((item) => (
                                <li key={item.docente_id} className="flex flex-col space-y-1">
                                    <div className="flex justify-between text-sm text-gray-700">
                                        <span>{item.nombre_docente}</span>
                                        <span className="font-semibold">{item.total_asistencias}</span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-200 rounded-full">
                                        <div
                                            className="h-2 bg-indigo-700 rounded-full"
                                            style={{
                                                width: '100%',
                                                maxWidth: '100%'
                                            }}
                                        />
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Total asistencias registradas
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            {showWelcome && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full border border-gray-100 overflow-hidden">
                        {/* Encabezado mejorado */}
                        <div className="relative">
                            <div className="absolute inset-0 h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                            <div className="p-6 pt-7">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center space-x-4">
                                        <div className="bg-blue-50 p-3 rounded-xl shadow-sm">
                                            <BookOpen className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900">Bienvenido de vuelta</h3>
                                            <p className="text-sm text-blue-600 mt-0.5">¡Te extrañamos!</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setShowWelcome(false)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors p-1 -mt-1 -mr-1"
                                    >
                                        <X className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Contenido mejorado */}
                        <div className="px-6 pb-2">
                            <p className="text-gray-600 text-base leading-relaxed mb-6">
                                Estamos encantados de verte de nuevo. Tu panel está listo con todas las novedades
                                y actualizaciones de tus cursos, tareas y actividades pendientes.
                            </p>
                        </div>

                        {/* Pie de página mejorado */}
                        <div className="px-6 pb-6">
                            <div className="flex justify-end pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => setShowWelcome(false)}
                                    className="px-6 py-3 text-base bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center shadow-sm"
                                >
                                    Continuar
                                    <ArrowRight className="h-4 w-4 ml-2 -mr-1" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}