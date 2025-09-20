import {Filter, Pencil, PlusIcon, Search, Trash2} from "lucide-react";
import {IconButton, Avatar, Chip, Button} from "@mui/material";
import { Link } from "react-router-dom";
import DownloadButton from "@/components/ui/DownloadButton";
import TableSA from "@/components/tables/TableSA";


function AttendanceStudentA() {
    const columns = [
        { header: "N°", key: "id" },
        { header: "Dni", key: "dni" },
        { header: "Apellidos", key: "apellido" },
        { header: "Nombre", key: "nombre" },
        { header: "Curso", key: "curso" },
        { header: "estado", key: "estado" },
    ];
    const rows = [
        {
            id: 1,
            dni: "60209937",
            nombre: "Juan Perez",
            apellido: "Stark Joel",
            curso: "Desarrollo de Software",
            estado: <button className="bg-green-200 rounded-sm p-2 w-16 h-8 text-green-700 hover:bg-green-300">Asistio</button>,
        },
        {
            id: 2,
            dni: "60209937",
            nombre: "Juan Perez",
            apellido: "Stark Joel",
            curso: "Desarrollo de Software",
            estado: <button className="bg-green-200 rounded-sm p-2 w-16 h-8 text-green-700 hover:bg-green-300">Asistio</button>,
        },
        {
            id: 3,
            dni: "60209937",
            nombre: "Juan Perez",
            apellido: "Stark Joel",
            curso: "Desarrollo de Software",
            estado: <button className="bg-red-200 rounded-sm p-2 w-16 h-8 text-red-700 hover:bg-red-300">Falto</button>,
        },
        {
            id: 4,
            dni: "60209937",
            nombre: "Juan Perez",
            apellido: "Stark Joel",
            curso: "Desarrollo de Software",
            estado: <button className="bg-green-200 rounded-sm p-2 w-16 h-8 text-green-700 hover:bg-green-300">Asistio</button>,
        },
        {
            id: 5,
            dni: "60209937",
            nombre: "Juan Perez",
            apellido: "Stark Joel",
            curso: "Desarrollo de Software",
            estado: <button className="bg-green-200 rounded-sm p-2 w-16 h-8 text-green-700 hover:bg-green-300">Asistio</button>,
        },
        
        
        
    ];

    return (
        <div className="flex flex-col justify-start items-center min-h-screen text-lg w-full bg-sky-50 p-6">
            <div className="w-full max-w-7xl p-2">
                <div className="flex justify-end items-center text-sm text-gray-500">
                    <span>
                        <a href="#" className="hover:underline">
                            <span className="text-gray-900">Iaion &gt; Menú &gt; Academico &gt; Estudiante</span>
                        </a>
                    </span>
                </div>
            </div>
            <div className="w-full max-w-7xl p-2 bg-white">
                
                <div className="flex justify-between items-center mb-4 mt-5">
                    <div className="flex items-center gap-2">
                        <div className="flex">
                            <button className="border border-gray-300 w-24 flex justify-center items-center">
                                <Filter className="h-4 w-4" />
                                Filtrar
                            </button>
                            <div className="border-y border-r border-gray-300 w-full sm:w-96 max-w-full">
                                <div className="relative w-full sm:w-auto">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                    <input
                                        type="text"
                                        placeholder="e.g. 100 - 2000"
                                        className="border rounded-md pl-10 pr-3 py-1 text-sm outline-none w-full"
                                    />
                                </div>
                            </div>
                        </div>    
                    </div>
                    <div className="flex gap-2">
                        <DownloadButton label="Descargar" />
                        <Link to="/superadmin/estudiante/agregar">
                            <button variant="contained" color="success" className="text-white flex w-28 h-9 bg-[#5CB85C] items-center justify-center gap-1">
                                <PlusIcon />
                                Agregar
                            </button>
                        </Link>
                    </div>
                </div>
                {/* Active Filters */}
                <div className="flex gap-2 mb-4">
                    <div className="flex items-center gap-1">
                        <span className="text-sm text-gray-500">Filtrado: 2</span>
                        <Button variant="text" size="small">
                            Borrar todo
                        </Button>
                    </div>
                    <Chip label="Ciclo: Ciclo 1" onDelete={() => {}} size="small" />
                    <Chip
                        label="Cursos: UX/UI Design, Full Stack"
                        onDelete={() => {}}
                        size="small"
                    />
                </div>
            </div>
            
            <TableSA columns={columns} rows={rows} />
        </div>
    );
}

export default AttendanceStudentA;
