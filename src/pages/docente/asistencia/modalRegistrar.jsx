import React from 'react'


const ErrorNotification = ({ message }) => {
    return (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg p-4 mb-3
   
        ">
            <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
            </div>

            <div className="flex-1">
                <div className="font-bold text-red-900">Error</div>
                <div className="flex-1 text-sm text-red-700">
                    {message || 'Error al registrar la asistencia'}
                </div>
            </div>


        </div>
    )
}

const SuccessNotification = ({ message }) => {
    return (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-lg p-4 mb-3">
            <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
            </div>

            <div className="flex-1">
                <div className="font-bold text-green-900">¡Asistencia registrada!r</div>
                <div className="flex-1 text-sm text-green-700">
                    {message || 'Su participación para el 25/10/2024 a las 7:37 am  ha sido confirmada. Si tiene algún inconveniente o nota un error en el registro, por favor contacte al administrador.'}
                </div>
            </div>
        </div>
    )
}

const WarningNotification = ({ message }) => {
    return (
        <div className="flex items-center gap-3 bg-yellow-50 border border-yellow-200 rounded-full p-4 mb-3
      ">
            <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
            </div>

            <div className="flex-1">
                <div className="font-bold text-orange-900">¡Asistencia registrada!</div>
                <div className="flex-1 text-sm text-yellow-700">
                {message || 'Su participación para el 25/10/2024 a las 8:19 am  ha sido confirmada. Ha registrado su asistencia fuera del tiempo de tolerancia. Su asistencia se ha marcado como Tardanza'}
            </div>
            </div>
       
        </div>
    )
}



function ScannerModal({ onScan, clickInside }) {
    //on Scan iba en el button como onClick={onScan}

    const clickModal = (event) => {
        const isOut = event.target.getAttribute("data-isOut")
        if (isOut) {
            //cerramos modal
            clickInside(false)
        }
    }

    return (
        <>

            <div className="w-full h-full
          fixed top-0 lef-0 right-0 bottom-0
          z-20 grid items-center"
                onClick={clickModal}
                style={{ backdropFilter: "blur(6px)", background: "#04040466" }}
                data-isOut="true"
            >
                <div className=" rounded-lg shadow-lg p-6 grid items-center
       bg-white border border-gray-400 m-6 md:h-[90%]
       md:m-[0] md:m-auto"
                >
                    <div>
                        <div className="bg-blue-600 rounded-lg p-6 mb-4">
                            <div className="aspect-square w-full bg-white rounded-lg flex items-center justify-center">

                                <div className="grid grid-cols-12 gap-1 w-3/4 h-16">
                                    {[...Array(12)].map((_, index) => (
                                        <div
                                            key={index}
                                            className="bg-blue-900 w-full h-full"
                                            style={{ height: `${Math.random() * 100}%` }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="text-center">
                            <h2 className="text-lg font-semibold text-gray-900 mb-1">
                                Escanear código de barras
                            </h2>
                            <p className="text-sm text-gray-600 mb-4">
                                Coloca tu DNI cerca a la cámara y enfoca correctamente
                            </p>
                            <button

                                className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-blue-700 transition-colors"
                            >
                                Escanear
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <div className="
                     w-full  z-20    fixed p-4 bottom-2 
      md:bottom-0 md:right-4  md:w-[45%]
            ">
                <ErrorNotification message={"Algo ha ocurrido en el servidor lo sentimos"}></ErrorNotification>
                <SuccessNotification></SuccessNotification>
                <WarningNotification></WarningNotification>
            </div>


        </>

    )
}

export default ScannerModal

