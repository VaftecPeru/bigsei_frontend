import React from "react";
import { Link } from "react-router-dom";

function TramiteStudent() {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/docs/fut.docx"; // Ruta del archivo
    link.download = "fut.docx"; // Nombre del archivo descargado
    link.click();
  };
  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-white py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-2xl shadow-lg border border-gray-100">

        {/* Botones superiores */}
        <div className="flex flex-wrap gap-4 mb-10">
          <button className="px-6 py-2 bg-gradient-to-r from-blue-800 to-blue-600 text-white rounded-xl shadow transition hover:scale-105">Inicio</button>
          <button className="px-6 py-2 bg-gradient-to-r from-blue-800 to-blue-600 text-white rounded-xl shadow transition hover:scale-105">Registrar</button>
          <Link to="/student/tramite/seguimiento">
            <button className="px-6 py-2 bg-gradient-to-r from-blue-800 to-blue-600 text-white rounded-xl shadow transition hover:scale-105">Seguimiento</button>
          </Link>
        </div>

        {/* Encabezado */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-blue-900">📄 Registro de Trámite</h2>
          <p className="text-sm text-gray-500 uppercase tracking-wider">Alumno</p>
        </div>

        <form className="space-y-12">

          {/* Datos Personales */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2">👤 Datos Personales</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Nombres"
                className="w-full p-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
              <input
                type="text"
                placeholder="Apellidos"
                className="w-full p-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="DNI"
                  className="w-full p-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  className="w-full p-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                />
                <input
                  type="text"
                  placeholder="Teléfono"
                  className="w-full p-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                />
              </div>
              <select
                className="w-full p-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              >
                <option value="">Seleccione Carrera</option>
                <option>Nutrición y Dietética</option>
              </select>
            </div>
          </div>

          {/* Trámite y Documento */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2">📝 Trámite(s) y Documento(s)</h3>
            <div className="space-y-4">
              <select
                className="w-full p-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              >
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

              <select
                className="w-full p-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
              >
                <option>2023 - 2o. Año Trámite N° 357 - Lima</option>
              </select>
            </div>
          </div>

          {/* Tabla de Requisitos */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2">📎 Requisitos</h3>
            <div className="overflow-x-auto rounded-xl border border-gray-300 shadow-sm">
              <table className="min-w-full text-sm text-left text-gray-800">
                <thead className="bg-blue-800 text-white">
                  <tr>
                    <th className="px-4 py-3">N°</th>
                    <th className="px-4 py-3">Requisitos</th>
                    <th className="px-4 py-3">Adjuntar Archivo</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="border-t">
                    <td className="px-4 py-3">1</td>
                    <td className="px-4 py-3">
                      <p>Documento de Identidad - DNI</p>
                      <p className="text-xs text-gray-500">(* Subir en una vista en orden claro)</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="mb-1">Seleccione archivo para adjuntar</p>
                      <p className="text-xs text-gray-500">(* Archivo debe cumplir lo siguiente características):</p>
                      <ul className="text-xs text-gray-500 list-disc pl-5 mt-1">
                        <li>Tamaño del archivo máximo</li>
                        <li>Formato permitido: PDF o JPG</li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Botón descarga */}
          <div className="flex justify-end">
            <button
              type="button"
              className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:to-indigo-600 text-white rounded-xl shadow-md transition hover:scale-105"
              onClick={handleDownload}
            >
              📥 Descargar Solicitud de Atención
            </button>
          </div>

          {/* Detalle */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2 border-b border-gray-200 pb-2">🗒️ Detalle</h3>
            <textarea
              className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-300 shadow-sm"
              placeholder="Ingrese como máximo 1000 caracteres"
              rows={4}
            ></textarea>
          </div>

          {/* Botones finales */}
          <div className="flex justify-end gap-4 mt-6">
            <button className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-xl shadow transition hover:scale-105">Nuevo</button>
            <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow transition hover:scale-105">Continuar</button>
            <button className="px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl shadow transition hover:scale-105">Salir</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TramiteStudent;