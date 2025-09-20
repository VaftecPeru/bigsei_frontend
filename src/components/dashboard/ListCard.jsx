import React, { useState, useEffect } from 'react';
import { Api_Global_Dashboard } from '../../services/DashboardApi';
import apiClient from '../../Utils/apiClient';

const ListCard = ({ title }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(Api_Global_Dashboard.admin.listaIngresos(""));

        // Verificación profunda de la respuesta
        if (!response?.data?.data) {
          throw new Error('Formato de respuesta inválido');
        }

        // Procesamiento seguro de datos
        const methodsData = response.data.data
          .filter(item => item && (item.metodopago_descripcion || item.metodo_pago))
          .map(item => {
            const methodName = String(item.metodopago_descripcion || item.metodo_pago || 'Otro').trim();
            const amount = Number(item.total) || 0;

            return {
              name: methodName,
              value: amount,
              icon: getPaymentIcon(methodName),
              displayName: formatDisplayName(methodName),
              displayValue: `S/${amount.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
              })}`
            };
          });

        setPaymentMethods(methodsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching payment methods:', err);
        setError(err.message || 'Error al cargar los métodos de pago');
        setLoading(false);
      }
    };

    fetchPaymentMethods();
  }, []);

  // Función segura para obtener iconos
  const getPaymentIcon = (methodName) => {
    const method = String(methodName || '').toLowerCase();
    const iconMap = {
      yape: '/img/payment/yape.png',
      plin: '/img/payment/plin.png',
      bcp: '/img/payment/bcp.svg',
      bbva: '/img/payment/bbva.svg',
      efectivo: '/img/payment/efectivo.png',
      contado: '/img/payment/efectivo.png'
    };

    const iconPath = iconMap[method] || '/img/payment/efectivo.png';

    return (
      <img
        src={iconPath}
        alt={methodName}
        className="h-6 w-6 object-contain"
        onError={(e) => {
          e.target.src = '/img/payment/efectivo.png';
        }}
      />
    );
  };

  // Función segura para formatear nombres
  const formatDisplayName = (methodName) => {
    const method = String(methodName || '').toLowerCase();
    const nameMap = {
      yape: 'Yape',
      plin: 'Plin',
      bcp: 'BCP',
      bbva: 'BBVA',
      efectivo: 'Contado',
      contado: 'Contado'
    };

    return nameMap[method] || methodName;
  };

  if (loading) {
    return (
      <div className="flex flex-col p-4 bg-white rounded-xl shadow-md border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">{title}</h2>
        <div className="space-y-2">
          {[...Array(5)].map((_, index) => (
            <div key={`skeleton-${index}`} className="h-10 bg-gray-200 rounded-md animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col p-4 bg-white rounded-xl shadow-md border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">{title}</h2>
        <div className="text-red-500 p-2 bg-red-50 rounded-md">
          {error}
        </div>
      </div>
    );
  }

  if (!paymentMethods.length) {
    return (
      <div className="flex flex-col p-4 bg-white rounded-xl shadow-md border border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">{title}</h2>
        <div className="text-gray-500 p-2 bg-gray-50 rounded-md">
          No se encontraron métodos de pago
        </div>
      </div>
    );
  }

  return (
    <div className="w-[500px] flex flex-col p-4 bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-3">{title}</h2>
      <div className="space-y-2">
        {paymentMethods.map((method, index) => (
          <div
            key={`${method.name}-${index}`}
            className="flex items-center justify-between p-2 bg-gray-50 rounded-md hover:bg-indigo-50 transition-colors duration-150"
          >
            <div className="flex items-center space-x-2">
              <div className="p-1 bg-white rounded-md shadow-xs">
                {method.icon}
              </div>
              <span className="text-gray-700 font-medium text-sm">
                {method.displayName}
              </span>
            </div>
            <span className="text-gray-900 font-semibold text-sm">
              {method.displayValue}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListCard;