import React, { useState } from "react";
import FormSpecialtyes from "./FormSpecialtyes";
import SearchBarM from "./SearchBarM";
import { Button } from "../Buttom";
import { SquarePen, Trash2, Search } from "lucide-react";
import TablePagination from "@mui/material/TablePagination";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const TableSpecialtyes = () => {
  const [especialidades, setEspecialidades] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [especialidadEditando, setEspecialidadEditando] = useState(null);
  const [search, setSearch] = useState(""); // Estado para el buscador

  // Estados para paginación
  const [page, setPage] = useState(0); // Página actual
  const [rowsPerPage, setRowsPerPage] = useState(5); // Filas por página

  // Agregar o editar especialidad
  const manejarEspecialidad = (nuevaEspecialidad) => {
    if (especialidadEditando !== null) {
      const nuevasEspecialidades = especialidades.map((esp, index) =>
        index === especialidadEditando ? nuevaEspecialidad : esp
      );
      setEspecialidades(nuevasEspecialidades);
    } else {
      setEspecialidades([...especialidades, nuevaEspecialidad]);
    }
    setEspecialidadEditando(null);
    setMostrarFormulario(false);
  };

  // Eliminar especialidad
  const eliminarEspecialidad = (index) => {
    const nuevasEspecialidades = especialidades.filter((_, i) => i !== index);
    setEspecialidades(nuevasEspecialidades);
  };

  // Abrir formulario para edición
  const editarEspecialidad = (index) => {
    setEspecialidadEditando(index);
    setMostrarFormulario(true);
  };

  // Filtrar especialidades en tiempo real
  const filteredEspecialidades = especialidades.filter((esp) =>
    esp.especialidad.toLowerCase().includes(search.toLowerCase())
  );

  // Obtener datos paginados
  const paginatedEspecialidades = filteredEspecialidades.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="container mx-auto p-6">
      <div className="p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold text-black-700">
          📑 Lista de especialidades
        </h2>
      </div>

      <div className="buttons-cont">
        <button
          className="buttonAddMedicine"
          onClick={() => {
            setEspecialidadEditando(null);
            setMostrarFormulario(true);
          }}
        >
          ➕
        </button>
      </div>

      <div className="flex justify-center mb-6 pt-6">
        <div className="relative w-full max-w-md">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={24}
          />
          <input
            type="text"
            placeholder="Buscar especialidad..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md hover:shadow-lg transition-all duration-300 ease-in-out text-lg"
          />
        </div>
      </div>

      <FormSpecialtyes
        open={mostrarFormulario}
        onClose={() => setMostrarFormulario(false)}
        onAgregar={manejarEspecialidad}
        especialidadActual={
          especialidadEditando !== null
            ? especialidades[especialidadEditando]
            : null
        }
      />

      <div
        style={{ background: "oklch(0.87 0.065 274.039)" }}
        className="flex justify-start w-full"
      >
        <TablePagination
          component="div"
          rowsPerPageOptions={[1, 5, 8]}
          count={especialidades.length}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
          labelRowsPerPage="Mostrar:"
          labelDisplayedRows={() => `Registros`}
          ActionsComponent={() => null}
          sx={{
            "& .MuiTablePagination-select": {
              backgroundColor: "white",
              padding: "5px",
              borderRadius: "5px",
            },
            "& .MuiToolbar": {
              backgroundColor: "#ffd700",
              padding: "5px",
              borderRadius: "5px",
            },
          }}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-md">
          <thead>
            <tr className="bg-[#F1F5F9]">
              <th className="border p-2">Especialidad Médica</th>
              <th className="border p-2">Fecha de registro</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {paginatedEspecialidades.length > 0 ? (
              paginatedEspecialidades.map((esp, index) => (
                <tr key={index}>
                  <td className="border p-2">{esp.especialidad}</td>
                  <td className="border p-2">{esp.fechaDeRegistro}</td>
                  <td className="border p-2">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        style={{ backgroundColor: "#fbbf24" }}
                        onClick={() => editarEspecialidad(index)}
                      >
                        <SquarePen className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        style={{ backgroundColor: "#ef4444" }}
                        onClick={() => eliminarEspecialidad(index)}
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
    </div>
  );
};

export default TableSpecialtyes;
