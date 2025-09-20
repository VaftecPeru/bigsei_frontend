import React, { useState } from "react";
import {
  TextField,
  Card,
  CardContent,
  Typography,
  Button,
} from "@mui/material";

function PeriodForm() {
  const [periodName, setPeriodName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      periodName,
      startDate,
      endDate,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-[#193D87] py-4">
        <h1 className="text-white text-lg font-bold ml-5">REGISTRAR ALUMNO</h1>
      </div>

      <div className="flex-grow flex items-center justify-center bg-gray-100 p-4">
        <Card className="w-full max-w-md shadow-lg rounded-lg p-10 py-12">
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label
                  htmlFor="periodName"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Nombre del período *
                </label>
                <TextField
                  fullWidth
                  id="periodName"
                  placeholder="Escribe el nombre del período"
                  value={periodName}
                  onChange={(e) => setPeriodName(e.target.value)}
                  size="small"
                  variant="outlined"
                />
              </div>
 
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Fecha de inicio *
                </label>
                <TextField
                  fullWidth
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  size="small"
                  variant="outlined"
                />
              </div>
              
              <div>
                <label
                  htmlFor="endDate"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Fecha de fin *
                </label>
                <TextField
                  fullWidth
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  size="small"
                  variant="outlined"
                />
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center gap-4 ml-40 pb-6">
        <Button
          variant="outlined"
          size="medium"
          className="w-32"
          onClick={() => console.log("Cancelar")}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          size="medium"
          color="info"
          type="submit"
          className="w-32"
        >
          Agregar
        </Button>
      </div>
    </div>
  );
}

export default PeriodForm;
