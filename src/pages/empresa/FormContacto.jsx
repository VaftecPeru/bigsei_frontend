import { useState } from "react"
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import { Api_Global_Web } from "../../services/WebApi";
import apiClient from "../../Utils/apiClient";

function FormContacto() {
  const [isLoading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      nombre: "",
      telefono: "",
      correo: "",
    },
  });

  const onSubmit = (data) => {
    setLoading(true);
    apiClient.post(Api_Global_Web.solicitudes.registrarContacto(), data)
      .then((response) => {
        setLoading(false);
        toast.success("Realizado.");
        reset();
      })
      .catch((error) => {
        setLoading(false);
        toast.warning(error.response.data);
      });
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <input
            type="text"
            {...register("nombre", { required: true })}
            placeholder="Nombre"
            className="w-full px-3 py-2 border-b-2 border-[#FF96AC] focus:border-[#FC0036] outline-none transition-colors"
            required
          />
          {errors.nombre && <span className="text-xs text-pink-500">Este campo es requerido</span>}
        </div>
        <div className="space-y-2">
          <label className="block text-gray-700">Número de teléfono</label>
          <div className="flex gap-2">
            <div className="flex items-center border-b-2 border-pink-200 px-3 py-2">
            <img src="https://flagcdn.com/w20/pe.png" alt="PE flag" className="w-5 h-auto" />
            <span className="ml-2">▼</span>
            </div>
            <input
              type="tel"
              {...register("telefono", { required: true })}
              placeholder="+51 123456789"
              className="flex-1 px-3 py-2 border-b-2 border-[#FF96AC] focus:border-[#FC0036] outline-none transition-colors"
              required
            />
            {errors.telefono && <span className="text-xs text-pink-500">Este campo es requerido</span>}
          </div>
        </div>
        <div className="space-y-2">
          <label className="block text-gray-700">
            Email <span className="text-pink-500">*</span>
          </label>
          <input
            type="email"
            {...register("correo", { required: true })}
            placeholder="name@example.com"
            className="w-full px-3 py-2 border-b-2 border-[#FF96AC] focus:border-[#FC0036] outline-none transition-colors"
            required
          />
          {errors.correo && <span className="text-xs text-pink-500">Este campo es requerido</span>}
        </div>
        <div className="pt-4">
          <button
            type="submit"
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-2 px-6 rounded transition-colors"
          >
            {/* Enviar */}
            {isLoading ? <ClipLoader color="#ffffff" size={20} /> : 'Enviar'}
            <span className="text-sm text-gray-500 ml-2"></span>
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  )
}

export default FormContacto;