import { motion } from 'framer-motion';
import React, { useState } from 'react';

export const ModalSuscripcion = ({ setIsActive, isActive }) => {
  const [subscriptionType, setSubscriptionType] = useState('annual');
  const [country, setCountry] = useState('Reino Unido');

  // Function to close modal
  const closeModal = () => setIsActive(false);

  // Animation variants
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        duration: 0.4, 
        ease: "easeOut" 
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      transition: { 
        duration: 0.3 
      } 
    }
  };

  // Modal backdrop variants with stronger blur effect
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        duration: 0.3 
      } 
    },
    exit: { 
      opacity: 0, 
      transition: { 
        duration: 0.3 
      } 
    }
  };

  // Only render if isActive is true
  if (!isActive) return null;

  // Placeholder for LoginComponent
  const LoginComponent = () => (
    <div className="border rounded-md p-6 mb-4 bg-gray-50 shadow-sm">
      <h3 className="font-medium mb-2 text-gray-800">Iniciar sesión</h3>
      <p className="text-sm text-gray-600 mb-4">Para continuar con el proceso de pago</p>
      {/* Login fields would go here */}
    </div>
  );

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={backdropVariants}
    >
      {/* Backdrop with blur effect */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-md"
        onClick={closeModal}
      ></div>
      
      {/* Modal Content */}
      <motion.div
        className="relative w-full h-full md:w-11/12 md:max-w-4xl md:h-5/6 bg-white overflow-hidden z-10 rounded-lg shadow-xl"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={closeModal}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-20 bg-white bg-opacity-80 rounded-full p-2 shadow-sm transition duration-200 hover:bg-gray-100"
          aria-label="Cerrar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Scrollable content */}
        <div className="h-full overflow-y-auto">
          <div className="max-w-3xl mx-auto p-8 font-sans">
            {/* Subscription Header */}
            <div className="mb-10">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Suscríbete a Unlimited</h1>
              <p className="text-gray-700 text-lg">
                Accede a miles de cursos cortos en línea, aprende a tu propio ritmo
                y demuestra tu aprendizaje con certificados digitales.
              </p>
            </div>
            
            {/* Subscription Options */}
            <div className="flex flex-col md:flex-row gap-6 mb-8">
              {/* Annual Option */}
              <label 
                className={`group relative block flex-1 cursor-pointer transition-all duration-200 ${
                  subscriptionType === 'annual' 
                    ? 'bg-blue-50 border-2 border-blue-500 shadow-md' 
                    : 'border border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                } rounded-xl p-6`}
                htmlFor="annual"
              >
                {subscriptionType === 'annual' && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-100 text-yellow-800 font-medium text-xs px-3 py-1 rounded-full shadow-sm border border-yellow-200">
                    La mejor relación calidad-precio
                  </div>
                )}
                <div className="flex items-start space-x-4">
                  <div className="relative min-w-6 mt-1">
                    <input 
                      type="radio" 
                      id="annual" 
                      name="subscriptionType"
                      checked={subscriptionType === 'annual'} 
                      onChange={() => setSubscriptionType('annual')} 
                      className="absolute opacity-0 w-6 h-6 cursor-pointer"
                    />
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      subscriptionType === 'annual' 
                        ? 'border-blue-500' 
                        : 'border-gray-300 group-hover:border-blue-300'
                    }`}>
                      {subscriptionType === 'annual' && (
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 text-lg mb-1">Anual ilimitado</div>
                    <div className="text-2xl font-bold text-gray-900">$249,99/año</div>
                    <div className="text-sm text-blue-600 font-medium">($20,83/mes)</div>
                  </div>
                </div>
              </label>
              
              {/* Monthly Option */}
              <label 
                className={`group relative block flex-1 cursor-pointer transition-all duration-200 ${
                  subscriptionType === 'monthly' 
                    ? 'bg-blue-50 border-2 border-blue-500 shadow-md' 
                    : 'border border-gray-300 hover:border-blue-300 hover:bg-blue-50'
                } rounded-xl p-6`}
                htmlFor="monthly"
              >
                <div className="flex items-start space-x-4">
                  <div className="relative min-w-6 mt-1">
                    <input 
                      type="radio" 
                      id="monthly" 
                      name="subscriptionType"
                      checked={subscriptionType === 'monthly'} 
                      onChange={() => setSubscriptionType('monthly')} 
                      className="absolute opacity-0 w-6 h-6 cursor-pointer"
                    />
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      subscriptionType === 'monthly' 
                        ? 'border-blue-500' 
                        : 'border-gray-300 group-hover:border-blue-300'
                    }`}>
                      {subscriptionType === 'monthly' && (
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 text-lg mb-1">Mensual ilimitado</div>
                    <div className="text-2xl font-bold text-gray-900">$44,99/mes</div>
                  </div>
                </div>
              </label>
            </div>
            
            <p className="text-sm text-gray-600 mb-10">
              Se renueva automáticamente cada {subscriptionType === 'annual' ? 'año' : 'mes'}. Puedes cancelar en cualquier momento. 
              <a href="#" className="text-pink-600 ml-1 hover:underline">Términos y condiciones.</a>
            </p>
            
            {/* Order Summary */}
            <div className="mb-10 bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Detalles de la suscripción</h2>
              
              <div className="flex justify-between py-3 border-b border-gray-200">
                <span>Suscripción {subscriptionType === 'annual' ? 'anual' : 'mensual'} ilimitada</span>
                <span className="font-bold">${subscriptionType === 'annual' ? '249.99' : '44.99'}</span>
              </div>
              
              <div className="flex justify-between py-4 font-bold text-lg">
                <span>Total del pedido</span>
                <span>${subscriptionType === 'annual' ? '249.99' : '44.99'}</span>
              </div>
              
              <LoginComponent/>
              <p className="text-sm text-gray-600">El precio total incluye impuestos.</p>
              
              <button className="text-pink-600 text-sm mt-2 hover:text-pink-700 hover:underline flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                ¿Tienes un código de descuento?
              </button>
            </div>
            
            {/* Shipping Address */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Dirección de Envío</h2>
              
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  País/Región*
                </label>
                <select 
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                >
                  <option value="Reino Unido">Reino Unido</option>
                  <option value="Perú">Perú</option>
                  <option value="España">España</option>
                  <option value="México">México</option>
                </select>
              </div>
              
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Dirección Línea 1*
                </label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="(Dirección postal / apartado postal / nombre de la empresa / c/o)"
                />
              </div>
              
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Línea de dirección 2
                </label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                  placeholder="(Apartamento/suite/unidad/piso del edificio, etc.)"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ciudad/pueblo*
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" 
                  />
                </div>
                
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Condado/estado*
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" 
                  />
                </div>
              </div>
              
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Código postal*
                </label>
                <input 
                  type="text" 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200" 
                />
              </div>
            </div>
            
            {/* Payment Details */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                Sus datos de pago
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 ml-2 text-green-600">
                  <path fillRule="evenodd" d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v-1l1-1v-1H3a1 1 0 01-1-1V7a1 1 0 011-1h4V5l-1-1V3h1l1 1 1 1h2.586L12 4.414A2 2 0 0114 6v2h2a2 2 0 012 2z" clipRule="evenodd" />
                </svg>
              </h2>
            
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1">Iniciar sesión</h3>
                    <p className="text-sm text-gray-600">Para continuar con el proceso de pago</p>
                  </div>
                </div>
                {/* Login fields would go here */}
              </div>
              
              <div className="flex items-center justify-center text-sm text-gray-500 mb-6">
                <div className="border-t border-gray-300 flex-grow mr-4"></div>
                <div>O</div>
                <div className="border-t border-gray-300 flex-grow ml-4"></div>
              </div>
              
              <div className="flex items-center justify-center mb-6">
                <div className="bg-green-100 p-2 rounded-full mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  Todas las transacciones son seguras y encriptadas.
                </p>
              </div>
              
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Número en la tarjeta*
                </label>
                <div className="flex">
                  <input 
                    type="text" 
                    className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    placeholder="1234 1234 1234 1234"
                  />
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 rounded-r-lg text-sm transition duration-200">
                    Utilizar link
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    La tarjeta caduca*
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    placeholder="MM / AA"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVC*
                  </label>
                  <input 
                    type="text" 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    placeholder="CVC"
                  />
                  <p className="text-xs text-gray-500 mt-2">Se le cobrará en GBP.</p>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-700">
                  Al hacer clic en "Suscribirse ahora", acepta comenzar su suscripción ilimitada de inmediato. 
                  Puede solicitar un reembolso dentro de los 14 días posteriores al inicio de su suscripción, 
                  siempre que no haya obtenido un certificado durante este tiempo. Las suscripciones se renuevan 
                  automáticamente a menos que las cancele. Puede cancelar en cualquier momento, con efecto al 
                  final del período de pago.
                </p>
              </div>
              
              <p className="text-xs text-gray-600 mb-6">
                Al continuar, acepta nuestros 
                <a href="#" className="text-pink-600 mx-1 hover:underline">Términos comerciales</a>, 
                <a href="#" className="text-pink-600 mx-1 hover:underline">Política de reembolso</a> y 
                <a href="#" className="text-pink-600 mx-1 hover:underline">Política de privacidad</a>.
              </p>
              
              <button className="w-full bg-pink-600 hover:bg-pink-700 text-white py-4 px-6 rounded-lg font-medium text-lg shadow-md transition duration-200 transform hover:translate-y-px">
                Suscríbete ahora
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};