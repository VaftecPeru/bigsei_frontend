import React, { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import FileUploadWidget from "@/components/widgets/FileUploadWidget";
import StepTabs from "./RegistrationTabs"
/* import Schedule from "@/components/widgets/Schedule"; */
/* import CourseDetailsModal from "@/components/modals/CourseDetailsModal"; */
import PaymentMethods from "@/components/forms/PaymentMethods";
import PaymentDetails from "@/components/forms/PaymentDetails";
import CoursesTable from "@/components/forms/CoursesTable";
/* import StudyInfo from "@/components/forms/StudyInfo"; */

import { Download } from "lucide-react"
import { Button } from "@mui/material";

export default function TuitionForm({ step, setStep }) {
    const [date, setDate] = useState(null)
    const [tabValue, setTabValue] = React.useState(1)
    const [openModal, setOpenModal] = useState(false)
    const [selectedCourse, setSelectedCourse] = useState(null)
    const [selectedMethod, setSelectedMethod] = useState("visa")

    // Sincroniza el tabValue con el step, pero solo a partir de step 2 porque el step 1 no tiene tabs
    useEffect(() => {
        if (step > 1) {
            setTabValue(step - 2) // Comportamiento: "step 2 -> tab 0, step 3 -> tab 1, etc."
            // IMPORTANTE: Los tabs son 0-indexados
        }
    }, [step])

    const handleBack = () => {
        setStep((prevStep) => Math.max(prevStep - 1, 2))
    }

    const handleTabChange = (event, newValue) => {
        setStep(newValue + 2); // tab 0 -> step 2, tab 1 -> step 3, etc.
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

    const theCourses = [
        { title: "Especialidad", description: "Desarrollo de software" },
        { title: "Plan de estudios", description: "2018 - Plan de Estudios 2018" },
    ];


    return (
        <div className={` ${step === 1 ? "mt-20" : "mt-10"} w-full max-w-4xl`}>

            {step > 1 && (
                <div className="overflow-x-auto">
                    <StepTabs value={tabValue} onChange={handleTabChange} onBack={handleBack} />
                </div>
            )}

            {step === 2 && (
                <div>
                    <div className="px-4 py-8 grid grid-cols-1 gap-6">

                        <div className="px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-20">
                            {theCourses.map((course, index) => (
                                <div
                                    key={index}
                                    className="p-2 rounded-lg shadow-md bg-blue-100"
                                >
                                    <h3
                                        className="text-sm mb-2 font-semibold text-gray-700"
                                    >
                                        {course.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm">{course.description}</p>
                                </div>
                            ))}
                        </div>



                        <div className="p-4 border rounded-lg bg-gray-50 shadow-sm flex">
                            <div>
                                <h3 className="font-semibold text-gray-700 mb-2">
                                    Proceso de matrícula extemporánea
                                </h3>
                                <p className="text-sm text-gray-600 mb-4">
                                    A continuación subir la solicitud de matrícula extemporánea y el documento sustentario en caso desea cambiarse de sección o retirarse de algún curso.
                                </p>

                            </div>

                            <div>

                                <div className="flex items-center gap-4">
                                    <span className="text-gray-700 font-light text-lg">Estado:</span>
                                    <div className="flex gap-2 flex-col">
                                        <Button variant="contained" color="primary">
                                            Aprobado
                                        </Button>
                                        <Button variant="contained" color="warning">
                                            Pendiente
                                        </Button>
                                        <Button variant="contained" color="error">
                                            Rechazado
                                        </Button>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div>
                            <div>
                                <p className="text-sm text-gray-600">
                                    (*) Subir archivos en formato PDF.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 justify-around">
                            {/* <div className="border-2 border-dashed border-blue-400 rounded-lg p-4 text-center">
                                    <label htmlFor="upload-solicitud" className="cursor-pointer">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <div className="bg-blue-500 text-white p-3 rounded-full">
                                                <Upload/>
                                            </div>
                                            <span className="text-gray-700">Subir solicitud</span>
                                        </div>
                                        <input type="file" id="upload-solicitud" className="hidden" />
                                    </label>
                                    <div className="mt-2 text-sm text-gray-500 flex items-center justify-between">
                                        <span>Archivo no cargado</span>
                                        <span className="material-icons text-gray-400 cursor-pointer">delete</span>
                                    </div>
                                </div> */}
                            <FileUploadWidget />
                            <FileUploadWidget />
                        </div>

                        <a href="#" class="text-blue-500 text-sm underline">
                            Descargar formato de solicitud
                        </a>



                    </div>
                </div>
            )}



            {step === 3 && (
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

            {step === 4 && (
                <div className="w-full flex justify-center">
                    <div className="w-full flex flex-col border border-gray-300 max-w-2xl">
                        <div className="bg-blue-100 w-full items-center flex justify-center px-2 py-6">
                            <span className="text-base text-gray-700 font-bold text-center">PAGO REGISTRADO CON ÉXITO</span>
                        </div>
                        <div className="p-5 justify-center flex items-center flex-col gap-2">

                            <div className="flex w-full items-center justify-between max-w-sm">
                                <span className="font-semibold">Cursos matrículados</span>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                                    <Download />
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
                                    <Download />
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
