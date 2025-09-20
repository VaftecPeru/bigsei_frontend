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
import { useForm } from "react-hook-form";

const CompraLicenciaPage = () => {
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { idLicenciatipo } = useParams();
  const [tipoDocumentos, setTipoDocumentos] = useState([]);
  const [precios, setPrecios] = useState([]);
  const [precioSelected, setPrecioSelected] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      id_licenciatipo: "",
      id_tipodocumento: "",
      numero_documento: "",
      nombre_completo: "",
      telefono: "",
      correo: "",
      direccion: "",
      numero_operacion: "",
      importe_operacion: "",
      empresa_id_tipodocumento: "3", // RUC
      empresa_numero_documento: "",
      empresa_razon_social: "",
    },
  });

  const goToHome = () => {
    setTimeout(() => {
      navigate(`/`);
    }, 700);
  };

  const handlePago = () => {
    const data = {
      ...getValues(),
      id_licenciatipo: precioSelected?.id_licenciatipo,
      precio: precioSelected?.precio,
    };
    setLoading(true);
    apiClient.post(Api_Global_Web.licencias.registrar(), data)
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

  const handleChangePrecio = (item) => {
    setPrecioSelected(item);
  };

  const handleListarPrecios = () => {
    apiClient.get(Api_Global_Web.licencias.listarTipoActivos({
      per_page: 4,
      page: 1,
    }))
      .then((response) => {
        setPrecios(response.data.data);
        if (response.data.data.length > 0) {
          setPrecioSelected(response.data.data[0]);
        }
      })
      .catch((error) => {
        setPrecios([]);
      });
  };

  const handleListarTipoDocumentos = async () => {
    apiClient.get(Api_Global_Setup.tipoDocumentos.listar(""))
      .then((response) => {
        setTipoDocumentos(response.data);
      })
      .catch((error) => {
        toast.warning(error.response.data);
        setTipoDocumentos([]);
      });
  };

  useEffect(() => {
    if (idLicenciatipo) {
      handleListarPrecios();
      handleListarTipoDocumentos();
    }
  }, [idLicenciatipo]);

  return (
    <div>
      <header>
        <Header />
      </header>
      <main className='w-full md:w-[90%] mx-auto'>
    <div className="max-w-3xl mx-auto p-4 font-sans">
      <section className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Suscríbete a Unlimited</h1>
        <p className="text-gray-700">Accede a miles de cursos cortos en línea, aprende a tu ritmo y obtén certificados digitales.</p>
      </section>

      <section className="flex flex-col md:flex-row gap-4 mb-6">
        {precios.map(item => (
          <div key={item.id_licenciatipo} className={`border rounded-md p-4 flex-1 relative ${precioSelected?.id_licenciatipo == item.id_licenciatipo ? 'border-blue-500' : 'border-gray-300'}`}>
            <div className="flex items-start">
              <input
                type="radio"
                id={item.id_licenciatipo}
                checked={precioSelected?.id_licenciatipo == item.id_licenciatipo}
                onChange={() => handleChangePrecio(item)}
                className="mt-1 mr-2"
              />
              <label htmlFor={item.id_licenciatipo} className="flex-1">
                <div className="font-medium"> </div>
                <div className="text-lg font-bold">${item.precio}/ {item.nombre}</div>
              </label>
            </div>
          </div>
        ))}
      </section>

      <p className="text-sm text-gray-600 mb-8">
        Se renueva automáticamente cada año. Puedes cancelar en cualquier momento.
        <a href="#" className="text-pink-600 ml-1">Términos y condiciones.</a>
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Detalles de la suscripción</h2>
        <div className="flex justify-between py-2 border-b">
          <span>{precioSelected?.nombre}</span>
          <span className="font-bold">${precioSelected?.precio}</span>
        </div>
        <div className="flex justify-between py-4 font-bold">
          <span>Total del pedido</span>
          <span>${precioSelected?.precio}</span>
        </div>
        <p className="text-sm text-gray-600">El precio total incluye impuestos.</p>
        <button className="text-pink-600 text-sm mt-2">¿Tienes un código de descuento?</button>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Dirección de Envío</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Razón social*</label>
          <input name="empresa_razon_social" type="text"
            placeholder="Razón social"
            className={`w-full p-2 border rounded`}
            {...register("empresa_razon_social", { required: true })}
          />
          {errors.empresa_razon_social && <span className="text-xs text-pink-500">Ingresa su razón social válido</span>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Número de RUC*</label>
          <input name="empresa_numero_documento" type="text"
            placeholder="Número de RUC"
            className={`w-full p-2 border rounded`}
            {...register("empresa_numero_documento", { required: true })}
          />
          {errors.empresa_numero_documento && <span className="text-xs text-pink-500">Ingresa un número de RUC válido</span>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tipo de Documento*</label>
          <select
            name="id_tipodocumento"
            className={`w-full p-2 border rounded`}
            required
            {...register("id_tipodocumento", { required: true })}
          >
            <option value="" disabled>Seleccione un documento</option>
            {tipoDocumentos.map((item) => (
              <option value={item.id_tipodocumento} key={item.id_tipodocumento}>
                {item.siglas} - {item.nombre}
              </option>
            ))}
          </select>
          {errors.id_tipodocumento && <span className="text-xs text-pink-500">Ingresa un tipo de documento válido</span>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Número de Documento*</label>
          <input name="numero_documento" type="text"
            placeholder="Documento"
            className={`w-full p-2 border rounded`}
            {...register("numero_documento", { required: true })}
          />
          {errors.numero_documento && <span className="text-xs text-pink-500">Ingresa un número de documento válido</span>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Nombre Completo*</label>
          <input name="nombre_completo" type="text"
            placeholder="Nombre completo"
            className={`w-full p-2 border rounded`}
            {...register("nombre_completo", { required: true })}
          />
          {errors.nombre_completo && <span className="text-xs text-pink-500">Ingresa un nombre válido</span>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Número de Teléfono*</label>
          <input name="telefono" type="text"
            placeholder="Número de contacto"
            className={`w-full p-2 border rounded`}
            {...register("telefono", { required: true })}
          />
          {errors.telefono && <span className="text-xs text-pink-500">Ingresa un número de teléfono válido</span>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Correo electrónico*</label>
          <input name="correo" type="text"
            placeholder="Correo electrònico (email)"
            className={`w-full p-2 border rounded`}
            {...register("correo", { required: true })}
          />
          {errors.correo && <span className="text-xs text-pink-500">Ingresa un correo electrónico válido</span>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Dirección*</label>
          <input name="direccion" type="text"
            placeholder="Dirección completa"
            className={`w-full p-2 border rounded`}
            {...register("direccion", { required: true })}
          />
          {errors.direccion && <span className="text-xs text-pink-500">Ingresa un dirección válido</span>}
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
              name="numero_operacion"
              {...register("numero_operacion", { required: true })}
            />
            {errors.numero_operacion && <span className="text-xs text-pink-500">Ingresa un número de operación válido</span>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Monto</label>
            <input type="text" className="w-full p-2 border rounded" placeholder="Monto"
              name="importe_operacion"
              {...register("importe_operacion", { required: true })}
            />
            {errors.importe_operacion && <span className="text-xs text-pink-500">Ingresa un monto válido</span>}
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">&nbsp;</p>

        <form onSubmit={handleSubmit(handlePago)}>
          <button
            className={`w-full bg-pink-600 text-white py-3 rounded font-medium ${!isLoading ? '' : 'bg-opacity-50 cursor-not-allowed'}`}>
            {isLoading ? <ClipLoader color="#ffffff" size={20} /> : 'Suscríbete ahora'}
          </button>
        </form>

      </section>
    </div>
        </main>
      <EducationalFooter />
      <ToastContainer />
    </div>
  );
};

export default CompraLicenciaPage;