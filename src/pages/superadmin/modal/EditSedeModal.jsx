import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Check, Pencil } from 'lucide-react';
import { TextField } from "@mui/material";
import { Api_Global_SuperAdministrador } from "../../../services/SuperAdministradorApi";
import apiClient from "../../../Utils/apiClient";
import apiFileClient from "../../../Utils/apiFileClient";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

export default function EditSedeModal({ onClose, idEmpresaEdit }) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDias, setSelectedDias] = useState([]);
  const [archivoUrl, setArchivoUrl] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      razon_social: "",
      atencion_desde: "",
      atencion_hasta: "",
      // atencion_dias: "",
      url_maps: "",
    },
  });

  const handleDiaToggle = (dia) => {
    if (selectedDias.includes(dia)) {
      setSelectedDias(selectedDias.filter((d) => d !== dia));
    } else {
      setSelectedDias([...selectedDias, dia]);
    }
  };

  const handleCloseModal = () => {
    onClose();
  };

  const diasSemana = [
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
    "Domingo",
  ];

  const selectedSemana = (atencion_dias) => {
    const atencionDias = atencion_dias.split(",");
    const diasInit = [];
    atencionDias.forEach((item) => {
        if (item == 1) diasInit.push("Lunes");
        else if (item == 2) diasInit.push("Martes");
        else if (item == 3) diasInit.push("Miércoles");
        else if (item == 4) diasInit.push("Jueves");
        else if (item == 5) diasInit.push("Viernes");
        else if (item == 6) diasInit.push("Sábado");
        else if (item == 7) diasInit.push("Domingo");
    });
    setSelectedDias(diasInit);
  };

  const handleUpload = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    setIsLoading(true);
    apiFileClient.post(Api_Global_SuperAdministrador.empresas.archivos(idEmpresaEdit), formData)
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        setArchivoUrl(response.data.url);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleSave = (data) => {
    const dias = [];
    selectedDias.forEach((item) => {
      if (item == "Lunes") dias.push(1);
      else if (item == "Martes") dias.push(2);
      else if (item == "Miércoles") dias.push(3);
      else if (item == "Jueves") dias.push(4);
      else if (item == "Viernes") dias.push(5);
      else if (item == "Sábado") dias.push(6);
      else if (item == "Domingo") dias.push(7);
    });
    const diasJoin = dias.join(",");
    const data_ = {
      ...data,
      atencion_dias: diasJoin,
    };
    setIsLoading(true);
    apiClient.put(Api_Global_SuperAdministrador.empresas.editar(idEmpresaEdit), data_)
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

  const handleSede = () => {
    setIsLoading(true);
    apiClient.get(Api_Global_SuperAdministrador.empresas.mostrar(idEmpresaEdit))
      .then((response) => {
        setIsLoading(false);
        setValue("razon_social", response.data.razon_social);
        setValue("atencion_desde", response.data.atencion_desde);
        setValue("atencion_hasta", response.data.atencion_hasta);
        setValue("url_maps", response.data.url_maps);
        selectedSemana(response.data.atencion_dias);
        if (response.data.id_archivo) {
          setArchivoUrl(response.data.archivo_url);
        }
      })
      .catch((error) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (idEmpresaEdit) {
      handleSede();
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="relative w-full h-48 bg-gray-200 rounded-t-lg mb-6 overflow-hidden">
          {archivoUrl ? (
            <img
              src={`data:image/png;base64,${archivoUrl}`}
              alt="Profile"
              className="h-64 w-full object-cover"
            />
          ) : (
            <div className="pt-14 font-bold text-gray-500 text-center">
              Imagen no encontrada...
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 flex justify-end items-center p-2 bg-black bg-opacity-50">
            <label
              className="flex justify-end bg-transparent hover:bg-white/10 text-white rounded-full p-2 transition-colors duration-200 gap-2 cursor-pointer"
              disabled={isLoading}
              component="label"
              variant="contained"
            >
              Cambiar imagen
              {isLoading ? <ClipLoader color="#ffffff" size={20} /> : <Pencil className="w-5 h-5" />}
              <input
                type="file"
                name="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    handleUpload(file);
                  }
                }}
                className="hidden"
                accept="image/*"
              />
            </label>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleSave)} className="space-y-6 p-6">
          <div>
            <h2 className="text-xl font-bold text-center mb-4">Nombre de Entidad - Sede</h2>
            <TextField
              fullWidth
              label="Ingrese el nombre de la sede"
              placeholder="Pegue el nombre aquí"
              name="razon_social"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              {...register("razon_social", { required: true })}
            />
            {errors.razon_social && <span className="text-xs text-pink-500">Este campo es requerido</span>}
          </div>
          <div>
            <h3 className="text-lg font-bold text-center mb-3">Horario de atención</h3>
            <div className="flex justify-between gap-4">
              <TextField
                fullWidth
                label="Desde"
                type="time"
                name="atencion_desde"
                InputLabelProps={{
                    shrink: true,
                }}
                {...register("atencion_desde", { required: true })}
              />
              {errors.atencion_desde && <span className="text-xs text-pink-500">Este campo es requerido</span>}
              <TextField
                fullWidth
                label="Hasta"
                type="time"
                name="atencion_hasta"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register("atencion_hasta", { required: true })}
              />
              {errors.atencion_hasta && <span className="text-xs text-pink-500">Este campo es requerido</span>}
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-bold text-center mb-2">Días de atención</h3>
            <div className="flex justify-center gap-2 flex-wrap">
              {diasSemana.map((dia) => (
                <button
                  key={dia}
                  type="button"
                  onClick={() => handleDiaToggle(dia)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    selectedDias.includes(dia)
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-700"
                  } hover:bg-gray-800 hover:text-white`}
                  disabled={isLoading}
                >
                  {isLoading ? <ClipLoader color="#ffffff" size={20} /> : ""}
                  {dia}
                  {selectedDias.includes(dia) && (
                    <Check className="w-4 h-4" />
                  )}
                </button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-center mb-3">Ubicación</h3>
            <TextField
              fullWidth
              label="Enlace de Maps"
              placeholder="Pegue el enlace aquí"
              name="url_maps"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              {...register("url_maps", { required: true })}
            />
            {errors.url_maps && <span className="text-xs text-pink-500">Este campo es requerido</span>}
          </div>
          <div className="flex justify-around pt-4 sticky bottom-0 bg-white p-4 border-t">
            <Button
              type="button"
              onClick={handleCloseModal}
              className="bg-red-700 hover:bg-red-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader color="#ffffff" size={20} /> : "Cancelar"}
            </Button>
            <Button
              type="submit"
              className="bg-green-700 hover:bg-green-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader color="#ffffff" size={20} /> : "Guardar"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}