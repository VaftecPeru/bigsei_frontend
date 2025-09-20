import { Check, X } from "lucide-react"
import { Link } from 'react-router-dom';
import { Api_Global_Web } from "../../services/WebApi";
import apiClient from "../../Utils/apiClient";
import { useState, useEffect } from "react";

export default function Beneficios() {
  const [beneficios, setBeneficios] = useState([]);
  const [paginate, setPaginate] = useState({
    per_page: 4,
    page: 1,
  });

  const handleBeneficios = () => {
    apiClient.get(Api_Global_Web.membresiaTipos.listarActivos(paginate))
      .then((response) => {
        const data = response.data.data.map((item) => ({
          ...item,
          beneficios: item.tipo_beneficios.filter(it => it.esta_habilitado == '1'),
          noBeneficios: item.tipo_beneficios.filter(it => it.esta_habilitado == '0'),
        }));
        setBeneficios(data);
      })
      .catch((error) => {
      });
  };

  useEffect(() => {
    handleBeneficios();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
        {beneficios.map((beneficio, index) => (
          <div className="bg-white p-8 rounded-3xl border-4 border-[#004B93] flex flex-col">
            <h2 className="text-xl font-bold text-[#004B93] text-center mb-4">{beneficio.nombre}</h2>
            <div className="text-center">
              {beneficio.precio == 0 ? (
                <div className="text-4xl font-bold">${beneficio.precio_mes}</div>
              ) : (
                <div className="text-4xl font-bold">${beneficio.precio_mes}/mes</div>
              )}
              {beneficio.es_anual == '1' ? (
                <div className="text-sm text-gray-500 mb-2">${beneficio.precio} facturados anualmente</div>
              ) : (
                <div className="mb-2">&nbsp;</div>
              )}

            </div>
            <div className="w-full h-[3px] bg-[#004B93] my-4"></div>
            <p className="text-sm text-center mb-6">
              {beneficio.descripcion}
            </p>
            <Link to={`/compra-membresia/${beneficio.id_membresiatipo}`} className="w-full">
              <button className="w-full py-2.5 px-4 rounded-full border-2 border-gray-800 mb-4 text-sm hover:bg-blue-900 hover:text-white">
                Suscríbete a {beneficio.nombre}
              </button>
            </Link>
            {beneficio.precio > 0 && (
              <div className="text-xs text-gray-500 text-center mb-6">
                Se renueva automáticamente. Ver términos y condiciones
              </div>
            )}
            {beneficio.precio > 0 ? (
              <div className="text-sm font-semibold mb-4">Suscríbete a {beneficio.nombre} y obtendrás:</div>
            ) : (
              <div className="text-sm font-semibold mb-4">Al registrarte gratis obtendrás:</div>
            )}
            <ul className="space-y-4 text-sm">
              {beneficio.beneficios.map((tipoBeneficio, index) => (
                <li className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>{tipoBeneficio.descripcion}</span>
                </li>
              ))}
            </ul>

            {beneficio.noBeneficios.length && (
              <div className="space-y-4 text-sm mt-6">
                <div className="text-sm font-semibold mb-4">Con acceso limitado no podrás:</div>
                <ul className="space-y-4 text-sm">
                  {beneficio.noBeneficios.map((noBeneficio, index) => (
                    <li className="flex items-start gap-3">
                      <X className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                      <span>{noBeneficio.descripcion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        ))}
      </div>
    </div>
  )
}