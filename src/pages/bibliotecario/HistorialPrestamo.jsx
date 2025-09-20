import { Box, Filter, Pencil, PlusIcon, Search, Trash2 } from "lucide-react";
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

function HistorialPrestamo() {
    const [openModal, setOpenModal] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);
    const [openFilterMenu, setOpenFilterMenu] = useState(false);
    const [activeFilter, setActiveFilter] = useState("");
    const [selectedCiclo, setSelectedCiclo] = useState("");
    const [selectedEstado, setSelectedEstado] = useState("");
    const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

    const [isAddModalOpen, setAddModalOpen] = useState(false);
    

    const columns = [
        { header: "N°", key: "id" },
        { header: "DNI", key: "dni" },
        {
            header: "Foto",
            key: "photo",
            render: (value) => <Avatar src={value} alt="Foto" />,
        },
        { header: "Nombre y apellido", key: "name" },
        { header: "Codigo libro", key: "code" },
        { header: "Titulo", key: "titulo" },
        { header: "F. registro", key: "fregistro" },
        { header: "F. devolucion", key: "fdevolucion" },
        { header: "Entrega", key: "entrega" },
    ];

    const rows = [
        {
            id: 1,
            dni: 12345678,
            name: "Adrian Lizarbe Canecillas",
            code: "993850868",
            titulo: "jeancarlo",
            fregistro: "12/12/2021",
            fdevolucion: "12/12/2021",
            entrega: (
                <span className="text-green-700 bg-green-100 px-2 py-1 rounded">
                    A tiempo
                </span>
            ),
        },
        {
            id: 1,
            dni: 12345678,
            name: "Jean Torres",
            code: "993850868",
            titulo: "psicologia oscura",
            fregistro: "12/12/2021",
            fdevolucion: "12/12/2021",
            entrega: (
                <span className="text-red-700 bg-red-100 px-2 py-1 rounded">
                    Tardia
                </span>
            ),
        },
        
    ];

    /* Agregar */
    const handleAddSede = (newSede) => {
        console.log("Nueva sede agregada:", newSede);
    };

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

    const toggleFilterMenu = () => {
        setOpenFilterMenu((prev) => !prev);
        setActiveFilter("");
    };

    const handleSelectFilter = (filter) => {
        setActiveFilter(filter);
    };

    const handleSelectCiclo = (ciclo) => {
        setSelectedCiclo(ciclo);
        setActiveFilter("");
        setOpenFilterMenu(false);
    };

    const handleSelectEstado = (estado) => {
        setSelectedEstado(estado);
        setActiveFilter("");
        setOpenFilterMenu(false);
    };

    // Filtrar filas en función del término de búsqueda
    const filteredRows = rows.filter((row) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            row.name.toLowerCase().includes(searchLower) ||
            row.phone.includes(searchLower) ||
            row.titulo.toLowerCase().includes(searchLower) ||
            row.fecha.toLowerCase().includes(searchLower)
        );
    });

    return (
        <>        
        <div className="flex flex-col justify-start items-center min-h-screen text-lg w-full bg-sky-50 p-6">
            <div className="w-full max-w-7xl p-2">
                <div className="flex justify-end items-center text-sm text-gray-500">
                    <span>
                        <a href="#" className="hover:underline">
                            <span className="text-gray-900">
                                Iaion &gt; Menú &gt; Operaciones &gt; Reserva Docente
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
                                    placeholder="Buscar..."
                                    value={searchTerm} // Controlado por el estado
                                    onChange={(e) => setSearchTerm(e.target.value)} // Actualiza el término de búsqueda
                                    className="border rounded-md pl-10 pr-3 py-1 text-sm outline-none w-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Agregar estudiante */}

                    
                </div>

                {openFilterMenu && (
                    <div className="absolute z-10 mt-2 bg-white border border-gray-300 shadow-md rounded-md w-48">
                        {!activeFilter ? (
                            <ul className="p-2">
                                <li
                                    onClick={() => handleSelectFilter("Ciclo")}
                                    className="cursor-pointer hover:bg-gray-100 p-2"
                                >
                                    Ciclo
                                </li>
                                <li
                                    onClick={() => handleSelectFilter("Estado")}
                                    className="cursor-pointer hover:bg-gray-100 p-2"
                                >
                                    Estado
                                </li>
                            </ul>
                        ) : activeFilter === "Ciclo" ? (
                            <ul className="p-2">
                                {["Ciclo 1", "Ciclo 2", "Ciclo 3"].map((ciclo) => (
                                    <li
                                        key={ciclo}
                                        onClick={() => handleSelectCiclo(ciclo)}
                                        className="cursor-pointer hover:bg-gray-100 p-2"
                                    >
                                        {ciclo}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <ul className="p-2">
                                {["Cancelado", "Deuda"].map((estado) => (
                                    <li
                                        key={estado}
                                        onClick={() => handleSelectEstado(estado)}
                                        className="cursor-pointer hover:bg-gray-100 p-2"
                                    >
                                        {estado}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}

                <div className="flex gap-2 mb-4">
                    {selectedCiclo && (
                        <Chip
                            label={`Ciclo: ${selectedCiclo}`}
                            onDelete={() => setSelectedCiclo("")}
                        />
                    )}
                    {selectedEstado && (
                        <Chip
                            label={`Estado: ${selectedEstado}`}
                            onDelete={() => setSelectedEstado("")}
                        />
                    )}
                </div>
            </div>

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

            {/* Pasar las filas filtradas a la tabla */}
            <TableSA columns={columns} rows={filteredRows} />
        </div>
        </>
    );
}

export default HistorialPrestamo;
