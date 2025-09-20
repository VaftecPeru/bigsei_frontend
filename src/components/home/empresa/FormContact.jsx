import { ContactForm } from "./FormInput"

 
export const FormContact = () => {
  return (
    <div className="bg-white p-4 rounded w-[84%] mx-auto">
         <h3 className="text-center text-3xl font-bold">Ponte en Contacto Hoy</h3>
         <div className="w-[8%] mx-auto mt-2 bg-rose-500 border border-rose-500 border-t-4"></div>
         
              <ContactForm/>
         
    </div>
  )
}
