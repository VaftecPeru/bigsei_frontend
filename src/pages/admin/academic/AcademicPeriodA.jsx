import { Pencil, PlusIcon, Search, Trash2, Calendar, BookCopy } from "lucide-react";
import { Dialog, DialogTitle, Button } from "@mui/material";
import { FlechaBajo_icon } from '@/pages/docente/asignatura/docente_icons';
import React, { useEffect, useState } from "react";
import TableFoot5 from "@/components/tables/TableFoot5";
import { Api_Global_Admin } from "../../../services/AdminApi";
import apiClient from "../../../Utils/apiClient";
import AcademicPeriodAModal from "../modaladmin/AcademicPeriodAModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

function CardA({periodo, index, refresh}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenPeriodoModal, setIsOpenPeriodoModal] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isActivityOpen, setIsActivityOpen] = useState(false);
  const [carreras, setCarreras] = useState([]);

  const handleActivityClick = () => {
    setIsActivityOpen((prev) => !prev);
  };

  const handleEstadisticas = () => {
    setIsLoading(true);
    apiClient.get(Api_Global_Admin.academicoPeriodos.carreraEstadisticas({
      per_page: 100,
      page: 1,
    }, periodo.id_periodo))
      .then((response) => {
        setIsLoading(false);
        setCarreras(response.data.data);
      })
      .catch((error) => {
        setIsLoading(false);
        setCarreras([]);
      });
  };

  const handleConfirmDelete = async () => {
    setIsOpenDelete(false);
    setIsLoading(true);
    apiClient.delete(Api_Global_Admin.academicoPeriodos.eliminar(periodo.id_periodo))
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        refresh();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  useEffect(() => {
    if (isActivityOpen) {
      handleEstadisticas();
    }
  },[isActivityOpen]);

  return (
    <>
      <div
        className="bg-gray-50 rounded-lg p-3 flex items-center my-2 hover:bg-gray-200"
      >
        <div className={`w-8 h-8 rounded flex items-center justify-center bg-green-100`}>
          <span className={`text-xs font-medium text-green-700`} style={{textTransform: 'uppercase'}}>
            {index}
          </span>
        </div>

        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">
            {periodo?.nombre}
          </p>
          <p className="text-xs text-gray-500">{periodo?.descripcion}</p>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">
            Fecha inicio
          </p>
          <p className="text-xs text-gray-500">{periodo?.fecha_ini}</p>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">
            Fecha fin
          </p>
          <p className="text-xs text-gray-500">{periodo?.fecha_fin}</p>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">
            Estado
          </p>
          <p className="text-xs text-gray-500">{periodo?.estado_descripcion}</p>
        </div>

        <div className="flex">
          <Link
            to={`/admin/academico/creacion-periodo/${periodo?.id_periodo}`}
          >
            <button type="button" className="px-1 mr-1 text-blue-400 hover:text-blue-600"
              title="Creación de Período Académico"
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader color="#60a5fa" size={20} /> : <BookCopy />}
            </button>
          </Link>
          {periodo.estado == "0" && (
            <div>
              <button type="button" className="px-1 mr-1 text-gray-400 hover:text-gray-600"
                title="Editar"
                onClick={() => setIsOpenPeriodoModal(true)}
                disabled={isLoading}
              >
                {isLoading ? <ClipLoader color="#60a5fa" size={20} /> : <Pencil />}
              </button>
              <button type="button" className="px-1 mr-1 text-red-400 hover:text-red-600"
                title="Eliminar"
                onClick={() => setIsOpenDelete(true)}
                disabled={isLoading}
              >
                {isLoading ? <ClipLoader color="#60a5fa" size={20} /> : <Trash2 />}
              </button>
            </div>
          )}
          <div
            className="transition duration-200 transition-all cursor-pointer ml-2"
            style={{
              height: "26px",
              width: "26px",
              transform: isActivityOpen ? "rotate(180deg)" : "rotate(0deg)", 
            }}
            onClick={handleActivityClick}
          >
            <FlechaBajo_icon></FlechaBajo_icon>
          </div>
        </div>
      </div>
      <div className="">
      {isActivityOpen && carreras.map((item, index) => (
        <React.Fragment key={item.id_carrera}>
          <div className="w-[90%] ml-auto mb-1 bg-blue-300 h-[50px] transition duration-200 transition-all"
          >
            <div className="w-full bg-blue-50 h-full">
              <div className="w-full flex items-center relative transition duration-200 rounded rounded-md h-full hover:bg-blue-200 py-2 overflow-hidden">
                <span className="flex bg-blue-500 absolute left-0 top-0 h-full w-[4px] rounded rounded-full"></span>
                <div className="w-full flex justify-between px-4 items-center">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-gray-900">
                      Carrera:
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.carrera_nombre}
                    </p>
                  </div>
                </div>

                <div className="w-full flex justify-between px-4 items-center">
                  <div className="flex flex-col">
                    <p className="text-sm font-medium text-gray-900">
                      Total ciclos:
                    </p>
                    <p className="text-xs text-gray-500">
                      {item.total_ciclos}
                    </p>
                  </div>
                </div>

                <div className="w-full flex justify-end px-4 items-center">
                  <div className="flex flex-col">
                    <Link
                      to={`/admin/academico/creacion-periodo/${periodo?.id_periodo}?id_carrera=${item.id_carrera}`}
                    >
                      <button type="button" className="px-1 mr-1 text-blue-400 hover:text-blue-600"
                        title="Creación de Período Académico"
                        disabled={isLoading}
                      >
                        {isLoading ? <ClipLoader color="#60a5fa" size={20} /> : <BookCopy />}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      ))}
      </div>

      <Dialog open={isOpenDelete} onClose={() => setIsOpenDelete(false)}>
        <DialogTitle>
          ¿Estás seguro de que quieres eliminar este periodo?
        </DialogTitle>
        <div className="flex gap-2 p-4 justify-center">
          <Button onClick={() => setIsOpenDelete(false)} variant="outlined">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} variant="contained">
            Eliminar
          </Button>
        </div>
      </Dialog>

      {isOpenPeriodoModal && <AcademicPeriodAModal onClose={() => {setIsOpenPeriodoModal(false); refresh();}} idPeriodoEdit={periodo.id_periodo} />}
    </>
  );
}

