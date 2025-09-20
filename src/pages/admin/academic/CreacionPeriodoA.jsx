import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, Button } from "@mui/material";
import { Edit, PlusCircle, Trash2, Calendar, ArrowBigLeft, ArrowBigRight,
  Pencil, FolderClosed, FolderOpen, Mailbox, CircleDollarSign, CalendarDays } from "lucide-react";
import { Api_Global_Admin } from "../../../services/AdminApi";
import { Api_Global_Setup } from "../../../services/SetupApi";
import apiClient from "../../../Utils/apiClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import { useParams, useSearchParams, Link } from "react-router-dom";
import AcademicCourseAModal from "../modaladmin/AcademicCourseAModal";
import AcademicCicloAModal from "../modaladmin/AcademicCicloAModal";
import ResumenPeriodoA from "../components/ResumenPeriodoA";
import MensajeriaModal from "../modaladmin/MensajeriaModal";
import AcademicPriceCourseAModal from "../modaladmin/AcademicPriceCourseAModal";
import HorarioAModal from "../modaladmin/HorarioAModal";

export default function CreacionPeriodoA() {
  const { idPeriodo } = useParams();
  const [searchParams] = useSearchParams();
  const [idCarrera, setIdCarrera] = useState(searchParams.get("id_carrera") ||   "");
  const [isLoading, setIsLoading] = useState(false);
  const [resumen, setResumen] = useState(null);
  const [isOpenCursoModal, setIsOpenCursoModal] = useState(false);
  const [isOpenCicloModal, setIsOpenCicloModal] = useState(false);
  const [isOpenMensajeriaModal, setIsOpenMensajeriaModal] = useState(false);
  const [isOpenPrecioModal, setIsOpenPrecioModal] = useState(false);
  const [isOpenHorarioModal, setIsOpenHorarioModal] = useState(false);
  const [isOpenConfirmCursoDelete, setIsOpenConfirmCursoDelete] = useState(false);
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
  const [periodo, setPeriodo] = useState(null);
  const [cursoSelected, setCursoSelected] = useState(null);
  const [carreras, setCarreras] = useState([]);
  const [ciclos, setCiclos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [idPeriodocicloSelected, setIdPeriodocicloSelected] = useState("");
  const [idPeriodocicloEdit, setIdPeriodocicloEdit] = useState(null);
  const [idPeriodocicloDelete, setIdPeriodocicloDelete] = useState(null);
  const [idPeriodocursoEdit, setIdPeriodocursoEdit] = useState(null);
  const [idPeriodocursoDelete, setIdPeriodocursoDelete] = useState(null);
  const [isOpenConfirmAbrir, setIsOpenConfirmAbrir] = useState(false);

  const handleAbrirPeriodoClick = () => {
    setIsOpenConfirmAbrir(true);
  };

  const handleAbrirPeriodo = () => {
    setIsOpenConfirmAbrir(false);
    setIsLoading(true);
    apiClient.post(Api_Global_Admin.academicoPeriodos.abrir(idPeriodo))
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        setPeriodo({
          ...periodo,
          esta_abierto: response.data.esta_abierto,
          estado: response.data.estado,
        });
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleCicloDeleteClick = (id_periodociclo) => {
    setIsOpenConfirmDelete(true);
    setIdPeriodocicloDelete(id_periodociclo);
  };

  const handleCicloDelete = () => {
    setIsOpenConfirmDelete(false);
    setIsLoading(true);
    apiClient.delete(Api_Global_Admin.academicoPeriodoCiclos.eliminar(idPeriodocicloDelete))
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        handleCiclos();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleCursoDeleteClick = (id_periodocurso) => {
    setIsOpenConfirmCursoDelete(true);
    setIdPeriodocursoDelete(id_periodocurso);
  };

  const handleCursoDelete = () => {
    setIsOpenConfirmCursoDelete(false);
    setIsLoading(true);
      apiClient.delete(Api_Global_Admin.academicoPeriodoCursos.eliminar(idPeriodocursoDelete))
        .then((response) => {
          setIsLoading(false);
          toast.success("Realizado.");
          handleCursos();
        })
        .catch((error) => {
          setIsLoading(false);
          toast.warning(error.response.data);
        });
  };

  const handleOpenCurso = (id_periodocurso) => {
    if (idCarrera && idPeriodocicloSelected) {
      setIdPeriodocursoEdit(id_periodocurso);
      setIsOpenCursoModal(true);
    } else {
      toast.warning("¡Atención! Falta seleccionar carrera y/o ciclo.");
    }
  };

  const handleOpenCiclo = (id_periodociclo) => {
    if (idCarrera) {
      setIdPeriodocicloEdit(id_periodociclo);
      setIsOpenCicloModal(true);
    } else {
      toast.warning("¡Atención! Falta seleccionar carrera.");
    }
  };

  const handleOpenMensajeria = (row) => {
    setCursoSelected(row);
    setIsOpenMensajeriaModal(true);
  };

  const handleOpenPrecio = (row) => {
    setCursoSelected(row);
    setIsOpenPrecioModal(true);
  };

  const handleOpenHorario = (row) => {
    setCursoSelected(row);
    setIsOpenHorarioModal(true);
  };

  const handleCarreras = () => {
    apiClient.get(Api_Global_Setup.carreras.activos({
      per_page: 50,
      page: 1,
    }, ""))
      .then((response) => {
        setCarreras(response.data.data);
      })
      .catch((error) => {
        toast.warning(error.response.data);
      });
  };

  const handlePeriodo = () => {
    setIsLoading(true);
    apiClient.get(Api_Global_Admin.academicoPeriodos.mostrar(idPeriodo))
      .then((response) => {
        setIsLoading(false);
        setPeriodo(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleCiclos = () => {
    setCursos([]);
    setIsLoading(true);
    apiClient.get(Api_Global_Admin.academicoPeriodoCiclos.listar({
      per_page: 25,
      page: 1,
    }, idPeriodo, idCarrera, ""))
      .then((response) => {
        setIsLoading(false);
        setCiclos(response.data.data);
        setIdPeriodocicloSelected("");
      })
      .catch((error) => {
        setIsLoading(false);
        setCiclos([]);
        setIdPeriodocicloSelected("");
      });
  };

  const handleCursos = () => {
    setIsLoading(true);
    apiClient.get(Api_Global_Admin.academicoPeriodoCursos.listar({
      per_page: 25,
      page: 1,
    }, idPeriodocicloSelected, ""))
      .then((response) => {
        setIsLoading(false);
        setCursos(response.data.data);
      })
      .catch((error) => {
        setIsLoading(false);
        setCursos([]);
      });
  };

  const handleResumen = () => {
    apiClient.get(Api_Global_Admin.academicoPeriodos.resumenCarreras(idPeriodo, idCarrera))
      .then((response) => {
        setResumen(response.data);
      })
      .catch((error) => {
        setResumen(null);
      });
  };

  useEffect(() => {
    handleCarreras();
    handlePeriodo();
  }, []);

  useEffect(() => {
    if (idCarrera) {
      handleCiclos();
      handleResumen();
    } else {
      setCiclos([]);
      setCursos([]);
      setResumen(null);
    }
  }, [idCarrera]);

  useEffect(() => {
    if (idPeriodocicloSelected) {
      handleCursos();
    }
  }, [idPeriodocicloSelected]);

  return (
    <div className={`flex flex-col justify-start items-center min-h-screen w-full bg-sky-50 p-6`}>
      <div className='w-full max-w-7xl bg-white shadow-md rounded-lg overflow-hidden'>
        <div className="py-6 px-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-end" style={{lineHeight: "0.85em"}}>
              <Calendar size="30" className="text-gray-500" />
              <div className="font-bold text-gray-500 text-xl ml-2">{periodo?.nombre}</div>
            </div>
            <div className="flex items-start justify-end" style={{lineHeight: "0.85em"}}>
              {periodo?.esta_abierto == "0" ? (
                <button
                  variant="contained"
                  color="success"
                  className="text-white flex bg-[#4c8bff] rounded-lg items-center justify-center gap-2 py-2 px-4 ml-1"
                  disabled={isLoading}
                  onClick={handleAbrirPeriodoClick}
                >
                  {isLoading ? <ClipLoader color="#ffffff" size={20} /> : <FolderClosed className="ml-1 h-4 w-4" />}
                  Abrir Período
                </button>
              ) : (
                <div className="py-2 px-4 border border-blue/20 rounded-lg font-bold text-blue-500 flex gap-3">
                  <FolderOpen className="ml-1 h-4 w-4" />Período Abierto
                </div>
              )}
              <Link
                to={`/admin/academico/periodo`}
              >
                <button
                  type="button"
                  title="Ir a periodos"
                  className="text-gray-500 text-sm hover:underline flex items-center ml-4"
                >
                  <ArrowBigLeft className="ml-1 h-8 w-8" />
                </button>
              </Link>
            </div>
          </div>
          <hr className="my-3"/>

          <div className="grid grid-cols-2 gap-3">
            <div className="grid grid-cols-1">
              <div style={{lineHeight: "0.85em"}}>
                <div className="block text-sm font-medium text-gray-700">Carrera:</div>
                <div>
                  <select
                      id="id_docente"
                      className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      value={idCarrera}
                      onChange={(e) => setIdCarrera(e.target.value)}
                  >
                      <option value="">--Seleccione--</option>
                      {carreras.map((item) => (
                          <option value={item.id_carrera}>{item.nombre}</option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="flex items-start justify-end gap-4">
              <div style={{lineHeight: "0.85em"}}>
                <div className="block text-sm font-medium text-gray-700">Fecha inicio:</div>
                <div className="text-gray-500">{periodo?.fecha_ini}</div>
              </div>
              <div style={{lineHeight: "0.65em"}}>
                <div className="block text-sm font-medium text-gray-700">Fecha fin:</div>
                <div className="text-gray-500">{periodo?.fecha_fin}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-semibold">Ciclos</h2>
            {periodo?.esta_abierto == "0" && (
              <button
                type="button"
                title="Crear ciclos"
                className="text-blue-500 text-sm hover:underline flex items-center"
                onClick={() => handleOpenCiclo(null)}
                disabled={isLoading}
              >
                {isLoading ? <ClipLoader color="#60a5fa" size={32} /> : <PlusCircle className="ml-1 h-8 w-8" />}
              </button>
            )}
          </div>
          <div className="mt-4 space-y-3">
            {ciclos.length ? (
              ciclos.map((item, index) => (
                <div
                  className="bg-gray-50 rounded-lg p-3 flex items-center hover:bg-gray-200"
                >
                  <div className={`w-8 h-8 rounded flex items-center justify-center bg-green-100`}>
                    <span className={`text-xs font-medium text-green-700`} style={{textTransform: 'uppercase'}}>{(index+1)}</span>
                  </div>

                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {item.ciclo_nombre}
                    </p>
                    <p className="text-xs text-gray-500">{item.codigo}</p>
                  </div>

                  <div>
                    {periodo?.esta_abierto == "0" && (
                      <>
                        <button type="button" className="pl-2 pr-2 text-orange-400 hover:text-orange-600"
                          title="Editar"
                          disabled={isLoading}
                          onClick={() => handleOpenCiclo(item.id_periodociclo)}
                        >
                          {isLoading ? <ClipLoader color="#60a5fa" size={20} /> : <Pencil />}
                        </button>
                        <button type="button" className="pl-2 pr-2 text-red-400 hover:text-red-600"
                          title="Eliminar"
                          disabled={isLoading}
                          onClick={() => handleCicloDeleteClick(item.id_periodociclo)}
                        >
                          {isLoading ? <ClipLoader color="#60a5fa" size={20} /> : <Trash2 />}
                        </button>
                      </>
                    )}
                    {item.id_periodociclo == idPeriodocicloSelected ? (
                      <button type="button" className="pl-2 pr-2 text-blue-600 cursor-auto"
                        title="Seleccionado"
                        disabled={isLoading}
                      >
                        {isLoading ? <ClipLoader color="#60a5fa" size={20} /> : <ArrowBigRight />}
                      </button>
                    ) : (
                      <button type="button" className="pl-2 pr-2 text-gray-400 hover:text-gray-600"
                        title="Seleccionar y mostrar cursos"
                        disabled={isLoading}
                        onClick={() => setIdPeriodocicloSelected(item.id_periodociclo)}
                      >
                        {isLoading ? <ClipLoader color="#60a5fa" size={20} /> : <ArrowBigRight />}
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center font-bold text-2xl py-12">
                No hay ciclos encontrados.
              </div>
            )}
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 col-span-2">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-semibold">Cursos académicos</h2>
            {periodo?.esta_abierto == "0" && (
              <button
                type="button"
                title="Crear cursos"
                className="text-blue-500 text-sm hover:underline flex items-center"
                onClick={() => handleOpenCurso(null)}
                disabled={isLoading}
              >
                {isLoading ? <ClipLoader color="#60a5fa" size={32} /> : <PlusCircle className="ml-1 h-8 w-8" />}
              </button>
            )}
          </div>
          <div className="mt-4 space-y-3 w-full">
            {cursos.length ? (
              cursos.map((item, index) => (
                <div
                  className="bg-gray-50 rounded-lg p-3 flex items-center hover:bg-gray-200"
                >
                  <div className={`w-8 h-8 rounded flex items-center justify-center bg-green-100`}>
                    <span className={`text-xs font-medium text-green-700`} style={{textTransform: 'uppercase'}}>{(index+1)}</span>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {item.curso_nombre}
                    </p>
                    <p className="text-xs text-gray-500">{item.curso_codigo}</p>
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex gap-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900"> Créditos: </p>
                        <p className="text-xs text-gray-500"> {item.creditos} </p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900"> Horas: </p>
                        <p className="text-xs text-gray-500"> {item.horas_semanal}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <button type="button" className="pl-1 pr-1 text-orange-400 hover:text-orange-600"
                      title="Configuración de horario"
                      disabled={isLoading}
                      onClick={() => handleOpenHorario(item)}
                    >
                      {isLoading ? <ClipLoader color="#60a5fa" size={30} /> : <CalendarDays />}
                    </button>
                    <button type="button" className="pl-1 pr-1 text-green-400 hover:text-green-600"
                      title="Configuración de precio"
                      disabled={isLoading}
                      onClick={() => handleOpenPrecio(item)}
                    >
                      {isLoading ? <ClipLoader color="#60a5fa" size={30} /> : <CircleDollarSign />}
                    </button>
                    <button type="button" className="pl-1 pr-1 text-orange-400 hover:text-orange-600"
                      title="Mensajería"
                      disabled={isLoading}
                      onClick={() => handleOpenMensajeria(item)}
                    >
                      {isLoading ? <ClipLoader color="#60a5fa" size={30} /> : <Mailbox />}
                    </button>
                    {periodo?.esta_abierto == "0" && (
                      <>
                        <button type="button" className="pl-1 pr-1 text-blue-400 hover:text-blue-600"
                          title="Editar"
                          disabled={isLoading}
                          onClick={() => handleOpenCurso(item.id_periodocurso)}
                        >
                          {isLoading ? <ClipLoader color="#60a5fa" size={30} /> : <Edit />}
                        </button>
                        <button type="button" className="pl-1 pr-1 text-red-400 hover:text-red-600"
                          title="Eliminar"
                          disabled={isLoading}
                          onClick={() => handleCursoDeleteClick(item.id_periodocurso)}
                        >
                          {isLoading ? <ClipLoader color="#60a5fa" size={30} /> : <Trash2 />}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center font-bold text-2xl py-12">
                No hay cursos encontrados.
              </div>
            )}
          </div>
        </div>
      </div>

      <ResumenPeriodoA resumen={resumen} estaAbierto={periodo?.esta_abierto} />

      <Dialog open={isOpenConfirmCursoDelete} onClose={() => setIsOpenConfirmCursoDelete(false)} maxWidth="xs" fullWidth>
        <div className="flex flex-col gap-2 p-6 justify-center items-center">
          <DialogTitle>¿Estás seguro de eliminar?</DialogTitle>
          <div className="flex justify-center gap-6 p-2">
            <Button onClick={handleCursoDelete} variant="contained">
              Sí
            </Button>
            <Button onClick={() => setIsOpenConfirmCursoDelete(false)} variant="outlined">
              No
            </Button>
          </div>
        </div>
      </Dialog>
      <Dialog open={isOpenConfirmDelete} onClose={() => setIsOpenConfirmDelete(false)} maxWidth="xs" fullWidth>
        <div className="flex flex-col gap-2 p-6 justify-center items-center">
          <DialogTitle>¿Estás seguro de eliminar?</DialogTitle>
          <div className="flex justify-center gap-6 p-2">
            <Button onClick={handleCicloDelete} variant="contained">
              Sí
            </Button>
            <Button onClick={() => setIsOpenConfirmDelete(false)} variant="outlined">
              No
            </Button>
          </div>
        </div>
      </Dialog>
      <Dialog open={isOpenConfirmAbrir} onClose={() => setIsOpenConfirmAbrir(false)} maxWidth="xs" fullWidth>
        <div className="flex flex-col gap-2 p-6 justify-center items-center">
          <DialogTitle>¿Estás seguro abrir el período.(Carreras, ciclos, cursos)?</DialogTitle>
          <div className="flex justify-center gap-6 p-2">
            <Button onClick={handleAbrirPeriodo} variant="contained">
              Sí
            </Button>
            <Button onClick={() => setIsOpenConfirmAbrir(false)} variant="outlined">
              No
            </Button>
          </div>
        </div>
      </Dialog>

      {isOpenCicloModal && <AcademicCicloAModal
        onClose={() => {
          setIsOpenCicloModal(false);
          setIdPeriodocicloEdit(null);
          handleCiclos();
          handleResumen();
        }}
        idPeriodo={idPeriodo}
        idCarrera={idCarrera}
        idPeriodocicloEdit={idPeriodocicloEdit}
      />}
      {isOpenCursoModal && <AcademicCourseAModal
        onClose={() => {
          setIsOpenCursoModal(false);
          setIdPeriodocursoEdit(null);
          handleCursos();
          handleResumen();
        }}
        idPeriodo={idPeriodo}
        idCarrera={idCarrera}
        idPeriodociclo={idPeriodocicloSelected}
        idPeriodocursoEdit={idPeriodocursoEdit}
      />}
      {isOpenMensajeriaModal && <MensajeriaModal
        onClose={() => {
          setIsOpenMensajeriaModal(false);
          setCursoSelected(null);
          handleResumen();
        }}
        curso={cursoSelected}
      />}
      {isOpenPrecioModal && <AcademicPriceCourseAModal
        onClose={() => {
          setIsOpenPrecioModal(false);
          setCursoSelected(null);
          handleResumen();
        }}
        periodoCurso={cursoSelected}
      />}
      {isOpenHorarioModal && <HorarioAModal
        onClose={() => {
          setIsOpenHorarioModal(false);
          setCursoSelected(null);
          handleResumen();
        }}
        curso={cursoSelected}
      />}
      <ToastContainer />
    </div>
  )
}