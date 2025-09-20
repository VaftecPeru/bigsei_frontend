import { Pencil, PlusIcon, Search, Trash2, GraduationCap } from "lucide-react";
import { IconButton, Dialog, DialogTitle, Button } from "@mui/material";
import { useState, useEffect } from 'react';
import TableSA5 from "@/components/tables/TableSA5";
import { Api_Global_Setup } from "../../services/SetupApi";
import apiClient from "../../Utils/apiClient";
import CarreraModal from "./modal/CarreraModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

export default function Carrera() {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [carreras, setCarrearas] = useState([]);
  const [idCarreraEdit, setIdCarreraEdit] = useState(null);
  const [idCarreraDelete, setIdCarreraDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const columns = [
    { header: "N°", key: "index" },
    { header: "Carrera", key: "nombre" },
    { header: "Fecha inicio", key: "fecha_inicio" },
    { header: "Estado", key: "estado_descripcion" },
    {
      header: "Acción",
      key: "action",
      render: (value, row) => (
        <div className="flex gap-2" style={{justifyContent: "center"}}>
          <IconButton
            size="small"
            onClick={() => handleEditClick(row)}
          >
            {isLoading ? <ClipLoader color="#374151" size={24} /> : <Pencil />}
          </IconButton>
          <IconButton size="small" onClick={() => handleDeleteClick(row)}>
            {isLoading ? <ClipLoader color="#374151" size={24} /> : <Trash2 />}
          </IconButton>
        </div>
      ),
    },
  ];
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const handleDeleteClick = (row) => {
    setIdCarreraDelete(row.id_carrera);
    setIsOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    setIsOpenDeleteModal(false);
    setIsLoading(true);
    apiClient.delete(Api_Global_Setup.carreras.eliminar(idCarreraDelete))
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        setIdCarreraDelete(null);
        handleCarreras(page);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleCloseDeleteModal = () => {
    setIsOpenDeleteModal(false);
    setIdCarreraDelete(null);
  };

  const handleEditClick = (row) => {
    setIdCarreraEdit(row.id_carrera);
    setIsOpenModal(true);
  };

  const handleCarreras = (page_) => {
    setPage(page_);
    setIsLoading(true);
    apiClient.get(Api_Global_Setup.carreras.listar({
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
        setCarrearas(data);
        setTotal(response.data.total);
      })
      .catch((error) => {
        setIsLoading(false);
        setCarrearas([]);
      });
  };

  useEffect(() => {
    handleCarreras(page);
  }, []);

  return (
    <div className="flex flex-col justify-start items-center min-h-screen text-lg w-full bg-sky-50 p-6">
      <div className="w-full max-w-7xl bg-white">
        <div className="flex items-center gap-2 p-2 text-2xl">
          <GraduationCap size="80" className="text-gray-500" />
          <span class="font-bold text-gray-500">Carreras</span>
        </div>
        <hr />
      </div>
      <div className="w-full max-w-7xl p-2 bg-white">
        <div className="flex justify-between items-center mb-4 mt-5 gap-2 max-w-4xl">
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
              onClick={() => handleCarreras(1)}
              className="text-white flex w-32 h-9 bg-[#4c8bff] rounded-lg items-center justify-center gap-1 py-1 ml-1"
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader color="#ffffff" size={20} /> : <Search />}
              Buscar
            </button>
            <button
              variant="contained"
              color="success"
              onClick={() => setIsOpenModal(true)}
              className="text-white flex w-32 h-9 bg-[#5CB85C] rounded-lg items-center justify-center gap-1 py-1"
              disabled={isLoading}
            >
              {isLoading ? <ClipLoader color="#ffffff" size={20} /> : <PlusIcon />}
              Registrar
            </button>
          </div>
        </div>
        <TableSA5 columns={columns} rows={carreras} perPage={perPage} page={page} total={total} changePage={(data) => handleCarreras(data)} />
      </div>

      <Dialog open={isOpenDeleteModal} onClose={handleCloseDeleteModal}>
        <DialogTitle>
          ¿Estás seguro de que quieres eliminar este periodo?
        </DialogTitle>
        <div className="flex gap-2 p-4 justify-center">
          <Button onClick={handleCloseDeleteModal} variant="outlined">
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} variant="contained">
            Eliminar
          </Button>
        </div>
      </Dialog>

      {isOpenModal && <CarreraModal onClose={() => {setIsOpenModal(false); setIdCarreraEdit(null); handleCarreras(page);}} idCarreraEdit={idCarreraEdit} />}
      <ToastContainer />
    </div>
  );
}