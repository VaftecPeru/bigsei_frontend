import { Filter, Pencil, PlusIcon, Search, Trash2 } from "lucide-react";
import { IconButton, Chip, Dialog, DialogTitle, Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import DownloadButton from "@/components/ui/DownloadButton";
import TableSA from "@/components/tables/TableSA";
import { useState } from "react";
import { useEffect } from "react";
import { Api_Global_SuperAdministrador } from "../../../services/SuperAdministradorApi";
import { Api_Global_Setup } from "../../../services/SetupApi";
import apiClient from "../../../Utils/apiClient";

function AcademicCourse() {
    const [openModal, setOpenModal] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);
    const [docentes, setDocentes] = useState([]);
    const [tipoModalidadestudios, setTipoModalidadestudios] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [periodos, setPeriodos] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    // Estado para controlar el modal de agregar o editar
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [courseToEdit, setCourseToEdit] = useState({
        id: '',
        nombre: '',
        id_docente: '',
        codigo_docente: '',
        id_tipomodalidadestudio: '',
        vacantes: '',
        id_periodo: '',
        codigo_curso: '',
        ciclo: '',
        seccion: '',
        estado: '',
        carrera: '',
        fecha_registro: '',
        fecha_inicio: '',
        fecha_fin: '',
        dia: '',
        hora_inicio: '',
        hora_fin: '',
        estado_asignacion: '',
    }); // Para cargar los datos cuando se edita
    const [isEditing, setIsEditing] = useState(false); // Determina si estamos editando o agregando un curso

    const columns = [
        { header: "N°", key: "id" },
        { header: "Curso", key: "curso_nombre" },
        { header: "Docente", key: "docente_nombre_completo" },
        { header: "Modalidad", key: "modalidadestudio_nombre" },
        { header: "Vacantes", key: "vacantes" },
        {
            header: "Acción",
            key: "action",
            render: (value, row) => (
                <div className="flex gap-2">
                    <IconButton size="small" onClick={() => handleClickEdit(row)}>
                        <Pencil />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDeleteClick(row)}>
                        <Trash2 />
                    </IconButton>
                </div>
            ),
        },
    ];

    const handleDeleteClick = (course) => {
        setCourseToDelete(course);
        setOpenModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await apiClient.delete(Api_Global_SuperAdministrador.academicoPeriodoCursos.eliminar(courseToDelete.id));

            if (response.status === 200) {
                listarPeriodoCursos("");
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


    const handleAddClick = () => {
        setIsEditing(false);
        setCourseToEdit({
            id: '',
            nombre: '',
            id_docente: '',
            id_tipomodalidadestudio: '',
            vacantes: '',
            id_periodo: '',
        });
        setOpenModalAdd(true);
    };

    // Función para abrir el modal de edición
    const handleClickEdit = (course) => {
        setIsEditing(true);
        setCourseToEdit(course);
        setOpenModalAdd(true);
    };

    const handleConfirmAddOrEdit = (data) => {
        guardarPeriodo();
    };

    const guardarPeriodo = async () => {
        const data = {
            nombre: courseToEdit.nombre,
            id_docente: courseToEdit.id_docente,
            id_tipomodalidadestudio: courseToEdit.id_tipomodalidadestudio,
            vacantes: courseToEdit.vacantes,
            id_periodo: courseToEdit.id_periodo,
            codigo_curso: courseToEdit.codigo_curso,
            ciclo: courseToEdit.ciclo,
            seccion: courseToEdit.seccion,
            estado: courseToEdit.estado,
            carrera: courseToEdit.carrera,
            fecha_registro: courseToEdit.fecha_registro,
            fecha_inicio: courseToEdit.fecha_inicio,
            fecha_fin: courseToEdit.fecha_fin,
            dia: courseToEdit.dia,
            hora_inicio: courseToEdit.hora_inicio,
            hora_fin: courseToEdit.hora_fin,
            estado_asignacion: courseToEdit.estado_asignacion,
            codigo_docente: courseToEdit.codigo_docente,
        };


        try {
            let response = null;
            if (isEditing) {
                response = await apiClient.put(Api_Global_SuperAdministrador.academicoPeriodoCursos.editar(courseToEdit.id), data);
            } else {
                response = await apiClient.post(Api_Global_SuperAdministrador.academicoPeriodoCursos.registrar(), data);
            }

            if (response.status === 200) {
                setOpenModalAdd(false);
                listarPeriodoCursos("");
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
    const listarDocentes = async (text_search = "") => {
        try {
            const response = await apiClient.get(Api_Global_SuperAdministrador.docentes.listar(text_search));
            const data = response.data.map((item) => ({
                id_docente: item.id_docente,
                nombre: item.nombre_completo,
            }));
            setDocentes(data);
        } catch (error) {
        } finally {
        }
    };

    const listarTipoModalidadestudios = async (text_search = "") => {
        try {
            const response = await apiClient.get(Api_Global_Setup.tipoModalidadestudios.listar(text_search));
            const data = response.data.map((item) => ({
                id_tipomodalidadestudio: item.id_tipomodalidadestudio,
                nombre: item.nombre,
            }));
            setTipoModalidadestudios(data);
        } catch (error) {
        } finally {
        }
    };

    const listarPeriodos = async (text_search = "") => {
        try {
            const response = await apiClient.get(Api_Global_SuperAdministrador.academicoPeriodos.listar(text_search));
            const data = response.data.map((item) => ({
                id_periodo: item.id_periodo,
                nombre: item.nombre,
            }));
            setPeriodos(data);
        } catch (error) {
        } finally {
        }
    };

    const listarPeriodoCursos = async (text_search = "") => {
        try {
            const response = await apiClient.get(Api_Global_SuperAdministrador.academicoPeriodoCursos.listar(text_search));
            const data = response.data.map((item) => ({
                id: item.id_periodocurso,
                id_docente: item.id_docente,
                id_tipomodalidadestudio: item.id_tipomodalidadestudio,
                vacantes: item.vacantes,
                id_periodo: item.id_periodo,
                curso_nombre: item.curso_nombre,
                nombre: item.curso_nombre,
                docente_nombre_completo: item.docente_nombre_completo,
                modalidadestudio_nombre: item.modalidadestudio_nombre,
            }));
            setCursos(data);
        } catch (error) {
        } finally {
        }
    };

    const cambioPeriodoCursos = (value) => {
        setSearchQuery(value);
        listarPeriodoCursos(value);
    };

    useEffect(() => {
        listarDocentes("");
        listarTipoModalidadestudios("");
        listarPeriodos("");
        listarPeriodoCursos("");
    }, []);

    return (
        <div className="flex flex-col justify-start items-center min-h-screen text-lg w-full bg-sky-50 p-6">
            <div className="w-full max-w-7xl p-2">
                <div className="flex justify-end items-center text-sm text-gray-500">
                    <span>
                        <a href="#" className="hover:underline">
                            <span className="text-gray-900">Iaion &gt; Menú &gt; Académico &gt; Curso</span>
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
                                        onChange={(e) => cambioPeriodoCursos(e.target.value)}
                                        className="border rounded-md pl-10 pr-3 py-1 text-sm outline-none w-full"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <DownloadButton label="Descargar" />
                        <Button
                            variant="contained"
                            color="success"
                            onClick={handleAddClick}
                            className="text-white flex w-28 h-9 bg-green-700 items-center justify-center gap-1"
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
                    <Chip label="Ciclo: Ciclo 1" onDelete={() => { }} size="small" />
                    <Chip label="Cursos: UX/UI Design, Full Stack" onDelete={() => { }} size="small" />
                </div>
            </div>

            {/* Modal para agregar o editar curso */}
            <Dialog open={openModalAdd} onClose={handleCloseModalAdd} maxWidth="md" fullWidth className="backdrop-blur-md">
                <div className="text-2xl p-2 font-bold text-center mt-4">
                    <p>{isEditing ? "Editar Curso" : "Registrar Curso"}</p>
                </div>
                <div>
                    <div className="p-7">
                        <form className="p-2">
                            <div className="grid grid-cols-2 gap-6"> 
                                <div>
                                    <label htmlFor="fecha_registro">Fecha de registro</label>
                                    <TextField
                                        fullWidth type="date"
                                        size="small" id="fecha_registro"
                                        value={courseToEdit.fecha_registro}
                                        onChange={(e) => setCourseToEdit({ ...courseToEdit, fecha_registro: e.target.value })} />
                                </div>
                                <div>
                                    <label htmlFor="periodo">Periodo</label>
                                    <select
                                        id="id_periodo"
                                        name="id_periodo"
                                        defaultValue={isEditing ? courseToEdit.id_periodo : ""}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setCourseToEdit({
                                                ...courseToEdit,
                                                id_periodo: value,
                                            });
                                        }}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    >
                                        <option value="" disabled>Seleccione</option>
                                        {periodos.map((item) => <option value={item.id_periodo} key={item.id_periodo}>{item.nombre}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="carrera">Carrera</label>
                                    <TextField
                                        fullWidth size="small"
                                        id="carrera" value={courseToEdit.carrera}
                                        onChange={(e) =>
                                            setCourseToEdit({
                                                ...courseToEdit,
                                                carrera: e.target.value
                                            })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="curso">Nombre del curso</label>
                                    <TextField
                                        fullWidth
                                        id="curso"
                                        type="text"
                                        variant="outlined"
                                        size="small"
                                        defaultValue={isEditing ? courseToEdit.nombre : ""}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setCourseToEdit({
                                                ...courseToEdit,
                                                nombre: value,
                                            });
                                        }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="codigo_curso">Código del curso</label>
                                    <TextField
                                        fullWidth size="small"
                                        id="codigo_curso"
                                        value={courseToEdit.codigo_curso}
                                        onChange={(e) =>
                                            setCourseToEdit({
                                                ...courseToEdit,
                                                codigo_curso: e.target.value
                                            })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="ciclo">Ciclo</label>
                                    <TextField
                                        fullWidth size="small"
                                        id="ciclo" value={courseToEdit.ciclo}
                                        onChange={(e) => 
                                        setCourseToEdit({ 
                                            ...courseToEdit, 
                                            ciclo: e.target.value 
                                            })
                                        } 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="seccion">Sección</label>
                                    <TextField
                                        fullWidth size="small"
                                        id="seccion" value={courseToEdit.seccion}
                                        onChange={(e) => 
                                        setCourseToEdit({ 
                                            ...courseToEdit, 
                                            seccion: e.target.value 
                                            })
                                        } 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="estado">Estado</label>
                                    <TextField
                                        fullWidth size="small"
                                        id="estado" value={courseToEdit.estado}
                                        onChange={(e) => 
                                        setCourseToEdit({ 
                                            ...courseToEdit, 
                                            estado: e.target.value 
                                            })
                                        } 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="codigo_docente">Código docente</label>
                                    <TextField
                                        fullWidth size="small"
                                        id="codigo_docente"
                                        value={courseToEdit.codigo_docente}
                                        onChange={(e) => 
                                        setCourseToEdit({ 
                                            ...courseToEdit, 
                                            codigo_docente: e.target.value 
                                            })
                                        } 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="docente">Docente</label>
                                    <select
                                        id="id_docente"
                                        name="id_docente"
                                        defaultValue={isEditing ? courseToEdit.id_docente : ""}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setCourseToEdit({
                                                ...courseToEdit,
                                                id_docente: value,
                                            });
                                        }}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    >
                                        <option value="" disabled>Seleccione</option>
                                        {docentes.map((item) => <option value={item.id_docente} key={item.id_docente}>{item.nombre}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="fecha_inicio">Fecha de inicio</label>
                                    <TextField 
                                        fullWidth type="date" 
                                        size="small" 
                                        id="fecha_inicio" 
                                        value={courseToEdit.fecha_inicio} 
                                        onChange={(e) => 
                                            setCourseToEdit({ 
                                                ...courseToEdit, 
                                                fecha_inicio: e.target.value 
                                            })
                                        } 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="fecha_fin">Fecha de fin</label>
                                    <TextField 
                                        fullWidth type="date" 
                                        size="small" 
                                        id="fecha_fin" 
                                        value={courseToEdit.fecha_fin} 
                                        onChange={(e) => 
                                            setCourseToEdit({ 
                                                ...courseToEdit, 
                                                fecha_fin: e.target.value 
                                            })
                                        } 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="dia">Día</label>
                                    <TextField 
                                        fullWidth size="small" 
                                        id="dia" 
                                        value={courseToEdit.dia} 
                                        onChange={(e) => 
                                            setCourseToEdit({ 
                                                ...courseToEdit, 
                                                dia: e.target.value 
                                            })
                                        } 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="hora_inicio">Hora de inicio</label>
                                    <TextField 
                                        fullWidth type="time" 
                                        size="small" 
                                        id="hora_inicio" 
                                        value={courseToEdit.hora_inicio} 
                                        onChange={(e) => 
                                            setCourseToEdit({ 
                                                ...courseToEdit, 
                                                hora_inicio: e.target.value 
                                            })
                                        } 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="hora_fin">Hora de fin</label>
                                    <TextField 
                                        fullWidth type="time" 
                                        size="small" 
                                        id="hora_fin" 
                                        value={courseToEdit.hora_fin} 
                                        onChange={(e) => 
                                            setCourseToEdit({ 
                                                ...courseToEdit, 
                                                hora_fin: e.target.value 
                                            })
                                        } 
                                    />
                                </div>
                                <div>
                                    <label htmlFor="modalidad">Modalidad</label>
                                    <select
                                        id="id_tipomodalidadestudio"
                                        name="id_tipomodalidadestudio"
                                        defaultValue={isEditing ? courseToEdit.id_tipomodalidadestudio : ""}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setCourseToEdit({
                                                ...courseToEdit,
                                                id_tipomodalidadestudio: value,
                                            });
                                        }}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    >
                                        <option value="" disabled>Seleccione</option>
                                        {tipoModalidadestudios.map((item) => <option value={item.id_tipomodalidadestudio} key={item.id_tipomodalidadestudio}>{item.nombre}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="vacantes">Vacantes</label>
                                    <TextField
                                        fullWidth
                                        id="vacantes"
                                        type="number"
                                        variant="outlined"
                                        size="small"
                                        defaultValue={isEditing ? courseToEdit.vacantes : ""}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setCourseToEdit({
                                                ...courseToEdit,
                                                vacantes: value,
                                            });
                                        }}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="estado_asignacion">Estado de asignación</label>
                                    <TextField
                                        fullWidth size="small"
                                        id="estado_asignacion"
                                        value={courseToEdit.estado_asignacion}
                                        onChange={(e) =>
                                            setCourseToEdit({
                                                ...courseToEdit,
                                                estado_asignacion: e.target.value
                                            })
                                        }
                                    />
                                </div>
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
                        <Button onClick={handleConfirmDelete} variant="contained">
                            Sí
                        </Button>
                        <Button onClick={handleCloseModal} variant="outlined">
                            No
                        </Button>
                    </div>
                </div>
            </Dialog>

            <TableSA columns={columns} rows={cursos} />
        </div>
    );
}

export default AcademicCourse;
