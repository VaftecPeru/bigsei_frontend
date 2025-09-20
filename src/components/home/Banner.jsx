import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Banner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <div
      className={`${
        isVisible
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-75 translate-y-[-100%] bg-white"
      } fixed top-0 flex items-center w-full text-center gap-x-6 px-6 py-2.5 sm:px-4 md:px-6 lg:px-8 xl:px-10 sm:py-3 lg:py-4 z-50 transition-all duration-700 ease-in-out mb-20 ${
        isHovered ? "bg-gradient-to-r from-red-950 via-red-700 to-orange-500" : "bg-gradient-to-b from-gray-100 to-gray-50"
      }`}
    >
      <div
        aria-hidden="true"
        className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      />
      <div
        aria-hidden="true"
        className="absolute left-[max(45rem,calc(50%+8rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu blur-2xl"
      />
      <div
        className={`${
          isHovered ? "text-white" : " text-[#00264A]"
        } flex flex-wrap justify-center items-center gap-x-4 gap-y-2 w-full`}
      >
        <p className="text-sm sm:text-base md:text-lg">
          🎉 <strong>¡Date prisa!</strong> Solo quedan 11 días para obtener <strong>1 año de aprendizaje ilimitado</strong> por solo $119.99 🔥
        </p>
        <Link
          to="/cursos"
          className={`${
            isHovered ? "bg-white scale-105 text-[#00264A] " : "bg-[#00264A] text-white "
          }flex-none rounded-full px-3.5 py-1 text-sm font-semibold shadow-sm transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 sm:px-4 sm:py-2 md:px-5 md:py-2.5`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Descubre más <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
      <div className="flex flex-1 justify-end">
        <button
          type="button"
          className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClose}
        >
          <span className="sr-only">Eliminar</span>
          <FontAwesomeIcon
            icon={faTimes}
            className={`${ isHovered ? " text-white rotate-90 scale-105 " : " text-[#00264A] " } text-2xl transition-all duration-300 sm:text-3xl md:text-4xl `}
          />
        </button>
      </div>
    </div>
  );
};

export default Banner;