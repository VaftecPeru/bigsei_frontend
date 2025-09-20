import { MBAPromotion2 } from '@/components/compra/MBAPromotion2'
import { UniversityHeroBanner } from '@/components/ui/Banner/BannerUniversity';
import { FutureLearnForm } from '@/components/ux/ModalMaestria'
import React, { useState, useEffect } from 'react'
import { DollarSign } from "lucide-react";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import { EducationalFooter } from "@/components/ui/footer/EducationalFooter";
import { Api_Global_Web } from "../../services/WebApi";
import apiClient from "../../Utils/apiClient";

const CursosDetallePage = () => {
  const [isActive, setIsActive] = useState(false);
  const { idPeriodocurso } = useParams();
  const [curso, setCurso] = useState({});

  const handleCurso = (id_periodocurso) => {
    apiClient.get(Api_Global_Web.matriculas.mostrarCursoLibres(id_periodocurso))
      .then((response) => {
        setCurso(response.data);
      })
      .catch((error) => {
        setCurso({});
      });
  };

  useEffect(() => {
    if (idPeriodocurso) {
      handleCurso(idPeriodocurso);
    }
  }, [idPeriodocurso]);

  return (
    <div>
      <header>
        <Header />
      </header>
      <main className='w-full md:w-[90%] mx-auto'>
        <div className="flex flex-col md:flex-row relative">
          <MBAPromotion2 curso={curso} />

          <div className="w-full md:w-[34rem] min-h-screen   relative flex flex-col">

            <div className="bg-white shadow-lg rounded-lg p-6 sticky top-0 self-start">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {curso.curso_nombre}
                </h2>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                  </svg>
                  <span className="text-gray-700">Máster (Postgrado)</span>
                </div>

                <div className="flex items-center gap-3">
                  <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span className="text-gray-700">{curso.tiempo_de_duracion}</span>
                </div>

                {curso?.precios?.map((item) => (
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-6 h-6 text-gray-500" />
                    <span className="text-gray-700">Precio {item.tipo_descripcion} de <b>{item.importe}</b></span>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <p className="text-gray-600 text-sm">
                  Si quieres saber más, contesta a
                  unas preguntas y la Universidad de Roehampton
                  se pondrá en contacto contigo con más información.
                </p>
              </div>

              <Link to={`/compra-curso/${idPeriodocurso}`} className="w-full">
                <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-medium py-3 px-4 rounded-md transition">
                  Comprar
                </button>
              </Link>
            </div>

          </div>
        </div>

        <UniversityHeroBanner />
        {isActive && (
          <FutureLearnForm
            isActive={isActive}
            setIsActive={setIsActive}
          />
        )}

      </main>
      <EducationalFooter />
    </div>
  )
}

export default CursosDetallePage;