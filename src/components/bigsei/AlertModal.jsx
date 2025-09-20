import React from 'react';

const AlertModal = ({ isOpen, onClose, actionType, onConfirm, messages }) => {
  if (!isOpen) return null;

  const defaultMessages = {
    save: '¿Estás seguro de que deseas guardar los cambios?',
    login: '¿Deseas iniciar sesión?',
    logout: '¿Estás seguro de que deseas cerrar tu sesión?',
    download: '¿Confirmas la descarga del material?',
    connectToClass: '¿Deseas iniciar la clase ahora a través de Zoom?',
    createClass: '¿Confirmas la creación de esta nueva Actividad?',
    uploadRecording: '¿Deseas subir la grabación de la clase ahora?',
    createAssignment: '¿Confirmas la creación de esta nueva actividad?',
    createQuiz: '¿Confirmas la creación de este nuevo cuestionario?',
  };

  const finalMessages = { ...defaultMessages, ...messages };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 max-w-sm shadow-lg">
        <h3 className="text-lg font-semibold mb-4 text-center text-blue-600">
          Confirmación
        </h3>
        <p className="text-gray-600 mb-6 text-center">
          {finalMessages[actionType] || '¿Estás seguro de realizar esta acción?'}
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            Sí
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;