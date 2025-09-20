import { useState } from "react";
import { Avatar, Button, Chip, Dialog, DialogTitle, IconButton } from "@mui/material";
import DownloadButton from "@/components/ui/DownloadButton";
import TableSA from "@/components/tables/TableSA";
import IncomeChart from "@/components/dashboard/IncomeChart";
import { DollarSign, Filter, Pencil, Search, Trash2 } from "lucide-react";
import PagosC from "./PagosC";

function Gastos() {
    const [openModal, setOpenModal] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);

    // Estado para el menú general de filtros
    const [openFilterMenu, setOpenFilterMenu] = useState(false);
    const [activeFilter, setActiveFilter] = useState(""); // Determina si se elige Ciclo o Estado

    // Filtros seleccionados
    const [selectedCiclo, setSelectedCiclo] = useState("");
    const [selectedEstado, setSelectedEstado] = useState("");

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

    //filtrar
    const toggleFilterMenu = () => {
        setOpenFilterMenu(!openFilterMenu);
        setActiveFilter(""); // Resetea el filtro activo al abrir/cerrar
    };

    const handleSelectFilter = (filter) => {
        setActiveFilter(filter);
    };

    const handleSelectCiclo = (ciclo) => {
        setSelectedCiclo(ciclo);
        setActiveFilter(""); // Cierra la subopción
        setOpenFilterMenu(false);
    };

    const handleSelectEstado = (estado) => {
        setSelectedEstado(estado);
        setActiveFilter(""); // Cierra la subopción
        setOpenFilterMenu(false);
    };

    const columns = [
        { header: "N°", key: "id" },
        { header: "Número de operacion", key: "noperacion" },
        { header: "Nombre", key: "nombre" },
        { header: "Fecha", key: "fecha" },
        { header: "Usuario", key: "usuario" },
        { header: "Monto", key: "monto" },
        {
            header: "Sunat",
            key: "sunat",
            render: (text) => (
                <th className="bg-green-100 rounded-lg text-green-500 px-4 text-sm font-light">{text}</th>
            ),
        },
        { header: "Accion", key: "accion" },
    ];

    const columns1 = [
        { header: "N°", key: "id" },
        { header: "Nombre", key: "nombre" },
        { header: "Usuario Asignado", key: "usuario" },
        { header: "Cantidad", key: "cantidad" },
        { header: "Fecha a pagar", key: "fecha" },
        { header: "Nota", key: "nota" },
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
                    <IconButton size="small" onClick={() => handleDeleteClick(row)}>
                        <DollarSign />
                    </IconButton>
                </div>
            ),
        },
    ];

    const rows = [
        {
            id: 1,
            noperacion: '0001',
            nombre: "Juan Perez",
            fecha: "10/04/2024",
            usuario: "Admin",
            monto: "100",
            sunat: "Aceptado",
            accion: "accion"
        },
        {
            id: 2,
            noperacion: '0002',
            nombre: "Maria Lopez",
            fecha: "10/04/2024",
            usuario: "Admin",
            monto: "200",
            sunat: "Aceptado",
            accion: "accion"
        },
        {
            id: 3,
            noperacion: '0003',
            nombre: "Pedro Ramirez",
            fecha: "10/04/2024",
            usuario: "Admin",
            monto: "300",
            sunat: "Aceptado",
            accion: "accion"
        }
        
    ];

    const rows1 = [
        {
            id: 1,
            nombre: "Juan Perez",
            usuario: "Admin",
            cantidad: "100",
            fecha: "10/04/2024",
            nota: "Observaciones",
            
        },
        {
            id: 2,
            nombre: "Maria Lopez",
            usuario: "Admin",
            cantidad: "200",
            fecha: "10/04/2024",
            nota: "Observaciones",
            
        },
        {
            id: 3,
            nombre: "Pedro Ramirez",
            usuario: "Admin",
            cantidad: "300",
            fecha: "10/04/2024",
            nota: "Observaciones",
            
        }
        
    ];

    const customData = [
        { name: "Enero", ingresos: 30 },
        { name: "Febrero", ingresos: 25 },
        { name: "Marzo", ingresos: 40 },
        { name: "Abril", ingresos: 15 },
        { name: "Mayo", ingresos: 40 },
        { name: "Junio", ingresos: 30 },
        { name: "Julio", ingresos: 55 },
        { name: "Agosto", ingresos: 48 },
        { name: "Septiembre", ingresos: 39 },
        { name: "Octubre", ingresos: 67 },
        { name: "Noviembre", ingresos: 32 },
        { name: "Diciembre", ingresos: 76 },
        // Otros meses...
      ];
      
      const customTimeRanges = [
        { label: "Semana", value: "weekly" },
        { label: "Mensual", value: "monthly" },
        { label: "Anual", value: "yearly" },
      ];

    return (
        <div className="flex flex-col justify-start items-center min-h-screen text-lg w-full bg-sky-50 p-6">
            <IncomeChart
              data={customData}
              timeRanges={customTimeRanges}
              chartColor="#FF9500" // Color personalizado
              title="Resumen de egresos"
            />
            <div className="w-full max-w-7xl p-2 bg-white">
                {/* Tabla con barra de filtros */}
                <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-sm font-semibold">Resumen de pagos realizados</h2>
                        <DownloadButton label="Descargar" />
                    </div>

                    {/* Barra de filtros dentro de la tabla */}
                    <div className="flex flex-col mb-4 p-2 border-b border-gray-300">
                        {/* Botón de Filtrar */}
                        <div className="relative">
                            <div className="flex">
                                <button onClick={toggleFilterMenu} className="border border-gray-300 w-24 flex justify-center items-center">
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

                            <div className="flex items-center gap-1">
                                <span className="text-sm text-gray-500">Filtrado: </span>
                                <Button variant="text" size="small">
                                    Borrar todo
                                </Button>
                            </div>

                            {openFilterMenu && (
                                <div className="absolute z-10 mt-2 bg-white border border-gray-300 shadow-md rounded-md w-48">
                                    {!activeFilter && (
                                        <ul className="p-2">
                                            {/* Opciones principales: Ciclo y Estado */}
                                            <li
                                                onClick={() => handleSelectFilter("Ciclo")}
                                                className="cursor-pointer hover:bg-gray-100 p-2"
                                            >
                                                Usuario
                                            </li>
                                            <li
                                                onClick={() => handleSelectFilter("Estado")}
                                                className="cursor-pointer hover:bg-gray-100 p-2"
                                            >
                                                Estado
                                            </li>
                                        </ul>
                                    )}
                                    {/* Subopciones de Ciclo */}
                                    {activeFilter === "Ciclo" && (
                                        <ul className="p-2">
                                            {["Usuario", "Admin"].map((ciclo) => (
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
                                    {/* Subopciones de Estado */}
                                    {activeFilter === "Estado" && (
                                        <ul className="p-2">
                                            {["Enviado", "Rechazado","Pendiente"].map((estado) => (
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
                        </div>

                        {/* Chips de filtros seleccionados */}
                        <div className="flex justify-start gap-2">
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
                    {/* Fin de barra de filtros */}
                </div>

                {/* Componente de tabla */}
                <TableSA columns={columns} rows={rows} />
                <div className=" mb-5">
                    <span className="text-sm font-semibold">Resumen de pagos pendientes</span>
                </div>
                <TableSA columns={columns1} rows={rows1} />
                <PagosC/>

            </div>

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
        </div>
    );
}

export default Gastos;
