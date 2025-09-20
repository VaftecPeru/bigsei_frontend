import { Box, Filter, Pencil, PlusIcon, Search, Trash2 } from "lucide-react";
import {
    IconButton,
    Avatar,
    Chip,
    Dialog,
    DialogTitle,
    Button,
    Paper,
    InputAdornment,
    TextField,
    Menu,
    MenuItem,
    Typography
} from "@mui/material";
import DownloadButton from "@/components/ui/DownloadButton";
import TableSA from "@/components/tables/TableSA";
import { useState } from "react";
import AddReservaEstudiante from "./modalbibliotecario/AddReservaEstudiante";

function ReservaEstudiante() {
    const [openModal, setOpenModal] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);
    const [filterAnchorEl, setFilterAnchorEl] = useState(null);
    const [activeFilter, setActiveFilter] = useState("");
    const [selectedCiclo, setSelectedCiclo] = useState("");
    const [selectedEstado, setSelectedEstado] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddModalOpen, setAddModalOpen] = useState(false);

    const columns = [
        { header: "N°", key: "id", width: 60 },
        { header: "DNI", key: "dni", width: 100 },
        {
            header: "Foto",
            key: "photo",
            width: 80,
            render: (value) => <Avatar src={value} alt="Foto" sx={{ width: 36, height: 36 }} />,
        },
        { header: "Nombre y apellido", key: "name", width: 200 },
        { header: "Código libro", key: "code", width: 120 },
        { header: "Título", key: "titulo", width: 150 },
        { header: "Fecha", key: "fecha", width: 120 },
        {
            header: "Acción",
            key: "action",
            width: 120,
            render: (_, row) => (
                <div className="flex gap-1">
                    <IconButton
                        size="small"
                        onClick={() => console.log(`Editando: ${row.name}`)}
                        sx={{ color: "primary.main", "&:hover": { backgroundColor: "primary.light" } }}
                    >
                        <Pencil size={18} />
                    </IconButton>
                    <IconButton
                        size="small"
                        onClick={() => handleDeleteClick(row)}
                        sx={{ color: "error.main", "&:hover": { backgroundColor: "error.light" } }}
                    >
                        <Trash2 size={18} />
                    </IconButton>
                </div>
            ),
        },
    ];

    const rows = [
        {
            id: 1,
            dni: 12345678,
            name: "Adrian Lizarbe Canecillas",
            code: "993850868",
            titulo: "Introducción a la programación",
            fecha: "15/05/2023",
            photo: "/placeholder.svg",
        },
        {
            id: 2,
            dni: 87654321,
            name: "María Pérez González",
            code: "993850869",
            titulo: "Matemáticas avanzadas",
            fecha: "16/05/2023",
            photo: "/placeholder.svg",
        },
    ];

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

    const handleFilterClick = (event) => {
        setFilterAnchorEl(event.currentTarget);
    };

    const handleFilterClose = () => {
        setFilterAnchorEl(null);
        setActiveFilter("");
    };

    const handleSelectFilter = (filter) => {
        setActiveFilter(filter);
    };

    const handleSelectCiclo = (ciclo) => {
        setSelectedCiclo(ciclo);
        handleFilterClose();
    };

    const handleSelectEstado = (estado) => {
        setSelectedEstado(estado);
        handleFilterClose();
    };

    const filteredRows = rows.filter((row) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            row.name.toLowerCase().includes(searchLower) ||
            row.dni.toString().includes(searchTerm) ||
            row.titulo.toLowerCase().includes(searchLower) ||
            row.fecha.toLowerCase().includes(searchLower)
        );
    });

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <AddReservaEstudiante
                isOpen={isAddModalOpen}
                onClose={() => setAddModalOpen(false)}
                onSave={handleAddSede}
            />
            
            <Paper elevation={0} className="max-w-7xl mx-auto p-4 mb-4 bg-white rounded-xl shadow-lg">
                <Typography variant="caption" color="textSecondary">
                    <a href="#" className="hover:underline text-gray-900">
                        Iaion &gt; Menú &gt; Operaciones &gt; Reserva Estudiantes
                    </a>
                </Typography>
            </Paper>

            <Paper elevation={3} className="max-w-7xl mx-auto p-6 bg-white rounded-lg">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full">
                        <Button
                            variant="outlined"
                            startIcon={<Filter size={18} />}
                            onClick={handleFilterClick}
                            sx={{
                                textTransform: 'none',
                                borderColor: 'divider',
                                color: 'text.secondary',
                                minWidth: 120
                            }}
                        >
                            Filtrar
                        </Button>
                        
                        <TextField
                            placeholder="Buscar..."
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search className="text-gray-500" />
                                    </InputAdornment>
                                ),
                                sx: {
                                    borderRadius: 1,
                                    backgroundColor: 'background.paper'
                                }
                            }}
                            sx={{ maxWidth: 400 }}
                        />
                        
                        <div className="flex gap-2">
                            {selectedCiclo && (
                                <Chip
                                    label={`Ciclo: ${selectedCiclo}`}
                                    onDelete={() => setSelectedCiclo("")}
                                    size="small"
                                />
                            )}
                            {selectedEstado && (
                                <Chip
                                    label={`Estado: ${selectedEstado}`}
                                    onDelete={() => setSelectedEstado("")}
                                    size="small"
                                />
                            )}
                        </div>
                    </div>

                    <div className="flex gap-3 w-full sm:w-auto">
                        <DownloadButton 
                            label="Descargar" 
                            variant="outlined"
                            sx={{ 
                                textTransform: 'none',
                                borderColor: 'primary.main',
                                color: 'primary.main'
                            }}
                        />
                        
                        <Button
                            variant="contained"
                            startIcon={<PlusIcon size={18} />}
                            onClick={() => setAddModalOpen(true)}
                            sx={{
                                textTransform: 'none',
                                backgroundColor: 'primary.main',
                                '&:hover': { backgroundColor: 'primary.dark' }
                            }}
                        >
                            Agregar
                        </Button>
                    </div>
                </div>

                <Menu
                    anchorEl={filterAnchorEl}
                    open={Boolean(filterAnchorEl)}
                    onClose={handleFilterClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                >
                    {!activeFilter ? (
                        [
                            <MenuItem key="ciclo" onClick={() => handleSelectFilter("Ciclo")}>
                                Ciclo
                            </MenuItem>,
                            <MenuItem key="estado" onClick={() => handleSelectFilter("Estado")}>
                                Estado
                            </MenuItem>
                        ]
                    ) : activeFilter === "Ciclo" ? (
                        ["Ciclo 1", "Ciclo 2", "Ciclo 3"].map((ciclo) => (
                            <MenuItem key={ciclo} onClick={() => handleSelectCiclo(ciclo)}>
                                {ciclo}
                            </MenuItem>
                        ))
                    ) : (
                        ["Cancelado", "Deuda"].map((estado) => (
                            <MenuItem key={estado} onClick={() => handleSelectEstado(estado)}>
                                {estado}
                            </MenuItem>
                        ))
                    )}
                </Menu>

                <TableSA 
                    columns={columns} 
                    rows={filteredRows} 
                    sx={{ 
                        '& .MuiTableCell-root': {
                            py: 1.5
                        }
                    }} 
                />
            </Paper>

            <Dialog 
                open={openModal} 
                onClose={handleCloseModal} 
                maxWidth="xs" 
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 2,
                        p: 2
                    }
                }}
            >
                <DialogTitle textAlign="center">¿Estás seguro de eliminar?</DialogTitle>
                <Box display="flex" justifyContent="center" gap={2} p={2}>
                    <Button 
                        onClick={handleConfirmDelete} 
                        variant="contained"
                        color="error"
                        sx={{ minWidth: 100 }}
                    >
                        Sí
                    </Button>
                    <Button 
                        onClick={handleCloseModal} 
                        variant="outlined"
                        sx={{ minWidth: 100 }}
                    >
                        No
                    </Button>
                </Box>
            </Dialog>
        </div>
    );
}

export default ReservaEstudiante;