import React from "react";
import { Link } from "react-router-dom";

function TramiteStudentAd() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/docs/fut.docx"; // Ruta del archivo
    link.download = "fut.docx"; // Nombre del archivo descargado
    link.click();
  };
  return (
    <div>
      <div className="max-w-4xl mx-auto p-6 bg-white">
        {/* Botones en la parte superior izquierda */}
        <div className="flex gap-4 mb-6">
          <button className="px-4 py-2 bg-blue-900 text-white rounded">Inicio</button>
          <button className="px-4 py-2 bg-blue-900 text-white rounded">Registrar</button>
          <Link to="/student/tramite/seguimiento">
            <button className="px-4 py-2 bg-blue-900 text-white rounded">Seguimiento</button>
          </Link>
        </div>

        {/* Título y subtítulo */}
        <div className="text-center mb-6">
          <h2 className="text-lg font-medium">REGISTRO DE TRÁMITE</h2>
          <p className="text-sm text-gray-600">ALUMNO</p>
        </div>

        <form className="space-y-6">
          {/* Datos Personales */}
          <div>
            <h3 className="text-sm mb-3">Datos Personales:</h3>
            <div className="space-y-2">
              <input type="text" placeholder="Nombres" className="w-full p-2 bg-gray-100 border border-gray-200" />
              <input type="text" placeholder="Apellidos" className="w-full p-2 bg-gray-100 border border-gray-200" />
              <div className="grid grid-cols-3 gap-2">
                <input type="text" placeholder="DNI" className="p-2 bg-gray-100 border border-gray-200" />
                <input type="email" placeholder="E-mail" className="p-2 bg-gray-100 border border-gray-200" />
                <input type="text" placeholder="Teléfono" className="p-2 bg-gray-100 border border-gray-200" />
              </div>
              <select className="w-full p-2 bg-gray-100 border border-gray-200">
                <option value="">Seleccione Carrera</option>
                <option>Nutrición y Dietética</option>
              </select>
            </div>
          </div>

          {/* Trámite(s) y Documento(s) */}
          <div>
            <h3 className="text-sm mb-3">Trámite(s) y Documento(s):</h3>
            <select className="w-full p-2 bg-gray-100 border border-gray-200 mb-2">
              <option>Cambio de especialidad</option>
              <option>Cambio de Horario y/o curso</option>
              <option>Certificado estudios</option>
              <option>Constancia de estudios</option>
              <option>Constancia de egresado</option>
              <option>Constancia de horas academicas y/o notas</option>
              <option>Constancia de Matricula</option>
              <option>Constancia de Tercio Superior</option>
              <option>Constancia de Titulo en Tramite</option>
              <option>Constancia de vacante</option>
            </select>
            <select className="w-full p-2 bg-gray-100 border border-gray-200">
              <option>2023 - 2o. Año Trámite N° 357 - Lima</option>
            </select>
          </div>

          {/* Tabla de Requisitos */}
          <div className="border border-gray-300">
            <table className="w-full">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="p-2 text-left">N°</th>
                  <th className="p-2 text-left">REQUISITOS</th>
                  <th className="p-2 text-left">ADJUNTAR ARCHIVO</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2">1</td>
                  <td className="p-2">
                    <p>Documento de Identidad - DNI</p>
                    <p className="text-xs text-gray-500">(* Subir en una vista en orden claro)</p>
                  </td>
                  <td className="p-2">
                    <p>Seleccione archivo o file para adjuntar</p>
                    <p className="text-xs text-gray-500">(* Archivo debe cumplir lo siguiente características):</p>
                    <ul className="text-xs text-gray-500 list-disc pl-4">
                      <li>Tamaño del archivo máximo</li>
                      <li>Formato permitido: PDF o JPG</li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Botón "Descargar Solicitud de Atención" */}
          <div className="flex justify-end">
            <button
              className="px-4 py-2 bg-blue-900 text-white rounded"
              onClick={handleDownload}
            >
              Descargar Solicitud de Atención
            </button>
          </div>

          {/* Área de Detalles */}
          <div>
            <h3 className="text-sm mb-2">Detalle:</h3>
            <textarea
              className="w-full p-2 border border-gray-300 h-24"
              placeholder="Ingrese como máximo 1000 caracteres"
            ></textarea>
          </div>

          {/* Botones de Acción */}
          <div className="flex justify-end gap-2">
            <button className="px-4 py-2 bg-yellow-500 text-white rounded">Nuevo</button>
            <button className="px-4 py-2 bg-green-500 text-white rounded">Continuar</button>
            <button className="px-4 py-2 bg-red-500 text-white rounded">Salir</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TramiteStudentAd;