import { Pencil, PlusIcon, Search, Trash2, KeySquare, UserCog } from "lucide-react";
import { IconButton, Avatar, Dialog, DialogTitle, Button } from "@mui/material";
import TableSA5 from "@/components/tables/TableSA5";
import { useState, useEffect } from "react";
import UsuarioAModal from "./modaladmin/UsuarioAModal";
import GenerarPWUsuarioAModal from "./modaladmin/GenerarPWUsuarioAModal";
import ConfigUsuarioAModal from "./modaladmin/ConfigUsuarioAModal";
import { Api_Global_Admin } from "../../services/AdminApi";
import { Api_Global_Setup } from "../../services/SetupApi";
import apiClient from "../../Utils/apiClient";
import { rutaApi } from "../../Utils/Utils";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

function UsersA() {
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isOpenGenerarPWModal, setIsOpenGenerarPWModal] = useState(false);
  const [isOpenConfigModal, setIsOpenConfigModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [usuarios, setUsuarios] = useState([]);
  const [idUsuario, setIdUsuario] = useState("");
  const [isAddModalOpen, setAddModalOpen] = useState(false);
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
    { header: "Correo", key: "correo" },
    { header: "Estado", key: "estado_descripcion" },
    {
      header: "Acción",
      key: "action",
      render: (value, row) => (
        <div className="flex justify-center gap-2">
          <IconButton size="small" onClick={() => handleConfigurar(row)} disabled={isLoading} >
            {isLoading ? <ClipLoader color="#374151" size={20} /> : <UserCog />}
          </IconButton>
          <IconButton size="small" onClick={() => handleGenerar(row)} disabled={isLoading} >
            {isLoading ? <ClipLoader color="#374151" size={20} /> : <KeySquare />}
          </IconButton>
          <IconButton size="small" onClick={() => handleEdit(row)} disabled={isLoading} >
            {isLoading ? <ClipLoader color="#374151" size={20} /> : <Pencil />}
          </IconButton>
          <IconButton size="small" onClick={() => handleDeleteClick(row)} disabled={isLoading} >
            {isLoading ? <ClipLoader color="#374151" size={20} /> : <Trash2 />}
          </IconButton>
        </div>
      ),
    },
  ];

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setOpenModal(true);
  };

  const handleConfirmDelete = () => {
    setIsLoading(true);
    apiClient.delete(Api_Global_Admin.usuarios.eliminar(userToDelete.id_usuario))
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        handleUsuarios(page);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });

    setOpenModal(false);
    setUserToDelete(null);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleEdit = (student) => {
    setIdUsuario(student.id_usuario);
    setAddModalOpen(true);
  };

  const handleGenerar = (student) => {
    setIdUsuario(student.id_usuario);
    setIsOpenGenerarPWModal(true);
  };

  const handleConfigurar = (student) => {
    setIdUsuario(student.id_usuario);
    setIsOpenConfigModal(true);
  };

  const handleUsuarios = (page_) => {
    setPage(page_);
    setIsLoading(true);
    apiClient.get(Api_Global_Admin.usuarios.listar({
      per_page: perPage,
      page: page_,
    }, searchTerm))
      .then((response) => {
        setIsLoading(false);
        const from = response.data.from;
        const data = response.data.data.map((item, index) => ({
          ...item,
          index: (index + from),
          photo: "/placeholder.svg",
        }));
        setUsuarios(data);
        setTotal(response.data.total);
      })
      .catch((error) => {
        setIsLoading(false);
        setUsuarios([]);
        toast.warning(error.response.data);
      });
  };

  useEffect(() => {
    handleUsuarios(page);
  }, []);

  return (
    <>
      {isAddModalOpen && (
        <UsuarioAModal
          onClose={() => {
            setAddModalOpen(false);
            handleUsuarios(page);
          }}
          idUsuario={idUsuario}
        />
      )}

      {isOpenGenerarPWModal && (
        <GenerarPWUsuarioAModal
          onClose={() => {
            setIsOpenGenerarPWModal(false);
            handleUsuarios(page);
          }}
          idUsuario={idUsuario}
        />
      )}

      {isOpenConfigModal && (
        <ConfigUsuarioAModal
          onClose={() => {
            setIsOpenConfigModal(false);
            handleUsuarios(page);
          }}
          idUsuario={idUsuario}
        />
      )}

      <div className="flex flex-col justify-start items-center min-h-screen text-lg w-full bg-sky-50 p-6">
        <div className="w-full max-w-7xl p-2">
          <div className="flex justify-end items-center text-sm text-gray-500">
            <span>
              <a href="#" className="hover:underline">
                <span className="text-gray-900">Iaion &gt; Menú &gt; Usuario</span>
              </a>
            </span>
          </div>
        </div>

        <div className="w-full max-w-7xl p-2 bg-white">
          <div className="flex justify-between items-center mb-2 mt-5">
            <div className="flex items-center gap-2">
              <div className="w-full sm:w-96 max-w-full">
                <div className="relative w-full sm:w-auto">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="texto busqueda"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border rounded-md pl-10 pr-3 py-2 text-sm outline-none w-full"
                  />
                </div>
              </div>
              <div>
                <button
                  onClick={() => handleUsuarios(1)}
                  className="text-[#22A8E8] flex w-28 h-9 border rounded-lg border-[#22A8E8] items-center justify-center gap-1"
                  disabled={isLoading}
                >
                  {isLoading ? <ClipLoader color="#374151" size={20} /> : ""}
                  <Search className="mr-2 h-4 w-4" />
                  Buscar
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setIdUsuario("");
                  setAddModalOpen(true);
                }}
                className="text-white flex w-28 h-9 bg-green-800 hover:bg-green-700 items-center justify-center gap-1"
                disabled={isLoading}
              >
                {isLoading ? <ClipLoader color="#ffffff" size={20} /> : ""}
                <PlusIcon className="mr-2 h-4 w-4" />
                Agregar
              </button>
            </div>
          </div>
        </div>

        <Dialog open={openModal} onClose={handleCloseModal} maxWidth="xs" fullWidth>
          <div className="flex flex-col gap-2 p-6 justify-center items-center">
            <DialogTitle>¿Estás seguro de eliminar?</DialogTitle>
            <div className="flex justify-center gap-6 p-2">
              <Button onClick={handleConfirmDelete} variant="contained">
                Sí
              </Button>
              <Button onClick={handleCloseModal} variant="outlined">
                No
              </Button>
            </div>
          </div>
        </Dialog>

        <TableSA5 columns={columns} rows={usuarios} perPage={perPage} page={page} total={total} changePage={(data) => handleUsuarios(data)} />
      </div>
      <ToastContainer />
    </>
  );
}

export default UsersA;