import { CheckCircle, Star } from "lucide-react";

export const MBACard2 = ({title,slug,img,description,institution,path_url,rating,reviews}) => {

    const renderStars = (rating) => {
      const stars = [];
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 >= 0.5;
      
      // Only render stars if we have a rating
      if (rating === 0) return null;
      
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
        <div key={title} className="bg-white    overflow-hidden shadow-lg">
            <img 
              src={img} 
              alt={title} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="text-gray-600 text-sm mb-1">{institution}</div>
              <h3 className="font-bold text-lg mb-2">{title}</h3>
              
              {rating > 0 && (
                <div className="flex items-center mb-4">
                  <div className="flex mr-1">
                    {renderStars(rating)}
                  </div>
                  <span className="text-gray-700 text-sm">
                    {rating} ({reviews} reviews)
                  </span>
                </div>
              )}
              
              
          <a href={path_url}>
            <button
            
            className="w-full bg-pink-600 text-white font-semibold py-2 rounded mt-4 hover:bg-pink-700 transition">
              Más información-{slug}
            </button>
          </a>
          
        </div>

    
      </div>

    );
  };
  