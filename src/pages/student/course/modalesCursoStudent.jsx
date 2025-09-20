import { useEffect, useState } from "react";

export const ModalPresentacion = ({ clickClose }) => {
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
  };

  const clickTareaContent = (e) => {
    if (e.currentTarget.getAttribute("data-tarea") == "true") {
      clickClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      data-tarea
      onClick={clickTareaContent}
    >
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-[3px]"
        aria-hidden="true"
      />

      {/* Modal Contenido */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg h-[500px] mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="red"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h2 className="text-lg font-medium text-blue-900">NOMBRE DE LA PRESENTACIÓN (PPT)</h2>
          </div>
        </div>

        {/* area de subida */}
        <div className="p-2">
          <p className="text-xs text-end text-blue font-light pt-4">Lunes 10/10/2024 8:30 am</p>
          <div
            className="border border-gray-400 rounded-lg p-4"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex items-center">
              <div className="bg-gray-200 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="purple" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file">
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                </svg>
              </div>
              <div className="ml-2 flex-1">
                <p className="text-sm font-medium">Tech design requirements.pdf</p>
                <p className="text-xs text-gray-500">200 KB</p>
              </div>
              <div className="bg-blue-200 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <div
              className="border border-gray-400 rounded-lg p-4 h-48"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div>
                <div className="ml-2 flex-1">
                  <p className="text-sm font-medium">Comentarios</p>
                </div>
                <div className="flex space-x-2 pt-4">
                  <img className="w-8 h-8" src="/img/perfil_imagen.png"></img>
                  <div className="bg-gray-200 rounded-xl px-4 py-2">
                    <p>That sounds great! I'm in, What time works for you</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 w-72 mx-auto flex items-center border border-gray-300 rounded-xl shadow-lg p-2 overflow-hidden">
            <input
              type="text"
              placeholder="Escribir un comentario"
              className="flex-1 outline-none border-none w-full"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-paperclip ml-2 flex-shrink-0"
            >
              <path d="M13.234 20.252 21 12.3" />
              <path d="m16 6-8.414 8.586a2 2 0 0 0 0 2.828 2 2 0 0 0 2.828 0l8.414-8.586a4 4 0 0 0 0-5.656 4 4 0 0 0-5.656 0l-8.415 8.585a6 6 0 1 0 8.486 8.486" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModalTarea = ({ clickClose }) => {
  const clickContentTarea = (e) => {
    if (e.currentTarget.getAttribute("data-tareaContent") == "true") {
      clickClose();
    }
  };

  return (
    <div
      className="fixed inset-0 h-full z-50 w-full backdrop-blur-[3px] bg-black/10 grid place-items-center"
      data-tareaContent
      onClick={clickContentTarea}
    >
      <div
        className="rounded-md bg-white border border-gray-200 flex flex-col max-w-3xl h-[62%] xs:w-full md:w-[90%] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header del modal */}
        <div className="flex relative items-center justify-between w-full p-4">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="red"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-clipboard-pen-line"
            >
              <rect width="8" height="4" x="8" y="2" rx="1" />
              <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.5" />
              <path d="M16 4h2a2 2 0 0 1 1.73 1" />
              <path d="M8 18h1" />
              <path d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
            </svg>
            <div className="ml-2">
              <h2 className="text-lg font-bold text-blue-900">TAREA</h2>
              <p className="text-xs text-black text-center">SEMANA 1</p>
            </div>
          </div>

          {/* Botón de cerrar */}
          <button
            onClick={clickClose}
            className="text-blue-900 hover:text-blue-800"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="sr-only">Cerrar</span>
          </button>
        </div>
        <hr className="w-full" />

        {/* Contenido principal del modal */}
        <div className="flex">
          <div
            className="border border-gray-400 rounded-lg p-4"
          >
            <div className="flex items-center">
              <div className="bg-gray-200 rounded-full p-2 pl-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="purple" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file">
                  <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                  <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                </svg>
              </div>
              <div className="ml-2 flex-1">
                <p className="text-sm font-medium">Tech design requirements.pdf</p>
                <p className="text-xs text-gray-500">200 KB</p>
              </div>
              <div className="bg-blue-200 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <button>Entregar</button>
            <p>Fecha límite de entrega: 12/10/2024 23:00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModalConnectToClass = ({ clickClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-[3px]"
        onClick={clickClose}
      />

      <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-xl font-medium text-gray-900">
          Unirse a una clase
        </h2>

        {/* seccion de Usuarios */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 overflow-hidden rounded-full">
              <img
                src="https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Deepak_Headshot.width-500.format-webp.webp"
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <div className="font-medium">Jean Marcos</div>
              <div className="text-sm text-gray-500">jeanMarcos@gmail.com</div>
            </div>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700">
            Cambiar de cuenta
          </button>
        </div>

        {/* codigo de clase*/}
        <div className="mb-6">
          <label className="mb-1 block text-base font-medium text-gray-900">
            Código de la clase
          </label>
          <p className="mb-4 text-sm text-gray-600">
            Pídele a tu profesor el código de la clase y, luego, ingrésalo aquí.
          </p>
          <input
            type="text"
            placeholder="Código de la clase"
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <div className="mb-8">
          <h3 className="mb-2 text-sm font-medium text-gray-900">
            Para acceder con un código de la clase
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Usa una cuenta autorizada.</li>
            <li>
              • Usa un código de la clase que tenga entre 5 y 7 letras o
              números, sin espacios ni símbolos.
            </li>
          </ul>
          <p className="mt-4 text-sm text-gray-600">
            Si tienes problemas para unirte a la clase, consulta este{" "}
            <a href="#" className="text-blue-600 hover:text-blue-700">
              artículo del Centro de ayuda
            </a>
            .
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={clickClose}
            className="rounded-md px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
            Unirse
          </button>
        </div>
      </div>
    </div>
  );
};


export const ModalCuestionario = ({ clickClose }) => {
  // Estado para controlar si se muestra el formulario
  const [showForm, setShowForm] = useState(false);

  // Datos del cuestionario
  const cuestionario = {
    nombre: "CAPÍTALES",
    fecha: "Lunes 17/10/2024",
    semana: "SEMANA 1",
    puntos: "100 puntos",
  };

  return (
    <>
      <div
        className="fixed inset-0 h-full z-50 w-full backdrop-blur-[3px] bg-black/10 grid place-items-center"
        onClick={clickClose}
      >
        <div
          className="rounded-md bg-white border border-gray-200 flex flex-col max-w-md h-[50%] xs:w-full md:w-[90%] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header del modal */}
          <div className="flex relative items-center justify-between w-full p-6">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="red"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-file-text"
              >
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
                <path d="M10 9h4" />
                <path d="M10 13h4" />
                <path d="M10 17h4" />
              </svg>
              <div>
                <h2 className="text-lg font-bold text-blue-900 ml-2">CUESTIONARIO</h2>
                <p className="text-xs text-black text-center">{cuestionario.semana}</p>
              </div>
            </div>

            {/* Botón de cerrar */}
            <button
              onClick={clickClose}
              className="text-blue-900 hover:text-blue-800"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <span className="sr-only">Cerrar</span>
            </button>
          </div>

          {/* Contenido del modal */}
          <div className="flex-1 px-6 py-4">
            <div className="flex gap-2 items-center">
              <span className="block w-24 text-end font-medium">Nombre:</span>
              <p className="flex-1 text-black">{cuestionario.nombre}</p>
            </div>
            <div className="flex gap-2 items-center mt-4">
              <span className="block w-24 text-end font-medium">Fecha:</span>
              <p className="flex-1 text-black">{cuestionario.fecha}</p>
            </div>
            <div className="flex gap-2 items-center mt-4">
              <span className="block w-24 text-end font-medium">Puntos:</span>
              <p className="flex-1 text-black">{cuestionario.puntos}</p>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex justify-end gap-4 p-6 border-t border-gray-200">
            <button
              onClick={clickClose}
              className="text-blue-900 font-bold rounded-xl border-2 border-blue-900 hover:bg-blue-900 hover:text-white px-6 py-2 text-sm"
            >
              CERRAR
            </button>
            <button
              onClick={() => setShowForm(true)} // Abre el formulario
              className="bg-blue-900 text-white font-bold rounded-xl border-2 border-blue-900 hover:bg-blue-800 px-6 py-2 text-sm"
            >
              IR AL CUESTIONARIO
            </button>
          </div>
        </div>
      </div>

      {/* Mostrar el formulario si showForm es true */}
      {showForm && <CuestionarioForm clickClose={() => setShowForm(false)} />}
    </>
  );
};

export const CuestionarioForm = ({ clickClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const preguntas = [
    { id: "pregunta1", 
      texto: "¿Cuál es la capital de Japón?", 
      opciones: ["Pekín", "Seúl", "Tokio", "Bangkok"], 
      puntos: 5 },
    { id: "pregunta2", 
      texto: "¿Cuál es la capital de Argentina?", 
      opciones: ["Buenos Aires", "Santiago", "Lima", "Bogotá"], 
      puntos: 5 },
    { id: "pregunta3", 
      texto: "¿Cuál es la capital de Canadá?", 
      opciones: ["Montreal", "Toronto", "Ottawa", "Vancouver"], 
      puntos: 5 },
    { id: "pregunta4", 
      texto: "¿Cuál es la capital de Perú?", 
      opciones: ["Managua", "Santiago", "Lima", "Bogotá"], 
      puntos: 5 },
    { id: "pregunta5", 
      texto: "¿Cuál es la capital de Bolivia?", 
      opciones: ["La Paz", "Sucre", "Lima", "Bogotá"], 
      puntos: 5 },
  ];

  const initialRespuestas = preguntas.reduce((acc, pregunta) => {
    acc[pregunta.id] = "";
    return acc;
  }, {});

  const [respuestas, setRespuestas] = useState(initialRespuestas);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleRespuestaChange = (preguntaId, valor) => {
    setRespuestas((prev) => ({
      ...prev,
      [preguntaId]: valor,
    }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const todasRespondidas = preguntas.every((pregunta) => respuestas[pregunta.id] !== "");
    if (!todasRespondidas) {
      setError("Por favor, responde todas las preguntas antes de enviar.");
      return;
    }

    setIsSubmitted(true);

    setTimeout(() => {
      clickClose();
    }, 2000);
  };

  return (
    <div 
    className="fixed inset-0 z-50 backdrop-blur-[3px] bg-black/10 flex items-center justify-center" 
    onClick={clickClose}
    >
      <div 
      className="flex flex-col w-full h-full" 
      onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[#617D9E] border border-gray-200 rounded-lg flex flex-col h-full">
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {isSubmitted ? (
              // Mensaje de éxito al enviar el formulario
              <div className="flex flex-col items-center justify-center h-full">
                <svg 
                className="w-24 h-24 text-green-500 mb-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                >
                  <path strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                  />
                </svg>
                <p className="text-2xl font-medium text-green-600">
                  ¡Respuesta enviada con éxito!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>

                {/*header */}
                <div className="max-w-2xl mx-auto w-full mt-6 rounded-lg overflow-hidden shadow-lg mb-4">
                  <div className="h-3 bg-[#00264A]"></div>
                  <div className="p-4 bg-white">
                    <h2 className="text-4xl font-normal text-black mb-2">
                      CAPITALES
                    </h2>
                    <p className="text-sm text-gray-600">
                      Escoge la respuesta correcta
                    </p>
                    <div className="border-b border-gray-300 my-2"></div>
                    <p className="text.sm text-gray-600">
                      adrian@example.com{" "}
                      <span className="text-blue-600 cursor-pointer">
                        cambiar cuenta
                      </span>
                    </p>
                    <div className="flex items-center gap-1 mt2">
                      <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      >
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 15a4 4 0 004 4h9a5 5 0 10-.-9.999 5.002 5.002 5.002 0 00-9.9 0A4 4 0 003 15z"
                        />
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <p className="text-sm text-gray-600">No compartido</p>
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {error && 
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  {error}
                </div>}

                {preguntas.map((pregunta) => (
                  <div key={pregunta.id} className="mb-4 bg-white border border-gray-200 rounded-lg px-6 py-6 max-w-2xl mx-auto">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg text-gray-900 font-normal">
                        {pregunta.texto}
                      </h3>
                      <span className="text-lg text-gray-500 font-normal">
                        {pregunta.puntos} puntos
                      </span>
                    </div>

                    <div className="space-y-3">
                      {pregunta.opciones.map((opcion, index) => (
                        <label 
                        key={opcion} 
                        className="flex items-center">
                          <input
                            type="radio"
                            id={`${pregunta.id}-${index}`}
                            name={pregunta.id}
                            value={opcion}
                            checked={respuestas[pregunta.id] === opcion}
                            onChange={() => 
                              handleRespuestaChange(pregunta.id, opcion)}
                            className="mr-2 h-4 w-4 text-gray-600 focus:ring-gray-500"
                          />
                          <span className="text-lg text-gray-800">
                            {opcion}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="flex justify-center gap-4 py-4 max-w-2xl mx-auto">
                  <button
                   type="button" 
                   onClick={clickClose} 
                   className="text-blue-900 font-bold rounded-lg border-2 border-blue-900 hover:bg-blue-900 hover:text-white px-6 py-3 text-base">
                    CERRAR
                  </button>
                  <button 
                  type="submit" 
                  className="bg-blue-900 text-white font-bold rounded-lg border-2 border-blue-900 hover:bg-blue-800 px-6 py-3 text-base">
                    ENVIAR
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModalVerGrabacion = ({ clickClose }) => {
  // Datos de prueba para la grabación
  const grabacion = {
    nombre: "Reunión de planificación",
    descripcion: "Discusión de los objetivos del proyecto y asignación de tareas.",
    fecha: "15 de Octubre, 2023",
    url: "https://www.youtube.com/watch?v=6E2hYDIFDIU",
    tiempo: "01:35",
    semana: "SEMANA 1",
  };

  return (
    <div
      className="fixed inset-0 h-full z-50 w-full backdrop-blur-[3px] bg-black/10 grid place-items-center"
      onClick={clickClose}
    >
      <div
        className="rounded-md bg-white border border-gray-200 flex flex-col max-w-md h-[70%] xs:w-full md:w-[90%] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header del modal */}
        <div className="flex relative items-center justify-between w-full p-6">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="red"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-file-video"
            >
              <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
              <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              <path d="m10 11 5 3-5 3v-6Z" />
            </svg>
            <div>
              <h2 className="text-lg font-bold text-blue-900 ml-2">VER GRABACIÓN</h2>
              <p className="text-xs text-black text-center">{grabacion.semana}</p>
            </div>
          </div>

          {/* Botón de cerrar */}
          <button
            onClick={clickClose}
            className="text-blue-900 hover:text-blue-800"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="sr-only">Cerrar</span>
          </button>
        </div>

        {/* Contenido del modal con scroll */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* Reproductor de video */}
          <div className="w-full aspect-video bg-black rounded-lg overflow-hidden">
            <video
              controls
              className="w-full h-full object-cover"
              src={grabacion.url}
            >
              Tu navegador no soporta la reproducción de video.
            </video>
          </div>

          {/* Información de la grabación */}
          <div className="mt-4 flex flex-col gap-4">
            {/* Nombre */}
            <div className="flex gap-2 items-center">
              <span className="block w-24 text-end font-medium">Nombre:</span>
              <p className="flex-1 text-black">{grabacion.nombre}</p>
            </div>

            {/* Descripción */}
            <div className="flex gap-2">
              <span className="block w-24 text-end font-medium">Descripción:</span>
              <p className="flex-1 text-black">{grabacion.descripcion}</p>
            </div>

            {/* Fecha */}
            <div className="flex gap-2 items-center">
              <span className="block w-24 text-end font-medium">Fecha:</span>
              <p className="flex-1 text-black">{grabacion.fecha}</p>
            </div>

            <div className="flex gap-2 items-center">
              <span className="block w-24 text-end font-medium">Tiempo:</span>
              <p className="flex-1 text-black">{grabacion.tiempo}</p>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end gap-4 p-6 border-t border-gray-200">
          <button
            onClick={clickClose}
            className="text-blue-900 font-bold rounded-xl border-2 border-blue-900 hover:bg-blue-900 hover:text-white px-6 py-2 text-sm"
          >
            CERRAR
          </button>
          <button
            onClick={() => {
              // Lógica para descargar la grabación
              const link = document.createElement("a");
              link.href = grabacion.url;
              link.download = grabacion.nombre;
              link.click();
            }}
            className="bg-blue-900 text-white font-bold rounded-xl border-2 border-blue-900 hover:bg-blue-800 px-6 py-2 text-sm"
          >
            DESCARGAR
          </button>
        </div>
      </div>
    </div>
  );
};