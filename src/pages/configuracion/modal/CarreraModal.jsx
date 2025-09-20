import { Dialog, Button, TextField } from "@mui/material";
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { Api_Global_Setup } from "../../../services/SetupApi";
import apiClient from "../../../Utils/apiClient";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

export default function CarreraModal({ onClose, idCarreraEdit }) {
  const [isLoading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      fecha_inicio: "",
      nombre: "",
      estado: "1",
    },
  });

  const handleClose = () => {
    onClose();
  };

  const handleSave = (data) => {
    if (idCarreraEdit) {
      handleEditar(data);
    } else {
      handleRegistrar(data);
    }
  };

  const handleRegistrar = (data) => {
    setLoading(true);
    apiClient.post(Api_Global_Setup.carreras.registrar(), data)
      .then((response) => {
        setLoading(false);
        toast.success("Realizado.");
        handleClose();
      })
      .catch((error) => {
        setLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleEditar = (data) => {
    setLoading(true);
    apiClient.put(Api_Global_Setup.carreras.editar(idCarreraEdit), data)
      .then((response) => {
        setLoading(false);
        toast.success("Realizado.");
        handleClose();
      })
      .catch((error) => {
        setLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleCarrera = () => {
    setLoading(true);
    apiClient.get(Api_Global_Setup.carreras.mostrar(idCarreraEdit))
      .then((response) => {
        setLoading(false);
        setValue("nombre", response.data.nombre);
        setValue("fecha_inicio", response.data.fecha_inicio);
        setValue("estado", response.data.estado);
      })
      .catch((error) => {
        setLoading(false);
        toast.warning(error.response.data);
      });
  };

  useEffect(() => {
    if (idCarreraEdit) {
      handleCarrera();
    }
  }, []);

  return (
    <Dialog open={true} maxWidth="xs" fullWidth className="backdrop-blur-md">
      <div className="text-2xl p-2 font-bold text-gray-900 text-center py-4">{idCarreraEdit ? "Editar Carrera" : "Registrar Carrera"}</div>
      <hr />
      <form onSubmit={handleSubmit(handleSave)}>
        <div className="flex flex-col p-6 gap-4">
          <div>
            <label htmlFor="nombre" className="text-gray-500">Nombre:</label>
            <TextField
              fullWidth
              id="nombre"
              type="text"
              variant="outlined"
              size="small"
              {...register("nombre", { required: true })}
            />
            {errors.nombre && <span className="text-xs text-pink-500">Este campo es requerido</span>}
          </div>
          <div>
            <label htmlFor="fecha_inicio" className="text-gray-500">Fecha inicio:</label>
            <TextField
              fullWidth
              id="fecha_inicio"
              type="date"
              variant="outlined"
              size="small"
              {...register("fecha_inicio", { required: true })}
            />
            {errors.fecha_inicio && <span className="text-xs text-pink-500">Este campo es requerido</span>}
          </div>
          <div>
            <label htmlFor="estado" className="text-gray-500">Estado:</label>
            <select
              id="estado"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              {...register("estado", { required: true })}
            >
              <option value="1">ACTIVO</option>
              <option value="0">INACTIVO</option>
            </select>
            {errors.estado && <span className="text-xs text-pink-500">Este campo es requerido</span>}
          </div>
        </div>
        <hr />

        <div className="flex gap-2 py-4 justify-center">
          <Button onClick={handleClose} variant="outlined">
            {isLoading ? <ClipLoader color="#374151" size={20} /> : 'Cancelar'}
          </Button>
          <Button type="submit" variant="contained">
            {isLoading ? <ClipLoader color="#ffffff" size={20} /> : 'Guardar'}
          </Button>
        </div>
      </form>

    </Dialog>
  );
}