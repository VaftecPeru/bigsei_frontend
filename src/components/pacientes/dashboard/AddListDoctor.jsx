import React, { useState } from "react";
import initialData from "./initialData";
import DoctorForm from "./DoctorForm";
import "./animate-bounce.css";
import FilterSpeciality from "./FilterSpeciality";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Pagination,
} from "@mui/material";
import { Search, ArrowDown, Trash2, Edit2 } from "lucide-react";
import TablePagination from "@mui/material/TablePagination";

const AddListDoctor = () => {
  const [data, setData] = useState(initialData);
  const [openEdit, setOpenEdit] = useState(false);
  const [openInsert, setOpenInsert] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [form, setForm] = useState({
    id: "",
    nombre: "",
    especialidad: "",
    sexo: "",
    telefono: "",
    fechaDeNacimiento: "",
    correo: "",
    fechaDeRegistro: "",
  });

  const handleOpenEdit = (dato) => {
    setForm(dato);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  // Aqui se asigna el ID, se asigna un valor automaticamente, siguiendo el orden de +1
  const handleOpenInsert = () => {
    setForm({
      id: data.length + 1,
      nombre: "",
      especialidad: "",
      sexo: "",
      telefono: "",
      fechaDeNacimiento: "",
      correo: "",
      fechaDeRegistro: "",
    });
    setOpenInsert(true);
  };

  const handleCloseInsert = () => {
    setOpenInsert(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setData(data.map((d) => (d.id === form.id ? form : d)));
    setOpenEdit(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este nombre?")) {
      setData(data.filter((d) => d.id !== id));
    }
  };

  const handleInsert = () => {
    setData([...data, form]);
    setOpenInsert(false);
  };

  const searcher = (e) => {
    setSearch(e.target.value);
  };
  let results = [];
  if (!search) {
    results = data;
  } else {
    results = data.filter((dato) =>
      dato.nombre.toLowerCase().includes(search.toLowerCase())
    );
  }

  const paginatedResults = results.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="flex flex-col space-y-8">
      {/* div con tabla y paginación */}
      <div
        style={{ padding: 20 }}
        className=" shadow-lg flex flex-col space-y-8"
      >
        {/* Div contenedor del titulo */}
        <div
          className="flex text-center items-center justify-center p-4 border 
                     bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] 
                     border-transparent rounded-t-lg shadow-md"
        >
          <div
            className="pattern-vertical-lines pattern-blue-500 pattern-bg-white 
        pattern-size-6 pattern-opacity-20"
          ></div>

          <Typography variant="h4" gutterBottom className=" font-semibold">
            Lista de Doctores
          </Typography>
        </div>

        <div
          className="relative h-auto w-full flex flex-col items-center justify-center
    p-4 shadow-lg rounded-lg bg-[#F1F5F9]"
        >
          {/* Fondo con degradado */}
          <div className="absolute inset-0 shadow-[inset_0_-1px_0_rgba(22,27,59,0.04)] pointer-events-none"></div>

          {/* Franja horizontal */}
          <div className="absolute top-[20%] left-0 w-full h-12 bg-white -translate-y-1/2 z-10"></div>

          {/* Franja vertical */}
          <div className="absolute left-[10%] top-0 h-full w-12 bg-white -translate-x-1/2 z-10"></div>

          {/* Contenido principal */}
          <div className="relative flex flex-col items-center text-center space-y-4 z-20 p-4 pt-[90px]">
            <ArrowDown className="w-8 h-8 text-blue-500 animate-bounce mb-2" />
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpenInsert}
              className="bg-gradient-to-r from-sky-500 to-blue-700 shadow-lg hover:bg-white hover:text-blue-500 hover:bg-clip-text transition-all ease-in-out duration-300"
            >
              AÑADIR DOCTOR
            </Button>
          </div>

          {/* Buscador con menor espacio */}
          <div className="flex justify-center mb-2 pt-10">
            <div className="absolute w-full max-w-sm ">
              <div>
                <Search
                  className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500"
                  size={30}
                />
              </div>
              <input
                type="text"
                placeholder="Buscar doctor por nombre..."
                value={search}
                onChange={searcher}
                className="w-full pl-12  pr-4 py-3 border border-gray-300 rounded-lg text-sm before:bg-red-500
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-md hover:shadow-lg
                 transition-all duration-300 ease-in-out text-lg"
              />
            </div>
          </div>
        </div>

        {/* Table Pagination fuera de la tabla */}
        <TablePagination
          rowsPerPageOptions={[3, 5, 10]}
          component="div"
          count={results.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) => {
            setRowsPerPage(parseInt(event.target.value, 10));
            setPage(0);
          }}
          labelRowsPerPage="Filas por página:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count} registros`
          }
          ActionsComponent={() => null} // Oculta las flechas de TablePagination
          className="flex bg-gradient-to-br from-blue-700 via-violet-600 to-indigo-800 shadow-md"
        />

        {/* Table Container con bordes redondeados y sombra */}
        <TableContainer
          component={Paper}
          style={{
            marginTop: 20,
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="font-semibold text-sm text-center">
                  ID
                </TableCell>
                <TableCell className="font-semibold text-sm text-center">
                  Nombre
                </TableCell>
                <TableCell className="font-semibold text-sm text-center">
                  Especialidad
                </TableCell>
                <TableCell className="font-semibold text-sm text-center">
                  Sexo
                </TableCell>
                <TableCell className="font-semibold text-sm text-center">
                  Telefono
                </TableCell>
                <TableCell className="font-semibold text-sm text-center">
                  Fecha de nacimiento
                </TableCell>
                <TableCell className="font-semibold text-sm text-center">
                  Correo
                </TableCell>
                <TableCell className="font-semibold text-sm text-center">
                  Fecha de registro
                </TableCell>
                <TableCell className="font-semibold text-sm text-center">
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedResults.map((dato) => (
                <TableRow
                  key={dato.id}
                  className="hover:bg-gray-100 transition-all duration-300"
                >
                  <TableCell className="text-center">{dato.id}</TableCell>
                  <TableCell className="text-center">{dato.nombre}</TableCell>
                  <TableCell className="text-center">
                    {dato.especialidad}
                  </TableCell>
                  <TableCell className="text-center">{dato.sexo}</TableCell>
                  <TableCell className="text-center">{dato.telefono}</TableCell>
                  <TableCell className="text-center">
                    {dato.fechaDeNacimiento}
                  </TableCell>
                  <TableCell className="text-center">{dato.correo}</TableCell>
                  <TableCell className="text-center">
                    {dato.fechaDeRegistro}
                  </TableCell>
                  <TableCell className="text-center space-x-2">
                    <Button
                      variant="contained"
                      color="#FBBF24"
                      onClick={() => handleOpenEdit(dato)}
                      className="hover:bg-blue-600 transition-all duration-300 flex items-center gap-2"
                    >
                      <Edit2 className="w-5 h-5" />
                      {/* Ícono dentro del botón */}
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(dato.id)}
                      className=" hover:bg-red-600 transition-all duration-300"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Paginación */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Pagination
            count={Math.ceil(results.length / rowsPerPage)}
            page={page + 1}
            onChange={(event, value) => setPage(value - 1)}
            color="flex bg-gradient-to-br from-blue-700 via-violet-600 to-indigo-800 shadow-md"
          />
        </div>

        {/* Modal de Editar */}
        <DoctorForm
          open={openEdit}
          handleClose={handleCloseEdit}
          form={form}
          handleChange={handleChange}
          handleSave={handleEdit}
          isEdit={true} // Indica que es edición
        />

        <DoctorForm
          open={openInsert}
          handleClose={handleCloseInsert}
          form={form}
          handleChange={handleChange}
          handleSave={handleInsert}
          isEdit={false} // Indica que es inserción
        />
      </div>
    </div>
  );
};

export default AddListDoctor;
