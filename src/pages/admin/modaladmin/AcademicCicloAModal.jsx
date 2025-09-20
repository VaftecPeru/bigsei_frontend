import { Button, Dialog, TextField } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { Api_Global_Admin } from "../../../services/AdminApi";
import { Api_Global_Setup } from "../../../services/SetupApi";
import apiClient from "../../../Utils/apiClient";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

export default function AcademicCicloAModal({ onClose, idPeriodo, idCarrera, idPeriodocicloEdit }) {
  const isEditing = false, ciclo = null;
  const [isLoading, setIsLoading] = useState(false);
  const [periodos, setPeriodos] = useState([]);
  const [carreras, setCarreras] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(true);
  const [cicloToEdit, setCicloToEdit] = useState({
    id_periodociclo: "",
    id_periodo: idPeriodo || "",
    id_carrera: idCarrera || "",
    descripcion: "",
    codigo: "",
    id_tipotituloacademico: "",
    id_tituloacademico: "",
    estado: "1",
    id_ciclo: "",
    id_planestudio: "",
    id_planestudiociclo: "",
  });
  const [tipotituloacademicos, setTipotituloacademicos] = useState([]);
  const [tituloacademicos, setTituloacademicos] = useState([]);
  const [planes, setPlanes] = useState([]);
  const [ciclos, setCiclos] = useState([]);

  const handleCloseModalAdd = () => {
    setIsOpenModal(false);
    onClose(false);
  };

  const handleConfirmAddOrEdit = () => {
    const data = {
      id_periodo: cicloToEdit.id_periodo,
      descripcion: cicloToEdit.descripcion,
      codigo: cicloToEdit.codigo,
      id_carrera: cicloToEdit.id_carrera,
      id_tipotituloacademico: cicloToEdit.id_tipotituloacademico,
      id_tituloacademico: cicloToEdit.id_tituloacademico,
      estado: cicloToEdit.estado,
      id_ciclo: cicloToEdit.id_ciclo,
      id_planestudio: cicloToEdit.id_planestudio,
      id_planestudiociclo: cicloToEdit.id_planestudiociclo,
    };

    if (idPeriodocicloEdit) {
      handleEditar(data);
    } else {
      handleRegistrar(data);
    }
  };

  const handleRegistrar = (data) => {
    setIsLoading(true);
    apiClient.post(Api_Global_Admin.academicoPeriodoCiclos.registrar(), data)
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        handleCloseModalAdd();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleEditar = (data) => {
    setIsLoading(true);
    apiClient.put(Api_Global_Admin.academicoPeriodoCiclos.editar(idPeriodocicloEdit), data)
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        handleCloseModalAdd();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handlePeriodos = () => {
    apiClient.get(Api_Global_Admin.academicoPeriodos.listar({
      per_page: 100,
      page: 1,
    }, ""))
      .then((response) => {
        setPeriodos(response.data.data);
      })
      .catch((error) => {
        setPeriodos([]);
        toast.warning(error.response.data);
      });
  };

  const handleCarreras = () => {
    apiClient.get(Api_Global_Setup.carreras.listar({
      per_page: 50,
      page: 1,
    }, ""))
      .then((response) => {
        setCarreras(response.data.data);
      })
      .catch((error) => {
        setCarreras([]);
        toast.warning(error.response.data);
      });
  };

  const handleTipoTitulos = () => {
    apiClient.get(Api_Global_Setup.tipoTituloAcademicos.listarActivos(""))
      .then((response) => {
        setTipotituloacademicos(response.data);
      })
      .catch((error) => {
        setTipotituloacademicos([]);
        toast.warning(error.response.data);
      });
  };

  const handleTituloAcademicos = (id_tipotituloacademico) => {
    apiClient.get(Api_Global_Setup.tituloAcademicos.listarActivos("", id_tipotituloacademico))
      .then((response) => {
        setTituloacademicos(response.data);
      })
      .catch((error) => {
        setTituloacademicos([]);
        toast.warning(error.response.data);
      });
  };

  const handlePlanCiclos = (id_planestudio) => {
    apiClient.get(Api_Global_Admin.planEstudioCiclos.listar({
        per_page: 15,
        page: 1,
    }, id_planestudio, ""))
      .then((response) => {
        setCiclos(response.data.data);
      })
      .catch((error) => {
        setCiclos([]);
        toast.warning(error.response.data);
      });
  };

  const handlePlanes = () => {
    apiClient.get(Api_Global_Admin.planEstudios.listar({
      per_page: 50,
      page: 1,
    }, "", "1", idCarrera))
      .then((response) => {
        setPlanes(response.data.data);
      })
      .catch((error) => {
        setPlanes([]);
        toast.warning(error.response.data);
      });
  };

  const handleCiclo = () => {
    setIsLoading(true);
    apiClient.get(Api_Global_Admin.academicoPeriodoCiclos.mostrar(idPeriodocicloEdit))
      .then((response) => {
        setIsLoading(false);
        setCicloToEdit(response.data);
        handleTituloAcademicos(response.data.id_tipotituloacademico);
        handlePlanCiclos(response.data.id_planestudio);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  useEffect(() => {
    handlePeriodos();
    handleCarreras();
    handleTipoTitulos();
    handlePlanes();
    if (idPeriodocicloEdit) {
      handleCiclo();
    }
  }, []);

  return (
    <Dialog open={isOpenModal} maxWidth="sm" fullWidth className="backdrop-blur-md">
      <div className="text-2xl p-2 font-bold text-center my-4">
        <p>{isEditing ? "Editar Ciclo" : "Registrar Ciclo"}</p>
      </div>
      <hr />
      <div>
        <form>
          <div className="px-7 pt-7 gap-3 grid grid-cols-1 md:grid-cols-2">
            <div>
              <label htmlFor="id_periodo" className="block text-gray-500 mb-1">Periodo:</label>
              <select
                name="id_periodo"
                value={cicloToEdit.id_periodo}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                disabled
                >
                <option value="">--Seleccione--</option>
                {periodos.map((item) => <option value={item.id_periodo} key={item.id_periodo}>{item.nombre}</option> )}
              </select>
            </div>
            <div>
              <label htmlFor="id_carrera" className="block text-gray-500 mb-1">Carrera:</label>
              <select
                name="id_carrera"
                value={cicloToEdit.id_carrera}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                disabled
                >
                <option value="">--Seleccione--</option>
                {carreras.map((item) => <option value={item.id_carrera} key={item.id_carrera}>{item.nombre}</option> )}
              </select>
            </div>
            <div>
              <label htmlFor="id_planestudio" className="block text-gray-500 mb-1">Plan académico:</label>
              <select
                id="id_planestudio"
                name="id_planestudio"
                value={cicloToEdit.id_planestudio}
                onChange={(e) => {
                  const value = e.target.value;
                  setCicloToEdit({
                    ...cicloToEdit,
                    id_planestudio: value,
                  });
                  handlePlanCiclos(value);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                <option value="">--Seleccione--</option>
                {planes.map((item) => <option value={item.id_planestudio} key={item.id_planestudio}>{item.nombre}</option> )}
              </select>
            </div>
            <div>
              <label htmlFor="id_planestudiociclo" className="block text-gray-500 mb-1">Ciclo:</label>
              <select
                id="id_planestudiociclo"
                name="id_planestudiociclo"
                value={cicloToEdit.id_planestudiociclo}
                onChange={(e) => {
                  const value = e.target.value;
                  const selected = ciclos.find(item => item.id_planestudiociclo == value)
                  setCicloToEdit({
                    ...cicloToEdit,
                    id_planestudiociclo: value,
                    id_ciclo: selected?.id_ciclo,
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                <option value="">--Seleccione--</option>
                {ciclos.map((item) => <option value={item.id_planestudiociclo} key={item.id_planestudiociclo}>{item.nombre}</option> )}
              </select>
            </div>
            <div>
              <label htmlFor="id_tipotituloacademico" className="block text-gray-500 mb-1">Título académico:</label>
              <select
                id="id_tipotituloacademico"
                name="id_tipotituloacademico"
                value={cicloToEdit.id_tipotituloacademico}
                onChange={(e) => {
                  const value = e.target.value;
                  setCicloToEdit({
                    ...cicloToEdit,
                    id_tipotituloacademico: value,
                  });
                  handleTituloAcademicos(value);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                <option value="">--Seleccione--</option>
                {tipotituloacademicos.map((item) => <option value={item.id_tipotituloacademico} key={item.id_tipotituloacademico}>{item.nombre}</option> )}
              </select>
            </div>
            <div>
              <label htmlFor="id_tituloacademico" className="block text-gray-500 mb-1">Título académico(especificado):</label>
              <select
                id="id_tituloacademico"
                name="id_tituloacademico"
                value={cicloToEdit.id_tituloacademico}
                onChange={(e) => {
                  const value = e.target.value;
                  setCicloToEdit({
                    ...cicloToEdit,
                    id_tituloacademico: value,
                  });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                <option value="">--Seleccione--</option>
                {tituloacademicos.map((item) => <option value={item.id_tituloacademico} key={item.id_tituloacademico}>{item.nombre}</option> )}
              </select>
            </div>
            <div>
              <label htmlFor="codigo" className="block text-gray-500 mb-1">Código:</label>
              <TextField
                fullWidth
                id="codigo"
                type="text"
                variant="outlined"
                size="small"
                value={cicloToEdit.codigo}
                onChange={(e) => {
                  const value = e.target.value;
                  setCicloToEdit({
                    ...cicloToEdit,
                    codigo: value,
                  });
                }}
              />
            </div>
            <div>
              <label htmlFor="estado" className="block text-gray-500 mb-1">Estado:</label>
              <select
                id="estado"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                value={cicloToEdit.estado}
                onChange={(e) => {
                  const value = e.target.value;
                  setCicloToEdit({
                    ...cicloToEdit,
                    estado: value,
                  });
                }}
              >
                <option value="1">ACTIVO</option>
                <option value="0">INACTIVO</option>
              </select>
            </div>
          </div>
          <div className="px-7 pb-7 pt-3 gap-4 grid grid-cols-1 md:grid-cols-1">
            <div>
              <label htmlFor="descripcion" className="block text-gray-500 mb-1">Descripción:</label>
              <textarea
                fullWidth
                id="descripcion"
                value={cicloToEdit.descripcion}
                onChange={(e) => {
                  const value = e.target.value;
                  setCicloToEdit({
                    ...cicloToEdit,
                    descripcion: value,
                  });
                }}
              />
            </div>
          </div>
        </form>
      </div>
      <hr />
      <div className="flex flex-col gap-2 p-6 justify-center items-center">
        <div className="flex justify-center gap-6 p-2">
          <Button onClick={handleCloseModalAdd} variant="outlined" disabled={isLoading}>
            {isLoading ? <ClipLoader color="#374151" size={20} /> : 'Cancelar'}
          </Button>
          <Button onClick={handleConfirmAddOrEdit} variant="contained" disabled={isLoading}>
            {isLoading ? <ClipLoader color="#ffffff" size={20} /> : 'Guardar'}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}