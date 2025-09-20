import { useState } from "react";
import { useEffect } from "react";
import { Api_Global_SuperAdministrador } from "../../../services/SuperAdministradorApi";
import { Api_Global_Setup } from "../../../services/SetupApi";
import apiClient from "../../../Utils/apiClient";
import { MessagePending } from "../../../components/shared/MessagePending";
import { MessageSuccess } from "../../../components/shared/MessageSuccess";

export default function RegisterModal({ isOpen, onClose}) {
  const [showPending, setShowPending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [tipoDocumentos, setTipoDocumentos] = useState([]);
  const [vendedores, setVendedores] = useState([]);
  const [formulario, setFormulario] = useState({
    id_tipodocumento: '',
    numero_documento: '',
    razon_social: '',
    condicion_sunat: 'H',
    estado_contribuyente: '1',
    tipo_relacion: 'C',
    id_vendedor: '',
    correo: '',
    contacto: '',
    direccion_fiscal: '',
    telefono: '',
    departamento: '',
    provincia: '',
    distrito: '',
    direccion: '',
  });

  const isValid = () => {
    if (
      formulario.id_tipodocumento &&
      formulario.numero_documento &&
      formulario.razon_social &&
      formulario.condicion_sunat &&
      formulario.estado_contribuyente &&
      formulario.tipo_relacion &&
      formulario.id_vendedor &&
      formulario.correo &&
      formulario.contacto &&
      formulario.direccion_fiscal &&
      formulario.telefono &&
      formulario.departamento &&
      formulario.provincia &&
      formulario.distrito &&
      formulario.direccion
    ) {
      return true;
    } else {
      return false;
    }
  };

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const listarTipoDocumentos = async (text_search = "") => {
    try {
        const response = await apiClient.get(Api_Global_Setup.tipoDocumentos.listar(text_search));
        const data = response.data.map((item) => ({
            id_tipodocumento: item.id_tipodocumento,
            siglas: item.siglas,
        }));
        const tipos = data.filter(item => item.siglas == 'RUC');

        setTipoDocumentos(tipos);
    } catch (error) {
    } finally {
    }
  };

  const listarVendedores = async (text_search = "") => {
    try {
        const response = await apiClient.get(Api_Global_SuperAdministrador.vendedores.listar(text_search));
        const data = response.data.map((item) => ({
            id_vendedor: item.id_vendedor,
            nombre: item.nombre_completo,
        }));
        setVendedores(data);
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    listarTipoDocumentos("");
    listarVendedores("");
  }, []);

  if (!isOpen) return null;

  const closeRegisterModal = () => {
    setFormulario({
      id_tipodocumento: '',
      numero_documento: '',
      razon_social: '',
      condicion_sunat: 'H',
      estado_contribuyente: '1',
      tipo_relacion: 'C',
      id_vendedor: '',
      correo: '',
      contacto: '',
      direccion_fiscal: '',
      telefono: '',
      departamento: '',
      provincia: '',
      distrito: '',
      direccion: '',
    });

    onClose();
  };

  // REGISTRAR
  const onGuardar = () => {
    setShowPending(true);
    apiClient.post(Api_Global_SuperAdministrador.empresas.registrar(), formulario)
      .then((response) => {
        setShowPending(false);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          closeRegisterModal();
        }, 1500);
      })
      .catch((error) => {
        setShowPending(false);
      });
  };

  return (
    <div
      className="bg-gray-200 flex justify-center items-start
      fixed inset-0 z-50 h-full w-full
      p-0 md:p-6"
      style={{ background: "#4d4d4d21", backdropFilter: "blur(10px)" }}
      id="register-modal"
    >
      <div className="w-full h-full max-w-4xl bg-white rounded-lg shadow-lg relative overflow-auto">
        <button
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          onClick={() => closeRegisterModal()}
          aria-label="Cerrar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Registrar Cliente
          </h1>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Tipo de Persona <span className="text-red-500">*</span>
                </label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white py-2 px-3 border"
                  defaultValue="juridica"
                >
                  <option value="juridica">JURÍDICA</option>
                  <option value="natural">NATURAL</option>
                </select>
              </div> */}

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Tipo de Documento <span className="text-red-500">*</span>
                </label>
                <select
                  className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white py-2 px-3 border ${formulario.id_tipodocumento != '' ? 'border-blue-500' : 'border-gray-300'}`}
                  name="id_tipodocumento"
                  defaultValue={formulario.id_tipodocumento}
                  onChange={onChangeValue}
                >
                  <option value="" disabled>Seleccione</option>
                  {tipoDocumentos.map((item) => <option value={item.id_tipodocumento} key={item.id_tipodocumento}>{item.siglas}</option> )}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Número Documento <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ingresar N° Documento"
                  name="numero_documento"
                  defaultValue={formulario.numero_documento}
                  onChange={onChangeValue}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white py-2 px-3 border ${formulario.numero_documento != '' ? 'border-blue-500' : 'border-gray-300'}`}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Razón Social <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Ingresar Razón Social"
                name="razon_social"
                defaultValue={formulario.razon_social}
                onChange={onChangeValue}
                className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white py-2 px-3 border ${formulario.razon_social != '' ? 'border-blue-500' : 'border-gray-300'}`}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Condición Sunat <span className="text-red-500">*</span>
                </label>
                <select
                  className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white py-2 px-3 border ${formulario.condicion_sunat != '' ? 'border-blue-500' : 'border-gray-300'}`}
                  name="condicion_sunat"
                  defaultValue={formulario.condicion_sunat}
                  onChange={onChangeValue}
                >
                  <option value="H">HABIDO</option>
                  <option value="NH">NO HABIDO</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Estado Contribuyente <span className="text-red-500">*</span>
                </label>
                <select
                  className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white py-2 px-3 border ${formulario.estado_contribuyente != '' ? 'border-blue-500' : 'border-gray-300'}`}
                  name="estado_contribuyente"
                  defaultValue={formulario.estado_contribuyente}
                  onChange={onChangeValue}
                >
                  <option value="1">ACTIVO</option>
                  <option value="0">INACTIVO</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Tipo de Relación
                </label>
                <select className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white py-2 px-3 border ${formulario.tipo_relacion != '' ? 'border-blue-500' : 'border-gray-300'}`}
                  name="tipo_relacion"
                  defaultValue={formulario.tipo_relacion}
                  onChange={onChangeValue}
                  >
                  <option value="">Seleccionar Tipo de Relación</option>
                  <option value="C">Cliente</option>
                  <option value="P">Proveedor</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Vendedor Asociado
                </label>
                <select className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white py-2 px-3 border ${formulario.id_vendedor != '' ? 'border-blue-500' : 'border-gray-300'}`}
                  name="id_vendedor"
                  defaultValue={formulario.id_vendedor}
                  onChange={onChangeValue}
                  >
                  <option value="" disabled>Seleccionar Vendedor Asociado</option>
                  {vendedores.map((item) => <option value={item.id_vendedor} key={item.id_vendedor}>{item.nombre}</option> )}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Correo
                </label>
                <input
                  type="email"
                  placeholder="Ingresar Correo"
                  name="correo"
                  defaultValue={formulario.correo}
                  onChange={onChangeValue}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white py-2 px-3 border ${formulario.correo != '' ? 'border-blue-500' : 'border-gray-300'}`}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Contacto
                </label>
                <input
                  type="text"
                  placeholder="Ingresar contacto"
                  name="contacto"
                  defaultValue={formulario.contacto}
                  onChange={onChangeValue}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white py-2 px-3 border ${formulario.contacto != '' ? 'border-blue-500' : 'border-gray-300'}`}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Datos de Dirección</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Tipo Establecimiento
                  </label>
                  <input
                    type="text"
                    placeholder="DIRECCION FISCAL"
                    name="direccion_fiscal"
                    defaultValue={formulario.direccion_fiscal}
                    onChange={onChangeValue}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white py-2 px-3 border ${formulario.direccion_fiscal != '' ? 'border-blue-500' : 'border-gray-300'}`}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    placeholder="Ingresar Teléfono"
                    name="telefono"
                    defaultValue={formulario.telefono}
                    onChange={onChangeValue}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white py-2 px-3 border ${formulario.telefono != '' ? 'border-blue-500' : 'border-gray-300'}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Departamento
                  </label>
                  <input
                    type="text"
                    placeholder="Seleccionar Departamento"
                    name="departamento"
                    defaultValue={formulario.departamento}
                    onChange={onChangeValue}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white py-2 px-3 border ${formulario.departamento != '' ? 'border-blue-500' : 'border-gray-300'}`}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Provincia
                  </label>
                  <input
                    type="text"
                    placeholder="Seleccionar Provincia"
                    name="provincia"
                    defaultValue={formulario.provincia}
                    onChange={onChangeValue}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white py-2 px-3 border ${formulario.provincia != '' ? 'border-blue-500' : 'border-gray-300'}`}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Distrito
                  </label>
                  <input
                    type="text"
                    placeholder="Seleccionar Distrito"
                    name="distrito"
                    defaultValue={formulario.distrito}
                    onChange={onChangeValue}
                    className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white py-2 px-3 border ${formulario.distrito != '' ? 'border-blue-500' : 'border-gray-300'}`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Dirección
                </label>
                <input
                  type="text"
                  placeholder="Ingresar Dirección"
                  name="direccion"
                  defaultValue={formulario.direccion}
                  onChange={onChangeValue}
                  className={`mt-1 block w-full rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white py-2 px-3 border ${formulario.direccion != '' ? 'border-blue-500' : 'border-gray-300'}`}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => closeRegisterModal()}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancelar
              </button>
              <button
                type="button"
                disabled={!isValid()}
                onClick={() => onGuardar()}
                className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isValid() ? '' : 'bg-opacity-50 cursor-not-allowed'}`}
              >
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>

      {showPending && (
        <MessagePending
          title="Atención"
          text="¡Procesando el registro, espere un momento!">
        </MessagePending>
      )}
      {showSuccess && (
        <MessageSuccess
          title="Atención"
          text="¡Registro completado con éxito!">
        </MessageSuccess>
      )}
    </div>

  );
}