export default function AcademicPeriodA() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenPeriodoModal, setIsOpenPeriodoModal] = useState(false);
  const [periodos, setPeriodos] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const handlePeriodos = (page_) => {
    setPage(page_);
    setIsLoading(true);
    apiClient.get(Api_Global_Admin.academicoPeriodos.listar({
      per_page: perPage,
      page: page_,
    }, searchQuery))
      .then((response) => {
        setIsLoading(false);
        const from = response.data.from;
        const data = response.data.data.map((item, index) => ({
          ...item,
          index: (index + from),
        }));
        setPeriodos(data);
        setTotal(response.data.total);
      })
      .catch((error) => {
        setIsLoading(false);
        setPeriodos([]);
      });
  };

  useEffect(() => {
    handlePeriodos(page);
  }, []);

  return (
    <div className="flex flex-col justify-start items-center min-h-screen text-lg w-full bg-sky-50 p-6">
      <div className="w-full max-w-7xl bg-white">
        <div className="flex items-center gap-2 p-2 text-2xl">
          <Calendar size="80" className="text-gray-500" />
          <span class="font-bold text-gray-500">Período Académico</span>
        </div>
        <hr />
      </div>
      <div className="w-full max-w-7xl p-2 bg-white">
        <div className="flex justify-between items-center mb-6 mt-5 gap-2 max-w-4xl">
          <div className="relative w-full w-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="texto busqueda"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border rounded-md pl-10 pr-3 py-2 text-sm outline-none w-full"
            />
          </div>
          <div className="flex gap-2">
            <button
              variant="contained"
              color="success"
              onClick={() => handlePeriodos(1)}
              className="text-white flex w-32 h-9 bg-[#4c8bff] rounded-lg items-center justify-center gap-1 py-1 ml-1"
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader color="#ffffff" size={20} /> : <Search />}
              Buscar
            </button>
            <button
              variant="contained"
              color="success"
              onClick={() => setIsOpenPeriodoModal(true)}
              className="text-white flex w-32 h-9 bg-[#5CB85C] rounded-lg items-center justify-center gap-1 py-1"
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader color="#ffffff" size={20} /> : <PlusIcon />}
              Registrar
            </button>
          </div>
        </div>

        {periodos.length ? (
          periodos.map((item, index) => (
            <CardA periodo={item} index={(index+1)} refresh={() => handlePeriodos(page)} />
          ))
        ) : (
          <div className="flex items-center justify-center h-40 font-bold backdrop-blur-sm">
            No hay periodos no encontrados.
          </div>
        )}

        <TableFoot5 perPage={perPage} page={page} total={total} changePage={(data) => handlePeriodos(data)} />
      </div>

      {isOpenPeriodoModal && <AcademicPeriodAModal onClose={() => {setIsOpenPeriodoModal(false); handlePeriodos(page);}} idPeriodoEdit={null} />}
      <ToastContainer />
    </div>
  );
}