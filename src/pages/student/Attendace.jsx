import AttendanceChart from "@/components/dashboard/AttendaceChart";
import CourseCard from "@/components/dashboard/CourseCard";
import CurrentClass from "@/components/dashboard/CurrentClass";
import { PieChartDonutText } from "@/components/dashboard/PieChartDonutText";
import TaskCard from "@/components/dashboard/TaskCard";
import AssistanceCourse from "@/components/tables/AssistanceCourse";
import EventCalendar from "@/components/widgets/EventCalendar";
import { ArrowRight, BookOpen, Clock, NotepadText } from "lucide-react";

export default function Attendace() {

    const data = [
        { name: "Asistencia", value: 66, total: 100, color: "#4caf50" },
        { name: "Justificado", value: 25, total: 100, color: "#ff9800" },
        { name: "Inasistencia", value: 9, total: 100, color: "#f44336" }
    ];

    const columns = [
        { header: "Fecha", accessor: "fecha" },
        { header: "Asignatura", accessor: "asignatura" },
        { header: "Docente", accessor: "docente" },
        { header: "Estado", accessor: "estado" },
    ];

    const records = [
        { id: 1, fecha: "2024-12-01", asignatura: "Matemáticas", docente: "Dr. Pérez", estado: "Asistió" },
        { id: 2, fecha: "2024-12-02", asignatura: "Historia", docente: "Prof. López", estado: "Inasistió" },
        { id: 3, fecha: "2024-12-03", asignatura: "Física", docente: "Ing. García", estado: "Justificado" },
        { id: 4, fecha: "2024-12-04", asignatura: "Matemáticas", docente: "Prof. González", estado: "Asistió" },
        { id: 5, fecha: "2024-12-05", asignatura: "Matemáticas", docente: "Lic. Rodríguez", estado: "Inasistió" },
        { id: 6, fecha: "2024-12-06", asignatura: "Historia", docente: "Prof. López", estado: "Justificado" },
        { id: 15, fecha: "2024-12-15", asignatura: "Matemáticas", docente: "Lic. Rodríguez", estado: "Justificado" }
    ];


    const filters = [
        { value: "Matemáticas", label: "Matemáticas" },
        { value: "Historia", label: "Historia" },
        { value: "Física", label: "fisica" },
    ];

    return (
        <div className={`flex flex-col justify-start items-center min-h-screen text-2xl w-full bg-sky-50 p-6 `}>{/* //* space-y-6 */}
            {/* Encabezado */}
            <div className="w-full max-w-7xl p-4">

                <div className="flex justify-between items-center text-sm text-gray-500">
                    <span></span>
                    <span>
                        <a href="#" className="hover:underline">Iaion &gt; Menú &gt; Inicio</a>
                    </span>
                </div>
            </div>




            <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-3 grid-rows-[350px_1fr] gap-4 md:gap-6 p-4">

                <div className="bg-white shadow-md rounded-lg col-span-2 h-[350px] flex flex-col">
                    <div className="flex items-center justify-between border-b border-gray-200 p-4">
                        <div className='flex items-center gap-x-2'>
                            <img src="/img/icons/clock-check.svg" alt="Ícono asistencia" className="w-5 h-5" />
                            <h2 className="text-base font-semibold text-gray-800">
                                Asistencia
                            </h2>
                        </div>
                    </div>
                    <div className="flex-1 min-h-0 relative">  {/* Contenedor flexible con restricción */}
                        <AttendanceChart data={data} />
                    </div>
                </div>

                {/* Tareas */}
                <div className="bg-white shadow-lg rounded-xl overflow-hidden row-span-2 h-[890px] ">
                    {/* Encabezado */}
                    <div className="flex items-center justify-between p-5 border-b border-gray-100">
                        <div className="flex items-center">
                            <span className="mr-2 text-indigo-600 font-bold">🕒</span> {/* Emoji de reloj */}
                            <h2 className="text-lg font-semibold text-gray-800">Registro de Asistencia</h2>
                        </div>
                        <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                            Ver histórico →
                        </button>
                    </div>

                    {/* Lista de cursos */}
                    <div className="p-5 my-10">
                        <ul className="space-y-20">
                            {[
                                { title: "Graphic Fundamentals - ART101", attendance: 80 },
                                { title: "Advanced Web Design - ITD201", attendance: 87.7 },
                                { title: "Database Systems", attendance: 30 },
                                { title: "Microservices Architecture", attendance: 50 },
                                { title: "Software Architecture", attendance: 15 },
                            ].map((course, index) => (
                                <li key={index}>
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-sm font-medium text-gray-700 truncate max-w-[180px]">
                                            {course.title}
                                        </span>
                                        <span className={`text-sm font-semibold ${course.attendance >= 70 ? 'text-green-600' :
                                            course.attendance >= 40 ? 'text-yellow-600' : 'text-red-600'
                                            }`}>
                                            {course.attendance}%
                                        </span>
                                    </div>
                                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${course.attendance >= 70 ? 'bg-green-500' :
                                                course.attendance >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                                                }`}
                                            style={{ width: `${course.attendance}%` }}
                                        />
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tarjeta de recordatorio */}
                    <div className="bg-gray-50 mx-5 mb-5 p-5 rounded-lg border border-gray-200 my-10">
                        <div className="mb-3">
                            <div className="flex items-center mb-2">
                                <span className="mr-2 text-indigo-600 font-bold">📢</span> {/* Emoji de megáfono */}
                                <h3 className="font-semibold text-gray-800">Atención importante</h3>
                            </div>
                            <p className="text-gray-600 text-sm pl-7">
                                La asistencia representa el 20% de tu calificación final. Mantén un buen porcentaje para no afectar tu nota.
                            </p>
                        </div>
                        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">
                            NO FALTES
                        </button>
                    </div>
                </div>


                <div className="bg-white shadow-md rounded-lg col-span-2">
                    <AssistanceCourse
                        records={records}
                        columns={columns}

                        filters={filters}
                    />

                </div>
            </div>
        </div>
    )
}