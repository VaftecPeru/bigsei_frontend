import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, Button } from "@mui/material";
import { Edit, PlusCircle, CircleCheck, Trash2, BarChartBig } from 'lucide-react';
import { Api_Global_Admin } from "../../../services/AdminApi";
import apiClient from "../../../Utils/apiClient";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import { useParams } from "react-router-dom";
import CiclosAModal from "../modaladmin/CiclosAModal";
import CursoPlanAModal from "../modaladmin/CursoPlanAModal";

export default function CreacionDePlanA() {
  const { idPlanestudio } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenCiclosModal, setIsOpenCiclosModal] = useState();
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
  const [plan, setPlan] = useState(null);
  const [ciclos, setCiclos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [idPlanestudiocicloSelected, setIdPlanestudiocicloSelected] = useState("");
  const [isOpenCursoModal, setIsOpenCursoModal] = useState(false);
  const [idPlanestudiocursoEdit, setIdPlanestudiocursoEdit] = useState(null);
  const [idPlanestudiocursoDelete, setIdPlanestudiocursoDelete] = useState(null);
  const [estadisticas, setEstadisticas] = useState(null);

  const handleDeleteClick = (row) => {
    setIdPlanestudiocursoDelete(row.id_planestudiocurso);
    setIsOpenConfirmDelete(true);
  };

  const handleDeleteCloseModal = () => {
    setIdPlanestudiocursoDelete(null);
    setIsOpenConfirmDelete(false);
  };

  const handleOpenEdit = (item) => {
    setIdPlanestudiocursoEdit(item.id_planestudiocurso);
    setIsOpenCursoModal(true);
  };

  const handleDelete = () => {
    setIsOpenConfirmDelete(false);
    setIsLoading(true);
    apiClient.delete(Api_Global_Admin.planEstudioCursos.eliminar(idPlanestudiocursoDelete))
      .then((response) => {
        setIsLoading(false);
        setIdPlanestudiocursoDelete(null);
        handleCursos();
        toast.success("Realizado.");
      })
      .catch((error) => {
        setIsLoading(false);
        setIdPlanestudiocursoDelete(null);
        toast.warning(error.response.data);
      });
  };

  const handlePlan = () => {
    apiClient.get(Api_Global_Admin.planEstudios.mostrar(idPlanestudio))
      .then((response) => {
        setPlan(response.data);
      })
      .catch((error) => {
        toast.warning(error.response.data);
      });
  };

  const handleCiclos = () => {
    setIsLoading(true);
    apiClient.get(Api_Global_Admin.planEstudioCiclos.listar({
      per_page: 15,
      page: 1,
    }, idPlanestudio, ""))
      .then((response) => {
        setIsLoading(false);
        setCiclos(response.data.data);
      })
      .catch((error) => {
        setIsLoading(false);
        setCiclos([]);
        toast.warning(error.response.data);
      });
  };

  const handleCursos = () => {
    setIsLoading(true);
    apiClient.get(Api_Global_Admin.planEstudioCursos.listar({
      per_page: 15,
      page: 1,
    }, idPlanestudiocicloSelected, ""))
      .then((response) => {
        setIsLoading(false);
        setCursos(response.data.data);
      })
      .catch((error) => {
        setIsLoading(false);
        setCursos([]);
        toast.warning(error.response.data);
      });
  };

  const handleEstadisticas = () => {
    setIsLoading(true);
    apiClient.get(Api_Global_Admin.planEstudios.estadisticas(idPlanestudio))
      .then((response) => {
        setIsLoading(false);
        setEstadisticas(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        setEstadisticas(null);
        toast.warning(error.response.data);
      });
  };

  const handlePublicar = () => {
    setIsLoading(true);
    apiClient.post(Api_Global_Admin.planEstudios.publicar(idPlanestudio))
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        handlePlan();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  useEffect(() => {
    if (idPlanestudiocicloSelected) {
      handleCursos();
    }
  },[idPlanestudiocicloSelected]);

  useEffect(() => {
    if (idPlanestudio) {
      handlePlan();
      handleCiclos();
      handleEstadisticas();
    }
  },[]);

  return (
    <div className={`flex flex-col justify-start items-center min-h-screen text-2xl w-full bg-sky-50 p-6`}>
      <div className='w-full max-w-7xl bg-white shadow-md rounded-lg overflow-hidden'>
        <div className="py-6 px-6">
          <div className="grid grid-cols-3 gap-3">
            <div style={{lineHeight: "0.85em"}}>
              <div className="block text-sm font-medium text-gray-700">Plan:</div>
              <div className="text-gray-500">{plan?.nombre}</div>
            </div>
            <div style={{lineHeight: "0.85em"}}>
              <div className="block text-sm font-medium text-gray-700">Carrera:</div>
              <div className="text-gray-500">{plan?.carrera_nombre}</div>
            </div>
            <div style={{lineHeight: "0.65em"}}>
              <div className="block text-sm font-medium text-gray-700">Fecha:</div>
              <div className="text-gray-500">{plan?.fecha_inicio}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-semibold">Ciclos</h2>
            {plan?.esta_publicado == "0" && (
              <button
                type="button"
                title="Seleccionar ciclos"
                className="text-blue-500 text-sm hover:underline flex items-center"
                onClick={() => setIsOpenCiclosModal(true)}
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
                  className="bg-gray-50 rounded-lg p-3 flex items-center cursor-pointer"
                  onClick={() => setIdPlanestudiocicloSelected(item.id_planestudiociclo)}
                >
                  <div className={`w-8 h-8 rounded flex items-center justify-center bg-green-100`}>
                    <span className={`text-xs font-medium text-green-700`} style={{textTransform: 'uppercase'}}>{(index+1)}</span>
                  </div>

                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {item.nombre}
                    </p>
                    <p className="text-xs text-gray-500">Habilitado</p>
                  </div>

                  <div>
                    {item.id_planestudiociclo == idPlanestudiocicloSelected && <button type="button" className="pl-2 pr-2 text-blue-400 hover:text-blue-600"
                      disabled={isLoading}
                    >
                      {isLoading ? <ClipLoader color="#60a5fa" size={20} /> : <CircleCheck />}
                    </button>}
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
            {(idPlanestudiocicloSelected && plan?.esta_publicado == "0") && (
              <button
                type="button"
                title="Crear cursos"
                className="text-blue-500 text-sm hover:underline flex items-center"
                onClick={() => setIsOpenCursoModal(true)}
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
                  className="bg-gray-50 rounded-lg p-3 flex items-center"
                >
                  <div className={`w-8 h-8 rounded flex items-center justify-center bg-green-100`}>
                    <span className={`text-xs font-medium text-green-700`} style={{textTransform: 'uppercase'}}>{(index+1)}</span>
                  </div>

                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {item.nombre}
                    </p>
                    <p className="text-xs text-gray-500">Código: {item.codigo}</p>
                  </div>

                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {item.tipo_descripcion}
                    </p>
                    <p className="text-xs text-gray-500">
                      <span>Créditos: {item.creditos}</span>
                      <span className="ml-4">Horas: {item.horas_semanal}</span>
                    </p>
                  </div>

                  {plan?.esta_publicado == "0" && (
                    <div>
                      <button type="button" className="pl-2 pr-2 text-blue-400 hover:text-blue-600"
                        title="Editar"
                        disabled={isLoading}
                        onClick={() => handleOpenEdit(item)}
                      >
                        {isLoading ? <ClipLoader color="#60a5fa" size={30} /> : <Edit />}
                      </button>
                      <button type="button" className="pl-2 pr-2 ml-2 text-red-400 hover:text-red-600"
                        title="Eliminar"
                        disabled={isLoading}
                        onClick={() => handleDeleteClick(item)}
                      >
                        {isLoading ? <ClipLoader color="#60a5fa" size={30} /> : <Trash2 />}
                      </button>
                    </div>
                  )}
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

      <div className='w-full max-w-7xl bg-white shadow-md rounded-lg overflow-hidden mt-6'>
        <div className="py-6 px-6">
          <div className="pb-4 flex items-end">
            <BarChartBig size={40} />
            <span className="ml-2">Resumen del plan</span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            <div style={{lineHeight: "0.85em"}}>
              <div className="block text-sm font-medium text-gray-700 flex">Total ciclos:</div>
              <div className="text-gray-500">{estadisticas?.total_ciclos}</div>
            </div>
            <div style={{lineHeight: "0.85em"}}>
              <div className="block text-sm font-medium text-gray-700">Total cursos:</div>
              <div className="text-gray-500">{estadisticas?.total_cursos}</div>
            </div>
            <div style={{lineHeight: "0.85em"}}>
              <div className="block text-sm font-medium text-gray-700">Total créditos:</div>
              <div className="text-gray-500">{estadisticas?.total_creditos}</div>
            </div>
            <div style={{lineHeight: "0.65em"}}>
              <div className="block text-sm font-medium text-gray-700">Total horas:</div>
              <div className="text-gray-500">{estadisticas?.total_horas_semanal}</div>
            </div>
          </div>
          <hr className="my-6" />
          <div className="flex items-center justify-center">
            {plan?.esta_publicado == "0" ? (
              <button type="button" className="text-white bg-[#60a5fa] py-2 px-4 rounded-lg"
                disabled={isLoading}
                onClick={() => handlePublicar()}
              >
                <span className="flex items-center">{isLoading ? <ClipLoader color="#ffffff" size={20} /> : ""}
                Publicar plan</span>
              </button>
            ) : (
              <div className="py-6 font-bold text-center">
                El plan esta publicado.
              </div>
            )}
          </div>
        </div>
      </div>

      <Dialog open={isOpenConfirmDelete} onClose={handleDeleteCloseModal} maxWidth="xs" fullWidth>
        <div className="flex flex-col gap-2 p-6 justify-center items-center">
          <DialogTitle>¿Estás seguro de eliminar?</DialogTitle>
          <div className="flex justify-center gap-6 p-2">
            <Button onClick={handleDelete} variant="contained">
              Sí
            </Button>
            <Button onClick={handleDeleteCloseModal} variant="outlined">
              No
            </Button>
          </div>
        </div>
      </Dialog>

      {isOpenCiclosModal && <CiclosAModal
        onClose={() => {
          setIsOpenCiclosModal(false);
          handleCiclos();
          handleEstadisticas();
        }}
        idPlanestudio={idPlanestudio}
      />}
      {isOpenCursoModal && <CursoPlanAModal
        onClose={() => {
          setIsOpenCursoModal(false);
          setIdPlanestudiocursoEdit(null);
          handleCursos();
          handleEstadisticas();
        }}
        idPlanestudiociclo={idPlanestudiocicloSelected}
        idPlanestudiocursoEdit={idPlanestudiocursoEdit}
      />}
      <ToastContainer />
    </div>
  )
}