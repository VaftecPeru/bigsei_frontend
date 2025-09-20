import React, { useState } from "react"
import CardPaymentForm from "./CardPaymentForm"
import SecureInput from "./custom/SecureInput"
import { Asterisk, Smartphone } from "lucide-react"

const PaymentMethods = ({ methods, selectedMethod, setSelectedMethod, paymentMethodConfig }) => {
    const [formData, setFormData] = useState({
        cardNumber: "",
        expiryDate: "",
        cardHolder: "",
        cvv: "",
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    return (
        <div className="md:w-4/6 md:border-r border-gray-300 p-6">
            <h5 className="text-lg font-semibold mb-4">MÉTODOS DE PAGO</h5>
            <div className="flex gap-4 mb-6">
                {methods.map((method) => (
                    <label
                        key={method.id}
                        className={`cursor-pointer flex flex-col items-center gap-2 text-center p-4 rounded-lg border-2 ${
                            selectedMethod === method.id
                                ? "border-blue-500 bg-blue-50 shadow-md"
                                : "border-gray-300"
                        }`}
                        style={{ width: "100px", height: "100px" }}
                    >
                        <input
                            type="radio"
                            name="payment-method"
                            value={method.id}
                            checked={selectedMethod === method.id}
                            onChange={() => setSelectedMethod(method.id)}
                            className="hidden"
                        />
                        <img src={method.img} alt={method.name} className="max-w-full max-h-12" />
                        {selectedMethod === method.id && (
                            <span className="block w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></span>
                        )}
                    </label>
                ))}
            </div>

            {/* Estructura dinámica según el método de pago */}
            {paymentMethodConfig[selectedMethod]?.formType === "card" && (
                <>
                    {/* Imagen de tarjeta centrada */}
                    {paymentMethodConfig[selectedMethod]?.image && (
                        <div className="flex justify-center items-center w-full mb-4">
                            <img
                                src={paymentMethodConfig[selectedMethod]?.image}
                                alt={`${selectedMethod} card`}
                                className="w-52"
                            />
                        </div>
                    )}
                    {/* Formulario de tarjeta */}
                    <CardPaymentForm formData={formData} onChange={handleInputChange} />
                </>
            )}

            {/* Formulario de yape */}
            {paymentMethodConfig[selectedMethod]?.formType === "yape" && (
                <div className="flex items-center justify-between w-full gap-8">
                    <div className="flex flex-col gap-3 w-1/2">
                        <SecureInput
                            icon={Smartphone}
                            type="text"
                            name="phone"
                            placeholder="Número de celular"
                            value={formData.phone || ""}
                            onChange={handleInputChange}
                            required
                            pattern="^\d{9}$"
                            errorMessage="El número debe tener 9 dígitos."
                        />
                        <SecureInput
                            icon={Asterisk}
                            type="text"
                            name="approvalCode"
                            placeholder="Código de aprobación"
                            value={formData.approvalCode || ""}
                            onChange={handleInputChange}
                            required
                            pattern="^\d{6}$"
                            errorMessage="El código debe tener 6 dígitos."
                        />
                        {/* <input
                            type="text"
                            placeholder="Número de celular"
                            className="border border-gray-300 p-2 rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="Código de aprobación"
                            className="border border-gray-300 p-2 rounded-lg"
                        /> */}
                    </div>
                    <div className="relative">
                        <img
                            src={paymentMethodConfig[selectedMethod]?.image}
                            alt="Yape QR"
                            className="w-32 rounded-lg shadow-md"
                        />
                        <span className="absolute top-0 left-0 bg-green-500 text-white px-2 py-1 rounded-tl-lg text-xs">
                            Paga aquí con Yape
                        </span>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PaymentMethods
