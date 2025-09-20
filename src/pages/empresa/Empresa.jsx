import Header from '@/components/layout/Header'
import React from 'react'
import InicioEmpresa from './InicioEmpresa'
import BannerContacto from './BannerContacto'
import FormContacto from './FormContacto'
import ClientesMuestra from './ClientesMuesta'
import PrecioEmpresa from './PrecioEmpresa'
import EscasezHabilidades from './EscasezHabilidades'
import AcademiasHabilidades from './AcademiasHabilidades'
import SistemasGestion from './SistemasGestion'
import { EducationalFooter } from "@/components/ui/footer/EducationalFooter";

function Empresa() {
  return (
    <div>
        <header>
            <Header />
            <InicioEmpresa/>
        </header>
        <main>
            <BannerContacto/>
            <FormContacto/>
          <ClientesMuestra />
          <PrecioEmpresa />
        <EscasezHabilidades/>
            <AcademiasHabilidades/>
            <SistemasGestion/>
        </main>
        <footer>
          <EducationalFooter />
        </footer>
    </div>
  )
}

export default Empresa