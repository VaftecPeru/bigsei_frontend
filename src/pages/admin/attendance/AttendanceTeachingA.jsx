import {Filter, Pencil, PlusIcon, Search, Trash2} from "lucide-react";
import {IconButton, Avatar, Chip, Button} from "@mui/material";
import { Link } from "react-router-dom";
import DownloadButton from "@/components/ui/DownloadButton";
import TableSA from "@/components/tables/TableSA";


function AttendanceTeachingA() {
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
            nombre: "Joel Jaime",
            apellido: "Peres",
            curso: "Desarrollo de Software",
            estado: <Button className="bg-red-200 text-red-700 hover:bg-red-300">Falto</Button>,
        },
        {
            id: 2,
            dni: "60209937",
            nombre: "Joel Jaime",
            apellido: "Peres",
            curso: "Desarrollo de Software",
            estado: <Button className="bg-green-200 text-green-700 hover:bg-green-300">Asistio</Button>,
        },
        {
            id: 3,
            dni: "60209937",
            nombre: "Joel Jaime",
            apellido: "Peres",
            curso: "Desarrollo de Software",
            estado: <Button className="bg-green-200 text-green-700 hover:bg-green-300">Asistio</Button>,
        },
        {
            id: 4,
            dni: "60209937",
            nombre: "Joel Jaime",
            apellido: "Peres",
            curso: "Desarrollo de Software",
            estado: <Button className="bg-green-200 text-green-700 hover:bg-green-300">Asistio</Button>,
        },
        {
            id: 5,
            dni: "60209937",
            nombre: "Joel Jaime",
            apellido: "Peres",
            curso: "Desarrollo de Software",
            estado: <Button className="bg-green-200 text-green-700 hover:bg-green-300">Asistio</Button>,
        },
        
        
        
    ];

    return (
        <div className="flex flex-col justify-start items-center min-h-screen text-lg w-full bg-sky-50 p-6">
            <div className="w-full max-w-7xl p-2">
                <div className="flex justify-end items-center text-sm text-gray-500 top-0">
                    <span>
                        <a href="#" className="hover:underline">
                            <span className="text-gray-900">Iaion &gt; Menú &gt; Asistencia &gt; Docente</span>
                        </a>
                    </span>
                </div>
                <div className="flex justify-between items-center mb-4 mt-5">
                    <div className="flex items-center gap-2">
                        <Button variant="outlined" className="gap-2">
                            <Filter className="h-4 w-4" />
                            Filtrar
                        </Button>
                        <div className="relative w-full sm:w-auto">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Buscar"
                                className="border rounded-md pl-10 pr-3 py-1 text-sm bg-gray-100 focus:ring focus:outline-none w-full sm:w-auto"
                            />
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

export default AttendanceTeachingA;
