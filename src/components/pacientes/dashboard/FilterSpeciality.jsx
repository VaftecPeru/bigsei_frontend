import * as React from "react";
import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import SpecialtyDataExample from "./SpecialtyDataExample"; // Asegúrate de que la ruta sea correcta

export default function FilterSpeciality() {
  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Select
        multiple
        id="tags-standard"
        category=""
        className="div-filtrado-especialidad"
        options={SpecialtyDataExample} // Usa SpecialtyDataExample
        getOptionLabel={(option) => option.nombre} // Accede a la propiedad correcta
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Seleccionar especialidad"
            placeholder="Especialidades"
          />
        )}
      />
    </Stack>
  );
}
