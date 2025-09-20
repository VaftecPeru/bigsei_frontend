import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  FormControl,
  Autocomplete,
  InputLabel,
  Select,
  MenuItem,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import SpecialtyDataExample from "./SpecialtyDataExample";
import { useState } from "react";

const DoctorForm = ({
  open,
  handleClose,
  form,
  handleChange,
  handleSave,
  isEdit,
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSaveWithValidation = () => {
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;

    const phoneRegex =
      /^\+?\d{1,3}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (
      !form.nombre ||
      !form.especialidad ||
      !form.sexo ||
      !form.telefono ||
      !form.fechaDeNacimiento ||
      !form.correo ||
      !form.fechaDeRegistro
    ) {
      setSnackbarMessage("Todos los campos deben llenarse.");
      setSnackbarOpen(true);
      return;
    } else if (!nameRegex.test(form.nombre)) {
      setSnackbarMessage("El nombre solo puede contener letras y espacios.");
      setSnackbarOpen(true);
      return;
    } else if (!phoneRegex.test(form.telefono)) {
      setSnackbarMessage("Número de teléfono inválido.");
      setSnackbarOpen(true);
      return;
    } else if (!form.correo.includes("@")) {
      setSnackbarMessage("Incluya @ en la dirección de correo electrónico.");
      setSnackbarOpen(true);
      return;
    } else if (!emailRegex.test(form.correo)) {
      setSnackbarMessage("Correo electrónico inválido.");
      setSnackbarOpen(true);
      return;
    }

    handleSave();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{isEdit ? "Editar Doctor" : "Agregar Doctor"}</DialogTitle>
      <DialogContent>
        {isEdit && (
          <TextField
            margin="dense"
            label="ID"
            fullWidth
            value={form.id}
            disabled
          />
        )}
        <TextField
          margin="dense"
          label="Nombre"
          name="nombre"
          fullWidth
          value={form.nombre}
          onChange={handleChange}
        />

        <FormControl fullWidth margin="dense">
          <Autocomplete
            options={SpecialtyDataExample}
            getOptionLabel={(option) => option.nombre}
            value={SpecialtyDataExample.find(
              (option) => option.nombre === form.especialidad
            )}
            onChange={(event, newValue) => {
              handleChange({
                target: {
                  name: "especialidad",
                  value: newValue ? newValue.nombre : "",
                },
              });
            }}
            renderInput={(params) => (
              <TextField {...params} label="Especialidad" fullWidth />
            )}
          />
        </FormControl>

        <FormControl fullWidth margin="dense" variant="outlined">
          <InputLabel id="sexo-label">Sexo</InputLabel>
          <Select
            labelId="sexo-label"
            name="sexo"
            value={form.sexo}
            onChange={handleChange}
            label="Sexo"
          >
            <MenuItem value="Masculino">Masculino</MenuItem>
            <MenuItem value="Femenino">Femenino</MenuItem>
            <MenuItem value="Otro">Otro</MenuItem>
          </Select>
        </FormControl>
        <TextField
          margin="dense"
          label="Teléfono"
          name="telefono"
          fullWidth
          value={form.telefono}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Fecha de Nacimiento"
          name="fechaDeNacimiento"
          type="date"
          value={form.fechaDeNacimiento}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          margin="dense"
          label="Correo"
          name="correo"
          type="email"
          fullWidth
          value={form.correo}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          margin="dense"
          label="Fecha y Hora de Registro"
          name="fechaDeRegistro"
          type="datetime-local"
          value={form.fechaDeRegistro}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSaveWithValidation}
          sx={{
            color: "white",
            backgroundColor: "rgb(12, 19, 88)",
            "&:hover": { backgroundColor: "rgb(122, 38, 210)" },
          }}
        >
          {isEdit ? "Guardar" : "Agregar"}
        </Button>
        <Button onClick={handleClose} color="error">
          Cancelar
        </Button>
      </DialogActions>

      {/* Snackbar para mostrar mensajes de error */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        message={
          <div className="flex items-center">
            <svg
              className="shrink-0 inline w-4 h-4 me-3 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="text-white">{snackbarMessage}</span>
          </div>
        }
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        ContentProps={{
          sx: {
            backgroundColor: "red",
            color: "white",
          },
        }}
      />
    </Dialog>
  );
};

export default DoctorForm;
