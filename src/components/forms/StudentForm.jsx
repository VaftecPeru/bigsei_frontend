import React, { useEffect, useState } from "react"
import FileUploadWidget from "../widgets/FileUploadWidget"
import StepTabs from "./StepTabs"
import Schedule from "../widgets/Schedule"
import CourseDetailsModal from "../modals/CourseDetailsModal"
import PaymentDetails from "./PaymentDetails"
import PaymentMethods from "./PaymentMethods"
import CoursesTable from "./CoursesTable"
import StudyInfo from "./StudyInfo"
import { Download } from "lucide-react"
import RegistrationForm from "./formstudent/RegistrationForm"
import PersonalRecord from "./formstudent/PersonalRecord"

export default function StudentForm({ step, setStep }) {
    const [date, setDate] = useState(null)
    const [tabValue, setTabValue] = React.useState(0)
    const [openModal, setOpenModal] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [selectedMethod, setSelectedMethod] = useState("visa")

    // Sincroniza el tabValue con el step, pero solo a partir de step 2 porque el step 1 no tiene tabs
    useEffect(() => {
        if (step > 1)
        {
            setTabValue(step - 2) // Comportamiento: "step 2 -> tab 0, step 3 -> tab 1, etc."
            // IMPORTANTE: Los tabs son 0-indexados
        }
    }, [step])

    const handleBack = () => {
        setStep((prevStep) => Math.max(prevStep - 1, 1))
    }

    const handleTabChange = (event, newValue) => {
        setStep(newValue + 2) // tab 0 -> step 2, tab 1 -> step 3, etc.
    }

    const handleViewDetails = (course) => {
        setSelectedCourse(course)
        setOpenModal(true)
    }

    const courseDetails = {
        sections: [
            {
                section: 1,
                photo: "/img/teacher1.jpeg",
                teacher: "Docente prueba 1",
                type: "Teórico",
                schedule: "Lunes 8:00 - 10:00",
                dateRange: "21/10/2024 - 20/12/2024",
                vacancies: 20,
                available: 10,
            },
            {
                section: 1,
                photo: "/img/teacher1.jpeg",
                teacher: "Docente prueba 1",
                type: "Práctica",
                schedule: "Lunes 8:00 - 10:00",
                dateRange: "21/10/2024 - 20/12/2024",
                vacancies: 20,
                available: 10,
            },
            {
                section: 2,
                photo: "/img/teacher2.jpg",
                teacher: "Docente prueba 2",
                type: "Teórico",
                schedule: "Lunes 14:00 - 16:00",
                dateRange: "21/10/2024 - 20/12/2024",
                vacancies: 20,
                available: 15,
            },
            {
                section: 2,
                photo: "/img/teacher2.jpg",
                teacher: "Docente prueba 2",
                type: "Práctica",
                schedule: "Lunes 16:00 - 18:00",
                dateRange: "21/10/2024 - 20/12/2024",
                vacancies: 20,
                available: 15,
            },
        ],
    }

    const methods = [
        { id: "visa", name: "Visa", img: "/img/payment/visa.png" },
        { id: "mastercard", name: "MasterCard", img: "/img/payment/mastercard.png" },
        { id: "yape", name: "Yape", img: "/img/payment/yape.png" },
        { id: "plin", name: "Plin", img: "/img/payment/plin.png" },
        { id: "culqi", name: "Culqi", img: "/img/payment/culqi.png" },
        { id: "paypal", name: "PayPal", img: "/img/payment/paypal.png" },
    ]

    const paymentMethodConfig = {
        visa: {
            formType: "card",
            message: "Recuerda activar las compras por internet con tu banco.",
            image: "/img/payment/visa_card.jpg",
        },
        mastercard: {
            formType: "card",
            message: "Recuerda activar las compras por internet con tu banco.",
            image: "/img/payment/mastercard_card.png",
        },
        yape: {
            formType: "yape",
            message: "Encuentralo en el menú de Yape.",
            image: "/img/payment/yape_qr.png",
        },
    }
    
    const courses = Array(8).fill(null).map((_, index) => ({
        cycle: 4,
        code: "ASDFG-I",
        subject: "ALGORÍTMICA I",
        credits: 3,
        retries: 0,
        section: index + 1,
        teacher: `Docente ${index + 1}`,
        schedule: `Lunes 8:00 - 10:00`,
    }))  
    
    useEffect(()=>{
        console.log("esto es el step")
        console.log(step)
      
    },[step])

    return (
        <div className={` ${step === 1 ? "mt-20" : "mt-10"} w-full max-w-4xl bg-white p-6 rounded-lg shadow-md `}>

            {step > 1 && (
                <div className="overflow-x-auto">
                    <StepTabs value={tabValue} onChange={handleTabChange} onBack={handleBack} /> 
                </div>
            )}




            {step === 1 && (
                <div>
                
                    <div className="w-full">

                        <PersonalRecord/>
                        <RegistrationForm/> 
                
                    </div>
                
                </div>
            )}

            {step === 2 && (
                <form className="grid grid-cols-1 gap-6">
                    <FileUploadWidget label="DNI *" id="dni-upload" />
                    <FileUploadWidget label="Partida de nacimiento *" id="birth-upload" />
                    <FileUploadWidget label="Certificado de estudios *" id="certificate-upload" />
                </form>
            )}

            {step === 3 && (
                <>
                    <StudyInfo />
                    <CoursesTable courses={courses} handleViewDetails={handleViewDetails} />
                    {/* Horario */}
                    <Schedule/>

                    {/* Modal */}
                    {selectedCourse && (
                        <CourseDetailsModal
                            open={openModal}
                            onClose={() => setOpenModal(false)}
                            courseDetails={courseDetails}
                        />
                    )}
                </>
            )}

            {step === 4 && (
                <div className="flex flex-col md:flex-row w-full">
                    <PaymentMethods 
                        methods={methods}
                        selectedMethod={selectedMethod}
                        setSelectedMethod={setSelectedMethod}
                        paymentMethodConfig={paymentMethodConfig}
                    />
                    <PaymentDetails setStep={setStep} />                    
                </div>
            )}

            {step === 5 && (
                <div className="w-full flex justify-center">
                    <div className="w-full flex flex-col border border-gray-300 max-w-lg">
                        <div className="bg-blue-100 w-full items-center flex justify-center px-2 py-6">
                            <span className="text-base text-gray-700 font-bold text-center">PAGO REGISTRADO CON ÉXITO</span>
                        </div>
                        <div className="p-5 justify-center flex items-center flex-col gap-2">

                            <div className="flex w-full items-center justify-between max-w-sm">
                                <span className="font-semibold">Cursos matrículados</span>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                                    <Download/>
                                    Descargar
                                </button>
                            </div>

                            <CoursesTable 
                                courses={courses} 
                                handleViewDetails={handleViewDetails} 
                                step={step} 
                            />

                            <div className="flex w-full items-center justify-between max-w-sm mt-8">
                                <span className="font-semibold">Reporte de pago</span>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                                    <Download/>
                                    Descargar
                                </button>
                            </div>

                            <PaymentDetails setStep={setStep} step={step} />                    

                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}
