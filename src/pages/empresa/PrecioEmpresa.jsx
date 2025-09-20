import { Check } from "lucide-react";
import { useState, useEffect } from "react";
import { Api_Global_Web } from "../../services/WebApi";
import apiClient from "../../Utils/apiClient";
import { Link } from "react-router-dom";

function PrecioEmpresa() {
  const [licencias, setLicencias] = useState([]);

  const handleListarLicencias = () => {
    apiClient.get(Api_Global_Web.licencias.listarTipoActivos({
      per_page: 4,
      page: 1,
    }))
      .then((response) => {
        setLicencias(response.data.data);
      })
      .catch((error) => {
        setLicencias([]);
      });
  };

  useEffect(() => {
    handleListarLicencias();
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#00264A] to-[#00264A] overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* <div className="bg-white rounded-3xl p-8 shadow-lg border-3 border-[#C9002B]" >
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Precio por licencia $249</h3>
                <div className="h-1 w-48 bg-pink-700 mt-2 rounded-full"></div>
              </div>
              <p className="text-gray-600 font-medium">Más adecuado para pequeñas empresas y equipos.</p>
              <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-6 rounded-full transition-all">
                Comprar ahora
              </button>

              <p className="text-sm text-gray-600">Suscríbete a Unlimited For Teams y obtendrás:</p>

              <ul className="space-y-4">
                {[
                  "Fácil configuración para entre 5 y 100 empleados",
                  "Capacidad para realizar el seguimiento y gestionar el progreso",
                  "Cada asiento puede ser utilizado por varios alumnos durante todo el año",
                  "Capacite a su equipo para el lugar de trabajo del futuro y aumente la productividad",
                  "Además de todos los demás beneficios ilimitados",
                  "Obtenga certificados listos para incluir en su CV y desarrolle habilidades profesionales de nivel superior",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-pink-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div> */}
          {licencias.map((licencia, index) => (
            <div className="bg-white rounded-3xl p-8 shadow-lg border-3 border-[#C9002B]" >
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800">Precio por licencia ${licencia.precio}</h3>
                  <div className="h-1 w-48 bg-pink-700 mt-2 rounded-full"></div>
                </div>
                {/* <p className="text-gray-600 font-medium">Más adecuado para pequeñas empresas y equipos.</p> */}
                <p className="text-gray-600 font-medium">{licencia.descripcion}</p>
                <Link to={`/compra-licencia/${licencia.id_licenciatipo}`}>
                  <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-6 rounded-full transition-all">
                    Comprar ahora
                  </button>
                </Link>

                {/* <p className="text-sm text-gray-600">Suscríbete a Unlimited For Teams y obtendrás:</p> */}
                <p className="text-sm text-gray-600">Suscríbete a {licencia.nombre} y obtendrás:</p>

                <ul className="space-y-4">
                  {licencia.tipo_beneficios.map((tipoBeneficio, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-pink-600 flex-shrink-0 mt-1" />
                      <span className="text-gray-600">{tipoBeneficio.descripcion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* Card 2 - Precios a consultar */}
          <div className="bg-white rounded-3xl p-8 shadow-lg">
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-800">Precios a consultar</h3>
                <div className="h-1 w-48 bg-pink-700 mt-2 rounded-full"></div>
              </div>

              <p className="text-gray-600 font-medium">
                ¿No está seguro de cómo Bigsei ayudará a su empresa? Hable con nuestros asesores
              </p>

              <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-6 rounded-full transition-all">
              Registrar ahora
              </button>

              <p className="text-sm text-gray-600">
                Contáctenos hoy y explore todas nuestras soluciones para empresas como la suya:
              </p>

              <ul className="space-y-4">
                {[
                  "Precio reducido para equipos más grandes",
                  "Acceso a miles de cursos o paquetes personalizados para satisfacer sus necesidades",
                  "Capacidad para realizar el seguimiento y gestionar el progreso",
                  "Códigos de cupones de cursos para ofrecer aprendizaje como recompensa o incentivo",
                  "Acceso a cursos acreditados por CPD, certificados profesionales y más",
                  "Asistencia y asesoramiento presencial de los asesores de confianza de Bigsei",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-pink-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-600">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrecioEmpresa;