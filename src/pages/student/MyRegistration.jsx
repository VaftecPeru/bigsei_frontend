import { Button } from "@/components/ui/button"
import { useState } from "react"
import TuitionForm from "./TuitionForm"
import { ImageUp, ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function MyRegistration() {
    const defaultImage = "/img/default-avatar.jpg"
    const [step, setStep] = useState(1)
    const [imageUrl, setImageUrl] = useState(defaultImage)
    const navigate = useNavigate()

    const handleNext = () => {
        setStep((prevStep) => {
            const nextStep = Math.min(prevStep + 1, 5)
            if (nextStep === 5) {
                navigate("/student")
            }
            return nextStep
        })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImageUrl(reader.result)
            };
            reader.readAsDataURL(file)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 mt-4 flex flex-col items-center w-full pb-10">
            {/* Banner superior */}
            {step === 1 && (
                <div className="w-full bg-gradient-to-r from-blue-600 to-blue-800 py-8 shadow-md">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                            PERIODO 2024 - II
                        </h2>
                        <p className="text-lg sm:text-xl text-blue-100">
                            Usted ya registra matrícula
                        </p>
                    </div>
                </div>
            )}

            {/* Contenedor principal del formulario */}
            <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 mt-8">
                {/* Barra de progreso */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                        {[1, 2, 3, 4].map((stepNumber) => (
                            <div
                                key={stepNumber}
                                className={`flex flex-col items-center ${stepNumber < step ? 'text-green-600' : stepNumber === step ? 'text-blue-600 font-medium' : 'text-gray-400'}`}
                            >
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${stepNumber < step ? 'bg-green-100 border-2 border-green-500' : stepNumber === step ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-100 border-2 border-gray-300'}`}>
                                    {stepNumber}
                                </div>
                                <span className="text-xs mt-1 hidden sm:inline">
                                    Paso {stepNumber}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{
                                width: `${((step - 1) / 3) * 100}%`  // Ajuste clave aquí (step-1)/3 en lugar de step/4
                            }}
                        ></div>
                    </div>
                </div>

                {/* Formulario */}
                <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
                    <TuitionForm step={step} setStep={setStep} />
                </div>
            </div>

            {/* Botón de siguiente */}
            {step !== 3 && (
                <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 mt-8 flex justify-end">
                    <Button
                        onClick={handleNext}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-sm transition-colors duration-200 flex items-center"
                    >
                        {step === 4 ? 'Finalizar' : 'Siguiente'}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>
    )
}