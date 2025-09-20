import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { Api_Global_Docente } from "../../../../services/DocenteApi";
import apiClient from "../../../../Utils/apiClient";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

function ModalCuestionario({ clickClose, tema }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const [value1, setValue1] = useState("");
  const [isFocused2, setIsFocused2] = useState(false);
  const [value2, setValue2] = useState("");
  const [idPeriodocuestionario, setIdPeriodocuestionario] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      titulo: "",
      instruccion: "",
    },
  });

  const setCuestionarioForm = (data) => {
    setValue("titulo", data.titulo);
    setValue("instruccion", data.instruccion);
    setIdPeriodocuestionario(data.id_periodocuestionario);
  };

  const handleCuestionario = () => {
    setIsLoading(true);
    apiClient.get(Api_Global_Docente.academicoPeriodoCuestionarios.listar({
      per_page: 15,
      page: 1,
    }, tema.id_periodotema))
      .then((response) => {
        setIsLoading(false);
        if (response.data.data.length > 0) {
          setCuestionarioForm(response.data.data[0]);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const onSubmit = (data) => {
    const data_ = {
      ...data,
      id_periodotema: tema.id_periodotema,
    };
    if (idPeriodocuestionario) {
      setIsLoading(true);
      apiClient.put(Api_Global_Docente.academicoPeriodoCuestionarios.editar(idPeriodocuestionario), data_)
        .then((response) => {
          setIsLoading(false);
          toast.success("Realizado.");
        })
        .catch((error) => {
          setIsLoading(false);
          toast.warning(error.response.data);
        });
    } else {
      setIsLoading(true);
      apiClient.post(Api_Global_Docente.academicoPeriodoCuestionarios.registrar(), data_)
        .then((response) => {
          setIsLoading(false);
          toast.success("Realizado.");
          setIdPeriodocuestionario(response.data.id_periodocuestionario);
        })
        .catch((error) => {
          setIsLoading(false);
          toast.warning(error.response.data);
        });
    }
  };

  useEffect(() => {
    handleCuestionario();
  },[]);

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-[3px]"
      />

      <div className="relative w-full max-w-lg rounded-lg bg-white shadow-xl mx-4">
        <div className="flex items-center h-full w-full p-4">
          <div className="flex items-center h-full">
            <svg
              className="red-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              stroke="red"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="16" height="8" x="16" y="4" rx="2" />
              <path d="M16 8H12a4 4 0 0 0-4 4v28a4 4 0 0 0 4 4h24a4 4 0 0 0 4-4v-1" />
              <path d="M32 8h4a4 4 0 0 1 3.46 2" />
              <path d="M16 36h2" />
              <path d="M42.756 25.252a2 2 0 0 0-6.008-6.008l-8.02 8.024a4 4 0 0 0-1.012 1.708l-1.674 5.74a1 1 0 0 0 1.24 1.24l5.74-1.674a4 4 0 0 0 1.708-1.012z" />
            </svg>
            <h2 className="text-lg font-bold text-blue-900 ml-2">
              CUESTIONARIO
            </h2>

          </div>
          <div style={{ marginLeft: "auto"}}>
            <button
              onClick={clickClose}
              className="text-blue-900 hover:text-blue-800"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span className="sr-only">Cerrar</span>
            </button>
          </div>
        </div>
        <hr className="w-full" />

        <div className="py-12 px-8">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-container relative">
              <input
                {...register("titulo", { required: true })}
                type="text"
                placeholder=" "
                className="rounded-xl bg-gray-100 border border-gray-400 p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                onFocus={() => setIsFocused1(true)}
                onBlur={() => !value1 && setIsFocused1(false)}
              />
              <label
                className={`placeholder-label absolute left-2 top-2 text-gray-500 transition-all duration-200 pointer-events-none ${(isFocused1 || value1) && "transform -translate-y-2 translate-x-1 text-sm text-blue-500 bg-gray-100 px-1"
                  }`}
              >
                Título
              </label>
              {errors.titulo && <span className="text-xs text-pink-500">Este campo es requerido</span>}
            </div>
            <div className="input-container relative mt-8 mb-8">
              <input
                {...register("instruccion", { required: true })}
                type="text"
                placeholder=" "
                className="h-32 rounded-xl bg-gray-100 border-3 border-gray-400 p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                onFocus={() => setIsFocused2(true)}
                onBlur={() => !value2 && setIsFocused2(false)}
              />
              <label
                className={`placeholder-label absolute left-2 top-2 text-gray-500 transition-all duration-200 pointer-events-none ${(isFocused2 || value2) && "transform -translate-y-2 translate-x-1 text-sm text-blue-500 bg-gray-100 px-1"
                  }`}
              >
                Instrucciones (opcional)
              </label>
              {errors.instruccion && <span className="text-xs text-pink-500">Este campo es requerido</span>}
            </div>

            <div className="flex justify-center mt-4 mb-4">
              <button type="submit"
                className="text-blue-900 font-bold rounded-xl border-2 border-blue-900 hover:bg-blue-900 hover:text-white px-8 py-[6px] text-sm"
                disabled={isLoading}
              >
                {isLoading ? <ClipLoader color="#1e3a8a" size={20} /> : 'GUARDAR'}
              </button>
            </div>
          </form>

          {idPeriodocuestionario && (
            <div className="flex items-center border-2 border-blue-900 rounded-xl h-16 p-4">
              <div className="flex items-center justify-center h-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="black"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-file"
                >
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                </svg>
              </div>

              <div className="w-px h-16 bg-blue-900 mx-4"></div>

              <div className="text-black font-bold">
                <Link
                  to={`/formulario/${idPeriodocuestionario}`}
                  className="text-blue-800 no-underline hover:text-blue-600 font-bold hover:underline transition-colors duration-200"
                >
                  Crear pregunta
                </Link>
                <p className="text-sm text-gray-600">Formularios</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div >
  );
}

export default ModalCuestionario;