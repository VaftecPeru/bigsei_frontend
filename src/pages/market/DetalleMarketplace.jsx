import React from 'react';
import { FaTimes, FaStar, FaMapMarkerAlt, FaPhone, FaGlobe } from 'react-icons/fa';

const DetallesMarketplace = ({ item, onClose }) => {
  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <FaStar 
        key={i} 
        className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"} 
        size={16} 
      />
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <div className="h-64 w-full overflow-hidden">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x600?text=Imagen+no+disponible';
              }}
            />
          </div>
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
          >
            <FaTimes className="text-gray-800" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold">{item.name}</h2>
              <div className="flex items-center text-gray-600 mt-1">
                <FaMapMarkerAlt className="mr-1" />
                <span>{item.location}</span>
              </div>
            </div>
            {item.rating && (
              <div className="flex items-center">
                {renderStars(item.rating)}
                <span className="ml-1 font-semibold">{item.rating}</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">Descripción</h3>
              <p className="text-gray-700">
                {item.description || "Esta institución educativa ofrece programas de alta calidad con profesores altamente calificados y modernas instalaciones."}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Información</h3>
              <ul className="space-y-2">
                {item.price && (
                  <li className="flex justify-between">
                    <span className="text-gray-600">Precio:</span>
                    <span className="font-semibold">{item.price}</span>
                  </li>
                )}
                {item.type && (
                  <li className="flex justify-between">
                    <span className="text-gray-600">Modalidad:</span>
                    <span className="font-semibold">{item.type}</span>
                  </li>
                )}
                <li className="flex justify-between">
                  <span className="text-gray-600">Nivel educativo:</span>
                  <span className="font-semibold">
                    {item.name.includes("Universidad") ? "Universidad" : 
                     item.name.includes("Instituto") ? "Instituto" : "Colegio"}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">Programas destacados</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Ingeniería', 'Administración', 'Medicina', 'Derecho'].slice(0, 2).map((programa, i) => (
                <div key={i} className="border rounded-lg p-3 hover:bg-gray-50">
                  <h4 className="font-medium">{programa}</h4>
                  <p className="text-sm text-gray-600 mt-1">Duración: 5 años</p>
                  {item.price && (
                    <p className="text-blue-600 font-semibold mt-2">{item.price}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center">
              <FaPhone className="mr-2" /> Contactar
            </button>
            <button className="flex-1 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 px-6 rounded-lg font-semibold transition-colors flex items-center justify-center">
              <FaGlobe className="mr-2" /> Visitar sitio web
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetallesMarketplace;