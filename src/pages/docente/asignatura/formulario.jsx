import React, { useState, useEffect, useRef } from 'react';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Api_Global_Docente } from "../../../services/DocenteApi";
import { Api_Global_Setup } from "../../../services/SetupApi";
import apiClient from "../../../Utils/apiClient";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import { useParams } from "react-router-dom";

function FormularioPreguntaRespuesta({ respuesta }) {
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef(null);
  const [formulario, setFormulario] = useState({
    id_periodopregunta: "",
    descripcion: "",
    es_valida: "",
  });

  const handleClearTimeout = (data) => {
    setIsLoading(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      handleGuardar({
        ...data,
        es_valida: data.es_valida ? "1" : "0",
      });
    }, 1600);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  };

  const handleDescripcionChange = (descripcion) => {
    const data = {
      ...formulario,
      descripcion: descripcion,
    };
    setFormulario(data);
    handleClearTimeout(data);
  };

  const handleToggleRequerida = (checked) => {
    const data = {
      ...formulario,
      es_valida: checked,
    };
    setFormulario(data);
    handleClearTimeout(data);
  };  

  const handleGuardar = (data) => {
    // setIsLoading(true);
    apiClient.put(Api_Global_Docente.academicoPeriodoRespuestas.editar(respuesta.id_periodorespuesta), data)
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  useEffect(() => {
  },[]);

  useEffect(() => {
    setFormulario({
      id_periodopregunta: respuesta.id_periodopregunta,
      descripcion: respuesta.descripcion,
      es_valida: respuesta.es_valida == "1" ? true : false,
    });
  }, []);

  return (
    <div>
      <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between"}}>
        <h1 className="text-lg text-gray-800 font-medium">Respuesta ({respuesta.orden})</h1>
      </div>

      {/* <div className="flex">
        <div className="mr-2 mt-2">
          {isLoading ? <ClipLoader color="#1e3a8a" size={28} /> : ""}
        </div> */}

      {respuesta.pregunta_tipocodigo == 'texto' && (
        <div>
          <input
            type="text"
            value={formulario.descripcion}
            onChange={(e) => handleDescripcionChange(e.target.value)}
            placeholder="Respuesta corta"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {respuesta.pregunta_tipocodigo == 'textarea' && (
        <div>
          <textarea
            value={formulario.descripcion}
            onChange={(e) => handleDescripcionChange(e.target.value)}
            placeholder="Respuesta larga"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
          ></textarea>
        </div>
      )}

      {respuesta.pregunta_tipocodigo == 'select' && (
        <div className="flex">
          {isLoading && (
            <label className="mr-2 mt-2">
              <ClipLoader color="#1e3a8a" size={28} />
            </label>
          )}
          <input
            type="text"
            value={formulario.descripcion}
            onChange={(e) => handleDescripcionChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="ml-3 mr-1">
            <span className="text-sm text-gray-600">Valida</span>
            <input
                type="checkbox"
                checked={formulario.es_requerida}
                onChange={(event) => handleToggleRequerida(event.target.checked)}
                className="form-checkbox h-4 w-4 text-blue-500"
              />
          </label>
        </div>
      )}

      {respuesta.pregunta_tipocodigo == 'fecha' && (
        <div>
          <input
            type="date"
            value={formulario.descripcion}
            onChange={(e) => handleDescripcionChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {respuesta.pregunta_tipocodigo == 'hora' && (
        <div>
          <input
            type="time"
            value={formulario.descripcion}
            onChange={(e) => handleDescripcionChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      {respuesta.pregunta_tipocodigo == 'archivo' && (
        <div>
          <input
            type="file"
            // onChange={(e) => handleDescripcionChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

    </div>
  );
}

function FormularioPregunta({ eliminado, pregunta }) {
  const [isLoading, setIsLoading] = useState(false);
  const timeoutRef = useRef(null);
  const [tipoPreguntaSelected, setTipoPreguntaSelected] = useState(null);
  const [tipoPreguntas, setTipoPreguntas] = useState([]);
  const [respuestas, setRespuestas] = useState([]);
  const [formulario, setFormulario] = useState({
    descripcion: "",
    id_tipopregunta: "",
    es_requerida: false,
  });

  const handleAgregarRespuesta = () => {
    const data = {
      id_periodopregunta: pregunta.id_periodopregunta,
      descripcion: "",
      es_valida: "1",
    };
    setIsLoading(true);
    apiClient.post(Api_Global_Docente.academicoPeriodoRespuestas.registrar(), data)
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        handleRespuestas();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const eliminarPregunta = () => {
    setIsLoading(true);
    apiClient.delete(Api_Global_Docente.academicoPeriodoPreguntas.eliminar(pregunta.id_periodopregunta))
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        eliminado();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleClearTimeout = (data) => {
    setIsLoading(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      handleGuardar({
        ...data,
        es_requerida: data.es_requerida ? "1" : "0",
        id_periodocuestionario: pregunta.id_periodocuestionario,
      });
    }, 1600);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  };

  const handleDescripcionChange = (descripcion) => {
    const data = {
      ...formulario,
      descripcion: descripcion,
    };
    setFormulario(data);
    handleClearTimeout(data);
  };

  const handleIdTipopreguntaChange = (id_tipopregunta) => {
    const data = {
      ...formulario,
      id_tipopregunta: id_tipopregunta,
    };
    setFormulario(data);
    const selected = tipoPreguntas.find(item => item.id_tipopregunta == id_tipopregunta);
    if (selected) {
      setTipoPreguntaSelected(selected);
    } else {
      setTipoPreguntaSelected(null);
    }
    handleClearTimeout(data);
  };

  const handleToggleRequerida = (checked) => {
    const data = {
      ...formulario,
      es_requerida: checked,
    };
    setFormulario(data);
    handleClearTimeout(data);
  };

  const handleGuardar = (data) => {
    // setIsLoading(true);
    apiClient.put(Api_Global_Docente.academicoPeriodoPreguntas.editar(pregunta.id_periodopregunta), data)
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        handleRespuestas();
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleTipoPreguntas = () => {
    apiClient.get(Api_Global_Setup.tipoPreguntas.listar())
      .then((response) => {
        setTipoPreguntas(response.data);
        const selected = response.data.find(item => item.id_tipopregunta == pregunta.id_tipopregunta);
        if (selected) {
          setTipoPreguntaSelected(selected);
        }
      })
      .catch((error) => {
        toast.warning(error.response.data);
      });
  };

  const handleRespuestas = () => {
    apiClient.get(Api_Global_Docente.academicoPeriodoRespuestas.listar({
      per_page: 15,
      page: 1,
    }, pregunta.id_periodopregunta))
      .then((response) => {
        setRespuestas(response.data.data);
      })
      .catch((error) => {
        toast.warning(error.response.data);
      });
  };

  useEffect(() => {
    handleTipoPreguntas();
    handleRespuestas();
    setFormulario({
      descripcion: pregunta.descripcion,
      id_tipopregunta: pregunta.id_tipopregunta,
      es_requerida: pregunta.es_requerida == "1" ? true : false,
    });
  },[]);

  return (
    <div key={pregunta.id_periodopregunta} className="mt-6 bg-white rounded-xl p-6 space-y-4 shadow-sm">
      <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"space-between"}}>
        <h1 className="text-lg text-gray-800 font-medium">PREGUNTA {pregunta.orden}</h1>
        <button
          onClick={() => eliminarPregunta(pregunta.id_periodopregunta)}
          className="text-red-500 hover:text-red-700"
        >
          {isLoading ? <ClipLoader color="#1e3a8a" size={20} /> : 'Eliminar'}
        </button>
      </div>
      <div className="flex items-center justify-between">
        <textarea
          value={formulario.descripcion}
          onChange={(e) => handleDescripcionChange(e.target.value)}
          placeholder="Ingrese texto de la pregunta "
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
        ></textarea>
      </div>

      <div className="flex items-center justify-between mt-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={formulario.es_requerida}
            onChange={() => handleToggleRequerida(event.target.checked)}
            className="form-checkbox h-4 w-4 text-blue-500"
          />
          <span className="text-sm text-gray-600">Requerida</span>
        </label>
        {isLoading && (
          <label className="mr-2 mt-2">
            <ClipLoader color="#1e3a8a" size={28} />
          </label>
        )}
        <select
          value={formulario.id_tipopregunta}
          onChange={(e) => handleIdTipopreguntaChange(e.target.value)}
          className="ml-4 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">--Seleccione--</option>
          {tipoPreguntas.map((item, index) => (
            <option value={item.id_tipopregunta}>{item.nombre}</option>
          ))}
        </select>
      </div>

      {respuestas.map((item, index) => (
        <FormularioPreguntaRespuesta respuesta={item} />
      ))}
      {tipoPreguntaSelected?.codigo == 'select' && (
        <div>
          <button
            onClick={() => handleAgregarRespuesta()}
            className="text-blue-500 hover:text-blue-700"
          >
            + Agregar opción
          </button>
        </div>
      )}
    </div>
  );
}

function FormularioRespuesta() {
  const datosRespuestas = [
    { name: 'Opción 1', value: 40 },
    { name: 'Opción 2', value: 30 },
    { name: 'Opción 3', value: 20 },
    { name: 'Opción 4', value: 10 },
  ];

  return (
    <div className="w-full max-w-2xl bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Respuestas</h2>

      {/* Gráfico de torta */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Distribución de respuestas</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={datosRespuestas}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            />
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de barras */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Respuestas por opción</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={datosRespuestas}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

const Formulario = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { idPeriodocuestionario } = useParams();
  const [cuestionario, setCuestionario] = useState(null);
  const [preguntas, setPreguntas] = useState([]);
  const [pestañaActiva, setPestañaActiva] = useState('formulario'); // 'formulario' o 'respuestas'

  const agregarPregunta = () => {
    const data = {
      id_periodocuestionario: idPeriodocuestionario,
      descripcion: "",
      es_requerida: "0",
      id_tipopregunta: "1",
    };

    setIsLoading(true);
    apiClient.post(Api_Global_Docente.academicoPeriodoPreguntas.registrar(), data)
      .then((response) => {
        setIsLoading(false);
        toast.success("Realizado.");
        setPreguntas([...preguntas, response.data]);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handleCuestionario = () => {
    setIsLoading(true);
    apiClient.get(Api_Global_Docente.academicoPeriodoCuestionarios.mostrar(idPeriodocuestionario))
      .then((response) => {
        setIsLoading(false);
        setCuestionario(response.data);
      })
      .catch((error) => {
        setIsLoading(false);
        toast.warning(error.response.data);
      });
  };

  const handlePreguntas = () => {
    apiClient.get(Api_Global_Docente.academicoPeriodoPreguntas.listar({
      per_page: 15,
      page: 1,
    }, idPeriodocuestionario))
      .then((response) => {
        setPreguntas(response.data.data);
      })
      .catch((error) => {
        toast.warning(error.response.data);
      });
  };

  useEffect(() => {
    if (idPeriodocuestionario) {
      handleCuestionario();
      handlePreguntas();
    }
  },[]);

  return (
    <div className="min-h-screen bg-[#7b94af] flex flex-col">
      {/* Navbar similar al de Google Forms */}
      <nav className="bg-white shadow-md w-full py-3 px-6 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img
            src="https://www.gstatic.com/images/branding/product/2x/forms_48dp.png"
            alt="Google Forms Logo"
            className="w-10 h-10"
          />
          <h1 className="text-xl text-gray-800 font-medium">Formulario {cuestionario?.titulo || "sin título"}</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button
            type="button"
            disabled={isLoading}
            onClick={() => setPestañaActiva('formulario')}
            className={`px-4 py-2 rounded-lg ${
              pestañaActiva == 'formulario'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {isLoading ? <ClipLoader color="#1e3a8a" size={20} /> : 'Formulario'}
          </button>
          <button
            type="button"
            disabled={isLoading}
            onClick={() => setPestañaActiva('respuestas')}
            className={`px-4 py-2 rounded-lg ${
              pestañaActiva == 'respuestas'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {isLoading ? <ClipLoader color="#1e3a8a" size={20} /> : 'Respuestas'}
          </button>
          <button
            type="button"
            disabled={isLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
          >
            {isLoading ? <ClipLoader color="#1e3a8a" size={20} /> : 'PUBLICAR'}
          </button>
        </div>
      </nav>

      {/* Contenedor del formulario o respuestas */}
      <div className="flex-1 flex items-center justify-center p-6">
        {pestañaActiva == 'formulario' ? (
          <div className="w-full max-w-2xl">
            {/* Encabezado del formulario */}
            <div
              className="bg-white rounded-xl w-full px-6 py-4 space-y-4 shadow-sm"
              style={{ borderTop: "20px solid #1e40af" }}
            >
              <h1 className="text-2xl font-semibold text-gray-800">Formulario {cuestionario?.titulo || "sin título"}</h1>
              <p className="text-sm text-gray-500">{cuestionario?.instruccion || "Descripción del formulario"}</p>
            </div>

            {preguntas.map((pregunta) => (
              <FormularioPregunta pregunta={pregunta} eliminado={handlePreguntas} />
            ))}

            {/* Botón para agregar nueva pregunta */}
            <div className="mt-6">
              <button
                disabled={isLoading}
                type="button"
                onClick={agregarPregunta}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                {isLoading ? <ClipLoader color="#1e3a8a" size={20} /> : '+ Agregar pregunta'}
              </button>
            </div>

            {/* Botón de envío */}
            <div className="flex justify-end mt-6">
              <button
                disabled={isLoading}
                type="button"
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                {isLoading ? <ClipLoader color="#1e3a8a" size={20} /> : 'Enviar'}
              </button>
            </div>
          </div>
        ) : (
          <FormularioRespuesta />
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Formulario;