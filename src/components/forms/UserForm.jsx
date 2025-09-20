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
} from "@mui/material";
import FileUploadWidget from "../widgets/FileUploadWidget";

export default function UserForm() {
    const [gender, setGender] = useState("");

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    return (
        <div className="bg-[#d9ecffa6]">
            {/* Header */}
            <div className="bg-[#193D87] py-4">
                <h1 className="text-white text-lg font-bold ml-5">REGISTRAR USUARIO</h1>
            </div>

            {/* Formulario */}
            <form className="p-6 flex flex-col gap-4 max-w-7xl mx-auto">
                {/* Primera sección (Datos personales) */}
                <div className="flex flex-col md:flex-row gap-10 items-center">
                    <Card className="p-5 w-full rounded-lg">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div>
                                <label htmlFor="dni" className="block text-sm font-medium text-gray-700">
                                    DNI *
                                </label>
                                <TextField fullWidth id="dni" type="number" variant="outlined" size="small" />
                            </div>
                            <div className="w-full md:w-1/2 md:ml-auto">
                                <label htmlFor="fecha" className="block text-sm font-medium text-gray-700">
                                    Fecha de nacimiento *
                                </label>
                                <TextField fullWidth id="fecha" type="date" variant="outlined" size="small" />
                            </div>

                            <div>
                                <label htmlFor="nombres" className="block text-sm font-medium text-gray-700">
                                    Nombres *
                                </label>
                                <TextField fullWidth id="nombres" type="text" variant="outlined" size="small" />
                            </div>
                            <div>
                                <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700">
                                    Apellidos *
                                </label>
                                <TextField fullWidth id="apellidos" type="text" variant="outlined" size="small" />
                            </div>

                            <div>
                                <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">
                                    Dirección *
                                </label>
                                <TextField fullWidth id="direccion" type="text" variant="outlined" size="small" />
                            </div>
                            <div>
                                <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
                                    Correo *
                                </label>
                                <TextField fullWidth id="correo" type="email" variant="outlined" size="small" />
                            </div>

                            <div>
                                <label htmlFor="genero" className="block text-sm font-medium text-gray-700">
                                    Género
                                </label>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="gender-label">Seleccionar género</InputLabel>
                                    <Select
                                        labelId="gender-label"
                                        id="genero"
                                        value={gender}
                                        onChange={handleGenderChange}
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

                            <div>
                                <label htmlFor="celular" className="block text-sm font-medium text-gray-700">
                                    Celular *
                                </label>
                                <TextField fullWidth id="celular" type="number" variant="outlined" size="small" />
                            </div>

                            <div>
                                <label htmlFor="genero" className="block text-sm font-medium text-gray-700">
                                    Rol
                                </label>
                                <FormControl fullWidth size="small">
                                    <InputLabel id="gender-label">Rol de usuario</InputLabel>
                                    <Select
                                        labelId="gender-label"
                                        id="Rol"
                                        value={gender}
                                        onChange={handleGenderChange}
                                        label="Seleccionar Rol"
                                    >
                                        <MenuItem value="">
                                            <em>Seleccionar</em>
                                        </MenuItem>
                                        <MenuItem value="Hombre">Usuario1</MenuItem>
                                        <MenuItem value="Mujer">Usuario2</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>

                            <div>
                                <label htmlFor="fecha-ingreso" className="block text-sm font-medium text-gray-700">
                                    Fecha de ingreso *
                                </label>
                                <TextField fullWidth id="fecha-ingreso" type="date" variant="outlined" size="small" />
                            </div>
                        </div>
                    </Card>

                    {/* Segunda sección (Foto y credenciales) */}
                    <div className="flex flex-col gap-4 w-full md:w-1/3 justify-center items-center">
                        <Card className="p-6">
                            <div>
                                <FileUploadWidget label="Foto de perfil *" id="perfil-upload" />
                                <div className="mt-4">
                                    <div>
                                        <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">
                                            Usuario *
                                        </label>
                                        <TextField id="usuario" type="text" variant="outlined" size="small" fullWidth />
                                    </div>
                                    <div className="mt-4">
                                        <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">
                                            Contraseña *
                                        </label>
                                        <TextField id="contrasena" type="password" variant="outlined" size="small" fullWidth />
                                    </div>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-4">
                            <CardContent>
                                <Box display="flex" flexDirection="column" mb={2}>
                                    <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: "bold" }}>
                                        Nombre Nombre Apellido Apellido
                                    </Typography>
                                </Box>
                                <Box display="flex" flexDirection="column" mb={2}>
                                    <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: "bold" }}>
                                        Nombre de curso
                                    </Typography>
                                </Box>
                                <Box display="flex" flexDirection="column">
                                    <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: "bold" }}>
                                        Presencial:
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Botones */}
                <div className="flex justify-end gap-4 mt-6">
                    <Button size="medium" color="">
                        Cancelar
                    </Button>
                    <Button variant="contained" size="medium">
                        Agregar
                    </Button>
                </div>
            </form>
        </div>
    );
}
