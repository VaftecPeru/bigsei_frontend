import { ContextCurso } from "@/components/miCurso/ContextCurso"
import { WelcomeSection } from "./WelcomeSection"
import { ConsentOptions } from "./ConsentOptions"
import { SaveButton } from "./SaveButton"
import { AccessInfoCard } from "./AccessInfoCard"
import { useState } from "react";
 
import { Modal } from "@mui/material"
import { ModalEstudiante } from "@/components/ux/ModalEstudiante"

 
const PageMiCurso = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <ContextCurso className={' mx-auto flex flex-col md:flex-row justify-between p-8 max-w-6xl  '}>
         <div className="w-full md:w-1/2 pr-8">
        <WelcomeSection />
        <ConsentOptions />
        <SaveButton
        isActive={isActive}
        setIsActive={setIsActive}
        />
      </div>
      
      {/* Right Column - Access Information */}
      <div className="w-full md:w-1/2">
        <AccessInfoCard />
      </div>
      {isActive &&(
        <ModalEstudiante
          isActive={isActive}
          setIsActive={setIsActive}
        />
      )}
    </ContextCurso>
  )
}

export default PageMiCurso