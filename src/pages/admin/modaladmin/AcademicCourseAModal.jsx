import { Dialog, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { Api_Global_Admin } from "../../../services/AdminApi";
import { Api_Global_Setup } from "../../../services/SetupApi";
import apiClient from "../../../Utils/apiClient";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';

export default function AcademicCourseAModal({ onClose, idPeriodo, idCarrera, idPeriodociclo, idPeriodocursoEdit }) {
  const isEditing = false, curso = null;
  const [isLoading, setIsLoading] = useState(false);
  const [docentes, setDocentes] = useState([]);
  const [secciones, setSecciones] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [tipoModalidadestudios, setTipoModalidadestudios] = useState([]);
  const [periodos, setPeriodos] = useState([]);
  const [carreras, setCarreras] = useState([]);
  const [periodociclos, setPeriodociclos] = useState([]);
  const [planEstudioCursos, setPlanEstudioCursos] = useState([]);
  const [openModalAdd, setOpenModalAdd] = useState(true);
  const [courseToEdit, setCourseToEdit] = useState({
    id_periodocurso: "",
    nombre: "",
    id_docente: "",
    id_tipomodalidadestudio: "",
    vacantes: "",
    id_periodo: idPeriodo || "",
    id_seccion: "",
    estado: "1",
    fecha_inicio: "",
    fecha_fin: "",
    hora_inicio: "",
    hora_fin: "",
    id_tipocategoria: "",
    id_periodociclo: idPeriodociclo || "",
    id_carrera: idCarrera || "",
    es_sincrono: "1",
    detalle: "",
    url_zoom: "",
    id_planestudiocurso: "",
    id_curso: "",
  });

  const handleConfirmAddOrEdit = () => {
    if (idPeriodocursoEdit) {
      handleEditar(courseToEdit);
    } else {
      handleRegistrar(courseToEdit);
    }
  };

  const handleRegistrar = (data) => {
    setIsLoading(true);
    apiClient.post(Api_Global_Admin.academicoPeriodoCursos.registrar(), data)
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
    apiClient.put(Api_Global_Admin.academicoPeriodoCursos.editar(idPeriodocursoEdit), data)
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

  const handleCloseModalAdd = () => {
    setOpenModalAdd(false);
    onClose();
  };

  const listarDocentes = async (text_search = "") => {
    try {
      const response = await apiClient.get(Api_Global_Admin.docentes.listar({
        per_page: 15,
        page: 1,
      }, text_search));
      const data = response.data.data.map((item) => ({
        id_docente: item.id_docente,
        nombre: item.nombre_completo,
      }));
      setDocentes(data);
    } catch (error) {
    } finally {
    }
  };

  const listarTipoModalidadestudios = async (text_search = "") => {
    try {
      const response = await apiClient.get(Api_Global_Setup.tipoModalidadestudios.listar(text_search));
      const data = response.data.map((item) => ({
        id_tipomodalidadestudio: item.id_tipomodalidadestudio,
        nombre: item.nombre,
      }));
      setTipoModalidadestudios(data);
    } catch (error) {
    } finally {
    }
  };

  const listarTipoCategorias = async (text_search = "") => {
    try {
      const response = await apiClient.get(Api_Global_Setup.tipoCategorias.listar(text_search, "1"));
      const data = response.data.map((item) => ({
        id_tipocategoria: item.id_tipocategoria,
        nombre: item.nombre,
      }));
      setCategorias(data);
    } catch (error) {
    } finally {
    }
  };

  const listarSecciones = () => {
    apiClient.get(Api_Global_Setup.secciones.listar(""))
      .then((response) => {
        setSecciones(response.data);
      })
      .catch((error) => {
        setSecciones([]);
        toast.warning(error.response.data);
      });
  };

  const listarPeriodos = () => {
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

  const handleCiclos = () => {
    apiClient.get(Api_Global_Admin.academicoPeriodoCiclos.listar({
      per_page: 50,
      page: 1,
    }, idPeriodo, idCarrera, ""))
      .then((response) => {
        setPeriodociclos(response.data.data);
        const selected = response.data.data.find((item) => item.id_periodociclo == idPeriodociclo);
        if (selected) {
          handlePlanEstudioCursos(selected.id_planestudiociclo);
        }
      })
      .catch((error) => {
        setPeriodociclos([]);
      });
  };

  const handlePlanEstudioCursos = (id_planestudiociclo) => {
    apiClient.get(Api_Global_Admin.planEstudioCursos.listar({
      per_page: 15,
      page: 1,
    }, id_planestudiociclo, ""))
      .then((response) => {
        setPlanEstudioCursos(response.data.data);
      })
      .catch((error) => {
        setPlanEstudioCursos([]);
      });
  };

  const handleCurso = () => {
    setIsLoading(true);
    apiClient.get(Api_Global_Admin.academicoPeriodoCursos.mostrar(idPeriodocursoEdit))
      .then((response) => {
        setIsLoading(false);
        setCourseToEdit(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  useEffect(() => {
    listarDocentes("");
    listarTipoModalidadestudios("");
    listarPeriodos();
    listarSecciones();
    listarTipoCategorias("");
    handleCarreras();
    handleCiclos();
    if (idPeriodocursoEdit) {
      handleCurso();
    }
  }, []);

  return (
    <Dialog open={openModalAdd} maxWidth="sm" fullWidth className="backdrop-blur-md">
      <div className="bg-indigo-600 text-white p-4 rounded-t-lg">
        <h2 className="text-xl font-bold text-center">
          {isEditing ? "Editar Curso" : "Registrar Curso"}
        </h2>
      </div>
      <div className="p-4 max-h-[70vh] overflow-y-auto">
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Periodo</label>
                <select
                  id="id_periodo"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={courseToEdit.id_periodo}
                  disabled
                >
                  <option value="">--Seleccione--</option>
                  {periodos.map((item) => (
                    <option value={item.id_periodo} key={item.id_periodo}>{item.nombre}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Carrera</label>
                <select
                  id="id_carrera"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={courseToEdit.id_carrera}
                  disabled
                >
                  <option value="">--Seleccionar--</option>
                  {carreras.map((item) => (
                    <option value={item.id_carrera} key={item.id_carrera}>{item.nombre}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ciclo</label>
                <select
                  id="id_periodociclo"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={courseToEdit.id_periodociclo}
                  disabled
                >
                  <option value="">--Seleccionar--</option>
                  {periodociclos.map((item) => (
                    <option value={item.id_periodociclo} key={item.id_periodociclo}>{item.ciclo_nombre}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del curso</label>
                <select
                  id="id_planestudiocurso"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={courseToEdit.id_planestudiocurso}
                  onChange={(e) => {
                    const selected = planEstudioCursos.find(item => item.id_planestudiocurso == e.target.value);
                    setCourseToEdit({ ...courseToEdit, id_planestudiocurso: e.target.value, id_curso: selected.id_curso });
                  }}
                >
                  <option value="">--Seleccionar--</option>
                  {planEstudioCursos.map((item) => (
                    <option value={item.id_planestudiocurso} key={item.id_planestudiocurso}>{item.nombre}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sección</label>
                <select
                  id="id_seccion"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={courseToEdit.id_seccion}
                  onChange={(e) => setCourseToEdit({ ...courseToEdit, id_seccion: e.target.value })}
                >
                  <option value="">--Seleccione--</option>
                  {secciones.map((item) => (
                    <option value={item.id_seccion} key={item.id_seccion}>{item.nombre}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
                <select
                  id="estado"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={courseToEdit.estado}
                  onChange={(e) => setCourseToEdit({ ...courseToEdit, estado: e.target.value })}
                >
                  <option value="">--Seleccione--</option>
                  <option value="1">ACTIVO</option>
                  <option value="0">INACTIVO</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Docente</label>
                <select
                  id="id_docente"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={courseToEdit.id_docente}
                  onChange={(e) => setCourseToEdit({ ...courseToEdit, id_docente: e.target.value })}
                >
                  <option value="">--Seleccione--</option>
                  {docentes.map((item) => (
                    <option value={item.id_docente} key={item.id_docente}>{item.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Inicio</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={courseToEdit.fecha_inicio}
                    onChange={(e) => setCourseToEdit({ ...courseToEdit, fecha_inicio: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fecha Fin</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={courseToEdit.fecha_fin}
                    onChange={(e) => setCourseToEdit({ ...courseToEdit, fecha_fin: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hora Inicio</label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={courseToEdit.hora_inicio}
                    onChange={(e) => setCourseToEdit({ ...courseToEdit, hora_inicio: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hora Fin</label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={courseToEdit.hora_fin}
                    onChange={(e) => setCourseToEdit({ ...courseToEdit, hora_fin: e.target.value })}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-1">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Modalidad</label>
                <select
                  id="id_tipomodalidadestudio"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={courseToEdit.id_tipomodalidadestudio}
                  onChange={(e) => setCourseToEdit({ ...courseToEdit, id_tipomodalidadestudio: e.target.value })}
                >
                  <option value="">--Seleccione--</option>
                  {tipoModalidadestudios.map((item) => (
                    <option value={item.id_tipomodalidadestudio} key={item.id_tipomodalidadestudio}>{item.nombre}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-1">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vacantes</label>
                <TextField
                  fullWidth
                  size="small"
                  type="number"
                  variant="outlined"
                  value={courseToEdit.vacantes}
                  onChange={(e) => setCourseToEdit({ ...courseToEdit, vacantes: e.target.value })}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-1">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
                <select
                  id="id_tipocategoria"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={courseToEdit.id_tipocategoria}
                  onChange={(e) => setCourseToEdit({ ...courseToEdit, id_tipocategoria: e.target.value })}
                >
                  <option value="">--Seleccionar--</option>
                  {categorias.map((item) => (
                    <option value={item.id_tipocategoria} key={item.id_tipocategoria}>{item.nombre}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-1">
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Sincrono/Asincrono</label>
                <select
                  id="es_sincrono"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  value={courseToEdit.es_sincrono}
                  onChange={(e) => setCourseToEdit({ ...courseToEdit, es_sincrono: e.target.value })}
                >
                  <option value="">--Seleccione--</option>
                  <option value="1">SINCRONO</option>
                  <option value="0">ASINCRONO</option>
                </select>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-1">
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700 mb-1">Url ZOOM</label>
              <TextField
                fullWidth
                size="small"
                type="text"
                variant="outlined"
                value={courseToEdit.url_zoom}
                onChange={(e) => setCourseToEdit({ ...courseToEdit, url_zoom: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-1">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contenido de la Web</label>
              <TextField
                fullWidth
                multiline
                rows={4}
                size="small"
                type="textarea"
                variant="outlined"
                value={courseToEdit.detalle}
                onChange={(e) => setCourseToEdit({ ...courseToEdit, detalle: e.target.value })}
              />
            </div>
          </div>
        </form>
      </div>
      <div className="bg-gray-50 px-4 py-3 rounded-b-lg flex justify-end space-x-3">
        <Button
          disabled={isLoading}
          onClick={handleCloseModalAdd}
          variant="outlined"
          className="border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          Cancelar
        </Button>
        <Button
          disabled={isLoading}
          onClick={handleConfirmAddOrEdit}
          variant="contained"
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          {isEditing ? "Guardar cambios" : "Agregar curso"}
          {isLoading ? <ClipLoader color="#ffffff" size={20} /> : ''}
        </Button>
      </div>
    </Dialog>
  );
}