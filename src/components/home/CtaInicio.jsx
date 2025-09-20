import { useState, useEffect } from "react";
import { ModalSuscripcion } from "../ux/modal/ModalSuscripcion";
import { Link } from 'react-router-dom';
import { Api_Global_Web } from "../../services/WebApi";
import apiClient from "../../Utils/apiClient";

export default function CtaInicio({ setIsActive, isActive }) {
  const [isHovered, setIsHovered] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(null);
  const [membresiaSelected, setMembresiaSelected] = useState(null);

  const handleMembresia = () => {
    apiClient.get(Api_Global_Web.membresiaTipos.listarActivos({
      per_page: 2,
      page: 1,
    }))
      .then((response) => {
        if (response.data.data.length > 0) {
          setMembresiaSelected(response.data.data[0]);
        }
      })
      .catch((error) => {
        setMembresiaSelected(null);
      });
  };

  useEffect(() => {
    handleMembresia();
  }, []);

  return (
    <div
      className={`${isHovered ? "bg-white scale-100 text-blue-950 shadow-none" : "bg-white text-blue-950 scale-95"}
      mt-6 max-w-screen-2xl rounded-t-2xl rounded-b-2xl border-x-2 border-t-2 overflow-x-hidden mx-auto border-opacity-50 border-gray-200 transition-all duration-300`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex flex-col lg:flex-row items-center justify-evenly m-auto gap-6 lg:gap-20 py-16 px-12 sm:px-20 lg:px-30 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl text-pretty text-center lg:text-start font-bold tracking-tight">
          Aprende sin límites todo un año con <span className="text-fuchsia-600">30% de descuento</span>
        </h2>

        <div className="flex flex-col items-center">
          {/* <button
            className={`${
              buttonHovered === "subscribtion"
                ? "bg-gradient-radial from-fuchsia-400 to-fuchsia-500"
                : "bg-gradient-radial from-fuchsia-600 to-fuchsia-500"
            } text-white flex justify-center py-4 rounded-md font-medium text-lg transition-all duration-200`}
            style={{ width: "440px" }}
            onClick={() => setIsActive(!isActive)}
            onMouseEnter={() => setButtonHovered("subscribtion")}
            onMouseLeave={() => setButtonHovered(null)}
          >
            Suscríbete a Unlimited
          </button> */}
          {membresiaSelected && (
            <Link to={`/compra-membresia/${membresiaSelected.id_membresiatipo}`} className="w-full">
              <button
                className={`${
                  buttonHovered === "subscribtion"
                    ? "bg-gradient-radial from-fuchsia-400 to-fuchsia-500"
                    : "bg-gradient-radial from-fuchsia-600 to-fuchsia-500"
                } text-white flex justify-center py-4 rounded-md font-medium text-lg transition-all duration-200`}
                style={{ width: "440px" }}
              >
                Suscríbete a {membresiaSelected.nombre}
              </button>
            </Link>
          )}

          <div className="flex items-center gap-6 mt-4 mx-auto max-w-full">
            <img
              src="/img/Estrellas/estrellas.png"
              alt="estrellas"
              className="w-32 object-contain flex-shrink-0"
            />
            <p className="text-base text-gray-900 whitespace-nowrap">
              189.555 opiniones de estudiantes. Desarrollado por <span className="text-blue-600 font-semibold">Bigsei.</span>
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}