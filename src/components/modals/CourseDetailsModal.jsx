import React from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export default function CourseDetailsModal({ open, onClose, courseDetails }) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="p-0 max-w-4xl overflow-hidden">
                <div className="overflow-y-auto">
                    {/* Tabla para pantallas medianas y grandes */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="table-auto w-full border-collapse border border-gray-300 text-left text-sm">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2">Sección</th>
                                    <th className="px-4 py-2">Foto</th>
                                    <th className="px-4 py-2">Docente</th>
                                    <th className="px-4 py-2">Tipo</th>
                                    <th className="px-4 py-2">Horario</th>
                                    <th className="px-4 py-2">Vacante</th>
                                    <th className="px-4 py-2">Disponible</th>
                                    <th className="px-4 py-2">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                {courseDetails?.sections.map((section, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="border px-4 py-2">{section.section}</td>
                                        <td className="border px-4 py-2">
                                            <img
                                                src={section.photo}
                                                alt="Docente"
                                                className="w-8 h-8 rounded-full"
                                            />
                                        </td>
                                        <td className="border px-4 py-2">{section.teacher}</td>
                                        <td className="border px-4 py-2">{section.type}</td>
                                        <td className="border px-4 py-2">
                                            {section.schedule} <br />
                                            <span className="text-xs text-gray-500">{section.dateRange}</span>
                                        </td>
                                        <td className="border px-4 py-2">{section.vacancies}</td>
                                        <td className="border px-4 py-2">{section.available}</td>
                                        <td className="border px-4 py-2">
                                            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                                                Matricular
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Card para pantallas pequeñas */}
                    <div className="block md:hidden space-y-4 p-4 overflow-y-auto" style={{ maxHeight: "60vh" }}>
                        {courseDetails?.sections.map((section, index) => (
                            <div key={index} className="border rounded-lg p-4 mt-8 shadow-md bg-white">
                                <div className="flex items-center mb-4">
                                    <img
                                        src={section.photo}
                                        alt="Docente"
                                        className="w-12 h-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <p className="text-sm font-medium">{section.teacher}</p>
                                        <p className="text-xs text-gray-500">{section.type}</p>
                                    </div>
                                </div>
                                <div className="text-sm text-gray-700">
                                    <p><span className="font-medium">Sección:</span> {section.section}</p>
                                    <p><span className="font-medium">Horario:</span> {section.schedule}</p>
                                    <p><span className="font-medium">Rango:</span> {section.dateRange}</p>
                                    <p><span className="font-medium">Vacante:</span> {section.vacancies}</p>
                                    <p><span className="font-medium">Disponible:</span> {section.available}</p>
                                </div>
                                <button className="mt-4 bg-green-500 text-white w-full py-2 rounded-lg hover:bg-green-600">
                                    Matricular
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
