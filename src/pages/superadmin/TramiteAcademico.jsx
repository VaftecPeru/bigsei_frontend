import { useState } from "react";
import { Filter, Pencil, PlusIcon, Search, Trash2 } from "lucide-react";
import { IconButton, Avatar, Chip, Button } from "@mui/material";
import DownloadButton from "@/components/ui/DownloadButton";
import TableSA from "@/components/tables/TableSA";
import TramiteAcademicoModal from "./modal/TramiteAcademicoModal";

function TramiteAcademico() {
    // Estado para el término de búsqueda y las filas filtradas
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredRows, setFilteredRows] = useState([]);

    // estado para abrir y cerrar el modal tramiteacademico
    const [isAddModalOpen, setAddModalOpen] = useState(false);

    const columns = [
        { header: "N°", key: "id" },
        { header: "Nombre", key: "nombre" },
        { header: "Matricula", key: "matricula" },
        { header: "Tipo de tramite", key: "tipotramite" },
        { header: "Fecha de solicitud", key: "fecha" },
        { header: "Estado", key: "estado" },
    ];

    /* Agregar modal tramiteAcademico */
    const handleAddSede = (newSede) => {
        console.log("Nueva sede agregada:", newSede);
    };

    const rows = [
        {
            id: 1,
            nombre: "Joel Jaime",
            matricula: "2021-0001",
            tipotramite: "Solicitud de certificado",
            fecha: "12/10/2021",
            estado: <Button className="bg-blue-200 hover:bg-blue-300">Aprobado</Button>,
        },
        {
            id: 2,
            nombre: "Lucía Pérez",
            matricula: "2021-0002",
            tipotramite: "Solicitud de constancia",
            fecha: "15/11/2021",
            estado: <Button className="bg-yellow-200 hover:bg-yellow-300">Pendiente</Button>,
        },
        {
            id: 3,
            nombre: "Carlos Ramírez",
            matricula: "2021-0003",
            tipotramite: "Solicitud de certificado",
            fecha: "20/11/2021",
            estado: <Button className="bg-red-200 hover:bg-red-300">Rechazado</Button>,
        },
    ];

    // Filtrar filas en función del término de búsqueda
    const handleFilter = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        const filtered = rows.filter((row) =>
            Object.values(row).some((cell) => {
                if (typeof cell === "string") {
                    return cell.toLowerCase().includes(value);
                }
                return false; // Ignorar valores no string como botones
            })
        );

        setFilteredRows(filtered);
    };

    // Mostrar todas las filas si no hay filtro activo
    const rowsToDisplay = searchTerm ? filteredRows : rows;

    return (
        <>
            <TramiteAcademicoModal
                isOpen={isAddModalOpen}
                onClose={() => setAddModalOpen(false)}
                onSave={handleAddSede}
            />
            <div className="flex flex-col items-center min-h-screen w-full bg-sky-50 p-4 sm:p-6">
                <div className="w-full max-w-7xl">
                    {/* Breadcrumb */}
                    <div className="flex justify-end text-sm text-gray-500 mb-4">
                        <a href="#" className="hover:underline">
                            <span className="text-gray-900">Iaion &gt; Menú &gt; Tramites Académicos</span>
                        </a>
                    </div>

                    {/* Header */}
                    <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                        <div className="flex flex-wrap gap-2 items-center">
                            <Button variant="outlined" className="gap-2">
                                <Filter className="h-4 w-4" />
                                Filtrar
                            </Button>
                            <div className="relative w-full sm:w-auto">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Buscar"
                                    value={searchTerm}
                                    onChange={handleFilter}
                                    className="w-full border rounded-md pl-10 pr-3 py-1 text-sm bg-gray-100 focus:ring focus:outline-none sm:w-64"
                                />
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <DownloadButton label="Descargar" />
                            <Button
                                variant="contained"
                                color="success"
                                onClick={() => setAddModalOpen(true)}
                                className="text-white flex items-center gap-2 bg-[#5CB85C]"
                            >
                                <PlusIcon className="h-4 w-4" />
                                Agregar
                            </Button>
                        </div>
                    </div>

                    {/* Active Filters */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        <div className="flex items-center gap-1">
                            <span className="text-sm text-gray-500">Filtrado: {filteredRows.length}</span>
                            <Button
                                variant="text"
                                size="small"
                                onClick={() => {
                                    setSearchTerm("");
                                    setFilteredRows([]);
                                }}
                            >
                                Borrar todo
                            </Button>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                        <TableSA columns={columns} rows={rowsToDisplay} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default TramiteAcademico;
