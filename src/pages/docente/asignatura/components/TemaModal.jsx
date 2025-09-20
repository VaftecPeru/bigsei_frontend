import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Api_Global_Docente } from "../../../../services/DocenteApi";
import { Api_Global_Setup } from "../../../../services/SetupApi";
import apiClient from "../../../../Utils/apiClient";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

export default function TemaModal({ onClose, idPeriodomodulo }) {
  const modalRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id_periodomodulo: "",
      titulo: "",
      descripcion: "",
      fecha: "",
      id_tipocategoria: "",
    },
  });

  const hangleCategorias = () => {
    apiClient.get(Api_Global_Setup.tipoCategorias.listar("", "2"))
      .then((response) => {
        setCategorias(response.data);
      })
      .catch((error) => {
        setCategorias([]);
        toast.warning(error.response.data);
      });
  }

  const onSubmit = (data) => {
    const data_ = {
      ...data,
      id_periodomodulo: idPeriodomodulo,
    };
    setIsLoading(true);
    apiClient.post(Api_Global_Docente.academicoPeriodoTemas.registrar(), data_)
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        onClose();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  }

  useEffect(() => {
    hangleCategorias();
  },[]);

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
      style={{ background: "#4747472e", backdropFilter: "blur(4px)" }}
    >
      <div ref={modalRef} className="bg-white w-full max-w-2xl mx-4 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Crear Nuevo Tema</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="mb-4">
            <label className="block text-gray-700">Título</label>
            <input
              type="text"
              id="titulo"
              {...register("titulo", { required: true })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
            {errors.titulo && <span className="text-xs text-pink-500">Este campo es requerido</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Descripción</label>
            <textarea
              id="descripcion"
              {...register("descripcion", { required: true })}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
            {errors.descripcion && <span className="text-xs text-pink-500">Este campo es requerido</span>}
          </div>

          <div className="flex gap-4">
            <div className="mb-4 flex-1">
              <label className="block text-gray-700">Fecha</label>
              <input
                type="date"
                id="fecha"
                {...register("fecha", { required: true })}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                required
              />
              {errors.fecha && <span className="text-xs text-pink-500">Este campo es requerido</span>}
            </div>

            <div className="mb-4 flex-1">
              <label className="block text-gray-700">Categoría</label>
              <select
                id="id_tipocategoria"
                {...register("id_tipocategoria", { required: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">--Seleccione--</option>
                {categorias.map((item, index) => (
                  <option value={item.id_tipocategoria}>{item.nombre}</option>
                ))}
              </select>
              {errors.fecha_fin && <span className="text-xs text-pink-500">Este campo es requerido</span>}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t pt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-500 hover:text-gray-700"
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader color="#374151" size={20} /> : 'Cancelar'}
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-white bg-blue-600 rounded ${isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"}`}
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader color="#ffffff" size={20} /> : 'Crear Tema'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}