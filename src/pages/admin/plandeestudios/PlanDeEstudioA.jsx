
import { Pencil, PlusIcon, Search, Trash2, BookAIcon, Calendar } from "lucide-react";
import { IconButton, Dialog, DialogTitle, Button } from "@mui/material";
import { useState } from 'react';
import TableSA from "@/components/tables/TableSA";
import { useEffect } from "react";
import { Api_Global_Admin } from "../../../services/AdminApi";
import apiClient from "../../../Utils/apiClient";
import PlanDeEstudioAModal from "../modaladmin/PlanDeEstudioAModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';

export default function PlanDeEstudioA() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenPlanModal, setIsOpenPlanModal] = useState(false);
  const [isOpenConfirmDelete, setIsOpenConfirmDelete] = useState(false);
  const [idPlanestudioEdit, setIdPlanestudioEdit] = useState(null);
  const [idPlanestudioDelete, setIdPlanestudioDelete] = useState(null);
  const [planes, setPlanes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const columns = [
    { header: "N°", key: "index" },
    { header: "Plan", key: "nombre" },
    { header: "Carrera", key: "carrera_nombre" },
    { header: "Fecha", key: "fecha_inicio" },
    {
      header: "Publicado",
      key: "esta_publicado",
      render: (value, row) => (
        <div className="flex gap-2">
          {row.esta_publicado == '1' ? (
            <span className="text-white text-center w-10 py-1 px-2 bg-[#4c8bff] rounded-lg">SI</span>
          ) : (
            <span className="text-white text-center w-10 py-1 px-2 bg-[#6b7280] rounded-lg">NO</span>
          )}
        </div>
      ),
    },
    {
      header: "Estado",
      key: "estado",
      render: (value, row) => (
        <div className="flex gap-2">
          {row.estado == '1' ? (
            <span className="text-white text-center w-18 py-1 px-2 bg-[#5CB85C] rounded-lg">{row.estado_descripcion}</span>
          ) : (
            <span className="text-white text-center w-18 py-1 px-2 bg-[#ff5f5f] rounded-lg">{row.estado_descripcion}</span>
          )}
        </div>
      ),
    },
    {
      header: "Acción",
      key: "action",
      render: (value, row) => (
        <div className="flex gap-2">
          <Link
            to={`/admin/creacion-de-plan/${row.id_planestudio}`}
          >
            <IconButton
              size="small"
              title="Creación de Plan"
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader color="#374151" size={20} /> : <BookAIcon />}
            </IconButton>
          </Link>
          <IconButton
            size="small"
            title="Editar"
            onClick={() => handleEditClick(row)}
            disabled={isLoading}
          >
            {isLoading ? <ClipLoader color="#374151" size={20} /> : <Pencil />}
          </IconButton>
          <IconButton size="small" title="Eliminar" onClick={() => handleDeleteClick(row)}>
            {isLoading ? <ClipLoader color="#374151" size={20} /> : <Trash2 />}
          </IconButton>
        </div>
      ),
    },
  ];

  const handleDeleteClick = (row) => {
    setIdPlanestudioDelete(row.id_planestudio);
    setIsOpenConfirmDelete(true);
  };

  const handleDeleteCloseModal = () => {
    setIdPlanestudioDelete(null);
    setIsOpenConfirmDelete(false);
  };

  const handleEditClick = (row) => {
    setIdPlanestudioEdit(row.id_planestudio);
    setIsOpenPlanModal(true);
  };

  const handleDelete = () => {
    setIsOpenConfirmDelete(false);
    setIsLoading(true);
    apiClient.delete(Api_Global_Admin.planEstudios.eliminar(idPlanestudioDelete))
      .then((response) => {
        setIsLoading(false);
        setIdPlanestudioDelete(null);
        handlePlanes();
        toast.success("Realizado.");
      })
      .catch((error) => {
        setIsLoading(false);
        setIdPlanestudioDelete(null);
        toast.warning(error.response.data);
      });
  };

  const handlePlanes = () => {
    setIsLoading(true);
    apiClient.get(Api_Global_Admin.planEstudios.listar({
      per_page: 15,
      page: 1,
    }, searchQuery))
      .then((response) => {
        setIsLoading(false);
        const data = response.data.data.map((item, index) => ({
          ...item,
          index: (index+1),
        }));
        setPlanes(data);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  useEffect(() => {
    handlePlanes();
  }, []);

  return (
    <div className="flex flex-col justify-start items-center min-h-screen text-lg w-full bg-sky-50 p-6">
      <div className="w-full max-w-7xl p-2 bg-white">
        <div className="flex justify-between items-center mb-4 mt-5">
          <div className="flex items-center gap-2 p-2 text-2xl">
            <Calendar size="80" className="text-gray-500" />
            <span class="font-bold text-gray-500">Planes académicos</span>
          </div>
        </div>
        <hr />

        <div className="flex justify-between items-center mb-4 mt-5">
          <div className="flex items-center gap-2">
            <div className="w-full sm:w-96 max-w-full flex items-center">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <input
                  type="text"
                  placeholder="ingrese texto"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border rounded-md pl-10 pr-3 py-1 text-sm outline-none w-full py-2"
                />
              </div>
              <button
                variant="contained"
                color="success"
                onClick={() => handlePlanes()}
                className="text-white flex w-28 h-9 bg-[#4c8bff] rounded-lg items-center justify-center gap-1 py-1 ml-1"
                disabled={isLoading}
              >
                {isLoading ? <ClipLoader color="#ffffff" size={20} /> : ""}
                <Search />
                Buscar
              </button>
            </div>
          </div>
          <div className="flex gap-2">
            <div>
              <button
                variant="contained"
                color="success"
                onClick={() => setIsOpenPlanModal(true)}
                className="text-white flex w-28 h-9 bg-[#5CB85C] rounded-lg items-center justify-center gap-1"
                disabled={isLoading}
              >
                {isLoading ? <ClipLoader color="#ffffff" size={20} /> : ""}
                <PlusIcon />
                Registrar
              </button>
            </div>
          </div>
        </div>

        <TableSA columns={columns} rows={planes} />
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
      {isOpenPlanModal && <PlanDeEstudioAModal onClose={() => {setIsOpenPlanModal(false); handlePlanes();}} idPlanestudioEdit={idPlanestudioEdit} />}
      <ToastContainer />
    </div>
  );
}