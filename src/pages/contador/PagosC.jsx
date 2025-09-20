import React, { useState } from "react";
import {
  CreditCard,
  Calendar,
  User,
  Lock,
  FileText,
  Download,
  Search,
} from "lucide-react";
import visaLogo from "/img/payment/visa.png";
import mastercardLogo from "/img/payment/mastercard.png";
import yapeLogo from "/img/payment/yape.png";
import plinLogo from "/img/payment/plin.png";

function PagosC() {
  const [selectedMethod, setSelectedMethod] = useState("visa");
  const [activeTab, setActiveTab] = useState("pago");
  const [searchTerm, setSearchTerm] = useState("");

  const mockTransactions = [
    {
      id: 1,
      date: "2024-01-09",
      concept: "Matrícula",
      amount: "S/ 350.00",
      status: "Completado",
    },
    {
      id: 2,
      date: "2023-12-15",
      concept: "Mensualidad",
      amount: "S/ 250.00",
      status: "Completado",
    },
    {
      id: 3,
      date: "2023-11-15",
      concept: "Mensualidad",
      amount: "S/ 250.00",
      status: "Completado",
    },
  ];

  const paymentMethods = [
    { id: "visa", name: "VISA", logo: visaLogo },
    { id: "mastercard", name: "MC", logo: mastercardLogo },
    { id: "yape", name: "YAPE", logo: yapeLogo },
    { id: "plin", name: "PLIN", logo: plinLogo },
  ];

  const PaymentTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Payment Methods Section */}
      <div>
        <h2 className="text-lg font-semibold mb-6">MÉTODOS DE PAGO</h2>

        {/* Payment Method Options */}
        <div className="flex gap-4 mb-8">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`w-16 h-12 border rounded-lg flex items-center justify-center cursor-pointer ${
                selectedMethod === method.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}
              onClick={() => setSelectedMethod(method.id)}
            >
              <img
                src={method.logo}
                alt={method.name}
                className="w-12 h-8 object-contain"
              />
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-600 mb-4">
          Recuerda activar las compras por internet con tu banco
        </p>
        <p className="text-sm text-gray-600 mb-6">Indique su información</p>

        {/* Card Preview */}
        <div className="w-full h-48 bg-blue-600 rounded-xl mb-6 p-4 text-white">
          <div className="w-12 h-8 bg-white rounded mb-4"></div>
          <div className="text-lg tracking-wider mb-4">4000 1234 5678 9010</div>
          <div className="flex justify-between">
            <span>NOMBRE DEL TITULAR</span>
            <span>12/24</span>
          </div>
        </div>

        {/* Card Form */}
        <form className="space-y-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded text-blue-500" />
            <span className="text-sm text-gray-600">Recordar tarjeta</span>
          </label>
          <div className="relative">
            <CreditCard
              className="absolute left-3 top-3 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Número de tarjeta"
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <Calendar
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="MM/AA"
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="CVV"
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Nombres y apellidos"
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
          </div>
        </form>
      </div>

      {/* Payment Details Section */}
      <div>
        <h2 className="text-lg font-semibold mb-6">DETALLES DE PAGO</h2>
        <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between">
            <span>Matrícula</span>
            <span>S/ 00.00</span>
          </div>
          <div className="flex justify-between">
            <span>Mensualidad</span>
            <span>S/ 00.00</span>
          </div>
          <div className="flex justify-between">
            <span>IGV</span>
            <span>S/ 00.00</span>
          </div>
          <div className="flex justify-between border-t pt-4 font-semibold">
            <span>Total</span>
            <span>S/ 00.00</span>
          </div>
        </div>

        <button className="w-full bg-gray-800 text-white rounded-lg py-3 mt-6 hover:bg-gray-700">
          Siguiente
        </button>
      </div>
    </div>
  );

  const ReportTab = () => (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Receipt Section */}
      <div className="bg-white p-6 sm:p-8 max-w-7xl mx-auto border rounded-lg shadow-sm">
        <div className="border-b pb-4 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-2">UAION</h1>
          <p className="text-sm sm:text-base text-gray-600">
            Institución Educativa ...
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8 mb-6">
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-2">Datos</h3>
            <div className="space-y-1 text-sm sm:text-base">
              <div className="grid grid-cols-2">
                <span className="text-gray-600">Client</span>
                <span>UAION</span>
              </div>
              <div className="grid grid-cols-2">
                <span className="text-gray-600">Contact</span>
                <span>xxx@xxx.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-2">Desde</h3>
            <div className="space-y-1 text-sm sm:text-base">
              <div className="grid grid-cols-2">
                <span className="text-gray-600">Número de tarjeta</span>
                <span>123 456 789 00000</span>
              </div>
              <div className="grid grid-cols-2">
                <span className="text-gray-600">Propietario</span>
                <span>Nombre propietario</span>
              </div>
              <div className="grid grid-cols-2">
                <span className="text-gray-600">Número de operación</span>
                <span>FRXX XXXXXXXXX</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <table className="w-full text-sm sm:text-base">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Descripción</th>
                <th className="text-right py-2">Cantidad</th>
                <th className="text-right py-2">Monto</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2">
                  <div>Service ou livrable</div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    Description facultative
                  </div>
                </td>
                <td className="text-right py-2">1</td>
                <td className="text-right py-2">500.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="space-y-2 text-sm sm:text-base">
          <div className="flex justify-between">
            <span>Total HT</span>
            <span>412.28</span>
          </div>
          <div className="flex justify-between">
            <span>IGV</span>
            <span>187.72</span>
          </div>
          <div className="flex justify-between font-semibold border-t pt-2">
            <span>Total</span>
            <span>500.00</span>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <p className="text-xs sm:text-sm text-gray-500 italic">
            En votre aimable règlement à réception par virement bancaire.
            Majoration de 11% au delà d'un mois de retard.
          </p>
          <div className="border p-4 text-center h-32 sm:h-40 flex items-center justify-center">
            <p className="text-base sm:text-lg font-medium">SUNAT</p>
          </div>
          <button className="w-full bg-gray-800 text-white rounded-lg py-2 sm:py-3 text-sm sm:text-base hover:bg-gray-700">
            Pagar
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Tabs */}
      <div className="flex gap-8 border-b mb-8">
        <button
          className={`pb-2 px-4 ${
            activeTab === "pago"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("pago")}
        >
          Pago
        </button>
        <button
          className={`pb-2 px-4 ${
            activeTab === "reporte"
              ? "text-blue-500 border-b-2 border-blue-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("reporte")}
        >
          Reporte
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "pago" ? <PaymentTab /> : <ReportTab />}
    </div>
  );
}

export default PagosC;
