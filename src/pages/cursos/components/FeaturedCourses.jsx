import React from 'react';
import { Star } from 'lucide-react';
import { Api_Global_Web } from "../../../services/WebApi";
import { Api_Global_Setup } from "../../../services/SetupApi";
import apiClient from "../../../Utils/apiClient";
import { rutaApi } from "../../../Utils/Utils";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function FeaturedCourses() {
  const [courses, setCourses] = useState([]);
  const [paginate, setPaginate] = useState({
    per_page: 4,
    page: 1,
  });

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

  const handleListarCursos = () => {
    apiClient.get(Api_Global_Web.cursos.listarDestacados(paginate))
      .then((response) => {
        setCourses(response.data.data);
      })
      .catch((error) => {
        setCourses([]);
      });
  };

  useEffect(() => {
    handleListarCursos();
  }, []);

  return (
    <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-8">
      <h2 className="text-white text-2xl font-medium mb-8 text-left w-[80%] mx-auto">Explorar los cursos destacados</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-[80%] mx-auto">
        {courses.map(course => (
          <div key={course.id_periodocurso} className="bg-white    overflow-hidden shadow-lg">
            {course?.id_archivo ? (
              <img
                src={`${rutaApi(Api_Global_Setup.archivos.visualizarImagen(course.id_archivo))}`}
                alt={course.curso_nombre}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div
                className="w-full h-48 object-cover font-bold text-center pt-16 text-gray-500"
              >
                Cargando imagen...
              </div>
            )}
            <div className="p-4">
              <div className="text-gray-600 text-sm mb-1">{course.empresa_razon_social}</div>
              <h3 className="font-bold text-lg mb-2">{course.curso_nombre}</h3>
              
              {course.rating > 0 && (
                <div className="flex items-center mb-4">
                  <div className="flex mr-1">
                    {renderStars(course.rating)}
                  </div>
                  <span className="text-gray-700 text-sm">
                    {course.rating} ({course.reviews} reviews)
                  </span>
                </div>
              )}

              <Link to={`/cursos-detalle/${course.id_periodocurso}`} className="w-full block text-center bg-pink-600 hover:bg-pink-700 text-white py-2 px-4 rounded">
                Más información
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}