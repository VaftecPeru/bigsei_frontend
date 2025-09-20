import { Filter, Pencil, PlusIcon, Search, Trash2 } from "lucide-react";
import { IconButton, Avatar, Chip, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import DownloadButton from "@/components/ui/DownloadButton";
import TableSA from "@/components/tables/TableSA";
import { Api_Global_SuperAdministrador } from "../../../services/SuperAdministradorApi";
import apiClient from "../../../Utils/apiClient";

function AttendanceTeaching() {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [asistencias, setAsistencias] = useState([]);
    const [personas, setPersonas] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [teacherToEdit, setTeacherToEdit] = useState(null);

    const columns = [
        { header: "N°", key: "id" },
        { header: "Dni", key: "dni" },
        // { header: "Apellidos", key: "apellido" },
        { header: "Nombre", key: "nombre" },
        { header: "Curso", key: "curso" },
        { header: "Estado", key: "estado" },
    ];

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        listarAsistencias(event.target.value);
    };

    const handleAddTeacher = () => {
        guardarAsistencia();
    };

    const guardarAsistencia = async () => {
        const data = {
            id_persona: teacherToEdit.id_persona,
            id_periodocurso: teacherToEdit.id_periodocurso,
            justificacion: "",
            estado: "P",
            tipo: "D",
        };

        try {
            const response = await apiClient.post(Api_Global_SuperAdministrador.asistencias.registrar(), data);

            if (response.status === 200) {
                setTeacherToEdit(null);
                handleClose();
                listarAsistencias("");
            } else {
            }
        } catch (error) {
        } finally {
        }
    };

    const listarPersonas = async (text_search = "") => {
        try {
            const response = await apiClient.get(Api_Global_SuperAdministrador.academicoPeriodoCursos.listarDocentesActivos(text_search));
            const data = response.data.map((item) => ({
                id_persona: item.id_docente,
                nombre: item.docente_nombre,
            }));
            setPersonas(data);
        } catch (error) {
        } finally {
        }
    };

    const listarCursos = async (id_docente = "") => {
        try {
            const response = await apiClient.get(Api_Global_SuperAdministrador.academicoPeriodoCursos.listarCursosActivos(id_docente));
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
            const response = await apiClient.get(Api_Global_SuperAdministrador.asistencias.listar(text_search, "D"));
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
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <DownloadButton label="Descargar" />
                        <Button
                            variant="contained"
                            color="success"
                            className="text-white flex w-28 h-9 bg-[#5CB85C] items-center justify-center gap-1"
                            onClick={handleOpen}
                        >
                            <PlusIcon />
                            Agregar
                        </Button>
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

            <TableSA columns={columns} rows={asistencias} />

            {/* Modal para agregar docente */}
            <Dialog open={open} onClose={handleClose} className="backdrop-blur-md">
                <div className="text-2xl p-2 font-bold text-center mt-4">
                    <span>Agregar Docente</span>
                </div>
                <DialogContent>
                    {/* <TextField
                        autoFocus
                        margin="dense"
                        label="DNI"
                        name="dni"
                        fullWidth
                        value={newTeacher.dni}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="Apellidos"
                        name="apellido"
                        fullWidth
                        value={newTeacher.apellido}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="Nombre"
                        name="nombre"
                        fullWidth
                        value={newTeacher.nombre}
                        onChange={handleInputChange}
                    />
                    <TextField
                        margin="dense"
                        label="Curso"
                        name="curso"
                        fullWidth
                        value={newTeacher.curso}
                        onChange={handleInputChange}
                    /> */}
                    <div>
                        <label htmlFor="periodo">Estudiante</label>
                        <select
                            id="id_persona"
                            name="id_persona"
                            defaultValue={isEditing ? teacherToEdit.id_persona : ""}
                            onChange={(e) => {
                                const value = e.target.value;
                                setTeacherToEdit({
                                    ...teacherToEdit,
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
                            defaultValue={isEditing ? teacherToEdit.id_periodocurso : ""}
                            onChange={(e) => {
                                const value = e.target.value;
                                setTeacherToEdit({
                                    ...teacherToEdit,
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
                    <Button onClick={handleClose} color="secondary">
                        Cancelar
                    </Button>
                    <Button onClick={handleAddTeacher} color="primary">
                        Agregar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AttendanceTeaching;
