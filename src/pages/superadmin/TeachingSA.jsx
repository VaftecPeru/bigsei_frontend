import { Filter, Pencil, PlusIcon, Search, Trash2 } from "lucide-react";
import { useEffect } from "react";
import {
    IconButton,
    Avatar,
    Chip,
    Dialog,
    DialogTitle,
    Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import DownloadButton from "@/components/ui/DownloadButton";
import TableSA from "@/components/tables/TableSA";
import { useState } from "react";
import AddTeachingModal from "./modal/AddTeachingModal";
import { Api_Global_SuperAdministrador } from "../../services/SuperAdministradorApi";
import apiClient from "../../Utils/apiClient";

function TeachingSA() {
    const [openModal, setOpenModal] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);
    const [openFilterMenu, setOpenFilterMenu] = useState(false);
    const [activeFilter, setActiveFilter] = useState("");
    const [selectedCiclo, setSelectedCiclo] = useState("");
    const [selectedEstado, setSelectedEstado] = useState("");
    const [searchQuery, setSearchQuery] = useState(""); // Estado para el texto de búsqueda

    const [docentes, setDocentes] = useState([]);
    const [docenteToEdit, setDocenteToEdit] = useState({
        id_docente: "",
        nombre_completo: "",
        fecha_nacimiento: "2000-01-01",
        telefono: "",
        correo: "",
        direccion: "",
        sexo: "1",
        estado: "1",
        id_tipoespecializacion: "",
        anhos_de_experiencia: "",
        id_tiponiveleducativo: "",
    });

    /* agregar modal docente */
    const [isAddModalOpen, setAddModalOpen] = useState(false);

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
        {
            header: "Acción",
            key: "action",
            render: (value, row) => (
                <div className="flex gap-2">
                    <IconButton
                        size="small"
                        onClick={() => handleEdit(row)}
                    >
                        <Pencil />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDeleteClick(row)}>
                        <Trash2 />
                    </IconButton>
                </div>
            ),
        },
    ];

    /* Agregar modal docente */
    const handleAddSede = (newSede) => {
        console.log("Nueva sede agregada:", newSede);
    };

    const handleDeleteClick = (docente) => {
        setStudentToDelete(docente);
        setOpenModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await apiClient.delete(Api_Global_SuperAdministrador.docentes.eliminar(studentToDelete.id));
        
            if (response.status === 200) {
                // closeRegisterModal();
            } else {
            }
        } catch (error) {
        } finally {
        }

        setOpenModal(false);
        setStudentToDelete(null);
        listarDocentes("");
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const toggleFilterMenu = () => {
        setOpenFilterMenu(!openFilterMenu);
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

    const handleEdit = (docente) => {
        buscarDocente(docente.id);
    };

    const buscarDocente = async (id_docente) => {
        try {
            const response = await apiClient.get(Api_Global_SuperAdministrador.docentes.mostrar(id_docente));
            setDocenteToEdit({
                id_docente: response.data.id_docente,
                nombre_completo: response.data.nombre_completo,
                fecha_nacimiento: response.data.fecha_nacimiento_date,
                telefono: response.data.telefono,
                correo: response.data.correo,
                direccion: response.data.direccion,
                sexo: response.data.sexo,
                estado: response.data.estado,
                id_tipoespecializacion: response.data.id_tipoespecializacion,
                anhos_de_experiencia: response.data.anhos_de_experiencia,
                id_tiponiveleducativo:response.data.id_tiponiveleducativo,
            });

            setAddModalOpen(true);
        } catch (error) {
        } finally {
        }
    };

    // Filtrar filas en función del término de búsqueda
    const listarDocentes = async (text_search = "") => {
        try {
            const response = await apiClient.get(Api_Global_SuperAdministrador.docentes.listar(text_search));
            const data = response.data.map((item) => ({
                id: item.id_docente,
                name: item.nombre_completo,
                phone: item.telefono,
                email: item.correo,
                status: item.estado_descripcion,
                photo: "/placeholder.svg",
            }));
            setDocentes(data);
        } catch (error) {
        } finally {
        }
    };

    useEffect(() => {
        listarDocentes("");
    }, []);

    return (
        <>
            <AddTeachingModal
                isOpen={isAddModalOpen}
                onClose={() => {
                    setAddModalOpen(false);
                    listarDocentes("");
                    setDocenteToEdit({
                        id_docente: "",
                        nombre_completo: "",
                        fecha_nacimiento: "2000-01-01",
                        telefono: "",
                        correo: "",
                        direccion: "",
                        sexo: "1",
                        estado: "1",
                        id_tipoespecializacion: "",
                        anhos_de_experiencia: "",
                        id_tiponiveleducativo: "",
                    });
                }}
                docente={docenteToEdit}
                onSave={handleAddSede}
            />

        
            <div className="flex flex-col justify-start items-center min-h-screen text-lg w-full bg-sky-50 p-6">
                <div className="w-full max-w-7xl p-2">
                    <div className="flex justify-end items-center text-sm text-gray-500">
                        <span>
                            <a href="#" className="hover:underline">
                                <span className="text-gray-900">Iaion &gt; Menú &gt; Docente</span>
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
                                        value={searchQuery} // Asociar el estado al input
                                        onChange={(e) => setSearchQuery(e.target.value)} // Actualizar el estado
                                        className="border rounded-md pl-10 pr-3 py-1 text-sm outline-none w-full"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <DownloadButton label="Descargar" />

                            <button
                                onClick={() => setAddModalOpen(true)}
                                className="text-white flex w-28 h-9 bg-green-800 hover:bg-green-700 items-center justify-center gap-1"
                            >
                                <PlusIcon className="mr-2 h-4 w-4" />
                                Agregar
                            </button>
                        </div>
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
                                Si
                            </Button>
                            <Button onClick={handleCloseModal} variant="outlined">
                                No
                            </Button>
                        </div>
                    </div>
                </Dialog>

                <TableSA columns={columns} rows={docentes} /> {/* Filas filtradas */}
            </div>
        </>
    );
}

export default TeachingSA;
