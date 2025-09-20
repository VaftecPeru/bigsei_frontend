import { Link } from "react-router-dom";
import events from "../../../assets/events.jpg";

const Banner = () => {
  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[400px] lg:h-[600px] bg-gradient-to-r from-[#00264A] via-[#004080] to-[#0074D9] -mt-px">
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full text-white px-6 md:px-12">
        
        <div className="flex-1 text-left">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4">
            <span className="text-orange-500">Inscríbete</span> fácilmente en tu <br />institución ideal
          </h1>
          <p className="text-lg sm:text-xl mb-6 max-w-xl">
            Accede a beneficios únicos con nuestro curso gratuito y evento online.
          </p>
          <Link to="/cursos">
            <button className="bg-indigo-600 text-white px-6 py-3 text-lg rounded-md hover:bg-indigo-800 transition-colors">
              Registro en 1 click
            </button>
          </Link>
        </div>

        <div className="flex-1 flex justify-center md:justify-end mt-6 md:mt-0">
          <img
            src={events}
            alt="Evento institucional"
            className="w-full max-w-[620px] md:max-w-[680px] lg:max-w-[720px] max-h-[600px] object-contain rounded-lg drop-shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
