import { Filter, Pencil, PlusIcon, Search, Trash2 } from "lucide-react";
import { IconButton, Avatar, Chip, Dialog, DialogTitle, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import DownloadButton from "@/components/ui/DownloadButton";
import TableSA from "@/components/tables/TableSA";
import { useState } from 'react';
import { useEffect } from "react";
import { Api_Global_SuperAdministrador } from "../../../services/SuperAdministradorApi";
import apiClient from "../../../Utils/apiClient";

function AcademicPeriod() {
    const [openModal, setOpenModal] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);
    const [periodos, setPeriodos] = useState([]);
    // Estado para controlar el modal de agregar o editar
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [studentToEdit, setStudentToEdit] = useState({
        name: '',
        f_inicio: '',
        f_fin: '',
    }); // Para cargar los datos cuando se edita
    const [isEditing, setIsEditing] = useState(false); // Determina si estamos editando o agregando un periodo
    const [searchQuery, setSearchQuery] = useState("");

    const columns = [
        { header: "N°", key: "id" },
        { header: "Nombre del periodo", key: "name" },
        { header: "Fecha de inicio", key: "f_inicio" },
        { header: "Fecha de fin", key: "f_fin" },
        {
            header: "Acción",
            key: "action",
            render: (value, row) => (
                <div className="flex gap-2">
                    <IconButton
                        size="small"
                        onClick={() => handleEditClick(row)} // Llamar a la función para editar
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

    // Función para abrir el modal de eliminación
    const handleDeleteClick = (student) => {
        setStudentToDelete(student);
        setOpenModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await apiClient.delete(Api_Global_SuperAdministrador.academicoPeriodos.eliminar(studentToDelete.id));

            if (response.status === 200) {
                listarPeriodos("");
            } else {
            }
        } catch (error) {
        } finally {
        }
        setOpenModal(false);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    // Función para abrir el modal de agregar o editar periodo
    const handleAddClick = () => {
        setIsEditing(false); 
        setStudentToEdit({
            name: '',
            f_inicio: '',
            f_fin: '',
        }); 
        setOpenModalAdd(true);
    };

    // Función para abrir el modal de editar periodo
    const handleEditClick = (periodo) => {
        setIsEditing(true); 
        setStudentToEdit(periodo); 
        setOpenModalAdd(true);
    };

    const handleConfirmAddOrEdit = () => {
        guardarPeriodo();
    };

    // REGISTRAR Y EDITAR
    const guardarPeriodo = async () => {
        const data = {
            nombre: studentToEdit.name,
            fecha_ini: studentToEdit.f_inicio,
            fecha_fin: studentToEdit.f_fin,
        };

        try {
          let response = null;
          if (isEditing) {
            response = await apiClient.put(Api_Global_SuperAdministrador.academicoPeriodos.editar(studentToEdit.id), data);
          } else {
            response = await apiClient.post(Api_Global_SuperAdministrador.academicoPeriodos.registrar(), data);
          }

          if (response.status === 200) {
            setOpenModalAdd(false);
            listarPeriodos("");
          } else {
          }
        } catch (error) {
        } finally {
        }
    };

    const handleCloseModalAdd = () => {
        setOpenModalAdd(false);
    };

    // Filtrar filas en función del término de búsqueda
    const listarPeriodos = async (text_search = "") => {
        try {
            const response = await apiClient.get(Api_Global_SuperAdministrador.academicoPeriodos.listar(text_search));
            const data = response.data.map((item) => ({
                id: item.id_periodo,
                name: item.nombre,
                f_inicio: item.fecha_ini,
                f_fin: item.fecha_fin,
            }));
            setPeriodos(data);
        } catch (error) {
        } finally {
        }
    };

    const cambioPeriodos = (value) => {
        setSearchQuery(value);
        listarPeriodos(value);
    };

    useEffect(() => {
        listarPeriodos("");
    }, []);

    return (
        <div className="flex flex-col justify-start items-center min-h-screen text-lg w-full bg-sky-50 p-6">
            <div className="w-full max-w-7xl p-2">
                <div className="flex justify-end items-center text-sm text-gray-500">
                    <span>
                        <a href="#" className="hover:underline">
                            <span className="text-gray-900">Iaion &gt; Menú &gt; Academico &gt; Periodo</span>
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
                                        value={searchQuery}
                                        onChange={(e) => cambioPeriodos(e.target.value)}
                                        className="border rounded-md pl-10 pr-3 py-1 text-sm outline-none w-full"
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
                    <p>{isEditing ? "Editar Periodo" : "Registrar Periodo"}</p>
                </div>
                <div>
                    <div className="p-7">
                        <form className="p-2 flex flex-col gap-10">
                            <div>
                                <label htmlFor="">Nombre del periodo</label>
                                <TextField
                                    fullWidth
                                    id="nombre"
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    defaultValue={isEditing ? studentToEdit.name : ""}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setStudentToEdit({
                                            ...studentToEdit,
                                            name: value,
                                        });
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="">Fecha de inicio</label>
                                <TextField
                                    fullWidth
                                    id="fecha_inicio"
                                    type="date"
                                    variant="outlined"
                                    size="small"
                                    defaultValue={isEditing ? studentToEdit.f_inicio : ""}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setStudentToEdit({
                                            ...studentToEdit,
                                            f_inicio: value,
                                        });
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="">Fecha de fin</label>
                                <TextField
                                    fullWidth
                                    id="fecha_fin"
                                    type="date"
                                    variant="outlined"
                                    size="small"
                                    defaultValue={isEditing ? studentToEdit.f_fin : ""}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setStudentToEdit({
                                            ...studentToEdit,
                                            f_fin: value,
                                        });
                                    }}
                                />
                            </div>
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
                        <Button onClick={handleConfirmDelete} variant="contained">Sí</Button>
                        <Button onClick={handleCloseModal} variant="outlined">No</Button>
                    </div>
                </div>
            </Dialog>

            <TableSA columns={columns} rows={periodos} />
        </div>
    );
}

export default AcademicPeriod;
