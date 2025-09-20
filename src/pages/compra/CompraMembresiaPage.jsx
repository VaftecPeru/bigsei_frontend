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

function CompraMembresiaLogin({user}) {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {idMembresiatipo} = useParams();
  const [tipoDocumentos, setTipoDocumentos] = useState([]);
  const [membresiaTipo, setMembresiaTipo] = useState(null);
  const [formulario, setFormulario] = useState({
    // id_tipodocumento: "",
    // numero_documento: "",
    // nombre_completo: "",
    // telefono: "",
    // direccion: "",
    // correo: "",
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
      ...formulario,
      id_membresiatipo: membresiaTipo?.id_membresiatipo,
      precio: membresiaTipo?.precio,
    };
    setLoading(true);
    apiClient.post(Api_Global_Web.miMembresias.registrar(), data)
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

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const handleMembresia = () => {
    apiClient.get(Api_Global_Web.membresiaTipos.mostrar(idMembresiatipo))
      .then((response) => {
        setMembresiaTipo(response.data);
      })
      .catch((error) => {
        setMembresiaTipo(null);
      });
  };

  const handleTipoDocumentos = () => {
    apiClient.get(Api_Global_Setup.tipoDocumentos.listar(""))
      .then((response) => {
        setTipoDocumentos(response.data);
      })
      .catch((error) => {
        setTipoDocumentos([]);
      });
  };

  useEffect(() => {
    if (idMembresiatipo) {
      handleMembresia();
      handleTipoDocumentos();
    }
  }, [idMembresiatipo]);

  return (
    <div className="max-w-3xl mx-auto p-4 font-sans">
      <section className="mb-2">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Suscríbete a la membresía {membresiaTipo?.nombre}</h1>
        <p className="text-gray-700">Accede a miles de cursos cortos en línea, aprende a tu ritmo y obtén certificados digitales.</p>
      </section>

      <p className="text-sm text-gray-600 mb-8">
        Se renueva automáticamente cada {membresiaTipo?.es_anual == '1' ? 'año' : 'mes'}. Puedes cancelar en cualquier momento.
        <a href="#" className="text-pink-600 ml-1">Términos y condiciones.</a>
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Detalles de la suscripción</h2>
        <div className="flex justify-between py-2 border-b">
          <span>{membresiaTipo?.nombre}</span>
          <span className="font-bold">${membresiaTipo?.precio}</span>
        </div>
        <div className="flex justify-between py-4 font-bold">
          <span>Total del pedido</span>
          <span>${membresiaTipo?.precio}</span>
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
            className={`w-full p-2 border rounded border-blue-500`}
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
            className={`w-full p-2 border rounded border-blue-500`}
            readOnly={true}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nombre Completo*</label>
          <input value={user.nombre} type="text"
            className={`w-full p-2 border rounded border-blue-500`}
            readOnly={true}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Número de Teléfono*</label>
          <input value={user.telefono} type="text"
            className={`w-full p-2 border rounded border-blue-500`}
            readOnly={true}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Correo electrònico*</label>
          <input value={user.correo} type="text"
            className={`w-full p-2 border rounded border-blue-500`}
            readOnly={true}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Dirección*</label>
          <input value={user.direccion} type="text"
            className={`w-full p-2 border rounded border-blue-500`}
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

function CompraMembresiaDefault() {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {idMembresiatipo} = useParams();
  const [tipoDocumentos, setTipoDocumentos] = useState([]);
  const [membresiaTipo, setMembresiaTipo] = useState(null);
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
      ...formulario,
      id_membresiatipo: membresiaTipo?.id_membresiatipo,
      precio: membresiaTipo?.precio,
    };
    setLoading(true);
    apiClient.post(Api_Global_Web.membresias.registrar(), data)
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

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const handleMembresia = () => {
    apiClient.get(Api_Global_Web.membresiaTipos.mostrar(idMembresiatipo))
      .then((response) => {
        setMembresiaTipo(response.data);
      })
      .catch((error) => {
        setMembresiaTipo(null);
      });
  };

  const handleTipoDocumentos = () => {
    apiClient.get(Api_Global_Setup.tipoDocumentos.listar(''))
      .then((response) => {
        setTipoDocumentos(response.data);
      })
      .catch((error) => {
        setTipoDocumentos([]);
      });
  };

  useEffect(() => {
    if (idMembresiatipo) {
      handleMembresia();
      handleTipoDocumentos();
    }
  }, [idMembresiatipo]);

  return (
    <div className="max-w-3xl mx-auto p-4 font-sans">
      <section className="mb-2">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Suscríbete a la membresía {membresiaTipo?.nombre}</h1>
        <p className="text-gray-700">Accede a miles de cursos cortos en línea, aprende a tu ritmo y obtén certificados digitales.</p>
      </section>

      <p className="text-sm text-gray-600 mb-8">
        Se renueva automáticamente cada {membresiaTipo?.es_anual == '1' ? 'año' : 'mes'}. Puedes cancelar en cualquier momento.
        <a href="#" className="text-pink-600 ml-1">Términos y condiciones.</a>
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Detalles de la suscripción</h2>
        <div className="flex justify-between py-2 border-b">
          <span>{membresiaTipo?.nombre}</span>
          <span className="font-bold">${membresiaTipo?.precio}</span>
        </div>
        <div className="flex justify-between py-4 font-bold">
          <span>Total del pedido</span>
          <span>${membresiaTipo?.precio}</span>
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

export default function CompraMembresiaPage() {
  const [isLoading, setIsLoading] = useState(false);
  // const navigate = useNavigate();
  // const {idMembresiatipo} = useParams();
  const [isDefault, setIsDefault] = useState(false);
  // const [isMembresia, setIsMembresia] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  // const [tipoDocumentos, setTipoDocumentos] = useState([]);
  // const [membresiaTipo, setMembresiaTipo] = useState(null);
  // const [formulario, setFormulario] = useState({
  //   id_tipodocumento: "",
  //   numero_documento: "",
  //   nombre_completo: "",
  //   telefono: "",
  //   direccion: "",
  //   correo: "",
  //   numero_operacion: "",
  //   importe_operacion: "",
  // });

  // const goToHome = () => {
  //   setTimeout(() => {
  //     navigate(`/`);
  //   }, 700);
  // };

  // const handlePago = () => {
  //   const data = {
  //     ...formulario,
  //     id_membresiatipo: membresiaTipo?.id_membresiatipo,
  //     precio: membresiaTipo?.precio,
  //   };
  //   setLoading(true);
  //   apiClient.post(Api_Global_Web.membresias.registrar(), data)
  //     .then((response) => {
  //       setLoading(false);
  //       toast.success("Realizado.");
  //       const { token, url_base } = response.data;
  //       Cookies.set('token', token, { path: '/', secure: true, sameSite: 'strict' });
  //       goToHome();
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       toast.warning(error.response.data);
  //     });
  // };

  // const onChangeValue = (e) => {
  //   const { name, value } = e.target;
  //   setFormulario({
  //     ...formulario,
  //     [name]: value,
  //   });
  // };

  // const handleMembresia = () => {
  //   apiClient.get(Api_Global_Web.membresiaTipos.mostrar(idMembresiatipo))
  //     .then((response) => {
  //       setMembresiaTipo(response.data);
  //     })
  //     .catch((error) => {
  //       setMembresiaTipo(null);
  //     });
  // };

  // const handleTipoDocumentos = () => {
  //   apiClient.get(Api_Global_Setup.tipoDocumentos.listar(''))
  //     .then((response) => {
  //       setTipoDocumentos(response.data);
  //     })
  //     .catch((error) => {
  //       setTipoDocumentos([]);
  //     });
  // };

  const handleUserData = () => {
    setIsLoading(true);
    apiClient.get(Api_Global_Setup.userLogin.mostrar())
      .then((response) => {
        setIsLoading(false);
        setUser(response.data);
        setIsLogin(true);
      })
      .catch((error) => {
        setIsLoading(false);
        setIsDefault(true);
      });
  };

  // useEffect(() => {
  //   if (idMembresiatipo) {
  //     handleMembresia();
  //     handleTipoDocumentos();
  //   }
  // }, [idMembresiatipo]);
  useEffect(() => {
    // setIsDefault(true);
    handleUserData();
  }, []);

  return (
    <div>
      <header>
        <Header />
      </header>
      <main className='w-full md:w-[90%] mx-auto'>
        {isDefault && <CompraMembresiaDefault />}
        {isLogin && <CompraMembresiaLogin user={user} />}

        {isLoading && (
          <div className="font-bold text-3xl text-center text-gray-500 py-24">
            Validando Formulario...
          </div>
        )}
      </main>
      <EducationalFooter />
      <ToastContainer />
    </div>
  );
}