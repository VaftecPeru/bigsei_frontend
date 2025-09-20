import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import { FutureLearnForm } from "../ux/ModalMaestria";
import LogoCarousel from "@/pages/docente/asignatura/components/LogoCarousel";
import { Api_Global_Web } from "../../services/WebApi";
import apiClient from "../../Utils/apiClient";

const Carrusel = () => {
  const images = ["/img/banner/bg-bigsei.jpg", "/img/banner2.jpeg"]
  const router= useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isActive, setIsActive] = useState(false);
  const [membresiaSelected, setMembresiaSelected] = useState(null);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

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
    <div className="relative w-full" id="gallery">
      {/* Imagen */}
      <div className="w-full h-[250px] sm:h-[300px] md:h-screen overflow-hidden">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Card: móvil solapando la imagen; desktop overlay centrado */}
      <div
        className={`
          mx-4 sm:mx-8
          -mt-16 sm:-mt-20
          md:mt-0 md:absolute md:inset-0 md:flex md:justify-start md:items-center
          relative 
        `}
      >
        <div className="w-full max-w-full sm:max-w-2xl bg-white border border-gray-200 p-6 sm:p-10 rounded-[2rem] drop-shadow-2xl ring-1 ring-gray-100">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-left sm:text-center">
            <span className="text-orange-500">Prepare</span> su carrera<br />para el futuro
          </h1>
          <p className="text-gray-600 text-lg sm:text-xl mb-6 sm:mb-8 text-left sm:text-center">
            Da el próximo paso en tu carrera profesional con cursos en línea de más de 200 universidades y marcas de primer nivel.
          </p>
          <div className="text-center flex justify-center gap-4 flex-wrap">

            <LogoCarousel />
          
            <Link to="/cursos">
              <button className="bg-indigo-950 text-white px-6 py-3 text-base rounded-sm hover:bg-blue-700 transition-colors">
                Explorar cursos
              </button>
            </Link>
            {membresiaSelected && (
              <Link to={`/compra-membresia/${membresiaSelected.id_membresiatipo}`}>
                <button
                  onClick={() => setIsActive(!isActive)}
                  className="border-2 border-blue-950 text-blue-950 px-6 py-3 text-base rounded-sm hover:bg-blue-50 transition-colors"
                >
                  Suscríbete a {membresiaSelected.nombre}
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>


      <button
        type="button"
        onClick={handlePrev}
        className="absolute top-0 left-0 z-10 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
          </svg>
          <span className="sr-only">Previous</span>
        </span>
      </button>

      <button
        type="button"
        onClick={handleNext}
        className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      >
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
          <svg
            className="w-4 h-4 text-white dark:text-gray-800"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
          </svg>
          <span className="sr-only">Next</span>
        </span>
      </button>
      {isActive && (
        <FutureLearnForm
          isActive={isActive}
          setIsActive={setIsActive}
        />
      )}
    </div>
  )
};

export default Carrusel;