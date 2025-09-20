import React, { useState } from 'react';
import { SkillsSection } from '../ui/Banner/SkillsSection';
import { AccordionGroup } from '../ux/Accordition/AccordionGroup';

export const MBAPromotion = ({ curso }) => {

  return (
    <div className="w-[90%] mx-auto px-4 py-8 flex flex-col   gap-8">
      {/* Sección principal izquierda */}
      <div className="flex-1">
        {/* Navegación */}
        <div className="mb-6">
          <p className="text-pink-600 text-sm">
            Licenciatura en línea / Máster / Empresa y Gestión
          </p>
        </div>

        {/* Logo universidad */}
        <div className="mb-6">
          <img
            src="/api/placeholder/120/60"
            // alt="University of Roehampton London" 
            alt={curso?.empresa_razon_social}
            className="h-12"
          />
        </div>

        {/* Título y descripción */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {/* Master of Business<br />
            Administration (MBA) */}
            {curso?.curso_nombre}
          </h1>
          <p className="text-lg text-gray-600">
            {curso?.detalle}
          </p>
        </div>

        {/* Imagen principal */}
        <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVzaW5lc3MlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww")' }}
          ></div>
        </div>
        <div className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-center py-4  w-[90%] mx-auto">
          <div className="flex flex-col mb-3 md:mb-0">
            <span className="text-gray-500 text-sm mb-1">Nivel</span>
            <span className="text-gray-800 font-medium">Master's</span>
          </div>

          <div className="hidden md:block w-px h-12 bg-gray-300"></div>

          <div className="flex flex-col mb-3 md:mb-0">
            <span className="text-gray-500 text-sm mb-1">Duración</span>
            <span className="text-gray-800 font-medium">{curso?.tiempo_de_duracion}</span>
          </div>

          <div className="hidden md:block w-px h-12 bg-gray-300"></div>

          <div className="flex flex-col">
            <span className="text-gray-500 text-sm mb-1">Idioma</span>
            <span className="text-gray-800 font-medium"></span>
          </div>
        </div>
      </div>
      <div>
        <p className='text-2xl font-bold'>Haga crecer su carrera como un jefe con un título en negocios en línea</p>
        <p className='mb-4'>Con su amplio alcance y su abanico de oportunidades profesionales bien remuneradas, un MBA es uno de los títulos de posgrado más codiciados del mercado, tanto para profesionales como para empresas. Y ahora, con el programa de MBA totalmente en línea de la Universidad de Roehampton, obtener este prestigioso título es más accesible que nunca.</p>

        <p className=''>Con su amplio alcance y su abanico de oportunidades profesionales bien remuneradas, un MBA es uno de los títulos de posgrado más codiciados del mercado, tanto para profesionales como para empresas. Y ahora, con el programa de MBA totalmente en línea de la Universidad de Roehampton, obtener este prestigioso título es más accesible que nunca.</p>
        <ul>
          <li className='text-xl'><span className='font-bold'>Consultor de gestión :</span> Asesorar a las organizaciones sobre cómo mejorar la eficiencia, la eficacia y la rentabilidad.</li>

          <li className='text-xl'><span className='font-bold'>Consultor de gestión :</span> Asesorar a las organizaciones sobre cómo mejorar la eficiencia, la eficacia y la rentabilidad.</li>
        </ul>
      </div>
      <SkillsSection />
      <AccordionGroup />

      {/* Tarjeta de información lateral */}

    </div>
  );
};

