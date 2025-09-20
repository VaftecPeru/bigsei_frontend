import { useState, useEffect } from "react";
import { Api_Global_Setup } from "../../services/SetupApi";
import apiClient from "../../Utils/apiClient";
import { ClipLoader } from 'react-spinners';

export default function ChangeSedeRolModal({ onClose }) { // isOpen,
  const [isLoading, setLoading] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [roles, setRoles] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [formulario, setFormulario] = useState({
    id_empresa: '',
    id_rol: '',
  });

  const closeRegisterModal = (data) => {
    onClose(data);
  };

  const onChangeValue = (e) => {
    const { name, value } = e.target;
    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const listarRoles = (id_empresa) => {
    apiClient.get(Api_Global_Setup.userRoles.listar(id_empresa))
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        setRoles([]);
      });
  };

  const listarEmpresas = () => {
    apiClient.get(Api_Global_Setup.userEmpresas.listar())
      .then((response) => {
        setEmpresas(response.data);
      })
      .catch((error) => {
        setEmpresas([]);
      });
  };

  // if (!isOpen) return null;

  const handleGuardar = () => {
    setLoading(true);
    apiClient.post(Api_Global_Setup.userRoles.esPrincipal(), formulario)
      .then((response) => {
        setLoading(false);
        closeRegisterModal({url: response.data.url});
      })
      .catch((error) => {
        setLoading(false);
        setMensajeError(error.response.data);
        setIsVisible(true);
        setTimeout(() => { setIsVisible(false); }, 3000);
      });
  };

  useEffect(() => {
    listarRoles("");
    listarEmpresas();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">

        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Cambiar de sede y rol
          </h1>

          <form className="space-y-6">
            <div className="px-3 py-2">
              <label className="block text-xs font-medium text-gray-500 mb-1">Sede</label>
              <select
                className="block w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                name="id_empresa"
                value={formulario.id_empresa}
                onChange={(e) => {
                  onChangeValue(e);
                  listarRoles(e.target.value);
                }}
              >
                <option value="">--Seleccionar--</option>
                {empresas.map((item) => <option value={item.id_empresa} key={item.id_empresa}>{item.razon_social}</option> )}
              </select>
            </div>

            <div className="px-3 py-2">
              <label className="block text-xs font-medium text-gray-500 mb-1">Rol</label>
              <select
                className="block w-full px-3 py-2 text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                name="id_rol"
                value={formulario.id_rol}
                onChange={onChangeValue}
              >
                <option value="">--Seleccionar--</option>
                {roles.map((item) => <option value={item.id_rol} key={item.id_rol}>{item.nombre}</option> )}
              </select>
            </div>
            {isVisible && <div className="px-3 py-2">
              <h1 style={{ backgroundColor: 'orange', color: 'white', borderRadius: '10px', padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>{mensajeError}</h1>
            </div>}
          </form>
          <div className="flex justify-end space-x-4 pt-4">
            <button
              disabled={isLoading}
              type="button"
              onClick={() => closeRegisterModal()}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isLoading ? <ClipLoader color="#374151" size={20} /> : 'Cancelar'}
            </button>
            <button
              disabled={isLoading}
              className={`py-2 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md transition duration-150 ease-in-out`}
              onClick={handleGuardar}
            >
              {isLoading ? <ClipLoader color="#ffffff" size={20} /> : 'Guardar'}
            </button>
          </div>

        </div>
      </div>

    </div>

  );
}