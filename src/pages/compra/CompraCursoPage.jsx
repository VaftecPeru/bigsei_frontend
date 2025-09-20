import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Api_Global_Web } from "../../services/WebApi";
import { Api_Global_Setup } from "../../services/SetupApi";
import apiClient from "../../Utils/apiClient";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import { EducationalFooter } from "@/components/ui/footer/EducationalFooter";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import Cookies from 'js-cookie';

function CompraMembresia({user, membresia}) {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { idPeriodocurso } = useParams();
  const [tipoDocumentos, setTipoDocumentos] = useState([]);

  const goToHome = () => {
    setTimeout(() => {
      navigate(`/`);
    }, 700);
  };

  const handlePago = () => {
    const data = {
      id_periodocurso: idPeriodocurso,
    };

    setLoading(true);
    apiClient.post(Api_Global_Web.miMatriculas.registrarConMembresias(), data)
      .then((response) => {
        setLoading(false);
        toast.success("Realizado.");
        goToHome();
      })
      .catch((error) => {
        setLoading(false);
        toast.warning(error.response.data);
      });
  };

  const listarTipoDocumentos = () => {
    apiClient.get(Api_Global_Setup.tipoDocumentos.listar(""))
      .then((response) => {
        setTipoDocumentos(response.data);
      })
      .catch((error) => {
        setTipoDocumentos([]);
        toast.warning(error.response.data);
      });
  };

  useEffect(() => {
    if (idPeriodocurso) {
      listarTipoDocumentos();
    }
  }, [idPeriodocurso]);

  return (
    <div className="max-w-3xl mx-auto p-4 font-sans">
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Suscríbete a Unlimited</h1>
        <p className="text-gray-700">Accede a miles de cursos cortos en línea, aprende a tu ritmo y obtén certificados digitales.</p>
      </section>

      <p className="text-sm text-gray-600 mb-8">
        Se renueva automáticamente cada {membresia.es_anual === '1' ? 'año' : 'mes'}. Puedes cancelar en cualquier momento.
        <a href="#" className="text-pink-600 ml-1">Términos y condiciones.</a>
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Detalles de la suscripción</h2>

        <p className="text-sm text-gray-600 mb-8">
          <label className="block text-sm font-medium mb-1">{membresia.nombre}:</label> {membresia.descripcion}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Dirección de Envío</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tipo de Documento*</label>
          <select
            value={user.id_tipodocumento}
            className={`w-full p-2 border rounded border-gray-300`}
            readOnly={true}
          >
            {tipoDocumentos.map((item) => (
              <option
                value={item.id_tipodocumento}
                key={item.id_tipodocumento}
              >
                {item.siglas} - {item.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Número de Documento*</label>
          <input value={user.numero_documento} type="text"
            className={`w-full p-2 border rounded border-gray-300`}
            readOnly={true}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nombre Completo*</label>
          <input value={user.nombre} type="text"
            className={`w-full p-2 border rounded border-gray-300`}
            readOnly={true}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Número de Teléfono*</label>
          <input value={user.telefono} type="text"
            className={`w-full p-2 border rounded border-gray-300`}
            readOnly={true}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Correo electrònico*</label>
          <input value={user.correo} type="text"
            className={`w-full p-2 border rounded border-gray-300`}
            readOnly={true}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Dirección*</label>
          <input value={user.direccion} type="text"
            className={`w-full p-2 border rounded border-gray-300`}
            readOnly={true}
          />
        </div>

      </section>

      <section className="mb-8">

        <button onClick={handlePago}
          className={`w-full bg-pink-600 text-white py-3 rounded font-medium ${!isLoading ? '' : 'bg-opacity-50 cursor-not-allowed'}`}>
          {isLoading ? <ClipLoader color="#ffffff" size={20} /> : 'Suscríbete ahora'}
        </button>

      </section>
    </div>
  );
}

function CompraLogin({user}) {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { idPeriodocurso } = useParams();
  const [subscriptionType, setSubscriptionType] = useState('');
  const [tipoDocumentos, setTipoDocumentos] = useState([]);
  const [precios, setPrecios] = useState([]);
  const [precioSelected, setPrecioSelected] = useState({
    id_periodocursoprecio: "",
    importe: "",
  });
  const [formulario, setFormulario] = useState({
    numero_operacion: "",
    importe_operacion: "",
  });

  const goToHome = () => {
    setTimeout(() => {
      navigate(`/`);
    }, 700);
  };

  const handlePago = () => {
    const data = {
      id_periodocursoprecio: precioSelected.id_periodocursoprecio,
      importe: precioSelected.importe,
      numero_operacion: formulario.numero_operacion,
      importe_operacion: formulario.importe_operacion,
    };
    setLoading(true);
    apiClient.post(Api_Global_Web.miMatriculas.registrarSinMembresias(), data)
      .then((response) => {
        setLoading(false);
        toast.success("Realizado.");
        goToHome();
      })
      .catch((error) => {
        setLoading(false);
        toast.warning(error.response.data);
      });
  };

  const onChangePrecio = (item) => {
    setPrecioSelected({
      id_periodocursoprecio: item.id_periodocursoprecio,
      importe: item.importe,
    });
    setSubscriptionType(item.id_periodocursoprecio);
  };

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const listarPrecios = () => {
    apiClient.get(Api_Global_Web.matriculas.listarPrecioCursoLibres(idPeriodocurso))
      .then((response) => {
        const data = response.data.map((item) => {
          return ({
            id_periodocursoprecio: item.id_periodocursoprecio,
            tipo: item.tipo,
            importe: item.importe,
            importe_mes: item.importe_mes,
            tipo_descripcion: item.tipo_descripcion,
            tipo_nombre: item.tipo_nombre,
          });
        });
        setPrecios(data);
      })
      .catch((error) => {
        setPrecios([]);
      });
  };

  const listarTipoDocumentos = () => {
    apiClient.get(Api_Global_Setup.tipoDocumentos.listar(""))
      .then((response) => {
        setTipoDocumentos(response.data);
      })
      .catch((error) => {
        setTipoDocumentos([]);
        toast.warning(error.response.data);
      });
  };

  useEffect(() => {
    if (idPeriodocurso) {
      listarPrecios();
      listarTipoDocumentos();
    }
  }, [idPeriodocurso]);

  return (
    <div className="max-w-3xl mx-auto p-4 font-sans">
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Suscríbete a Unlimited</h1>
        <p className="text-gray-700">Accede a miles de cursos cortos en línea, aprende a tu ritmo y obtén certificados digitales.</p>
      </section>

      <section className="flex flex-col md:flex-row gap-4 mb-6">
        {precios.map(item => (
          <div key={item.id_periodocursoprecio} className={`border rounded-md p-4 flex-1 relative ${subscriptionType == item.id_periodocursoprecio ? 'border-blue-500' : 'border-gray-300'}`}>
            {item.tipo == '1' && subscriptionType == item.id_periodocursoprecio && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                La mejor relación calidad-precio
              </div>
            )}
            <div className="flex items-start">
              <input
                type="radio"
                id={item.id_periodocursoprecio}
                checked={subscriptionType == item.id_periodocursoprecio}
                onChange={() => onChangePrecio(item)}
                className="mt-1 mr-2"
              />
              <label htmlFor={item.id_periodocursoprecio} className="flex-1">
                <div className="font-medium">{item.tipo_descripcion}</div>
                <div className="text-lg font-bold">${item.importe}/ {item.tipo_nombre}</div>
                {(item.tipo == '1') && <div className="text-sm text-gray-500">(${item.importe_mes}/mes)</div>}
              </label>
            </div>
          </div>
        ))}
      </section>

      <p className="text-sm text-gray-600 mb-8">
        Se renueva automáticamente cada {subscriptionType === 'annual' ? 'año' : 'mes'}. Puedes cancelar en cualquier momento.
        <a href="#" className="text-pink-600 ml-1">Términos y condiciones.</a>
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Detalles de la suscripción</h2>
        <div className="flex justify-between py-2 border-b">
          <span>{precioSelected.tipo_descripcion} ilimitado</span>
          <span className="font-bold">${precioSelected.importe}</span>
        </div>
        <div className="flex justify-between py-4 font-bold">
          <span>Total del pedido</span>
          <span>${precioSelected.importe}</span>
        </div>
        <p className="text-sm text-gray-600">El precio total incluye impuestos.</p>
        <button className="text-pink-600 text-sm mt-2">¿Tienes un código de descuento?</button>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Dirección de Envío</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tipo de Documento*</label>
          <select
            value={user.id_tipodocumento}
            className={`w-full p-2 border rounded border-gray-300`}
            readOnly={true}
          >
            {tipoDocumentos.map((item) => (
              <option
                value={item.id_tipodocumento}
                key={item.id_tipodocumento}
              >
                {item.siglas} - {item.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Número de Documento*</label>
          <input value={user.numero_documento} type="text"
            className={`w-full p-2 border rounded border-gray-300`}
            readOnly={true}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nombre Completo*</label>
          <input value={user.nombre} type="text"
            className={`w-full p-2 border rounded border-gray-300`}
            readOnly={true}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Número de Teléfono*</label>
          <input value={user.telefono} type="text"
            className={`w-full p-2 border rounded border-gray-300`}
            readOnly={true}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Correo electrònico*</label>
          <input value={user.correo} type="text"
            className={`w-full p-2 border rounded border-gray-300`}
            readOnly={true}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Dirección*</label>
          <input value={user.direccion} type="text"
            className={`w-full p-2 border rounded border-gray-300`}
            readOnly={true}
          />
        </div>

      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          Sus datos de pago
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v-1l1-1v-1H3a1 1 0 01-1-1V7a1 1 0 011-1h4V5l-1-1V3h1l1 1 1 1h2.586L12 4.414A2 2 0 0114 6v2h2a2 2 0 012 2z" clipRule="evenodd" />
          </svg>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Número de operación</label>
            <input type="text" className="w-full p-2 border rounded" placeholder="Número de operación"
              name="numero_operacion" defaultValue={formulario.numero_operacion}
              onChange={onChangeValue}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Monto</label>
            <input type="text" className="w-full p-2 border rounded" placeholder="Monto"
              name="importe_operacion" defaultValue={formulario.importe_operacion}
              onChange={onChangeValue}
            />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">&nbsp;</p>

        <button onClick={handlePago}
          className={`w-full bg-pink-600 text-white py-3 rounded font-medium ${!isLoading ? '' : 'bg-opacity-50 cursor-not-allowed'}`}>
          {isLoading ? <ClipLoader color="#ffffff" size={20} /> : 'Suscríbete ahora'}
        </button>

      </section>
    </div>
  );
}

function CompraDefault() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { idPeriodocurso } = useParams();
  const [subscriptionType, setSubscriptionType] = useState('');
  const [tipoDocumentos, setTipoDocumentos] = useState([]);
  const [precios, setPrecios] = useState([]);
  const [precioSelected, setPrecioSelected] = useState({
    id_periodocursoprecio: "",
    importe: "",
  });
  const [formulario, setFormulario] = useState({
    id_tipodocumento: "",
    numero_documento: "",
    nombre_completo: "",
    telefono: "",
    direccion: "",
    correo: "",
    numero_operacion: "",
    importe_operacion: "",
  });

  const goToHome = () => {
    setTimeout(() => {
      navigate(`/`);
    }, 700);
  };

  const handlePago = () => {
    const data = {
      id_periodocursoprecio: precioSelected.id_periodocursoprecio,
      importe: precioSelected.importe,
      id_tipodocumento: formulario.id_tipodocumento,
      numero_documento: formulario.numero_documento,
      nombre_completo: formulario.nombre_completo,
      telefono: formulario.telefono,
      direccion: formulario.direccion,
      correo: formulario.correo,
      numero_operacion: formulario.numero_operacion,
      importe_operacion: formulario.importe_operacion,
    };
    setLoading(true);
    apiClient.post(Api_Global_Web.matriculas.registrarCursoLibre(), data)
      .then((response) => {
        setLoading(false);
        toast.success("Realizado.");
        const { token, url_base } = response.data;
        Cookies.set('token', token, { path: '/', secure: true, sameSite: 'strict' });
        goToHome();
      })
      .catch((error) => {
        setLoading(false);
        toast.warning(error.response.data);
      });
  };

  const onChangePrecio = (item) => {
    setPrecioSelected({
      id_periodocursoprecio: item.id_periodocursoprecio,
      importe: item.importe,
    });
    setSubscriptionType(item.id_periodocursoprecio);
  };

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const listarPrecios = () => {
    apiClient.get(Api_Global_Web.matriculas.listarPrecioCursoLibres(idPeriodocurso))
      .then((response) => {
        const data = response.data.map((item) => {
          return ({
            id_periodocursoprecio: item.id_periodocursoprecio,
            tipo: item.tipo,
            importe: item.importe,
            importe_mes: item.importe_mes,
            tipo_descripcion: item.tipo_descripcion,
            tipo_nombre: item.tipo_nombre,
          });
        });
        setPrecios(data);
      })
      .catch((error) => {
        setPrecios([]);
      });
  };

  const listarTipoDocumentos = async () => {
    try {
      const response = await apiClient.get(Api_Global_Setup.tipoDocumentos.listar(''));

      if (Array.isArray(response.data)) {
        setTipoDocumentos(response.data);
      } else {
        console.error("Formato de datos inesperado:", response.data);
        setTipoDocumentos([]);
      }
    } catch (error) {
      console.error("Error cargando tipos de documento:", error);
      setTipoDocumentos([]);
    }
  };

  useEffect(() => {
    if (idPeriodocurso) {
      listarPrecios();
      listarTipoDocumentos();
    }
  }, [idPeriodocurso]);

  return (
    <div className="max-w-3xl mx-auto p-4 font-sans">
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Suscríbete a Unlimited</h1>
        <p className="text-gray-700">Accede a miles de cursos cortos en línea, aprende a tu ritmo y obtén certificados digitales.</p>
      </section>

      <section className="flex flex-col md:flex-row gap-4 mb-6">
        {precios.map(item => (
          <div key={item.id_periodocursoprecio} className={`border rounded-md p-4 flex-1 relative ${subscriptionType == item.id_periodocursoprecio ? 'border-blue-500' : 'border-gray-300'}`}>
            {item.tipo == '1' && subscriptionType == item.id_periodocursoprecio && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                La mejor relación calidad-precio
              </div>
            )}
            <div className="flex items-start">
              <input
                type="radio"
                id={item.id_periodocursoprecio}
                checked={subscriptionType == item.id_periodocursoprecio}
                onChange={() => onChangePrecio(item)}
                className="mt-1 mr-2"
              />
              <label htmlFor={item.id_periodocursoprecio} className="flex-1">
                <div className="font-medium">{item.tipo_descripcion}</div>
                <div className="text-lg font-bold">${item.importe}/ {item.tipo_nombre}</div>
                {(item.tipo == '1') && <div className="text-sm text-gray-500">(${item.importe_mes}/mes)</div>}
              </label>
            </div>
          </div>
        ))}
      </section>

      <p className="text-sm text-gray-600 mb-8">
        Se renueva automáticamente cada {subscriptionType === 'annual' ? 'año' : 'mes'}. Puedes cancelar en cualquier momento.
        <a href="#" className="text-pink-600 ml-1">Términos y condiciones.</a>
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Detalles de la suscripción</h2>
        <div className="flex justify-between py-2 border-b">
          <span>{precioSelected.tipo_descripcion} ilimitado</span>
          <span className="font-bold">${precioSelected.importe}</span>
        </div>
        <div className="flex justify-between py-4 font-bold">
          <span>Total del pedido</span>
          <span>${precioSelected.importe}</span>
        </div>
        <p className="text-sm text-gray-600">El precio total incluye impuestos.</p>
        <button className="text-pink-600 text-sm mt-2">¿Tienes un código de descuento?</button>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Dirección de Envío</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tipo de Documento*</label>
          <select
            name="id_tipodocumento"
            value={formulario.id_tipodocumento}
            onChange={onChangeValue}
            className={`w-full p-2 border rounded ${formulario.id_tipodocumento ? 'border-blue-500' : 'border-gray-300'}`}
            required
          >
            <option value="" disabled>Seleccione un documento</option>
            {tipoDocumentos.map((item) => (
              <option
                value={item.id_tipodocumento}
                key={item.id_tipodocumento}
              >
                {item.siglas} - {item.nombre}
              </option>
            ))}
          </select>
          {!formulario.id_tipodocumento && (
            <p className="text-red-500 text-xs mt-1">Este campo es obligatorio</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Número de Documento*</label>
          <input name="numero_documento" defaultValue={formulario.numero_documento} type="text"
            placeholder="Documento"
            className={`w-full p-2 border rounded ${formulario.numero_documento != '' ? 'border-blue-500' : 'border-gray-300'}`}
            onChange={onChangeValue}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nombre Completo*</label>
          <input name="nombre_completo" defaultValue={formulario.nombre_completo} type="text"
            placeholder="Nombre completo"
            className={`w-full p-2 border rounded ${formulario.nombre_completo != '' ? 'border-blue-500' : 'border-gray-300'}`}
            onChange={onChangeValue}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Número de Teléfono*</label>
          <input name="telefono" defaultValue={formulario.telefono} type="text"
            placeholder="Número de contacto"
            className={`w-full p-2 border rounded ${formulario.telefono != '' ? 'border-blue-500' : 'border-gray-300'}`}
            onChange={onChangeValue}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Correo electrònico*</label>
          <input name="correo" defaultValue={formulario.correo} type="text"
            placeholder="Correo electrònico (email)"
            className={`w-full p-2 border rounded ${formulario.correo != '' ? 'border-blue-500' : 'border-gray-300'}`}
            onChange={onChangeValue}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Dirección*</label>
          <input name="direccion" defaultValue={formulario.direccion} type="text"
            placeholder="Dirección completa"
            className={`w-full p-2 border rounded ${formulario.direccion != '' ? 'border-blue-500' : 'border-gray-300'}`}
            onChange={onChangeValue}
          />
        </div>

      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
          Sus datos de pago
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v-1l1-1v-1H3a1 1 0 01-1-1V7a1 1 0 011-1h4V5l-1-1V3h1l1 1 1 1h2.586L12 4.414A2 2 0 0114 6v2h2a2 2 0 012 2z" clipRule="evenodd" />
          </svg>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Número de operación</label>
            <input type="text" className="w-full p-2 border rounded" placeholder="Número de operación"
              name="numero_operacion" defaultValue={formulario.numero_operacion}
              onChange={onChangeValue}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Monto</label>
            <input type="text" className="w-full p-2 border rounded" placeholder="Monto"
              name="importe_operacion" defaultValue={formulario.importe_operacion}
              onChange={onChangeValue}
            />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">&nbsp;</p>

        <button onClick={handlePago}
          className={`w-full bg-pink-600 text-white py-3 rounded font-medium ${!isLoading ? '' : 'bg-opacity-50 cursor-not-allowed'}`}>
          {isLoading ? <ClipLoader color="#ffffff" size={20} /> : 'Suscríbete ahora'}
        </button>

      </section>
    </div>
  );
}

export default function CompraCursoPage() {
  const [isDefault, setIsDefault] = useState(false);
  const [isMembresia, setIsMembresia] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [membresia, setMembresia] = useState(null);

  const handleUserData = () => {
    apiClient.get(Api_Global_Setup.userLogin.mostrar())
      .then((response) => {
        setUser(response.data);
        handleMembresia();
      })
      .catch((error) => {
        setIsDefault(true);
      });
  };

  const handleMembresia = () => {
    apiClient.get(Api_Global_Web.miMembresias.listarActivas({
      per_page: 15,
      page: 1,
    }))
      .then((response) => {
        if (response.data.data.length > 0) {
          setMembresia(response.data.data[0]);
          setIsMembresia(true);
        } else {
          setIsLogin(true);
        }
      })
      .catch((error) => {
        setIsLogin(true);
      });
  };

  useEffect(() => {
    handleUserData();
  }, []);

  return (
    <div>
      <header>
        <Header />
      </header>
      <main className='w-full md:w-[90%] mx-auto'>
        {isDefault && <CompraDefault />}
        {isMembresia && <CompraMembresia user={user} membresia={membresia} />}
        {isLogin && <CompraLogin user={user} />}
      </main>
      <EducationalFooter />
      <ToastContainer />
    </div>
  );
}