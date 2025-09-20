import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export const EducationalFooter = () => {
  return (
    <footer className="w-full bg-white py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Column 1: Temas */}
          <div>
            <h3 className="text-pink-600 font-bold text-lg mb-4 text-center">Temas</h3>
            <p className="text-gray-600 text-sm mb-6 text-center">Cursos agrupados por materia</p>
            
            <div className="space-y-4">
              <h4 className="text-gray-700 font-medium text-sm">Descubra nuestra gama de cursos</h4>
              
              <ul className="space-y-3 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-pink-600">Cursos en línea</a></li>
                <li><a href="#" className="hover:text-pink-600">Certificaciones en línea</a></li>
                <li><a href="#" className="hover:text-pink-600">Microcredenciales</a></li>
                <li><a href="#" className="hover:text-pink-600">Campamentos de entrenamiento en</a></li>
              </ul>
            </div>
          </div>
          
          {/* Column 2: Cursos cortos */}
          <div>
            <h3 className="text-pink-600 font-bold text-lg mb-4 text-center">Cursos cortos</h3>
            <p className="text-gray-600 text-sm mb-6 text-center">Aprenda nuevas habilidades con un curso en línea flexible</p>
            
            <div className="space-y-4">
              <h4 className="text-gray-700 font-medium text-sm">Materias del curso</h4>
              
              <ul className="space-y-3 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-pink-600">Negocios y gestión</a></li>
                <li><a href="#" className="hover:text-pink-600">Atención sanitaria y medicina</a></li>
                <li><a href="#" className="hover:text-pink-600">Enseñanza</a></li>
                <li><a href="#" className="hover:text-pink-600">Psicología y Salud Mental</a></li>
              </ul>
            </div>
          </div>
          
          {/* Column 3: Pistas expertas */}
          <div>
            <h3 className="text-pink-600 font-bold text-lg mb-4 text-center">Pistas expertas</h3>
            <p className="text-gray-600 text-sm mb-6 text-center">Mejora tus habilidades con una serie de cursos especializados</p>
            
            <div className="space-y-4">
              <h4 className="text-gray-700 font-medium text-sm">Aprende una nueva habilidad</h4>
              
              <ul className="space-y-3 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-pink-600">Marketing digital</a></li>
                <li><a href="#" className="hover:text-pink-600">Análisis de datos</a></li>
                <li><a href="#" className="hover:text-pink-600">Inteligencia artificial (IA)</a></li>
                <li><a href="#" className="hover:text-pink-600">Ciencia de datos</a></li>
              </ul>
            </div>
          </div>
          
          {/* Column 4: Microcredenciales */}
          <div>
            <h3 className="text-pink-600 font-bold text-lg mb-4 text-center">Microcredenciales</h3>
            <p className="text-gray-600 text-sm mb-6 text-center">Obtener acreditación profesional o académica</p>
            
            <div className="space-y-4">
              <h4 className="text-gray-700 font-medium text-sm">Explora nuestras titulaciones en línea</h4>
              
              <ul className="space-y-3 text-gray-600 text-sm">
                <li><a href="#" className="hover:text-pink-600">Títulos de MBA</a></li>
                <li><a href="#" className="hover:text-pink-600">Licenciaturas en Psicología</a></li>
                <li><a href="#" className="hover:text-pink-600">Grados de Docencia</a></li>
                <li><a href="#" className="hover:text-pink-600">Grados en</a></li>
              </ul>
            </div>
          </div>
          
          {/* Column 5: Grados en línea */}
          <div className="md:col-span-3 lg:col-span-1">
            <h3 className="text-pink-600 font-bold text-lg mb-4 text-center ">Grados en línea</h3>
            <p className="text-gray-600 text-sm mb-6 text-center">Estudia en línea de manera flexible mientras avanzas hacia tu título</p>
            
            <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
              <div className="space-y-4">
                <h4 className="text-gray-700 font-medium text-sm">Obtenga una maestría en línea</h4>
                
                <ul className="space-y-3 text-gray-600 text-sm">
                  <li><a href="#" className="hover:text-pink-600">Másteres en Psicología</a></li>
                  <li><a href="#" className="hover:text-pink-600">Másteres en Informática</a></li>
                  <li><a href="#" className="hover:text-pink-600">Másteres en Ciencia de Datos</a></li>
                  <li><a href="#" className="hover:text-pink-600">Másteres en Marketing Digital</a></li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h4 className="text-gray-700 font-medium text-sm">Obtenga una licenciatura en línea</h4>
                
                <ul className="space-y-3 text-gray-600 text-sm">
                  <li><a href="#" className="hover:text-pink-600">Licenciaturas en Salud</a></li>
                  <li><a href="#" className="hover:text-pink-600">Licenciatura en Criminología</a></li>
                  <li><a href="#" className="hover:text-pink-600">Licenciatura en Psicología</a></li>
                  <li><a href="#" className="hover:text-pink-600">Licenciatura en</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Línea superior */}
        <div className="h-0.5 w-full bg-gradient-to-r from-purple-500 to-pink-500 mt-10 mb-6 rounded-full" />
        <div className="flex justify-between items-center mb-0">
          
          {/* Iconos */}
          <div className="flex gap-4">
            {[
              { icon: <FaFacebook />, color: "bg-blue-600" },
              { icon: <FaTwitter />, color: "bg-blue-400" },
              { icon: <FaInstagram />, color: "bg-pink-500" },
              { icon: <FaLinkedin />, color: "bg-blue-800" },
            ].map((item, index) => (
              <div
                key={index}
                className={`w-10 h-10 flex justify-center items-center rounded-full text-white text-lg cursor-pointer transition-transform transform hover:scale-110 shadow-lg ${item.color}`}
              >
                {item.icon}
              </div>
            ))}
          </div>

          {/* Logo */}
          <img
            src="/img/full_bigsei_fontblue.png"
            alt="BIGSEI Logo"
            className="h-[60px] w-[110px]"
          />
        </div>
      </div>
    </footer>
  );
};

 