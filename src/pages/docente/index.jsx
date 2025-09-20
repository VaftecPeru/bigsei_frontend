import { useState } from "react"; // Asegúrate de importar useState
import InfoData from "./infoData.jsx";
import AlertModal from "@/components/bigsei/AlertModal.jsx"; 

function CardWelcome() {
  return (
    <>
      <div className="w-full max-w-7xl p-4">
        <div className="flex justify-end items-center text-sm text-gray-500">
          <span>
            <a href="#" className="hover:underline">
              Iaion &gt Menú &gt Cursos
            </a>
          </span>
        </div>
      </div>
      <div
        className="
        h-auto
        w-full rounded-2xl text-white 
        md:items-center
        p-[1px]  /* Grosor del borde */
        bg-gradient-to-tl from-blue-200 via-blue-200 to-blue-400
      "
      >
        <div
          className="bg-gradient-to-tr from-blue-500 via-blue-300 to-blue-500 rounded-2xl w-full
          flex flex-col
          md:flex-row
        "
        >
          {/* leftcard */}
          <div className="p-10 pl-8 pb-6 md:p-14">
            <h1 className="font-bold text-xl md:text-4xl">
              Bienvenido, Adrian Lizarbe
            </h1>
            <div>
              Tienes 27 nuevos estudiantes agregados a tu dominio. Comuníquese con
              el director si desea que se excluyan de su dominio.
            </div>
          </div>

          {/* right card */}
          <div className="self-center p-6 md:self-end md:-6 md:h-full md:w-[400px]">
            <img
              className="w-full h-full"
              src="/img/imgTeacher.png"
              alt="Teacher"
            />
          </div>
        </div>
      </div>
    </>
  );
}

function CardDatabase({ openAlertModal }) {
  const fechaEspecifica = new Date(2025, 2, 12);

  const fechaFormateada = fechaEspecifica.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className="
        flex flex-col
        mt-10
        h-auto
        bg-white
        w-full rounded-2xl 
        md:flex-row
        text-black
      "
      style={{ boxShadow: "#e5e5e58c 0px 0px 10px 1px" }}
    >
      {/* Contenedor principal (izquierda) */}
      <div className="flex-1 p-8 pl-8 pb-6 md:p-6">
        {/* Primera línea: Título y fecha */}
        <div className="flex justify-between items-center w-full">
          <h1 className="font-bold text-xl md:text-4xl">
            AHORA: BASE DE DATOS II
          </h1>
          <h3 className="font-bold ml-auto">{fechaFormateada}</h3>
        </div>

        {/* Texto descriptivo */}
        <div className="flex flex-col md:flex-row items-center md:items-start mt-4">
          {/* Texto y Botón */}
          <div className="md:flex-1">
            <div className="text-gray-600 font-bold text-lg">
              Tienes programado la clase de Base de Datos II,
              <br />
              inicia ahora la sesión
              <br />
              ¡Únite via Zoom!
            </div>

            {/* Botón de Conectarse */}
            <div
              className="
                bg-black font-bold text-white rounded-lg py-4 pl-3 mt-6 max-w-[200px] m-auto md:ml-0 flex justify-evenly
                transform scale-100 cursor-pointer
                hover:scale-110 transition-all duration-300
              "
              onClick={() => openAlertModal("connectToClass")} // Mostrar AlertModal
            >
              <span className="text-lg">Conectarse</span>
              <img
                src="/img/flecha.png"
                className="transform translate-x-0 hover:translate-x-2 transition-all ease duration-250"
                alt="Flecha"
              />
            </div>
          </div>

          {/* Imagen */}
          <div className="md:flex-shrink-0 p-6">
            <img className="rounded-lg transform scale-60" src="/img/zoom_image.png" alt="Zoom" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Docente_content() {
  // Estados para controlar el AlertModal
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [alertActionType, setAlertActionType] = useState("");

  // Función para abrir el AlertModal
  const openAlertModal = (actionType) => {
    setAlertActionType(actionType);
    setAlertOpen(true);
  };

  // Función para manejar la confirmación del AlertModal
  const handleAlertConfirm = () => {
    if (alertActionType === "connectToClass") {
      // Aquí puedes agregar la lógica para conectarte a Zoom
      console.log("Conectando a Zoom...");
      // Por ejemplo, podrías redirigir a una URL de Zoom:
      // window.location.href = "https://zoom.us/j/meeting-id";
    }
    setAlertOpen(false);
  };

  // Función para cerrar el AlertModal sin acción
  const handleAlertClose = () => {
    setAlertOpen(false);
  };

  return (
    <div className="p-4 max-w-[1500px] m-auto">
      <CardWelcome />
      <CardDatabase openAlertModal={openAlertModal} />
      <InfoData />
      
      {/* Integrar el AlertModal */}
      <AlertModal
        isOpen={isAlertOpen}
        onClose={handleAlertClose}
        actionType={alertActionType}
        onConfirm={handleAlertConfirm}
      />
    </div>
  );
}

export default function Docente() {
  return (
    <div className="" style={{ background: "#f0f7ff" }}>
      <Docente_content />
    </div>
  );
}