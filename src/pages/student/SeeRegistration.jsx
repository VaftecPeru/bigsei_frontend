import React, { useState } from "react";
import RegistrationTabs from "./RegistrationTabs";
import { Button } from '@mui/material';
import FileUploadWidget from "@/components/widgets/FileUploadWidget";
import { Download, Upload } from "lucide-react";
import PaymentMethods from "@/components/forms/PaymentMethods";
import PaymentDetails from "@/components/forms/PaymentDetails";
import CoursesTable from "@/components/forms/CoursesTable";

function SeeRegistration() {
    const [currentSection, setCurrentSection] = useState(0);
    const courses = [
        { title: "Especialidad", description: "Desarrollo de software" },
        { title: "Plan de estudios", description: "2018 - Plan de Estudios 2018" },
    ];
    const handleNextSection = () => {
        setCurrentSection((prev) => (prev < 2 ? prev + 1 : prev));
    };

    const handleBackSection = () => {
        setCurrentSection((prev) => (prev > 0 ? prev - 1 : prev));
    };

    /* pagos */
    const [selectedMethod, setSelectedMethod] = useState("visa")
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

    const coursesReporte = Array(8).fill(null).map((_, index) => ({
        cycle: 4,
        code: "ASDFG-I",
        subject: "ALGORÍTMICA I",
        credits: 3,
        retries: 0,
        section: index + 1,
        teacher: `Docente ${index + 1}`,
        schedule: `Lunes 8:00 - 10:00`,
    }))  
    
    const handleViewDetails = (course) => {
        setSelectedCourse(course)
        setOpenModal(true)
    }

    return (
        <div className="flex flex-col justify-start items-center min-h-screen text-2xl w-full bg-sky-50 p-6">
            <RegistrationTabs
                value={currentSection}
                onChange={(e, newValue) => setCurrentSection(newValue)}
                onBack={currentSection > 0 ? handleBackSection : null}
            />

            <div className="max-w-7xl w-full shadow-md rounded-lg bg-white mt-6 p-6">
                {currentSection === 0 && (
                    <div>
                        <div className="px-4 py-8 grid grid-cols-1 gap-6">
                            
                            <div className="px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-20">
                                {courses.map((course, index) => (
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
                                
                                <FileUploadWidget/>
                                <FileUploadWidget/>
                            </div>

                            <a href="#" class="text-blue-500 text-sm underline">
                                Descargar formato de solicitud
                            </a>


                                
                        </div>
                    </div>
                )}

                {currentSection === 1 && (
                <div className="flex flex-col md:flex-row w-full">
                    <PaymentMethods
                        methods={methods}
                        selectedMethod={selectedMethod}
                        setSelectedMethod={setSelectedMethod}
                        paymentMethodConfig={paymentMethodConfig}
                    />
                    <PaymentDetails setStep={currentSection} />                    
                </div>
                )}

                {currentSection === 2 && (
                    <div className="w-full flex justify-center">
                    <div className="w-full flex flex-col border border-gray-300 max-w-2xl">
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
                                courses={coursesReporte} 
                                handleViewDetails={handleViewDetails} 
                                step={currentSection} 
                            />

                            <div className="flex w-full items-center justify-between max-w-sm mt-8">
                                <span className="font-semibold">Reporte de pago</span>
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                                    <Download/>
                                    Descargar
                                </button>
                            </div>

                            <PaymentDetails setStep={currentSection} step={currentSection} />

                                              

                        </div>
                    </div>
                </div>
                )}
            </div>

            
            <div className="flex justify-end p-4">
                <Button
                    onClick={handleNextSection}
                    variant="contained" color="primary"
                >
                    {currentSection < 2 ? "Enviar" : "Finalizar"}
                </Button>
            </div>
        </div>
    );
}

export default SeeRegistration;
