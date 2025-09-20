import { MBAPromotion } from '@/components/maestria/MBAPromotion'
import { UniversityHeroBanner } from '@/components/ui/Banner/BannerUniversity';
import { FutureLearnForm } from '@/components/ux/ModalMaestria'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const PageMaestria = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <main className='w-full md:w-[90%] mx-auto'>
      <div className="flex flex-col md:flex-row relative">
        <MBAPromotion />

        {/* Contenedor del Sidebar */}
        <div className="w-full md:w-[34rem] min-h-screen   relative flex flex-col">

          {/* Card con sticky hasta el final del contenedor */}
          <div className="bg-white shadow-lg rounded-lg p-6 sticky top-0 self-start">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Master of Business Administration (MBA)
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
                <span className="text-gray-700">2 años tiempo promedio</span>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-gray-600 text-sm">
                Si quieres saber más, contesta a
                unas preguntas y la Universidad de Roehampton
                se pondrá en contacto contigo con más información.
              </p>
            </div>

            <Link to="/logingoogle" className="w-full">
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
  )
}

export default PageMaestria