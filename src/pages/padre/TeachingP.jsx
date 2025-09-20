import { Filter, Pencil,Search, Trash2 } from "lucide-react";
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

function TeachingP() {
//    const [openModal, setOpenModal] = useState(false);
//    const [studentToDelete, setStudentToDelete] = useState(null);
    const [openFilterMenu, setOpenFilterMenu] = useState(false);
    const [activeFilter, setActiveFilter] = useState("");
    const [selectedcurso, setSelectedCurso] = useState("");
    const [selectedCiclo, setSelectedCiclo] = useState("");
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [incidentModalOpen, setIncidentModalOpen] = useState(false);
    const [incidents, setIncidents] = useState({}); // { [docenteId]: [incidencia1, incidencia2] }

    const [newIncident, setNewIncident] = useState("");

    const columns = [
        { header: "N°", key: "id" },
        {
            header: "Foto",
            key: "photo",
            render: (value) => <Avatar src={value} alt="Foto" />,
        },
        { header: "Nombre y apellido", key: "name" },
        { header: "Celular", key: "phone" },
        { header: "Curso", key: "course" },
        { header: "Correo", key: "email" },
//        { header: "Estado", key: "status" },
        {
            header: "Incidencias",
            key: "incidents",
            render: (_, row) => (
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleOpenIncidentDialog(row)}
              >
                Ver
              </Button>
            ),
          }
          
    ];
/*
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
*/
    const toggleFilterMenu = () => {
        setOpenFilterMenu(!openFilterMenu);
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

    const handleOpenIncidentDialog = (teacher) => {
        setSelectedTeacher(teacher);
        setIncidentModalOpen(true);
    };
    
    const handleCloseIncidentDialog = () => {
        setIncidentModalOpen(false);
        setSelectedTeacher(null);
        setNewIncident("");
    };    

    const handleAddIncident = () => {
        if (!newIncident.trim()) return;
        setIncidents((prev) => {
            const current = prev[selectedTeacher.id] || [];
            return {
              ...prev,
              [selectedTeacher.id]: [...current, {
                text: newIncident,
                date: new Date().toLocaleDateString(),
                from: "padre",
              }],
            };
          });
        setNewIncident("");
    };
    

    const rows = [
        {
            id: 1,
            name: "Docente",
            course:"curso 1",
            phone: "987456321",
            email: "usuario.registrado@gmail.com",
            status: "Activo",
            photo: "/placeholder.svg",
        },
        {
            id: 2,
            name: "Docente",
            course:"curso 2",
            phone: "998745612",
            email: "laura.martinez@email.com",
            status: "Activo",
            photo: "/placeholder.svg",
        },
        {
            id: 3,
            name: "Docente",
            course:"curso 6",
            phone: "955632101",
            email: "carlos.garcia@gmail.com",
            status: "Activo",
            photo: "/placeholder.svg",
        },
        {
            id: 4,
            name: "Docente",
            course:"curso 5",
            phone: "960123987",
            email: "sofia.hernandez@mail.com",
            status: "Activo",
            photo: "/placeholder.svg",
        },
        {
            id: 5,
            name: "Docente",
            course:"curso 3",
            phone: "911223344",
            email: "pedro.rodriguez@outlook.com",
            status: "Activo",
            photo: "/placeholder.svg",
        },
        {
            id: 6,
            name: "Docente",
            course:"curso 10",
            phone: "987654321",
            email: "marta.ruiz@yahoo.com",
            status: "Activo",
            photo: "/placeholder.svg",
        },
        {
            id: 7,
            name: "Docente",
            course:"curso 12",
            phone: "988765432",
            email: "david.fernandez@gmail.com",
            status: "Activo",
            photo: "/placeholder.svg",
        },
        {
            id: 8,
            name: "Docente",
            course:"curso 13",
            phone: "952358745",
            email: "isabel.gonzalez@live.com",
            status: "Activo",
            photo: "/placeholder.svg",
        },
        {
            id: 9,
            name: "Docente",
            course:"curso 13",
            phone: "937654209",
            email: "antonio.perez@hotmail.com",
            status: "Activo",
            photo: "/placeholder.svg",
        },
        {
            id: 10,
            name: "Docente",
            course:"curso 4",
            phone: "977889223",
            email: "claudia.diaz@outlook.com",
            status: "Activo",
            photo: "/placeholder.svg",
        },
    ];

    return (
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
                                {["Ciclo actual","Ciclo 1", "Ciclo 2"].map((ciclo) => (
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
                    {selectedcurso && (
                        <Chip
                            label={`Curso: ${selectedcurso}`}
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

            <Dialog open={incidentModalOpen} onClose={handleCloseIncidentDialog} maxWidth="sm" fullWidth>
                <div className="p-6 space-y-4">
                    <DialogTitle>Incidencias - {selectedTeacher?.name}</DialogTitle>

                    <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Historial:</h3>
                        <ul className="list-disc pl-6 text-sm text-gray-800">
                            {(incidents[selectedTeacher?.id] || []).map((inc, idx) => (
                                <li key={idx}>
                                {inc.text} <span className="text-gray-400 text-xs">({inc.date} - {inc.from})</span>
                              </li>
                            ))}
                            {(!incidents[selectedTeacher?.id] || incidents[selectedTeacher?.id].length === 0) && (
                                <li className="text-gray-400">
                                    <li>Falta de tareas en matemáticas - 04/04/2025</li>
                                    <li>Uso inadecuado del celular en clase - 01/04/2025</li>
                                    <li>Comportamiento disruptivo - 28/03/2025</li>
                                    </li>
                            )}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-gray-700 mb-2">Nueva incidencia:</h3>
                        <textarea
                            rows={3}
                            value={newIncident}
                            onChange={(e) => setNewIncident(e.target.value)}
                            className="w-full border rounded-md p-2 text-sm"
                            placeholder="Describe la incidencia..."
                        />
                        <div className="flex justify-end mt-2">
                            <Button variant="contained" size="small" onClick={handleAddIncident}>
                                Guardar
                            </Button>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button onClick={handleCloseIncidentDialog} variant="outlined" size="small">
                            Cerrar
                        </Button>
                    </div>
                </div>
            </Dialog>


            <TableSA columns={columns} rows={rows} />
        </div>
    );
}

export default TeachingP;
