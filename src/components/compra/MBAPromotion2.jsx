import React from "react";
import { SkillsSection } from "../ui/Banner/SkillsSection";
import { AccordionGroup } from "../ux/Accordition/AccordionGroup";
import { Api_Global_Setup } from "../../services/SetupApi";
import { rutaApi } from "../../Utils/Utils";

export const MBAPromotion2 = ({ curso }) => {

  return (
    <div className="w-[90%] mx-auto px-4 py-8 flex flex-col   gap-8">
      <div className="flex-1">
        <div className="mb-6">
          <p className="text-pink-600 text-sm">
            {curso?.tipotituloacademico_nombre} / {curso?.tituloacademico_nombre} / {curso?.carrera_nombre}
          </p>
        </div>

        <div className="mb-6">
          {curso.empresa_id_archivo ? (
            <div
              className="w-full h-full bg-cover bg-center"
            >
              <img
                src={`${rutaApi(Api_Global_Setup.archivos.visualizarImagen(curso.empresa_id_archivo))}`}
                alt={curso?.empresa_razon_social}
                className="h-12"
                loading="lazy"
              />
            </div>
          ) : (
            <img
              src="/api/placeholder/120/60"
              alt={curso?.empresa_razon_social}
              className="h-12"
            />
          )}
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {curso?.curso_nombre}
          </h1>
          <p className="text-lg text-gray-600">
            {curso?.detalle}
          </p>
        </div>

        <div className="w-full h-64 bg-gray-200 rounded-lg overflow-hidden">
          {curso.curso_id_archivo ? (
            <div
              className="w-full h-full bg-cover bg-center"
            >
              <img
                src={`${rutaApi(Api_Global_Setup.archivos.visualizarImagen(curso.curso_id_archivo))}`}
                alt="Profile"
                className="w-full h-full bg-cover bg-center"
                loading="lazy"
              />
            </div>
          ) : (
            <div
              className="w-full h-full bg-cover bg-center text-center pt-16 text-gray-500"
            >
              Cargando imagen...
            </div>
          )}
        </div>
        <div className="mt-4 flex flex-col md:flex-row justify-between items-start md:items-center py-4  w-[90%] mx-auto">
          <div className="flex flex-col mb-3 md:mb-0">
            <span className="text-gray-500 text-sm mb-1">Nivel</span>
            <span className="text-gray-800 font-medium">{curso?.tipotituloacademico_nombre}</span>
          </div>

          <div className="hidden md:block w-px h-12 bg-gray-300"></div>

          <div className="flex flex-col mb-3 md:mb-0">
            <span className="text-gray-500 text-sm mb-1">Duración</span>
            <span className="text-gray-800 font-medium">{curso?.tiempo_de_duracion}</span>
          </div>

          <div className="hidden md:block w-px h-12 bg-gray-300"></div>

          <div className="flex flex-col">
            <span className="text-gray-500 text-sm mb-1">Docente</span>
            <span className="text-gray-800 font-medium">{curso?.docente_nombre}</span>
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

    </div>
  );
};