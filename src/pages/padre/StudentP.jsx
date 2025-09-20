import { Filter, Pencil, Search, Trash2 } from "lucide-react";
import {
    IconButton,
    Avatar,
    Chip,
    Dialog,
    DialogTitle,
    Button,
} from "@mui/material";
import DownloadButton from "@/components/ui/DownloadButton";
import TableSA from "@/components/tables/TableSA";
import { useState } from "react";
import { progress } from "motion-utils";

function StudentP() {
    const [openModal, setOpenModal] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);
    const [openFilterMenu, setOpenFilterMenu] = useState(false);
    const [activeFilter, setActiveFilter] = useState("");
    const [selectedCurso, setSelectedCurso] = useState("");
    const [selectedCiclo, setSelectedCiclo] = useState("");


    const columns = [
        { header: "N°", key: "id" },
        {
            header: "Foto",
            key: "photo",   
            render: (value) => <Avatar src={value} alt="Foto" />,
        },
        { header: "Nombre y apellido", key: "name" },
        { header: "Celular", key: "phone" },
        { header: "Correo", key: "email" },
        { header: "Estado", key: "status" },
        
        { header: "Progreso", key: "progress", render: (value) => (
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-blue-500 h-4 rounded-full"
                style={{ width: `${value}%` }}
              />
            </div>
          )},
        { header: "Última conexión", key: "lastLogin" },
        { header: "Promedio", key: "average" },
        
        /*
        {
            header: "Acción",
            key: "action",
            render: (_, row) => (
                <div className="flex gap-2">
                    <IconButton
                        size="small"
                        onClick={() => console.log(`Editando: ${row.name}`)}
                    >
                        <Pencil />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => handleDeleteClick(row)}
                    >
                        <Trash2 />
                    </IconButton>
                </div>
            ),
        },
        */
    ];

    const estudianteAsignado = {
        id: 1,
        name: "Adrian Lizarbe Canecillas",
        phone: "987456321",
        email: "usuario.registrado@gmail.com",
        status: "activo",
        photo: "/placeholder.svg",
        progress:"69",
        lastLogin:"hace 1 dia",
        average:"17"

    };
    
    const rows = [estudianteAsignado];

/*
    const handleDeleteClick = (student) => {
        setStudentToDelete(student);
        setOpenModal(true);
    };

    const handleConfirmDelete = () => {
        console.log("Eliminando estudiante:", studentToDelete);
        setOpenModal(false);
        setStudentToDelete(null);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setStudentToDelete(null);
    };
*/
    const toggleFilterMenu = () => {
        setOpenFilterMenu((prev) => !prev);
        setActiveFilter("");
    };

    const handleSelectFilter = (filter) => {
        setActiveFilter(filter);
    };

    const handleSelectCurso = (curso) => {
        setSelectedCurso(curso);
        setActiveFilter("");
        setOpenFilterMenu(false);
    };

    const handleSelectCiclo = (ciclo) => {
        setSelectedCiclo(ciclo);
        setActiveFilter("");
        setOpenFilterMenu(false);
    };

    return (


        
        <div className="flex flex-col justify-start items-center min-h-screen text-lg w-full bg-sky-50 p-6">
            <div className="w-full max-w-7xl p-2">
                <div className="flex justify-end items-center text-sm text-gray-500">
                    <span>
                        <a href="#" className="hover:underline">
                            <span className="text-gray-900">
                                Iaion &gt; Menú &gt; Estudiante
                            </span>
                        </a>
                    </span>
                </div>
            </div>

            <div className="w-full max-w-7xl p-2 bg-white">
                <div className="flex justify-between items-center mb-4 mt-5">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleFilterMenu}
                            className="border border-gray-300 w-24 flex justify-center items-center"
                        >
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

                    <div className="flex gap-2">
                        <DownloadButton label="Descargar" />
                        
                    </div>
                </div>

                {openFilterMenu && (
                    <div className="absolute z-10 mt-2 bg-white border border-gray-300 shadow-md rounded-md w-48">
                        {!activeFilter ? (
                            <ul className="p-2">
                                <li
                                    onClick={() => handleSelectFilter("Curso")}
                                    className="cursor-pointer hover:bg-gray-100 p-2"
                                >
                                    Curso
                                </li>
                                <li
                                    onClick={() => handleSelectFilter("Ciclo")}
                                    className="cursor-pointer hover:bg-gray-100 p-2"
                                >
                                    Ciclo
                                </li>
                            </ul>
                        ) : activeFilter === "Curso" ? (
                            <ul className="p-2">
                                {["Curso 1", "Curso 2", "Curso 3"].map((curso) => (
                                    <li
                                        key={curso}
                                        onClick={() => handleSelectCurso(curso)}
                                        className="cursor-pointer hover:bg-gray-100 p-2"
                                    >
                                        {curso}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <ul className="p-2">
                                {["ciclo actual","ciclo 1", "ciclo 2", "ciclo3"].map((ciclo) => (
                                    <li
                                        key={ciclo}
                                        onClick={() => handleSelectCiclo(ciclo)}
                                        className="cursor-pointer hover:bg-gray-100 p-2"
                                    >
                                        {ciclo}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                <div className="flex gap-2 mb-4">
                    {selectedCurso && (
                        <Chip
                            label={`Curso: ${selectedCurso}`}
                            onDelete={() => setSelectedCurso("")}
                        />
                    )}
                    {selectedCiclo && (
                        <Chip
                            label={`Ciclo: ${selectedCiclo}`}
                            onDelete={() => setSelectedCiclo("")}
                        />
                    )}
                    

                </div>
            </div>
            
            {/* 
            <Dialog open={openModal} onClose={handleCloseModal} maxWidth="xs" fullWidth>
                <div className="flex flex-col gap-2 p-6 justify-center items-center">
                    <DialogTitle>¿Estás seguro de eliminar?</DialogTitle>
                    <div className="flex justify-center gap-6 p-2">
                        <Button onClick={handleConfirmDelete} variant="contained">
                            Sí
                        </Button>
                        <Button onClick={handleCloseModal} variant="outlined">
                            No
                        </Button>
                    </div>
                </div>
            </Dialog>
            */}

            <TableSA columns={columns} rows={rows} />


            <div className="w-full max-w-4xl mt-6">
                <h2 className="text-xl font-semibold mb-2">Actividades recientes</h2>
                <ul className="list-disc pl-6 text-gray-700">
                    <li>Completó la tarea de matemáticas - 08/04/2025</li>
                    <li>Conectado al sistema - 07/04/2025</li>
                    <li>Obtuvo 18/20 en evaluación de ciencias - 05/04/2025</li>
                </ul>
            </div>

        </div>
        
    );
}

export default StudentP;
