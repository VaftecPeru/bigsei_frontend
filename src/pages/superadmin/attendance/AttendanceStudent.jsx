import { Filter, Pencil, PlusIcon, Search, Trash2 } from "lucide-react";
import { IconButton, Avatar, Chip, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import DownloadButton from "@/components/ui/DownloadButton";
import TableSA from "@/components/tables/TableSA";
import { useState } from "react";
import { useEffect } from "react";
import { Api_Global_SuperAdministrador } from "../../../services/SuperAdministradorApi";
import apiClient from "../../../Utils/apiClient";

function AttendanceStudent() {
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [studentToEdit, setStudentToEdit] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
    const [asistencias, setAsistencias] = useState([]);
    const [personas, setPersonas] = useState([]);
    const [cursos, setCursos] = useState([]);

    const columns = [
        { header: "N°", key: "id" },
        { header: "Dni", key: "dni" },
        // { header: "Apellidos", key: "apellido" },
        { header: "Nombre", key: "nombre" },
        { header: "Curso", key: "curso" },
        { header: "Estado", key: "estado" },
    ];

    // Función para manejar el cambio del término de búsqueda
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        listarAsistencias(event.target.value);
    };

    const handleAddClick = () => {
        setIsEditing(false);
        setStudentToEdit(null);
        setOpenModalAdd(true);
    };

    const handleCloseModal = () => {
        setOpenModalAdd(false);
    };

    const handleConfirmAddOrEdit = () => {
        guardarAsistencia();
    };

    const guardarAsistencia = async () => {
        const data = {
            id_persona: studentToEdit.id_persona,
            id_periodocurso: studentToEdit.id_periodocurso,
            justificacion: "",
            estado: "P",
            tipo: "E",
        };

        try {
            const response = await apiClient.post(Api_Global_SuperAdministrador.asistencias.registrar(), data);

            if (response.status === 200) {
                setOpenModalAdd(false);
                listarAsistencias("");
            } else {
            }
        } catch (error) {
        } finally {
        }
    };

    const listarPersonas = async (text_search = "") => {
        try {
            const response = await apiClient.get(Api_Global_SuperAdministrador.matriculas.listarEstudiantesActivos(text_search));
            const data = response.data.map((item) => ({
                id_persona: item.id_estudiante,
                nombre: item.estudiante_nombre,
            }));
            setPersonas(data);
        } catch (error) {
        } finally {
        }
    };

    const listarCursos = async (id_estudiante = "") => {
        try {
            const response = await apiClient.get(Api_Global_SuperAdministrador.matriculas.listarCursosActivos(id_estudiante));
            const data = response.data.map((item) => ({
                id_periodocurso: item.id_periodocurso,
                nombre: item.curso_nombre,
            }));
            setCursos(data);
        } catch (error) {
        } finally {
        }
    };

    const listarAsistencias = async (text_search = "") => {
        try {
            const response = await apiClient.get(Api_Global_SuperAdministrador.asistencias.listar(text_search, "E"));
            const data = response.data.map((item) => ({
                id: item.id_asistencia,
                dni: item.dni,
                nombre: item.nombre_completo,
                curso: item.curso_nombre,
                estado: item.estado == "P" ?
                    <button className="bg-green-200 rounded-sm p-2 w-16 h-8 text-green-700 hover:bg-green-300">Asistió</button>:
                    <button className="bg-red-200 rounded-sm p-2 w-16 h-8 text-red-700 hover:bg-red-300">Faltó</button>,
            }));
            setAsistencias(data);
        } catch (error) {
        } finally {
        }
    };

    useEffect(() => {
        listarAsistencias("");
        listarPersonas("");
    }, []);

    return (
        <div className="flex flex-col justify-start items-center min-h-screen text-lg w-full bg-sky-50 p-6">
            <div className="w-full max-w-7xl p-2">
                <div className="flex justify-end items-center text-sm text-gray-500">
                    <span>
                        <a href="#" className="hover:underline">
                            <span className="text-gray-900">Iaion &gt; Menú &gt; Académico &gt; Estudiante</span>
                        </a>
                    </span>
                </div>
            </div>
            <div className="w-full max-w-7xl p-2 bg-white">
                <div className="flex justify-between items-center mb-4 mt-5">
                    <div className="flex items-center gap-2">
                        <button className="border border-gray-300 w-24 flex justify-center items-center">
                            <Filter className="h-4 w-4" />
                            Filtrar
                        </button>
                        <div className="border-y border-r border-gray-300 w-full sm:w-96 max-w-full">
                            <div className="relative w-full sm:w-auto">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Buscar por DNI, nombre o curso"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    className="border rounded-md pl-10 pr-3 py-1 text-sm outline-none w-full"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <DownloadButton label="Descargar" />
                        <Button
                            variant="contained"
                            onClick={handleAddClick}
                            color="success"
                            className="text-white flex w-28 h-9 bg-[#5CB85C] items-center justify-center gap-1"
                        >
                            <PlusIcon />
                            Agregar
                        </Button>
                    </div>
                </div>

                {/* Tabla */}
                <TableSA columns={columns} rows={asistencias} />
            </div>

            {/* Modal de agregar o editar */}
            <Dialog open={openModalAdd} onClose={handleCloseModal} className="backdrop-blur-md">
                <div className="text-2xl p-2 font-bold text-center mt-4">
                    <span>{isEditing ? "Editar Estudiante" : "Agregar Estudiante"}</span>
                </div>
                <DialogContent>
                    {/* <TextField margin="dense" label="Nombre" fullWidth defaultValue={studentToEdit?.nombre || ""} />
                    <TextField margin="dense" label="Apellido" fullWidth defaultValue={studentToEdit?.apellido || ""} />
                    <TextField margin="dense" label="DNI" fullWidth defaultValue={studentToEdit?.dni || ""} />
                    <TextField margin="dense" label="Curso" fullWidth defaultValue={studentToEdit?.curso || ""} /> */}
                    <div>
                        <label htmlFor="periodo">Estudiante</label>
                        <select
                            id="id_persona"
                            name="id_persona"
                            defaultValue={isEditing ? studentToEdit.id_persona : ""}
                            onChange={(e) => {
                                const value = e.target.value;
                                setStudentToEdit({
                                    ...studentToEdit,
                                    id_periodocurso: "",
                                    id_persona: value,
                                });
                                listarCursos(value);
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                            <option value="" disabled>Seleccione</option>
                            {personas.map((item) => <option value={item.id_persona} key={item.id_persona}>{item.nombre}</option> )}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="periodo">Periodo curso</label>
                        <select
                            id="id_periodocurso"
                            name="id_periodocurso"
                            defaultValue={isEditing ? studentToEdit.id_periodocurso : ""}
                            onChange={(e) => {
                                const value = e.target.value;
                                setStudentToEdit({
                                    ...studentToEdit,
                                    id_periodocurso: value,
                                });
                            }}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            >
                            <option value="">Seleccione</option>
                            {cursos.map((item) => <option value={item.id_periodocurso} key={item.id_periodocurso}>{item.nombre}</option> )}
                        </select>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal} variant="outline">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirmAddOrEdit} variant="contained">
                        {isEditing ? "Guardar" : "Agregar"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AttendanceStudent;
