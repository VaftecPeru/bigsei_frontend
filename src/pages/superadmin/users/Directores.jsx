import { ChevronLeftIcon, Filter, Pencil, PlusIcon, Search, Trash2 } from "lucide-react";
import { IconButton, Avatar, Chip, Dialog, DialogTitle, Button, TextField, DialogContent } from "@mui/material";
import { Link } from "react-router-dom";
import DownloadButton from "@/components/ui/DownloadButton";
import TableSA from "@/components/tables/TableSA";
import { useState } from "react";

function Directores() {
    const [openModal, setOpenModal] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [studentToEdit, setStudentToEdit] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [searchText, setSearchText] = useState(""); // Estado para manejar el texto del buscador

    const columns = [
        { header: "N°", key: "id" },
        { header: "Dni", key: "dni" },
        { header: "Apellidos", key: "apellidos" },
        { header: "Nombres", key: "nombres" },
        { header: "Estado", key: "estado" },
        {
            header: "Acción",
            key: "action",
            render: (value, row) => (
                <div className="flex gap-2">
                    <IconButton size="small" onClick={() => handleEditClick(row)}>
                        <Pencil />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDeleteClick(row)}>
                        <Trash2 />
                    </IconButton>
                </div>
            ),
        },
    ];

    const rows = [
        {
            id: 1,
            dni: "12345678",
            apellidos: "Doe",
            nombres: "John",
            estado: (
                <button className="bg-green-200 rounded-sm p-2 w-16 h-8 text-green-700 hover:bg-green-300">
                    Asistio
                </button>
            ),
        },
        {
            id: 2,
            dni: "87654321",
            apellidos: "Smith",
            nombres: "Jane",
            estado: (
                <button className="bg-red-200 rounded-sm p-2 w-16 h-8 text-red-700 hover:bg-red-300">
                    Faltó
                </button>
            ),
        },
    ];

    // Filtrar las filas según el texto del buscador
    const filteredRows = rows.filter((row) =>
        Object.values(row).some((value) =>
            String(value).toLowerCase().includes(searchText.toLowerCase())
        )
    );

    const handleDeleteClick = (student) => {
        setStudentToDelete(student);
        setOpenModal(true);
    };

    const handleConfirmDelete = () => {
        console.log("Eliminando estudiante", studentToDelete);
        setOpenModal(false);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleAddClick = () => {
        setIsEditing(false);
        setStudentToEdit(null);
        setOpenModalAdd(true);
    };

    const handleEditClick = (periodo) => {
        setIsEditing(true);
        setStudentToEdit(periodo);
        setOpenModalAdd(true);
    };

    const handleConfirmAddOrEdit = () => {
        if (isEditing) {
            console.log("Editando periodo", studentToEdit);
        } else {
            console.log("Agregando nuevo periodo");
        }
        setOpenModalAdd(false);
    };

    const handleCloseModalAdd = () => {
        setOpenModalAdd(false);
    };

    return (
        <div className="flex flex-col justify-start items-center min-h-screen text-lg w-full bg-sky-50 p-6">
            <div className="w-full max-w-7xl p-2">
                <div className="flex justify-start items-center text-sm text-gray-500">
                    <Link to="/superadministrador/usuarios">
                        <button
                            variant="contained"
                            className="text-white flex w-28 h-9 items-center justify-center gap-1"
                        >
                            <ChevronLeftIcon color="black" />
                        </button>
                    </Link>
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
                                        placeholder="Buscar..."
                                        className="border rounded-md pl-10 pr-3 py-1 text-sm outline-none w-full"
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)} // Actualizar el texto del buscador
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <DownloadButton label="Descargar" />
                        <div>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleAddClick}
                                className="text-white flex w-28 h-9 bg-[#5CB85C] items-center justify-center gap-1"
                            >
                                <PlusIcon />
                                Agregar
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal para agregar o editar */}
            <Dialog open={openModalAdd} onClose={handleCloseModalAdd} maxWidth="xs" fullWidth className="backdrop-blur-md">
                <div className="text-2xl p-2 font-bold text-center mt-4">
                    <p>{isEditing ? "Editar Director" : "Registrar Director"}</p>
                </div>
                <div>
                    <div className="p-7">
                        <form className="p-2 flex flex-col gap-10">
                            <DialogContent>
                                <TextField autoFocus margin="dense" label="DNI" name="dni" fullWidth />
                                <TextField margin="dense" label="Apellidos" name="apellido" fullWidth />
                                <TextField margin="dense" label="Nombre" name="nombre" fullWidth />
                                <TextField margin="dense" label="Curso" name="curso" fullWidth />
                            </DialogContent>
                        </form>
                    </div>
                </div>
                <div className="flex flex-col gap-2 p-6 justify-center items-center">
                    <div className="flex justify-center gap-6 p-2">
                        <Button onClick={handleCloseModalAdd} variant="outlined">
                            Cancelar
                        </Button>
                        <Button onClick={handleConfirmAddOrEdit} variant="contained">
                            {isEditing ? "Guardar cambios" : "Agregar"}
                        </Button>
                    </div>
                </div>
            </Dialog>

            {/* Modal para eliminar */}
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

            <TableSA columns={columns} rows={filteredRows} /> {/* Usar las filas filtradas */}
        </div>
    );
}

export default Directores;
