import { Pencil, PlusIcon, Search, Trash2 } from "lucide-react";
import { IconButton, Avatar, Dialog, DialogTitle, Button } from "@mui/material";
import TableSA5 from "@/components/tables/TableSA5";
import { useState, useEffect } from "react";
import DocenteAModal from "./modaladmin/DocenteAModal";
import { Api_Global_Admin } from "../../services/AdminApi";
import apiClient from "../../Utils/apiClient";
import { Api_Global_Setup } from "../../services/SetupApi";
import { rutaApi } from "../../Utils/Utils";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

export default function TeachingA() {
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [docentes, setDocentes] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [idDocenteEdit, setIdDocenteEdit] = useState(null);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const columns = [
    { header: "N°", key: "index" },
    {
      header: "Foto",
      key: "photo",
      render: (value, row) => (
        <div className="flex justify-center">
          {row.id_archivo_foto ? (
            <Avatar src={`${rutaApi(Api_Global_Setup.archivos.visualizarImagen(row.id_archivo_foto))}`} alt="Foto" />
          ) : (
            <Avatar src={value} alt="Foto" />
          )}
        </div>
      ),
    },
    { header: "Documento", key: "numero_documento" },
    { header: "Nombre", key: "nombre_completo" },
    { header: "Celular", key: "telefono" },
    { header: "Correo", key: "correo" },
    { header: "Estado", key: "estado_descripcion" },
    {
      header: "Acción",
      key: "action",
      render: (value, row) => (
        <div className="flex justify-center gap-2">
          <IconButton
            size="small"
            onClick={() => handleEdit(row)}
          >
            <Pencil />
          </IconButton>
          <IconButton size="small" onClick={() => handleDeleteClick(row)}>
            <Trash2 />
          </IconButton>
        </div>
      ),
    },
  ];

  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setOpenModal(true);
  };

  const handleConfirmDelete = async () => {
    setOpenModal(false);
    setIsLoading(true);
    apiClient.delete(Api_Global_Admin.docentes.eliminar(studentToDelete.id_docente))
      .then((response) => {
        setIsLoading(false);
        setStudentToDelete(null);
        handleDocentes(page);
        toast.success("Realizado.");
      })
      .catch((error) => {
        setIsLoading(false);
        setStudentToDelete(null);
        toast.warning(error.response.data);
      });
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleEdit = (docente) => {
    setIdDocenteEdit(docente.id_docente);
    setAddModalOpen(true);
  };

  const handleDocentes = (page_) => {
    setPage(page_);
    setIsLoading(true);
    apiClient.get(Api_Global_Admin.docentes.listar({
      per_page: perPage,
      page: page_,
    }, searchQuery))
      .then((response) => {
        setIsLoading(false);
        const from = response.data.from;
        const data = response.data.data.map((item, index) => ({
          ...item,
          index: (index + from),
          photo: "/placeholder.svg",
        }));
        setDocentes(data);
        setTotal(response.data.total);
      })
      .catch((error) => {
        setIsLoading(false);
        setDocentes([]);
        toast.warning(error.response.data);
      });
  };

  useEffect(() => {
    handleDocentes(page);
  }, []);

  return (
    <>
      {isAddModalOpen && (
        <DocenteAModal
          onClose={() => {
            setAddModalOpen(false);
            setIdDocenteEdit(null);
            handleDocentes(page);
          }}
          idDocenteEdit={idDocenteEdit}
        />
      )}
      <div className="flex flex-col justify-start items-center min-h-screen text-lg w-full bg-sky-50 p-6">
        <div className="w-full max-w-7xl p-2">
          <div className="flex justify-end items-center text-sm text-gray-500">
            <span>
              <a href="#" className="hover:underline">
                <span className="text-gray-900">Iaion &gt; Menú &gt; Docente</span>
              </a>
            </span>
          </div>
        </div>

        <div className="w-full max-w-7xl p-2 bg-white">
          <div className="flex justify-between items-center mb-4 mt-5">
            <div className="flex items-center gap-2">
              <div className="w-full sm:w-96 max-w-full flex gap-2">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="texto busqueda"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border rounded-md pl-10 pr-3 py-2 text-sm outline-none w-full"
                  />
                </div>
                <div>
                  <button
                    onClick={() => handleDocentes(1)}
                    className="text-[#22A8E8] flex w-28 h-9 border rounded-lg border-[#22A8E8] items-center justify-center gap-1"
                    disabled={isLoading}
                  >
                    {isLoading ? <ClipLoader color="#22A8E8" size={20} /> : ""}
                    <Search className="mr-2 h-4 w-4" />
                    Buscar
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setAddModalOpen(true)}
                variant="contained"
                color="success"
                className="text-white flex w-28 h-9 bg-green-800 hover:bg-green-700 items-center justify-center gap-1"
                disabled={isLoading}
              >
                {isLoading ? <ClipLoader color="#ffffff" size={20} /> : ""}
                <PlusIcon />
                Agregar
              </button>
            </div>
          </div>
        </div>

        <TableSA5 columns={columns} rows={docentes} perPage={perPage} page={page} total={total} changePage={(data) => handleDocentes(data)} />
      </div>

      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="xs" fullWidth>
        <div className="flex flex-col gap-2 p-6 justify-center items-center">
          <DialogTitle>¿Estás seguro de eliminar?</DialogTitle>
          <div className="flex justify-center gap-6 p-2">
            <Button onClick={handleConfirmDelete} variant="contained">
              Si
            </Button>
            <Button onClick={handleCloseModal} variant="outlined">
              No
            </Button>
          </div>
        </div>
      </Dialog>
      <ToastContainer />
    </>
  );
}