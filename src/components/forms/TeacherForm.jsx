import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  Button,
} from "@mui/material";
import FileUploadWidget from "../widgets/FileUploadWidget";

export default function TeacherForm({
  title = "Registrar Docente",
  onSubmit = () => {},
  readOnlyFields = [],
  isEdit = false,
}) {
  const [formData, setFormData] = useState({
    dni: "",
    fechaNacimiento: "",
    nombres: "",
    apellidos: "",
    direccion: "",
    correo: "",
    genero: "",
    celular: "",
    fechaIngreso: "",
    usuario: "",
    contrasena: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleGenderChange = (event) => {
    setFormData({ ...formData, genero: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isFieldReadOnly = (field) => readOnlyFields.includes(field);

  return (
    <div className="bg-[#d9ecffa6]">
      {/* Header */}
      <div className="bg-[#193D87] py-4">
        <h1 className="text-white text-lg font-bold ml-5">{title}</h1>
      </div>

      {/* Formulario */}
      <form className="p-6 flex flex-col gap-4 max-w-full mx-auto" onSubmit={handleSubmit}>
        {/* Primera sección (Datos personales) */}
        <div className="flex flex-col md:flex-row gap-10">
          <Card className="p-5 w-full rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {[
                { id: "dni", label: "DNI *", type: "number" },
                { id: "fechaNacimiento", label: "Fecha de nacimiento *", type: "date" },
                { id: "nombres", label: "Nombres *", type: "text" },
                { id: "apellidos", label: "Apellidos *", type: "text" },
                { id: "direccion", label: "Dirección *", type: "text" },
                { id: "correo", label: "Correo *", type: "email" },
                { id: "celular", label: "Celular *", type: "number" },
                { id: "fechaIngreso", label: "Fecha de ingreso *", type: "date" },
              ].map(({ id, label, type }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                    {label}
                  </label>
                  <TextField
                    fullWidth
                    id={id}
                    type={type}
                    variant="outlined"
                    size="small"
                    value={formData[id]}
                    onChange={handleChange}
                    disabled={isFieldReadOnly(id)}
                  />
                </div>
              ))}

              <div>
                <label htmlFor="genero" className="block text-sm font-medium text-gray-700">
                  Género
                </label>
                <FormControl fullWidth size="small">
                  <InputLabel id="gender-label">Seleccionar género</InputLabel>
                  <Select
                    labelId="gender-label"
                    id="genero"
                    value={formData.genero}
                    onChange={handleGenderChange}
                    disabled={isFieldReadOnly("genero")}
                    label="Seleccionar género"
                  >
                    <MenuItem value="">
                      <em>Seleccionar</em>
                    </MenuItem>
                    <MenuItem value="Hombre">Hombre</MenuItem>
                    <MenuItem value="Mujer">Mujer</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          </Card>

          {/* Segunda sección (Foto y credenciales) */}
          <Card className="p-4 w-full md:w-1/3">
            <div>
              <FileUploadWidget label="Foto de perfil *" id="perfil-upload" />
              <div className="mt-4">
                {[
                  { id: "usuario", label: "Usuario *", type: "text" },
                  { id: "contrasena", label: "Contraseña *", type: "password" },
                ].map(({ id, label, type }) => (
                  <div key={id} className="mt-4">
                    <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                      {label}
                    </label>
                    <TextField
                      id={id}
                      type={type}
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={formData[id]}
                      onChange={handleChange}
                      disabled={isFieldReadOnly(id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Botones */}
        <div className="flex justify-end gap-4 mt-6">
          <Button size="medium" onClick={() => setFormData({})}>
            Cancelar
          </Button>
          <Button variant="contained" size="medium" type="submit">
            {isEdit ? "Actualizar" : "Agregar"}
          </Button>
        </div>
      </form>
    </div>
  );
}
