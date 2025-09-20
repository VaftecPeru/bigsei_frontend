import { CheckCircle, Clock, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function CursoCard({ curso }) {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} fill="#FFC107" color="#FFC107" size={16} />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} fill="#FFC107" color="#FFC107" size={16} style={{ clipPath: 'inset(0 50% 0 0)' }} />);
      } else {
        stars.push(<Star key={i} color="#FFC107" size={16} />);
      }
    }
    
    return stars;
  };

  return (
    <div key={curso.id_periodocurso} className="bg-white rounded border border-gray-200 overflow-hidden">
      <img 
        src={curso.url_img} 
        alt={curso.curso_nombre} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="text-gray-600 text-sm mb-1">{curso.empresa_razon_social}</div>
        <h3 className="font-bold text-lg mb-2">{curso.curso_nombre}</h3>
        
        <div className="flex items-center mb-4">
          <div className="flex mr-1">
            {renderStars(curso.rating)}
          </div>
          <span className="text-gray-700 text-sm">
            {curso.rating} ({curso.reviews} reseñas)
          </span>
        </div>
        
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Clock size={16} className="mr-1" />
            {curso.weeks} semanas
          </div>
          <div className="flex items-center">
            <Users size={16} className="mr-1" />
            {curso.hoursPerWeek} horas a la semana
          </div>
        </div>
        
        <div className="flex items-center mb-4 text-sm text-gray-600">
          <CheckCircle size={16} className="mr-1" />
          Incluido en Unlimited
        </div>
        
        <Link to={`/cursos-detalle/${curso.id_periodocurso}`} className="w-full block text-center bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded">
          Más información
        </Link>
      </div>
    </div>
  )
}