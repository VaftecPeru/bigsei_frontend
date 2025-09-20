import React, { useState } from "react";
import {
  TextField,
  Card,
  CardContent,
  Button,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

function CicloForm() {
  const [period, setPeriod] = useState(""); 

  const handlePeriodChange = (event) => {
    setPeriod(event.target.value); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      startDate,
      endDate,
      period,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      
      <div className="bg-[#193D87] py-6">
        <h1 className="text-white text-lg font-bold ml-8">REGISTRAR CICLO</h1>
      </div>

      <div className="flex-grow flex items-center justify-center bg-gray-100 py-10 px-4">
        <Card className="w-full max-w-lg shadow-xl rounded-lg">
          <CardContent className="p-2 space-y-6">
            
            <form onSubmit={handleSubmit} className="space-y-6 p-10 px-14">
              
              <div>
                <label
                  htmlFor="period"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Periodo
                </label>
                <FormControl fullWidth size="small">
                  <Select
                    labelId="period-select-label"
                    id="period"
                    value={period}
                    onChange={handlePeriodChange}
                    displayEmpty
                    label="Seleccionar periodo"
                  >
                    <MenuItem value="">
                      <em>Seleccionar periodo</em>
                    </MenuItem>
                    <MenuItem value={10}>Primer Periodo</MenuItem>
                    <MenuItem value={20}>Segundo Periodo</MenuItem>
                    <MenuItem value={30}>Tercer Periodo</MenuItem>
                  </Select>
                </FormControl>
              </div>

                <div>
                    <label htmlFor="dni" className="block text-sm font-medium text-gray-700">
                      Ciclo *
                    </label>
                    <TextField fullWidth id="dni" type="text" variant="outlined" size="small" />
                </div>

              
                <div>
                    <label htmlFor="dni" className="block text-sm font-medium text-gray-700">
                      Codico de ciclo *
                    </label>
                    <TextField fullWidth id="dni" type="number" variant="outlined" size="small" />
                </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Botones */}
      <div className="flex justify-center gap-8 py-6">
        <Button
          variant="outlined"
          size="large"
          className="w-36"
          onClick={() => console.log("Cancelar")}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          size="large"
          color="info"
          type="submit"
          className="w-36"
        >
          Agregar
        </Button>
      </div>
    </div>
  );
}

export default CicloForm;
