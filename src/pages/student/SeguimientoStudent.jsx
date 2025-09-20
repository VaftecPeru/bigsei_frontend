import React from "react"
import { Link } from 'react-router-dom'

function SeguimientoStudent() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-200">

        {/* Botones */}
        <div className="flex flex-wrap gap-4 mb-6">
          <Link to="/student/tramite">
            <button className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg shadow-sm transition">
              Inicio
            </button>
          </Link>
          <Link to="/student/tramite">
            <button className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg shadow-sm transition">
              Registrar
            </button>
          </Link>
          <Link to="/student/tramite/seguimiento">
            <button className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-lg shadow-sm transition">
              Seguimiento
            </button>
          </Link>
        </div>

        {/* Título */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">Registro de Trámite</h2>
          <p className="text-sm text-gray-500 uppercase tracking-wide">Alumno</p>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="px-4 py-3">N°</th>
                <th className="px-4 py-3">Ticket</th>
                <th className="px-4 py-3">Trámite</th>
                <th className="px-4 py-3">Fecha Registro</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Mensaje</th>
                <th className="px-4 py-3">Observación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3">1</td>
                <td className="px-4 py-3">2021-172</td>
                <td className="px-4 py-3">Constancia de Actividad</td>
                <td className="px-4 py-3">13-05-2021 09:43:21 AM</td>
                <td className="px-4 py-3">
                  <span className="inline-block px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full">
                    Solicitado
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-400 italic">-</td>
                <td className="px-4 py-3 text-gray-400 italic">-</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>

  )
}

export default SeguimientoStudent
