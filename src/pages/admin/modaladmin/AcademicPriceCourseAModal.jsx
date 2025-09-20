import { Trash2 } from "lucide-react";
import { Button, IconButton, Dialog, DialogTitle } from "@mui/material";
import TableSA from "@/components/tables/TableSA";
import { useState, useEffect } from "react";
import { Api_Global_Admin } from "../../../services/AdminApi";
import apiClient from "../../../Utils/apiClient";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

export default function AcademicPriceCourseAModal({ onClose, periodoCurso }) {
  const [isLoading, setLoading] = useState(false);
  const [isOpenDeleteModal, setOpenDeleteModal] = useState(false);
  const [precioToDelete, setPrecioToDelete] = useState(null);
  const [precios, setPrecios] = useState([]);
  const [formulario, setFormulario] = useState({
    importe: '',
    tipo: '1',
  });
  const columns = [
    { header: "N°", key: "id_periodocursoprecio" },
    { header: "Importe", key: "importe" },
    { header: "Tipo", key: "tipo_descripcion" },
    {
      header: "Acción",
      key: "action",
      render: (value, row) => (
        <div className="flex gap-2">
          <IconButton title="Eliminar" color="error" size="small" onClick={() => handleDeleteClick(row)}>
            <Trash2 />
          </IconButton>
        </div>
      ),
    },
  ];

  const closePriceModal = () => {
    setPrecios([]);
    onClose();
  };

  const handleSave = () => {
    const data = {
      importe: formulario.importe,
      tipo: formulario.tipo,
      id_periodocurso: periodoCurso.id_periodocurso,
    };
    setLoading(true);
    apiClient.post(Api_Global_Admin.academicoPeriodoCursoPrecios.registrar(), data)
      .then((response) => {
        setLoading(false);
        toast.success("Realizado.");
        setFormulario({
          ...formulario,
          importe: '',
          tipo:'1',
        });
        handleListarPrecios();
      })
      .catch((error) => {
        setLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleDeleteClick = (course) => {
    setPrecioToDelete(course);
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    apiClient.delete(Api_Global_Admin.academicoPeriodoCursoPrecios.eliminar(precioToDelete.id_periodocursoprecio))
      .then((response) => {
        toast.success("Realizado.");
        setOpenDeleteModal(false);
        handleListarPrecios();
      })
      .catch((error) => {
        setOpenDeleteModal(false);
        toast.warning(error.response.data);
      });
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleListarPrecios = () => {
    setLoading(true);
    apiClient.get(Api_Global_Admin.academicoPeriodoCursoPrecios.listar(periodoCurso.id_periodocurso))
      .then((response) => {
        setLoading(false);
        setPrecios(response.data);
      })
      .catch((error) => {
        setLoading(false);
        setPrecios([]);
        toast.warning(error.response.data);
      });
  };

  useEffect(() => {
    if (periodoCurso?.id_periodocurso) {
      handleListarPrecios();
    }
  }, [periodoCurso]);

  return (
    <div
      className="bg-gray-200 flex justify-center items-start fixed inset-0 z-50 p-0 md:p-6"
      style={{ background: "#4d4d4d21", backdropFilter: "blur(10px)" }}
      id="register-modal"
    >
      <div className="max-w-2xl bg-white rounded-lg shadow-lg relative overflow-auto">
        <button
          className="absolute right-4 top-4 text-white hover:text-white"
          onClick={() => closePriceModal()}
          aria-label="Cerrar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="bg-indigo-600 text-white p-4 rounded-t-lg">
          <h2 className="text-xl font-bold text-center">
            Registrar precios
          </h2>
        </div>

        <div className="px-4 pt-4 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-3 gap-3">
              <div style={{lineHeight: "0.85em"}}>
                <div className="font-bold text-gray-700">Curso</div>
                <div className="text-gray-500">{periodoCurso?.curso_nombre}</div>
              </div>
              <div style={{lineHeight: "0.85em"}}>
                <div className="font-bold text-gray-700">Docente</div>
                <div className="text-gray-700">{periodoCurso?.docente_nombre_completo}</div>
              </div>
              <div style={{lineHeight: "0.85em"}}>
                <label className="font-bold text-gray-700">Modalidad</label>
                <div className="text-gray-700">{periodoCurso?.modalidadestudio_nombre}</div>
              </div>
          </div>
          <hr className="my-4"/>
          <h1 className="mb-3"><strong>Registro precio</strong></h1>

          <form className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Importe</label>
                <input
                    type="number"
                    name="importe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    defaultValue=""
                    value={formulario.importe}
                    onChange={(e) => setFormulario({ ...formulario, importe: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Anual / Semestral</label>
                <select
                  name="tipo"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  defaultValue="1"
                  value={formulario.tipo}
                  onChange={(e) => setFormulario({ ...formulario, tipo: e.target.value })}
                >
                  <option value="1">Anual</option>
                  <option value="2">Mensual</option>
                </select>
              </div>
              <div className="flex items-end justify-start mb-1">
                <Button
                  disabled={isLoading}
                  onClick={handleSave}
                  variant="contained"
                  className="bg-indigo-600 hover:bg-indigo-700 gap-3"
                >
                  {isLoading ? <ClipLoader color="#ffffff" size={20} /> : ""}
                  Registrar
                </Button>
              </div>
            </div>
          </form>
          <hr className="mt-6" />
        </div>

        <Dialog open={isOpenDeleteModal} onClose={handleCloseDeleteModal} maxWidth="xs" fullWidth>
          <div className="flex flex-col gap-2 p-6 justify-center items-center">
            <DialogTitle>¿Estás seguro de eliminar?</DialogTitle>
            <div className="flex justify-center gap-6 p-2">
              <Button onClick={handleConfirmDelete} variant="contained">
                Sí
              </Button>
              <Button onClick={handleCloseDeleteModal} variant="outlined">
                No
              </Button>
            </div>
          </div>
        </Dialog>

        <TableSA columns={columns} rows={precios} />

        <ToastContainer />
      </div>
    </div>
  );
}