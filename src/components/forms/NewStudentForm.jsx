import React, { useState } from "react";
import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Card,
    CardContent,
    Typography,
    Box,
    Button,
    ToggleButton,
    ToggleButtonGroup,
} from "@mui/material";
import FileUploadWidget from "../widgets/FileUploadWidget";

// Componente reutilizable para campos de texto con etiquetas
const TextFieldWithLabel = ({ label, id, type = "text", required = false }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label} {required && "*"}
        </label>
        <TextField fullWidth id={id} type={type} variant="outlined" size="small" />
    </div>
);

// Componente reutilizable para menús desplegables con etiquetas
const SelectWithLabel = ({ label, id, options, value, onChange }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
            {label}
        </label>
        <FormControl fullWidth size="small">
            <InputLabel id={`${id}-label`}>{`Seleccionar ${label.toLowerCase()}`}</InputLabel>
            <Select
                labelId={`${id}-label`}
                id={id}
                value={value}
                onChange={onChange}
                label={`Seleccionar ${label.toLowerCase()}`}
            >
                <MenuItem value="">
                    <em>Seleccionar</em>
                </MenuItem>
                {options.map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </div>
);

// Componente reutilizable para ToggleButtonGroup
const ToggleButtonGroupWithLabel = ({ value, onChange, options }) => (
    <ToggleButtonGroup value={value} exclusive onChange={onChange} aria-label="text alignment">
        {options.map(({ value, label }) => (
            <ToggleButton key={value} value={value} aria-label={value}>
                {label}
            </ToggleButton>
        ))}
    </ToggleButtonGroup>
);

export default function NewStudentForm() {
    const [gender, setGender] = useState("");
    const [alignment, setAlignment] = useState("nuevo");

    const handleAlignment = (event, newAlignment) => setAlignment(newAlignment);
    const handleGenderChange = (event) => setGender(event.target.value);

    const dropdownOptions = {
        ciclo: ["Primero", "Segundo", "Tercero"],
        curso: ["Matemáticas", "Historia", "Ciencias"],
        modalidad: ["Presencial", "Híbrido", "Virtual"],
    };

    return (
        <div className="min-h-screen text-2xl w-full bg-sky-50 p-6">
            <div className="bg-[#193D87] py-4">
                <h1 className="text-white text-lg font-bold ml-5">REGISTRAR ALUMNO</h1>
            </div>

            <form className="p-6 flex flex-col gap-4 max-w-8xl h-full">
                <div className="flex flex-col md:flex-row gap-10">
                    <Card className="p-5 w-full rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="flex gap-4">
                                <ToggleButtonGroupWithLabel
                                    value={alignment}
                                    onChange={handleAlignment}
                                    options={[
                                        { value: "nuevo", label: "Nuevo" },
                                        { value: "regular", label: "Regular" },
                                    ]}
                                />
                            </div>
                            <TextFieldWithLabel label="DNI" id="dni" type="number" required />
                            <TextFieldWithLabel label="Nombres" id="nombres" required />
                            <TextFieldWithLabel label="Apellidos" id="apellidos" required />
                            <TextFieldWithLabel label="Dirección" id="direccion" required />
                            <TextFieldWithLabel label="Correo" id="correo" type="email" required />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                            <TextFieldWithLabel label="Fecha de nacimiento" id="nacimiento" type="date" />
                            <TextFieldWithLabel label="Celular" id="celular" type="number" required />
                            <SelectWithLabel
                                label="Género"
                                id="genero"
                                options={["Hombre", "Mujer"]}
                                value={gender}
                                onChange={handleGenderChange}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                            {Object.keys(dropdownOptions).map((key) => (
                                <SelectWithLabel
                                    key={key}
                                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                                    id={key}
                                    options={dropdownOptions[key]}
                                    value={gender} // Esto puede personalizarse
                                    onChange={handleGenderChange}
                                />
                            ))}
                        </div>
                    </Card>

                    {/* Segunda sección */}
                    <div className="flex flex-col gap-4 w-full md:w-1/3">
                        <Card className="p-4">
                            <FileUploadWidget label="Foto de perfil *" id="perfil-upload" />
                            <TextFieldWithLabel label="Usuario" id="usuario" required />
                            <TextFieldWithLabel label="Contraseña" id="contrasena" type="password" required />
                        </Card>

                        <Card className="p-4">
                            <CardContent>
                                <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: "bold" }}>
                                    Nombre Nombre Apellido Apellido
                                </Typography>
                                <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: "bold" }}>
                                    Nombre de curso
                                </Typography>
                                <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: "bold" }}>
                                    Presencial:
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                    <Button size="medium">Cancelar</Button>
                    <Button variant="contained" size="medium">
                        Agregar
                    </Button>
                </div>
            </form>
        </div>
    );
}
