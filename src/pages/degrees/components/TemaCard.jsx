import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { Api_Global_Setup } from "../../../services/SetupApi";
import { rutaApi } from "../../../Utils/Utils";

export default function TemaCard({ tema }) {
  const navigate = useNavigate();

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    if (rating === 0) return null;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} fill="#FFC107" color="#FFC107" size={16} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star
            key={i}
            fill="#FFC107"
            color="#FFC107"
            size={16}
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        );
      } else {
        stars.push(<Star key={i} color="#FFC107" size={16} />);
      }
    }
    return stars;
  };

  return (
    <div
      key={tema.id_periodotema}
      className="bg-white overflow-hidden shadow-lg rounded-2xl"
    >
      {tema.curso_id_archivo ? (
        <img
          src={`${rutaApi(
            Api_Global_Setup.archivos.visualizarImagen(tema.curso_id_archivo)
          )}`}
          alt={tema.titulo}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 flex items-center justify-center font-bold text-gray-500 bg-gray-100">
          Cargando imagen...
        </div>
      )}

      <div className="p-4">
        <div className="text-gray-600 text-sm mb-1">
          {tema.empresa_razon_social}
        </div>

        <h3 className="font-bold text-lg mb-2">
          {tema.titulo}: <span className="font-normal">{tema.descripcion}</span>
        </h3>

        {tema.rating > 0 && (
          <div className="flex items-center mb-4">
            <div className="flex mr-1">{renderStars(tema.rating)}</div>
            <span className="text-gray-700 text-sm">
              {tema.rating} ({tema.reviews} reviews)
            </span>
          </div>
        )}

        <button
          onClick={() => navigate("/temas")}
          className="w-full bg-pink-600 text-white font-semibold py-2 rounded mt-4 hover:bg-pink-700 transition"
        >
          Más información - {tema.titulo}
        </button>
      </div>
    </div>
  );
}
