import React, { useState } from 'react';
import { FaChevronRight, FaStar, FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import DetallesMarketplace from './DetalleMarketplace';

const EducationMarketplace = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  // URLs de imágenes
  const imageUrls = {
    university1: 'https://images.unsplash.com/photo-1541178735493-479c1a27ed24?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    university2: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    institute1: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    school1: 'https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    school2: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    discount1: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    discount2: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  };

  // Datos de ejemplo
  const mostVisited = [
    { 
      name: "Universidad Nacional", 
      location: "Austria", 
      price: "$3,000", 
      rating: 4.5,
      image: imageUrls.university1
    },
    { 
      name: "Universidad del Norte", 
      location: "Austria", 
      price: "$2,500", 
      rating: 4.3,
      image: imageUrls.university2
    },
    { 
      name: "Instituto de Tecnología", 
      location: "Presencial", 
      price: "$2,500", 
      rating: 4.2,
      image: imageUrls.institute1
    },
    { 
      name: "Colegio Nuevo Horizonte", 
      location: "Business Area", 
      price: "$3,300", 
      rating: 4.0,
      image: imageUrls.school1
    },
    { 
      name: "Colegio San Ignacio", 
      location: "Santiago", 
      price: "$2,800", 
      rating: 4.7,
      image: imageUrls.school2
    }
  ];

  const mostPopular = [
    { 
      name: "University Green", 
      location: "Valencia", 
      type: "Online", 
      rating: 4.8,
      image: imageUrls.university1
    },
    { 
      name: "Instituto Politécnico", 
      location: "Valencia", 
      type: "Presencial", 
      rating: 4.6,
      image: imageUrls.institute1
    },
    { 
      name: "Colegio Los Olivos", 
      location: "Online", 
      type: "Online", 
      rating: 4.4,
      image: imageUrls.school1
    },
    { 
      name: "Universidad Metropolitana", 
      location: "Online", 
      type: "Online", 
      rating: 4.9,
      image: imageUrls.university2
    }
  ];

  const exclusives = [
    { 
      name: "Instituto Técnico", 
      location: "Sevilla", 
      type: "Presencial", 
      exclusive: true,
      image: imageUrls.institute1
    },
    { 
      name: "Colegio Santa Clara", 
      location: "Lima", 
      type: "Presencial", 
      exclusive: true,
      image: imageUrls.school2
    },
    { 
      name: "Universidad Metropolitana", 
      location: "Presencial", 
      type: "Presencial", 
      exclusive: true,
      image: imageUrls.university1
    }
  ];

  const discounts = [
    { 
      name: "Universidad de Lima", 
      program: "Ingeniería DPI", 
      discount: "49%", 
      originalPrice: "$5,000", 
      finalPrice: "$2,550",
      image: imageUrls.discount1
    },
    { 
      name: "Colegio San Juan", 
      program: "Gastronomía", 
      discount: "33%", 
      originalPrice: "$3,700", 
      finalPrice: "$2,479",
      image: imageUrls.discount2
    }
  ];

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <FaStar 
        key={i} 
        className={i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"} 
        size={14} 
      />
    ));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Bigsei</h1>
          <p className="text-xl mb-6">De la educación a tu futuro</p>
          <p className="mb-8">Universidades, institutos y colegios que te ayudarán a encontrar nuevas metas</p>
          
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-4 flex">
            <input 
              type="text" 
              placeholder="Buscar instituciones..." 
              className="flex-1 px-4 py-2 rounded-l-lg focus:outline-none text-gray-800"
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded-r-lg flex items-center">
              <FaSearch className="mr-2" /> Buscar
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filtros */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Marketplace de universidades, institutos y colegios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Todos los niveles</label>
              <select className="w-full p-2 border rounded">
                <option>Seleccionar</option>
                <option>Colegio</option>
                <option>Instituto</option>
                <option>Universidad</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Todos los tipos</label>
              <select className="w-full p-2 border rounded">
                <option>Seleccionar</option>
                <option>Público</option>
                <option>Privado</option>
                <option>Mixto</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
              <div className="relative">
                <select className="w-full p-2 border rounded">
                  <option>Seleccionar</option>
                  <option>Presencial</option>
                  <option>Online</option>
                  <option>Híbrido</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Sección: Los más visitados */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Los más visitados de la semana</h2>
            <a href="#" className="text-blue-600 flex items-center">
              Ver más <FaChevronRight className="ml-1" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mostVisited.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/800x600?text=Imagen+no+disponible';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <FaMapMarkerAlt className="mr-1" size={12} />
                    {item.location}
                  </div>
                  <div className="flex items-center mb-3">
                    {renderStars(item.rating)}
                    <span className="ml-1 text-sm text-gray-600">{item.rating}</span>
                  </div>
                  <p className="text-lg font-bold text-blue-600">{item.price}</p>
                  <button 
                    onClick={() => setSelectedItem(item)}
                    className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sección: Los más populares */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Los más populares</h2>
            <a href="#" className="text-blue-600 flex items-center">
              Ver más <FaChevronRight className="ml-1" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mostPopular.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/800x600?text=Imagen+no+disponible';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <FaMapMarkerAlt className="mr-1" size={12} />
                    {item.location} • {item.type}
                  </div>
                  <div className="flex items-center mb-3">
                    {renderStars(item.rating)}
                    <span className="ml-1 text-sm text-gray-600">{item.rating}</span>
                  </div>
                  <button 
                    onClick={() => setSelectedItem(item)}
                    className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sección: Exclusivos de Bigsei */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Exclusivos de Bigsei</h2>
            <a href="#" className="text-blue-600 flex items-center">
              Ver más <FaChevronRight className="ml-1" />
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exclusives.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-blue-500 relative hover:shadow-lg transition-shadow">
                {item.exclusive && (
                  <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                    Exclusivo
                  </div>
                )}
                <div className="h-40 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/800x600?text=Imagen+no+disponible';
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <FaMapMarkerAlt className="mr-1" size={12} />
                    {item.location} • {item.type}
                  </div>
                  <button 
                    onClick={() => setSelectedItem(item)}
                    className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
                  >
                    Ver detalles
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
            {/* Mostrar el componente de detalles cuando hay un item seleccionado */}
        {selectedItem && (
          <DetallesMarketplace 
            item={selectedItem} 
            onClose={() => setSelectedItem(null)} 
          />
        )}
        {/* Sección de descuentos */}
        <div className="mb-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Aprovecha estos descuentos</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {discounts.map((item, index) => (
              <div key={index} className="bg-white bg-opacity-20 p-4 rounded-lg backdrop-filter backdrop-blur-sm flex">
                <div className="w-1/3 mr-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover rounded"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/800x600?text=Imagen+no+disponible';
                    }}
                  />
                </div>
                <div className="w-2/3">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-sm mb-2">{item.program}</p>
                  <div className="flex items-center mb-2">
                    <span className="text-xl font-bold mr-2">{item.discount} OFF</span>
                    <span className="text-sm line-through mr-2">{item.originalPrice}</span>
                    <span className="text-lg font-bold">{item.finalPrice}</span>
                  </div>
                  <button className="mt-2 w-full bg-white text-blue-600 py-2 px-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Aprovechar oferta
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-4">¿Qué puedo estudiar aquí?</h2>
          <p className="mb-6">Conectamos estudiantes con las mejores instituciones educativas</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-semibold text-lg transition-colors">
            Descubrir opciones
          </button>
        </div>
      </div>
    </div>
  );
};

export default EducationMarketplace;