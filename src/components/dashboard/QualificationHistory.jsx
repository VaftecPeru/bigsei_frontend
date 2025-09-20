import React from "react"
import { Download } from "lucide-react"
import DownloadButton from "../ui/DownloadButton"

export default function QualificationHistory({ notas }) {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 col-span-3">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-semibold">Historial de notas</h2>
                <DownloadButton label="Descargar" />
            </div>
            <table className="w-full text-sm text-left text-gray-500 border-collapse">
                <thead className="text-gray-700 uppercase bg-gray-50 text-center">
                    <tr>
                        <th className="px-4 py-2">Ciclo</th>
                        <th className="px-4 py-2">Plan</th>
                        <th className="px-4 py-2">Asignatura</th>
                        <th className="px-4 py-2">Docente</th>
                        <th className="px-4 py-2">Nota</th>
                        <th className="px-4 py-2">Crédito</th>
                    </tr>
                </thead>
                <tbody>
                    {notas.map((periodo, periodoIndex) => (
                        <React.Fragment key={periodoIndex}>
                            {/* Nombre del Periodo */}
                            <tr className="bg-blue-100">
                                <td
                                    colSpan="6"
                                    className="px-4 py-2 font-semibold text-gray-700 text-center"
                                >
                                    {`Periodo Académico ${periodo.periodo}`}
                                </td>
                            </tr>
                            {/* Datos de las Notas */}
                            {periodo.cursos.map((curso, cursoIndex) => (
                                <tr
                                    key={cursoIndex}
                                    className="border-b hover:bg-gray-50 transition text-center"
                                >
                                    <td className="px-4 py-2">{curso.ciclo}</td>
                                    <td className="px-4 py-2">{curso.plan}</td>
                                    <td className="px-4 py-2">{curso.asignatura}</td>
                                    <td className="px-4 py-2">{curso.docente}</td>
                                    <td className="px-4 py-2">{curso.nota}</td>
                                    <td className="px-4 py-2">{curso.credito}</td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
