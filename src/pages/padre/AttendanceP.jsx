import AttendanceChart from "@/components/dashboard/AttendaceChart";
import CourseCard from "@/components/dashboard/CourseCard";
import CurrentClass from "@/components/dashboard/CurrentClass";
import { PieChartDonutText } from "@/components/dashboard/PieChartDonutText";
import TaskCard from "@/components/dashboard/TaskCard";
import AssistanceCourse from "@/components/tables/AssistanceCourse";
import EventCalendar from "@/components/widgets/EventCalendar";
import { ArrowRight, BookOpen, Clock, NotepadText } from "lucide-react";

export default function AttendaceP() {
    
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

            


            <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 p-4">
                
                <div className="bg-white shadow-md rounded-lg sm:col-span-2 lg:col-span-2">
                    <div className="flex items-center justify-between border-b p-4">
                        <div className='flex gap-x-2'>
                            <img src="/img/icons/clock-check.svg" alt="" />
                            <h2 className="text-base font-semibold">
                                Asistencia
                            </h2>
                        </div>
                        
                    </div>
                    <div className="">
                        <AttendanceChart data={data}/>
                    </div>
                </div>

                {/* Tareas */}
                <div className="bg-white shadow-md rounded-lg sm:col-span-1 lg:col-span-1 sm:row-span-3 lg:row-span-3">
                    <div className="bg-white shadow-md rounded-lg sm:col-span-1 sm:row-span-2 lg:col-span-1">
                        <div className="flex items-center justify-between border-b p-4">
                            <h2 className="text-base font-semibold">
                                <Clock className="inline-block mr-1 w-5 h-5" />
                                Asistencia
                            </h2>
                            <p className="text-sm text-blue-500 hover:underline cursor-pointer">Ver todo</p>
                        </div>
                        <div className="p-4">
                            <ul className="space-y-4">
                                {[
                                    { title: "Graphic Fundamentals - ART101", attendance: 80 },
                                    { title: "Advanced Web Design - ITD201", attendance: 87.7 },
                                    { title: "Advanced Web Design - ITD201", attendance: 30 },
                                    { title: "Data Base", attendance: 10 },
                                    { title: "Microservices", attendance: 50 },
                                    { title: "Architecture", attendance: 15 },
                                ].map((course, index) => (
                                    <li key={index} className="flex flex-col space-y-2 gap-5">
                                        <div className="flex justify-between text-sm text-gray-700">
                                            <span>{course.title}</span>
                                            <span className="font-semibold">{course.attendance}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-200 rounded-full">
                                            <div 
                                                className="h-2 bg-indigo-700 rounded-full"
                                                style={{ width: `${course.attendance}%` }}
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                    </div>
                    <div className="flex justify-center my-5">
                        
                        <div className="flex flex-col items-center w-64">
                            <div className="bg-gray-200 p-5">
                                <div className="flex justify-between">
                                    <img src="../../img/escritorio.svg" alt="" />
                                    <img src="../../img/planta.svg" alt="" />
                                </div>
                                <p className="font-semibold text-lg">¡Recuerda!</p>
                                <p className="text-gray-500 text-sm">La asistencia cubre un porcentaje de tu nota final</p>
                                <button className="bg-black text-white rounded-lg p-1 px-14 text-sm mt-4">No Faltes</button>
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className="bg-white shadow-md rounded-lg sm:col-span-2 lg:col-span-2">
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