import React, { useState } from "react";
import FormSchedules from "./FormAddSchedules";
import SearchBarM from "./SearchBarM";
import { Button } from "../Buttom";
import { SquarePen, Trash2, Search } from "lucide-react";
import TablePagination from "@mui/material/TablePagination";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const TableSchedules = () => {
  const [horarios, setHorarios] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [horarioEditando, setHorarioEditando] = useState(null);
  const [search, setSearch] = useState(""); // Estado para el buscador

  // Estados para paginación
  const [page, setPage] = useState(0); // Página actual
  const [rowsPerPage, setRowsPerPage] = useState(5); // Filas por página

  // Agregar o editar horario
  const manejarHorario = (nuevoHorario) => {
    if (horarioEditando !== null) {
      const nuevosHorarios = horarios.map((hor, index) =>
        index === horarioEditando ? nuevoHorario : hor
      );
      setHorarios(nuevosHorarios);
    } else {
      setHorarios([...horarios, nuevoHorario]);
    }
    setHorarioEditando(null);
    setMostrarFormulario(false);
  };

  // Eliminar horario
  const eliminarHorario = (index) => {
    const nuevosHorarios = horarios.filter((_, i) => i !== index);
    setHorarios(nuevosHorarios);
  };

  // Abrir formulario para edición
  const editarHorario = (index) => {
    setHorarioEditando(index);
    setMostrarFormulario(true);
  };

  // Filtrar horarios en tiempo real
  const filteredHorarios = horarios.filter((hor) =>
    hor.doctor.toLowerCase().includes(search.toLowerCase())
  );

  // Obtener datos paginados
  const paginatedHorarios = filteredHorarios.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  return (
    <div className="container mx-auto p-6">
      <div className="p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold text-black-700">
          📑 Lista de horarios
        </h2>
      </div>

      <div className="buttons-cont">
        <button
          className="buttonAddMedicine"
          onClick={() => {
            setHorarioEditando(null);
            setMostrarFormulario(true);
          }}
        >
          ➕
        </button>
      </div>

      <div className="flex justify-center mb-6 pt-6">
        <div className="relative w-full max-w-md">
          {/* Icono de búsqueda dentro del input */}
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={24}
          />
          {/* Input con padding izquierdo para evitar superposición */}
          <input
            type="text"
            placeholder="Buscar doctor por nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-sm
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md hover:shadow-lg
        transition-all duration-300 ease-in-out text-lg"
          />
        </div>
      </div>

      {/* Formulario */}
      <FormSchedules
        open={mostrarFormulario}
        onClose={() => setMostrarFormulario(false)}
        onAgregar={manejarHorario}
        horarioActual={
          horarioEditando !== null ? horarios[horarioEditando] : null
        }
      />
      <div
        style={{ background: "oklch(0.87 0.065 274.039)" }}
        className="flex justify-start w-full"
      >
        <TablePagination
          component="div"
          rowsPerPageOptions={[1, 5, 8]}
          count={horarios.length}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
          labelRowsPerPage="Mostrar:"
          labelDisplayedRows={() => `Registros`}
          ActionsComponent={() => null} // Oculta las flechas
          sx={{
            "& .MuiTablePagination-select": {
              backgroundColor: "white", // Color del fondo del selector
              padding: "5px",
              borderRadius: "5px",
            },
            "& .MuiToolbar": {
              backgroundColor: "#ffd700", // Color del fondo del selector
              padding: "5px",
              borderRadius: "5px",
            },
          }}
        />
      </div>

      {/* Tabla con paginación */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md">
          <thead>
            <tr className="bg-[#F1F5F9]">
              <th className="border p-2">Días de atención médica</th>
              <th className="border p-2">Doctor</th>
              <th className="border p-2">Fecha de registro</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedHorarios.length > 0 ? (
              paginatedHorarios.map((hor, index) => (
                <tr key={index}>
                  <td className="border p-2">{hor.dia}</td>
                  <td className="border p-2">{hor.doctor}</td>
                  <td className="border p-2">{hor.fechaDeRegistro}</td>
                  <td className="border p-2">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        style={{ backgroundColor: "#fbbf24" }}
                        onClick={() => editarHorario(index)}
                      >
                        <SquarePen className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        style={{ backgroundColor: "#ef4444" }}
                        onClick={() => eliminarHorario(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No se encontraron resultados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col items-center mt-4">
        {/* Selector de filas por página */}

        <div className="flex justify-start w-full">
          <TablePagination
            component="div"
            rowsPerPageOptions={[]} // Oculta el selector de filas
            count={horarios.length}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
            labelRowsPerPage="" // Oculta "Filas por página:"
            labelDisplayedRows={({ from, to, count }) =>
              `Mostrando ${from}-${to} de ${count} registros`
            }
            ActionsComponent={() => null} // Oculta las flechas
            sx={{
              "& .MuiTablePagination-selectLabel": { display: "none" }, // Oculta "Filas por página:"
              "& .MuiTablePagination-select": { display: "none" }, // Oculta el selector de filas
            }}
          />
        </div>

        {/* Paginación con números y flechas */}
        <Stack
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Pagination
            count={Math.ceil(horarios.length / rowsPerPage)} // Total de páginas
            page={page + 1} // MUI usa 1-based index
            onChange={(event, value) => setPage(value - 1)}
            variant="outlined"
            shape="rounded"
          />
        </Stack>
      </div>
    </div>
  );
};

export default TableSchedules;
