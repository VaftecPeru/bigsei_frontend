import { Dialog, Button, TextField } from "@mui/material";
import { Camera } from "lucide-react";
import { useState, useEffect, useRef } from 'react';
import { Api_Global_Admin } from "../../../services/AdminApi";
import apiClient from "../../../Utils/apiClient";
import apiFileClient from "../../../Utils/apiFileClient";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import { useForm } from "react-hook-form";

export default function CursoPlanAModal({ onClose, idPlanestudiociclo, idPlanestudiocursoEdit }) {
  const [isLoading, setLoading] = useState(false);
  const [imagen, setImagen] = useState(null);
  const [imagenReal, setImagenReal] = useState(null);
  const [archivo, setArchivo] = useState(null);
  const formRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      curso_codigo: "",
      curso_nombre: "",
      id_curso: "",
      creditos: "",
      horas_semanal: "",
      tipo: "O",
    },
  });

  const handleCloseModal = () => {
    onClose(false);
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImagen(e.target.result);
      reader.readAsDataURL(file);
      setArchivo(file);
    }
  };

  const handleSave = (data) => {
    const formData = new FormData(formRef.current);
    formData.append("id_planestudiociclo", idPlanestudiociclo);
    if (archivo) {
      formData.append("file", archivo);
    }
    if (idPlanestudiocursoEdit) {
      handleEditar(formData);
    } else {
      handleRegistrar(formData);
    }
  };

  const handleRegistrar = (data) => {
    setLoading(true);
    apiFileClient.post(Api_Global_Admin.planEstudioCursos.registrar(), data)
      .then((response) => {
        setLoading(false);
        toast.success("Realizado.");
        handleCloseModal();
      })
      .catch((error) => {
        setLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleEditar = (data) => {
    setLoading(true);
    apiFileClient.post(Api_Global_Admin.planEstudioCursos.editar(idPlanestudiocursoEdit), data)
      .then((response) => {
        setLoading(false);
        toast.success("Realizado.");
        handleCloseModal();
      })
      .catch((error) => {
        setLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleCurso = () => {
    setLoading(true);
    apiClient.get(Api_Global_Admin.planEstudioCursos.mostrar(idPlanestudiocursoEdit))
      .then((response) => {
        setLoading(false);
        setValue("curso_codigo", response.data.codigo);
        setValue("curso_nombre", response.data.nombre);
        setValue("id_curso", response.data.id_curso);
        setValue("creditos", response.data.creditos);
        setValue("horas_semanal", response.data.horas_semanal);
        setValue("tipo", response.data.tipo);
        if (response.data.archivo_url) {
          setImagenReal(response.data.archivo_url);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.warning(error.response.data);
      });
  };

  useEffect(() => {
    if (idPlanestudiocursoEdit) {
      handleCurso();
    }
  }, []);

  return (
    <Dialog open={true} maxWidth="xs" fullWidth className="backdrop-blur-md">
      <div className="text-2xl font-bold text-center my-4">{idPlanestudiocursoEdit ? "Editar Curso" : "Registrar Curso"}</div>
      <hr />
      <form onSubmit={handleSubmit(handleSave)} ref={formRef}>
        <div className="flex flex-col p-6 gap-4">
          <div className="flex items-center space-x-6">
            <div className="shrink-0">
              <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-100">
                {imagen ? (
                  <img
                    src={imagen || "/placeholder.svg"}
                    alt="Foto del docente"
                    className="w-full h-full object-cover"
                  />
                ) : imagenReal ? (
                  <img
                    src={`data:image/png;base64,${imagenReal}`}
                    alt="Foto del docente"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="w-12 h-12 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                )}
              </div>
            </div>
            <label className="block">
              <span className="sr-only">Elegir foto de perfil</span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100
              "
              />
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Código:</label>
            <TextField
              fullWidth
              id="curso_codigo"
              type="text"
              variant="outlined"
              size="small"
              {...register("curso_codigo", { required: true })}
            />
            {errors.curso_codigo && <span className="text-xs text-pink-500">Este campo es requerido</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre:</label>
            <TextField
              fullWidth
              id="curso_nombre"
              type="text"
              variant="outlined"
              size="small"
              {...register("curso_nombre", { required: true })}
            />
            {errors.curso_nombre && <span className="text-xs text-pink-500">Este campo es requerido</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Créditos:</label>
            <TextField
              fullWidth
              id="creditos"
              type="number"
              variant="outlined"
              size="small"
              {...register("creditos", { required: true })}
            />
            {errors.creditos && <span className="text-xs text-pink-500">Este campo es requerido</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Horas semanal:</label>
            <TextField
              fullWidth
              id="horas_semanal"
              type="number"
              variant="outlined"
              size="small"
              {...register("horas_semanal", { required: true })}
            />
            {errors.horas_semanal && <span className="text-xs text-pink-500">Este campo es requerido</span>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo:</label>
            <select
              id="tipo"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              {...register("tipo", { required: true })}
            >
              <option value="">--Seleccione--</option>
              <option value="O">Obligatorio</option>
              <option value="E">Electivo</option>
            </select>
            {errors.tipo && <span className="text-xs text-pink-500">Este campo es requerido</span>}
          </div>
        </div>
        <hr />
        <div className="flex flex-col p-6 gap-4">
          <div className="flex gap-2 justify-center">
            <Button type="button" onClick={handleCloseModal} variant="outlined">
              {isLoading ? <ClipLoader color="#374151" size={20} /> : 'Cancelar'}
            </Button>
            <Button type="submit" variant="contained">
              {isLoading ? <ClipLoader color="#ffffff" size={20} /> : 'Guardar'}
            </Button>
          </div>
        </div>
      </form>

    </Dialog>
  );
}