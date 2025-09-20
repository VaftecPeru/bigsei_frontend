import React, { useState } from "react"
import { Dialog } from "../ui/dialog"
import ConfirmPayment from "../modals/ConfirmPayment"

const PaymentDetails = ({ setStep, step }) => {
    const [dialogOpen, setDialogOpen] = useState(false)

    //Al pulsar el botón pagar
    const handlePayment = () => {
        setDialogOpen(false) //Cerrar el modal
        setStep((prevStep) => Math.min(prevStep + 1, 4)) //Avanzar al siguiente paso 5. Reporte de pago
    }

    return (
        <div className={`${step === 4 ? "w-full sm:max-w-xs bg-gray-300 rounded-lg" : "md:w-2/6 bg-gray-50"} p-6 `}>
            {step !== 4 ? (
                <h5 className="text-lg font-semibold mb-4">DETALLES DE PAGO</h5>
            ) : (
                <img src="/img/6.png" className="mb-3" width={150} />
            )}
            <div className="text-sm text-gray-600 space-y-2">

                <div className="">
                    <div className="flex justify-between">
                        <p>Matrícula</p>
                        <p>S/ 00.00</p>
                    </div>
                    <div className="flex justify-between">
                        <p>Mensualidad</p>
                        <p>S/ 00.00</p>
                    </div>
                    <div className="flex justify-between">
                        <p>IGV</p>
                        <p>S/ 00.00</p>
                    </div>
                </div>

                <div className="">
                    <hr className="my-4" />
                    <div className="flex justify-between font-semibold">
                        <p>Total</p>
                        <p>S/ 00.00</p>
                    </div>
                </div>

            </div>
            {step !== 4 && (
                <button
                    onClick={() => setDialogOpen(true)} //Abrir el modal
                    className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                    Pagar
                </button>
            )}

            {/* Componente para mostrar el modal */}
            <ConfirmPayment 
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                handlePayment={handlePayment}
            />
        </div>
    )
}
export default PaymentDetails
