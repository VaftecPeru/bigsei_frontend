import { Dialog, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Api_Global_Admin } from "../../../services/AdminApi";
import apiClient from "../../../Utils/apiClient";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";

export default function AcademicPeriodAModal({ onClose, idPeriodoEdit }) {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      nombre: "",
      descripcion: "",
      fecha_ini: "",
      fecha_fin: "",
      estado: "1",
    },
  });

  const handleCloseModal = () => {
    onClose(false);
  };

  const handleSave = (data) => {
    if (idPeriodoEdit) {
      handleEditar(data);
    } else {
      handleRegistrar(data);
    }
  };

  const handleRegistrar = (data) => {
    setIsLoading(true);
    apiClient.post(Api_Global_Admin.academicoPeriodos.registrar(), data)
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        handleCloseModal();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleEditar = (data) => {
    setIsLoading(true);
    apiClient.put(Api_Global_Admin.academicoPeriodos.editar(idPeriodoEdit), data)
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        handleCloseModal();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handlePeriodo = () => {
    setIsLoading(true);
    apiClient.get(Api_Global_Admin.academicoPeriodos.mostrar(idPeriodoEdit))
      .then((response) => {
        setIsLoading(false);
        setValue("nombre", response.data.nombre);
        setValue("descripcion", response.data.descripcion);
        setValue("fecha_ini", response.data.fecha_ini);
        setValue("fecha_fin", response.data.fecha_fin);
        setValue("estado", response.data.estado);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (idPeriodoEdit) {
      handlePeriodo();
    }
  }, []);

  return (
    <Dialog open={true} maxWidth="xs" fullWidth className="backdrop-blur-md">
      <div className="text-2xl p-2 font-bold text-center my-4">{idPeriodoEdit ? "Editar Periodo" : "Agregar Periodo"}</div>
      <hr />
      <form onSubmit={handleSubmit(handleSave)}>
        <div className="flex flex-col p-6 gap-4">
          <div>
            <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">Nombre:</label>
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
            <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">Descripción:</label>
            <TextField
              fullWidth
              id="descripcion"
              type="text"
              variant="outlined"
              size="small"
              {...register("descripcion", { required: true })}
            />
            {errors.descripcion && <span className="text-xs text-pink-500">Este campo es requerido</span>}
          </div>
          <div>
            <label htmlFor="fecha_ini" className="block text-sm font-medium text-gray-700 mb-1">Fecha inicio:</label>
            <TextField
              fullWidth
              id="fecha_ini"
              type="date"
              variant="outlined"
              size="small"
              {...register("fecha_ini", { required: true })}
            />
            {errors.fecha_ini && <span className="text-xs text-pink-500">Este campo es requerido</span>}
          </div>
          <div>
            <label htmlFor="fecha_fin" className="block text-sm font-medium text-gray-700 mb-1">Fecha fin:</label>
            <TextField
              fullWidth
              id="fecha_fin"
              type="date"
              variant="outlined"
              size="small"
              {...register("fecha_fin", { required: true })}
            />
            {errors.fecha_fin && <span className="text-xs text-pink-500">Este campo es requerido</span>}
          </div>
          <div>
            <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">Estado:</label>
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
        <div className="flex flex-col p-6 gap-4">
          <div className="flex gap-2 mt-4 justify-center">
            <Button type="button" onClick={handleCloseModal} variant="outlined"
              disabled={isLoading}>
              {isLoading ? <ClipLoader color="#374151" size={20} /> : 'Cancelar'}
            </Button>
            <Button type="submit" variant="contained"
              disabled={isLoading}>
              {isLoading ? <ClipLoader color="#ffffff" size={20} /> : 'Guardar'}
            </Button>
          </div>
        </div>
      </form>

    </Dialog>
  );
}