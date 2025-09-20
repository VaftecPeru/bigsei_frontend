import { Filter, Pencil, PlusIcon, Search, Trash2 } from "lucide-react";
import { IconButton, Chip, Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import DownloadButton from "@/components/ui/DownloadButton";
import TableSA from "@/components/tables/TableSA";
import { Api_Global_SuperAdministrador } from "../../../services/SuperAdministradorApi";
import apiClient from "../../../Utils/apiClient";

function AcademicCiclo() {
    const [openModal, setOpenModal] = useState(false);
    const [cicloToDelete, setCicloToDelete] = useState(null);
    const [periodoCiclos, setPeriodoCiclos] = useState([]);
    const [periodos, setPeriodos] = useState([]);

    // Estado para controlar el modal de agregar o editar
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [cicloToEdit, setCicloToEdit] = useState({
        id: '',
        id_periodo: '',
        ciclo: '',
        codigo: '',
    }); // Para cargar los datos cuando se edita
    const [isEditing, setIsEditing] = useState(false); // Determina si estamos editando o agregando un ciclo
    const [searchQuery, setSearchQuery] = useState("");

    const columns = [
        { header: "N°", key: "id" },
        { header: "Periodo", key: "periodo" },
        { header: "Ciclo", key: "ciclo" },
        { header: "Codigo", key: "codigo" },
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

    const handleDeleteClick = (ciclo) => {
        setCicloToDelete(ciclo);
        setOpenModal(true);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await apiClient.delete(Api_Global_SuperAdministrador.academicoPeriodoCiclos.eliminar(cicloToDelete.id));
        
            if (response.status === 200) {
                listarPeriodoCiclos("");
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

    // Función para abrir el modal de agregar o editar ciclo
    const handleAddClick = () => {
        setIsEditing(false); 
        setCicloToEdit({
            id: '',
            id_periodo: '',
            ciclo: '',
            codigo: '',
        }); 
        setOpenModalAdd(true);
    };

    // Función para abrir el modal de edición
    const handleClickEdit = (ciclo) => {
        setIsEditing(true); 
        setCicloToEdit(ciclo);
        setOpenModalAdd(true);
    };

    const handleConfirmAddOrEdit = (data) => {
        guardarPeriodo();
    };

    // REGISTRAR Y EDITAR
    const guardarPeriodo = async () => {
        const data = {
            id_periodo: cicloToEdit.id_periodo,
            descripcion: cicloToEdit.ciclo,
            codigo: cicloToEdit.codigo,
        };

        try {
          let response = null;
          if (isEditing) {
            response = await apiClient.put(Api_Global_SuperAdministrador.academicoPeriodoCiclos.editar(cicloToEdit.id), data);
          } else {
            response = await apiClient.post(Api_Global_SuperAdministrador.academicoPeriodoCiclos.registrar(), data);
          }

          if (response.status === 200) {
            setOpenModalAdd(false);
            listarPeriodoCiclos("");
          } else {
          }
        } catch (error) {
        } finally {
        }
    };

    const handleCloseModalAdd = () => {
        setOpenModalAdd(false);
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

    // Filtrar filas en función del término de búsqueda
    const listarPeriodoCiclos = async (text_search = "") => {
        try {
            const response = await apiClient.get(Api_Global_SuperAdministrador.academicoPeriodoCiclos.listar(text_search));
            const data = response.data.map((item) => ({
                id: item.id_periodociclo,
                id_periodo: item.id_periodo,
                periodo: item.periodo_nombre,
                ciclo: item.descripcion,
                codigo: item.codigo,
            }));
            setPeriodoCiclos(data);
        } catch (error) {
        } finally {
        }
    };

    const cambioPeriodoCiclos = (value) => {
        setSearchQuery(value);
        listarPeriodoCiclos(value);
    };

    useEffect(() => {
        listarPeriodos("");
        listarPeriodoCiclos("");
    }, []);

    return (
        <div className="flex flex-col justify-start items-center min-h-screen text-lg w-full bg-sky-50 p-6">
            <div className="w-full max-w-7xl p-2">
                <div className="flex justify-end items-center text-sm text-gray-500">
                    <span>
                        <a href="#" className="hover:underline">
                            <span className="text-gray-900">
                                Iaion &gt; Menú &gt; Académico &gt; Ciclo
                            </span>
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
                                        onChange={(e) => cambioPeriodoCiclos(e.target.value)}
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
                                color="success"
                                variant="contained"
                                onClick={handleAddClick}
                                className="text-white flex w-28 h-9 bg-[#5CB85C] items-center justify-center gap-1"
                            >
                                <PlusIcon />
                                Agregar
                            </Button>
                        </div>
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
                    <Chip label="Cursos: UX/UI Design, Full Stack" onDelete={() => {}} size="small" />
                </div>
            </div>

            {/* Modal para agregar o editar ciclo */}
            <Dialog open={openModalAdd} onClose={handleCloseModalAdd} maxWidth="xs" fullWidth className="backdrop-blur-md">
                <div className="text-2xl p-2 font-bold text-center mt-4">
                    <p>{isEditing ? "Editar Ciclo" : "Registrar Ciclo"}</p>
                </div>
                <div>
                    <div className="p-7">
                        <form className="p-2 flex flex-col gap-10">
                            <div>
                                <label htmlFor="periodo">Periodo</label>
                                <select
                                    id="id_periodo"
                                    name="id_periodo"
                                    defaultValue={isEditing ? cicloToEdit.id_periodo : ""}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setCicloToEdit({
                                            ...cicloToEdit,
                                            id_periodo: value,
                                        });
                                    }}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                    >
                                    <option value="" disabled>Seleccione</option>
                                    {periodos.map((item) => <option value={item.id_periodo} key={item.id_periodo}>{item.nombre}</option> )}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="ciclo">Ciclo</label>
                                <TextField
                                    fullWidth
                                    id="ciclo"
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    defaultValue={isEditing ? cicloToEdit.ciclo : ""}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setCicloToEdit({
                                            ...cicloToEdit,
                                            ciclo: value,
                                        });
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="codigo">Código</label>
                                <TextField
                                    fullWidth
                                    id="codigo"
                                    type="text"
                                    variant="outlined"
                                    size="small"
                                    defaultValue={isEditing ? cicloToEdit.codigo : ""}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setCicloToEdit({
                                            ...cicloToEdit,
                                            codigo: value,
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
                        <Button onClick={handleConfirmDelete} variant="contained">
                            Sí
                        </Button>
                        <Button onClick={handleCloseModal} variant="outlined">
                            No
                        </Button>
                    </div>
                </div>
            </Dialog>

            <TableSA columns={columns} rows={periodoCiclos} />
        </div>
    );
}

export default AcademicCiclo;
