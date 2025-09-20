import { Dialog, Button, TextField } from "@mui/material";
import { Camera } from "lucide-react";
import { useState, useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import { Api_Global_Setup } from "../../../services/SetupApi";
import apiClient from "../../../Utils/apiClient";
import apiFileClient from "../../../Utils/apiFileClient";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

export default function CursoModal({ onClose, idCursoEdit }) {
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
      nombre: "",
      codigo: "",
    },
  });

  const handleClose = () => {
    onClose();
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

  const handleSave = () => {
    const formData = new FormData(formRef.current);
    if (archivo) {
      formData.append("file", archivo);
    }
    if (idCursoEdit) {
      handleEditar(formData);
    } else {
      handleRegistrar(formData);
    }
  };

  const handleRegistrar = (data) => {
    setLoading(true);
    apiFileClient.post(Api_Global_Setup.cursos.registrar(), data)
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
    apiFileClient.post(Api_Global_Setup.cursos.editar(idCursoEdit), data)
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
    apiClient.get(Api_Global_Setup.cursos.mostrar(idCursoEdit))
      .then((response) => {
        setLoading(false);
        setValue("nombre", response.data.nombre);
        setValue("codigo", response.data.codigo);
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
    if (idCursoEdit) {
      handleCarrera();
    }
  }, []);

  return (
    <Dialog open={true} maxWidth="xs" fullWidth className="backdrop-blur-md">
      <div className="text-2xl p-2 font-bold text-gray-900 text-center py-4">{idCursoEdit ? "Editar Curso" : "Registrar Curso"}</div>
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
            <label htmlFor="codigo" className="text-gray-500">Código:</label>
            <TextField
              fullWidth
              id="codigo"
              type="text"
              variant="outlined"
              size="small"
              {...register("codigo", { required: true })}
            />
            {errors.codigo && <span className="text-xs text-pink-500">Este campo es requerido</span>}
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