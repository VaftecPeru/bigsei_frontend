import { Dialog, DialogTitle, Button, TextField } from "@mui/material";
import { useState } from 'react';
import { useEffect } from "react";
import { Api_Global_Admin } from "../../../services/AdminApi";
import { Api_Global_Setup } from "../../../services/SetupApi";
import apiClient from "../../../Utils/apiClient";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import { useForm } from "react-hook-form";

export default function PlanDeEstudioAModal({ onClose, idPlanestudioEdit }) {
  const [isLoading, setLoading] = useState(false);
  const [carreras, setCarreras] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      id_carrera: "",
      fecha_inicio: "",
      nombre: "",
      estado: "1",
    },
  });

  const handleCloseModalAdd = () => {
    onClose(false);
  };

  const handleSave = (data) => {
    if (idPlanestudioEdit) {
      handleEditar(data);
    } else {
      handleRegistrar(data);
    }
  };

  const handleRegistrar = (data) => {
    setLoading(true);
    apiClient.post(Api_Global_Admin.planEstudios.registrar(), data)
      .then((response) => {
        setLoading(false);
        toast.success("Realizado.");
        handleCloseModalAdd();
      })
      .catch((error) => {
        setLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleEditar = (data) => {
    setLoading(true);
    apiClient.put(Api_Global_Admin.planEstudios.editar(idPlanestudioEdit), data)
      .then((response) => {
        setLoading(false);
        toast.success("Realizado.");
        handleCloseModalAdd();
      })
      .catch((error) => {
        setLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handlePlan = () => {
    setLoading(true);
    apiClient.get(Api_Global_Admin.planEstudios.mostrar(idPlanestudioEdit))
      .then((response) => {
        setLoading(false);
        setValue("id_carrera", response.data.id_carrera);
        setValue("fecha_inicio", response.data.fecha_inicio);
        setValue("nombre", response.data.nombre);
        setValue("estado", response.data.estado);
      })
      .catch((error) => {
        setLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleCarreras = () => {
    apiClient.get(Api_Global_Setup.carreras.activos({
      per_page: 500,
      page: 1,
    }, ""))
      .then((response) => {
        setCarreras(response.data.data);
      })
      .catch((error) => {
        toast.warning(error.response.data);
      });
  };

  useEffect(() => {
    handleCarreras();
    if (idPlanestudioEdit) {
      handlePlan();
    }
  }, []);

  return (
    <Dialog open={true} maxWidth="xs" fullWidth className="backdrop-blur-md">
      <DialogTitle className="text-2xl p-2 font-bold text-center mt-4">{idPlanestudioEdit ? "Editar Plan de Estudios" : "Registrar Plan de Estudios"}</DialogTitle>
      <hr />
      <form onSubmit={handleSubmit(handleSave)}>
        <div className="flex flex-col p-6 gap-4">
          <div>
            <label htmlFor="">Carrera:</label>
            <select
              id="id_carrera"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              {...register("id_carrera", { required: true })}
            >
              <option value="">--Seleccione--</option>
              {carreras.map((item) => (
                <option value={item.id_carrera}>{item.nombre}</option>
              ))}
            </select>
            {errors.id_carrera && <span className="text-xs text-pink-500">Este campo es requerido</span>}
          </div>
          <div>
            <label htmlFor="">Nombre:</label>
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
            <label htmlFor="">Fecha inicio:</label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Estado:</label>
            <select
              id="estado"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              {...register("estado", { required: true })}
            >
              <option value="">--Seleccione--</option>
              <option value="1">ACTIVO</option>
              <option value="0">DESACTIVO</option>
            </select>
            {errors.estado && <span className="text-xs text-pink-500">Este campo es requerido</span>}
          </div>
        </div>
        <hr />
        <div className="flex flex-col p-6 gap-4">
          <div className="flex gap-2 justify-center">
            <Button type="button" onClick={handleCloseModalAdd} variant="outlined"
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader color="#374151" size={20} /> : 'Cancelar'}
            </Button>
            <Button type="submit" variant="contained"
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader color="#ffffff" size={20} /> : 'Guardar'}
            </Button>
          </div>
        </div>
      </form>

    </Dialog>
  );
}